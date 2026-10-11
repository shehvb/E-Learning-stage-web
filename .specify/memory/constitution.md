# GreenLearn Platform Constitution

## Core Principles

### I. Modular Architecture & Focused Components
Every component must adhere to single responsibility. Complex features must be split into dedicated subcomponents, domain helpers, and type definitions (as established in the `CalendarWorkspace` and `DashboardBento` architectures). Barrel exports (`index.ts`) provide clean public APIs. Monolithic files exceeding 400 lines are refactored into focused submodules with isolated responsibilities.

### II. Responsive Integrity & Canonical Breakpoints
The platform prioritizes fluid layout resilience across canonical responsive tiers: mobile (≤767px), tablet/iPad (768–1399px), and desktop zero-scroll (≥1400px), defined as single sources of truth in `src/styles/breakpoints.ts` and `breakpoints.css`. No new ad-hoc breakpoint values and no hardcoded `window.innerWidth` checks are permitted. Bento grid slots must use `container-type: size` only in the zero-scroll desktop tier (≥1400px); the tablet tier (768–1399px) sizes to content using `inline-size` containment or natural height so cards never collapse or clip in fluid layouts.

### III. Zero Visual & Behavioral Regression (NON-NEGOTIABLE)
Refactorings and code reorganizations must preserve exact visual appearance, micro-animations, SVG math, dimensions, colors, and user interactions. Shared utilities (such as `ProgressRing`) must respect component-specific presentation differences (e.g. 120px Weekly Goal vs 76px Calendar widget). All UI adjustments must maintain design system fidelity.

### IV. Strict Type Safety & Quality Gates
The codebase uses TypeScript with strict compiler rules and React 19.
- No loose `any` types; all domain models, props, and callbacks require explicit interfaces.
- Every change must pass both `npx tsc --noEmit` and production bundle verification (`npm run build`).
- Passing `tsc` and `build` is necessary, not sufficient: layout work must explicitly state which viewports were visually verified (1920×1080, 1920×822, 1366×1024, 1024×1366, 820×1180, 768×1024) or explicitly declare "could not verify".
- React 19 hook patterns (e.g. `RefObject<T | null>`) must be strictly respected.

### V. Design System Consistency
All styling must adhere to the GreenLearn design tokens (`src/styles/variables.css` and `globals.css`):
- Vibrant, curated emerald/green palette (`--color-primary`, `--color-emerald-*`)
- Rich dark-mode and glassmorphic surfaces (`--color-surface`, `--color-card-bg`)
- Standardized typography with fluid `clamp()` sizing
- Consistent micro-interactions, focus rings, and accessible button/input states

### VI. Scroll Tier Architecture
Desktop student pages are zero-scroll with internal scroll regions only, while iPad/tablet tiers use natural document scroll. Documented exceptions: Admin, Profile, Help Center, and Settings pages use document scroll by design.

## Technical Stack & Standards

- **Core Framework**: React 19, TypeScript, Vite
- **Styling**: Scoped CSS modules / component CSS + Tailwind utility support + CSS Container Queries
- **Icons**: Lucide React (`lucide-react`)
- **State & Hooks**: Local React state, custom feature hooks (`useDashboardEnrollment`, etc.), React Router for navigation
- **Domain Areas**: Student Dashboard Bento, Explore & Course Catalog, Lesson Player & Curriculum, Calendar & Timezone Workspace (Egypt standard time aware), Assignments, Messages, Gamification (Streak & XP).
- **Dependency Discipline**: Never add, remove, or upgrade a package without stating the package name and technical reason, and never hand-edit lockfiles. Note that `@reduxjs/toolkit` is strictly a transitive dependency of `recharts` and forbidden for application use; TypeScript is 7.x, so never force packages with `^5` peer ranges using `--legacy-peer-deps`.
- **API Access**: Use the typed client in `src/app/api/client.ts` with schema types from `src/types/api-schema.d.ts`; hand-written fetch calls for endpoints already in the spec are strictly forbidden.

## Spec-Driven Development Workflow

1. **Specify (`/speckit.specify`)**: Clarify user intent, outline functional requirements, establish acceptance criteria and edge cases.
2. **Plan (`/speckit.plan`)**: Architect the technical approach, identify modified/created files, define dependencies and risk mitigation.
3. **Tasks (`/speckit.tasks`)**: Break the plan into sequential, actionable tasks with test/verification criteria for each task.
4. **Implement (`/speckit.implement`)**: Execute tasks iteratively, validating types and build integrity after each step.
5. **Analyze & Validate (`/speckit.analyze`, `/speckit.checklist`)**: Verify complete requirements fulfillment and ensure zero regressions.

## Governance

- The Constitution is the supreme quality standard for GreenLearn.
- Any architectural change, refactoring, or new feature addition must demonstrate compliance with the Core Principles.
- Code must build cleanly with zero type errors before any task completion.
- **Git Safety**: Never push to remote branches, and commit only when explicitly requested by the user. Destructive git commands (`checkout --`, `reset`, `clean`, `stash`) are strictly forbidden on a dirty working tree.

**Version**: 1.1.0 | **Ratified**: 2026-10-08 | **Last Amended**: 2026-10-11

