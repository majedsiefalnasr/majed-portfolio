# Data Model: Content Engine

**Date**: January 13, 2026  
**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md)

## Overview

This document defines the data structures for blog posts and case studies, including frontmatter schemas, content metadata, and entity relationships. All entities are file-based (Markdown with YAML frontmatter) and indexed by Nuxt Content at build time.

---

## Entity Definitions

### BlogPost

**Purpose**: Represents a single blog post article with metadata and markdown content.

**File Location**: `/content/blog/YYYY/post-slug.md`  
**Draft Convention**: `/content/blog/YYYY/_draft-post-slug.md` (underscore prefix)

**Frontmatter Schema**:

```yaml
---
title: string                    # REQUIRED - Post title (used in <h1>, meta tags, list views)
date: ISO8601                    # REQUIRED - Publication date (YYYY-MM-DD)
author: string                   # OPTIONAL - Author name (default: "Majed Sief Alnasr")
tags: string[]                   # OPTIONAL - Topic tags for filtering (e.g., ["typescript", "nuxt", "web-dev"])
excerpt: string                  # OPTIONAL - Custom excerpt for list preview (fallback: auto-generated from first ~150 chars)
featuredImage: string            # OPTIONAL - Path to featured image (e.g., "/images/blog/2026/post-hero.jpg")
updatedAt: ISO8601               # OPTIONAL - Last modified date for JSON-LD schema
lang: 'en' | 'ar'                # OPTIONAL - Content language (default: 'en', used for i18n routing)
draft: boolean                   # DEPRECATED - Use underscore filename prefix instead
---
```

**Content Body**:

- Standard markdown with MDC component syntax support
- Headings (H2-H6) for content structure (H1 auto-generated from title)
- Code blocks with language specification for syntax highlighting
- Images via `::ContentImage` MDC component or standard markdown syntax
- Embedded components using `::ComponentName` syntax

**Computed Properties** (generated at query time):

| Property   | Type   | Description                                                    |
| ---------- | ------ | -------------------------------------------------------------- |
| `_path`    | string | Nuxt Content path (e.g., `/blog/2026/post-slug`)               |
| `_id`      | string | Unique content ID                                              |
| `readTime` | number | Estimated reading time in minutes (calculated from word count) |
| `slug`     | string | URL slug extracted from filename                               |
| `year`     | number | Year extracted from directory structure                        |

**Validation Rules**:

- `title` - Required, 5-100 characters, plain text (no markdown)
- `date` - Required, must be valid ISO8601 date, cannot be future date (if missing, Nuxt Content provides `_file.createdAt` as automatic fallback)
- `tags` - Optional, 1-10 tags, each 2-20 characters, lowercase-kebab-case
- `excerpt` - Optional, if provided 50-200 characters
- `featuredImage` - Optional, if provided must be valid path in `/public/images/`

**Example**:

````yaml
---
title: "Building a Content Engine with Nuxt Content"
date: 2026-01-13
author: "Majed Sief Alnasr"
tags: ["nuxt", "typescript", "content-management"]
excerpt: "Learn how to build a high-performance blog with Nuxt Content v3 and MDC components for rich, interactive articles."
featuredImage: "/images/blog/2026/nuxt-content-hero.jpg"
updatedAt: 2026-01-13
lang: "en"
---

## Introduction

This post explores...

::ContentImage{src="/images/blog/2026/example.jpg" alt="Example diagram"}
::

## Implementation Details

```typescript
// Example code with syntax highlighting
const posts = await queryContent('/blog').find()
````

````

---

### CaseStudy

**Purpose**: Represents a portfolio project showcase with structured sections, metrics, and visual assets.

**File Location**: `/content/case-studies/YYYY/project-slug.md`
**Draft Convention**: `/content/case-studies/YYYY/_draft-project-slug.md`

**Frontmatter Schema**:

```yaml
---
title: string                    # REQUIRED - Project name
client: string                   # REQUIRED - Client/company name or "Personal Project"
date: ISO8601                    # REQUIRED - Project completion/publication date
role: string                     # REQUIRED - Your role (e.g., "Lead Developer", "Full-Stack Engineer")
timeline: string                 # REQUIRED - Duration (e.g., "3 months", "Jan 2025 - Mar 2025")
tags: string[]                   # REQUIRED - Technologies/skills (e.g., ["vue", "typescript", "aws"])
excerpt: string                  # OPTIONAL - Brief summary for list preview (fallback: auto-generated)
featuredImage: string            # REQUIRED - Main project preview image
testimonial: object              # OPTIONAL - Client testimonial
  quote: string                  # Testimonial text
  author: string                 # Who said it
  position: string               # Their title/role
metrics: object[]                # OPTIONAL - Key results/outcomes
  - label: string                # Metric name (e.g., "Performance Improvement")
    value: string                # Metric value (e.g., "40% faster")
featured: boolean                # OPTIONAL - Show in featured section (default: false)
order: number                    # OPTIONAL - Custom sort order (lower = higher priority)
lang: 'en' | 'ar'                # OPTIONAL - Content language (default: 'en')
---
````

**Content Body Structure** (recommended sections):

```markdown
## Problem

[What challenge was the project addressing?]

## Solution

[How did you solve it? Technical approach, architecture decisions]

## Implementation

[Key technical details, interesting challenges overcome]

::CodeComparison
#before
[Previous approach]
#after
[Improved approach]
::

## Results

[Outcomes, metrics, impact]

::CaseStudyMetrics
[Display metrics from frontmatter]
::

## Gallery

::ImageGallery{:images="[...]"}
::
```

**Computed Properties**:

| Property   | Type   | Description                                            |
| ---------- | ------ | ------------------------------------------------------ |
| `_path`    | string | Content path (e.g., `/case-studies/2026/project-slug`) |
| `slug`     | string | URL slug                                               |
| `year`     | number | Year from directory                                    |
| `readTime` | number | Estimated reading time                                 |

**Validation Rules**:

- `title` - Required, 5-80 characters
- `client` - Required, 2-50 characters
- `date` - Required, valid ISO8601
- `role` - Required, 3-50 characters
- `timeline` - Required, 3-50 characters
- `tags` - Required, 2-15 tags
- `featuredImage` - Required, valid path
- `metrics` - Optional, 1-6 metrics if provided
- `order` - Optional, positive integer for manual ordering

**Example**:

```yaml
---
title: 'E-Commerce Platform Redesign'
client: 'TechCorp Inc.'
date: 2025-12-15
role: 'Lead Frontend Developer'
timeline: '6 months (Jul 2025 - Dec 2025)'
tags: ['vue', 'nuxt', 'tailwind', 'stripe', 'vercel']
excerpt: 'Complete redesign of enterprise e-commerce platform, achieving 40% performance improvement and 25% conversion increase.'
featuredImage: '/images/case-studies/2025/techcorp-hero.jpg'
testimonial:
  quote: 'The new platform exceeded our expectations. Performance and conversion rates improved significantly.'
  author: 'Jane Smith'
  position: 'CTO, TechCorp Inc.'
metrics:
  - label: 'Performance Improvement'
    value: '40% faster'
  - label: 'Conversion Rate'
    value: '+25%'
  - label: 'Lighthouse Score'
    value: '98/100'
featured: true
order: 1
lang: 'en'
---
## Problem

TechCorp's legacy e-commerce platform...
```

---

## Supporting Types

### ContentMetadata

**Purpose**: Common metadata properties shared across content types

```typescript
interface ContentMetadata {
  title: string
  date: string // ISO8601
  author?: string
  tags?: string[]
  excerpt?: string
  featuredImage?: string
  updatedAt?: string
  lang?: 'en' | 'ar'
  _path: string
  _id: string
}
```

### TagFilter

**Purpose**: Tag filtering state and operations

```typescript
interface TagFilter {
  selectedTag: string | null
  availableTags: string[]
  filteredCount: number
}
```

### ContentQueryOptions

**Purpose**: Type-safe query configuration

```typescript
interface ContentQueryOptions {
  path?: string // Content directory path
  where?: Record<string, any> // Query filters
  sort?: Record<string, 1 | -1> // Sort configuration
  limit?: number // Result limit
  skip?: number // Pagination offset
}
```

---

## Entity Relationships

### BlogPost ↔ Tags

- **Type**: Many-to-Many
- **Implementation**: Array of string tags in frontmatter
- **Querying**: Filter posts by tag using `tags: { $contains: tag }`

### CaseStudy ↔ Tags (Technologies)

- **Type**: Many-to-Many
- **Implementation**: Array of string tags representing technologies/skills
- **Querying**: Similar to blog posts

### BlogPost ↔ Images

- **Type**: One-to-Many
- **Implementation**: Featured image in frontmatter + embedded images in content via MDC
- **Storage**: `/public/images/blog/YYYY/` directory

### CaseStudy ↔ Images

- **Type**: One-to-Many
- **Implementation**: Featured image + gallery images in content
- **Storage**: `/public/images/case-studies/YYYY/` directory

---

## Data Access Patterns

### Query All Published Blog Posts

```typescript
const posts = await queryContent<BlogPost>('/blog')
  .where({_path: {$not: {$regex: '/_'}}}) // Exclude drafts
  .sort({date: -1}) // Newest first
  .find()
```

### Query Posts by Tag

```typescript
const filteredPosts = await queryContent<BlogPost>('/blog')
  .where({
    _path: {$not: {$regex: '/_'}},
    tags: {$contains: 'typescript'},
  })
  .find()
```

### Query Single Post by Year and Slug

```typescript
const post = await queryContent<BlogPost>(`/blog/${year}/${slug}`).findOne()
```

### Query Featured Case Studies

```typescript
const featured = await queryContent<CaseStudy>('/case-studies')
  .where({featured: true})
  .sort({order: 1}) // Manual order, then date
  .limit(3)
  .find()
```

### Extract Unique Tags from Collection

```typescript
const posts = await queryContent('/blog').find()
const tags = [...new Set(posts.flatMap(p => p.tags || []))].sort()
```

---

## Internationalization Strategy

### Content Translation Structure

**Option A: Separate Files** (Recommended)

```
content/
├── blog/
│   └── 2026/
│       ├── post-slug.md        # English (default)
│       └── post-slug.ar.md     # Arabic translation
```

**Option B: Locale Directories**

```
content/
├── en/
│   └── blog/2026/post-slug.md
└── ar/
    └── blog/2026/post-slug.md
```

**Recommended**: Option A - Keeps translations alongside originals, easier to track completion

### Query by Locale

```typescript
// Nuxt i18n integration
const {locale} = useI18n()

const posts = await queryContent('/blog')
  .where({
    $or: [
      {lang: locale.value},
      {lang: {$exists: false}}, // Fallback to default
    ],
  })
  .find()
```

---

## Content Validation

### Build-Time Validation

Create custom Nuxt Content transformer to validate frontmatter:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  content: {
    markdown: {
      remarkPlugins: ['remark-validate-frontmatter'],
    },
  },
})
```

### Validation Rules

| Field           | Validation                                  |
| --------------- | ------------------------------------------- |
| `title`         | Required, string, 5-100 chars               |
| `date`          | Required, valid ISO date, not future        |
| `tags`          | Array of lowercase strings, 2-20 chars each |
| `excerpt`       | String, 50-200 chars if provided            |
| `featuredImage` | Valid path, file exists in public/          |

**Validation Errors**: Build should fail with clear message indicating file and field issue

---

## Schema Export

All TypeScript interfaces will be exported from `/types/content.ts` for use across the application:

```typescript
// types/content.ts
export interface BlogPost extends ContentMetadata {
  // Full BlogPost interface
}

export interface CaseStudy extends ContentMetadata {
  // Full CaseStudy interface
}

export interface Tag {
  name: string
  count: number
  slug: string
}
```

---

## Next Steps

Data model complete. Ready to proceed to:

1. **contracts/** - Define component props and page APIs
2. **quickstart.md** - Content authoring guide with examples
