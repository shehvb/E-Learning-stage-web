import { useEffect, useRef } from "react";

/* ─── Tuning constants ──────────────────────────────────────────────────────── */
const CYCLE_SAMPLES   = 512;   // resolution of one cardiac cycle lookup table
const SWEEP_PX_PER_S  = 140;   // CSS pixels the trace sweeps per second
const ERASER_W        = 22;    // CSS px of blank gap ahead of the write head
const CANVAS_H        = 20;    // CSS px canvas height
const BEEP_FREQ       = 880;   // Hz
const BEEP_DUR        = 0.06;  // s
const BEEP_GAIN       = 0.10;

/* ─── Gaussian helper ───────────────────────────────────────────────────────── */
const gauss = (t: number, mu: number, sig: number, amp: number): number =>
  amp * Math.exp(-0.5 * ((t - mu) / sig) ** 2);

/* ─── Pre-computed anatomical cardiac cycle ─────────────────────────────────── */
// Positive deviation = upward deflection (toward canvas y = 0).
// One entry per sample; caller maps [0, CYCLE_SAMPLES) → [0, 1) phase.
//   P-wave  : small positive bump at ~14 % of cycle
//   Q-dip   : small negative notch just before R
//   R-peak  : tall positive spike — the main QRS complex
//   S-dip   : moderate negative overshoot after R
//   T-wave  : broader positive hump at ~52 % of cycle
const ECG_CYCLE: Float32Array = (() => {
  const buf = new Float32Array(CYCLE_SAMPLES);
  for (let i = 0; i < CYCLE_SAMPLES; i++) {
    const t = i / CYCLE_SAMPLES;
    buf[i] =
      gauss(t, 0.140, 0.030, 0.15)   // P-wave
    - gauss(t, 0.285, 0.011, 0.12)   // Q-dip
    + gauss(t, 0.310, 0.016, 0.90)   // R-peak
    - gauss(t, 0.335, 0.014, 0.25)   // S-dip
    + gauss(t, 0.520, 0.048, 0.22);  // T-wave
  }
  return buf;
})();

// Index of the R-peak sample — used to trigger the beep at the right moment
const R_PEAK_IDX: number = ECG_CYCLE.reduce(
  (best, v, i, arr) => (v > arr[best] ? i : best),
  0
);

/* ─── Web Audio beep synthesiser ────────────────────────────────────────────── */
function playBeep(ctx: AudioContext): void {
  try {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.connect(env);
    env.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = BEEP_FREQ;
    env.gain.setValueAtTime(BEEP_GAIN, ctx.currentTime);
    env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + BEEP_DUR);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + BEEP_DUR);
  } catch {
    /* ignore if context is suspended */
  }
}

/* ─── Props ─────────────────────────────────────────────────────────────────── */
export interface BreadcrumbEcgProps {
  bpm?: number;       // heart rate — default 72
  audio?: boolean;    // enable beep on R-peak — default false
  className?: string;
}

/* ─── Component ─────────────────────────────────────────────────────────────── */
export function BreadcrumbEcg({
  bpm = 72,
  audio = false,
  className,
}: BreadcrumbEcgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mutable props ref — avoids stale-closure issues in the animation loop
  const propsRef = useRef({ bpm, audio });
  useEffect(() => {
    propsRef.current = { bpm, audio };
  }, [bpm, audio]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* animation state */
    let animId   = 0;
    let totalTime = 0;     // seconds elapsed since mount
    let lastTs    = -1;    // previous rAF timestamp
    let writeX    = 0;     // CSS-pixel write-head position

    /* canvas dimensions in CSS pixels */
    let W = 0;
    const H = CANVAS_H;

    /* audio */
    let audioCtx: AudioContext | null = null;
    let prevCycleIdx = -1; // for edge-detection of R-peak crossing

    /* ── Unlock audio on first user interaction ───────────────────────────── */
    const unlockAudio = () => {
      if (!propsRef.current.audio || audioCtx) return;
      audioCtx = new AudioContext();
    };
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown",     unlockAudio, { once: true });

    /* ── Resize handler ───────────────────────────────────────────────────── */
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      W = Math.max(Math.floor(rect.width), 80);
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      // Override any CSS width so pixels match
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    /* ── Main draw loop ───────────────────────────────────────────────────── */
    const draw = (ts: number) => {
      const dt = lastTs < 0 ? 0 : Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;
      totalTime += dt;

      animId = requestAnimationFrame(draw);
      if (W === 0) return;

      const { bpm: currentBpm } = propsRef.current;
      const beatPeriod = 60 / currentBpm; // seconds per beat
      const baseline   = H * 0.58;        // slight above centre for R-spike headroom
      const amplitude  = H * 0.46;        // px scale factor

      /* Advance write head (CSS pixels, wraps at canvas width) */
      writeX = (writeX + SWEEP_PX_PER_S * dt) % W;
      const wxi = Math.floor(writeX);

      /* DPR-aware transform — must be reset each frame because canvas.width can change */
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* ── Read trace colour from CSS (inherits from .page-breadcrumb__pulse-canvas) */
      const traceColor = getComputedStyle(canvas).color;

      /* ── Clear ──────────────────────────────────────────────────────────── */
      ctx.clearRect(0, 0, W, H);

      /* ── Subtle dashed baseline gridline ────────────────────────────────── */
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
      ctx.lineWidth   = 0.5;
      ctx.setLineDash([2, 5]);
      ctx.beginPath();
      ctx.moveTo(0, baseline);
      ctx.lineTo(W, baseline);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      /* ── ECG trace ──────────────────────────────────────────────────────── *
       *
       *  For each CSS-pixel x (0 → W-1):
       *    aheadDist  = how many pixels x is AHEAD of the write head (wraps)
       *               → values in (0, ERASER_W) are the eraser gap
       *    secondsAgo = how many seconds ago the write head was at x
       *               → maps x back to a past ECG phase value
       *
       *  The canvas therefore shows the last (W / SWEEP_PX_PER_S) seconds of
       *  ECG — a rolling oscilloscope strip with continuous wrapping.
       */
      ctx.save();
      ctx.strokeStyle = traceColor;
      ctx.lineWidth   = 1.6;
      ctx.lineJoin    = "round";
      ctx.lineCap     = "round";
      ctx.shadowColor = traceColor;
      ctx.shadowBlur  = 5;

      let pathOpen = false;
      let needMove = true;

      const closeSegment = () => {
        if (pathOpen) { ctx.stroke(); pathOpen = false; }
        needMove = true;
      };

      for (let x = 0; x < W; x++) {
        /* eraser zone: pixels just AHEAD of the write head */
        const aheadDist = ((x - wxi + W) % W);
        if (aheadDist > 0 && aheadDist < ERASER_W) { closeSegment(); continue; }

        /* time-index: how old is this pixel's sample? */
        const secondsAgo = ((wxi - x + W) % W) / SWEEP_PX_PER_S;
        const timeAtX    = totalTime - secondsAgo;
        if (timeAtX < 0) { closeSegment(); continue; } // animation hasn't reached here yet

        const phase    = (timeAtX / beatPeriod) % 1;
        const ci       = Math.min(Math.floor(phase * CYCLE_SAMPLES), CYCLE_SAMPLES - 1);
        const y        = baseline - ECG_CYCLE[ci] * amplitude;

        /* Audio: fire beep on R-peak (rising-edge crossing) */
        if (x === wxi && audioCtx && propsRef.current.audio) {
          if (prevCycleIdx !== -1 && prevCycleIdx < R_PEAK_IDX && ci >= R_PEAK_IDX) {
            playBeep(audioCtx);
          }
          prevCycleIdx = ci;
        }

        if (needMove) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          pathOpen = true;
          needMove = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      closeSegment();
      ctx.restore();

      /* ── Glowing dot at write head ───────────────────────────────────────── */
      const headPhase = (totalTime / beatPeriod) % 1;
      const headCi    = Math.min(Math.floor(headPhase * CYCLE_SAMPLES), CYCLE_SAMPLES - 1);
      const headY     = baseline - ECG_CYCLE[headCi] * amplitude;

      ctx.save();
      ctx.shadowColor = traceColor;
      ctx.shadowBlur  = 14;
      ctx.fillStyle   = traceColor;
      ctx.beginPath();
      ctx.arc(writeX, headY, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown",     unlockAudio);
      audioCtx?.close();
    };
  }, []); // stable — props synced via propsRef

  return (
    <canvas
      ref={canvasRef}
      className={`page-breadcrumb__pulse-canvas${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    />
  );
}
