---
description: 'Implementation tasks for Content Engine (Blog & Case Studies)'
---

# Tasks: Content Engine (Blog & Case Studies)

**Input**: Design documents from `/specs/003-content-engine/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Feature**: Blog and case study content management using Nuxt Content v3 with MDC components

**Organization**: Tasks are grouped by user story to enable independent implementation of each story.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and content directory structure

- [x] T001 Create content directory structure: `content/blog/` and `content/case-studies/` with 2026 subdirectories
- [x] T002 [P] Configure Nuxt Content module in nuxt.config.ts with Shiki syntax highlighting themes (github-light, github-dark)
- [x] T003 [P] Create TypeScript types file at `types/content.ts` with BlogPost, CaseStudy, and supporting interfaces from contracts/types.ts (Note: H1 auto-generated from frontmatter title; markdown content uses H2-H6)
- [x] T004 [P] Add content ignores pattern to nuxt.config.ts to exclude `**/_*.md` draft files

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core composables and utilities that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 [P] Create `composables/useContentQuery.ts` with type-safe Nuxt Content query wrapper per contracts/composables.md
- [x] T006 [P] Create `composables/useReadTime.ts` with word count calculation logic per research.md (200 WPM, code blocks 1.5x)
- [x] T007 [P] Create `composables/useExcerpt.ts` with frontmatter/auto-generation fallback per data-model.md
- [x] T008 [P] Create `composables/useContentSEO.ts` with JSON-LD schema generation using @unhead/schema per research.md
- [x] T009 Create `public/images/blog/2026/` and `public/images/case-studies/2026/` directories for content assets

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Blog Post List (Priority: P1) 🎯 MVP

**Goal**: Display a single-column list of all published blog posts with titles, dates, excerpts, and read times

**Validation**: Navigate to `/blog` and verify list of posts appears with correct metadata, ordered newest first, excluding drafts

- [x] T010 [P] [US1] Create `components/blog/BlogPostMeta.vue` with date, read time, tags, and author display per contracts/components.md
- [x] T011 [P] [US1] Create `components/blog/BlogPostCard.vue` with post preview card layout per contracts/components.md
- [x] T012 [US1] Create `composables/useContentFilter.ts` with tag filtering state management per contracts/composables.md
- [x] T013 [US1] Create `components/blog/BlogList.vue` with single-column layout and tag filter chips per contracts/components.md
- [x] T014 [US1] Create `pages/blog/index.vue` with blog post query and list rendering per contracts/pages.md
- [x] T015 [US1] Add SEO meta tags to blog index page (title, description, OpenGraph) per contracts/pages.md

**Checkpoint**: At this point, `/blog` should display a functional list of blog posts with filtering

---

## Phase 4: User Story 2 - Read Full Blog Post (Priority: P1) 🎯 MVP

**Goal**: Render complete blog post content with markdown formatting, syntax highlighting, and optimized images

**Validation**: Navigate to `/blog/test-post` and verify full markdown renders with code highlighting, proper headings, and images

- [x] T016 [P] [US2] Create `components/content/ContentImage.vue` MDC component with NuxtImg wrapper per contracts/components.md
- [x] T017 [P] [US2] Create `composables/useContentNavigation.ts` with previous/next post logic per contracts/composables.md
- [x] T018 [US2] Create `pages/blog/[...slug].vue` catch-all route with post query and 404 handling per contracts/pages.md
- [x] T019 [US2] Add ContentRenderer component to blog post page with proper heading hierarchy
- [x] T020 [US2] Add navigation to blog post page: 'Back to Blog' link + previous/next post links
- [x] T021 [US2] Add SEO meta tags with JSON-LD Article schema using useContentSEO composable per research.md
- [x] T022 [US2] Configure route prerendering in nuxt.config.ts to generate all blog post static pages per contracts/pages.md

**Checkpoint**: At this point, individual blog posts should be fully readable with navigation

---

## Phase 5: User Story 3 - View Case Study List (Priority: P2)

**Goal**: Display showcase of case study previews with project names, client info, roles, timeline, and featured ordering

**Validation**: Navigate to `/case-studies` and verify grid of case studies with featured items first, all metadata visible

- [x] T023 [P] [US3] Create `components/case-study/CaseStudyCard.vue` with project preview card per contracts/components.md
- [x] T024 [US3] Create `components/case-study/CaseStudyList.vue` with grid layout and featured-first sorting per contracts/components.md
- [x] T025 [US3] Create `pages/case-studies/index.vue` with case study query (featured, order, date sort) per contracts/pages.md
- [x] T026 [US3] Add SEO meta tags to case studies index page per contracts/pages.md

**Checkpoint**: At this point, `/case-studies` should display a curated showcase of case studies

---

## Phase 6: User Story 4 - Read Full Case Study (Priority: P2)

**Goal**: Render detailed case study with structured sections, metrics, testimonials, and image galleries

**Validation**: Navigate to `/case-studies/test-project` and verify sections render, metrics highlighted, gallery works

- [x] T027 [P] [US4] Create `components/case-study/CaseStudyMetrics.vue` MDC component with metrics grid per contracts/components.md
- [x] T028 [P] [US4] Create `components/content/ImageGallery.vue` MDC component with lightbox functionality per contracts/components.md
- [x] T029 [P] [US4] Create `components/content/CodeComparison.vue` MDC component with before/after slots per contracts/components.md
- [x] T030 [US4] Create `pages/case-studies/[...slug].vue` catch-all route with case study query per contracts/pages.md
- [x] T031 [US4] Add ContentRenderer with case study sections (Problem, Solution, Results)
- [x] T032 [US4] Add navigation to case study page: 'Back to Case Studies' link + previous/next case study links
- [x] T033 [US4] Add SEO meta tags with JSON-LD CreativeWork schema per research.md
- [x] T034 [US4] Configure route prerendering in nuxt.config.ts for all case study pages

**Checkpoint**: At this point, full case studies should be readable with all interactive components

---

## Phase 7: User Story 5 - Content Displays in Selected Language (Priority: P3)

**Goal**: Support bilingual content (English/Arabic) with RTL layout and locale-aware routing

**Validation**: Switch to Arabic and verify content displays in Arabic with RTL text direction, fallback to English for missing translations

- [X] T035 [US5] Create `composables/useContentLocale.ts` with i18n-aware content queries per contracts/composables.md
- [X] T036 [US5] Implement locale-specific blog index query (only load `slug.md` for EN, `slug.ar.md` for AR) in `app/pages/blog/index.vue`
- [X] T037 [US5] Implement locale-specific blog detail resolution (select `.ar` file for AR, base file for EN) in `app/pages/blog/[...slug].vue`
- [X] T038 [US5] Implement locale-specific case studies index query (EN: `case-study-slug.md`, AR: `case-study-slug.ar.md`) in `app/pages/case-studies/index.vue`
- [X] T039 [US5] Implement locale-specific case study detail resolution (select `.ar` file for AR, base file for EN) in `app/pages/case-studies/[...slug].vue`
- [X] T040 [US5] Add alternate-language head links (hreflang) for blog and case study pages in `app/composables/useContentSEO.ts` and page-level SEO setup
- [X] T041 [US5] Document bilingual file naming (`post-slug.md` / `post-slug.ar.md`, `case-study-slug.md` / `case-study-slug.ar.md`) in `specs/003-content-engine/quickstart.md`

**Checkpoint**: At this point, content should be fully translatable with proper locale handling

---

## Phase 8: User Story 6 - Filter Content by Tags (Priority: P3)

**Goal**: Enable tag-based filtering on blog and case study lists with URL query param sync

**Validation**: Click a tag on `/blog` and verify list filters to that tag, URL updates to `?tag=xyz`, clear filter returns all posts

- [ ] T042 [US6] Update BlogList component to display tag filter chips above post list
- [ ] T043 [US6] Update BlogList to sync selectedTag with URL query param
- [ ] T044 [US6] Update CaseStudyList component to display tag filter chips
- [ ] T045 [US6] Update CaseStudyList to sync selectedTag with URL query param
- [ ] T046 [US6] Add active filter visual indicator and clear button to both list components
- [ ] T047 [US6] Update blog index page to handle ?tag query param on initial load
- [ ] T048 [US6] Update case studies index page to handle ?tag query param on initial load

**Checkpoint**: At this point, visitors should be able to filter content by tags on both blog and case studies

---

## Phase 9: User Story 7 - Use Interactive Components in Content (Priority: P3)

**Goal**: Enable content creators to embed custom MDC components in markdown with props and slots

**Validation**: Create a blog post with `::ContentImage` and `::CodeComparison` syntax and verify they render correctly

- [ ] T049 [P] [US7] Create `components/content/CodeBlock.vue` MDC component with copy-to-clipboard per contracts/components.md
- [ ] T050 [US7] Test ContentImage component with sample blog post using `::ContentImage` syntax
- [ ] T051 [US7] Test CodeComparison component with sample blog post using before/after slots
- [ ] T052 [US7] Test CodeBlock component with sample blog post using code highlighting
- [ ] T053 [US7] Test ImageGallery component with sample case study
- [ ] T054 [US7] Add graceful error handling for missing/invalid MDC components (fallback message)
- [ ] T055 [US7] Document MDC component usage patterns in quickstart.md validation

**Checkpoint**: At this point, all MDC components should work in content with proper error handling

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final quality checks

- [ ] T056 [P] Create sample blog post content in `content/blog/2026/getting-started.md` with frontmatter examples
- [ ] T057 [P] Create sample case study content in `content/case-studies/2026/sample-project.md` with metrics and gallery
- [ ] T058 [P] Add build-time content validation for required frontmatter fields per data-model.md (validate sample content includes blockquotes, links, lists, and all FR-004 markdown features)
- [ ] T059 [P] Optimize images in public/images/ directories (compress, proper formats)
- [ ] T060 Run Lighthouse audit on `/blog` page and verify Performance ≥95, A11y ≥95, SEO ≥95
- [ ] T061 Run Lighthouse audit on blog post detail page and verify scores
- [ ] T062 Run Lighthouse audit on `/case-studies` page and verify scores
- [ ] T063 Run Lighthouse audit on case study detail page and verify scores
- [ ] T064 [P] Verify all images use NuxtImg/NuxtPicture (no raw img tags)
- [ ] T065 [P] Verify RTL layout works correctly for Arabic content
- [ ] T066 Test draft content exclusion (create `_draft-test.md` and verify it doesn't appear or generate route)
- [ ] T067 Test 404 handling for non-existent blog post and case study URLs
- [ ] T068 Validate quickstart.md instructions by creating new content following the guide
- [ ] T069 [P] Update documentation with deployed URLs and examples
- [ ] T070 Final code review for TypeScript strict mode compliance (no any types)
- [ ] T071 Final ESLint check (zero warnings policy)
- [ ] T072 [P] Verify all content pages use Nuxt UI components and design tokens from 002-ui-design-system spec

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-9)**: All depend on Foundational phase completion
  - US1 and US2 (P1 priority) should be completed first for MVP
  - US3 and US4 (P2 priority) can proceed in parallel after US1/US2
  - US5, US6, US7 (P3 priority) are enhancements, can be deferred or done in parallel
- **Polish (Phase 10)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (View Blog List)**: Depends only on Foundational - Independent
- **US2 (Read Blog Post)**: Depends on Foundational, enhances US1 - Independent
- **US3 (View Case Study List)**: Depends on Foundational - Independent (can run parallel with US1/US2)
- **US4 (Read Case Study)**: Depends on Foundational, enhances US3 - Independent
- **US5 (i18n)**: Depends on US1-US4 being implemented (adds locale layer)
- **US6 (Tag Filtering)**: Depends on US1 and US3 (adds filtering to lists)
- **US7 (MDC Components)**: Depends on US2 and US4 (enhances content rendering)

### Within Each User Story

1. Tests written first (FAIL state)
2. Composables/utilities created
3. Components built (smallest to largest)
4. Pages created using components
5. SEO/meta added
6. Tests pass

### Parallel Opportunities

**Phase 1 (Setup)**: T002, T003, T004 can all run in parallel

**Phase 2 (Foundational)**: T005, T006, T007, T008, T009 can all run in parallel

**After Phase 2 completes**:

- US1 (Blog List) and US3 (Case Study List) can proceed in parallel
- US2 (Blog Post) and US4 (Case Study Detail) can proceed in parallel

**Within each user story**:

- Components marked [P] can be built in parallel
- Example US1: T010, T011 can run in parallel

**Phase 10 (Polish)**: T056, T057, T058, T059, T064, T065, T069, T070, T071 can run in parallel

---

## Parallel Example: User Story 1 (Blog List)

Work on tasks in parallel where marked with [P]:

```bash
# Parallel tasks (T010, T011)
- T010: Build BlogPostMeta.vue
- T011: Build BlogPostCard.vue

# Then sequential tasks
- T012: Build useContentFilter.ts composable
- T013: Build BlogList.vue
- T014: Build blog/index.vue page
- T015: Add SEO meta tags
```

---

## MVP Scope Recommendation

For fastest time-to-value, implement in this order:

1. **Phase 1 + Phase 2** (Setup + Foundation) - Required baseline
2. **Phase 3** (US1: Blog List) - First user-facing value
3. **Phase 4** (US2: Blog Post Detail) - Complete blog functionality
4. **Phase 5** (US3: Case Study List) - Portfolio showcase
5. **Phase 6** (US4: Case Study Detail) - Complete case studies
6. **Deploy MVP** - Blog and case studies fully functional

Then enhance with: 7. **Phase 7** (US5: i18n) if Arabic content is critical 8. **Phase 8** (US6: Tag Filtering) for better UX 9. **Phase 9** (US7: MDC Components) for rich content 10. **Phase 10** (Polish) for production quality

**Minimum Viable Product**: Phases 1, 2, 3, 4 (Blog only) = ~22 tasks  
**Full MVP**: Phases 1-6 (Blog + Case Studies) = ~34 tasks  
**Complete Feature**: All phases = ~72 tasks

---

## Implementation Strategy

This task list follows the **incremental delivery** model:

- Each phase delivers a **complete, testable slice** of functionality
- Phases 3-9 map to user stories that are **independently valuable**
- You can deploy after any user story completion
- Manual validation ensures quality at each increment
- Parallel opportunities identified to maximize efficiency

Start with the MVP scope (US1 + US2 for blog), deploy and validate, then continue with additional user stories based on priority.
