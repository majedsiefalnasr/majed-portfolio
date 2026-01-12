<!--
  SYNC IMPACT REPORT
  ==================
  Version Change: N/A → 1.0.0 (Initial constitution)

  Added Principles:
    - I. Tech Stack Mandates (Bun + Nuxt 4 + Nuxt UI + TypeScript)
    - II. Performance-First
    - III. Internationalization (i18n)
    - IV. SEO & Accessibility Excellence
    - V. Type Safety & Code Quality

  Added Sections:
    - Core Architecture
    - Directory Structure
    - Quality & Standards
    - Governance

  Templates Status:
    ✅ plan-template.md - Compatible (Constitution Check section exists)
    ✅ spec-template.md - Compatible (Requirements/User Stories structure)
    ✅ tasks-template.md - Compatible (Phase-based task organization)

  Deferred Items: None
-->

# Majed Portfolio Constitution

## Core Principles

### I. Tech Stack Mandates (NON-NEGOTIABLE)

All development MUST adhere to the following technology stack:

- **Runtime**: Bun (latest stable version) — Node.js alternatives are prohibited
- **Framework**: Nuxt 4 (latest) — All pages/components MUST use Nuxt conventions
- **UI Library**: Nuxt UI v3 (latest compatible) — Custom component libraries prohibited unless extending Nuxt UI
- **Styling**: Tailwind CSS (via Nuxt UI) — Raw CSS files prohibited; utility-first approach mandatory
- **Content Engine**: Nuxt Content v3 — All blog posts and case studies MUST be Markdown/MDX in `/content`
- **Language**: TypeScript — Strict mode enabled; JavaScript files prohibited in `/src`, `/components`, `/pages`

**Rationale**: A unified stack ensures maintainability, reduces cognitive overhead, and leverages Nuxt ecosystem optimizations.

### II. Performance-First

Every feature and component MUST meet performance standards before merge:

- **Lighthouse Scores**: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 90
- **Image Optimization**: All images MUST use `<NuxtImg>` or `<NuxtPicture>` components — raw `<img>` tags prohibited
- **Rendering Mode**: Hybrid or SSG (Static Site Generation) preferred; SSR only when dynamic data requires it
- **Bundle Size**: Monitor and justify any dependency adding >50KB to the bundle

**Rationale**: A portfolio site is a professional showcase; poor performance directly impacts credibility and user experience.

### III. Internationalization (i18n)

The portfolio MUST support multiple languages with proper RTL handling:

- **Primary Language**: English (`en`) — Default locale
- **Secondary Language**: Arabic (`ar`) — Full RTL support required
- **Content Strategy**: All user-facing text MUST be translatable; hardcoded strings prohibited
- **RTL Compliance**: Layout, typography, and UI components MUST mirror correctly for Arabic

**Rationale**: Professional reach requires accessibility to Arabic-speaking audiences with native-quality experience.

### IV. SEO & Accessibility Excellence

All pages and content MUST be optimized for discoverability and accessibility:

- **Meta Tags**: Every page MUST have unique `<title>`, `<meta description>`, and OpenGraph tags
- **Sitemap**: Auto-generated sitemap via `nuxt-seo` module — manual sitemaps prohibited
- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3); landmarks for navigation
- **ARIA Compliance**: Interactive elements MUST have proper ARIA labels; keyboard navigation required
- **Structured Data**: Blog posts and case studies SHOULD include JSON-LD schema markup

**Rationale**: A portfolio must be discoverable; SEO and accessibility are competitive advantages, not afterthoughts.

### V. Type Safety & Code Quality

All code MUST pass strict quality gates:

- **TypeScript Strict Mode**: `strict: true` in `tsconfig.json` — no `any` types without explicit justification
- **Linting**: ESLint with Nuxt recommended config — zero warnings policy
- **Component Props**: All component props MUST be typed with interfaces/types
- **API Responses**: External data MUST be validated with Zod or equivalent runtime validation

**Rationale**: Type safety prevents runtime errors and self-documents the codebase for future maintenance.

## Core Architecture

### Rendering Strategy

- **Default**: Static Site Generation (SSG) for all portfolio pages, blog posts, and case studies
- **Hybrid Exceptions**: Dynamic routes only when real-time data is required (e.g., analytics dashboard if added)
- **Prerendering**: All known routes MUST be prerendered at build time

### Component Architecture

- **Design Pattern**: Domain-driven component organization
- **Base Components**: Extend Nuxt UI primitives; avoid reinventing solved UI patterns
- **Composition**: Use Vue 3 Composition API with `<script setup lang="ts">` syntax exclusively

## Directory Structure

The following directory structure MUST be maintained:

```
/content          # Markdown/MDX files for Blog and Case Studies (Nuxt Content)
/components       # Vue components (domain-driven organization)
/pages            # Nuxt file-system routing
/composables      # Shared composition functions
/assets           # Static assets (images, fonts, styles)
/public           # Public static files (favicon, robots.txt)
/locales          # i18n translation files (en.json, ar.json)
/types            # Shared TypeScript type definitions
```

## Quality & Standards

### Pre-Merge Checklist

All pull requests MUST satisfy:

1. ✅ TypeScript compilation passes with zero errors
2. ✅ ESLint passes with zero warnings
3. ✅ Lighthouse audit meets score thresholds (Performance ≥ 95, A11y ≥ 95, SEO ≥ 95)
4. ✅ All pages have complete meta tags and OpenGraph data
5. ✅ RTL layout tested for Arabic locale (if i18n content modified)
6. ✅ Images use Nuxt Image components with proper sizing

### Development Commands

- **Package Manager**: Bun exclusively — `npm`, `yarn`, `pnpm` commands prohibited
- **Dev Server**: `bun run dev`
- **Build**: `bun run build`
- **Generate Static**: `bun run generate`

## Governance

This Constitution is the authoritative source for all development decisions on the Majed Portfolio project.

### Amendment Process

1. Propose changes via pull request modifying this file
2. Document rationale for each change
3. Version bump follows semantic versioning:
   - **MAJOR**: Principle removal or backward-incompatible governance change
   - **MINOR**: New principle added or existing principle materially expanded
   - **PATCH**: Clarifications, typo fixes, non-breaking refinements
4. Update `Last Amended` date upon merge

### Compliance

- All code reviews MUST verify Constitution compliance
- Violations require explicit justification documented in PR description
- Recurring violations warrant Constitution amendment discussion

**Version**: 1.0.0 | **Ratified**: 2026-01-12 | **Last Amended**: 2026-01-12
