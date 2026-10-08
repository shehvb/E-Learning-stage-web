# Quickstart: Using the Dynamic Card Grid

## Overview
The `dynamic-card-grid` module enables cards to conditionally appear or disappear without leaving empty holes in the UI. Active cards automatically expand to fill available horizontal space with smooth layout animations.

## Basic Usage

```tsx
import { 
  DynamicCardRow, 
  DynamicCardSlot, 
  useConditionalCardState 
} from "@/modules/dynamic-card-grid";

export function StudentDashboardExample() {
  const { isCardActive, setCardUnlocked } = useConditionalCardState({
    hasSession: true,
    streakDays: 3,
  });

  return (
    <div className="dashboard-grid">
      {/* Top Row: If AI Guide is hidden, ContinueLearning and WeeklyGoal expand to 50% each */}
      <DynamicCardRow rowId="top-row">
        <DynamicCardSlot 
          cardId="continue-learning" 
          isVisible={isCardActive("continue-learning")}
          flexRatio={1.25}
        >
          <ContinueLearning />
        </DynamicCardSlot>

        <DynamicCardSlot 
          cardId="ai-learning-guide" 
          isVisible={isCardActive("ai-learning-guide")}
          flexRatio={1.5}
        >
          <AILearningGuide />
        </DynamicCardSlot>

        <DynamicCardSlot 
          cardId="weekly-goal" 
          isVisible={isCardActive("weekly-goal")}
          flexRatio={1}
        >
          <WeeklyGoalCard />
        </DynamicCardSlot>
      </DynamicCardRow>
    </div>
  );
}
```

## How It Works
1. When `isVisible` is `false`, `DynamicCardSlot` unmounts via `AnimatePresence`.
2. Sibling `DynamicCardSlot` items flex to absorb the freed row width via CSS `flex-grow: flexRatio` and `framer-motion` layout animations.
3. If an unlock action occurs, calling `setCardUnlocked('ai-learning-guide', true)` animates the card into view while existing cards smoothly scale down.
