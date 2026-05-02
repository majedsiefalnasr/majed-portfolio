# AGENTS.md

**Single source of truth for all AI tools** — Claude Code, Cursor, GitHub Copilot, Kilocode, and others.

All instructions, patterns, and guidelines are consolidated here. Update this file and all tools stay in sync.

---

## Project Overview

**Majed's Portfolio** is a bilingual (English/Arabic) portfolio website built with Nuxt 4, Vue 3, and TypeScript. It showcases technical blog posts and case studies with server-side rendering, SEO optimization, and content management via Nuxt Content v3.

**Key characteristics:**

- Content-driven: Markdown files with YAML frontmatter
- Bilingual: Separate `/en` and `/ar` directories with RTL support
- Type-safe: TypeScript strict mode, Zod validation, no `any` types
- Testing: Vitest with happy-dom environment
- Code quality: ESLint, Prettier, Husky pre-commit hooks
- Rendering: Hybrid (prerendered static routes + SSR)

## Tech Stack

- **Framework**: Nuxt 4 (Vue 3)
- **Content**: Nuxt Content v3 (markdown-based)
- **Styling**: Tailwind CSS (v4)
- **Language**: TypeScript (strict mode)
- **Testing**: Vitest with happy-dom
- **Runtime**: Bun 1.3.5+
- **Validation**: Zod for runtime type checking

## Development Commands

### Core Commands

```bash
# Start dev server (watches for changes)
bun run dev

# Build for production (includes linting)
bun run build

# Preview production build locally
bun run preview

# Type checking
bun run typecheck
```

### Testing

```bash
# Run all tests
bun test

# Watch mode
bun test --watch

# Run only Nuxt-specific tests
bun test:nuxt

# Coverage report
bun test --coverage

# Single test file
bun test test/utils/content/format.test.ts
```

### Code Quality

```bash
# Check for linting errors
bun run lint

# Fix auto-fixable linting errors
bun run lint:fix

# Check formatting with Prettier
bun run format:check

# Format code with Prettier
bun run format
```

### Pre-commit Hooks

Husky hooks automatically run linting and formatting on staged files. If a hook fails:

1. Run `bun run lint:fix && bun run format`
2. Stage changes again
3. Commit

## Available Copilot Agents

### @content-generator

Use the `@content-generator` agent to create new blog posts and case studies with AI assistance.

**When to use:**

- Creating new blog posts or case studies
- Generating SEO-optimized content
- Creating bilingual content (English/Arabic)
- Using custom templates for structured content

**Example commands:**

```
@content-generator create a new blog post
@content-generator generate a case study
@content-generator help me write a tutorial about TypeScript
```

**Key Features:**

- Interactive metadata collection
- AI-powered content generation
- Frontmatter validation with Zod schemas
- Preview and refinement workflow
- Bilingual content support
- Custom template system
- Automatic file path resolution and conflict detection

**Documentation**: See `.github/agents/content-generator.agent.md` for full agent reference.

## Architecture

### Directory Structure

```
app/
├── components/          # Vue components (global scope, no prefix)
├── composables/         # Reusable Vue composables (useXxx pattern)
├── pages/              # Nuxt page routes (auto-routed based on file names)
├── types/              # TypeScript types
├── utils/              # Utility functions (organized by feature)
│   ├── content/        # Content-related utilities
│   ├── content-generator/  # GitHub Copilot agent for content creation
│   └── seo/            # SEO helper functions
└── lib/                # General-purpose helpers

server/
├── api/                # Nuxt server routes (auto-routed)
│   └── __sitemap__/    # Dynamic sitemap routes for blog & case studies
└── plugins/            # Server-side plugins

content/               # Markdown content (source of truth for blog & case studies)
├── blog/
│   ├── en/            # English blog posts
│   └── ar/            # Arabic blog posts
└── case-studies/
    ├── en/            # English case studies
    └── ar/            # Arabic case studies

test/                  # Vitest test files (mirrors app structure)

specs/                 # Feature specifications (active specs track planned work)
```

### Rendering Strategy

The site uses **hybrid rendering** via Nuxt's `routeRules`:

- **Prerendered routes** (static HTML): `/`, `/blog`, `/blog/**`, `/case-studies/**`, `/ar/blog/**`, `/ar/case-studies/**`
- **Dynamic routes** (SSR on demand): API endpoints for sitemaps

Pre-rendered routes are discovered via a build hook (`scripts/get-prerender-routes.ts`) that scans the content directory.

### Key Modules & Composables

**Composables for content queries:**

- `useContentQuery()` — Query blog/case studies with filters
- `useContentFilter()` — Filter content by language & tags
- `useContentLocale()` — Get locale-aware content paths
- `useExcerpt()` — Calculate read time & format excerpts

**SEO & Structured Data:**

- `useSEO()` — Set page meta tags, Open Graph, Twitter cards
- `useStructuredData()` — Generate JSON-LD for schema.org

**Theme & Language:**

- `useTheme()` — Handle light/dark mode (via @nuxtjs/color-mode)
- `useLanguage()` — Access i18n instance & current locale

### Build Configuration Highlights

- **CSS**: Tailwind CSS v4 via `@tailwindcss/vite` plugin
- **SEO**: @nuxtjs/seo with dynamic sitemap generation
- **i18n**: @nuxtjs/i18n with prefix-except-default strategy
- **Images**: @nuxt/image optimizes to WebP/AVIF with quality 80
- **Fonts**: Geist font via @nuxt/fonts
- **A11y**: @nuxt/a11y module for accessibility features

## Code Standards

### TypeScript

- **Strict mode** is required (no `any` types)
- All function parameters and return types must be typed
- Use `z.infer<typeof schema>` to infer types from Zod schemas
- Type definitions live in `app/types/` and are organized by feature
- Prefer interfaces for public APIs, types for internal structures
- Use Zod schemas for runtime validation
- Export types explicitly from dedicated type files

### Vue Components

- **Composition API** only (no Options API)
- Use `<script setup lang="ts">`
- Use PascalCase for component names
- Components in `app/components/` are auto-imported (no prefix needed)
- Props should be typed via `defineProps<{ ... }>()`
- Emits should be typed via `defineEmits<{ ... }>()`
- Keep components small and focused; extract logic into composables

### File Naming

- **Components**: PascalCase (`AppHeader.vue`, `BlogCard.vue`)
- **Composables**: camelCase with `use` prefix (`useContentQuery.ts`)
- **Types**: PascalCase (`ContentMeta.ts`, `BlogPost.ts`)
- **Utils**: camelCase, grouped by feature (`content/`, `seo/`, `content-generator/`)
- **Pages**: lowercase with hyphens (`index.vue`, `[slug].vue`)

### Complexity Limits (ESLint)

- **Cyclomatic complexity**: max 10 per function
- **Line length**: max 100 characters
- **Magic numbers**: avoid (allowed: 0, 1, -1)
- **Unused variables**: prefix with `_` or remove

### Import Organization

Group imports in this order:

1. External packages
2. Nuxt & Vue imports
3. Internal imports (components, composables, utils)
4. Type imports (separate `import type` blocks)

Example:

```typescript
import { defineComponent } from 'vue'
import { useHead } from '@unhead/vue'

import AppHeader from '~/components/AppHeader.vue'
import { useContentQuery } from '~/composables/useContentQuery'
import { formatDate } from '~/utils/content/format'

import type { BlogPost } from '~/app/types/content'
```

## Content Structure

### Blog Posts

**Location**: `content/blog/en|ar/YYYY/slug.md`

```yaml
---
title: 'Post Title'
date: '2025-01-15'
author: 'Majed Siefalnaser'
tags: ['tag1', 'tag2']
excerpt: 'Brief description'
lang: 'en' # or 'ar'
featuredImage: '/images/blog/image.jpg'
sameAs: ['https://external-url.com'] # Optional: canonical/syndication
---
Content in Markdown...
```

**Draft files** (prefix with `_draft`) are automatically excluded from builds: `_draft-slug.md`

### Case Studies

**Location**: `content/case-studies/en|ar/slug.md`

```yaml
---
title: 'Project Title'
client: 'Client Name'
date: '2025-01-15'
role: 'Your Role'
timeline: 'Duration'
tags: ['tag1', 'tag2']
excerpt: 'Brief description'
featuredImage: '/images/case-studies/image.jpg'
featured: true # Highlight on homepage
order: 1 # Sort order
testimonial:
  quote: 'Client quote...'
  author: 'Client Name'
  position: 'Client Position'
metrics:
  - label: 'Metric Label'
    value: '50%'
    icon: 'icon-name'
lang: 'en' # or 'ar'
---
Content in Markdown...
```

## Testing

### Test Structure

- Tests live in `test/` directory, mirroring the structure of `app/`
- Test file naming: `*.test.ts` (e.g., `test/utils/content/format.test.ts` for `app/utils/content/format.ts`)
- Use Vitest syntax: `describe()`, `it()`, `expect()`
- Nuxt components are tested with `@vue/test-utils` in the Nuxt environment
- Aim for high coverage on utility functions
- Test components with @nuxt/test-utils

### Running Tests

```bash
# All tests
bun test

# Watch mode
bun test --watch

# Only Nuxt-specific tests
bun test:nuxt

# Single test file
bun test test/utils/content/format.test.ts

# Coverage report
bun test --coverage
```

### Example Test

```typescript
import { describe, it, expect } from 'vitest'
import { formatDate } from '~/utils/content/format'

describe('formatDate', () => {
  it('formats a date string correctly', () => {
    const result = formatDate('2025-01-15')
    expect(result).toBe('January 15, 2025')
  })
})
```

## Bilingual Content Strategy

**Language routing:**

- English (default): `/blog/slug`, `/case-studies/slug`
- Arabic: `/ar/blog/slug`, `/ar/case-studies/slug`

**Content management:**

- Separate files for each language: `content/blog/en/slug.md` and `content/blog/ar/slug.md`
- Frontmatter includes `lang: 'en'` or `lang: 'ar'` for verification
- Use `sameAs` field to link English/Arabic versions (optional canonical/syndication info)

**i18n configuration:**

- Default locale: `en`
- Strategy: `prefix_except_default` (English URLs have no prefix, Arabic has `/ar`)
- UI text: Managed in `i18n/en.json` and `i18n/ar.json`
- RTL support: Tailwind `rtl:` variant for Arabic layouts

## SEO Best Practices

### Meta Tags and Structured Data

- **Title Length**: 30-60 characters for optimal display in search results
- **Description Length**: 120-160 characters for search snippets
- **OG Images**: Use 1200x630px images (1.91:1 aspect ratio) for social sharing
- **Structured Data**: Add Schema.org JSON-LD for rich search results

### SEO Composables

```typescript
// Basic page SEO
useSEO({
  title: 'Page Title',
  description: 'Page description under 160 characters',
  ogImage: '/images/og/page.jpg',
  canonical: '/page-url',
})

// Content-based SEO (blog posts, case studies)
useContentSEO(content, {
  ogType: 'article',
  canonical: `/blog/${slug}`,
})

// Homepage SEO with Person schema
useHomepageSEO()
usePersonSchema({
  name: 'Majed Sief Alnasr',
  jobTitle: 'Full Stack Developer',
})

// Article structured data
useBlogPostStructuredData(post)
useBreadcrumbSchema([
  {name: 'Home', url: '/'},
  {name: 'Blog', url: '/blog'},
  {name: post.title, url: post.path},
])
```

### Content Frontmatter SEO

```markdown
---
title: 'Main Title'
excerpt: 'Main excerpt used as fallback'
seo:
  title: 'Custom SEO title for search results (30-60 chars)'
  description: 'Custom meta description optimized for search (120-160 chars)'
  ogImage: '/images/custom-social-share.jpg'
  keywords: ['keyword1', 'keyword2', 'keyword3']
  noindex: false # Set to true to exclude from search results
---
```

### Image Optimization for SEO

```vue
<!-- Featured image (above fold) - use eager loading -->
<NuxtImg
  src="/images/blog/post.jpg"
  alt="Descriptive alt text (under 125 chars)"
  width="1200"
  height="630"
  loading="eager"
  class="w-full"
/>

<!-- Content image (below fold) - lazy load -->
<NuxtImg
  src="/images/diagram.png"
  alt="Architecture diagram showing API flow"
  width="800"
  height="600"
  loading="lazy"
/>
```

### SEO Validation

```typescript
import { validateSEOTitle, validateSEODescription } from '~/utils/seo/validators'

// Validate title length
const titleResult = validateSEOTitle('My Blog Post Title')
if (!titleResult.success) {
  console.warn(titleResult.errors)
}

// Validate description length
const descResult = validateSEODescription('This is my post description...')
if (descResult.warnings) {
  console.info(descResult.warnings) // Character count guidance
}
```

### Performance Targets

- **Lighthouse SEO Score**: ≥ 95
- **LCP (Largest Contentful Paint)**: < 2.5s
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Total Page Weight**: < 1MB initial load

### Canonical URLs and Hreflang

```typescript
// Canonical URL (no trailing slash)
useSEO({
  canonical: '/blog/my-post', // Automatically normalized
})

// Bilingual hreflang tags
useSEO({
  alternateLinks: [
    {hreflang: 'en', href: '/blog/my-post'},
    {hreflang: 'ar', href: '/ar/blog/my-post'},
    {hreflang: 'x-default', href: '/blog/my-post'},
  ],
})
```

### Sitemap Configuration

The sitemap is automatically generated from:

- Static pages defined in `nuxt.config.ts`
- Blog posts via `server/api/__sitemap__/blog.ts`
- Case studies via `server/api/__sitemap__/case-studies.ts`

Content with `seo.noindex: true` is automatically excluded from the sitemap.

## Common Development Tasks

### Add Blog Post

1. Create `content/blog/en/YYYY/slug.md` with required frontmatter
2. Optionally create Arabic version: `content/blog/ar/YYYY/slug.md`
3. Run `bun run build` (will discover and prerender the new route)
4. For drafts, prefix filename with `_draft` (e.g., `_draft-slug.md`) — these won't be rendered

### Add Case Study

1. Create `content/case-studies/en/slug.md` with all required frontmatter
2. Optionally create Arabic version: `content/case-studies/ar/slug.md`
3. Add featured image to `public/images/` and reference in frontmatter
4. Run `bun run build`

### Updating Navigation

- Header: `app/components/AppHeader.vue`
- Footer: `app/components/AppFooter.vue`
- Main layout shell: `app/app.vue`

### Adding a New Page

1. Create `app/pages/page-name.vue` (file-based routing)
2. Use `useHead()` and `useSEO()` to set meta tags
3. Run `bun run dev` to test locally

### Add New Component

1. Create `app/components/ComponentName.vue`
2. Use Composition API with `<script setup lang="ts">`
3. Type all props and emits
4. Create tests in `test/components/ComponentName.test.ts` if needed

### Add New Utility

1. Create file in `app/utils/feature/utility-name.ts`
2. Export typed function
3. Create tests in `test/utils/feature/utility-name.test.ts`
4. Update documentation if needed

## Common Patterns

### Fetching Content

```typescript
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryContent('blog').where({ lang: 'en' }).sort({ date: -1 }).find()
)
```

### Using Composables

```typescript
const { isDark, toggle } = useTheme()
const { currentLang, switchLanguage } = useLanguage()
```

### Validation with Zod

```typescript
import { blogPostSchema } from '~/utils/content-generator/schemas'

const validated = blogPostSchema.parse(metadata)
```

## AI Guidelines

When generating content or code:

- Follow the existing patterns in the codebase
- Respect TypeScript strict mode
- Use Zod for validation instead of manual checks
- Keep components small and composable
- Write tests for new utilities
- Update documentation when adding features
- Type all function parameters and returns
- Use imports properly aligned (external → internal → types)

## Performance & Optimization

- **Prerendering**: Most routes are prerendered at build time for static serving
- **Image optimization**: All images are optimized to WebP/AVIF via @nuxt/image
- **Font loading**: Geist font is lazy-loaded via @nuxt/fonts
- **Analytics**: Vercel Analytics & Speed Insights are integrated

## Deployment

The site is built and deployed to Vercel with zero-config support for Nuxt 4.

**Build output**: `.output/` directory (Nitro server)

**Environment variables**: Set in Vercel dashboard (e.g., `NUXT_PUBLIC_SITE_URL`)

**Pre-render crawl**: Enabled in `nuxt.config.ts` — routes are discovered automatically from content files.

## Troubleshooting

**Build fails with content validation errors:**

- Check frontmatter in `.md` files matches the Zod schema in `content.config.ts`
- Ensure required fields are present (e.g., `featuredImage` for case studies)

**Tests fail with "happy-dom" errors:**

- Vitest uses happy-dom for DOM simulation. If a test requires browser APIs, check that the API is supported by happy-dom or use Vitest mocks.

**Pre-commit hook blocks commit:**

- Run `bun run lint:fix && bun run format`
- Review the hook output to identify specific violations

**i18n content not showing for Arabic:**

- Verify the `lang: 'ar'` field is set in frontmatter
- Confirm the file path includes `/ar/` (e.g., `content/blog/ar/slug.md`)
- Check that the content is in the correct source path in `content.config.ts`

**Import errors:**

- Check that paths use `~/` alias for app directory
- Verify the import path is correct

**Type errors:**

- Ensure strict TypeScript compliance
- Check that all functions have typed parameters and return values

**Content not showing:**

- Verify frontmatter format and required fields
- Check file naming and directory structure

**Build failures:**

- Run `bun run typecheck` to catch TypeScript errors
- Check for ESLint violations with `bun run lint`

---

**Updated**: 2026-05-02  
**Single Source of Truth for**: Claude Code, Cursor, GitHub Copilot, Kilocode, and other AI tools
