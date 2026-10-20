import { WEEKLY_GOAL } from "./weekly-goal.config";

/**
 * Clamps an hours value to [min, max] range.
 */
export function clamp(
  value: number,
  min: number = WEEKLY_GOAL.min,
  max: number = WEEKLY_GOAL.max
): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

/**
 * Snaps an hours value to the nearest step increment.
 */
export function snap(value: number, step: number = WEEKLY_GOAL.step): number {
  return Math.round(value / step) * step;
}

/**
 * Formats daily average study time across 7 days.
 * Examples:
 *   15h -> "≈ 2h 9m a day"
 *   4h  -> "≈ 34m a day"
 *   35h -> "≈ 5h a day" (no minutes when 0)
 */
export function formatDailyAverage(hours: number): string {
  const totalMinutes = Math.round((hours * 60) / 7);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  if (h === 0) {
    return `≈ ${m}m a day`;
  }
  if (m === 0) {
    return `≈ ${h}h a day`;
  }
  return `≈ ${h}h ${m}m a day`;
}

/**
 * Returns true if the given hours value matches one of the preset goals.
 */
export function isPreset(hours: number): boolean {
  return WEEKLY_GOAL.presets.some((preset) => preset.hours === hours);
}
