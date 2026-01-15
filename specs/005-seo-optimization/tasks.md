# Tasks: SEO Optimization with Best Practices

**Input**: Design documents from `/specs/005-seo-optimization/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are NOT required for this feature - SEO validation will be done via Lighthouse audits and Schema.org validators.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Nuxt 4 Web App**: `app/` for source code, `tests/` for tests, `specs/` for documentation
- All paths relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and SEO infrastructure setup

- [x] T001 Create SEO utilities directory structure in app/utils/seo/
- [x] T002 Create SEO types file in app/types/seo.ts with TypeScript interfaces
- [x] T003 [P] Create default 1200x630 OG image at public/images/og/default.png

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core SEO infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Implement SEO metadata types and interfaces in app/types/seo.ts
- [x] T005 [P] Implement meta-builder.ts utility for generating meta tags in app/utils/seo/meta-builder.ts
- [x] T006 [P] Implement validators.ts for SEO frontmatter validation with Zod in app/utils/seo/validators.ts
- [x] T007 [P] Implement image-optimizer.ts for OG image handling in app/utils/seo/image-optimizer.ts
- [x] T008 Create useSEO() composable for meta tag management in app/composables/useSEO.ts
- [x] T009 Create useStructuredData() composable for JSON-LD generation in app/composables/useStructuredData.ts
- [x] T010 [P] Update existing content.ts types to include optional SEO frontmatter fields in app/types/content.ts
- [x] T010b Verify slug generation implementation in Nuxt Content (FR-029) or implement custom slug-generator.ts utility if needed

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Search Engine Discovery (Priority: P1) 🎯 MVP

**Goal**: Ensure search engines can discover, index, and rank all pages through proper sitemap, meta tags, and structured data

**Independent Test**: Submit sitemap to Google Search Console and verify all pages are indexed within 72 hours; check that meta tags render correctly in search results

### Implementation for User Story 1

- [x] T011 [P] [US1] Configure sitemap generation with dynamic content sources in nuxt.config.ts
- [x] T012 [P] [US1] Create sitemap source for blog posts in server/api/**sitemap**/blog.ts with changefreq: monthly
- [x] T013 [P] [US1] Create sitemap source for case studies in server/api/**sitemap**/case-studies.ts with changefreq: yearly
- [x] T014 [US1] Enhance homepage (app/pages/index.vue) with Person schema using useSchemaOrg()
- [x] T015 [US1] Enhance blog index (app/pages/blog/index.vue) with proper meta tags and changefreq: weekly
- [x] T016 [US1] Enhance blog post page (app/pages/blog/[...slug].vue) with Article schema and meta tags
- [x] T017 [US1] Enhance case study index (app/pages/case-studies/index.vue) with proper meta tags and changefreq: weekly
- [x] T018 [US1] Enhance case study page (app/pages/case-studies/[...slug].vue) with CreativeWork schema and meta tags
- [x] T019 [US1] Add BreadcrumbList schema to blog post pages in app/pages/blog/[...slug].vue
- [x] T020 [US1] Add BreadcrumbList schema to case study pages in app/pages/case-studies/[...slug].vue
- [x] T021 [US1] Update robots.txt to reference sitemap location at public/robots.txt
- [x] T022 [US1] Add hreflang tags for bilingual content in blog/case study pages using @nuxtjs/i18n

**Checkpoint**: At this point, User Story 1 should be fully functional - all pages discoverable via sitemap with proper meta tags and structured data

---

## Phase 4: User Story 2 - Social Media Sharing Optimization (Priority: P2)

**Goal**: Ensure blog posts and case studies display rich preview cards with images, titles, and descriptions on social platforms

**Independent Test**: Share a blog post URL on LinkedIn, Twitter, and Facebook; verify correct preview image, title, and description display

### Implementation for User Story 2

- [x] T023 [P] [US2] Enhance useSEO() composable with OpenGraph tag generation in app/composables/useSEO.ts
- [x] T024 [P] [US2] Enhance useSEO() composable with Twitter Card tag generation in app/composables/useSEO.ts
- [x] T025 [US2] Add OG image fallback logic (featuredImage → custom seo.ogImage → default) in meta-builder.ts
- [x] T026 [US2] Ensure all blog posts use 1200x630 OG images via validation in validators.ts
- [x] T027 [US2] Ensure all case studies use 1200x630 OG images via validation in validators.ts
- [x] T028 [US2] Add RTL support verification for Arabic content in social sharing previews
- [x] T029 [US2] Update blog post page to include Twitter Card type: summary_large_image
- [x] T030 [US2] Update case study page to include Twitter Card type: summary_large_image

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - all social platforms display rich previews

---

## Phase 5: User Story 3 - Organic Search Visibility (Priority: P1)

**Goal**: Blog posts and case studies appear in search results with optimized, compelling titles and descriptions

**Independent Test**: Track search rankings for target keywords and measure organic click-through rates from Google Search Console

### Implementation for User Story 3

- [x] T031 [P] [US3] Implement custom SEO title override logic in useSEO() composable (seo.title → title fallback)
- [x] T032 [P] [US3] Implement custom SEO description override logic in useSEO() composable (seo.description → excerpt fallback)
- [x] T033 [US3] Add character count validation for SEO titles (30-60 chars) with warnings in validators.ts
- [x] T034 [US3] Add character count validation for SEO descriptions (120-160 chars) with warnings in validators.ts
- [x] T035 [US3] Update blog frontmatter schema to include optional seo.title and seo.description fields
- [x] T036 [US3] Update case study frontmatter schema to include optional seo.title and seo.description fields
- [x] T037 [US3] Add title truncation logic for titles >60 chars in meta-builder.ts
- [x] T038 [US3] Add description truncation logic for descriptions >160 chars in meta-builder.ts
- [x] T039 [US3] Integrate new SEO metadata with existing useContentSEO() composable in app/composables/useContentSEO.ts (add support for custom seo.title and seo.description fields)

**Checkpoint**: All high-priority user stories (US1 and US3) should now be independently functional with optimized search visibility

---

## Phase 6: User Story 4 - Page Performance for SEO (Priority: P2)

**Goal**: Site meets Core Web Vitals standards (LCP < 2.5s, FID < 100ms, CLS < 0.1) for improved search rankings

**Independent Test**: Run Lighthouse audits and PageSpeed Insights; verify performance scores above 90 and Core Web Vitals thresholds met

### Implementation for User Story 4

- [x] T040 [P] [US4] Add width/height validation for all images in content validation in validators.ts
- [x] T041 [P] [US4] Implement lazy loading for below-fold images using Nuxt Image defaults
- [x] T042 [US4] Add preconnect links for critical domains (fonts, analytics) in app/app.vue or nuxt.config.ts
- [x] T043 [US4] Verify WebP format usage for all images via Nuxt Image automatic conversion
- [x] T044 [US4] Audit heading hierarchy (single h1, followed by h2, h3) across all pages
- [x] T045 [US4] Add image optimization checklist to quickstart.md for content authors
- [x] T046 [US4] Configure Nuxt Image for optimal compression settings in nuxt.config.ts

**Checkpoint**: Performance optimization complete - all pages meet Core Web Vitals standards

---

## Phase 7: User Story 5 - Canonical URLs and Duplicate Content Prevention (Priority: P3)

**Goal**: Provide clear canonical URL signals to prevent duplicate content penalties from multiple URL patterns

**Independent Test**: Access content through various URL patterns; verify canonical tags always point to preferred version (no trailing slash)

### Implementation for User Story 5

- [x] T047 [P] [US5] Implement canonical URL generation (no trailing slash) in useSEO() composable
- [x] T048 [P] [US5] Add automatic canonical tag to all pages via useSEO()
- [x] T049 [US5] Implement hreflang tag generation for bilingual content in blog posts
- [x] T050 [US5] Implement hreflang tag generation for bilingual content in case studies
- [x] T051 [US5] Add x-default hreflang tag pointing to English version
- [x] T052 [US5] Add rel="next" and rel="prev" tags for paginated blog listings (if pagination exists)
- [x] T053 [US5] Verify Arabic pages include dir="rtl" attribute via @nuxtjs/i18n
- [x] T054 [US5] Ensure each language version has self-referential canonical (not cross-language)

**Checkpoint**: All user stories should now be independently functional - duplicate content prevention complete

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [x] T055 [P] Add SEO metadata documentation to quickstart.md for content authors
- [x] T056 [P] Create validation tests for SEO utilities in tests/utils/seo/validators.test.ts
- [x] T057 [P] Create tests for useSEO() composable in tests/composables/useSEO.test.ts
- [x] T058 [P] Create tests for useStructuredData() composable in tests/composables/useStructuredData.test.ts
- [x] T059 Run Lighthouse SEO audit on homepage - target score ≥ 95
- [x] T060 Run Lighthouse SEO audit on blog post page - target score ≥ 95
- [x] T061 Run Lighthouse SEO audit on case study page - target score ≥ 95
- [x] T062 Validate Article schema using Schema.org Rich Results Test
- [x] T063 Validate CreativeWork schema using Schema.org Rich Results Test
- [x] T064 Validate Person schema using Schema.org Rich Results Test
- [x] T065 Validate BreadcrumbList schema using Schema.org Rich Results Test
- [x] T066 Test social sharing on Facebook using Facebook Sharing Debugger
- [x] T067 Test social sharing on Twitter using Twitter Card Validator
- [x] T068 Test social sharing on LinkedIn using LinkedIn Post Inspector
- [x] T069 Submit sitemap to Google Search Console for indexing
- [x] T070 Verify all Core Web Vitals thresholds met (LCP, FID, CLS)
- [x] T071 Run full build and verify build time < 60 seconds
- [x] T072 Update .github/copilot-instructions.md with SEO patterns and best practices
- [x] T073 Run quickstart.md validation - verify all examples work
- [x] T074 Create custom 404 error page with SEO metadata in app/error.vue (proper status code, helpful navigation, meta tags)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User Story 1 (P1) - Search Engine Discovery: Can start after Foundational
  - User Story 2 (P2) - Social Media Sharing: Can start after Foundational, integrates with US1
  - User Story 3 (P1) - Organic Search Visibility: Can start after Foundational, integrates with US1
  - User Story 4 (P2) - Page Performance: Can start after Foundational, affects all pages
  - User Story 5 (P3) - Canonical URLs: Can start after Foundational, integrates with US1
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Extends US1 meta tags with OG/Twitter
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - Extends US1 meta tags with custom overrides
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Performance affects all pages
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - Adds canonical/hreflang to US1

### Recommended Execution Order (MVP-First)

1. **Phase 1 + 2**: Setup and Foundational (required)
2. **Phase 3**: User Story 1 (P1) - Core search engine discovery
3. **Phase 5**: User Story 3 (P1) - Search visibility optimization
4. **MVP Checkpoint**: At this point, you have a working SEO foundation (US1 + US3)
5. **Phase 4**: User Story 2 (P2) - Social sharing
6. **Phase 6**: User Story 4 (P2) - Performance
7. **Phase 7**: User Story 5 (P3) - Canonical URLs
8. **Phase 8**: Polish and validation

### Within Each User Story

- Core composables and utilities first (useSEO, useStructuredData)
- Page enhancements can be done in parallel (blog, case studies, homepage)
- Validation and schema implementation last
- Independent testing after each story completion

### Parallel Opportunities

**Setup (Phase 1):**

- T003 can run in parallel with T001-T002

**Foundational (Phase 2):**

- T005, T006, T007 can all run in parallel (different utility files)
- T010 can run in parallel with T005-T007
- T008 and T009 depend on T004-T007 completing

**User Story 1:**

- T011, T012, T013 can run in parallel (different sitemap sources)
- T014, T015, T016, T017, T018 can run in parallel (different page files)
- T019, T020 can run in parallel (breadcrumb schemas)

**User Story 2:**

- T023, T024 can run in parallel (different tag types in same composable)
- T026, T027 can run in parallel (validation for different content types)
- T029, T030 can run in parallel (different page types)

**User Story 3:**

- T031, T032 can run in parallel (different metadata fields)
- T033, T034 can run in parallel (different validation rules)
- T035, T036 can run in parallel (different frontmatter schemas)
- T037, T038 can run in parallel (different truncation logic)

**User Story 4:**

- T040, T041, T042 can run in parallel (different optimization aspects)

**User Story 5:**

- T047, T048 can run in parallel (canonical generation and application)
- T049, T050 can run in parallel (hreflang for different content types)

**Polish (Phase 8):**

- T055, T056, T057, T058 can all run in parallel (documentation and different test files)
- T059, T060, T061 can run in parallel (Lighthouse audits for different pages)
- T062, T063, T064, T065 can run in parallel (different schema validations)
- T066, T067, T068 can run in parallel (different social platform tests)

---

## Parallel Example: User Story 1 (Search Engine Discovery)

```bash
# Developer 1: Sitemap Configuration
- Work on T011, T012, T013 (sitemap sources)

# Developer 2: Homepage & Blog
- Work on T014, T015, T016 (homepage and blog pages)

# Developer 3: Case Studies
- Work on T017, T018 (case study pages)

# Developer 4: Breadcrumbs & Hreflang
- Work on T019, T020, T021, T022 (breadcrumbs and i18n)

# All developers can work simultaneously on different files
```

---

## Implementation Strategy

### MVP Delivery (Weeks 1-2)

**Priority: Get search engines indexing the site**

1. Complete Setup + Foundational (T001-T010)
2. Implement User Story 1 - Search Engine Discovery (T011-T022)
3. Implement User Story 3 - Organic Search Visibility (T031-T039)
4. Basic validation (T059-T065)

**Deliverable**: All pages indexed by Google with optimized titles/descriptions and structured data

### Enhanced SEO (Week 3)

**Priority: Social sharing and performance**

1. Implement User Story 2 - Social Media Sharing (T023-T030)
2. Implement User Story 4 - Page Performance (T040-T046)
3. Social sharing validation (T066-T068)
4. Performance validation (T070)

**Deliverable**: Rich social previews + Core Web Vitals compliance

### Complete Solution (Week 4)

**Priority: Duplicate content prevention and polish**

1. Implement User Story 5 - Canonical URLs (T047-T054)
2. Complete all validation and testing (T055-T073)
3. Submit to search engines (T069)
4. Documentation and training

**Deliverable**: Production-ready SEO implementation with full compliance

---

## Task Count Summary

- **Setup**: 3 tasks
- **Foundational**: 8 tasks (added T010b for slug generation)
- **User Story 1 (P1)**: 12 tasks
- **User Story 2 (P2)**: 8 tasks
- **User Story 3 (P1)**: 9 tasks
- **User Story 4 (P2)**: 7 tasks
- **User Story 5 (P3)**: 8 tasks
- **Polish**: 20 tasks (added T074 for 404 page)

**Total**: 75 tasks

**Parallel Opportunities**: 35+ tasks can run in parallel (marked with [P] or within independent stories)

**Estimated Effort**:

- MVP (US1 + US3): 16-24 hours
- Full Implementation: 32-48 hours
- Testing & Validation: 8-12 hours
- **Total**: 40-60 hours
