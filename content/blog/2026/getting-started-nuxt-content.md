---
title: 'Getting Started with Nuxt Content'
date: 2026-01-13
author: 'Majed Sief Alnasr'
tags: ['nuxt', 'content', 'markdown']
excerpt: 'Learn how to build a powerful blog with Nuxt Content v3 and leverage MDC components for rich, interactive articles.'
featuredImage: '/images/blog/2026/nuxt-content-hero.jpg'
lang: 'en'
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

## MDC Components

You can use custom components like this:

::ContentImage{src="/images/example.jpg" alt="Example diagram"}
::

## Conclusion

Nuxt Content makes it incredibly easy to build content-driven sites with modern web technologies. Give it a try for your next project!
