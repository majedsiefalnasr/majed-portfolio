# Tasks: Code Cleanup Linting and Formatting

**Input**: Design documents from `/specs/002-code-cleanup-linting/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and create basic configuration files

- [x] T001 Install ESLint, Prettier, Husky, and lint-staged dependencies in package.json
- [x] T002 Create .eslintrc.js with Nuxt recommended configuration in root
- [x] T003 Create .prettierrc with standard formatting rules in root
- [x] T004 Create .prettierignore file for files to exclude from formatting in root
- [x] T005 Add lint, lint:fix, format, and format:check scripts to package.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Setup pre-commit infrastructure that enables quality gates

**⚠️ CRITICAL**: Pre-commit setup must be complete before code quality enforcement

- [x] T006 Configure lint-staged for running linters on staged files in .lintstagedrc
- [x] T007 Setup Husky pre-commit hook to run lint-staged in .husky/pre-commit

**Checkpoint**: Pre-commit hooks ready - code quality can now be enforced automatically

---

## Phase 3: User Story 1 - Automated Code Linting (Priority: P1) 🎯 MVP

**Goal**: Enable automated linting to catch errors and enforce coding standards

**Independent Test**: Run `bun run lint` and verify no errors reported for TypeScript/Vue files

### Implementation for User Story 1

- [x] T008 [US1] Configure ESLint rules for TypeScript strict mode compliance in .eslintrc.js
- [x] T009 [US1] Test ESLint configuration on existing codebase with `bun run lint`
- [x] T010 [US1] Fix auto-fixable linting issues with `bun run lint:fix`

**Checkpoint**: Linting works and catches issues in existing code

---

## Phase 4: User Story 2 - Code Formatting (Priority: P2)

**Goal**: Ensure consistent code formatting across the entire codebase

**Independent Test**: Run `bun run format:check` and verify all files are properly formatted

### Implementation for User Story 2

- [x] T011 [US2] Configure Prettier with Tailwind CSS plugin in .prettierrc
- [x] T012 [US2] Format all existing code files with `bun run format`

**Checkpoint**: All code is consistently formatted

---

## Phase 5: User Story 3 - Clean Code Best Practices (Priority: P3)

**Goal**: Enforce basic clean code principles through automated rules

**Independent Test**: Code review confirms adherence to documented clean code guidelines

### Implementation for User Story 3

- [x] T013 [US3] Add ESLint rules for code complexity and clean code practices in .eslintrc.js
- [x] T014 [US3] Document clean code guidelines in project README or separate file

**Checkpoint**: Clean code principles are enforced and documented

---

## Phase 6: Integration & Validation

**Purpose**: Integrate quality tools into development workflow and validate everything works together

- [x] T015 Integrate linting checks into build process in package.json scripts
- [x] T016 Test pre-commit hooks work correctly with staged file changes
- [x] T017 Validate all tools work together without conflicts

**Checkpoint**: Complete quality pipeline operational

---

## Phase 7: Polish & Documentation

**Purpose**: Final validation and developer documentation

- [x] T018 Update project README with linting and formatting instructions
- [x] T019 Run final validation on entire codebase
- [x] T020 Document troubleshooting steps for common issues

**Checkpoint**: Feature complete and documented

---

## Dependencies Section

**User Story Completion Order**:

1. US1 (Linting) → Foundation for code quality
2. US2 (Formatting) → Consistent appearance
3. US3 (Clean Code) → Maintainable practices

**Parallel Opportunities**:

- T008, T011 can run in parallel (different config files)
- T009, T012 can run in parallel (different tools)
- T013, T014 can run in parallel (rules + docs)

**Implementation Strategy**:

- **MVP Scope**: Complete US1 (linting) for immediate code quality benefits
- **Incremental Delivery**: Add formatting (US2) then clean code practices (US3)
- **Quality Gates**: Each phase includes validation before proceeding

**Total Tasks**: 20
**Tasks per User Story**:

- Setup: 5 tasks
- Foundational: 2 tasks
- US1: 3 tasks
- US2: 2 tasks
- US3: 2 tasks
- Integration: 3 tasks
- Polish: 3 tasks

**Format Validation**: All tasks follow the required checklist format with sequential IDs, parallel markers, story labels, and file paths.
