# Phase 0 Research: Dynamic & Auto-Expanding Card Grid Layout

## Research Questions & Decisions

### Decision 1: Dynamic Layout Model (CSS Grid vs. Flexbox with auto-fit)
- **Decision**: Hybrid Flexbox Container (`display: flex; gap: ...`) with `flex: 1 1 0%` and `min-width: 0` for rows, combined with CSS Container Queries (`@container bento-slot`).
- **Rationale**: 
  - Standard hardcoded CSS Grid `grid-template-columns: 1.25fr 1.55fr 1fr` leaves empty grid tracks when a child slot is not rendered or hidden.
  - Using a dynamic flex row (`flex-1 min-w-[280px]` or `flex: 1 1 0px`) ensures that whenever 1, 2, or 3 cards are mounted, the active cards automatically distribute 100% of the available row width without any empty gaps.
  - Retaining `@container (max-width: ...)` on individual slots guarantees that card internals (e.g. `WeeklyGoalCard`, `ContinueLearning`, `YourStreak`) adapt their layout seamlessly regardless of whether they are 33% wide or 50% or 100% wide.
- **Alternatives Considered**:
  - `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`: While good for uniform cards, it can cause multi-card rows on desktop to wrap into second vertical rows if total container width drops below threshold, which violates Desktop Zero-Scroll.
  - Hardcoded classes toggling (`col-span-12`, `col-span-6`, `col-span-4`): Requires manual tracking of card counts and fragile CSS class permutations.

---

### Decision 2: State Management & Encapsulation
- **Decision**: Encapsulated custom hook `useConditionalCardState` placed in `src/modules/dynamic-card-grid/hooks/`.
- **Rationale**:
  - Unidirectional data flow: the hook evaluates unlock rules (`hasCompletedFirstSession`, `streakDays > 0`, milestone requirements, or explicit toggles) and returns a clean, typed visibility map.
  - Parent layouts simply map over active items or conditionally render children:
    ```tsx
    const { cardVisibility, unlockCard, isUnlocked } = useConditionalCardState({ ... });
    ```
  - Prevents bleeding internal layout calculations into global app shell or route components.
- **Alternatives Considered**:
  - Global Context/Zustand: Overkill for layout card visibility; creates unnecessary re-render surfaces.
  - Direct prop drilling in every card: Scatters conditional unlock logic across multiple disparate components.

---

### Decision 3: Smooth Animations & Layout Transitions
- **Decision**: Framer Motion `AnimatePresence` with `motion.div` (`layout` prop, `initial={{ opacity: 0, scale: 0.96 }}`, `animate={{ opacity: 1, scale: 1 }}`, `exit={{ opacity: 0, scale: 0.96 }}`, `transition={{ duration: 0.25, ease: "easeInOut" }}`).
- **Rationale**:
  - `framer-motion` is already installed (`^13.1.1`).
  - The `layout` prop on sibling cards enables automatic, fluid FLIP animation: when a neighboring card appears or unmounts, the surviving cards animate smoothly into their new expanded widths without jarring DOM jumps.
  - Fully supports `prefers-reduced-motion` for accessibility.
- **Alternatives Considered**:
  - Pure CSS transitions on `width`/`flex-basis`: CSS cannot smoothly interpolate between auto and fixed widths without JavaScript measurement, leading to jerky transitions.

---

### Decision 4: Preserving Desktop Zero-Scroll and iPad/Mobile Responsiveness
- **Decision**:
  - Desktop (`min-width: 1200px`): Outer row retains strict vertical constraint (`min-height: 0; overflow: hidden;`), items flex horizontally with `flex: 1 1 0%`. Zero vertical page scroll is preserved.
  - Tablet & Mobile (`max-width: 1024px` / `820px` / `768px`): Row flex-direction switches to `column` or `wrap` with natural document scrolling, honoring the established breakpoint standard.
- **Rationale**: Directly aligns with Constitution Principle II (Responsive Integrity) and Principle III (Zero Regression).
