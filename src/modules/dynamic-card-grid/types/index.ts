import type { ReactNode } from "react";

export type CardId =
  | "continue-learning"
  | "ai-learning-guide"
  | "weekly-goal"
  | "my-progress"
  | "upcoming-schedule"
  | "your-streak"
  | "recommended-courses"
  | string;

export interface CardConditionRule {
  cardId: CardId;
  isUnlocked: boolean;
  prerequisiteDescription?: string;
  order?: number;
  minWidth?: number;
  flexRatio?: number;
}

export interface ConditionalCardState {
  visibilityMap: Record<CardId, boolean>;
  activeCount: number;
  isCardActive: (id: CardId) => boolean;
  setCardUnlocked: (id: CardId, unlocked: boolean) => void;
  updateConditions: (updates: Partial<Record<CardId, boolean>>) => void;
}

export interface DynamicCardSlotProps {
  cardId: CardId;
  isVisible?: boolean;
  flexRatio?: number;
  minWidth?: number;
  className?: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export interface DynamicCardRowProps {
  rowId: string;
  className?: string;
  children: ReactNode;
  emptyBehavior?: "collapse" | "placeholder";
}

export interface UseConditionalCardStateOptions {
  initialStates?: Partial<Record<CardId, boolean>>;
  hasSession?: boolean;
  streakDays?: number;
  isAIGuideEnabled?: boolean;
}
