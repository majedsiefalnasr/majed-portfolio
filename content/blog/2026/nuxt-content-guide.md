---
title: 'Complete Guide to Nuxt Content v3'
date: 2026-01-14
author: 'Majed Sief Alnasr'
tags: ['nuxt', 'content', 'markdown', 'tutorial']
excerpt: 'Learn how to create dynamic content with Nuxt Content v3 using MDC components and advanced markdown features.'
featuredImage: '/images/blog/2026/nuxt-content-hero.svg'
lang: 'en'
---

## Introduction

Nuxt Content v3 is a powerful framework for building content-driven applications. This guide covers everything you need to know to get started.

### Key Features

- **Markdown Support**: Write content in markdown with full HTML support
- **MDC Components**: Embed Vue components directly in markdown
- **Type Safety**: Full TypeScript support with strong typing
- **Performance**: Built-in caching and optimization

## Creating Your First Post

### Basic Structure

Every blog post starts with frontmatter metadata:

```yaml
---
title: 'Post Title'
date: 2026-01-14
tags: ['tag1', 'tag2']
excerpt: 'Brief description'
---
```

### Markdown Features

You can use standard markdown features:

- **Bold text** with `**markdown**`
- _Italic text_ with `*markdown*`
- [Links](https://example.com)
- Code blocks with syntax highlighting

### Code Examples

Here's a TypeScript example:

```typescript
interface Post {
  title: string
  date: Date
  tags: string[]
}

const createPost = (title: string): Post => ({
  title,
  date: new Date(),
  tags: [],
})
```

## Working with Components

### Using ContentImage

You can embed images with the ContentImage component:

::ContentImage{src="/images/blog/2026/nuxt-content-hero.svg" alt="Nuxt Content Logo" caption="Nuxt Content v3 - The modern way to manage content"}
::

### Working with Tables

| Feature              | Nuxt Content   | Traditional CMS |
| -------------------- | -------------- | --------------- |
| Performance          | ⚡ Excellent   | Good            |
| Type Safety          | ✅ Full        | Limited         |
| Developer Experience | ✅ Outstanding | Average         |
| Cost                 | Free           | Expensive       |

## Best Practices

1. **Keep posts focused** - Each post should cover one main topic
2. **Use descriptive titles** - SEO matters
3. **Add meta descriptions** - Include an excerpt
4. **Use semantic HTML** - Proper heading hierarchy (H2, H3, H4)
5. **Optimize images** - Use responsive images with NuxtImg

## Conclusion

Nuxt Content v3 provides everything you need to build a modern content platform. Start creating today!

### Next Steps

- Read the [Nuxt Content documentation](https://content.nuxtjs.org)
- Explore MDC components
- Build your first content-driven application
