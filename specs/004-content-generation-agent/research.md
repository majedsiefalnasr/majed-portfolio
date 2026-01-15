# Research: AI Content Generation Agent

**Phase**: 0 - Outline & Research  
**Date**: 2026-01-14  
**Status**: Complete

## Purpose

Resolve all technical unknowns and clarify implementation approach for the AI Content Generation Agent feature before proceeding to design phase.

## Research Tasks Completed

### 1. GitHub Copilot Chat Agent Architecture

**Question**: How do we create a custom agent that integrates with GitHub Copilot Chat in VS Code?

**Decision**: Use GitHub Copilot Agent API with custom participant

**Rationale**:

- GitHub Copilot supports custom chat participants via `.github/copilot/agents/` directory
- Agents can define conversation flows, ask questions, and execute file operations
- Seamless integration with existing Copilot Chat interface (no separate UI needed)
- Access to workspace context and file system through VS Code API

**Alternatives Considered**:

- VS Code extension with separate webview panel → Rejected: More complex UX, requires separate activation
- Command palette commands → Rejected: Not conversational, poor fit for Q&A workflow
- Standalone CLI tool → Rejected: Context switching outside VS Code

**Implementation Approach**:

- Create agent definition in `.github/copilot/agents/content-generator.md`
- Define conversation flow with question templates
- Use VS Code API for file operations (create, validate, preview)
- Leverage Copilot's underlying LLM for content generation

**References**:

- GitHub Copilot Chat Participants API documentation
- VS Code Extension API for file system operations
- Existing portfolio structure in `.github/copilot-instructions.md`

---

### 2. Metadata Schema Validation Strategy

**Question**: How do we ensure generated frontmatter exactly matches TypeScript schemas defined in `app/types/content.ts`?

**Decision**: Runtime validation using Zod schemas derived from TypeScript interfaces

**Rationale**:

- Zod provides runtime type checking and validation
- Can derive Zod schemas from existing TypeScript interfaces
- Provides detailed error messages for debugging
- Aligns with constitution principle V (Type Safety & Code Quality)
- Already used in similar Nuxt projects for content validation

**Alternatives Considered**:

- Manual validation with custom validators → Rejected: Error-prone, duplicates type definitions
- JSON Schema → Rejected: Requires maintaining separate schema files
- TypeScript decorators → Rejected: Limited runtime validation capabilities
- @vuelidate or similar → Rejected: Designed for form validation, not content generation

**Implementation Approach**:

```typescript
// app/utils/content-generator/schemas.ts
import {z} from 'zod'

export const BlogPostSchema = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  author: z.string().optional(),
  tags: z.array(z.string()).default([]),
  excerpt: z.string().optional(),
  lang: z.enum(['en', 'ar']).default('en'),
})

export const CaseStudySchema = z.object({
  title: z.string().min(1),
  client: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  role: z.string().min(1),
  timeline: z.string().min(1),
  tags: z.array(z.string()).min(1),
  excerpt: z.string().optional(),
  featuredImage: z.string().url().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  lang: z.enum(['en', 'ar']).default('en'),
})
```

**References**:

- Zod documentation: https://zod.dev
- Nuxt Content schema validation patterns
- Existing `app/types/content.ts` interfaces

---

### 3. Interactive Q&A Conversation Flow

**Question**: What's the optimal conversation structure for gathering metadata through questions?

**Decision**: Conditional branching Q&A with smart defaults and validation

**Rationale**:

- Users should first choose mode (full content vs metadata-only)
- Required fields must be asked; optional fields offered with defaults
- Context from previous answers can inform subsequent questions
- Validation happens inline with helpful error messages
- Users can revise answers before final generation

**Alternatives Considered**:

- Form-based input → Rejected: Not conversational, breaks chat flow
- All questions upfront → Rejected: Overwhelming, many fields are optional
- Free-form prompt parsing → Rejected: Error-prone, requires extensive NLP

**Implementation Approach**:

**Conversation Flow**:

```
1. Agent: "Would you like to generate a blog post or case study?"
2. User: "Blog post" | "Case study"

3. Agent: "Generate full content or metadata only?"
4. User: "Full content" | "Metadata only"

5. Agent: "What's the title?"
6. User: "Building Type-Safe APIs with TypeScript"

7. Agent: "What date? (default: today YYYY-MM-DD)"
8. User: [Enter] → uses default | "2026-01-15"

9. Agent: "Author name? (optional)"
10. User: "Majed Sief Alnasr" | [skip]

11. Agent: "Tags (comma-separated)?"
12. User: "typescript, api, backend"

13. Agent: "Brief excerpt (1-2 sentences)?"
14. User: "Discover best practices for creating robust APIs..."

15. Agent: "Language? (en/ar, default: en)"
16. User: [Enter] → uses default | "ar"

[If full content mode]
17. Agent: "Content length? (short/medium/long)"
18. User: "medium"

19. Agent: "Writing tone? (professional/conversational/technical)"
20. User: "technical"

[Preview & Confirmation]
21. Agent: Shows preview of generated content
22. User: "approve" | "regenerate" | "refine [section]"
```

**Smart Defaults**:

- Date: Current date in YYYY-MM-DD format
- Language: `en` (from constitution - English is primary)
- Author: Extracted from git config or portfolio settings
- Featured image: Placeholder path based on content type and year

**Validation Rules**:

- Title: Required, min 3 characters
- Date: Must match YYYY-MM-DD format
- Tags: At least 1 tag for case studies
- Timeline (case study only): Must include duration
- Client (case study only): Required

**References**:

- Conversational UI best practices
- GitHub Copilot Chat interaction patterns
- Existing content examples in `/content/blog/` and `/content/case-studies/`

---

### 4. File Naming and Directory Structure

**Question**: How should generated files be named and organized to avoid conflicts?

**Decision**: Slug-based naming with year-based directories and conflict detection

**Rationale**:

- Follows existing portfolio convention: `/content/blog/YYYY/slug.md`
- Slug generation from title ensures URL-friendly names
- Year subdirectories organize content chronologically
- Bilingual content uses `.ar.md` suffix
- Conflict detection prevents accidental overwrites

**Alternatives Considered**:

- UUID-based filenames → Rejected: Not human-readable, breaks URL structure
- Timestamp suffixes → Rejected: Ugly URLs, doesn't match existing content
- Flat directory structure → Rejected: Doesn't scale, breaks existing organization

**Implementation Approach**:

**Slug Generation**:

```typescript
// app/utils/content-generator/filename-sanitizer.ts
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60) // Limit length
}

// Examples:
// "Building Type-Safe APIs" → "building-type-safe-apis"
// "Next.js 15: What's New?" → "next-js-15-what-s-new"
```

**File Path Construction**:

```typescript
// Blog post
const year = new Date(metadata.date).getFullYear()
const slug = generateSlug(metadata.title)
const lang = metadata.lang || 'en'
const filename = lang === 'ar' ? `${slug}.ar.md` : `${slug}.md`
const path = `content/blog/${year}/${filename}`

// Case study
const year = new Date(metadata.date).getFullYear()
const slug = generateSlug(metadata.title)
const lang = metadata.lang || 'en'
const filename = lang === 'ar' ? `${slug}.ar.md` : `${slug}.md`
const path = `content/case-studies/${filename}`
```

**Conflict Resolution**:

1. Check if file exists before writing
2. If exists: Ask user to rename or append version number (`-v2`, `-v3`)
3. Show existing file preview for comparison
4. Allow user to overwrite with explicit confirmation

**References**:

- Existing content structure in `/content/`
- Nuxt Content routing conventions
- SEO best practices for URL slugs

---

### 5. Content Template Structure

**Question**: What templates should guide full content generation for each type?

**Decision**: Structured templates with required sections and markdown formatting

**Rationale**:

- Ensures consistency across all generated content
- Templates match existing content patterns in portfolio
- Sections guide AI to produce comprehensive content
- Markdown structure optimized for Nuxt Content rendering

**Templates**:

**Blog Post Template**:

```markdown
---
[YAML frontmatter]
---

## Introduction

[2-3 paragraphs introducing the topic, stating the problem, and preview of solutions]

## [Main Topic 1]

[Content with subsections as needed]

### [Subtopic]

[Examples, code blocks, explanations]

## [Main Topic 2]

[Continue pattern]

## Conclusion

[Summary of key points, actionable takeaways, call-to-action]
```

**Case Study Template**:

```markdown
---
[YAML frontmatter with metrics, testimonial]
---

## Problem

[2-3 paragraphs describing the client's challenge, business context, and why it mattered]

### Challenges

- [Specific challenge 1]
- [Specific challenge 2]
- [Specific challenge 3]

## Solution

[Detailed approach taken, technologies used, methodology]

### Technical Approach

[Architecture decisions, implementation details]

### Key Features

- [Feature 1 with description]
- [Feature 2 with description]

## Results

[Quantifiable outcomes, business impact, metrics achieved]

### Impact

[Charts, comparisons, before/after analysis]

## Technologies Used

[List of technologies with brief explanation of why each was chosen]

## Lessons Learned

[Reflections, what worked well, what would be done differently]
```

**Alternatives Considered**:

- Freeform generation → Rejected: Inconsistent structure, harder to maintain quality
- Single generic template → Rejected: Blog posts and case studies have different needs
- User-defined templates → Deferred to P3 priority (FR-005 in spec)

**References**:

- Existing content in `/content/blog/2026/typescript-apis.md`
- Existing content in `/content/case-studies/ai-dashboard.md`
- Content marketing best practices
- Portfolio showcase patterns

---

### 6. Error Handling and Recovery

**Question**: How should the agent handle errors during generation or file operations?

**Decision**: Graceful degradation with informative errors and context preservation

**Rationale**:

- Errors should never lose user's input or conversation context
- Specific error messages help users understand and fix issues
- Retry capability without re-answering all questions
- Aligns with FR-021 (informative error handling)

**Error Scenarios & Handling**:

| Scenario                          | Detection                 | Recovery                                                          |
| --------------------------------- | ------------------------- | ----------------------------------------------------------------- |
| **Invalid frontmatter**           | Zod validation fails      | Show validation errors, ask to correct specific fields            |
| **File write permission denied**  | File system error         | Show error, suggest checking permissions, retry with confirmation |
| **Filename conflict**             | File exists check         | Offer rename, append version, or overwrite with warning           |
| **Network failure (Copilot API)** | Request timeout           | Preserve context, suggest retry, show cached partial content      |
| **Malformed AI response**         | Content parsing fails     | Log for debugging, retry generation with same prompt              |
| **Missing required fields**       | Pre-generation validation | Highlight missing fields, resume Q&A at that question             |

**Implementation Approach**:

```typescript
// app/utils/content-generator/error-handler.ts
export class ContentGenerationError extends Error {
  constructor(
    message: string,
    public code: string,
    public context: Record<string, any>
  ) {
    super(message)
  }
}

export function handleGenerationError(error: unknown, context: any) {
  if (error instanceof ContentGenerationError) {
    // Show user-friendly message
    return {
      success: false,
      message: error.message,
      retryable: true,
      preservedContext: context,
    }
  }
  // Log unexpected errors
  console.error('Unexpected generation error:', error)
  return {
    success: false,
    message: 'An unexpected error occurred. Please try again.',
    retryable: true,
    preservedContext: context,
  }
}
```

**References**:

- VS Code error handling patterns
- User experience best practices for error recovery
- GitHub Copilot Chat error messaging conventions

---

## Summary of Decisions

| Research Area         | Decision                                       | Rationale                                                  |
| --------------------- | ---------------------------------------------- | ---------------------------------------------------------- |
| **Architecture**      | GitHub Copilot Chat Agent                      | Seamless VS Code integration, conversational UX            |
| **Validation**        | Zod runtime schemas                            | Type-safe, detailed errors, aligns with TypeScript types   |
| **Conversation Flow** | Conditional branching Q&A                      | Optimal UX, smart defaults, inline validation              |
| **File Naming**       | Slug-based with year directories               | Matches existing structure, SEO-friendly, avoids conflicts |
| **Templates**         | Structured markdown per content type           | Consistency, quality, matches portfolio patterns           |
| **Error Handling**    | Graceful degradation with context preservation | User-friendly, retryable, no data loss                     |

## Deferred Items

None - all research tasks completed successfully.

## Next Phase

Proceed to **Phase 1: Design & Contracts** to create:

- Data model definitions (`data-model.md`)
- API contracts (`contracts/`)
- Developer quickstart guide (`quickstart.md`)
