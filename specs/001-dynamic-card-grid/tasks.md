# Tasks: Conditional Dynamic Layout & Auto-Expanding Card Grid

**Input**: Design documents from `/specs/001-dynamic-card-grid/`  
**Prerequisites**: [plan.md](file:///c:/Users/shehab/OneDrive/Desktop/E-learning%20stage/web/specs/001-dynamic-card-grid/plan.md), [spec.md](file:///c:/Users/shehab/OneDrive/Desktop/E-learning%20stage/web/specs/001-dynamic-card-grid/spec.md), [research.md](file:///c:/Users/shehab/OneDrive/Desktop/E-learning%20stage/web/specs/001-dynamic-card-grid/research.md), [data-model.md](file:///c:/Users/shehab/OneDrive/Desktop/E-learning%20stage/web/specs/001-dynamic-card-grid/data-model.md), [contracts/dynamic-card-grid.contract.ts](file:///c:/Users/shehab/OneDrive/Desktop/E-learning%20stage/web/specs/001-dynamic-card-grid/contracts/dynamic-card-grid.contract.ts)  
**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (`US1`, `US2`, `US3`)
- Includes exact file paths for every task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Module initialization and directory scaffolding

- [ ] T001 Create module directory structure at src/modules/dynamic-card-grid/components, hooks, and types
- [ ] T002 [P] Create initial CSS module stylesheet with layout resets in src/modules/dynamic-card-grid/components/DynamicCardGrid.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, state contracts, and baseline primitives required by all user stories

**⚠️ CRITICAL**: Foundational tasks must be complete before user story integrations begin

- [ ] T003 [P] Implement core TypeScript interfaces (CardId, CardConditionRule, ConditionalCardState, DynamicCardSlotProps, DynamicCardRowProps) in src/modules/dynamic-card-grid/types/index.ts
- [ ] T004 Implement state hook with condition evaluation and visibility mapping in src/modules/dynamic-card-grid/hooks/useConditionalCardState.ts
- [ ] T005 [P] Create public barrel export file exporting all public primitives and types in src/modules/dynamic-card-grid/index.ts

**Checkpoint**: Foundation ready — types and state hook verified by compiler.

---

## Phase 3: User Story 1 - Clean Zero-Gap View for Restricted/New Students (Priority: P1) 🎯 MVP

**Goal**: Deliver a fluid flex-based row container and card slot where inactive cards are completely unmounted and active cards automatically stretch to 100% of row width without empty slots or gaps.

**Independent Test**: Mount `DynamicCardRow` with 3 cards where 1 is conditionally hidden. Verify the remaining 2 cards stretch to 50% each (or their proportional flexRatio) filling 100% of the row width with zero empty space.

### Implementation for User Story 1

- [ ] T006 [P] [US1] Implement fluid flex row container component in src/modules/dynamic-card-grid/components/DynamicCardRow.tsx
- [ ] T007 [P] [US1] Implement dynamic card slot container with conditional DOM rendering and flexRatio growth in src/modules/dynamic-card-grid/components/DynamicCardSlot.tsx
- [ ] T008 [US1] Add CSS layout rules with min-width: 0 and gap clamping in src/modules/dynamic-card-grid/components/DynamicCardGrid.css
- [ ] T009 [US1] Integrate DynamicCardRow and DynamicCardSlot into student dashboard top row in src/features/student/components/DashboardBento/DashboardBento.tsx
- [ ] T010 [US1] Update top row CSS in src/features/student/components/DashboardBento/DashboardBento.css to consume dynamic flex layout

**Checkpoint**: User Story 1 fully functional. Dashboard top row dynamically expands with zero orphaned gaps.

---

## Phase 4: User Story 2 - Seamless Live Expansion When Triggering Card Unlock (Priority: P2)

**Goal**: Newly unlocked cards transition smoothly into view using Framer Motion (`AnimatePresence` + `motion.div`), while sibling cards animate fluidly into their rebalanced widths.

**Independent Test**: Trigger `setCardUnlocked` dynamically. Verify the new card animates from scale 0.96 and opacity 0 into full view, and adjacent cards animate their width redistribution smoothly over 250ms.

### Implementation for User Story 2

- [ ] T011 [US2] Enhance DynamicCardSlot with AnimatePresence and motion.div layout animations in src/modules/dynamic-card-grid/components/DynamicCardSlot.tsx
- [ ] T012 [US2] Connect session and streak milestone unlock triggers in src/features/student/components/DashboardBento/DashboardBento.tsx
- [ ] T013 [US2] Apply DynamicCardRow and DynamicCardSlot to middle row cards (MyProgress, Upcoming, YourStreak) in src/features/student/components/DashboardBento/DashboardBento.tsx
- [ ] T014 [US2] Update middle row CSS to fluid flex redistribution in src/features/student/components/DashboardBento/DashboardBento.css

**Checkpoint**: User Stories 1 & 2 operational. Live unlocking transitions smoothly between states.

---

## Phase 5: User Story 3 - Resilient Responsive Scaling Across Screen Sizes (Priority: P3)

**Goal**: Dynamic redistribution strictly honors the desktop Zero-Scroll constraint on >= 800px viewports while smoothly stacking on tablet/mobile <= 820px viewports.

**Independent Test**: Inspect dashboard at 1920x1080 and 1366x768 desktop sizes (zero window scrollbar present); resize down to 820px iPad Air and 390px mobile (clean vertical stack).

### Implementation for User Story 3

- [ ] T015 [US3] Configure CSS container query hooks (`@container bento-slot`) on DynamicCardSlot in src/modules/dynamic-card-grid/components/DynamicCardGrid.css
- [ ] T016 [US3] Implement responsive breakpoint rules (1199px, 1024px, 820px, 768px) for mobile stacked flow in src/modules/dynamic-card-grid/components/DynamicCardGrid.css
- [ ] T017 [US3] Verify and adjust DashboardBento height clamps to prevent desktop overflow in src/features/student/components/DashboardBento/DashboardBento.css

**Checkpoint**: All three user stories fully functional and verified across all viewport presets.

---

## Phase 6: Polish & Verification Gates

**Purpose**: Validation, type checking, build pass, and project documentation updates

- [ ] T018 Run TypeScript verification compiler gate via npx tsc --noEmit
- [ ] T019 Run Vite production bundle build verification gate via npm run build
- [ ] T020 [P] Update component architecture documentation in docs/components/DashboardBento.md

---

## Dependencies & Execution Order

### Phase Dependencies
1. **Setup (Phase 1)**: Independent, start immediately.
2. **Foundational (Phase 2)**: Depends on Setup; BLOCKS all User Stories.
3. **User Story 1 (Phase 3)**: Depends on Phase 2 (Foundation). Delivers core MVP.
4. **User Story 2 (Phase 4)**: Depends on Phase 3 (US1 components).
5. **User Story 3 (Phase 5)**: Depends on Phase 4 (US2 components).
6. **Polish (Phase 6)**: Runs after all user stories are complete.

### Parallel Opportunities
- T002 (DynamicCardGrid.css) can run in parallel with T001.
- T003 (types/index.ts) can run in parallel with T004 (useConditionalCardState.ts).
- T006 (DynamicCardRow.tsx) can run in parallel with T007 (DynamicCardSlot.tsx).
- T020 (documentation) can run in parallel with verification tasks.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1 (Setup) and Phase 2 (Foundational).
2. Complete Phase 3 (User Story 1: Dynamic Top Row with zero-gap auto-expansion).
3. Validate: Confirm that when a card is inactive, sibling cards expand to fill 100% of row width.

### Incremental Delivery
1. Add Phase 4 (User Story 2: Framer Motion animated expansion on Middle Row).
2. Add Phase 5 (User Story 3: Container Queries & Zero-Scroll Desktop verification).
3. Run verification gates (`tsc` and `build`).
