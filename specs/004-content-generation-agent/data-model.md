# Data Model: AI Content Generation Agent

**Phase**: 1 - Design & Contracts  
**Date**: 2026-01-14  
**Status**: Complete

## Purpose

Define all entities, their attributes, relationships, and state transitions for the AI Content Generation Agent feature.

## Core Entities

### 1. GenerationSession

Represents a single content generation conversation between user and agent.

**Attributes**:

- `sessionId`: string (UUID) - Unique identifier for this generation session
- `contentType`: 'blog' | 'case-study' - Type of content being generated
- `mode`: 'full' | 'metadata-only' - Generation mode selected by user
- `state`: SessionState (see State Machine below)
- `metadata`: Partial<BlogPostMetadata | CaseStudyMetadata> - Collected metadata
- `generatedContent`: string | null - Generated markdown content (if mode === 'full')
- `filePath`: string | null - Target file path once determined
- `createdAt`: Date
- `updatedAt`: Date

**Relationships**:

- Has many: QuestionResponse (1-to-many)
- Has one: ValidationResult (1-to-1, nullable)

**State Transitions**:

```
INITIALIZED → SELECTING_TYPE → SELECTING_MODE → GATHERING_METADATA →
VALIDATING → GENERATING → PREVIEWING → CONFIRMED | REJECTED
```

---

### 2. QuestionResponse

Captures a single question-answer exchange during metadata gathering.

**Attributes**:

- `questionId`: string - Identifier for the question (e.g., 'title', 'date', 'tags')
- `question`: string - The question text displayed to user
- `answer`: string | string[] | boolean | number - User's response
- `fieldName`: string - Corresponding frontmatter field name
- `required`: boolean - Whether this field is mandatory
- `defaultValue`: any | null - Default value if user skips
- `timestamp`: Date

**Relationships**:

- Belongs to: GenerationSession (many-to-1)

**Validation Rules**:

- Must have non-empty answer for required questions
- Answer type must match expected field type

---

### 3. BlogPostMetadata

Metadata structure for blog post content matching TypeScript schema.

**Attributes (Required)**:

- `title`: string (min 3 chars, max 100 chars)
- `date`: string (YYYY-MM-DD format)
- `tags`: string[] (min 1 tag)
- `excerpt`: string (1-2 sentences, ~150-200 chars)

**Attributes (Optional)**:

- `author`: string (default: from git config or 'Majed Sief Alnasr')
- `lang`: 'en' | 'ar' (default: 'en')
- `featuredImage`: string (URL or path)

**Derived Attributes** (computed at runtime, not in frontmatter YAML):

- `_path`: Computed from slug and date
- `_id`: Computed hash
- `readTime`: Calculated from content length using word count / 200 WPM formula
- `slug`: Generated from title
- `year`: Extracted from date

**Validation**:

- Title: Required, 3-100 characters
- Date: Required, must match /^\d{4}-\d{2}-\d{2}$/, must be valid date
- Tags: Required, min 1 tag, each tag 2-30 chars
- Excerpt: Recommended, max 200 chars
- Lang: Must be 'en' or 'ar'

---

### 4. CaseStudyMetadata

Metadata structure for case study content matching TypeScript schema.

**Attributes (Required)**:

- `title`: string (min 3 chars, max 100 chars)
- `client`: string (min 2 chars)
- `date`: string (YYYY-MM-DD format)
- `role`: string (e.g., 'Full Stack Developer')
- `timeline`: string (e.g., '4 months (Sep 2025 - Dec 2025)')
- `tags`: string[] (min 1 tag, technologies used)
- `featuredImage`: string (path to image)

**Attributes (Optional)**:

- `excerpt`: string (~150-200 chars)
- `testimonial`: Testimonial object
- `metrics`: Metric[] (array of metric objects)
- `featured`: boolean (default: false)
- `order`: number (for featured sorting, default: 999)
- `lang`: 'en' | 'ar' (default: 'en')

**Nested Objects**:

**Testimonial**:

- `quote`: string (client feedback)
- `author`: string (person's name)
- `position`: string (person's title)

**Metric**:

- `label`: string (e.g., 'Events Processed')
- `value`: string (e.g., '1M+/day')

**Derived Attributes**:

- `_path`: Computed from slug
- `_id`: Computed hash
- `readTime`: Calculated from content length
- `slug`: Generated from title
- `year`: Extracted from date

**Validation**:

- Title: Required, 3-100 characters
- Client: Required, 2-50 characters
- Date: Required, must match /^\d{4}-\d{2}-\d{2}$/, must be valid date
- Role: Required, 2-50 characters
- Timeline: Required, min 5 characters
- Tags: Required, min 1 tag (typically technologies)
- Featured image: Required, must be valid path
- Metrics: If provided, each must have label and value
- Testimonial: If provided, all fields required

---

### 5. ValidationResult

Result of validating collected metadata against schema.

**Attributes**:

- `isValid`: boolean - Overall validation status
- `errors`: ValidationError[] - Array of validation errors
- `warnings`: ValidationWarning[] - Array of non-blocking warnings
- `metadata`: BlogPostMetadata | CaseStudyMetadata - Validated metadata
- `timestamp`: Date

**ValidationError**:

- `field`: string - Field name with error
- `message`: string - Human-readable error message
- `code`: string - Error code for programmatic handling
- `severity`: 'error' (blocks generation)

**ValidationWarning**:

- `field`: string - Field name with warning
- `message`: string - Human-readable warning message
- `code`: string - Warning code
- `severity`: 'warning' (allows generation)

**Examples**:

```typescript
// Error example
{
  field: 'date',
  message: 'Date must be in YYYY-MM-DD format',
  code: 'INVALID_DATE_FORMAT',
  severity: 'error'
}

// Warning example
{
  field: 'excerpt',
  message: 'Excerpt is missing - SEO impact may be reduced',
  code: 'MISSING_EXCERPT',
  severity: 'warning'
}
```

---

### 6. GeneratedContent

The final generated content ready for file creation.

**Attributes**:

- `frontmatter`: string (YAML frontmatter block)
- `body`: string (Markdown content body, empty if metadata-only mode)
- `fullContent`: string (Complete file content: frontmatter + body)
- `metadata`: BlogPostMetadata | CaseStudyMetadata
- `contentType`: 'blog' | 'case-study'
- `filePath`: string (Target file path)
- `fileName`: string (Just the filename)
- `estimatedReadTime`: number | null (minutes, calculated for full content)

**Derived Data**:

- `fileExists`: boolean - Whether file already exists at target path
- `conflictStrategy`: 'rename' | 'overwrite' | 'cancel' - How to handle conflicts
- `wordCount`: number - Total word count
- `characterCount`: number - Total character count

---

## State Machine: Generation Session

### States

| State                  | Description                     | Valid Transitions                                   |
| ---------------------- | ------------------------------- | --------------------------------------------------- |
| **INITIALIZED**        | Session created, no action yet  | → SELECTING_TYPE                                    |
| **SELECTING_TYPE**     | Asking user for content type    | → SELECTING_MODE                                    |
| **SELECTING_MODE**     | Asking user for generation mode | → GATHERING_METADATA                                |
| **GATHERING_METADATA** | Collecting metadata via Q&A     | → VALIDATING, → GATHERING_METADATA                  |
| **VALIDATING**         | Validating collected metadata   | → GATHERING_METADATA (errors), → GENERATING (valid) |
| **GENERATING**         | AI generating content           | → PREVIEWING, → ERROR                               |
| **PREVIEWING**         | Showing content to user         | → CONFIRMED, → GENERATING (refine)                  |
| **CONFIRMED**          | User approved, ready to save    | → WRITING                                           |
| **WRITING**            | Writing file to disk            | → COMPLETED, → ERROR                                |
| **COMPLETED**          | File successfully created       | (terminal state)                                    |
| **REJECTED**           | User rejected content           | → GATHERING_METADATA (restart)                      |
| **ERROR**              | Error occurred                  | → GATHERING_METADATA (retry)                        |

### State Transitions

```typescript
type SessionState =
  | 'INITIALIZED'
  | 'SELECTING_TYPE'
  | 'SELECTING_MODE'
  | 'GATHERING_METADATA'
  | 'VALIDATING'
  | 'GENERATING'
  | 'PREVIEWING'
  | 'CONFIRMED'
  | 'WRITING'
  | 'COMPLETED'
  | 'REJECTED'
  | 'ERROR'

interface StateTransition {
  from: SessionState
  to: SessionState
  trigger: string
  guard?: () => boolean
}

const transitions: StateTransition[] = [
  {from: 'INITIALIZED', to: 'SELECTING_TYPE', trigger: 'START'},
  {from: 'SELECTING_TYPE', to: 'SELECTING_MODE', trigger: 'TYPE_SELECTED'},
  {from: 'SELECTING_MODE', to: 'GATHERING_METADATA', trigger: 'MODE_SELECTED'},
  {from: 'GATHERING_METADATA', to: 'VALIDATING', trigger: 'METADATA_COMPLETE'},
  {from: 'VALIDATING', to: 'GENERATING', trigger: 'VALID', guard: () => validationResult.isValid},
  {from: 'VALIDATING', to: 'GATHERING_METADATA', trigger: 'INVALID'},
  {from: 'GENERATING', to: 'PREVIEWING', trigger: 'GENERATED'},
  {from: 'GENERATING', to: 'ERROR', trigger: 'GENERATION_FAILED'},
  {from: 'PREVIEWING', to: 'CONFIRMED', trigger: 'APPROVED'},
  {from: 'PREVIEWING', to: 'GENERATING', trigger: 'REFINE'},
  {from: 'PREVIEWING', to: 'REJECTED', trigger: 'REJECTED'},
  {from: 'CONFIRMED', to: 'WRITING', trigger: 'WRITE'},
  {from: 'WRITING', to: 'COMPLETED', trigger: 'SUCCESS'},
  {from: 'WRITING', to: 'ERROR', trigger: 'WRITE_FAILED'},
  {from: 'ERROR', to: 'GATHERING_METADATA', trigger: 'RETRY'},
]
```

---

## Data Flow

### 1. Metadata Collection Flow

```
User Input (via Chat)
    ↓
QuestionResponse (captured)
    ↓
GenerationSession.metadata (accumulated)
    ↓
ValidationResult (schema check)
    ↓
BlogPostMetadata | CaseStudyMetadata (typed & validated)
```

### 2. Content Generation Flow

```
Validated Metadata
    ↓
Content Generation Prompt (to Copilot API)
    ↓
Raw Generated Content (markdown)
    ↓
Template Renderer (structure + formatting)
    ↓
GeneratedContent (frontmatter + body)
    ↓
Preview (show to user)
    ↓
File Write (on confirmation)
```

### 3. File Path Resolution

```
Metadata.title
    ↓
Slug Generator ("building-type-safe-apis")
    ↓
Date Parser (year extraction)
    ↓
Path Constructor:
  - Blog: content/blog/{year}/{slug}.md
  - Case Study: content/case-studies/{slug}.md
    ↓
Conflict Check (file exists?)
    ↓
Final File Path
```

---

## Entity Relationships Diagram

```
┌─────────────────────┐
│ GenerationSession   │
├─────────────────────┤
│ + sessionId         │
│ + contentType       │
│ + mode              │
│ + state             │◄────┐
│ + metadata          │     │
│ + generatedContent  │     │
└────────┬────────────┘     │
         │                  │
         │ 1:N              │
         ▼                  │
┌─────────────────────┐     │
│ QuestionResponse    │     │
├─────────────────────┤     │
│ + questionId        │     │
│ + question          │     │
│ + answer            │     │
│ + fieldName         │     │
└─────────────────────┘     │
                            │
         ┌──────────────────┘
         │ 1:1
         ▼
┌─────────────────────┐
│ ValidationResult    │
├─────────────────────┤
│ + isValid           │
│ + errors[]          │
│ + warnings[]        │
│ + metadata          │──┬──►BlogPostMetadata
└─────────────────────┘  │
                         │
                         └──►CaseStudyMetadata
                                ├─► Testimonial
                                └─► Metric[]

┌─────────────────────┐
│ GeneratedContent    │
├─────────────────────┤
│ + frontmatter       │
│ + body              │
│ + fullContent       │
│ + metadata          │
│ + filePath          │
└─────────────────────┘
```

---

## Persistence Strategy

**Note**: This feature does NOT require database persistence. All state is ephemeral within the chat session.

**In-Memory Only**:

- `GenerationSession`: Lives during chat conversation only
- `QuestionResponse[]`: Accumulated in session state
- `ValidationResult`: Computed on-demand, not persisted

**File System (Final Output)**:

- `GeneratedContent` → Written to markdown file in `/content/` directory
- File is the source of truth post-generation

**No Backend Required**:

- All logic runs client-side in VS Code
- GitHub Copilot provides AI capabilities
- File operations use VS Code File System API

---

## Type Definitions Reference

All entities align with existing TypeScript definitions:

**Source**: `app/types/content.ts`

```typescript
import type {BlogPost, CaseStudy, Testimonial, Metric} from '~/app/types/content'

// Metadata types are subsets of full content types
type BlogPostMetadata = Pick<BlogPost, 'title' | 'date' | 'author' | 'tags' | 'excerpt' | 'lang'>
type CaseStudyMetadata = Pick<
  CaseStudy,
  | 'title'
  | 'client'
  | 'date'
  | 'role'
  | 'timeline'
  | 'tags'
  | 'excerpt'
  | 'featuredImage'
  | 'featured'
  | 'order'
  | 'lang'
  | 'testimonial'
  | 'metrics'
>
```

---

## Next Steps

With data model defined, proceed to create:

1. **contracts/**: API contracts and schemas
2. **quickstart.md**: Developer guide for working with these entities
3. **Update agent context**: Run `.specify/scripts/bash/update-agent-context.sh copilot`
