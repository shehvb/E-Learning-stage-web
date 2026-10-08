import { useState, useMemo, useCallback } from "react";
import type { 
  CardId, 
  ConditionalCardState, 
  UseConditionalCardStateOptions 
} from "../types";

export function useConditionalCardState(
  options: UseConditionalCardStateOptions = {}
): ConditionalCardState {
  const {
    initialStates = {},
    hasSession,
    streakDays,
    isAIGuideEnabled = true,
  } = options;

  // Manual overrides map
  const [overrides, setOverrides] = useState<Partial<Record<CardId, boolean>>>(initialStates);

  // Compute resolved visibility map combining prop conditions + overrides
  const visibilityMap = useMemo(() => {
    const defaultMap: Record<CardId, boolean> = {
      "continue-learning": true,
      "ai-learning-guide": isAIGuideEnabled,
      "weekly-goal": true,
      // If hasSession is undefined, default to true; if provided boolean, reflect it
      "my-progress": hasSession !== undefined ? hasSession : true,
      "upcoming-schedule": true,
      // Streak is active if streakDays is greater than 0, or true if not explicitly 0/provided
      "your-streak": streakDays !== undefined ? streakDays > 0 : true,
      "recommended-courses": true,
    };

    const merged: Record<CardId, boolean> = { ...defaultMap };
    for (const [key, value] of Object.entries(overrides)) {
      if (typeof value === "boolean") {
        merged[key] = value;
      }
    }
    return merged;
  }, [hasSession, streakDays, isAIGuideEnabled, overrides]);

  const activeCount = useMemo(() => {
    return Object.values(visibilityMap).filter(Boolean).length;
  }, [visibilityMap]);

  const isCardActive = useCallback(
    (id: CardId): boolean => {
      return Boolean(visibilityMap[id]);
    },
    [visibilityMap]
  );

  const setCardUnlocked = useCallback((id: CardId, unlocked: boolean) => {
    setOverrides((prev) => ({
      ...prev,
      [id]: unlocked,
    }));
  }, []);

  const updateConditions = useCallback((updates: Partial<Record<CardId, boolean>>) => {
    setOverrides((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  return {
    visibilityMap,
    activeCount,
    isCardActive,
    setCardUnlocked,
    updateConditions,
  };
}
