import React, { useState, useEffect, useRef } from "react";
import { Minus, Plus } from "lucide-react";
import { animate } from "framer-motion";
import { WEEKLY_GOAL } from "./weekly-goal.config";
import { clamp, formatDailyAverage, isPreset } from "./weekly-goal.utils";
import "./WeeklyGoalPicker.css";

export interface WeeklyGoalPickerProps {
  initialHours: number;
  onConfirm: (hours: number) => void;
  onCancel?: () => void;
  confirmLabel?: string;
  className?: string;
}

export function WeeklyGoalPicker({
  initialHours,
  onConfirm,
  onCancel,
  confirmLabel = "Set goal",
  className = "",
}: WeeklyGoalPickerProps) {
  const [value, setValue] = useState(() => clamp(initialHours));
  const [displayHours, setDisplayHours] = useState(() => clamp(initialHours));
  const [announcement, setAnnouncement] = useState("");
  const isSubmittingRef = useRef(false);
  const animationStopRef = useRef<(() => void) | null>(null);
  const presetRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keep internal state aligned if initialHours prop changes
  useEffect(() => {
    const clamped = clamp(initialHours);
    setValue(clamped);
    setDisplayHours(clamped);
  }, [initialHours]);

  // Debounced polite announcement for screen readers
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnouncement(`${value} hours per week. ${formatDailyAverage(value)}.`);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  // Clean up any running number tween animation on unmount
  useEffect(() => {
    return () => {
      if (animationStopRef.current) {
        animationStopRef.current();
      }
    };
  }, []);

  const handleStep = (delta: number) => {
    const next = clamp(value + delta);
    if (next === value) return;
    setValue(next);
    setDisplayHours(next);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = clamp(Number(e.target.value));
    setValue(next);
    setDisplayHours(next);
  };

  const handlePresetSelect = (targetHours: number) => {
    const clamped = clamp(targetHours);
    setValue(clamped);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayHours(clamped);
      return;
    }

    if (animationStopRef.current) {
      animationStopRef.current();
      animationStopRef.current = null;
    }

    const controls = animate(displayHours, clamped, {
      duration: 0.18,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayHours(Math.round(latest));
      },
      onComplete: () => {
        setDisplayHours(clamped);
        animationStopRef.current = null;
      },
    });

    animationStopRef.current = controls.stop;
  };

  const handlePresetKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    const len = WEEKLY_GOAL.presets.length;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % len;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + len) % len;
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 2) % len;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 2 + len) % len;
    } else {
      return;
    }

    const targetPreset = WEEKLY_GOAL.presets[nextIndex];
    handlePresetSelect(targetPreset.hours);
    presetRefs.current[nextIndex]?.focus();
  };


  const handleConfirm = () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    onConfirm(value);
  };

  const sliderPct =
    ((value - WEEKLY_GOAL.min) / (WEEKLY_GOAL.max - WEEKLY_GOAL.min)) * 100;

  return (
    <div className={`weekly-goal-picker ${className}`.trim()}>
      {/* ── Screen reader announcement live region ── */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* ── Hero Row ── */}
      <div className="weekly-goal-picker__hero">
        <button
          type="button"
          onClick={() => handleStep(-WEEKLY_GOAL.step)}
          disabled={value <= WEEKLY_GOAL.min}
          className="weekly-goal-picker__stepper-btn"
          aria-label="Decrease weekly goal by 1 hour"
        >
          <Minus size={18} strokeWidth={2.5} aria-hidden="true" />
        </button>

        <div className="weekly-goal-picker__hero-center">
          <div className="weekly-goal-picker__number-row">
            <span className="weekly-goal-picker__number tabular-nums">
              {displayHours}
            </span>
            <span className="weekly-goal-picker__unit">hours / week</span>
            {!isPreset(value) && (
              <span className="weekly-goal-picker__custom-tag">Custom</span>
            )}
          </div>
          <p className="weekly-goal-picker__daily-hint">
            {formatDailyAverage(value)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleStep(WEEKLY_GOAL.step)}
          disabled={value >= WEEKLY_GOAL.max}
          className="weekly-goal-picker__stepper-btn"
          aria-label="Increase weekly goal by 1 hour"
        >
          <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>

      {/* ── Range Slider ── */}
      <div className="weekly-goal-picker__slider-section">
        <div className="weekly-goal-picker__track-wrap">
          <input
            type="range"
            min={WEEKLY_GOAL.min}
            max={WEEKLY_GOAL.max}
            step={WEEKLY_GOAL.step}
            value={value}
            onChange={handleSliderChange}
            className="weekly-goal-picker__range"
            aria-label="Weekly study goal in hours"
            aria-valuetext={`${value} hours per week`}
            style={{ "--slider-pct": `${sliderPct}%` } as React.CSSProperties}
          />

          {/* Tick marks aligning with 28px thumb center */}
          <div className="weekly-goal-picker__ticks" aria-hidden="true">
            {WEEKLY_GOAL.presets.map((preset) => {
              const ratio =
                (preset.hours - WEEKLY_GOAL.min) /
                (WEEKLY_GOAL.max - WEEKLY_GOAL.min);
              return (
                <span
                  key={preset.hours}
                  className={`weekly-goal-picker__tick ${
                    value >= preset.hours ? "weekly-goal-picker__tick--passed" : ""
                  }`}
                  style={{
                    left: `calc(14px + (100% - 28px) * ${ratio})`,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="weekly-goal-picker__slider-labels" aria-hidden="true">
          <span>{WEEKLY_GOAL.min}h</span>
          <span>{WEEKLY_GOAL.max}h</span>
        </div>
      </div>

      {/* ── Preset Pills ── */}
      <div
        className="weekly-goal-picker__presets"
        role="radiogroup"
        aria-label="Weekly goal presets"
      >
        {WEEKLY_GOAL.presets.map((preset, index) => {
          const isSelected = value === preset.hours;
          return (
            <button
              key={preset.hours}
              ref={(el) => {
                presetRefs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected || (!isPreset(value) && index === 0) ? 0 : -1}
              onClick={() => handlePresetSelect(preset.hours)}
              onKeyDown={(e) => handlePresetKeyDown(e, index)}
              className={`weekly-goal-picker__preset-pill ${
                isSelected ? "weekly-goal-picker__preset-pill--selected" : ""
              }`}
            >
              <div className="weekly-goal-picker__preset-top">
                <span className="weekly-goal-picker__preset-hours">
                  {preset.hours}h
                </span>
                {"recommended" in preset && preset.recommended && (
                  <span className="weekly-goal-picker__badge">Recommended</span>
                )}
              </div>
              <span className="weekly-goal-picker__preset-label">
                {preset.label}
              </span>
            </button>
          );
        })}

      </div>

      {/* ── Action Buttons ── */}
      <div className="weekly-goal-picker__actions">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="weekly-goal-picker__btn-cancel"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleConfirm}
          className="weekly-goal-picker__btn-confirm"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}
