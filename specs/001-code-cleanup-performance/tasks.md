---
description: 'Task list for code cleanup and performance'
---

# Tasks: Code Cleanup & Performance

**Input**: Design documents from [specs/001-code-cleanup-performance/](specs/001-code-cleanup-performance/)
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are optional. No test tasks are included because the spec does not request a TDD approach.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Capture baseline context and cleanup inventory

- [x] T001 Create cleanup inventory in specs/001-code-cleanup-performance/cleanup-inventory.md (list primary pages, assets, and suspected unused items)
- [x] T002 Capture baseline performance notes in specs/001-code-cleanup-performance/baseline-metrics.md (Lighthouse scores or page load notes)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Remove legacy speckit artifacts and references before code cleanup

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Remove legacy spec folders in specs/ (delete specs/001-global-setup/, specs/002-ui-design-system/, specs/003-content-engine/, specs/004-content-generation-agent/, specs/005-seo-optimization/, specs/006-shadcn-vue-migration/, specs/007-multilingual-content/)
- [x] T004 [P] Remove speckit prompt docs in .github/prompts/ (delete .github/prompts/speckit.specify.prompt.md, .github/prompts/speckit.clarify.prompt.md, .github/prompts/speckit.plan.prompt.md, .github/prompts/speckit.tasks.prompt.md)
- [x] T005 [P] Remove speckit references from README.md, docs/PRERENDERING.md, and .github/copilot-instructions.md (if present)
- [x] T006 [P] Remove speckit references from code comments in app/ (scan app/app.vue and app/components/AppHeader.vue, app/components/AppFooter.vue, plus any other files discovered)

**Checkpoint**: Foundation ready — cleanup tasks can now proceed by user story

---

## Phase 3: User Story 1 - Faster browsing experience (Priority: P1) 🎯 MVP

**Goal**: Reduce unused assets and heavy markup so primary pages load faster

**Independent Test**: Load primary pages and confirm content is usable within 2 seconds and navigation remains stable

### Implementation for User Story 1

- [x] T007 [P] [US1] Remove unused images in public/images/ and update references in content/ and app/components/
- [x] T008 [P] [US1] Replace raw <img> usage with NuxtImg/NuxtPicture in app/components/ and app/pages/ (if any are found)
- [x] T009 [US1] Remove unused CSS and optimize layout styles in app/assets/css/ and app/app.vue

**Checkpoint**: Primary pages load quickly with no missing assets

---

## Phase 4: User Story 2 - Maintainable and readable structure (Priority: P2)

**Goal**: Improve readability by removing dead code and simplifying core components

**Independent Test**: A maintainer can locate and update a target page within 10 minutes using the updated structure

### Implementation for User Story 2

- [x] T010 [P] [US2] Remove unused composables and dead exports in app/composables/ and update import sites
- [x] T011 [P] [US2] Remove unused utilities and types in app/utils/ and app/types/; consolidate duplicates if found
- [x] T012 [US2] Document the primary edit locations in README.md (or add docs/EDITING.md) to support maintainers finding updates quickly
- [x] T013 [US2] Simplify core layout components for readability in app/components/AppHeader.vue, app/components/AppFooter.vue, and app/app.vue

**Checkpoint**: Core layout and shared utilities are clean and easy to navigate

---

## Phase 5: User Story 3 - Safe removal of unused elements (Priority: P3)

**Goal**: Remove obsolete content and assets without changing visible behavior

**Independent Test**: Review primary pages and navigation to confirm no broken links or missing content

### Implementation for User Story 3

- [x] T014 [P] [US3] Remove obsolete content entries in content/blog/ and content/case-studies/ that are not referenced by navigation or content queries
- [x] T015 [P] [US3] Remove unused featured images in public/images/blog/ and public/images/case-studies/ after verifying references
- [x] T016 [US3] Verify internal links in app/pages/ and content/ remain valid; update targets if needed

**Checkpoint**: No broken links or missing content across primary pages

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and documentation of results

- [x] T017 [P] Update specs/001-code-cleanup-performance/cleanup-inventory.md and specs/001-code-cleanup-performance/baseline-metrics.md with final notes
- [x] T018 Run quickstart validation and record results in specs/001-code-cleanup-performance/validation.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — no dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) — independent of US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) — independent of US1/US2

### Within Each User Story

- Remove unused items before refactoring dependent files
- Update references immediately after deleting assets or content
- Validate primary pages after each story checkpoint

---

## Parallel Execution Examples

### User Story 1

- T007 and T008 can run in parallel (different file sets)

### User Story 2

- T010 and T011 can run in parallel (different file sets)

### User Story 3

- T014 and T015 can run in parallel (different file sets)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **Stop and validate** primary pages for speed and stability

### Incremental Delivery

1. Setup + Foundational → baseline clean state
2. User Story 1 → performance improvements
3. User Story 2 → readability improvements
4. User Story 3 → safe removal of unused elements
5. Polish & validation
