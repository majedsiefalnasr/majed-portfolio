# Implementation Plan: AI Content Generation Agent

**Branch**: `004-content-generation-agent` | **Date**: 2026-01-14 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/004-content-generation-agent/spec.md`

## Summary

Build an AI-powered content generation agent integrated with GitHub Copilot Chat that helps portfolio owners create blog posts and case studies through interactive Q&A conversations. The agent will ask whether to generate full content or metadata-only, gather required information through questions, and generate markdown files with exact frontmatter schemas matching the Nuxt Content structure.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode enabled per constitution)  
**Primary Dependencies**: GitHub Copilot Chat API, @nuxt/content v3, Nuxt 4.x  
**Storage**: File system (markdown files in `/content/blog/YYYY/` and `/content/case-studies/`)  
**Testing**: Vitest (existing portfolio test framework)  
**Target Platform**: VS Code Extension / GitHub Copilot Chat Agent  
**Project Type**: VS Code Agent/Extension (GitHub Copilot integration)  
**Performance Goals**:

- Content generation < 2 minutes for blog posts
- Content generation < 3 minutes for case studies
- Zero validation errors on generated frontmatter

**Constraints**:

- MUST use GitHub Copilot's underlying models (no separate API keys)
- MUST validate against existing TypeScript schemas in `app/types/content.ts`
- MUST preserve existing content files (no overwrites without confirmation)
- MUST follow constitution: Bun runtime, TypeScript strict mode, Nuxt 4 conventions

**Scale/Scope**:

- Support 2 content types (Blog, Case Study)
- 2 languages (English, Arabic) with proper RTL
- Interactive Q&A with ~5-10 questions per content piece
- Metadata-only or full content generation modes

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### ✅ Tech Stack Compliance

- **Runtime**: Bun ✅ (existing portfolio uses Bun)
- **Framework**: Nuxt 4 ✅ (content integration with existing Nuxt app)
- **UI Library**: N/A (no UI components needed - chat interface only)
- **Content Engine**: Nuxt Content v3 ✅ (generating compatible markdown)
- **Language**: TypeScript strict mode ✅ (validating against existing types)

### ✅ Performance-First

- Agent generates content asynchronously without blocking UI
- File writes are atomic operations
- No impact on existing portfolio performance
- Content validation happens before file creation

### ✅ i18n Support

- Supports `lang` field in frontmatter (en/ar)
- Agent can generate bilingual content with proper file naming (.md / .ar.md)
- RTL content structure preserved in generated markdown

### ✅ SEO & Accessibility

- Generated content includes required SEO meta (excerpt, tags)
- Frontmatter schema ensures proper meta tag generation
- Semantic markdown structure (H2-H6 hierarchy)

### ✅ Type Safety

- Validates against BlogPost and CaseStudy interfaces from `app/types/content.ts`
- All generated frontmatter fields typed and validated
- Runtime validation before file creation

**VERDICT**: ✅ **NO VIOLATIONS** - Feature aligns with constitution principles

## Project Structure

### Documentation (this feature)

```text
specs/004-content-generation-agent/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 research output
├── data-model.md        # Phase 1 data models
├── quickstart.md        # Phase 1 developer guide
├── contracts/           # Phase 1 API contracts
│   ├── README.md
│   ├── agent-prompts.md
│   ├── content-schemas.ts
│   └── workflow.md
├── tasks.md             # Phase 2 implementation tasks (via /speckit.tasks)
└── checklists/
    └── requirements.md  # Validation checklist
```

### Source Code (repository root)

```text
.github/
└── copilot/
    ├── instructions.md                    # Updated with content generation capabilities
    └── agents/
        └── content-generator.agent.md     # New: Content generation agent definition

app/
├── types/
│   └── content.ts                   # Existing: BlogPost & CaseStudy interfaces
└── utils/
    └── content-generator/           # New: Content generation utilities
        ├── schema-validator.ts      # Validates against TypeScript schemas
        ├── frontmatter-builder.ts   # Builds YAML frontmatter
        ├── filename-sanitizer.ts    # Sanitizes filenames
        └── template-renderer.ts     # Renders content templates

content/
├── blog/YYYY/                       # Generated blog posts placed here
└── case-studies/                    # Generated case studies placed here

tests/
└── content-generator/               # New: Test suite for content generation
    ├── schema-validation.test.ts
    ├── frontmatter.test.ts
    ├── filename-sanitizer.test.ts
    └── template-renderer.test.ts
```

**Structure Decision**: VS Code Agent pattern with supporting utilities in the app. The agent runs within GitHub Copilot Chat context, using utility functions from `app/utils/content-generator/` to validate schemas, build frontmatter, and create files. This keeps the agent logic focused on conversation flow while reusing portfolio's existing type definitions.

## Complexity Tracking

> **No violations requiring justification** - Constitution check passed without complexity additions.

---

## Phase Completion Summary

### ✅ Phase 0: Outline & Research (Complete)

**Output**: [research.md](./research.md)

**Key Decisions Made**:

1. **Architecture**: GitHub Copilot Chat Agent API
2. **Validation**: Zod runtime schemas derived from TypeScript interfaces
3. **Conversation Flow**: Conditional branching Q&A with smart defaults
4. **File Naming**: Slug-based with year directories matching existing structure
5. **Templates**: Structured markdown per content type (Blog/Case Study)
6. **Error Handling**: Graceful degradation with context preservation

**Research Areas Covered**:

- GitHub Copilot Chat Agent architecture and API
- Runtime schema validation strategies (Zod selected)
- Interactive Q&A conversation patterns
- File naming conventions and conflict resolution
- Content template structures for consistency
- Error handling and recovery workflows

---

### ✅ Phase 1: Design & Contracts (Complete)

**Outputs**:

- [data-model.md](./data-model.md) - Entity definitions and state machines
- [contracts/](./contracts/) - API contracts and schemas
  - [README.md](./contracts/README.md)
  - [agent-prompts.md](./contracts/agent-prompts.md) - Conversation templates
  - [content-schemas.ts](./contracts/content-schemas.ts) - Zod validation schemas
  - [workflow.md](./contracts/workflow.md) - Step-by-step workflows
- [quickstart.md](./quickstart.md) - Developer implementation guide
- ✅ Agent context updated (GitHub Copilot instructions)

**Key Artifacts**:

**Data Model**:

- 6 core entities defined (GenerationSession, QuestionResponse, BlogPostMetadata, CaseStudyMetadata, ValidationResult, GeneratedContent)
- Complete state machine with 11 states and transition rules
- Entity relationships and data flow diagrams
- Persistence strategy (ephemeral in-memory, final output to file system)

**Contracts**:

- Complete agent prompt templates for all questions
- Zod schemas for BlogPost and CaseStudy metadata
- Validation helper functions with error/warning handling
- Detailed workflow diagrams for 4 scenarios (full blog, metadata blog, full case study, error recovery)

**Developer Guide**:

- Quick start instructions
- Core API documentation
- Implementation guidelines (TypeScript strict, error handling, file operations)
- Testing strategy (unit + integration)
- Debugging tips and common issues

**Constitution Re-check**: ✅ Passed - No violations introduced during design phase

---

### 📋 Phase 2: Task Planning (Next Step)

**Command**: Run `/speckit.tasks` to generate [tasks.md](./tasks.md)

This will break down implementation into:

- Atomic, testable tasks
- Task dependencies and ordering
- Estimated effort per task
- Acceptance criteria for each task

---

## Implementation Readiness

### Ready to Build ✅

All design decisions made, contracts defined, and documentation complete. Development can begin immediately with:

1. **Install Dependencies**: `bun add zod`
2. **Create Utilities**: Implement functions in `app/utils/content-generator/`
3. **Create Agent**: Define agent in `.github/copilot/agents/content-generator.md`
4. **Write Tests**: Test suite in `tests/content-generator/`
5. **Validate**: Run tests and validate against spec requirements

### Key Files to Create

1. `app/utils/content-generator/schemas.ts` (copy from contracts)
2. `app/utils/content-generator/frontmatter-builder.ts`
3. `app/utils/content-generator/filename-sanitizer.ts`
4. `app/utils/content-generator/template-renderer.ts`
5. `app/utils/content-generator/index.ts`
6. `.github/copilot/agents/content-generator.agent.md`
7. Test files in `tests/content-generator/`

### Success Criteria Reference

From spec.md - all measurable outcomes:

- ✓ SC-001: Blog post generation < 2 minutes
- ✓ SC-002: Case study generation < 3 minutes
- ✓ SC-003: < 10% manual editing required
- ✓ SC-004: 90% of files render without validation errors
- ✓ SC-005: All required frontmatter fields populated
- ✓ SC-006: 80% time reduction vs manual writing
- ✓ SC-007: Readability scores 60-70 (Flesch reading ease)
- ✓ SC-008: 95% successful publishing without technical issues
- ✓ SC-009: 100% unique filenames (no conflicts)

---

## Next Command

```bash
/speckit.tasks
```

This will analyze the specification, data model, and contracts to generate a detailed task breakdown for implementation.
