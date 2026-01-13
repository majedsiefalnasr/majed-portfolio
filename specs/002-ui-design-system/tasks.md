# Tasks: UI & Design System

**Input**: Design documents from `/specs/002-ui-design-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Edge cases from spec.md are covered in Phase 7 (Polish) tasks; Lighthouse audits validate performance requirements

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

Project uses Nuxt 4 structure:

- **Components**: `app/components/`
- **Composables**: `app/composables/`
- **Assets**: `app/assets/css/`
- **Types**: `app/types/`
- **Translations**: `i18n/`
- **Tests**: `test/components/`, `test/composables/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency configuration

- [x] T001 Install required dependencies (@nuxt/fonts, @nuxtjs/i18n) using Bun
- [x] T002 Configure Nuxt modules in nuxt.config.ts (fonts, i18n, ui)
- [x] T003 [P] Configure Geist font in nuxt.config.ts with @nuxt/fonts
- [x] T004 [P] Configure i18n locales (en, ar) in nuxt.config.ts with RTL settings
- [x] T005 Create TypeScript type definitions in app/types/theme.ts
- [x] T006 [P] Create TypeScript type definitions in app/types/layout.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core design system infrastructure that MUST be complete before user stories can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Create color token definitions for light mode in app/assets/css/tokens.css (100+ tokens)
- [x] T008 Create color token definitions for dark mode in app/assets/css/tokens.css (100+ dark variants)
- [x] T009 Add theme transition CSS (200ms duration) in app/assets/css/tokens.css
- [x] T010 Import tokens.css in app/assets/css/main.css
- [x] T011 Configure Tailwind color mappings in tailwind.config.ts (Background, Border, Button, Icon, Typography)
- [x] T012 [P] Create English translation file in i18n/en.json (nav, social, theme, footer keys)
- [x] T013 [P] Create Arabic translation file in i18n/ar.json (nav, social, theme, footer keys)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Content in Light Mode (Priority: P1) 🎯 MVP

**Goal**: Users can view website content with proper Geist typography, light mode colors, and layout components (header, footer, container)

**Independent Test**: Open website and verify Geist font loads, light mode colors display correctly, AppHeader/AppFooter/Container render with proper layout

### Implementation for User Story 1

- [x] T014 [P] [US1] Implement useTheme composable in app/composables/useTheme.ts
- [x] T015 [P] [US1] Implement useLanguage composable in app/composables/useLanguage.ts
- [x] T016 [P] [US1] Create Container component in app/components/Container.vue
- [x] T017 [US1] Create AppHeader component in app/components/AppHeader.vue (logo on start edge, nav on end edge)
- [x] T018 [US1] Create AppFooter component in app/components/AppFooter.vue (social links, copyright, theme toggle, language switcher)
- [x] T019 [US1] Update app.vue root layout with AppHeader, AppFooter, and Container structure
- [x] T020 [US1] Set html dir and lang attributes based on locale in app.vue
- [x] T021 [US1] Verify Geist font loading with zero CLS (check browser DevTools)
- [x] T022 [US1] Validate WCAG AA contrast ratios for light mode color tokens

**Checkpoint**: At this point, User Story 1 should be fully functional - website displays with proper typography, light mode styling, and all layout components

---

## Phase 4: User Story 2 - Switch to Dark Mode (Priority: P2)

**Goal**: Users can toggle between light and dark themes with smooth transitions and system preference detection

**Independent Test**: Toggle dark mode button and verify all colors update smoothly (200ms transition), preference persists across page reloads, system preference detection works on first visit

### Implementation for User Story 2

- [x] T023 [US2] Add theme toggle button to AppFooter component (moon/sun icon based on current theme)
- [x] T024 [US2] Implement toggleTheme function in useTheme composable
- [x] T025 [US2] Add system preference detection logic in useTheme composable
- [x] T026 [US2] Verify localStorage persistence of theme preference
- [x] T027 [US2] Test smooth color transitions (200ms duration) when toggling theme
- [x] T028 [US2] Validate WCAG AA contrast ratios for dark mode color tokens
- [x] T029 [US2] Test theme persistence across page navigation

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - website supports both light and dark modes with smooth transitions and persistence

---

## Phase 5: User Story 3 - View Content in Arabic (RTL) (Priority: P2)

**Goal**: Arabic-speaking users can switch to Arabic language and see full RTL layout with mirrored components and proper text alignment

**Independent Test**: Switch language to Arabic and verify entire layout flips to RTL, logo moves to right, navigation to left, all text aligns right, spacing uses logical properties

### Implementation for User Story 3

- [x] T030 [P] [US3] Verify all Tailwind classes in Container use logical properties (ms-, me-, ps-, pe-, text-start)
- [x] T031 [P] [US3] Verify all Tailwind classes in AppHeader use logical properties
- [x] T032 [P] [US3] Verify all Tailwind classes in AppFooter use logical properties
- [x] T033 [US3] Add language switcher button to AppFooter (EN ↔ العربية)
- [x] T034 [US3] Implement setLocale function in useLanguage composable
- [x] T035 [US3] Update AppHeader logo positioning to use flexbox with me-auto for start-edge alignment
- [x] T036 [US3] Test layout mirroring when switching between English and Arabic
- [x] T037 [US3] Verify directional icons (if any) flip with rtl: modifier
- [x] T038 [US3] Test language preference persistence via cookie

**Checkpoint**: All three high-priority user stories (P1, P2) should now work - website supports light/dark themes AND English/Arabic with full RTL

---

## Phase 6: User Story 4 - Navigate Between Pages (Priority: P3)

**Goal**: Users can navigate through portfolio sections using header links with visual indication of active page

**Independent Test**: Click each navigation link and verify navigation works, active link is highlighted, all pages maintain consistent theme and language

### Implementation for User Story 4

- [x] T039 [US4] Add navigation link array to AppHeader (Home, Projects, About, Blog, Contact)
- [x] T040 [US4] Use useRoute composable to detect current page in AppHeader
- [x] T041 [US4] Apply active link styling based on current route (text-typography-link class)
- [x] T042 [US4] Add aria-current="page" attribute to active link for accessibility
- [x] T043 [US4] Test navigation across all 5 pages
- [x] T044 [US4] Verify theme and language persist when navigating between pages

**Checkpoint**: All user stories complete - full design system functional with navigation

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and production readiness

- [x] T045 [P] Run Lighthouse audit and verify Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95
- [x] T046 [P] Verify zero Cumulative Layout Shift (CLS = 0) during font loading
- [x] T047 [P] Test edge case: Geist font loading failure (verify system fallback works)
- [x] T048 [P] Test edge case: Rapid theme toggling (verify no flickering)
- [x] T049 [P] Test edge case: Very long text in Arabic (verify container maintains spacing)
- [x] T050 [P] Test edge case: System preference change during session (verify manual override works)
- [x] T051 [P] Test edge case: Extremely narrow screens < 320px (verify readability maintained)
- [x] T052 Add keyboard navigation tests (Tab through all interactive elements)
- [x] T053 Verify all interactive elements have proper ARIA labels
- [x] T054 [P] Create component tests in test/components/AppHeader.test.ts
- [x] T055 [P] Create component tests in test/components/AppFooter.test.ts
- [x] T056 [P] Create component tests in test/components/Container.test.ts
- [x] T057 [P] Create composable tests in test/composables/useTheme.test.ts
- [x] T058 [P] Create composable tests in test/composables/useLanguage.test.ts
- [x] T059 Run complete walkthrough from quickstart.md to validate setup process
- [x] T060 Update social link URLs in AppFooter with actual portfolio URLs

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion (T001-T006) - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion (T007-T013)
  - User stories can proceed in parallel (if staffed) after Phase 2
  - Or sequentially in priority order: US1 (P1) → US2 (P2) → US3 (P2) → US4 (P3)
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

**User Story 1 (P1) - View Content in Light Mode**

- Depends on: Phase 2 (Foundational) complete
- Blocks: None - other stories can start in parallel
- MVP Scope: This story alone provides a functional, styled website

**User Story 2 (P2) - Switch to Dark Mode**

- Depends on: Phase 2 (Foundational) complete, US1 components exist (AppFooter for toggle button)
- Blocks: None
- Can start: After T018 (AppFooter component created)

**User Story 3 (P2) - View Content in Arabic (RTL)**

- Depends on: Phase 2 (Foundational) complete, US1 components exist (to verify RTL)
- Blocks: None
- Can start: After T016, T017, T018 (all layout components created)

**User Story 4 (P3) - Navigate Between Pages**

- Depends on: Phase 2 (Foundational) complete, US1 components exist (AppHeader for nav links)
- Blocks: None
- Can start: After T017 (AppHeader component created)

### Within Each User Story

**US1 Task Order**:

1. T014, T015 (composables) - parallel
2. T016 (Container) - parallel with composables
3. T017 (AppHeader) - after composables available
4. T018 (AppFooter) - after composables available
5. T019, T020 (app.vue) - after all components exist
6. T021, T022 (validation) - after implementation complete

**US2 Task Order**:

1. T023 (add toggle to AppFooter) - requires AppFooter exists (T018)
2. T024, T025 (useTheme logic) - can be parallel with T023
3. T026-T029 (testing/validation) - after implementation complete

**US3 Task Order**:

1. T030, T031, T032 (verify logical properties) - parallel, requires components exist
2. T033 (language switcher) - requires AppFooter exists (T018)
3. T034 (setLocale logic) - can be parallel with T033
4. T035 (logo positioning) - requires AppHeader exists (T017)
5. T036-T038 (testing/validation) - after implementation complete

**US4 Task Order**:

1. T039 (nav links array) - requires AppHeader exists (T017)
2. T040 (route detection) - can be parallel with T039
3. T041, T042 (active styling) - after T039, T040
4. T043, T044 (testing) - after implementation complete

### Parallel Opportunities

**Setup Phase (Phase 1)**:

- T003 (fonts) || T004 (i18n) - parallel configuration
- T005 (theme types) || T006 (layout types) - parallel type definitions

**Foundational Phase (Phase 2)**:

- T007 (light tokens) → T008 (dark tokens) - sequential (same file)
- T012 (en.json) || T013 (ar.json) - parallel translation files

**User Story 1 (Phase 3)**:

- T014 (useTheme) || T015 (useLanguage) || T016 (Container) - all parallel
- After components ready: T021 (font check) || T022 (contrast validation) - parallel validation

**User Story 2 (Phase 4)**:

- T023 (toggle button) || T024, T025 (composable logic) - parallel

**User Story 3 (Phase 5)**:

- T030 || T031 || T032 (verify logical properties) - all parallel
- T033 (switcher button) || T034 (locale logic) || T035 (logo position) - all parallel

**User Story 4 (Phase 6)**:

- T040 (route detection) || T039 (nav array) - parallel

**Polish Phase (Phase 7)**:

- T045 || T046 || T047 || T048 || T049 || T050 || T051 (all tests) - parallel
- T054 || T055 || T056 || T057 || T058 (all component/composable tests) - parallel

### Between User Stories

Once Foundational (Phase 2) completes, these can run in parallel if team capacity allows:

- **US1 tasks** (T014-T022)
- **US2 tasks** (T023-T029) - after T018 completes
- **US3 tasks** (T030-T038) - after T016, T017, T018 complete
- **US4 tasks** (T039-T044) - after T017 completes

---

## Parallel Example: All User Stories After Foundation

```bash
# After Phase 2 completes, maximum parallelization:

# US1: Layout Components Foundation
Team Member A: T014 (useTheme) + T015 (useLanguage)
Team Member B: T016 (Container) + T017 (AppHeader)
Team Member C: T018 (AppFooter)

# Once T017, T018 complete:
Team Member D: T039-T044 (US4 - Navigation) - can start immediately

# Once T018 completes:
Team Member E: T023-T029 (US2 - Dark Mode) - can start immediately

# Once T016, T017, T018 complete:
Team Member F: T030-T038 (US3 - RTL) - can start immediately

# This allows 3-4 user stories to progress in parallel after foundational work
```

---

## Implementation Strategy

### MVP Delivery (Minimum Viable Product)

**Scope**: User Story 1 only (Phase 1 + Phase 2 + Phase 3)

- **Tasks**: T001-T022 (22 tasks)
- **Deliverable**: Functional portfolio website with Geist typography, light mode colors, and all layout components
- **Timeline**: Can deliver core value with just P1 user story

### Incremental Rollout

1. **Release 1 (MVP)**: US1 - Light mode with layout components
2. **Release 2**: US1 + US2 - Add dark mode support
3. **Release 3**: US1 + US2 + US3 - Add Arabic/RTL support
4. **Release 4 (Full)**: All user stories including navigation enhancements

### Recommended Sequence

If working solo or with limited team:

1. Complete Phase 1 (Setup) - T001-T006
2. Complete Phase 2 (Foundational) - T007-T013
3. Complete US1 (P1) - T014-T022 → **Deploy MVP**
4. Complete US2 (P2) - T023-T029 → Deploy dark mode
5. Complete US3 (P2) - T030-T038 → Deploy RTL support
6. Complete US4 (P3) - T039-T044 → Deploy navigation enhancements
7. Complete Phase 7 (Polish) - T045-T060 → Production ready

---

## Task Count Summary

- **Phase 1 (Setup)**: 6 tasks
- **Phase 2 (Foundational)**: 7 tasks (blocking)
- **Phase 3 (US1 - P1)**: 9 tasks ⭐ MVP
- **Phase 4 (US2 - P2)**: 7 tasks
- **Phase 5 (US3 - P2)**: 9 tasks
- **Phase 6 (US4 - P3)**: 6 tasks
- **Phase 7 (Polish)**: 16 tasks

**Total**: 60 tasks

**Parallel Opportunities**: 35 tasks marked [P] (58% can run in parallel with proper coordination)

**MVP Scope**: 22 tasks (Phases 1-3) delivers independently testable value
