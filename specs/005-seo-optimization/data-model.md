# Data Model: SEO Optimization

**Feature**: SEO Optimization | **Phase**: 1 (Design) | **Date**: 2026-01-15

## Overview

This document defines the data structures for SEO metadata, structured data schemas, and content frontmatter extensions. All types are implemented in TypeScript with Zod validation for runtime safety.

## Core Entities

### 1. SEO Metadata

**Purpose**: Represents the complete set of SEO-related metadata for any page (static or dynamic content).

**Type Definition**:

```typescript
// app/types/seo.ts
export interface SEOMetadata {
  // Basic Meta Tags
  title: string // Page title (<title> tag)
  description: string // Meta description

  // Open Graph
  ogTitle?: string // Falls back to title if not provided
  ogDescription?: string // Falls back to description if not provided
  ogImage?: string // Relative or absolute URL
  ogType?: 'website' | 'article' | 'profile' // Default: 'website'
  ogUrl?: string // Canonical URL

  // Twitter Card
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player' // Default: 'summary_large_image'
  twitterTitle?: string // Falls back to ogTitle or title
  twitterDescription?: string // Falls back to ogDescription or description
  twitterImage?: string // Falls back to ogImage

  // Canonical & Language
  canonical?: string // Canonical URL (auto-generated if not provided)
  lang?: 'en' | 'ar' // Content language (default: 'en')
  alternateLinks?: AlternateLink[] // Hreflang links for multilingual content

  // Indexing
  robots?: RobotsDirective // Indexing directives (default: 'index,follow')
}

export interface AlternateLink {
  hreflang: string // Language code (e.g., 'en', 'ar', 'x-default')
  href: string // Absolute URL to alternate version
}

export type RobotsDirective =
  | 'index,follow'
  | 'noindex,follow'
  | 'index,nofollow'
  | 'noindex,nofollow'
```

**Validation Schema**:

```typescript
// app/utils/seo/validators.ts
import {z} from 'zod'

export const seoMetadataSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().min(1).max(160),
  ogTitle: z.string().min(1).max(60).optional(),
  ogDescription: z.string().min(1).max(160).optional(),
  ogImage: z.string().optional(),
  ogType: z.enum(['website', 'article', 'profile']).optional(),
  ogUrl: z.string().url().optional(),
  twitterCard: z.enum(['summary', 'summary_large_image', 'app', 'player']).optional(),
  canonical: z.string().url().optional(),
  lang: z.enum(['en', 'ar']).optional(),
  robots: z
    .enum(['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow'])
    .optional(),
})

// Soft validation for author guidance (warnings, not errors)
export const seoFieldWarnings = z.object({
  title: z
    .string()
    .refine(val => val.length >= 30 && val.length <= 60, {
      message: 'Title should be 30-60 characters for optimal display in search results',
    })
    .optional(),
  description: z
    .string()
    .refine(val => val.length >= 120 && val.length <= 160, {
      message: 'Description should be 120-160 characters for optimal display in search results',
    })
    .optional(),
})
```

**Relationships**:

- Generated from **Content Frontmatter** for blog posts and case studies
- Used by **useSEO()** composable to set page meta tags
- Stored in **Nuxt Content** parsed files

---

### 2. Content Frontmatter Extensions

**Purpose**: Optional SEO fields that content authors can add to blog posts and case studies.

**Blog Post Frontmatter**:

```typescript
// Existing fields (from current content.ts)
export interface BlogPost {
  title: string
  date: string
  author: string
  tags: string[]
  excerpt: string
  featuredImage?: string
  featured?: boolean
  order?: number
  lang?: 'en' | 'ar'

  // NEW: SEO Extensions (all optional)
  seo?: {
    title?: string // Custom SEO title (overrides display title)
    description?: string // Custom meta description (overrides excerpt)
    ogImage?: string // Custom OG image (overrides featuredImage)
    keywords?: string[] // Additional keywords for meta keywords tag
    noindex?: boolean // Prevent indexing (default: false)
  }
}
```

**Case Study Frontmatter**:

```typescript
// Existing fields (from current content.ts)
export interface CaseStudy {
  title: string
  client: string
  date: string
  role: string
  timeline: string
  tags: string[]
  excerpt: string
  featuredImage?: string
  featured?: boolean
  order?: number
  lang?: 'en' | 'ar'
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  metrics?: Array<{
    label: string
    value: string
  }>

  // NEW: SEO Extensions (all optional)
  seo?: {
    title?: string // Custom SEO title (overrides display title)
    description?: string // Custom meta description (overrides excerpt)
    ogImage?: string // Custom OG image (overrides featuredImage)
    keywords?: string[] // Additional keywords
    noindex?: boolean // Prevent indexing (default: false)
  }
}
```

**Markdown Example**:

```markdown
---
title: 'Building a Scalable API with Nuxt 4'
date: '2026-01-15'
author: 'Majed Sief Alnasr'
tags: ['Nuxt', 'TypeScript', 'API']
excerpt: 'Learn how to build a production-ready API with Nuxt 4...'
featuredImage: '/images/blog/nuxt-api.jpg'
lang: 'en'
seo:
  title: 'Nuxt 4 API Tutorial: Build Scalable Backend'
  description: 'Step-by-step guide to building a scalable REST API with Nuxt 4, TypeScript, and best practices for production.'
  keywords: ['Nuxt 4 tutorial', 'TypeScript API', 'REST API']
---
```

**Validation**:

```typescript
// Extend existing content schemas
export const blogPostSEOSchema = z.object({
  title: z.string().max(60).optional(),
  description: z.string().max(160).optional(),
  ogImage: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  noindex: z.boolean().optional(),
})
```

---

### 3. Structured Data Schemas (Schema.org)

#### 3.1 Article Schema (Blog Posts)

**Purpose**: Represents a blog post article with author, date, and content details.

**Schema.org Type**: [Article](https://schema.org/Article)

**Properties**:

```typescript
export interface ArticleSchema {
  '@context': 'https://schema.org'
  '@type': 'Article' | 'BlogPosting' | 'TechArticle'
  headline: string // Post title (max 110 chars)
  description: string // Post excerpt or SEO description
  image: string | string[] // Featured image URL(s)
  datePublished: string // ISO 8601 date (e.g., "2026-01-15")
  dateModified?: string // ISO 8601 date (if post updated)
  author: PersonSchema // Nested Person schema
  publisher?: OrganizationSchema // Optional: site/organization
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string // Canonical URL
  }
  keywords?: string[] // Tags/keywords
  wordCount?: number // Article word count
  articleSection?: string // Category/section
  inLanguage: 'en' | 'ar' // Content language
}

export interface PersonSchema {
  '@type': 'Person'
  name: string // Author name
  url?: string // Author profile URL
  image?: string // Author avatar
  sameAs?: string[] // Social profile URLs
}
```

**Example**:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Building a Scalable API with Nuxt 4",
  "description": "Learn how to build a production-ready API with Nuxt 4...",
  "image": "https://majedsiefalnasr.dev/images/blog/nuxt-api.jpg",
  "datePublished": "2026-01-15",
  "author": {
    "@type": "Person",
    "name": "Majed Sief Alnasr",
    "url": "https://majedsiefalnasr.dev"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://majedsiefalnasr.dev/blog/2026/building-scalable-api-nuxt-4"
  },
  "keywords": ["Nuxt 4", "TypeScript", "API"],
  "inLanguage": "en"
}
```

#### 3.2 CreativeWork Schema (Case Studies)

**Purpose**: Represents a case study showcasing project work.

**Schema.org Type**: [CreativeWork](https://schema.org/CreativeWork)

**Properties**:

```typescript
export interface CreativeWorkSchema {
  '@context': 'https://schema.org'
  '@type': 'CreativeWork'
  name: string // Case study title
  description: string // Case study excerpt
  image?: string // Project image
  datePublished: string // ISO 8601 date
  author: PersonSchema // Creator/developer
  keywords?: string[] // Tags/technologies used
  inLanguage: 'en' | 'ar' // Content language
  about?: {
    // Optional: what the work is about
    '@type': 'Thing'
    name: string
  }
  client?: {
    // Optional: client information
    '@type': 'Organization'
    name: string
  }
}
```

**Example**:

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "E-commerce Platform Redesign",
  "description": "Led the redesign of a high-traffic e-commerce platform...",
  "image": "https://majedsiefalnasr.dev/images/case-studies/ecommerce.jpg",
  "datePublished": "2025-12-01",
  "author": {
    "@type": "Person",
    "name": "Majed Sief Alnasr"
  },
  "keywords": ["Vue.js", "Nuxt", "E-commerce", "UX Design"],
  "inLanguage": "en",
  "client": {
    "@type": "Organization",
    "name": "Tech Retail Corp"
  }
}
```

#### 3.3 Person Schema (Homepage)

**Purpose**: Represents the portfolio owner as an individual professional.

**Schema.org Type**: [Person](https://schema.org/Person)

**Properties**:

```typescript
export interface PersonSchema {
  '@context': 'https://schema.org'
  '@type': 'Person'
  name: string // Full name
  givenName?: string // First name
  familyName?: string // Last name
  jobTitle: string // Professional title
  description: string // Bio/summary
  url: string // Homepage URL
  image?: string // Profile photo
  sameAs: string[] // Social profiles (LinkedIn, GitHub, etc.)
  email?: string // Contact email
  telephone?: string // Contact phone
  address?: {
    // Optional: location
    '@type': 'PostalAddress'
    addressLocality: string
    addressCountry: string
  }
  knowsAbout?: string[] // Skills/expertise
}
```

**Example**:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Majed Sief Alnasr",
  "jobTitle": "Full-Stack Developer & UI/UX Designer",
  "description": "Experienced developer specializing in Vue.js, Nuxt, and modern web technologies...",
  "url": "https://majedsiefalnasr.dev",
  "sameAs": ["https://github.com/majedsiefalnasr", "https://linkedin.com/in/majedsiefalnasr"],
  "knowsAbout": ["Vue.js", "Nuxt", "TypeScript", "UI/UX Design", "SEO"]
}
```

#### 3.4 BreadcrumbList Schema (Navigation)

**Purpose**: Represents the navigation hierarchy for blog posts and case studies.

**Schema.org Type**: [BreadcrumbList](https://schema.org/BreadcrumbList)

**Properties**:

```typescript
export interface BreadcrumbListSchema {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: BreadcrumbItem[]
}

export interface BreadcrumbItem {
  '@type': 'ListItem'
  position: number // 1-based index
  name: string // Breadcrumb text
  item?: string // URL (omit for current page)
}
```

**Example**:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://majedsiefalnasr.dev"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://majedsiefalnasr.dev/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Building a Scalable API with Nuxt 4"
    }
  ]
}
```

---

### 4. Sitemap Entry

**Purpose**: Represents a URL entry in the XML sitemap.

**Type Definition**:

```typescript
export interface SitemapEntry {
  loc: string // Absolute URL
  lastmod?: string // ISO 8601 date (YYYY-MM-DD)
  changefreq?: ChangeFrequency // Update frequency hint
  priority?: number // 0.0 to 1.0
}

export type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'
```

**Priority & Frequency Mapping** (from clarification):

```typescript
export const SITEMAP_DEFAULTS = {
  homepage: {
    priority: 1.0,
    changefreq: 'weekly' as const,
  },
  blogIndex: {
    priority: 0.9,
    changefreq: 'weekly' as const,
  },
  caseStudyIndex: {
    priority: 0.9,
    changefreq: 'weekly' as const,
  },
  blogPost: {
    priority: 0.8,
    changefreq: 'monthly' as const,
  },
  caseStudy: {
    priority: 0.8,
    changefreq: 'yearly' as const,
  },
} as const
```

---

### 5. Image Metadata

**Purpose**: Represents SEO-optimized image information.

**Type Definition**:

```typescript
export interface ImageMetadata {
  src: string // Image source URL (relative or absolute)
  alt: string // Alt text (required for accessibility)
  width: number // Image width in pixels
  height: number // Image height in pixels
  format?: 'jpeg' | 'png' | 'webp' | 'avif' // Image format
  sizes?: string // Responsive sizes attribute
  loading?: 'lazy' | 'eager' // Loading strategy (default: 'lazy')
}

export const DEFAULT_OG_IMAGE: ImageMetadata = {
  src: '/images/og/default.png',
  alt: 'Majed Sief Alnasr - Portfolio',
  width: 1200,
  height: 630,
  format: 'png',
  loading: 'eager',
}
```

---

## Data Flow

```
Content Creation
     │
     ├─> Frontmatter with optional SEO fields
     │
     ▼
Nuxt Content Parse
     │
     ├─> Extract metadata
     ├─> Validate with Zod schemas
     ├─> Emit warnings for suboptimal fields
     │
     ▼
Page Render
     │
     ├─> useSEO() composable
     │   ├─> Merge content metadata
     │   ├─> Apply intelligent defaults
     │   └─> Generate SEO meta tags
     │
     ├─> useStructuredData() composable
     │   ├─> Build appropriate schema (Article/CreativeWork/Person)
     │   └─> Render JSON-LD script tag
     │
     └─> Static Site Generation
         ├─> Pre-render all meta tags
         ├─> Generate sitemap.xml
         └─> Create robots.txt
```

---

## Storage Strategy

### Frontmatter Storage

- **Format**: YAML frontmatter in Markdown files
- **Location**: `content/blog/**/*.md`, `content/case-studies/**/*.md`
- **Validation**: Build-time Zod validation with warnings
- **Backup**: Version controlled via Git

### Structured Data Storage

- **Format**: JSON-LD rendered in `<script type="application/ld+json">`
- **Generation**: Runtime via useSchemaOrg() composable
- **Contracts**: Reference schemas in `specs/005-seo-optimization/contracts/`
- **Validation**: Schema.org validator in CI pipeline

### Sitemap Storage

- **Format**: XML
- **Location**: `/public/sitemap.xml` (generated at build time)
- **Update**: Regenerated on every build
- **Source of Truth**: Nuxt Content collection + static routes

---

## Summary

This data model provides:

- ✅ **Type safety** via TypeScript interfaces and Zod schemas
- ✅ **Backward compatibility** by making all SEO fields optional
- ✅ **Flexibility** for content authors with sensible defaults
- ✅ **Validation** that guides without blocking (warnings, not errors)
- ✅ **Standards compliance** with Schema.org and OpenGraph specifications
- ✅ **Bilingual support** with language-specific metadata

All entities integrate seamlessly with existing Nuxt 4 architecture and follow Constitution requirements for TypeScript strict mode and type safety.
