---
title: 'Getting Started with Nuxt Content'
date: 2026-01-13
author: 'Majed Sief Alnasr'
tags: ['nuxt', 'content', 'markdown']
excerpt: 'Learn how to build a powerful blog with Nuxt Content v3 and leverage MDC components for rich, interactive articles.'
featuredImage: '/images/blog/2026/nuxt-content-hero.svg'
lang: 'ar'
---

## Introduction

Nuxt Content is a powerful module that transforms your markdown files into a fully-featured content management system. With MDC (Markdown Components) support, you can embed Vue components directly in your markdown.

## Why Nuxt Content?

Here are some key benefits:

- **File-based**: No database required, content is versioned with your code
- **Type-safe**: Full TypeScript support with auto-generated types
- **Performant**: Static site generation with optimal loading
- **Flexible**: MDC allows custom components in markdown

## Example Code

Here's how to query content in Nuxt:

```typescript
const {data: posts} = await useAsyncData('blog-posts', () =>
  queryContent<BlogPost>('/blog').sort({date: -1}).find()
)
```

This query fetches all blog posts and sorts them by date in descending order.

## Code Highlighting

You can highlight specific lines of code:

## ::CodeBlock

code: |
import { defineComponent } from 'vue'

export default defineComponent({
name: 'MyComponent',
setup() {
return {}
}
})
language: typescript
filename: MyComponent.vue
highlights: [1, 3]

---

::

## Before and After Comparison

Here's a code comparison example:

## ::CodeComparison

language: typescript
labels: ['Before', 'After']

---

#before

```typescript
const data = reactive({
  count: 0,
  name: 'test',
})
```

#after

```typescript
const count = ref(0)
const name = ref('test')
```

::

## MDC Components

You can embed rich media:

::ContentImage{src="/images/blog/2026/nuxt-content-hero.jpg" alt="Nuxt Content Hero" width="800" height="400"}
::

## Conclusion

Nuxt Content makes it incredibly easy to build content-driven sites with modern web technologies. The MDC system allows you to create rich, interactive articles with custom Vue components. Give it a try for your next project!
