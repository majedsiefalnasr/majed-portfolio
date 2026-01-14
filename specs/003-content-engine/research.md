# Research: Content Engine (Blog & Case Studies)

**Date**: January 13, 2026  
**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Research Overview

This document resolves all technical unknowns identified in the Technical Context and provides best practices research for implementing the Content Engine using Nuxt Content v3 with MDC.

## Resolved Clarifications

### JSON-LD Structured Data for Blog Posts

**Decision**: Implement JSON-LD schema markup for blog posts and case studies

**Rationale**:

- Constitution states this "SHOULD" be included (recommended but not mandatory)
- Enhances SEO by providing rich snippets in search results
- Google Search Central recommends Article schema for blog posts
- Low implementation cost with high discoverability value

**Recommended Schema Types**:

- Blog posts: `Article` or `BlogPosting` schema
- Case studies: `CreativeWork` or custom `Project` properties
- Include: headline, datePublished, dateModified, author, image, description

**Implementation Approach**:

```typescript
// Use @unhead/schema for type-safe schema.org markup
useSchemaOrg([
  defineArticle({
    headline: post.title,
    datePublished: post.date,
    dateModified: post.updatedAt,
    author: {name: post.author},
    image: post.featuredImage,
    description: post.excerpt,
  }),
])
```

## Technology Research

### 1. Nuxt Content v3 Best Practices

**Content Query Patterns**

Nuxt Content v3 provides a composable-based API for querying markdown files:

```typescript
// Query all published blog posts (exclude drafts with underscore)
const {data: posts} = await useAsyncData('blog-posts', () =>
  queryContent('/blog')
    .where({_path: {$not: {$regex: '/_'}}}) // Exclude drafts
    .sort({date: -1}) // Newest first
    .find()
)

// Query with tag filtering
const {data: filteredPosts} = await useAsyncData('filtered-posts', () =>
  queryContent('/blog')
    .where({
      _path: {$not: {$regex: '/_'}},
      tags: {$contains: selectedTag},
    })
    .find()
)

// Single post by slug
const {data: post} = await useAsyncData(`post-${slug}`, () =>
  queryContent(`/blog/${year}/${slug}`).findOne()
)
```

**Key Findings**:

- Content is indexed at build time for fast queries
- Frontmatter becomes queryable metadata
- Full-text search requires Nuxt Content's built-in search or third-party like Algolia
- Type safety via auto-generated types from content collections

**Alternatives Considered**:

- Manual file system reading with `gray-matter` - Rejected: Nuxt Content provides optimized indexing and querying
- CMS like Strapi/Contentful - Rejected: Adds complexity, file-based is simpler for portfolio scale

---

### 2. MDC (Markdown Components) Syntax

**Component Embedding Syntax**

MDC allows embedding Vue components directly in markdown:

````markdown
## ::ButtonDemo

label: Click me
variant: primary

---

This is the button description
::

::ImageGallery{:images="['/img1.jpg', '/img2.jpg']"}
::

::CodeComparison
#before

```javascript
const old = 'way'
```
````

#after

```typescript
const new = 'way'
```

::

````

**Syntax Patterns**:
- `::ComponentName` - Basic component
- `::ComponentName{:prop="value"}` - Props via curly braces
- YAML frontmatter between `---` for complex props
- Named slots using `#slotName`

**Rendering Mechanism**:
- MDC compiler transforms syntax to Vue components at build time
- Components must be globally registered or in `components/content/` directory
- Supports TypeScript props validation

**Best Practices**:
- Prefix content components with clear names (e.g., `ContentImage`, `ContentCallout`)
- Use props for configuration, slots for nested content
- Provide fallback rendering for missing components

**Alternatives Considered**:
- Raw HTML in markdown - Rejected: Less maintainable, no reactivity
- Shortcodes (Hugo-style) - Rejected: MDC is Nuxt Content's native solution
- Vue SFC in markdown - Rejected: MDC provides cleaner author experience

---

### 3. Syntax Highlighting Strategy

**Recommended Solution**: Shiki (built into Nuxt Content v3)

**Configuration**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
      preload: ['typescript', 'javascript', 'vue', 'bash', 'json', 'markdown']
    }
  }
})
````

**Key Features**:

- Accurate syntax highlighting using TextMate grammars
- No client-side JavaScript required (rendered at build time)
- Theme switching for dark mode support
- Line highlighting and line numbers support

**Alternatives Considered**:

- Prism.js - Rejected: Requires client-side JS, slower
- Highlight.js - Rejected: Less accurate than Shiki
- No highlighting - Rejected: Poor UX for technical content

---

### 4. Image Optimization in Content

**Recommended Pattern**: Nuxt Image with MDC component wrapper

**Implementation**:

```vue
<!-- components/content/ContentImage.vue -->
<template>
  <figure>
    <NuxtImg
      :src="src"
      :alt="alt"
      format="webp"
      quality="80"
      loading="lazy"
      sizes="sm:100vw md:768px lg:896px" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
```

**Usage in Markdown**:

```markdown
::ContentImage{src="/images/blog/2026/example.jpg" alt="Example" caption="Figure 1: Example"}
::
```

**Best Practices**:

- Store images in `/public/images/blog/YYYY/` matching content structure
- Use descriptive filenames (not IMG_1234.jpg)
- Provide alt text for all images (accessibility requirement)
- Leverage Nuxt Image's automatic format conversion and responsive sizing

**Alternatives Considered**:

- Raw markdown images - Rejected: No optimization
- Cloudinary/Imgix - Rejected: Adds external dependency, costs
- Manual picture elements - Rejected: Nuxt Image automates this

---

### 5. Reading Time Calculation

**Recommended Approach**: Composable with word count parsing

**Implementation**:

```typescript
// composables/useReadTime.ts
export const useReadTime = (content: string): number => {
  const wordsPerMinute = 200 // Average reading speed
  const wordCount = content
    .replace(/<[^>]*>/g, '') // Strip HTML
    .split(/\s+/)
    .filter(word => word.length > 0).length

  return Math.ceil(wordCount / wordsPerMinute)
}
```

**Usage**:

```typescript
const readTime = useReadTime(post.body.children.map(c => c.value).join(' '))
```

**Best Practices**:

- Calculate at query time, cache in computed property
- Round up to nearest minute
- Consider code blocks as longer to read (multiply by 1.5x)

**Alternatives Considered**:

- Frontmatter field - Rejected: Manual maintenance burden
- Third-party library - Rejected: Trivial to implement
- Character count - Rejected: Less accurate than word count

---

### 6. Draft Content Exclusion Pattern

**Recommended Strategy**: Filename prefix + query filtering

**Query Pattern**:

```typescript
// Exclude files starting with underscore in any directory
queryContent('/blog')
  .where({_path: {$not: {$regex: '/_[^/]*$'}}})
  .find()
```

**Build Configuration**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  content: {
    ignores: [
      '**/_*.md', // Ignore draft files starting with underscore
    ],
  },
})
```

**Best Practices**:

- Convention: `_draft-post-title.md` for drafts
- Drafts remain in version control but excluded from build
- No special frontmatter flag needed (simpler)
- Development mode can optionally show drafts with query override

**Alternatives Considered**:

- Frontmatter `draft: true` - Rejected: Requires remembering to toggle field
- Separate directories - Rejected: Breaks year-based organization
- Git ignored drafts - Rejected: Loses version control benefits

---

### 7. Tag Filtering Implementation

**Recommended Architecture**: Client-side filtering with state management

**Implementation Pattern**:

```typescript
// composables/useContentFilter.ts
export const useContentFilter = () => {
  const selectedTag = useState<string | null>('content-filter-tag', () => null)

  const filterByTag = (posts: BlogPost[], tag: string | null) => {
    if (!tag) return posts
    return posts.filter(post => post.tags?.includes(tag))
  }

  const extractUniqueTags = (posts: BlogPost[]): string[] => {
    const tagSet = new Set<string>()
    posts.forEach(post => post.tags?.forEach(tag => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }

  return {selectedTag, filterByTag, extractUniqueTags}
}
```

**UI Pattern**:

```vue
<!-- Chip-based tag filter -->
<div class="flex flex-wrap gap-2">
  <UButton
    v-for="tag in tags"
    :key="tag"
    :variant="selectedTag === tag ? 'solid' : 'outline'"
    @click="selectedTag = selectedTag === tag ? null : tag"
  >
    {{ tag }}
  </UButton>
</div>
```

**Best Practices**:

- Keep filtering client-side (all data already loaded at build time)
- Use URL query params to persist filter state (e.g., `?tag=typescript`)
- Show count of posts per tag for better UX
- Sort tags alphabetically for consistent ordering

**Alternatives Considered**:

- Server-side filtering with API routes - Rejected: Unnecessary for static content
- Full-text search - Rejected: Over-engineered for initial release
- Category taxonomy - Rejected: Tags provide more flexibility

---

### 8. Year-Based Directory Routing

**Routing Strategy**: Catch-all route with year parsing

**Page Structure**:

```typescript
// pages/blog/[...slug].vue
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

// Matches: /blog/2026/my-post → content/blog/2026/my-post.md
const {data: post} = await useAsyncData(`blog-${slug}`, () =>
  queryContent(`/blog/${slug}`).findOne()
)
```

**Benefits**:

- Clean URLs: `/blog/my-post` instead of `/blog/2026/my-post`
- Automatic year inference from file location
- No manual route configuration needed

**Alternatives Considered**:

- Explicit year in URL - Rejected: URLs become dated
- Flat directory structure - Rejected: Harder to organize at scale
- Database-driven routing - Rejected: Static generation preferred

---

## Technology Stack Summary

| Component           | Technology     | Version  | Rationale                                                 |
| ------------------- | -------------- | -------- | --------------------------------------------------------- |
| Content Engine      | Nuxt Content   | v3.x     | Native Nuxt integration, MDC support, build-time indexing |
| Syntax Highlighting | Shiki          | Built-in | Accurate, SSG-compatible, theme switching                 |
| Image Optimization  | Nuxt Image     | Built-in | Automatic format conversion, responsive sizing            |
| Schema Markup       | @unhead/schema | Latest   | Type-safe schema.org integration                          |
| Component Library   | Nuxt UI        | v4.3.0+  | Consistent with existing design system                    |
| State Management    | Nuxt useState  | Built-in | Simple reactive state for filters                         |

**No additional dependencies required** - all functionality achievable with existing Nuxt modules.

---

## Implementation Risks & Mitigations

### Risk 1: MDC Learning Curve

**Impact**: Medium  
**Mitigation**: Provide comprehensive examples in quickstart.md, create reusable component library

### Risk 2: Content Migration Effort

**Impact**: Low  
**Mitigation**: Content is markdown-based, easy to create/migrate, templates provided

### Risk 3: Build Time with Large Content

**Impact**: Low (current scale)  
**Mitigation**: Nuxt Content is optimized for SSG, only becomes issue at 1000+ pages

### Risk 4: i18n Content Management

**Impact**: Medium  
**Mitigation**: Use Nuxt Content's locale-aware queries, establish clear translation workflow

---

## Next Steps

All technical unknowns resolved. Ready to proceed to:

1. **Phase 1**: Generate data-model.md with BlogPost/CaseStudy schemas
2. **Phase 1**: Generate contracts/ with component and page APIs
3. **Phase 1**: Generate quickstart.md with content authoring guide
4. **Phase 1**: Update agent context with Nuxt Content patterns
