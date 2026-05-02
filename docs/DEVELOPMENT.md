# Development Guide

This guide is for **human developers** working on this project. For AI tool instructions, see `AGENTS.md`.

## Quick Start

### Prerequisites

- Bun 1.3.5 or higher
- Node.js 20+ (for compatibility)
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd majed-portfolio

# Install dependencies
bun install
```

### Running the Project

```bash
# Start development server (http://localhost:3000)
bun run dev

# Run tests
bun test

# Build for production
bun run build

# Preview production build
bun run preview
```

## Development Commands

### Core Tasks

| Command             | Purpose                                 |
| ------------------- | --------------------------------------- |
| `bun run dev`       | Start dev server with hot reload        |
| `bun run build`     | Build for production (includes linting) |
| `bun run preview`   | Preview the production build locally    |
| `bun run typecheck` | Run TypeScript type checking            |

### Testing

| Command               | Purpose                  |
| --------------------- | ------------------------ |
| `bun test`            | Run all tests            |
| `bun test --watch`    | Run tests in watch mode  |
| `bun test:nuxt`       | Run Nuxt-specific tests  |
| `bun test --coverage` | Generate coverage report |

### Code Quality

| Command                | Purpose                   |
| ---------------------- | ------------------------- |
| `bun run lint`         | Check for linting errors  |
| `bun run lint:fix`     | Auto-fix linting errors   |
| `bun run format:check` | Check code formatting     |
| `bun run format`       | Format code with Prettier |

## Project Structure

```
app/
├── components/        # Vue components
├── composables/       # Reusable Vue logic
├── pages/            # Page routes (auto-routed)
├── types/            # TypeScript type definitions
└── utils/            # Utility functions

server/
├── api/              # API routes (auto-routed)
└── plugins/          # Server plugins

content/
├── blog/
│   ├── en/          # English blog posts
│   └── ar/          # Arabic blog posts
└── case-studies/
    ├── en/          # English case studies
    └── ar/          # Arabic case studies

test/                # Vitest tests (mirrors app structure)
specs/               # Feature specifications
```

## Creating Content

### Blog Posts

Create a new file in `content/blog/en/YYYY/slug.md`:

```yaml
---
title: 'My Blog Post'
date: 2025-01-15
author: 'Your Name'
tags: ['tag1', 'tag2']
excerpt: 'Brief description for preview'
lang: 'en'
featuredImage: '/images/blog/post.jpg'
---
# Your content here

Write markdown content...
```

For Arabic, create `content/blog/ar/YYYY/slug.md` with `lang: 'ar'`.

**Draft posts**: Prefix filename with `_draft` to exclude from builds: `_draft-my-post.md`

### Case Studies

Create a new file in `content/case-studies/en/slug.md`:

```yaml
---
title: 'Project Name'
client: 'Client Name'
date: 2025-01-15
role: 'Your Role'
timeline: 'Timeline'
tags: ['tag1', 'tag2']
excerpt: 'Project description'
featuredImage: '/images/case-studies/project.jpg'
featured: true # Optional: highlight on homepage
order: 1 # Optional: sort order
testimonial:
  quote: 'Client testimonial'
  author: 'Client Name'
  position: 'Client Title'
metrics:
  - label: 'Metric Name'
    value: '50%'
    icon: 'icon-name'
lang: 'en'
---
Case study content...
```

For Arabic, create the same structure in `ar/` with `lang: 'ar'`.

## Code Standards

### TypeScript

- **Strict mode required** — no `any` types
- All functions must have typed parameters and return types
- Type definitions go in `app/types/` organized by feature
- Use `z.infer<typeof schema>` to infer types from Zod schemas

### Vue Components

- Use **Composition API** with `<script setup lang="ts">`
- Name components in **PascalCase** (`AppHeader.vue`, `BlogCard.vue`)
- Type all props and emits
- Keep components small and focused
- Extract complex logic into composables

Example component:

```vue
<script setup lang="ts">
import type { BlogPost } from '~/app/types/content'

interface Props {
  post: BlogPost
  featured?: boolean
}

interface Emits {
  (e: 'update', post: BlogPost): void
}

defineProps<Props>()
defineEmits<Emits>()

const isHighlighted = computed(() => featured)
</script>

<template>
  <article>
    <h2>{{ post.title }}</h2>
  </article>
</template>
```

### Naming Conventions

- **Components**: `PascalCase` (`AppHeader.vue`)
- **Composables**: `camelCase` with `use` prefix (`useContentQuery.ts`)
- **Types**: `PascalCase` (`BlogPost.ts`)
- **Utils**: `camelCase` in feature folders (`utils/content/format.ts`)
- **Pages**: `lowercase-with-hyphens` (`[slug].vue`)

### Complexity Rules (ESLint)

- Function complexity: max 10
- Line length: max 100 characters
- Avoid magic numbers (except 0, 1, -1)
- Unused variables: prefix with `_` or remove

## Testing

### Test Structure

Tests live in `test/` mirroring the `app/` structure:

```
test/
├── components/
├── composables/
└── utils/
    ├── content/
    └── seo/
```

### Writing Tests

Use Vitest with happy-dom for DOM simulation:

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

### Running Tests

```bash
bun test                    # Run all tests once
bun test --watch           # Run tests in watch mode
bun test:nuxt              # Run Nuxt-specific tests
bun test path/to/file.test.ts  # Run specific test
bun test --coverage        # Generate coverage report
```

## Git & Commits

### Pre-commit Hooks

Husky automatically runs linting and formatting on staged files. If a hook fails:

```bash
# Fix issues
bun run lint:fix && bun run format

# Stage and commit again
git add .
git commit -m "your message"
```

### Commit Messages

Follow conventional commits:

- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `refactor: improve code structure`
- `test: add test coverage`

## Bilingual Content

### Language Routing

- **English**: `/blog/slug`, `/case-studies/slug`
- **Arabic**: `/ar/blog/slug`, `/ar/case-studies/slug`

### File Structure

Create separate files for each language:

```
content/blog/
├── en/2025/my-post.md     # English version
└── ar/2025/my-post.md     # Arabic version with lang: 'ar'
```

### UI Text

Update translations in `i18n/`:

- `i18n/en.json` — English UI text
- `i18n/ar.json` — Arabic UI text

## Common Tasks

### Add a New Page

1. Create `app/pages/page-name.vue`
2. Use `useHead()` to set meta tags
3. Test with `bun run dev`

### Update Navigation

- Header: `app/components/AppHeader.vue`
- Footer: `app/components/AppFooter.vue`
- Layout: `app/app.vue`

### Add a New Component

1. Create `app/components/ComponentName.vue`
2. Use Composition API with TypeScript
3. Add tests in `test/components/ComponentName.test.ts` if needed

### Add a New Utility

1. Create `app/utils/feature/utility-name.ts`
2. Export typed function
3. Add tests in `test/utils/feature/utility-name.test.ts`

## Build & Deployment

### Production Build

```bash
# Build (includes linting and type checking)
bun run build

# Preview the build locally
bun run preview

# Output is in .output/ directory
```

### Deployment

The site is deployed to **Vercel** with zero-config support for Nuxt 4.

Environment variables are set in the Vercel dashboard.

## Performance Tips

- **Images**: Use `<NuxtImg>` for automatic optimization
- **Fonts**: Geist font is lazy-loaded via @nuxt/fonts
- **Code splitting**: Nuxt handles this automatically
- **Prerendering**: Static routes are prerendered at build time

## Troubleshooting

### Build Fails with Content Validation Errors

Check that markdown frontmatter matches the schemas in `content.config.ts`:

```bash
# Example error: missing required field
# Solution: Check YAML frontmatter in your .md file
```

**Common issues:**

- `featuredImage` missing in case studies (required)
- Date format incorrect (should be YYYY-MM-DD)
- Required fields missing from frontmatter

### Pre-commit Hook Blocks Commit

```bash
bun run lint:fix && bun run format
git add .
git commit -m "your message"
```

### Tests Fail with happy-dom Errors

happy-dom simulates the DOM but doesn't support all browser APIs. Use Vitest mocks for unsupported features:

```typescript
import { vi } from 'vitest'

vi.stubGlobal('matchMedia', () => ({
  matches: false,
  addListener: vi.fn(),
  removeListener: vi.fn(),
}))
```

### Arabic Content Not Showing

1. Check `lang: 'ar'` is set in frontmatter
2. Verify file path includes `/ar/`: `content/blog/ar/slug.md`
3. Check `content.config.ts` includes the `/ar/` path in source configuration

### Type Errors

Ensure all functions have typed parameters and return values:

```typescript
// ❌ Bad
const processData = (data) => { ... }

// ✅ Good
const processData = (data: BlogPost[]): ProcessedData[] => { ... }
```

## Using AI Tools

If you use **Claude Code**, **Cursor**, **GitHub Copilot**, or **Kilocode**, they have access to AI-specific instructions in `AGENTS.md`. Those tools include:

- AI-powered content generation (@content-generator Copilot agent)
- Code pattern recommendations
- Architecture guidance
- Development best practices

This document is for human developers. For AI tool instructions, see `AGENTS.md`.

## Need Help?

- Check the README.md for project overview
- See AGENTS.md for AI tool-specific instructions
- Review existing code for patterns
- Run `bun run typecheck` to catch issues early
