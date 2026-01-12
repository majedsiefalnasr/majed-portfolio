# Implementation Plan: Global Setup & Configuration

**Branch**: `001-global-setup` | **Date**: 2026-01-12 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-global-setup/spec.md`

## Summary

Initialize a Nuxt 4 project with Bun as the runtime, install and configure core modules (@nuxt/ui, @nuxt/content, @nuxt/image, @nuxtjs/i18n, @nuxtjs/seo), and set up internationalization for English (default) and Arabic (RTL) with global SEO defaults including site name and OpenGraph placeholder.

## Technical Context

**Language/Version**: TypeScript (strict mode) with Vue 3 Composition API  
**Runtime**: Bun (latest stable)  
**Framework**: Nuxt 4 (latest)  
**Primary Dependencies**:

- `@nuxt/ui` v4 — UI components with Tailwind CSS v4
- `@nuxt/content` v3 — Markdown/MDX content management
- `@nuxt/image` — Image optimization with `<NuxtImg>` components
- `@nuxtjs/i18n` — Internationalization with lazy-loading
- `@nuxtjs/seo` — SEO toolkit (sitemap, meta, OpenGraph)

**Storage**: N/A (static content via Nuxt Content)  
**Testing**: Vitest (Nuxt default) — manual verification for this setup feature  
**Target Platform**: Web (SSG/Hybrid), deployed to Vercel  
**Project Type**: Web application (frontend-only, SSG)  
**Performance Goals**: Lighthouse ≥ 95 (Performance, Accessibility, SEO)  
**Constraints**: <2s initial page load, RTL layout for Arabic locale  
**Scale/Scope**: Personal portfolio (low traffic, static content)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Pre-Phase 0 Check

| Principle                     | Status  | Notes                                              |
| ----------------------------- | ------- | -------------------------------------------------- |
| I. Tech Stack Mandates        | ✅ PASS | Bun + Nuxt 4 + Nuxt UI v4 + TypeScript strict mode |
| II. Performance-First         | ✅ PASS | SSG rendering, `@nuxt/image` for optimization      |
| III. Internationalization     | ✅ PASS | English (default) + Arabic (RTL) configured        |
| IV. SEO & Accessibility       | ✅ PASS | `@nuxtjs/seo` with sitemap, meta tags, OpenGraph   |
| V. Type Safety & Code Quality | ✅ PASS | TypeScript strict mode, ESLint Nuxt config         |

**Gate Result**: ✅ All principles satisfied — proceed to Phase 0

### Post-Phase 1 Re-Check

| Principle                     | Status  | Verification                                             |
| ----------------------------- | ------- | -------------------------------------------------------- |
| I. Tech Stack Mandates        | ✅ PASS | research.md confirms Bun + Nuxt 4 + all required modules |
| II. Performance-First         | ✅ PASS | SSG mode, `@nuxt/image` installed, lazy-loading enabled  |
| III. Internationalization     | ✅ PASS | `prefix_except_default` strategy, RTL via `dir` property |
| IV. SEO & Accessibility       | ✅ PASS | `@nuxtjs/seo` configured with sitemap and OpenGraph      |
| V. Type Safety & Code Quality | ✅ PASS | TypeScript strict mode in nuxt.config.ts design          |

**Gate Result**: ✅ All principles still satisfied — ready for Phase 2 (tasks)

## Project Structure

### Documentation (this feature)

```text
specs/001-global-setup/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A for setup feature)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
/                         # Repository root
├── nuxt.config.ts        # Nuxt configuration with modules
├── package.json          # Dependencies (Bun)
├── tsconfig.json         # TypeScript strict mode
├── app.vue               # Root app component
├── pages/                # Nuxt file-system routing
│   └── index.vue         # Homepage placeholder
├── components/           # Vue components (domain-driven)
├── composables/          # Shared composition functions
├── content/              # Markdown/MDX content (Nuxt Content)
├── assets/
│   └── css/
│       └── main.css      # Tailwind CSS entry point
├── public/
│   └── og-image.png      # OpenGraph image placeholder
├── locales/              # i18n translation files
│   ├── en.json           # English translations
│   └── ar.json           # Arabic translations
└── types/                # Shared TypeScript definitions
```

**Structure Decision**: Frontend-only Nuxt 4 application following constitution directory structure. No backend required — all content is static via Nuxt Content.

## Complexity Tracking

> No violations detected — Constitution Check passed without exceptions.
