/**
 * Contract: Dynamic Card Grid Module
 * Public interface definition for src/modules/dynamic-card-grid/
 */
import type { ReactNode } from "react";
import type { CardId, ConditionalCardState } from "../data-model";

export interface DynamicCardSlotProps {
  /** Unique identifier for the card slot */
  cardId: CardId;
  /** Whether this card is currently unlocked and visible */
  isVisible: boolean;
  /** Custom flex weight (e.g. 1.25 for wider cards like continue-learning) */
  flexRatio?: number;
  /** Minimum width threshold */
  minWidth?: number;
  /** Child component to render when visible */
  children: ReactNode;
  /** Optional fallback component if locked and placeholder mode requested */
  fallback?: ReactNode;
}

export interface DynamicCardRowProps {
  /** Unique identifier for the row */
  rowId: string;
  /** Custom CSS classes for row styling */
  className?: string;
  /** Children elements, usually DynamicCardSlot components */
  children: ReactNode;
  /** Behavior when all slots are inactive */
  emptyBehavior?: "collapse" | "placeholder";
}

export interface UseConditionalCardStateOptions {
  /** Initial visibility map */
  initialStates?: Partial<Record<CardId, boolean>>;
  /** Prerequisites based on student data */
  hasSession?: boolean;
  streakDays?: number;
  isAIGuideEnabled?: boolean;
}

export interface DynamicCardGridModuleExports {
  DynamicCardRow: (props: DynamicCardRowProps) => ReactNode;
  DynamicCardSlot: (props: DynamicCardSlotProps) => ReactNode;
  useConditionalCardState: (options?: UseConditionalCardStateOptions) => ConditionalCardState;
}
