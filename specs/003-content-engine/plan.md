# Implementation Plan: Content Engine (Blog & Case Studies)

**Branch**: `003-content-engine` | **Date**: January 13, 2026 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-content-engine/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a content management system for blog posts and case studies using Nuxt Content v3 with MDC (Markdown Components) support. Content will be organized in year-based directories, rendered as static pages with syntax highlighting, image optimization, tag-based filtering, and support for embedded interactive Vue components. The system must support bilingual content (English/Arabic) with RTL handling and exclude draft content (underscore-prefixed files) from public routes.

## Technical Context

**Language/Version**: TypeScript (strict mode) with Nuxt 4 (latest stable)  
**Primary Dependencies**: `@nuxt/content` v3, `@nuxt/ui` v4.3.0+, `@nuxt/image`, `@nuxtjs/i18n`, Tailwind CSS  
**Storage**: File-based Markdown storage in `/content` directory (no database)  
**Testing**: Vitest for component testing, Nuxt Content query validation  
**Target Platform**: Static Site Generation (SSG) with Vercel deployment  
**Project Type**: Web application (Nuxt monorepo structure)  
**Performance Goals**: List pages <1s load, detail pages <2s load, Lighthouse Performance ≥95  
**Constraints**: All images via NuxtImg/NuxtPicture, RTL-compliant layouts, build-time content validation  
**Scale/Scope**: 50-100 blog posts expected, 10-20 case studies, tag filtering, no pagination initially

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### ✅ I. Tech Stack Mandates (PASS)

- **Runtime**: Bun ✅ (project already uses Bun)
- **Framework**: Nuxt 4 ✅ (spec explicitly requires Nuxt Content with MDC)
- **UI Library**: Nuxt UI v4 ✅ (using existing design system from 002-ui-design-system)
- **Styling**: Tailwind CSS ✅ (via Nuxt UI)
- **Content Engine**: Nuxt Content v3 ✅ (per feature spec requirement)
- **Language**: TypeScript strict mode ✅ (all new code will be TypeScript)

**Status**: Full compliance. No violations.

### ✅ II. Performance-First (PASS)

- **Lighthouse Scores**: Target Performance ≥95, A11y ≥95, SEO ≥95 (SC-007 in spec)
- **Image Optimization**: All images use NuxtImg/NuxtPicture (FR-019, SC-006)
- **Rendering Mode**: Static Site Generation for all content pages (FR-029)
- **Bundle Size**: Nuxt Content is optimized, no additional heavy dependencies

**Status**: Aligned with constitution. Success criteria match or exceed requirements.

### ✅ III. Internationalization (i18n) (PASS)

- **Primary Language**: English (default) ✅
- **Secondary Language**: Arabic with RTL support ✅ (FR-023 through FR-026)
- **Content Strategy**: Translations stored in locale-specific structure (clarifications)
- **RTL Compliance**: Layout mirroring required (FR-026)

**Status**: Full compliance. User Story 5 explicitly addresses bilingual content.

### ✅ IV. SEO & Accessibility Excellence (PASS)

- **Meta Tags**: Nuxt SEO module already installed (001-global-setup)
- **Sitemap**: Auto-generated via nuxt-seo ✅
- **Semantic HTML**: Content rendered with proper heading hierarchy from markdown
- **ARIA Compliance**: Built into Nuxt UI components
- **Structured Data**: ✅ Resolved in research.md - JSON-LD Article schema for blog posts, CreativeWork for case studies

**Status**: Full compliance. Structured data will be implemented via useContentSEO composable.

### ✅ V. Type Safety & Code Quality (PASS)

- **TypeScript Strict Mode**: Enabled in tsconfig.json ✅
- **Linting**: ESLint configured ✅
- **Component Props**: All components will use typed interfaces ✅
- **API Responses**: Content queries return typed objects from Nuxt Content ✅

**Status**: Full compliance with existing project standards.

### 🎯 Overall Gate Status: **PASS** ✅

All constitutional principles are satisfied. No violations requiring justification. One optional enhancement identified (JSON-LD structured data) to be addressed in research phase.

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
content/
├── blog/
│   └── YYYY/                    # Year-based organization (e.g., 2026/)
│       ├── post-slug.md         # Published posts
│       └── _draft-post.md       # Drafts (underscore prefix, excluded from routes)
└── case-studies/
    └── YYYY/                    # Year-based organization
        ├── project-slug.md      # Published case studies
        └── _draft-project.md    # Drafts (underscore prefix)

components/
├── blog/
│   ├── BlogList.vue             # Blog post list with filtering
│   ├── BlogPostCard.vue         # Individual post preview card
│   └── BlogPostMeta.vue         # Post metadata display (date, read time, tags)
├── case-study/
│   ├── CaseStudyList.vue        # Case study showcase list
│   ├── CaseStudyCard.vue        # Case study preview card
│   └── CaseStudyMetrics.vue     # Metrics/results display component
└── content/
    ├── ContentImage.vue         # Enhanced image component for MDC
    ├── CodeBlock.vue            # Custom code block with copy button
    └── [other MDC components]   # Embeddable components for rich content

pages/
├── blog/
│   ├── index.vue                # Blog list page with tag filtering
│   └── [...slug].vue            # Dynamic blog post detail pages
└── case-studies/
    ├── index.vue                # Case study list page
    └── [...slug].vue            # Dynamic case study detail pages

composables/
├── useContentQuery.ts           # Typed Nuxt Content query helper
├── useContentFilter.ts          # Tag filtering logic
└── useReadTime.ts               # Reading time calculation

types/
├── content.ts                   # BlogPost, CaseStudy, ContentMetadata interfaces
└── filters.ts                   # Tag filtering types

tests/
├── components/
│   ├── blog/
│   │   ├── BlogList.test.ts
│   │   └── BlogPostCard.test.ts
│   └── case-study/
│       ├── CaseStudyList.test.ts
│       └── CaseStudyCard.test.ts
└── composables/
    ├── useContentQuery.test.ts
    └── useReadTime.test.ts
```

**Structure Decision**: Extends existing Nuxt monorepo structure with content-specific directories. Content files live in `/content` (Nuxt Content convention), components follow domain-driven organization from 002-ui-design-system spec, and pages use Nuxt file-system routing with catch-all routes for dynamic content slugs.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations detected.** All constitutional requirements are met without exceptions.
