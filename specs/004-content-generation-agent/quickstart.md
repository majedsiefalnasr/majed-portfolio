# Developer Quickstart: AI Content Generation Agent

**Purpose**: Get developers up to speed on implementing and extending the content generation agent.

## Overview

This feature adds an AI-powered content generation agent to the Majed Portfolio, integrated with GitHub Copilot Chat. Users can create blog posts and case studies through natural conversation.

**Key Components**:

- GitHub Copilot Chat Agent (conversational interface)
- Validation schemas (Zod for runtime type checking)
- Utility functions (content generation, file operations)
- Content templates (markdown structure)

---

## Prerequisites

### Required Knowledge

- TypeScript (strict mode)
- Nuxt 4 & Nuxt Content v3
- GitHub Copilot Chat API
- Zod validation library
- VS Code Extension API (for file operations)

### Required Tools

- VS Code with GitHub Copilot subscription
- Bun (portfolio runtime)
- Git (for config extraction)

---

## Project Structure

```
.github/copilot/agents/
└── content-generator.agent.md     # Agent definition & prompts

app/
├── types/
│   └── content.ts                 # Existing: BlogPost & CaseStudy interfaces
└── utils/content-generator/
    ├── schema-validator.ts        # Zod schemas & validation logic
    ├── frontmatter-builder.ts     # YAML frontmatter generation
    ├── filename-sanitizer.ts      # Slug generation & path resolution
    ├── template-renderer.ts       # Content template rendering
    └── index.ts                   # Public API exports

tests/content-generator/
├── schema-validation.test.ts
├── frontmatter.test.ts
├── filename-sanitizer.test.ts
└── template-renderer.test.ts

specs/004-content-generation-agent/
├── spec.md                        # Feature specification
├── plan.md                        # This implementation plan
├── research.md                    # Technical research
├── data-model.md                  # Entity definitions
└── contracts/                     # API contracts
    ├── agent-prompts.md
    ├── content-schemas.ts
    └── workflow.md
```

---

## Quick Start

### 1. Install Dependencies

```bash
# From portfolio root
bun add zod
bun add -d @types/node
```

### 2. Copy Schema File

```bash
# Copy the contract schema to app utilities
cp specs/004-content-generation-agent/contracts/content-schemas.ts \
   app/utils/content-generator/schemas.ts
```

### 3. Create Utility Functions

Create `app/utils/content-generator/index.ts`:

```typescript
export * from './schemas'
export * from './frontmatter-builder'
export * from './filename-sanitizer'
export * from './template-renderer'
```

### 4. Create Agent Definition

Create `.github/copilot/agents/content-generator.agent.md` with agent prompts from contracts.

### 5. Run Tests

```bash
bun test tests/content-generator
```

---

## Core APIs

### 1. Schema Validation

```typescript
import {validateBlogPostMetadata, validateCaseStudyMetadata} from '~/app/utils/content-generator'

// Validate blog post metadata
const result = validateBlogPostMetadata({
  title: 'Building Type-Safe APIs',
  date: '2026-01-14',
  tags: ['typescript', 'api'],
  excerpt: 'Learn best practices...',
  lang: 'en',
})

if (!result.isValid) {
  console.error('Validation errors:', result.errors)
  // Handle errors
} else {
  console.log('Valid metadata:', result.metadata)
  console.warn('Warnings:', result.warnings) // Non-blocking
}
```

### 2. Frontmatter Generation

```typescript
import {buildFrontmatter} from '~/app/utils/content-generator'

const frontmatter = buildFrontmatter({
  title: 'Building Type-Safe APIs',
  date: '2026-01-14',
  author: 'Majed Sief Alnasr',
  tags: ['typescript', 'api', 'backend'],
  excerpt: 'Discover best practices...',
  lang: 'en',
})

console.log(frontmatter)
// Output:
// ---
// title: 'Building Type-Safe APIs'
// date: 2026-01-14
// author: 'Majed Sief Alnasr'
// tags: ['typescript', 'api', 'backend']
// excerpt: 'Discover best practices...'
// lang: 'en'
// ---
```

### 3. Filename Generation

```typescript
import {generateSlug, resolveFilePath} from '~/app/utils/content-generator'

const slug = generateSlug('Building Type-Safe APIs with TypeScript')
// Output: "building-type-safe-apis-with-typescript"

const filePath = resolveFilePath({
  contentType: 'blog',
  slug: 'building-type-safe-apis',
  date: '2026-01-14',
  lang: 'en',
})
// Output: "content/blog/2026/building-type-safe-apis.md"

const filePathAr = resolveFilePath({
  contentType: 'blog',
  slug: 'building-type-safe-apis',
  date: '2026-01-14',
  lang: 'ar',
})
// Output: "content/blog/2026/building-type-safe-apis.ar.md"
```

### 4. Content Template Rendering

```typescript
import {renderBlogPost, renderCaseStudy} from '~/app/utils/content-generator'

const blogContent = renderBlogPost({
  metadata: validatedMetadata,
  mode: 'full',
  length: 'medium',
  tone: 'technical',
  generatedSections: {
    introduction: '...',
    mainContent: '...',
    conclusion: '...',
  },
})

console.log(blogContent)
// Output: Complete markdown with frontmatter + structured content
```

---

## Implementation Guidelines

### TypeScript Strict Mode

All code MUST pass TypeScript strict checks:

```typescript
// ✅ Good: Explicit types
export function validateMetadata(data: unknown): ValidationResult {
  // Implementation
}

// ❌ Bad: Implicit any
export function validateMetadata(data) {
  // TypeScript error in strict mode
}
```

### Error Handling

Use custom error classes for domain errors:

```typescript
export class ContentGenerationError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'ContentGenerationError'
  }
}

// Usage
throw new ContentGenerationError('Invalid frontmatter', 'VALIDATION_FAILED', {field: 'date'})
```

### File Operations

Use VS Code File System API (not Node.js fs):

```typescript
import * as vscode from 'vscode'

export async function writeContentFile(path: string, content: string): Promise<void> {
  const uri = vscode.Uri.file(path)
  const encoder = new TextEncoder()
  const contentBuffer = encoder.encode(content)

  try {
    await vscode.workspace.fs.writeFile(uri, contentBuffer)
  } catch (error) {
    throw new ContentGenerationError('Failed to write file', 'FILE_WRITE_ERROR', {
      path,
      error,
    })
  }
}
```

---

## Testing Strategy

### Unit Tests

Test each utility function in isolation:

```typescript
// tests/content-generator/schema-validation.test.ts
import {describe, it, expect} from 'vitest'
import {validateBlogPostMetadata} from '~/app/utils/content-generator'

describe('validateBlogPostMetadata', () => {
  it('should validate correct metadata', () => {
    const result = validateBlogPostMetadata({
      title: 'Test Post',
      date: '2026-01-14',
      tags: ['test'],
      excerpt: 'Test excerpt for the post',
      lang: 'en',
    })

    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('should reject invalid date format', () => {
    const result = validateBlogPostMetadata({
      title: 'Test Post',
      date: '14-01-2026', // Wrong format
      tags: ['test'],
      lang: 'en',
    })

    expect(result.isValid).toBe(false)
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'date',
        code: expect.any(String),
      })
    )
  })
})
```

### Integration Tests

Test complete workflows:

```typescript
// tests/content-generator/integration/full-generation.test.ts
import {describe, it, expect} from 'vitest'

describe('Full Content Generation', () => {
  it('should generate complete blog post', async () => {
    // 1. Collect metadata
    const metadata = {
      /* ... */
    }

    // 2. Validate
    const validation = validateBlogPostMetadata(metadata)
    expect(validation.isValid).toBe(true)

    // 3. Generate content
    const content = renderBlogPost({
      /* ... */
    })

    // 4. Verify structure
    expect(content).toContain('---') // Has frontmatter
    expect(content).toContain('## Introduction')
    expect(content).toContain('## Conclusion')
  })
})
```

---

## Debugging Tips

### Enable Debug Logging

```typescript
const DEBUG = process.env.DEBUG_CONTENT_GEN === 'true'

function debugLog(message: string, data?: unknown) {
  if (DEBUG) {
    console.log(`[ContentGen] ${message}`, data)
  }
}

// Usage
debugLog('Validating metadata', metadata)
```

### Inspect Generated Content

```typescript
// Before writing file, log the content
console.log('=== GENERATED CONTENT ===')
console.log(content)
console.log('=== END ===')
```

### Test Validation Rules

```typescript
// Use Zod's `.safeParse()` for detailed error info
const result = BlogPostMetadataSchema.safeParse(data)
if (!result.success) {
  console.error('Zod errors:', result.error.errors)
}
```

---

## Extending the Agent

### Adding New Content Types

1. Define TypeScript interface in `app/types/content.ts`
2. Create Zod schema in `app/utils/content-generator/schemas.ts`
3. Add template in `template-renderer.ts`
4. Update agent prompts in `.github/copilot/agents/content-generator.md`
5. Add tests

### Adding New Frontmatter Fields

1. Update TypeScript interface
2. Update Zod schema with validation rules
3. Add question in agent prompts
4. Update frontmatter builder
5. Add tests

### Customizing Content Templates

Edit `template-renderer.ts`:

```typescript
export function renderBlogPost(options: RenderOptions): string {
  const {metadata, sections} = options

  return `---
${buildFrontmatter(metadata)}
---

## Introduction

${sections.introduction}

## Main Content

${sections.mainContent}

## Conclusion

${sections.conclusion}
`
}
```

---

## Common Issues

### Issue: Validation Failing on Valid Data

**Cause**: Schema mismatch with TypeScript interface

**Solution**: Ensure Zod schema exactly matches TypeScript interface. Use `z.infer<>` to verify:

```typescript
import type {BlogPost} from '~/app/types/content'

type SchemaType = z.infer<typeof BlogPostMetadataSchema>

// These should be compatible
const test: SchemaType = {} as Pick<BlogPost, 'title' | 'date' | 'tags'>
```

### Issue: File Paths Not Resolving

**Cause**: Incorrect path separator or relative paths

**Solution**: Always use absolute paths from workspace root:

```typescript
import * as vscode from 'vscode'

const workspaceRoot = vscode.workspace.workspaceFolders?.[0].uri.fsPath
const absolutePath = `${workspaceRoot}/content/blog/2026/post.md`
```

### Issue: Frontmatter Not Parsing

**Cause**: Invalid YAML syntax

**Solution**: Use proper YAML formatting (quotes for strings, arrays, etc.):

```typescript
// ✅ Good
tags: ['typescript', 'api']

// ❌ Bad (missing quotes)
tags: [typescript, api]
```

---

## Performance Considerations

### Lazy Loading

Load utilities only when needed:

```typescript
// Agent definition
async function generateContent() {
  const {renderBlogPost} = await import('~/app/utils/content-generator')
  // Use renderBlogPost
}
```

### Caching

Cache generated slugs and paths:

```typescript
const slugCache = new Map<string, string>()

export function generateSlug(title: string): string {
  if (slugCache.has(title)) {
    return slugCache.get(title)!
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  slugCache.set(title, slug)
  return slug
}
```

---

## Resources

- **Zod Documentation**: https://zod.dev
- **GitHub Copilot Agent API**: https://docs.github.com/copilot
- **VS Code Extension API**: https://code.visualstudio.com/api
- **Nuxt Content**: https://content.nuxt.com

---

## Next Steps

1. Review [spec.md](./spec.md) for complete requirements
2. Read [data-model.md](./data-model.md) for entity definitions
3. Study [contracts/](./contracts/) for detailed contracts
4. Implement utilities in `app/utils/content-generator/`
5. Create agent in `.github/copilot/agents/content-generator.agent.md`
6. Write tests in `tests/content-generator/`
7. Run `/speckit.tasks` to generate implementation tasks
