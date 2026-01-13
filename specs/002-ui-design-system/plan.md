# Implementation Plan: UI & Design System

**Branch**: `002-ui-design-system` | **Date**: 2026-01-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-ui-design-system/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a minimalist, high-performance design system with comprehensive theming (light/dark modes), internationalization (English/Arabic with RTL support), and reusable layout components. The system will use Geist typography, a semantic color token system with 100+ tokens across Background/Border/Button/Icon/Typography categories, and responsive container components. Technical approach includes Nuxt UI v4 theming system, Tailwind CSS utilities with logical properties for RTL, composables for theme/language state management, and optimized font loading to achieve zero cumulative layout shift.

## Technical Context

**Language/Version**: TypeScript (strict mode enabled per constitution)  
**Primary Dependencies**:

- Nuxt 4 (latest stable)
- Nuxt UI v4 (v4.3.0+) - Component library and theming system
- Tailwind CSS (via Nuxt UI) - Utility-first styling with logical properties
- @nuxt/fonts - Optimized font loading for Geist typeface
- @nuxtjs/i18n - Internationalization with RTL support

**Storage**: Browser localStorage for theme preference persistence; composables for reactive state management  
**Testing**: Vitest for unit tests, component testing for layout components; Lighthouse audits for performance validation  
**Target Platform**: Web (SSG/hybrid rendering); Modern browsers with CSS custom properties support  
**Project Type**: Web application (Nuxt-based portfolio site)  
**Performance Goals**:

- Lighthouse Performance ≥ 95
- Zero Cumulative Layout Shift (CLS = 0) during font loading
- Theme toggle response < 100ms
- Theme transition duration: 200ms

**Constraints**:

- Must use Tailwind CSS logical properties exclusively (no fixed left/right)
- WCAG AA contrast ratios (4.5:1 body text, 3:1 large text)
- Color tokens must follow semantic naming (Background/Border/Button/Icon/Typography)
- Container must use default Tailwind breakpoints (sm/md/lg/xl)

**Scale/Scope**:

- 100+ color tokens (light and dark mode variants)
- 5 navigation pages (Home, Work/Projects, About, Blog/Writing, Contact)
- 4 social links (GitHub, LinkedIn, Twitter/X, Email)
- 2 locales (English, Arabic with full RTL support)
- 3 core layout components (AppHeader, AppFooter, Container)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### I. Tech Stack Mandates ✅ PASS

- ✅ Runtime: Bun (inherited from project setup)
- ✅ Framework: Nuxt 4 (layout components use Nuxt conventions)
- ✅ UI Library: Nuxt UI v4 (v4.3.0+) - Using theming system and extending primitives
- ✅ Styling: Tailwind CSS via Nuxt UI - Utility-first with logical properties for RTL
- ✅ Content Engine: N/A for this feature
- ✅ Language: TypeScript strict mode for all components and composables

### II. Performance-First ✅ PASS

- ✅ Lighthouse target: Performance ≥ 95 (specified in requirements)
- ✅ Image optimization: Will use `<NuxtImg>` for any imagery in layout components
- ✅ Rendering: SSG preferred (layout components compatible with static generation)
- ✅ Bundle size: Geist font subsetting and Tailwind purge will minimize bundle impact
- ✅ Font loading: Using @nuxt/fonts for optimized loading with zero CLS

### III. Internationalization ✅ PASS

- ✅ Primary: English (en) locale
- ✅ Secondary: Arabic (ar) with full RTL support
- ✅ Content strategy: All layout text translatable via i18n keys
- ✅ RTL compliance: Using Tailwind logical properties (start/end instead of left/right)
- ✅ Layout mirroring: Logo and navigation auto-flip with text direction

### IV. SEO & Accessibility Excellence ✅ PASS

- ✅ Meta tags: AppHeader will support proper semantic structure
- ✅ Sitemap: N/A for this feature (handled at project level)
- ✅ Semantic HTML: Header/Footer use proper landmarks (`<header>`, `<footer>`, `<nav>`)
- ✅ ARIA compliance: Navigation links keyboard accessible, dark mode toggle labeled
- ✅ WCAG AA: Color contrast ratios validated for all color tokens (4.5:1 / 3:1)

### V. Type Safety & Code Quality ✅ PASS

- ✅ TypeScript strict mode: All components and composables strictly typed
- ✅ Linting: ESLint with Nuxt config (zero warnings policy)
- ✅ Component props: AppHeader, AppFooter, Container props fully typed with interfaces
- ✅ State validation: Theme preference and language setting validated at composable level

**Overall Status**: ✅ **PASS** - No constitutional violations. Feature fully compliant with all mandates.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── components/
│   ├── AppHeader.vue          # Main navigation header with logo and links
│   ├── AppFooter.vue          # Footer with social links, copyright, language/theme toggles
│   └── Container.vue          # Responsive width-constrained wrapper
├── composables/
│   ├── useTheme.ts            # Theme state management (light/dark/system)
│   └── useLanguage.ts         # Language state management (en/ar, RTL handling)
├── assets/
│   └── css/
│       ├── main.css           # Global styles, font imports
│       └── tokens.css         # CSS custom properties for color tokens (Light/Dark themes)
├── types/
│   ├── theme.ts               # Theme-related type definitions
│   └── layout.ts              # Layout component prop types
└── app.vue                    # Root component with theme/language providers

i18n/
├── en.json                    # English translations (navigation, footer labels)
└── ar.json                    # Arabic translations with RTL-aware content

test/
├── components/
│   ├── AppHeader.test.ts
│   ├── AppFooter.test.ts
│   └── Container.test.ts
└── composables/
    ├── useTheme.test.ts
    └── useLanguage.test.ts
```

**Structure Decision**: Web application structure following Nuxt 4 conventions. Layout components in `/app/components`, theme/i18n logic in composables, color tokens as CSS custom properties in `/app/assets/css/tokens.css`. Translation files in `/i18n` per constitution requirements. Tests mirror source structure using Vitest.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
