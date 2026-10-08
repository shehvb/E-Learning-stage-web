# Implementation Plan: Conditional Dynamic Layout & Auto-Expanding Card Grid

**Branch**: `001-dynamic-card-grid` | **Date**: 2026-10-08 | **Spec**: [specs/001-dynamic-card-grid/spec.md](file:///c:/Users/shehab/OneDrive/Desktop/E-learning%20stage/web/specs/001-dynamic-card-grid/spec.md)

**Input**: Feature specification from `/specs/001-dynamic-card-grid/spec.md` and user architectural directives.

## Summary

Build an encapsulated, reusable dynamic grid module (`src/modules/dynamic-card-grid/`) that allows conditional cards to enter/exit without leaving blank gaps. Remaining active cards automatically stretch using fluid flex ratios with `framer-motion` layout transitions (`AnimatePresence` + `motion.div`), while preserving CSS Container Queries (`@container bento-slot`) and the Desktop Zero-Scroll constraint.

## Technical Context

**Language/Version**: TypeScript 5.8+ / React 19.2  
**Primary Dependencies**: `framer-motion` (^13.1.1), `lucide-react`, Tailwind CSS  
**Storage**: React local/hook state (`useConditionalCardState`) synced with student enrollment/session data  
**Testing**: Verification gates (`npx tsc --noEmit` and `npm run build`) + responsive layout tests  
**Target Platform**: Modern Web (Desktop 4K, 1080p, 1366x768; iPad Pro 1024px; iPad Air 820px; Mobile)  
**Project Type**: Web Application Component Module  
**Performance Goals**: 60fps layout redistribution, zero layout thrashing, transition duration <= 300ms  
**Constraints**: Desktop Zero-Scroll preserved (no vertical overflow at >=800px height); Container query compatibility (`container: bento-slot / size`)  
**Scale/Scope**: 1 new module in `src/modules/dynamic-card-grid/` integrated into `DashboardBento`  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Evaluation | Status |
| :--- | :--- | :--- |
| **I. Modular Architecture** | All new logic is isolated in `src/modules/dynamic-card-grid/` across `components/`, `hooks/`, `types/`, with a single barrel export (`index.ts`). Every file is well under 200 lines. | **PASS** |
| **II. Responsive Integrity** | Dynamic flex rows respect `@container bento-slot` and the established breakpoint system (`1199px`, `1024px`, `820px`, `768px`). Desktop zero-scroll is preserved. | **PASS** |
| **III. Zero Visual Regression** | Existing cards (`ContinueLearning`, `AILearningGuide`, `WeeklyGoalCard`, `MyProgress`, `YourStreak`) retain identical visual styling, SVG math, and internal behaviors. | **PASS** |
| **IV. Strict Type Safety** | Fully typed domain interfaces (`CardId`, `ConditionalCardState`, `DynamicCardSlotProps`) with zero `any` shortcuts; passes `tsc --noEmit`. | **PASS** |
| **V. Design System Consistency** | Standard clamp gaps (`clamp(10px, 0.8vw, 16px)`), CSS variables, and dark surface tokens are honored. | **PASS** |

## Project Structure

### Documentation (this feature)

```text
specs/001-dynamic-card-grid/
├── spec.md              # Feature specification
├── plan.md              # This file (/speckit.plan output)
├── research.md          # Phase 0 architectural decisions
├── data-model.md        # Phase 1 data entities and state transitions
├── quickstart.md        # Phase 1 usage guide & code samples
├── contracts/           # Phase 1 interface definitions
│   └── dynamic-card-grid.contract.ts
└── checklists/          # Requirements & validation checklists
    └── requirements.md
```

### Source Code (repository root)

```text
src/
├── modules/
│   └── dynamic-card-grid/
│       ├── components/
│       │   ├── DynamicCardRow.tsx       # Fluid flex container with zero-gap distribution
│       │   ├── DynamicCardSlot.tsx      # AnimatePresence + motion.div container slot
│       │   └── DynamicCardGrid.css      # Fluid flex styling & container query hooks
│       ├── hooks/
│       │   └── useConditionalCardState.ts # Encapsulated visibility & unlock state logic
│       ├── types/
│       │   └── index.ts                 # Domain interfaces & props
│       └── index.ts                     # Public Barrel Export
│
└── features/
    └── student/
        └── components/
            └── DashboardBento/
                ├── DashboardBento.tsx   # Refactored to consume DynamicCardRow & DynamicCardSlot
                └── DashboardBento.css   # Updated to dynamic row classes while keeping layout caps
```

**Structure Decision**: Selected modular component pattern under `src/modules/dynamic-card-grid/` to maintain clean separation between generic layout distribution primitives and student domain cards.

## Complexity Tracking

*No constitution violations identified. Zero special exemptions required.*
