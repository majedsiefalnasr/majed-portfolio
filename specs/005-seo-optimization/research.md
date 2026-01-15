# Research: SEO Optimization with Best Practices

**Feature**: SEO Optimization | **Phase**: 0 (Research) | **Date**: 2026-01-15

## Research Questions & Findings

### 1. Nuxt SEO Module Capabilities

**Question**: What features does @nuxtjs/seo provide and how does it integrate with Nuxt 4?

**Research Findings**:

- **@nuxtjs/seo** (v3.3.0+) is the official SEO module for Nuxt 3/4
- Provides automatic sitemap generation, robots.txt, meta tag management, and structured data
- Built on top of @unhead/vue for reactive head management
- Includes `useSeoMeta()` and `useHead()` composables for declarative SEO
- Supports dynamic sitemap routes with custom URLs, priorities, and change frequencies
- Auto-generates sitemaps at `/sitemap.xml` with minimal configuration

**Decision**: Use @nuxtjs/seo as the primary SEO framework
**Rationale**: Already installed in project, provides comprehensive SEO features, officially maintained by Nuxt team, integrates seamlessly with Nuxt Content

### 2. Schema.org Structured Data for Nuxt

**Question**: What's the best approach for implementing JSON-LD structured data in Nuxt 4?

**Research Findings**:

- **useSchemaOrg()** composable from @nuxtjs/seo/schema-org
- Provides type-safe schema builders: `defineArticle()`, `definePerson()`, `defineWebPage()`, `defineBreadcrumb()`
- Automatically handles context (@context), type (@type), and required properties
- Supports nesting schemas (e.g., author Person within Article)
- Renders JSON-LD in `<script type="application/ld+json">` automatically
- Validates against Schema.org standards at build time

**Decision**: Use @nuxtjs/seo's useSchemaOrg() composable with typed schema builders
**Rationale**: Type-safe, automatic validation, official Nuxt integration, prevents manual JSON-LD errors

**Alternatives Considered**:

- Manual JSON-LD generation → Rejected: Error-prone, no type safety, validation gaps
- Third-party schema libraries → Rejected: Unnecessary dependency, @nuxtjs/seo covers all needs

### 3. Meta Tag Generation Best Practices

**Question**: How should we structure meta tags for optimal SEO and social sharing?

**Research Findings**:

- **Priority order**: `<title>` → meta description → OG tags → Twitter Cards → additional meta
- **useSeoMeta()** from @nuxtjs/seo provides reactive, deduplicating meta tag management
- Supports all required tags: title, description, ogTitle, ogDescription, ogImage, twitterCard
- Automatic deduplication: if ogTitle not provided, falls back to title
- Image URLs must be absolute (https://) for social platforms
- Twitter Card types: `summary`, `summary_large_image`, `app`, `player`
- Recommended: Use `summary_large_image` for content with featured images

**Decision**: Create `useSEO()` composable that wraps `useSeoMeta()` with intelligent defaults
**Rationale**: Centralize SEO logic, enforce consistency, provide fallbacks (title → ogTitle, excerpt → description)

**Implementation Pattern**:

```typescript
// app/composables/useSEO.ts
export const useSEO = (metadata: SEOMetadata) => {
  const siteUrl = 'https://majedsiefalnasr.dev'

  useSeoMeta({
    title: metadata.title,
    description: metadata.description,
    ogTitle: metadata.ogTitle || metadata.title,
    ogDescription: metadata.ogDescription || metadata.description,
    ogImage: metadata.ogImage
      ? `${siteUrl}${metadata.ogImage}`
      : `${siteUrl}/images/og/default.png`,
    ogType: metadata.ogType || 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: metadata.ogTitle || metadata.title,
    twitterDescription: metadata.ogDescription || metadata.description,
    twitterImage: metadata.ogImage
      ? `${siteUrl}${metadata.ogImage}`
      : `${siteUrl}/images/og/default.png`,
  })
}
```

### 4. Sitemap Configuration for Nuxt Content

**Question**: How do we generate an XML sitemap that includes all blog posts and case studies with proper priorities and change frequencies?

**Research Findings**:

- **Nuxt Sitemap** (part of @nuxtjs/seo) auto-crawls routes during build
- Can define custom URLs via `nitro.prerender.routes` in nuxt.config.ts
- Supports per-route configuration via `defineNuxtConfig().sitemap` object
- Changefreq values: `always`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`, `never`
- Priority range: 0.0 to 1.0 (homepage typically 1.0)
- Can query Nuxt Content at build time to dynamically add content URLs

**Decision**: Configure sitemap in nuxt.config.ts with dynamic content URLs from Nuxt Content
**Rationale**: Build-time generation ensures up-to-date sitemap, no runtime overhead, SEO-friendly

**Implementation Approach**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  sitemap: {
    sources: ['/api/__sitemap__/blog', '/api/__sitemap__/case-studies'],
    defaults: {
      changefreq: 'monthly',
      priority: 0.8,
    },
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
    },
  },
})

// server/api/__sitemap__/blog.ts
export default defineSitemapEventHandler(async () => {
  const posts = await queryContent('blog').find()
  return posts.map(post => ({
    loc: post._path,
    lastmod: post.date,
    changefreq: 'monthly',
    priority: 0.8,
  }))
})
```

### 5. Image Optimization for SEO and Performance

**Question**: What are the best practices for optimizing images to meet Core Web Vitals and social sharing requirements?

**Research Findings**:

- **Default OG Image**: 1200x630 pixels (1.91:1 ratio) - Facebook/LinkedIn/Twitter standard
- **Nuxt Image**: Existing `<NuxtImg>` component auto-generates responsive images
- **Width/Height Required**: Prevents Cumulative Layout Shift (CLS), required for Core Web Vitals
- **WebP Format**: 25-35% smaller than JPEG, supported by all modern browsers
- **Lazy Loading**: Use `loading="lazy"` for below-the-fold images (Nuxt Image default)
- **Alt Text**: Required for accessibility and image SEO
- **File Size**: Aim for <200KB per image, <100KB for thumbnails

**Decision**:

1. Create 1200x630px default OG image with branding
2. Enforce width/height in content images via validation
3. Use Nuxt Image's automatic WebP conversion
4. Add image optimization checklist to content creation workflow

**Rationale**: Meets FR-023 (width/height), FR-024 (WebP), SC-003 (LCP < 2.5s), SC-004 (CLS < 0.1)

### 6. Hreflang Tags for Bilingual Content

**Question**: How should we implement hreflang tags for English/Arabic content versions?

**Research Findings**:

- **Hreflang syntax**: `<link rel="alternate" hreflang="en" href="..." />`
- **x-default**: Should point to the primary language version (English in our case)
- **Bidirectional linking**: Each language version must link to all other versions AND itself
- **@nuxtjs/i18n integration**: Can auto-generate hreflang via `locales` config
- **Best practice**: Always include `rel="canonical"` alongside hreflang to signal preferred URL

**Decision**: Use @nuxtjs/i18n's built-in hreflang support with custom overrides for content
**Rationale**: Already configured, automatic bidirectional linking, handles RTL via dir attribute

**Implementation**:

```typescript
// In blog/case study pages
const {locale, locales} = useI18n()
const route = useRoute()

useHead({
  link: [
    // Canonical
    {rel: 'canonical', href: `https://majedsiefalnasr.dev${route.path}`},
    // Hreflang for each locale
    ...locales.value.map(loc => ({
      rel: 'alternate',
      hreflang: loc.code,
      href: `https://majedsiefalnasr.dev${localePath(route.path, loc.code)}`,
    })),
    // x-default
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `https://majedsiefalnasr.dev${route.path}`,
    },
  ],
})
```

### 7. Canonical URL Strategy

**Question**: What's the best approach for managing canonical URLs and preventing duplicate content?

**Research Findings**:

- **Trailing slash consistency**: Choose one format (with or without) and enforce via canonical tag
- **Clarification answer**: Exclude trailing slashes (e.g., /blog/post-title)
- **Nuxt router**: Defaults to no trailing slash, aligns with modern web standards
- **Automatic canonicalization**: @nuxtjs/seo can auto-add canonical tags via `useSeoMeta()`
- **Cross-language canonical**: For translated content, canonical should point to that language version, NOT cross-language

**Decision**:

1. Canonical URLs exclude trailing slashes
2. Auto-generate canonical tag in useSEO() composable
3. Each language version has its own canonical (not cross-language)
4. Use hreflang for language relationships

**Rationale**: Aligns with Nuxt defaults, prevents duplicate content penalties, follows Google best practices

### 8. Frontmatter Schema Validation

**Question**: How should we validate SEO metadata in content frontmatter to ensure quality?

**Research Findings**:

- **Zod validation**: Already used in project (v4.3.5+), ideal for runtime validation
- **Nuxt Content hooks**: Can validate frontmatter at build time via `content:file:beforeParse` hook
- **Warning vs. Blocking**: Clarification answer - warnings preferred over blocking saves
- **Character limits**: Title 30-60 chars, description 120-160 chars (clarified requirements)

**Decision**: Create Zod schemas for SEO frontmatter with soft validation (warnings, not errors)
**Rationale**: Guides authors toward best practices without blocking content creation (FR-030, FR-031)

**Implementation**:

```typescript
// app/utils/seo/validators.ts
import {z} from 'zod'

export const seoMetadataSchema = z
  .object({
    seoTitle: z.string().min(30).max(60).optional(),
    seoDescription: z.string().min(120).max(160).optional(),
    ogImage: z.string().url().optional(),
  })
  .refine(data => !data.seoTitle || (data.seoTitle.length >= 30 && data.seoTitle.length <= 60), {
    message: 'SEO title should be 30-60 characters for optimal display',
  })
```

## Technology Decisions Summary

| Decision Point          | Choice                                                                            | Alternatives                        | Rationale                                               |
| ----------------------- | --------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------- |
| SEO Framework           | @nuxtjs/seo 3.3.0+                                                                | Manual implementation, react-helmet | Official Nuxt module, comprehensive features, type-safe |
| Structured Data         | useSchemaOrg() composable                                                         | Manual JSON-LD, jsonld package      | Type-safe, automatic validation, Nuxt integration       |
| Meta Tag Management     | useSeoMeta() + custom useSEO()                                                    | useHead() only, vue-meta            | Reactive, deduplicating, intelligent defaults           |
| Sitemap Generation      | Nuxt Sitemap with dynamic sources                                                 | Manual XML, sitemap.js              | Build-time generation, Nuxt Content integration         |
| Image Format            | 1200x630 OG default, WebP                                                         | 1200x1200, JPEG-only                | Facebook/LinkedIn standard, 30% smaller files           |
| Hreflang Implementation | @nuxtjs/i18n auto-generation                                                      | Manual link tags                    | Already configured, automatic bidirectional linking     |
| Canonical URL Format    | No trailing slash                                                                 | With trailing slash                 | Nuxt default, modern web standard                       |
| Frontmatter Validation  | Zod with warnings                                                                 | Joi, strict blocking                | Already in project, non-blocking guidance               |
| Change Frequency        | Per clarification: homepage/blog index weekly, posts monthly, case studies yearly | Uniform frequency                   | Honest signaling builds search engine trust             |
| Homepage Schema         | Person schema                                                                     | Organization schema                 | Individual professional portfolio (clarified)           |

## Risk Assessment

| Risk                                           | Likelihood | Impact | Mitigation                                                              |
| ---------------------------------------------- | ---------- | ------ | ----------------------------------------------------------------------- |
| Build time increases with large content sets   | Medium     | Medium | Implement incremental builds, cache sitemap generation                  |
| OG images not displaying on social platforms   | Low        | High   | Test with Facebook Debugger, Twitter Card Validator, LinkedIn Inspector |
| Structured data validation errors              | Low        | Medium | Use Schema.org validator during development, add to CI pipeline         |
| Hreflang conflicts with existing i18n          | Low        | Low    | Already using @nuxtjs/i18n, minimal configuration needed                |
| Performance degradation from meta tag overhead | Very Low   | Low    | Meta tags are lightweight, server-rendered, minimal client impact       |
| Content editors bypassing SEO validation       | Medium     | Medium | Add documentation, editor UI feedback, pre-commit hooks                 |

## Next Steps (Phase 1)

1. Define data models for SEO metadata (data-model.md)
2. Create JSON-LD contracts for Article, CreativeWork, Person, BreadcrumbList
3. Document quickstart guide for adding SEO to content
4. Update agent context with SEO-specific technologies and patterns
