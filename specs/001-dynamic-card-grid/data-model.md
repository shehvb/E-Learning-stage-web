# Data Model: Conditional Dynamic Card Grid

## Entities & Interfaces

### 1. `CardId` (Union Type)
Represents known card identifiers within the grid system:
```typescript
export type CardId =
  | "continue-learning"
  | "ai-learning-guide"
  | "weekly-goal"
  | "my-progress"
  | "upcoming-schedule"
  | "your-streak"
  | "recommended-courses"
  | string;
```

---

### 2. `CardConditionRule`
Defines the prerequisite logic determining if a card should be visible in the active layout:
```typescript
export interface CardConditionRule {
  /** Identifier of the card */
  cardId: CardId;
  /** Whether the card is currently unlocked and visible */
  isUnlocked: boolean;
  /** Optional human-readable requirement description (e.g. "Complete 1 lesson") */
  prerequisiteDescription?: string;
  /** Optional priority order within the row when rendered */
  order?: number;
  /** Optional minimum width in pixels before responsive wrapping triggers */
  minWidth?: number;
  /** Custom flex grow/shrink ratio (defaults to 1) */
  flexRatio?: number;
}
```

---

### 3. `ConditionalCardState`
The aggregated runtime state emitted by the layout engine:
```typescript
export interface ConditionalCardState {
  /** Map of cardId -> visibility status */
  visibilityMap: Record<CardId, boolean>;
  /** Total count of currently active/mounted cards */
  activeCount: number;
  /** Checks if a specific card is active */
  isCardActive: (id: CardId) => boolean;
  /** Programmatic trigger to unlock or lock a card */
  setCardUnlocked: (id: CardId, unlocked: boolean) => void;
  /** Batch update multiple card states */
  updateConditions: (updates: Partial<Record<CardId, boolean>>) => void;
}
```

---

### 4. `DynamicGridRowConfig`
Configuration for an individual dynamic row or tier:
```typescript
export interface DynamicGridRowConfig {
  rowId: string;
  /** Cards assigned to this row */
  cardIds: CardId[];
  /** Minimum height ratio or style clamp */
  rowHeightClass?: string;
  /** Fallback message or state if 0 cards are active in this row */
  emptyBehavior?: "collapse" | "placeholder";
}
```

---

## State Transition Rules

```text
[LOCKED / INACTIVE]
       │
       │ (User completes prerequisite / milestone reached / toggle switched)
       ▼
[UNLOCK TRIGGERED]
       │
       │ (AnimatePresence enter: opacity 0 -> 1, scale 0.96 -> 1, flex expands)
       ▼
[ACTIVE IN DOM FLOW]
       │
       │ (User resets / prerequisite invalidated)
       ▼
[EXIT TRANSITION]
       │
       │ (AnimatePresence exit: opacity 1 -> 0, scale 1 -> 0.96)
       ▼
[UNMOUNTED / ZERO GAP OCCUPIED]
```
