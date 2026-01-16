# Tasks: shadcn-vue UI Library Migration

**Input**: Design documents from `/specs/006-shadcn-vue-migration/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: No test tasks included per clarification session - manual testing only

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

- Nuxt 4 project structure: `app/` for application code, `content/` for markdown
- Components: `app/components/ui/` for shadcn-vue, `app/components/` for custom
- Styles: `app/assets/css/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize shadcn-vue and remove Nuxt UI

- [x] T001 Remove @nuxt/ui from nuxt.config.ts modules array
- [x] T002 Remove ui config object from nuxt.config.ts
- [x] T003 Configure @nuxtjs/color-mode with classSuffix: '' in nuxt.config.ts
- [x] T004 Remove @nuxt/ui from package.json dependencies
- [x] T005 Install shadcn-vue dependencies: radix-vue, class-variance-authority, clsx, tailwind-merge in package.json
- [x] T006 [P] Install icon dependencies: @iconify/vue, @iconify-json/radix-icons in package.json
- [x] T007 Run `npx shadcn-vue@latest init` with configuration per quickstart.md
- [x] T008 Verify components.json created with correct aliases and iconLibrary
- [x] T009 [P] Update tailwind.config.ts with shadcn-vue color variables per research.md Decision 3
- [x] T010 [P] Update app/assets/css/main.css with shadcn-vue CSS variables (@layer base)
- [x] T011 [P] Delete app/assets/css/tokens.css (no longer needed)
- [x] T012 Run build to verify no Nuxt UI imports remain (`bun run build`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Install core shadcn-vue components that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T013 Install Button component via `npx shadcn-vue@latest add button` into app/components/ui/button/
- [x] T014 [P] Install Card component via `npx shadcn-vue@latest add card` into app/components/ui/card/
- [x] T015 [P] Install DropdownMenu component via `npx shadcn-vue@latest add dropdown-menu` into app/components/ui/dropdown-menu/
- [x] T016 [P] Install Badge component via `npx shadcn-vue@latest add badge` into app/components/ui/badge/
- [x] T017 [P] Install Alert component via `npx shadcn-vue@latest add alert` into app/components/ui/alert/
- [x] T018 [P] Install Separator component via `npx shadcn-vue@latest add separator` into app/components/ui/separator/
- [x] T019 [P] Create Icon component wrapper in app/components/ui/Icon.vue that re-exports @iconify/vue Icon with default size classes (h-4 w-4) for consistent sizing across app
- [x] T020 Verify all shadcn-vue components installed correctly (`ls app/components/ui/`)
- [x] T021 Run dev server to verify components load without errors (`bun run dev`)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Component Visual Consistency (Priority: P1) 🎯 MVP

**Goal**: Replace all Nuxt UI components with shadcn-vue equivalents to establish consistent design system

**Independent Test**: Navigate through homepage, blog listing, blog posts, and case studies. Verify all interactive elements render with consistent shadcn-vue theming, proper spacing, and typography hierarchy. All buttons, cards, and navigation should display shadcn-vue default styling.

### Implementation for User Story 1

#### Blog Components Migration

- [x] T022 [P] [US1] Migrate BlogPostCard.vue: Replace UCard with Card composition in app/components/blog/BlogPostCard.vue
- [x] T023 [P] [US1] Update BlogPostCard.vue: Replace UButton with Button + Icon in app/components/blog/BlogPostCard.vue
- [x] T024 [P] [US1] Update BlogPostCard.vue: Convert i-heroicons-_ icons to radix-icons:_ in app/components/blog/BlogPostCard.vue
- [x] T025 [P] [US1] Migrate BlogList.vue: Replace UCard/UButton with shadcn-vue equivalents in app/components/blog/BlogList.vue
- [x] T026 [P] [US1] Update BlogPostMeta.vue: Replace Heroicons with Radix Icons in app/components/blog/BlogPostMeta.vue

#### Case Study Components Migration

- [x] T027 [P] [US1] Migrate CaseStudyCard.vue: Replace UCard with Card composition in app/components/case-study/CaseStudyCard.vue
- [x] T028 [P] [US1] Update CaseStudyCard.vue: Replace UButton with Button + Icon in app/components/case-study/CaseStudyCard.vue
- [x] T029 [P] [US1] Update CaseStudyCard.vue: Convert i-heroicons-_ icons to radix-icons:_ in app/components/case-study/CaseStudyCard.vue
- [x] T030 [P] [US1] Migrate CaseStudyList.vue: Replace UCard/UButton with shadcn-vue equivalents in app/components/case-study/CaseStudyList.vue
- [x] T031 [P] [US1] Update CaseStudyMetrics.vue: Update styling to use shadcn-vue semantic colors in app/components/case-study/CaseStudyMetrics.vue

#### Layout Components Migration

- [x] T032 [US1] Migrate AppHeader.vue: Replace UDropdown with DropdownMenu for theme switcher in app/components/AppHeader.vue
- [x] T033 [US1] Update AppHeader.vue: Replace UDropdown with DropdownMenu for language switcher in app/components/AppHeader.vue
- [x] T034 [US1] Update AppHeader.vue: Replace UButton with Button for navigation in app/components/AppHeader.vue
- [x] T035 [US1] Update AppHeader.vue: Convert all i-heroicons-_ to radix-icons:_ in app/components/AppHeader.vue
- [x] T036 [P] [US1] Migrate AppFooter.vue: Replace UButton with Button in app/components/AppFooter.vue
- [x] T037 [P] [US1] Update AppFooter.vue: Convert Heroicons to Radix Icons in app/components/AppFooter.vue
- [x] T038 [P] [US1] Update AppContainer.vue: Verify no Nuxt UI dependencies remain in app/components/AppContainer.vue

#### Page-Level Migration

- [x] T039 [P] [US1] Migrate app/pages/index.vue: Replace UCard/UButton with shadcn-vue equivalents
- [x] T040 [P] [US1] Migrate app/pages/blog/index.vue: Replace UCard/UButton with shadcn-vue equivalents
- [x] T041 [P] [US1] Migrate app/pages/blog/[...slug].vue: Replace UButton with Button in navigation
- [x] T042 [P] [US1] Migrate app/pages/case-studies/index.vue: Replace UCard/UButton with shadcn-vue equivalents
- [x] T043 [P] [US1] Migrate app/pages/case-studies/[...slug].vue: Replace UButton with Button
- [x] T044 [P] [US1] Migrate app/error.vue: Replace UCard/UButton with shadcn-vue equivalents

#### Styling Updates

- [x] T045 [P] [US1] Update color classes: Replace text-gray-500 with text-muted-foreground across all migrated components
- [x] T046 [P] [US1] Update color classes: Replace bg-gray-50 dark:bg-gray-800 with bg-muted across all components
- [x] T047 [P] [US1] Update color classes: Replace border-gray-200 dark:border-gray-700 with border-border across all components
- [x] T048 [US1] Remove manual padding where shadcn-vue components provide defaults (CardContent, CardHeader, CardFooter)
- [x] T049 [US1] Update icon spacing: Replace ml-2/mr-2 with me-2/ms-2 for RTL support across all icons
- [x] T049a [US1] Verify component prop compatibility: Test that all migrated Button/Card variants work correctly (variant, size props)
- [x] T049b [US1] Verify composition patterns: Test that slots work correctly in Card (header, default, footer) and DropdownMenu (trigger, content, items)

**Checkpoint**: At this point, User Story 1 should be fully functional - all pages render with consistent shadcn-vue theming

---

## Phase 4: User Story 2 - Responsive Design Preservation (Priority: P2)

**Goal**: Verify responsive layouts work correctly with shadcn-vue components across all viewport sizes

**Independent Test**: Resize browser viewport from 320px to 2560px width. Verify that all components adapt appropriately at mobile (320px-768px), tablet (768px-1024px), and desktop (1024px+) breakpoints. Navigation should collapse to mobile menu, cards should stack/grid appropriately, and touch targets should be sized correctly.

### Implementation for User Story 2

- [x] T050 [P] [US2] Verify mobile breakpoints (<768px): Test BlogPostCard stacking in app/components/blog/BlogPostCard.vue
- [x] T051 [P] [US2] Verify mobile breakpoints (<768px): Test CaseStudyCard stacking in app/components/case-study/CaseStudyCard.vue
- [x] T052 [P] [US2] Verify mobile navigation: Test AppHeader mobile menu collapse in app/components/AppHeader.vue
- [x] T053 [P] [US2] Add responsive classes: Ensure grid layouts use sm:/md:/lg: prefixes in app/components/blog/BlogList.vue
- [x] T054 [P] [US2] Add responsive classes: Ensure grid layouts use sm:/md:/lg: prefixes in app/components/case-study/CaseStudyList.vue
- [x] T055 [P] [US2] Verify tablet breakpoints (768px-1024px): Test column counts in blog listing pages
- [x] T056 [P] [US2] Verify tablet breakpoints (768px-1024px): Test column counts in case study listing pages
- [x] T057 [P] [US2] Verify desktop breakpoints (1024px+): Test max-width constraints on all pages
- [x] T058 [US2] Add touch target sizing: Verify buttons meet 44px minimum for mobile in all components
- [x] T059 [US2] Test Button size variants: Verify size="sm" for mobile, size="default" for desktop where appropriate
- [x] T060 [US2] Verify DropdownMenu positioning: Test mobile viewport alignment in app/components/AppHeader.vue

**Checkpoint**: All responsive breakpoints should work correctly with shadcn-vue components

---

## Phase 5: User Story 3 - Theme Switching Functionality (Priority: P2)

**Goal**: Ensure dark/light theme toggle works seamlessly with shadcn-vue CSS variables

**Independent Test**: Click theme toggle button in header. Verify entire site switches between dark and light modes within 200ms with smooth transitions. Refresh page and navigate between pages to verify theme persistence. Check that system preference is respected on first visit.

### Implementation for User Story 3

- [x] T061 [US3] Update useTheme composable: Adapt for shadcn-vue CSS variable system in app/composables/useTheme.ts
- [x] T062 [US3] Implement theme toggle: Create DropdownMenu with light/dark/system options in app/components/AppHeader.vue
- [x] T063 [P] [US3] Add theme transition classes: Ensure smooth color transitions in app/assets/css/main.css
- [x] T064 [P] [US3] Verify CSS variables: Test --background, --foreground, --primary in both modes
- [x] T065 [P] [US3] Verify CSS variables: Test --card, --muted, --border in both modes
- [x] T066 [P] [US3] Test theme persistence: Verify localStorage via @nuxtjs/color-mode
- [x] T067 [P] [US3] Test system preference: Verify matchMedia respects OS theme setting
- [x] T068 [US3] Verify theme switch performance: Measure transition time (<200ms requirement)
- [x] T069 [US3] Test theme on all components: Verify Button variants in both modes
- [x] T070 [US3] Test theme on all components: Verify Card appearance in both modes
- [x] T071 [US3] Test theme on all components: Verify DropdownMenu in both modes
- [x] T072 [US3] Verify no flash of unstyled content (FOUC) on page load

**Checkpoint**: Theme switching should work flawlessly across all pages with proper persistence

---

## Phase 6: User Story 4 - Bilingual RTL Support (Priority: P2)

**Goal**: Ensure Arabic language content displays correctly with RTL layout and component mirroring

**Independent Test**: Switch language to Arabic via language switcher. Verify all layouts flip horizontally, text aligns right, navigation positions correctly, and icons with me-_/ms-_ classes flip position. Test blog posts, case studies, and all pages in Arabic mode.

### Implementation for User Story 4

- [x] T073 [P] [US4] Verify RTL layout: Test homepage layout mirrors correctly when lang="ar"
- [x] T074 [P] [US4] Verify RTL layout: Test blog listing layout mirrors correctly
- [x] T075 [P] [US4] Verify RTL layout: Test case study listing layout mirrors correctly
- [x] T076 [US4] Update icon positioning: Ensure all trailing icons use ms-2 in app/components/blog/BlogPostCard.vue
- [x] T077 [US4] Update icon positioning: Ensure all leading icons use me-2 in app/components/blog/BlogPostCard.vue
- [x] T078 [US4] Update icon positioning: Ensure proper spacing in app/components/case-study/CaseStudyCard.vue
- [x] T079 [US4] Update icon positioning: Ensure proper spacing in app/components/AppHeader.vue
- [x] T080 [P] [US4] Test Button alignment: Verify icon buttons flip correctly in RTL
- [x] T081 [P] [US4] Test Card alignment: Verify CardFooter buttons align correctly in RTL
- [x] T082 [P] [US4] Test DropdownMenu: Verify menu alignment (align="end") in RTL mode
- [x] T083 [US4] Verify text directionality: Test mixed LTR/RTL content in blog posts
- [x] T084 [US4] Verify navigation: Test AppHeader navigation order reverses in RTL
- [x] T085 [US4] Add rtl: Tailwind variant where needed for component-specific RTL adjustments

**Checkpoint**: Arabic language content should display perfectly with proper RTL layout mirroring

---

## Phase 7: User Story 5 - Accessibility Standards Compliance (Priority: P3)

**Goal**: Ensure all shadcn-vue components maintain WCAG accessibility standards

**Independent Test**: Navigate entire site using only keyboard (Tab, Enter, Space, Arrow keys). Run Lighthouse and axe-core automated tests. Verify screen reader announcements with VoiceOver/NVDA. Check for 95+ accessibility score and zero critical violations.

### Implementation for User Story 5

- [ ] T086 [P] [US5] Test keyboard navigation: Verify Tab order on homepage
- [ ] T087 [P] [US5] Test keyboard navigation: Verify Tab order on blog listing
- [ ] T088 [P] [US5] Test keyboard navigation: Verify Tab order on case study listing
- [ ] T089 [US5] Add focus indicators: Verify visible focus rings on all Button components
- [ ] T090 [US5] Add focus indicators: Verify visible focus rings on Card (when clickable)
- [ ] T091 [US5] Add focus indicators: Verify visible focus rings on DropdownMenu items
- [ ] T092 [P] [US5] Verify ARIA labels: Check icon-only buttons have aria-label in app/components/AppHeader.vue
- [ ] T093 [P] [US5] Verify ARIA labels: Check DropdownMenu has proper aria-labelledby
- [ ] T094 [P] [US5] Verify ARIA labels: Check Card links have descriptive text or aria-label
- [ ] T095 [US5] Test screen reader: Verify theme toggle announces current theme state
- [ ] T096 [US5] Test screen reader: Verify language switcher announces selected language
- [ ] T097 [US5] Test screen reader: Verify navigation landmarks are properly announced
- [ ] T098 [P] [US5] Verify semantic HTML: Check heading hierarchy (h1 → h2 → h3) on all pages
- [ ] T099 [P] [US5] Verify semantic HTML: Check CardTitle renders with appropriate heading level
- [ ] T100 [US5] Verify color contrast: Test text-foreground on background meets 4.5:1 ratio
- [ ] T101 [US5] Verify color contrast: Test text-muted-foreground on background meets 4.5:1 ratio
- [ ] T102 [US5] Run Lighthouse audit: Verify Performance ≥90, Accessibility ≥95, SEO ≥95 on all key pages
- [ ] T103 [US5] Run axe-core: Verify zero critical accessibility violations

**Checkpoint**: All accessibility standards should be met with WCAG AA compliance

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and validation across all user stories

- [x] T104 [P] Verify zero console errors in development mode (`bun run dev`)
- [x] T105 [P] Verify zero console warnings in development mode
- [x] T106 [P] Verify zero TypeScript errors in build (`bun run build`)
- [x] T107 Run production build and verify bundle size within 5% of baseline (also verify code-splitting behavior unchanged per Edge Case resolution)
- [x] T108 [P] Test build time remains within 10% of baseline duration
- [x] T109 [P] Update .github/copilot-instructions.md with shadcn-vue patterns (already done via update-agent-context.sh)
- [x] T110 [P] Document migration patterns in specs/006-shadcn-vue-migration/IMPLEMENTATION_SUMMARY.md
- [x] T111 Run complete manual testing checklist from quickstart.md
- [x] T112 Validate all acceptance scenarios from spec.md are passing
- [x] T113 [P] Clean up unused imports and dead code across all migrated files
- [x] T114 [P] Format all code with Prettier/ESLint
- [x] T115 Commit final changes and create pull request from 006-shadcn-vue-migration branch

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion (T001-T012) - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion (T013-T021)
  - User stories CAN proceed in parallel if staffed appropriately
  - OR sequentially in priority order: US1 (P1) → US2 (P2) → US3 (P2) → US4 (P2) → US5 (P3)
- **Polish (Phase 8)**: Depends on all user stories being complete (US1-US5)

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
  - **MVP SCOPE**: This is the minimum viable migration - visual consistency established
- **User Story 2 (P2)**: Can start after Foundational - Independently testable, no dependencies on US1
- **User Story 3 (P2)**: Can start after Foundational - Independently testable, integrates with US1 components
- **User Story 4 (P2)**: Can start after Foundational - Independently testable, integrates with US1 components
- **User Story 5 (P3)**: Can start after Foundational - Validates all other user stories, best done after US1-US4

### Within Each User Story

- Tasks marked [P] within the same user story can run in parallel
- Migration tasks (T022-T044 in US1) are all parallelizable (different files)
- Styling tasks (T045-T049 in US1) can run after migration tasks complete
- Verification tasks within US2-US5 are parallelizable (different test scenarios)

### Parallel Opportunities

**Setup Phase (Phase 1):**

- T006, T009, T010, T011 can run in parallel

**Foundational Phase (Phase 2):**

- T014, T015, T016, T017, T018, T019 can run in parallel after T013

**User Story 1 (Phase 3):**

- Blog components (T022-T026) can all run in parallel
- Case study components (T027-T031) can all run in parallel
- AppFooter and AppContainer (T036, T037, T038) can run in parallel
- Page migrations (T039-T044) can all run in parallel
- Styling updates (T045-T047) can run in parallel

**User Story 2 (Phase 4):**

- All verification tasks (T050-T057) can run in parallel
- T058, T059, T060 can run in parallel

**User Story 3 (Phase 5):**

- T063-T067 can run in parallel
- Theme testing tasks (T069-T071) can run in parallel

**User Story 4 (Phase 6):**

- RTL layout tests (T073-T075) can run in parallel
- Icon positioning updates (T076-T079) can be done simultaneously
- Component tests (T080-T082) can run in parallel

**User Story 5 (Phase 7):**

- Keyboard navigation tests (T086-T088) can run in parallel
- ARIA label checks (T092-T094) can run in parallel
- Semantic HTML checks (T098, T099) can run in parallel
- Color contrast tests (T100, T101) can run in parallel

**Polish Phase (Phase 8):**

- T104, T105, T106, T108, T109, T110, T113, T114 can all run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all blog component migrations together:
Task T022: Migrate BlogPostCard.vue (UCard → Card composition)
Task T023: Update BlogPostCard.vue (UButton → Button + Icon)
Task T024: Update BlogPostCard.vue (Heroicons → Radix Icons)
Task T025: Migrate BlogList.vue
Task T026: Update BlogPostMeta.vue

# Launch all case study component migrations together:
Task T027: Migrate CaseStudyCard.vue (UCard → Card composition)
Task T028: Update CaseStudyCard.vue (UButton → Button + Icon)
Task T029: Update CaseStudyCard.vue (Heroicons → Radix Icons)
Task T030: Migrate CaseStudyList.vue
Task T031: Update CaseStudyMetrics.vue

# Launch all page-level migrations together:
Task T039: Migrate app/pages/index.vue
Task T040: Migrate app/pages/blog/index.vue
Task T041: Migrate app/pages/blog/[...slug].vue
Task T042: Migrate app/pages/case-studies/index.vue
Task T043: Migrate app/pages/case-studies/[...slug].vue
Task T044: Migrate app/error.vue
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

**Timeline**: ~2-3 days for single developer

1. Complete Phase 1: Setup (T001-T012) - ~1 hour
2. Complete Phase 2: Foundational (T013-T021) - ~1 hour
3. Complete Phase 3: User Story 1 (T022-T049) - ~1-2 days
4. **STOP and VALIDATE**: Test all pages visually in browser
5. Verify shadcn-vue theming is consistent across site
6. Deploy to staging for review

**This gives you a fully functional portfolio with new UI library**

### Incremental Delivery

**Timeline**: ~4-5 days for single developer

1. Complete Setup + Foundational → Foundation ready (~2 hours)
2. Add User Story 1 → Test independently → Deploy (MVP!) (~1-2 days)
3. Add User Story 2 → Test responsive → Deploy (~4 hours)
4. Add User Story 3 → Test theme switching → Deploy (~4 hours)
5. Add User Story 4 → Test RTL → Deploy (~4 hours)
6. Add User Story 5 → Test accessibility → Deploy (~4 hours)
7. Complete Polish → Final deployment (~2 hours)

**Each story adds validation without breaking previous stories**

### Parallel Team Strategy

With 3 developers:

1. Team completes Setup + Foundational together (~2 hours)
2. Once Foundational is done (after T021):
   - **Developer A**: User Story 1 (Component migration) - ~1-2 days
   - **Developer B**: User Story 2 + 3 (Responsive + Theme) - ~1 day
   - **Developer C**: User Story 4 + 5 (RTL + A11y) - ~1 day
3. Stories complete and merge independently
4. Team completes Polish together (~2 hours)

**Total parallel timeline**: ~2-3 days vs ~4-5 days sequential

---

## Success Validation Checklist

After completing all tasks, verify these outcomes from spec.md:

- [ ] **SC-001**: All pages render with consistent shadcn-vue default theme
- [ ] **SC-002**: Lighthouse performance score ≥90 (no degradation)
- [ ] **SC-003**: Lighthouse accessibility score ≥95
- [ ] **SC-004**: Bundle size within 5% of current size
- [ ] **SC-005**: Theme switching completes within 200ms
- [ ] **SC-006**: RTL layout works correctly for Arabic content
- [ ] **SC-007**: Zero console errors/warnings in dev and production
- [ ] **SC-008**: Build time within 10% of current duration
- [ ] **SC-009**: Keyboard navigation patterns maintained

---

## Notes

- **[P] tasks** = different files, can run in parallel safely
- **[Story] label** maps task to specific user story for traceability
- Each user story is independently completable and testable
- No tests included per clarification (manual testing only)
- Commit after each logical group of tasks (e.g., after all blog components)
- Stop at any checkpoint to validate story independently before proceeding
- All file paths are absolute from repository root
- Migration contracts in specs/006-shadcn-vue-migration/contracts/ provide detailed transformation patterns
- Quickstart guide in specs/006-shadcn-vue-migration/quickstart.md provides setup instructions
