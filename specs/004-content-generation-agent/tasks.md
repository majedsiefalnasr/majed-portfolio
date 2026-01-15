# Implementation Tasks: AI Content Generation Agent

**Feature**: AI Content Generation Agent  
**Branch**: `004-content-generation-agent`  
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

---

## Overview

This document breaks down the implementation of the AI Content Generation Agent into actionable tasks organized by user story. Each phase represents a complete, independently testable increment of functionality.

**Implementation Strategy**:

- **MVP First**: Focus on Phase 1-4 (Setup + Foundational + US1 Blog + US2 Case Study)
- **Incremental Delivery**: Each user story can be implemented and tested independently after foundational phase
- **Parallel Opportunities**: Tasks marked with [P] can be executed in parallel within the same phase

**Total Estimated Tasks**: 85 tasks across 8 phases (48 MVP, 37 post-MVP)

---

## Phase 1: Project Setup

**Goal**: Initialize project dependencies and directory structure.

**Tasks**:

- [x] T001 Install Zod validation library: Run `bun add zod` from portfolio root
- [x] T002 Install Node types for development: Run `bun add -d @types/node`
- [x] T003 Create utility directory structure: `mkdir -p app/utils/content-generator`
- [x] T004 Create test directory structure: `mkdir -p tests/content-generator`
- [x] T005 Create agent directory structure: `mkdir -p .github/copilot/agents`

---

## Phase 2: Foundational Components (BLOCKING - Complete Before User Stories)

**Goal**: Build core utilities and validation schemas that all user stories depend on.

**Tasks**:

- [x] T006 [P] Copy content schemas from contracts to app/utils/content-generator/schemas.ts
- [x] T007 [P] Create filename sanitizer utility in app/utils/content-generator/filename-sanitizer.ts implementing `generateSlug()` and `resolveFilePath()` functions
- [x] T008 [P] Create frontmatter builder utility in app/utils/content-generator/frontmatter-builder.ts implementing `buildFrontmatter()` function
- [x] T009 Create template renderer utility in app/utils/content-generator/template-renderer.ts implementing `renderBlogPost()` and `renderCaseStudy()` functions
- [x] T010 Create public API exports in app/utils/content-generator/index.ts exporting all utility functions
- [x] T010a Create readTime calculator utility implementing `calculateReadTime(content: string): number` using formula: word count / 200 WPM, rounding to nearest minute
- [x] T011 [P] Write unit tests for schema validation in tests/content-generator/schemas.test.ts
- [x] T012 [P] Write unit tests for filename sanitizer in tests/content-generator/filename-sanitizer.test.ts
- [x] T013 [P] Write unit tests for frontmatter builder in tests/content-generator/frontmatter-builder.test.ts
- [x] T014 [P] Write unit tests for template renderer in tests/content-generator/template-renderer.test.ts
- [x] T015 Run all tests to verify foundational utilities: Execute `bun test tests/content-generator`

**Completion Criteria**: All utility functions implemented, tested, and passing. Can generate valid slugs, frontmatter, content templates, and reading time estimates.

---

## Phase 3: User Story 1 - Blog Post Generation (Priority: P1)

**Story Goal**: Portfolio owner provides a topic and receives a complete, formatted blog post ready for publication.

**Independent Test**: Open GitHub Copilot Chat, provide a topic prompt (e.g., "Write about TypeScript best practices"), receive a complete markdown blog post with proper frontmatter that can be placed in `content/blog/YYYY/`.

**Tasks**:

- [x] T016 [US1] Create initial agent definition file at .github/copilot/agents/content-generator.agent.md with basic structure (agent name, description, capabilities)
- [x] T017 [US1] Implement content type selection prompt in agent: "What would you like to generate? 1. Blog post 2. Case study"
- [x] T018 [US1] Implement mode selection prompt in agent: "Generate full content or metadata only?"
- [x] T019 [US1] Implement blog metadata collection flow in agent asking for: title, date, author, tags, excerpt, lang (using prompts from contracts/agent-prompts.md)
- [x] T020 [US1] Implement metadata validation step calling `validateBlogPostMetadata()` from schemas.ts
- [x] T021 [US1] Implement error handling for validation failures showing specific errors and re-prompting for invalid fields
- [x] T022 [US1] Implement full content generation mode asking for: content length (short/medium/long) and writing tone (professional/conversational/technical/educational)
- [x] T023 [US1] Implement AI content generation using GitHub Copilot's models to create blog post body with sections: Introduction, Main Content, Conclusion
- [x] T024 [US1] Implement content preview display in chat showing generated frontmatter + body content
- [x] T025 [US1] Implement confirmation workflow with options: 1. Approve 2. Refine 3. Regenerate 4. Cancel
- [x] T026 [US1] Implement file path resolution using `resolveFilePath()` to determine output path in content/blog/YYYY/
- [x] T027 [US1] Implement file conflict detection checking if file already exists at target path
- [x] T028 [US1] Implement file conflict resolution offering: 1. Rename (slug-v2) 2. Overwrite 3. Cancel
- [x] T029 [US1] Implement file write operation creating markdown file with frontmatter + body content
- [x] T030 [US1] Implement success message showing file path and next steps (edit, preview, commit)
- [x] T031 [US1] Implement metadata-only mode generating frontmatter with placeholder body: "## Write your content here..."
- [ ] T032 [US1] Create integration test for full blog post generation workflow in tests/content-generator/blog-generation.test.ts
- [ ] T033 [US1] Create integration test for metadata-only blog generation in tests/content-generator/blog-metadata.test.ts
- [ ] T034 [US1] Test agent end-to-end by generating a sample blog post manually through Copilot Chat

**Completion Criteria**:

- ✅ Agent can generate complete blog posts through interactive Q&A
- ✅ Generated files have valid frontmatter matching BlogPost schema
- ✅ Files are created in correct directory (content/blog/YYYY/)
- ✅ Both full content and metadata-only modes work
- ✅ Validation errors are caught and user is re-prompted
- ✅ File conflicts are detected and resolved

---

## Phase 4: User Story 2 - Case Study Generation (Priority: P1)

**Story Goal**: Portfolio owner provides project information and receives a structured case study showcasing their work.

**Independent Test**: Provide project details (name, role, tech used, problem solved) and receive a formatted case study with sections for overview, challenge, solution, results that can be placed in `content/case-studies/`.

**Tasks**:

- [x] T035 [US2] Implement case study metadata collection flow in agent asking for: title, client, date, role, timeline, tags, excerpt, featuredImage, featured, order, lang (using prompts from contracts/agent-prompts.md)
- [x] T036 [US2] Implement conditional questions for case studies: If featured=true, ask for display order
- [x] T037 [US2] Implement testimonial collection (optional): Ask if user wants to include testimonial, then collect quote, author, position
- [x] T038 [US2] Implement metrics collection (optional): Ask if user wants to include metrics, then collect label + value pairs in a loop
- [x] T039 [US2] Implement case study context questions asking for: problem description (2-3 sentences), solution approach (2-3 sentences), results/outcomes (2-3 sentences)
- [x] T040 [US2] Implement metadata validation step calling `validateCaseStudyMetadata()` from schemas.ts
- [x] T041 [US2] Implement AI content generation for case study using context to create sections: Overview, Challenge, Solution, Results, Technologies Used
- [x] T042 [US2] Implement file path resolution for case studies using `resolveFilePath()` with contentType='case-study'
- [x] T043 [US2] Reuse file conflict detection and resolution logic from blog generation (T027-T028)
- [x] T044 [US2] Implement file write operation for case study markdown files in content/case-studies/
- [ ] T045 [US2] Create integration test for full case study generation workflow in tests/content-generator/case-study-generation.test.ts
- [ ] T046 [US2] Create integration test for metadata-only case study generation in tests/content-generator/case-study-metadata.test.ts
- [ ] T047 [US2] Test agent end-to-end by generating a sample case study manually through Copilot Chat

**Completion Criteria**:

- ✅ Agent can generate complete case studies through interactive Q&A
- ✅ Generated files have valid frontmatter matching CaseStudy schema
- ✅ Files are created in correct directory (content/case-studies/)
- ✅ Conditional fields (testimonial, metrics) work correctly
- ✅ Case study structure includes all required sections
- ✅ Both full content and metadata-only modes work

---

## Phase 5: User Story 3 - Preview and Refine (Priority: P2)

**Story Goal**: User reviews AI-generated content and can request modifications before finalizing.

**Independent Test**: Generate content, request modifications (e.g., "make it more technical" or "add code examples"), and receive updated content with changes applied.

**Tasks**:

- [ ] T048 [US3] Implement refinement prompt after preview showing options with details: "What would you like to do? 1. Approve and save 2. Refine specific sections 3. Regenerate entire content 4. Cancel"
- [ ] T049 [US3] Implement section selector for refinement asking: "Which section to refine? (introduction/main-content/conclusion for blog) or (overview/challenge/solution/results for case study)"
- [ ] T050 [US3] Implement section regeneration logic preserving other sections and metadata while regenerating selected section only
- [ ] T051 [US3] Implement tone adjustment refinement asking: "What tone adjustment? (more technical/more casual/more detailed/more concise)"
- [ ] T052 [US3] Implement content addition refinement asking: "What to add? (more examples/more code samples/more data/more images)"
- [ ] T053 [US3] Implement full regeneration with preserved metadata keeping all user answers but generating new content body
- [ ] T054 [US3] Implement refinement iteration limit (max 5 refinements) to prevent infinite loops
- [ ] T055 [US3] Create integration test for refinement workflow in tests/content-generator/refinement.test.ts
- [ ] T056 [US3] Test refinement end-to-end by generating content and requesting multiple modifications

**Completion Criteria**:

- ✅ Users can refine specific sections without regenerating entire content
- ✅ Tone adjustments are applied correctly
- ✅ Multiple refinements can be requested in sequence
- ✅ Metadata is preserved during refinements
- ✅ Refinement iteration limit prevents infinite loops

---

## Phase 6: User Story 4 - Bilingual Content (Priority: P3)

**Story Goal**: User generates content in both English and Arabic with consistent structure.

**Independent Test**: Request bilingual content and verify both `.md` and `.ar.md` files exist with appropriate translations.

**Tasks**:

- [ ] T057 [US4] Update language selection prompt to offer: "1. English only 2. Arabic only 3. Both (bilingual)"
- [ ] T058 [US4] Implement bilingual mode generating content in both languages sequentially (English first, then Arabic)
- [ ] T059 [US4] Implement translation of frontmatter metadata (title, excerpt, tags) from English to Arabic
- [ ] T060 [US4] Implement content translation preserving markdown structure and technical terms in English where appropriate
- [ ] T061 [US4] Implement dual file creation generating both slug.md and slug.ar.md files
- [ ] T062 [US4] Implement RTL validation ensuring Arabic content has proper text direction
- [ ] T063 [US4] Create integration test for bilingual generation in tests/content-generator/bilingual.test.ts
- [ ] T064 [US4] Test bilingual mode end-to-end by generating sample blog post in both languages

**Completion Criteria**:

- ✅ Users can generate content in both languages with single command
- ✅ Both .md and .ar.md files are created correctly
- ✅ Frontmatter is translated appropriately
- ✅ Technical terms remain in English in Arabic content
- ✅ Markdown structure is consistent across both versions

---

## Phase 7: User Story 5 - Custom Templates (Priority: P3)

**Story Goal**: User can define and use custom templates for different content structures.

**Independent Test**: Create a custom template structure, generate content with that template, and verify output follows the specified format.

**Tasks**:

- [ ] T065 [US5] Create template definition schema in app/utils/content-generator/template-schema.ts defining structure for custom templates (required sections, optional sections, field mappings)
- [ ] T066 [US5] Create template storage directory structure: `app/utils/content-generator/templates/`
- [ ] T067 [US5] Create default blog template in templates/blog-default.ts with standard structure (Introduction, Main Content, Conclusion)
- [ ] T068 [US5] Create default case study template in templates/case-study-default.ts with standard structure (Overview, Challenge, Solution, Results, Technologies)
- [ ] T069 [US5] Create tutorial blog template in templates/blog-tutorial.ts with structure (Prerequisites, Steps, Troubleshooting, Summary)
- [ ] T070 [US5] Implement template selector in agent asking: "Which template? 1. Default 2. Tutorial 3. Custom (provide path)"
- [ ] T071 [US5] Implement template loading logic in template-renderer.ts reading template files and parsing structure
- [ ] T072 [US5] Implement custom template validation ensuring required sections are defined
- [ ] T073 [US5] Update content generation to use selected template structure instead of hardcoded sections
- [ ] T074 [US5] Create integration test for template selection in tests/content-generator/templates.test.ts
- [ ] T075 [US5] Test custom template end-to-end by creating a new template and generating content with it

**Completion Criteria**:

- ✅ Users can select from predefined templates
- ✅ Users can provide custom template files
- ✅ Generated content follows selected template structure
- ✅ Template validation catches invalid structures
- ✅ At least 2 predefined templates available (default + tutorial)

---

## Phase 8: Polish & Documentation

**Goal**: Finalize implementation with comprehensive usage documentation and agent optimization.

**Tasks**:

- [ ] T076 [P] Add comprehensive error handling for all file system operations (permissions, disk space, locked files)
- [ ] T077 [P] Add logging for debugging agent conversations (optional debug mode)
- [ ] T078 [P] Optimize AI prompts for better content quality based on testing feedback
- [x] T079 Update .github/copilot/instructions.md with content generation agent capabilities
- [x] T080 Create USAGE.md with step-by-step instructions on how to use the agent (see Usage Guide section below)
- [x] T081 Add examples directory with sample generated content: specs/004-content-generation-agent/examples/
- [x] T082 Run full test suite and verify all 9 success criteria from spec.md
- [ ] T083 Create demo video showing agent usage from start to finish
- [x] T084 Update portfolio README.md with content generation agent section

**Completion Criteria**:

- ✅ All error scenarios are handled gracefully
- ✅ Complete usage documentation exists
- ✅ All tests passing
- ✅ Success criteria validated

---

## Usage Guide: How to Use the Content Generation Agent

This section provides step-by-step instructions for portfolio owners to use the AI Content Generation Agent through GitHub Copilot Chat.

### Prerequisites

1. **VS Code with GitHub Copilot**: Ensure you have an active GitHub Copilot subscription and the extension installed
2. **Portfolio in Development Mode**: Have your portfolio project open in VS Code
3. **Agent Available**: The content-generator agent should appear in your Copilot Chat

### Step-by-Step: Generating a Blog Post

#### Step 1: Open GitHub Copilot Chat

- Press `Cmd/Ctrl + I` or click the Copilot icon in the sidebar
- Type `@content-generator` to invoke the agent

#### Step 2: Initiate Content Generation

**You say**: "I want to create a blog post"

**Agent responds**:

```
Great! Let me help you create a blog post.

First, would you like to generate:
1. Full content (complete blog post with body)
2. Metadata only (frontmatter template to fill in yourself)

Please choose 1 or 2.
```

#### Step 3: Select Generation Mode

**You say**: "1" (for full content) or "2" (for metadata only)

**Agent responds** (for full content):

```
Perfect! I'll generate a complete blog post.

Let's start with the basics:

What's the title of your blog post?
```

#### Step 4: Answer Metadata Questions

The agent will ask you the following questions in sequence:

1. **Title**: "What's the title?" → _Example: "Building Type-Safe APIs with TypeScript"_
2. **Date**: "Publication date? (default: today)" → _Press Enter for today or provide YYYY-MM-DD_
3. **Author**: "Author name? (default: Majed Sief Alnasr)" → _Press Enter for default_
4. **Tags**: "Tags? (comma-separated)" → _Example: "typescript, api, backend, nodejs"_
5. **Excerpt**: "Brief excerpt (150-160 chars for SEO)?" → _Example: "Learn best practices for building type-safe APIs using TypeScript and modern tools"_
6. **Language**: "Language? (en/ar, default: en)" → _Press Enter for English_

For **full content mode**, additional questions:

7. **Length**: "Content length? (short/medium/long)" → _Example: "medium"_
8. **Tone**: "Writing tone? (professional/conversational/technical/educational)" → _Example: "technical"_

#### Step 5: Validation

**Agent validates your inputs**:

```
✅ Validating metadata...
✅ All fields valid!

Generating your blog post...
```

If there are errors:

```
❌ Validation errors found:
- Date must be in YYYY-MM-DD format
- At least one tag is required

Let me ask those questions again:
What date? (YYYY-MM-DD)
```

#### Step 6: Content Generation

**Agent generates content**:

```
🤖 Generating content...
This may take 30-60 seconds...

✅ Content generated successfully!
```

#### Step 7: Preview and Approve

**Agent shows preview**:

```
Here's your blog post:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---
title: 'Building Type-Safe APIs with TypeScript'
date: 2026-01-14
author: 'Majed Sief Alnasr'
tags: ['typescript', 'api', 'backend', 'nodejs']
excerpt: 'Learn best practices for building type-safe APIs...'
lang: 'en'
---

## Introduction

Building robust APIs requires...

[... full content preview ...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File will be saved to: content/blog/2026/building-type-safe-apis-with-typescript.md

What would you like to do?
1. Approve and save
2. Refine specific sections
3. Regenerate entire content
4. Cancel
```

#### Step 8: Choose Action

**Option 1 - Approve**: Agent creates the file

**You say**: "1"

**Agent responds**:

```
✅ File created successfully!

📄 Location: content/blog/2026/building-type-safe-apis-with-typescript.md

Next steps:
- Open the file to review/edit
- Preview in browser: npm run dev
- Commit to git when ready

Need anything else?
```

**Option 2 - Refine**: Modify specific sections

**You say**: "2"

**Agent asks**:

```
Which section would you like to refine?
- introduction
- main-content
- conclusion

Or specify a modification:
- "make it more technical"
- "add code examples"
- "make it shorter"
```

**You say**: "add more code examples"

**Agent regenerates** with more code examples, then shows preview again

**Option 3 - Regenerate**: Start over with same metadata

**You say**: "3"

**Agent regenerates** entire content body, keeps your metadata

**Option 4 - Cancel**: Exit without saving

**You say**: "4"

**Agent responds**:

```
Cancelled. No files were created.
Your inputs were not saved.
```

### Step-by-Step: Generating a Case Study

The workflow is similar to blog posts, but with different questions:

#### Metadata Questions for Case Study:

1. **Title**: "Project title?"
2. **Client**: "Client/company name?"
3. **Date**: "Project date/completion date?"
4. **Role**: "Your role in the project?"
5. **Timeline**: "Project timeline?" → _Example: "3 months"_
6. **Tags**: "Technologies used? (comma-separated)"
7. **Excerpt**: "Brief project description?"
8. **Featured Image**: "Featured image path?" → _Example: "/images/case-studies/2026/project-name.jpg"_
9. **Featured**: "Should this be featured on homepage? (yes/no)"
   - If yes → **Order**: "Display order (number)?"
10. **Language**: "Language? (en/ar, default: en)"

#### Context Questions (for full content):

11. **Testimonial** (optional): "Include client testimonial? (yes/no)"
    - If yes → Quote, Author, Position
12. **Metrics** (optional): "Include metrics? (yes/no)"
    - If yes → Loop: Label + Value (e.g., "Users" → "10,000+")
13. **Problem**: "Describe the problem you solved (2-3 sentences)"
14. **Solution**: "Describe your solution approach (2-3 sentences)"
15. **Results**: "Describe the results/outcomes (2-3 sentences)"
16. **Length**: "Content length? (short/medium/long)"
17. **Tone**: "Writing tone?"

Then follows same preview → approve workflow.

### Tips for Best Results

1. **Be Specific**: Provide detailed answers to get better content quality
2. **Use Keywords**: Include relevant keywords in tags and excerpt for SEO
3. **Review Generated Content**: Always review before publishing, AI-generated content may need refinement
4. **Iterate**: Use the refine option to improve specific sections rather than regenerating everything
5. **Save Prompts**: Keep notes of what prompts work well for your style

### Troubleshooting

#### Agent Not Responding

- Check GitHub Copilot is active (green icon in status bar)
- Try reopening Copilot Chat
- Ensure agent file exists at `.github/copilot/agents/content-generator.agent.md`

#### Validation Errors

- Follow the exact format requested (e.g., YYYY-MM-DD for dates)
- Provide at least one tag
- Keep excerpt under 200 characters

#### File Already Exists

- Choose "Rename" to create a versioned filename (slug-v2.md)
- Choose "Overwrite" only if you want to replace existing file
- Choose "Cancel" to abort and try a different title

#### Content Quality Issues

- Use "Refine" to improve specific sections
- Adjust tone or length settings
- Provide more context in your answers for better results
- Try "Regenerate" for completely different content

### Advanced Usage

#### Generating Bilingual Content

**You say**: "I want a bilingual blog post"

**Agent** will generate both English (.md) and Arabic (.ar.md) versions automatically.

#### Using Custom Templates (Phase 7 - Future)

**You say**: "@content-generator use template tutorial"

**Agent** will use the tutorial template structure instead of default.

#### Metadata-Only Mode

Perfect for when you want to write the content yourself but need proper frontmatter:

**You say**: "Generate metadata for a case study"

**Agent** creates frontmatter template with placeholder for body:

```markdown
---
[... your metadata ...]
---

## Overview

[Write project overview here...]

## Challenge

[Describe the challenge...]
```

---

## Task Dependencies

### Dependency Graph

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) ← BLOCKING FOR ALL USER STORIES
    ↓
    ├─→ Phase 3 (US1: Blog)
    │
    ├─→ Phase 4 (US2: Case Study)
    │
    ├─→ Phase 5 (US3: Refine) ← Depends on Phase 3 or 4
    │
    ├─→ Phase 6 (US4: Bilingual) ← Depends on Phase 3 and 4
    │
    └─→ Phase 7 (US5: Templates) ← Depends on Phase 2
    ↓
Phase 8 (Polish) ← Depends on all previous phases
```

### User Story Independence

After Phase 2 (Foundational) is complete:

- **US1 (Blog)** - Fully independent, can be implemented first
- **US2 (Case Study)** - Fully independent, can be implemented in parallel with US1
- **US3 (Refine)** - Requires at least one of US1 or US2 complete
- **US4 (Bilingual)** - Requires both US1 and US2 complete
- **US5 (Templates)** - Only depends on Phase 2, can be implemented in parallel with US1/US2

### Parallel Execution Opportunities

**Within Phase 2** (can run in parallel after directory setup):

- T006, T007, T008 - Create utility files
- T011, T012, T013, T014 - Write tests (after utilities exist)

**Within Phase 3** (can run in parallel after agent structure exists):

- T032, T033 - Write integration tests (after implementation complete)

**Within Phase 4** (can run in parallel with Phase 3):

- Entire Phase 4 can be built while Phase 3 is in progress (both are P1)

**Within Phase 8**:

- T076, T077, T078 - Polish tasks can run in parallel

---

## Validation Checklist

### Before Starting Implementation

- [ ] All design documents reviewed (spec.md, plan.md, contracts/)
- [ ] Development environment ready (VS Code + Copilot)
- [ ] Portfolio running in dev mode
- [ ] Git branch created: `004-content-generation-agent`

### After Phase 2 (Foundational)

- [ ] All utility functions have unit tests
- [ ] Tests passing with 100% coverage on utilities
- [ ] Schemas validate against app/types/content.ts
- [ ] File operations work correctly (paths, slugs, frontmatter)

### After Phase 3 (Blog Generation)

- [ ] Can generate full blog post through Copilot Chat
- [ ] Can generate metadata-only blog post
- [ ] Generated files have valid frontmatter
- [ ] Files created in correct location (content/blog/YYYY/)
- [ ] Validation errors are caught and handled
- [ ] File conflicts are detected and resolved

### After Phase 4 (Case Study Generation)

- [ ] Can generate full case study through Copilot Chat
- [ ] Can generate metadata-only case study
- [ ] Conditional fields (testimonial, metrics) work
- [ ] Case study structure includes all sections
- [ ] Files created in correct location (content/case-studies/)

### After All Phases

- [ ] All 9 success criteria from spec.md verified:
  - [ ] SC-001: Blog post generation < 2 minutes
  - [ ] SC-002: Case study generation < 3 minutes
  - [ ] SC-003: < 10% manual editing required
  - [ ] SC-004: 90% of files render without errors
  - [ ] SC-005: All required frontmatter fields populated
  - [ ] SC-006: 80% time reduction vs manual writing
  - [ ] SC-007: Readability scores 60-70 (Flesch)
  - [ ] SC-008: 95% successful publishing
  - [ ] SC-009: 100% unique filenames
- [ ] Complete usage documentation exists
- [ ] All tests passing
- [ ] Demo completed successfully

---

## MVP Scope Recommendation

For fastest time to value, implement in this order:

**MVP (Minimum Viable Product)**:

1. Phase 1: Setup
2. Phase 2: Foundational
3. Phase 3: Blog Generation (US1)
4. Phase 4: Case Study Generation (US2)

**Post-MVP Enhancements**: 5. Phase 5: Refinement (US3) 6. Phase 6: Bilingual (US4) 7. Phase 7: Templates (US5) 8. Phase 8: Polish & Documentation

This gets core content generation working quickly (blog + case study), then adds refinement and advanced features iteratively.

---

## Summary

- **Total Tasks**: 85
- **Phases**: 8 (Setup + Foundational + 5 User Stories + Polish)
- **MVP Tasks**: 48 (T001-T047, covering Setup + Foundational + US1 + US2)
- **Post-MVP Tasks**: 37 (T048-T084, covering US3 + US4 + US5 + Polish)
- **Parallel Opportunities**: 19 tasks marked with [P]
- **User Stories**: 5 (Blog generation, Case study generation, Refinement, Bilingual, Templates)
- **Estimated MVP Effort**: 2-3 days for experienced developer
- **Estimated Total Effort**: 4-5 days including all enhancements

**Next Step**: Begin implementation starting with Phase 1 (T001-T005) to set up project structure.
