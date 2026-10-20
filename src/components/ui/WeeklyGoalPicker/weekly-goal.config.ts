export const WEEKLY_GOAL = {
  min: 3,
  max: 30,
  step: 1,
  defaultHours: 15,
  presets: [
    { hours: 5,  label: "Light" },
    { hours: 10, label: "Moderate" },
    { hours: 15, label: "Steady", recommended: true },
    { hours: 20, label: "Intensive" },
  ],
} as const;

export type WeeklyGoalPreset = typeof WEEKLY_GOAL.presets[number];
