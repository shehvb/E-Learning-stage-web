# GreenLearn Platform Constitution

## Core Principles

### I. Modular Architecture & Focused Components
Every component must adhere to single responsibility. Complex features must be split into dedicated subcomponents, domain helpers, and type definitions (as established in the `CalendarWorkspace` and `DashboardBento` architectures). Barrel exports (`index.ts`) provide clean public APIs. Monolithic files exceeding 400 lines are refactored into focused submodules with isolated responsibilities.

### II. Responsive Integrity & Container Queries
The platform prioritizes fluid layout resilience across all device viewports (4K, 1080p, laptop viewports like 1366x768, iPad Pro 1024x1366, iPad Air 820x1180, and mobile). The Bento Grid relies on CSS Container Queries (`@container bento-slot`) and unified responsive breakpoints (`1199px`, `1024px`, `820px`, `768px`). No uncontrolled viewport overflow or uncontained scrollbars on dashboard grids.

### III. Zero Visual & Behavioral Regression (NON-NEGOTIABLE)
Refactorings and code reorganizations must preserve exact visual appearance, micro-animations, SVG math, dimensions, colors, and user interactions. Shared utilities (such as `ProgressRing`) must respect component-specific presentation differences (e.g. 120px Weekly Goal vs 76px Calendar widget). All UI adjustments must maintain design system fidelity.

### IV. Strict Type Safety & Quality Gates
The codebase uses TypeScript with strict compiler rules and React 19.
- No loose `any` types; all domain models, props, and callbacks require explicit interfaces.
- Every change must pass both `npx tsc --noEmit` and production bundle verification (`npm run build`).
- React 19 hook patterns (e.g. `RefObject<T | null>`) must be strictly respected.

### V. Design System Consistency
All styling must adhere to the GreenLearn design tokens (`src/styles/variables.css` and `globals.css`):
- Vibrant, curated emerald/green palette (`--color-primary`, `--color-emerald-*`)
- Rich dark-mode and glassmorphic surfaces (`--color-surface`, `--color-card-bg`)
- Standardized typography with fluid `clamp()` sizing
- Consistent micro-interactions, focus rings, and accessible button/input states

## Technical Stack & Standards

- **Core Framework**: React 19, TypeScript, Vite
- **Styling**: Scoped CSS modules / component CSS + Tailwind utility support + CSS Container Queries
- **Icons**: Lucide React (`lucide-react`)
- **State & Hooks**: Local React state, custom feature hooks (`useDashboardEnrollment`, etc.), React Router for navigation
- **Domain Areas**: Student Dashboard Bento, Explore & Course Catalog, Lesson Player & Curriculum, Calendar & Timezone Workspace (Egypt standard time aware), Assignments, Messages, Gamification (Streak & XP).

## Spec-Driven Development Workflow

1. **Specify (`/speckit.specify`)**: Clarify user intent, outline functional requirements, establish acceptance criteria and edge cases.
2. **Plan (`/speckit.plan`)**: Architect the technical approach, identify modified/created files, define dependencies and risk mitigation.
3. **Tasks (`/speckit.tasks`)**: Break the plan into sequential, actionable tasks with test/verification criteria for each task.
4. **Implement (`/speckit.implement`)**: Execute tasks iteratively, validating types and build integrity after each step.
5. **Analyze & Validate (`/speckit.analyze`, `/speckit.checklist`)**: Verify complete requirements fulfillment and ensure zero regressions.

## Governance

- The Constitution is the supreme quality standard for GreenLearn.
- Any architectural change, refactoring, or new feature addition must demonstrate compliance with the 5 Core Principles.
- Code must build cleanly with zero type errors before any commit or task completion.

**Version**: 1.0.0 | **Ratified**: 2026-10-08 | **Last Amended**: 2026-10-08
