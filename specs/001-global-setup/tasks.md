# Tasks: Global Setup & Configuration

**Input**: Design documents from `/specs/001-global-setup/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Not requested for this setup feature — manual verification via quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Nuxt 4 project**: Files at repository root following Nuxt conventions
- Paths follow constitution-mandated directory structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency installation

- [x] T001 Initialize Nuxt 4 project with `bunx nuxi@latest init . --force --packageManager bun`
- [x] T002 Install all required modules with `bun add -D @nuxt/ui @nuxt/content @nuxt/image @nuxtjs/i18n @nuxtjs/seo`
- [x] T003 [P] Create directory structure: `mkdir -p locales content assets/css public types composables`
- [x] T004 [P] Create CSS entry point in assets/css/main.css with Tailwind and Nuxt UI imports

**Checkpoint**: Project initialized with all dependencies and directory structure ready

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core configuration that MUST be complete before ANY user story can be verified

**⚠️ CRITICAL**: No user story verification can occur until this phase is complete

- [x] T005 Configure nuxt.config.ts with compatibilityDate and modules array
- [x] T006 [P] Create placeholder app.vue with basic layout structure
- [x] T007 [P] Create placeholder pages/index.vue with i18n-ready content

**Checkpoint**: Foundation ready — Nuxt dev server can start without errors

---

## Phase 3: User Story 1 — Developer Initializes Portfolio Project (Priority: P1) 🎯 MVP

**Goal**: Developer can run `bun run dev` and see a working Nuxt application

**Independent Test**: Run `bun run dev`, navigate to `http://localhost:3000`, verify page loads without errors

### Implementation for User Story 1

- [x] T008 [US1] Verify nuxt.config.ts has compatibilityDate set to '2026-01-12'
- [x] T009 [US1] Verify package.json has correct scripts (dev, build, generate)
- [x] T010 [US1] Run `bun run dev` and confirm server starts at localhost:3000

**Checkpoint**: User Story 1 complete — developer has working Nuxt 4 foundation

---

## Phase 4: User Story 2 — Developer Has Access to Required Modules (Priority: P2)

**Goal**: All 5 required modules are installed, configured, and functional

**Independent Test**: Check package.json for all modules, verify nuxt.config.ts modules array, confirm no module errors in console

### Implementation for User Story 2

- [x] T011 [US2] Verify @nuxt/ui is in devDependencies and modules array in nuxt.config.ts
- [x] T012 [P] [US2] Verify @nuxt/content is in devDependencies and modules array in nuxt.config.ts
- [x] T013 [P] [US2] Verify @nuxt/image is in devDependencies and modules array in nuxt.config.ts
- [x] T014 [P] [US2] Verify @nuxtjs/i18n is in devDependencies and modules array in nuxt.config.ts
- [x] T015 [P] [US2] Verify @nuxtjs/seo is in devDependencies and modules array in nuxt.config.ts
- [x] T016 [US2] Restart dev server and confirm zero module resolution errors in terminal

**Checkpoint**: User Story 2 complete — all modules functional

---

## Phase 5: User Story 3 — Content Displays in Multiple Languages (Priority: P3)

**Goal**: Site displays content in English (default) and Arabic (RTL) with lazy-loaded translations

**Independent Test**: Navigate to `/` for English, `/ar` for Arabic, verify text direction changes

### Implementation for User Story 3

- [x] T017 [US3] Create locales/en.json with site.title and site.description keys
- [x] T018 [P] [US3] Create locales/ar.json with Arabic translations for site.title and site.description
- [x] T019 [US3] Configure i18n in nuxt.config.ts with prefix_except_default strategy
- [x] T020 [US3] Add locale definitions for en (ltr) and ar (rtl) in nuxt.config.ts
- [x] T021 [US3] Enable lazy loading with `lazy: true` and `langDir: 'locales'` in i18n config
- [x] T022 [US3] Configure detectBrowserLanguage with cookie settings in nuxt.config.ts
- [x] T023 [US3] Update pages/index.vue to use $t() for translatable content
- [x] T024 [US3] Verify navigating to `/ar` shows RTL direction on HTML element

**Checkpoint**: User Story 3 complete — i18n with RTL support functional

---

## Phase 6: User Story 4 — Site Has Proper SEO Foundation (Priority: P4)

**Goal**: Global SEO defaults configured with site name, OpenGraph image, and sitemap

**Independent Test**: View page source, verify meta tags present; access `/sitemap.xml` after build

### Implementation for User Story 4

- [x] T025 [US4] Add site.url and site.name to nuxt.config.ts
- [x] T026 [P] [US4] Create placeholder public/og-image.png (1200x630 pixels)
- [x] T027 [US4] Configure seo.meta with description, ogImage, and twitterCard in nuxt.config.ts
- [x] T028 [US4] Verify OpenGraph meta tags appear in page source (view-source in browser)
- [x] T029 [US4] Run `bun run generate` and verify sitemap.xml is created in .output/public/

**Checkpoint**: User Story 4 complete — SEO foundation ready

---

## Phase 7: Polish & Validation

**Purpose**: Final validation and cleanup

- [x] T030 Run quickstart.md verification checklist
- [x] T031 [P] Ensure tsconfig.json has strict mode enabled
- [x] T032 [P] Verify ESLint configuration is present (from Nuxt init)
- [x] T033 Commit all changes to 001-global-setup branch

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2 — MVP deliverable
- **User Story 2 (Phase 4)**: Depends on Phase 2 — can run parallel with US1
- **User Story 3 (Phase 5)**: Depends on Phase 2 — can run parallel with US1/US2
- **User Story 4 (Phase 6)**: Depends on Phase 2 — can run parallel with US1/US2/US3
- **Polish (Phase 7)**: Depends on all user stories being complete

### Within Each User Story

- Configuration tasks before verification tasks
- File creation before file modification
- nuxt.config.ts changes grouped logically
- Story complete before moving to next priority (or parallel if staffed)

### Parallel Opportunities

**Phase 1** (after T001 and T002):

```
T003: Create directory structure
T004: Create CSS entry point
```

**Phase 2** (after T005):

```
T006: Create app.vue
T007: Create pages/index.vue
```

**Phase 4** (T012-T015 can run in parallel):

```
T012: Verify @nuxt/content
T013: Verify @nuxt/image
T014: Verify @nuxtjs/i18n
T015: Verify @nuxtjs/seo
```

**Phase 5** (T017, T018 can run in parallel):

```
T017: Create en.json
T018: Create ar.json
```

**Phase 6** (T025, T026 can run in parallel):

```
T025: Configure site.url and site.name
T026: Create og-image.png placeholder
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Run `bun run dev` — page loads without errors
5. Commit as MVP

### Full Feature Delivery

1. Complete Setup + Foundational → Foundation ready
2. Complete User Story 1 → Verify dev server works
3. Complete User Story 2 → Verify all modules load
4. Complete User Story 3 → Verify i18n with RTL
5. Complete User Story 4 → Verify SEO meta tags
6. Complete Polish → Final validation and commit

---

## Notes

- [P] tasks = different files, no dependencies
- [USx] label maps task to specific user story for traceability
- Each user story should be independently verifiable
- Commit after each phase or logical group
- This feature has no automated tests — use quickstart.md for manual verification
- All file paths are relative to repository root
