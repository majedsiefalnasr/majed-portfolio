# Implementation Plan: SEO Optimization with Best Practices

**Branch**: `005-seo-optimization` | **Date**: 2026-01-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-seo-optimization/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement comprehensive SEO optimization for the portfolio website covering static pages (homepage, about), blog posts, and case studies. The solution will leverage Nuxt SEO ecosystem modules to provide automatic meta tag generation, OpenGraph/Twitter Card support, JSON-LD structured data, XML sitemap generation, and performance optimizations aligned with Core Web Vitals requirements. This ensures maximum search engine discoverability and optimal social media sharing experience across English and Arabic content with proper RTL support.

## Technical Context

**Language/Version**: TypeScript 5.6+ (strict mode) with Vue 3.5+ Composition API  
**Primary Dependencies**:

- @nuxtjs/seo 3.3.0+ (meta tags, sitemap, schema.org)
- @nuxt/content 3.10.0+ (markdown content source)
- @nuxt/image 2.0.0+ (optimized images for performance)
- @nuxtjs/i18n 10.2.1+ (bilingual support)
- @unhead/vue 2.0.3+ (head management)
- Zod 4.3.5+ (schema validation)

**Storage**: File-based (Markdown frontmatter for metadata, static JSON-LD schemas)  
**Testing**: Vitest 4.0.17+ for unit/integration tests, Lighthouse CI for SEO audits  
**Target Platform**: Static Site Generation (SSG) with Nuxt 4.2.2+, deployed to Vercel/Netlify  
**Project Type**: Web application (JAMstack architecture)  
**Performance Goals**:

- Lighthouse SEO score ≥ 95
- LCP < 2.5s, FID < 100ms, CLS < 0.1
- Page weight < 1MB initial load
- Time to Interactive < 3.5s on 3G

**Constraints**:

- Must work with existing Nuxt Content structure
- Zero breaking changes to existing blog/case study frontmatter
- Must support both English and Arabic with proper hreflang tags
- Build time < 60s for full static generation

**Scale/Scope**:

- ~50-100 blog posts initially, growing to 500+
- ~10-20 case studies
- 5-10 static pages
- Bilingual (English + Arabic)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### I. Tech Stack Mandates ✅ COMPLIANT

- **Runtime**: Bun - ✅ No changes required
- **Framework**: Nuxt 4 - ✅ Using Nuxt conventions (pages, composables, components)
- **UI Library**: Nuxt UI v4 - ✅ No custom UI components for SEO functionality
- **Styling**: Tailwind CSS - ✅ No raw CSS required for SEO implementation
- **Content Engine**: Nuxt Content v3 - ✅ Extending existing content with SEO metadata
- **Language**: TypeScript strict mode - ✅ All new code will use TypeScript with strict mode

### II. Performance-First ✅ COMPLIANT

- **Lighthouse Scores**: ✅ SEO optimization targets Performance ≥ 95, SEO ≥ 95, Accessibility ≥ 95
- **Image Optimization**: ✅ FR-023 requires width/height attributes; existing `<NuxtImg>` usage maintained
- **Rendering Mode**: ✅ SSG/hybrid maintained; sitemap generated at build time
- **Bundle Size**: ✅ Using existing @nuxtjs/seo module (already in dependencies), no new large dependencies

### III. Internationalization (i18n) ✅ COMPLIANT

- **Primary Language**: ✅ English (en) default maintained
- **Secondary Language**: ✅ Arabic (ar) with RTL support via FR-014, FR-015, FR-016
- **Content Strategy**: ✅ SEO metadata will be translatable via frontmatter
- **RTL Compliance**: ✅ FR-016 ensures dir="rtl" for Arabic pages; hreflang tags for language versions

### IV. SEO & Accessibility Excellence ✅ COMPLIANT (Core Feature)

- **Meta Tags**: ✅ FR-001, FR-002, FR-003, FR-004 ensure unique tags per page
- **Sitemap**: ✅ FR-017 using @nuxtjs/seo auto-generation (already configured)
- **Semantic HTML**: ✅ FR-025 enforces proper heading hierarchy
- **ARIA Compliance**: ✅ Existing @nuxt/a11y module maintained
- **Structured Data**: ✅ FR-007 through FR-012 implement JSON-LD schemas

### V. Type Safety & Code Quality ✅ COMPLIANT

- **TypeScript Strict Mode**: ✅ All composables, utilities, and types will use strict TypeScript
- **Linting**: ✅ Existing ESLint config will validate new code
- **Component Props**: ✅ Any new components will have typed props
- **API Responses**: ✅ Zod schemas will validate frontmatter metadata (FR-030, FR-031)

### Rendering Strategy ✅ COMPLIANT

- **Default SSG**: ✅ All SEO features work with existing static generation
- **Prerendering**: ✅ Sitemap and meta tags generated at build time

### Component Architecture ✅ COMPLIANT

- **Design Pattern**: ✅ SEO composables follow domain-driven organization
- **Base Components**: ✅ No new UI components needed; extends existing Nuxt features

**GATE RESULT**: ✅ **PASSED** - Zero constitution violations. All requirements align with existing architecture and principles.

## Project Structure

### Documentation (this feature)

```text
specs/005-seo-optimization/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (next)
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (JSON-LD schemas)
│   ├── article.json     # Blog post Article schema
│   ├── creative-work.json # Case study CreativeWork schema
│   ├── person.json      # Homepage Person schema
│   └── breadcrumb.json  # Navigation BreadcrumbList schema
└── checklists/
    └── requirements.md  # Quality checklist (completed)
```

### Source Code (repository root)

```text
app/
├── composables/
│   ├── useContentSEO.ts      # Existing - will enhance with SEO metadata
│   ├── useSEO.ts             # NEW - SEO metadata generation
│   └── useStructuredData.ts  # NEW - JSON-LD schema generation
├── components/
│   └── content/
│       └── (existing components - no changes required)
├── pages/
│   ├── index.vue             # Homepage - add Person schema
│   ├── blog/
│   │   ├── index.vue         # Blog index - enhance meta tags
│   │   └── [...slug].vue     # Blog post - add Article schema
│   └── case-studies/
│       ├── index.vue         # Case study index - enhance meta tags
│       └── [...slug].vue     # Case study - add CreativeWork schema
├── utils/
│   ├── seo/
│   │   ├── meta-builder.ts        # NEW - Build meta tags
│   │   ├── structured-data.ts     # NEW - Schema.org builders
│   │   ├── image-optimizer.ts     # NEW - OG image handling
│   │   └── validators.ts          # NEW - SEO field validation
├── types/
│   └── seo.ts                # NEW - SEO metadata types
└── server/
    └── api/
        └── __sitemap__/
            ├── blog.ts           # NEW - Dynamic blog sitemap source
            └── case-studies.ts   # NEW - Dynamic case study sitemap source

content/
├── blog/
│   └── 2026/
│       └── *.md              # ENHANCED - Add optional seo frontmatter fields
└── case-studies/
    └── *.md                  # ENHANCED - Add optional seo frontmatter fields

public/
├── images/
│   └── og/
│       └── default.png       # NEW - Default 1200x630 OG image
└── robots.txt                # ENHANCED - Reference sitemap

tests/
├── composables/
│   ├── useSEO.test.ts        # NEW - SEO composable tests
│   └── useStructuredData.test.ts # NEW - Structured data tests
└── utils/
    └── seo/
        ├── meta-builder.test.ts  # NEW - Meta tag generation tests
        └── validators.test.ts     # NEW - Validation tests
```

**Structure Decision**: Extending existing Nuxt 4 web application structure. SEO functionality implemented as composables and utilities following established patterns. No new directories at root level - all additions integrate into existing `/app` structure per Constitution directory requirements.

---

## Phase 0: Research (✅ COMPLETED)

**Output**: [research.md](./research.md)

**Key Decisions Made**:

1. Use @nuxtjs/seo as primary SEO framework (already installed, comprehensive features)
2. Implement structured data via useSchemaOrg() composable (type-safe, auto-validation)
3. Generate sitemap at build time with dynamic Nuxt Content sources
4. Use 1200x630px default OG images (Facebook/LinkedIn standard)
5. Implement hreflang via @nuxtjs/i18n auto-generation
6. Canonical URLs exclude trailing slashes (Nuxt default, modern standard)
7. Soft validation with Zod (warnings, not blocking errors)

**Research Areas Covered**:

- Nuxt SEO module capabilities and integration
- Schema.org structured data best practices
- Meta tag generation and social sharing optimization
- Sitemap configuration for dynamic content
- Image optimization for Core Web Vitals
- Hreflang implementation for bilingual content
- Canonical URL strategies
- Frontmatter validation approaches

---

## Phase 1: Design (✅ COMPLETED)

### Outputs

1. **[data-model.md](./data-model.md)** ✅
   - SEO Metadata type definitions
   - Content frontmatter extensions (blog posts & case studies)
   - Schema.org entity definitions (Article, CreativeWork, Person, BreadcrumbList)
   - Sitemap entry structure
   - Image metadata specifications
   - Complete data flow diagram

2. **[contracts/](./contracts/)** ✅
   - [article.json](./contracts/article.json) - JSON Schema for blog post Article
   - [creative-work.json](./contracts/creative-work.json) - JSON Schema for case study CreativeWork
   - [person.json](./contracts/person.json) - JSON Schema for homepage Person
   - [breadcrumb.json](./contracts/breadcrumb.json) - JSON Schema for navigation breadcrumbs

3. **[quickstart.md](./quickstart.md)** ✅
   - Content author guide for adding SEO metadata
   - Developer implementation patterns
   - Testing procedures (Lighthouse, social media validators, Schema.org)
   - Troubleshooting common issues
   - Code examples for composables and utilities

### Constitution Re-Check (Post-Design)

**Status**: ✅ **PASSED** - Design maintains full compliance

All design decisions align with Constitution principles:

- TypeScript strict mode throughout (types/seo.ts, all utilities)
- Zod validation for runtime safety
- Extends existing Nuxt Content without breaking changes
- No new UI components (SEO is non-visual)
- Maintains SSG rendering strategy
- Performance-first with lazy loading and WebP optimization
- Full i18n support with hreflang and RTL

---

## Implementation Readiness

### Prerequisites Met ✅

- [x] Constitution Check passed (zero violations)
- [x] Research completed with technology decisions
- [x] Data models defined with TypeScript types
- [x] JSON Schema contracts created for all structured data types
- [x] Quickstart guide written for authors and developers
- [x] Agent context updated with SEO technologies

### Key Files to Implement

**Phase 2 (Implementation) - Core Composables**:

1. `app/composables/useSEO.ts` - Main SEO metadata composable
2. `app/composables/useStructuredData.ts` - Schema.org builder wrapper
3. `app/utils/seo/meta-builder.ts` - Meta tag generation utility
4. `app/utils/seo/validators.ts` - Frontmatter validation with Zod
5. `app/types/seo.ts` - TypeScript type definitions

**Phase 2 - Page Enhancements**: 6. `app/pages/index.vue` - Add Person schema 7. `app/pages/blog/[...slug].vue` - Add Article schema + breadcrumbs 8. `app/pages/case-studies/[...slug].vue` - Add CreativeWork schema + breadcrumbs 9. `app/pages/blog/index.vue` - Enhanced meta tags 10. `app/pages/case-studies/index.vue` - Enhanced meta tags

**Phase 2 - Configuration**: 11. `nuxt.config.ts` - Sitemap configuration updates 12. `server/api/__sitemap__/blog.ts` - Dynamic blog sitemap source (Nuxt SEO module convention) 13. `server/api/__sitemap__/case-studies.ts` - Dynamic case study sitemap source (Nuxt SEO module convention) 14. `public/images/og/default.png` - Create 1200x630 default OG image

**Phase 2 - Testing**: 15. `tests/composables/useSEO.test.ts` 16. `tests/utils/seo/validators.test.ts` 17. `tests/utils/seo/meta-builder.test.ts`

### Success Criteria Mapping

| Success Criterion               | Implementation Strategy                                      |
| ------------------------------- | ------------------------------------------------------------ |
| SC-001: Lighthouse SEO ≥ 95     | Comprehensive meta tags, structured data, semantic HTML      |
| SC-002: 100% indexing in 7 days | XML sitemap with all content, robots.txt configured          |
| SC-003: LCP < 2.5s              | Image optimization, lazy loading, WebP format                |
| SC-004: CLS < 0.1               | Width/height on all images (enforced via validation)         |
| SC-005: 100% social accuracy    | OG tags, Twitter Cards, 1200x630 images, validation tools    |
| SC-006: 50% impression increase | Optimized titles/descriptions, structured data rich snippets |
| SC-007: CTR > 3.5%              | Compelling meta descriptions, keyword optimization           |
| SC-008: 100% sitemap coverage   | Dynamic sitemap generation from Nuxt Content                 |
| SC-009: FID < 100ms             | Static generation, minimal client-side JavaScript            |
| SC-010: 80% rich snippets       | JSON-LD for all content types, Schema.org validation         |

---

## Next Steps

**Ready for Phase 2**: Implementation via `/speckit.tasks` command

The planning phase is complete. All research questions resolved, data models defined, contracts created, and implementation strategy documented. Zero constitution violations. Proceed to task breakdown and implementation.

**Recommended Task Sequence**:

1. **Core Infrastructure**: Types, validators, meta-builder utility
2. **Composables**: useSEO(), useStructuredData()
3. **Page Integration**: Homepage → Blog → Case Studies
4. **Sitemap**: Configuration + dynamic sources
5. **Assets**: Default OG image
6. **Testing**: Unit tests for all utilities and composables
7. **Validation**: Lighthouse audits, social media testing, Schema.org validation

**Estimated Implementation Time**: 8-12 hours for core features + 4-6 hours for testing and validation
