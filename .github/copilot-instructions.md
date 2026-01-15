# GitHub Copilot Instructions for Majed's Portfolio

This file provides context and guidelines for GitHub Copilot when working on this portfolio project.

## Project Overview

This is a personal portfolio website built with Nuxt 4, showcasing:

- Blog posts (technical articles and tutorials)
- Case studies (project showcases with metrics and testimonials)
- Bilingual content (English and Arabic with RTL support)

## Tech Stack

- **Framework**: Nuxt 4 (Vue 3)
- **Content**: Nuxt Content v3 (markdown-based)
- **Styling**: Tailwind CSS
- **Language**: TypeScript (strict mode)
- **Testing**: Vitest
- **Runtime**: Bun 1.3.5
- **Validation**: Zod for runtime type checking

## Available Copilot Agents

### @content-generator

Use the `@content-generator` agent to create new blog posts and case studies with AI assistance.

**When to use**:

- Creating new blog posts or case studies
- Generating SEO-optimized content
- Creating bilingual content (English/Arabic)
- Using custom templates for structured content

**Example commands**:

```
@content-generator create a new blog post
@content-generator generate a case study
@content-generator help me write a tutorial about TypeScript
```

**Key Features**:

- Interactive metadata collection
- AI-powered content generation
- Frontmatter validation with Zod schemas
- Preview and refinement workflow
- Bilingual content support (English and Arabic)
- Custom template system (default, tutorial, case study templates)
- Automatic file path resolution and conflict detection

**Documentation**: See [specs/004-content-generation-agent/USAGE.md](specs/004-content-generation-agent/USAGE.md) for complete usage guide.

## Code Style Guidelines

### TypeScript

- Use strict mode (enabled in tsconfig.json)
- Prefer interfaces for public APIs, types for internal structures
- Use Zod schemas for runtime validation
- Export types explicitly from dedicated type files

### Vue Components

- Use Composition API with `<script setup lang="ts">`
- Keep components focused and single-responsibility
- Use props with TypeScript interfaces
- Prefer composables for shared logic

### Naming Conventions

- Components: PascalCase (`AppHeader.vue`, `BlogPostCard.vue`)
- Composables: camelCase with `use` prefix (`useTheme.ts`, `useContentFilter.ts`)
- Types: PascalCase (`BlogPost`, `CaseStudy`)
- Files: kebab-case for utilities, PascalCase for components

### Testing

- Test files located in `test/` directory
- Use Vitest for unit and integration tests
- Aim for high coverage on utility functions
- Test components with @nuxt/test-utils

## Content Structure

### Blog Posts

Located in `content/blog/YYYY/slug.md`:

- Required frontmatter: title, date, author, tags, excerpt
- Optional: featuredImage, featured, order
- Bilingual: Add `.ar.md` extension for Arabic version

### Case Studies

Located in `content/case-studies/slug.md`:

- Required frontmatter: title, client, date, role, timeline, tags, excerpt
- Optional: featuredImage, featured, order, testimonial, metrics
- Bilingual: Add `.ar.md` extension for Arabic version

## Development Workflow

1. Install dependencies: `bun install`
2. Run dev server: `bun run dev`
3. Run tests: `bun test`
4. Build for production: `bun run build`

## Important Paths

- Components: `app/components/`
- Pages: `app/pages/`
- Composables: `app/composables/`
- Content: `content/`
- Tests: `test/`
- Utilities: `app/utils/`
- Specifications: `specs/`

## AI Guidelines

When generating content or code:

- Follow the existing patterns in the codebase
- Respect TypeScript strict mode
- Use Zod for validation instead of manual checks
- Keep components small and composable
- Write tests for new utilities
- Update documentation when adding features

## Bilingual Support

- Default language: English (`lang: 'en'`)
- Arabic content: Use `.ar.md` file extension
- RTL support: Tailwind `rtl:` variant for Arabic layouts
- Translation keys: See `i18n/en.json` and `i18n/ar.json`

## SEO Best Practices

- Use descriptive titles (50-60 characters)
- Write compelling excerpts (150-160 characters)
- Include relevant tags (3-7 tags per post)
- Optimize images with alt text
- Use heading hierarchy correctly (h1 → h2 → h3)

## Common Patterns

### Fetching Content

```typescript
const {data: posts} = await useAsyncData('blog-posts', () =>
  queryContent('blog').where({lang: 'en'}).sort({date: -1}).find()
)
```

### Using Composables

```typescript
const {isDark, toggle} = useTheme()
const {currentLang, switchLanguage} = useLanguage()
```

### Validation with Zod

```typescript
import {blogPostSchema} from '@/utils/content-generator/schemas'

const validated = blogPostSchema.parse(metadata)
```

## Troubleshooting

- **Import errors**: Check that paths use `@/` alias for app directory
- **Type errors**: Ensure strict TypeScript compliance
- **Content not showing**: Verify frontmatter format and required fields
- **Build failures**: Run `bun run typecheck` to catch TypeScript errors

---

For more information, see the project README.md or specifications in the `specs/` directory.
