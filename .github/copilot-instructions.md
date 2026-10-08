# GreenLearn — E-Learning Web Application Context

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->

## Project Overview
GreenLearn is a modern, responsive E-Learning Student & Educator Platform built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. It uses a fluid **Bento Grid** architecture powered by CSS Container Queries (`@container bento-slot`) to deliver zero-compromise UX across everything from mobile phones to 4K ultra-wide monitors and iPad viewports.

## Core Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Component-scoped CSS + Tailwind CSS + CSS Container Queries
- **Icons**: `lucide-react`
- **Routing**: React Router with modular route definitions (`src/app/router/`)
- **Documentation**: Comprehensive architecture docs in `docs/` (`PROJECT_DOCUMENTATION.md`, `PAGES_AND_SCREENS.md`, and `docs/components/`)

## Architecture & Directory Layout
```
src/
├── main.tsx                    # Application entry point
├── app/                        # App shell, router, providers, layout
│   ├── config/                 # Environment variables and config
│   ├── providers/              # Theme, Auth, Query providers
│   └── router/                 # Route tables & loading fallbacks
├── components/
│   ├── layout/                 # AppShell, Sidebar, Top Navigation
│   └── ui/                     # UI components, cards, modaled dialogs, Bento blocks
│       ├── Bento/              # Bento grid containers
│       ├── Calendar/           # Multi-view Calendar workspace & helpers
│       ├── ProgressRing/       # Shared SVG progress math & ring component
│       ├── Continue_Learning/  # Lesson in-progress card
│       ├── WeeklyGoalCard/     # 7-day indicator & study hour tracker
│       └── Skeleton/           # Route-specific loading skeletons
├── features/
│   ├── student/                # Student domain pages (Home, Courses, Lessons, Schedule, Profile)
│   └── admin/                  # Admin dashboard & course creation
├── shared/                     # Reusable utilities, formatting, shared hooks
└── styles/
    ├── variables.css           # Color tokens, radii, elevations
    └── globals.css             # Base resets, typography clamp
```

## Key Engineering Rules
1. **Zero Visual & Behavioral Regressions**: Refactorings must preserve pixel-perfect aesthetics, animations, and behaviors.
2. **Modular File Sizes**: Keep components under 300-400 lines; extract helpers, subcomponents, and types into separate files.
3. **Responsive Breakpoints**: Honor the unified breakpoint standard (`1199px`, `1024px`, `820px`, `768px`) and CSS container queries.
4. **Verification Gates**: Always run `npx tsc --noEmit` and `npm run build` to verify changes before marking tasks complete.

## SpecKit Workflow
- Use `/speckit.specify` to generate feature requirements and user stories.
- Use `/speckit.plan` to architect the implementation approach.
- Use `/speckit.tasks` to generate actionable task checklists.
- Use `/speckit.implement` to execute approved tasks systematically.
- Use `/speckit.checklist` / `/speckit.analyze` to audit requirements quality and code integrity.
