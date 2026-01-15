# Quickstart Guide: SEO Optimization

**Feature**: SEO Optimization | **Audience**: Content Authors & Developers | **Date**: 2026-01-15

## Overview

This guide shows you how to add SEO metadata to your content and implement SEO features in the portfolio website. Follow these steps to ensure your blog posts and case studies are optimized for search engines and social media sharing.

---

## For Content Authors

### Adding SEO Metadata to Blog Posts

When creating a new blog post, you can optionally add SEO-specific fields to customize how your content appears in search results and social media shares.

**Basic Blog Post** (without SEO customization):

```markdown
---
title: 'Building a Scalable API with Nuxt 4'
date: '2026-01-15'
author: 'Majed Sief Alnasr'
tags: ['Nuxt', 'TypeScript', 'API']
excerpt: 'Learn how to build a production-ready API with Nuxt 4, TypeScript, and best practices for scale.'
featuredImage: '/images/blog/nuxt-api.jpg'
lang: 'en'
---

Your content here...
```

**Enhanced Blog Post** (with SEO customization):

```markdown
---
title: 'Building a Scalable API with Nuxt 4'
date: '2026-01-15'
author: 'Majed Sief Alnasr'
tags: ['Nuxt', 'TypeScript', 'API']
excerpt: 'Learn how to build a production-ready API with Nuxt 4, TypeScript, and best practices for scale.'
featuredImage: '/images/blog/nuxt-api.jpg'
lang: 'en'
seo:
  title: 'Nuxt 4 API Tutorial: Build Scalable Backend (2026)'
  description: 'Step-by-step guide to building a production-ready REST API with Nuxt 4, TypeScript, and modern best practices. Includes code examples.'
  ogImage: '/images/blog/nuxt-api-social.jpg'
  keywords: ['Nuxt 4 tutorial', 'TypeScript API', 'REST API', 'Backend development']
---

Your content here...
```

#### SEO Field Guidelines

| Field             | Purpose                         | Recommended Length | Notes                                                                                |
| ----------------- | ------------------------------- | ------------------ | ------------------------------------------------------------------------------------ |
| `seo.title`       | Custom title for search results | 30-60 characters   | Should be compelling and include target keywords. System will warn if outside range. |
| `seo.description` | Custom meta description         | 120-160 characters | Entice clicks from search results. System will warn if outside range.                |
| `seo.ogImage`     | Custom social sharing image     | N/A                | Must be 1200x630 pixels. Falls back to `featuredImage` if not provided.              |
| `seo.keywords`    | Additional SEO keywords         | N/A                | List of relevant terms for search engines. Optional.                                 |
| `seo.noindex`     | Prevent search indexing         | N/A                | Set to `true` to exclude from search results (for drafts/private posts).             |

### Adding SEO Metadata to Case Studies

**Basic Case Study**:

```markdown
---
title: 'E-commerce Platform Redesign'
client: 'Tech Retail Corp'
date: '2025-12-01'
role: 'Lead Developer & UX Designer'
timeline: '6 months'
tags: ['Vue.js', 'Nuxt', 'E-commerce', 'UX Design']
excerpt: 'Led the complete redesign of a high-traffic e-commerce platform.'
featuredImage: '/images/case-studies/ecommerce.jpg'
lang: 'en'
metrics:
  - label: 'Conversion Rate Increase'
    value: '35%'
  - label: 'Bounce Rate Reduction'
    value: '20%'
testimonial:
  quote: 'Majed transformed our platform and exceeded all expectations.'
  author: 'Jane Doe'
  role: 'CTO, Tech Retail Corp'
---

Your case study content...
```

**Enhanced Case Study** (with SEO):

```markdown
---
title: 'E-commerce Platform Redesign'
client: 'Tech Retail Corp'
date: '2025-12-01'
role: 'Lead Developer & UX Designer'
timeline: '6 months'
tags: ['Vue.js', 'Nuxt', 'E-commerce', 'UX Design']
excerpt: 'Led the complete redesign of a high-traffic e-commerce platform.'
featuredImage: '/images/case-studies/ecommerce.jpg'
lang: 'en'
seo:
  title: 'E-commerce UX Redesign Case Study | 35% Higher Conversions'
  description: 'Case study: Complete redesign of high-traffic e-commerce platform using Vue.js and Nuxt. Improved conversion by 35% and reduced bounce rate by 20%.'
  keywords: ['e-commerce case study', 'UX design', 'conversion optimization', 'Vue.js project']
metrics:
  - label: 'Conversion Rate Increase'
    value: '35%'
  - label: 'Bounce Rate Reduction'
    value: '20%'
testimonial:
  quote: 'Majed transformed our platform and exceeded all expectations.'
  author: 'Jane Doe'
  role: 'CTO, Tech Retail Corp'
---

Your case study content...
```

### Bilingual Content (Arabic)

For Arabic versions, create a separate file with `.ar.md` extension:

**English Version**: `content/blog/2026/building-scalable-api.md`
**Arabic Version**: `content/blog/2026/building-scalable-api.ar.md`

```markdown
---
title: 'بناء واجهة برمجية قابلة للتطوير مع Nuxt 4'
date: '2026-01-15'
author: 'ماجد سيف النصر'
tags: ['Nuxt', 'TypeScript', 'API']
excerpt: 'تعلم كيفية بناء واجهة برمجية جاهزة للإنتاج مع Nuxt 4 و TypeScript.'
featuredImage: '/images/blog/nuxt-api.jpg'
lang: 'ar'
seo:
  title: 'شرح Nuxt 4: بناء واجهة برمجية قابلة للتطوير'
  description: 'دليل شامل لبناء واجهة برمجية باستخدام Nuxt 4 و TypeScript مع أفضل الممارسات.'
---

المحتوى بالعربية...
```

The system will automatically:

- Set `dir="rtl"` for Arabic pages
- Generate hreflang tags linking English and Arabic versions
- Create proper canonical URLs for each language

### Image Optimization Checklist

✅ **Required for Featured Images**:

1. **Dimensions**: 1200x630 pixels for optimal social sharing
2. **File size**: <200KB (compress using ImageOptim, TinyPNG, or similar)
3. **Format**: JPEG or PNG (WebP conversion happens automatically)
4. **File name**: Use descriptive names (e.g., `nuxt-api-tutorial.jpg`)
5. **Location**: Save in `/public/images/blog/` or `/public/images/case-studies/`

✅ **Alt Text Best Practices**:

- Describe the image content clearly
- Include relevant keywords naturally
- Keep under 125 characters
- Don't start with "Image of..." (screen readers announce it's an image)

---

## For Developers

### Implementing SEO in New Pages

#### 1. Using the useSEO Composable

```vue
<!-- app/pages/blog/[...slug].vue -->
<script setup lang="ts">
  const {data: post} = await useAsyncData('blog-post', () =>
    queryContent('blog', route.params.slug).findOne()
  )

  // Apply SEO metadata
  useSEO({
    title: post.value.seo?.title || post.value.title,
    description: post.value.seo?.description || post.value.excerpt,
    ogImage: post.value.seo?.ogImage || post.value.featuredImage,
    ogType: 'article',
  })
</script>
```

#### 2. Adding Structured Data

```vue
<!-- app/pages/blog/[...slug].vue -->
<script setup lang="ts">
  const {data: post} = await useAsyncData('blog-post', () =>
    queryContent('blog', route.params.slug).findOne()
  )

  // Add Article schema
  useSchemaOrg([
    defineArticle({
      headline: post.value.title,
      description: post.value.excerpt,
      image: post.value.featuredImage,
      datePublished: post.value.date,
      author: {
        name: post.value.author,
        url: 'https://majedsiefalnasr.dev',
      },
      keywords: post.value.tags,
    }),
    defineBreadcrumb({
      itemListElement: [
        {name: 'Home', item: 'https://majedsiefalnasr.dev'},
        {name: 'Blog', item: 'https://majedsiefalnasr.dev/blog'},
        {name: post.value.title},
      ],
    }),
  ])
</script>
```

#### 3. Homepage Person Schema

```vue
<!-- app/pages/index.vue -->
<script setup lang="ts">
  useSEO({
    title: 'Majed Sief Alnasr - Full-Stack Developer & UI/UX Designer',
    description:
      'Portfolio showcasing modern web development projects with Vue.js, Nuxt, and TypeScript.',
    ogType: 'profile',
  })

  useSchemaOrg([
    definePerson({
      name: 'Majed Sief Alnasr',
      jobTitle: 'Full-Stack Developer & UI/UX Designer',
      description:
        'Experienced developer specializing in Vue.js, Nuxt, TypeScript, and modern web technologies.',
      url: 'https://majedsiefalnasr.dev',
      sameAs: ['https://github.com/majedsiefalnasr', 'https://linkedin.com/in/majedsiefalnasr'],
      knowsAbout: ['Vue.js', 'Nuxt', 'TypeScript', 'UI/UX Design', 'SEO'],
    }),
  ])
</script>
```

### Custom SEO Utilities

#### Meta Tag Builder

```typescript
// app/utils/seo/meta-builder.ts
import type {SEOMetadata} from '~/types/seo'

export const buildMetaTags = (metadata: SEOMetadata) => {
  const siteUrl = 'https://majedsiefalnasr.dev'

  return {
    title: metadata.title,
    description: metadata.description,
    ogTitle: metadata.ogTitle || metadata.title,
    ogDescription: metadata.ogDescription || metadata.description,
    ogImage: metadata.ogImage
      ? `${siteUrl}${metadata.ogImage}`
      : `${siteUrl}/images/og/default.png`,
    ogType: metadata.ogType || 'website',
    canonical: metadata.canonical || `${siteUrl}${useRoute().path}`,
    twitterCard: 'summary_large_image',
  }
}
```

#### Frontmatter Validator

```typescript
// app/utils/seo/validators.ts
import {z} from 'zod'

export const validateSEOFrontmatter = (frontmatter: any) => {
  const warnings: string[] = []

  // Check title length
  if (frontmatter.seo?.title) {
    const length = frontmatter.seo.title.length
    if (length < 30 || length > 60) {
      warnings.push(`SEO title is ${length} characters (recommended: 30-60)`)
    }
  }

  // Check description length
  if (frontmatter.seo?.description) {
    const length = frontmatter.seo.description.length
    if (length < 120 || length > 160) {
      warnings.push(`SEO description is ${length} characters (recommended: 120-160)`)
    }
  }

  return {valid: warnings.length === 0, warnings}
}
```

### Testing SEO Implementation

#### 1. Local Development

```bash
# Start dev server
bun run dev

# Visit these URLs to test:
# - Homepage: http://localhost:3000
# - Blog post: http://localhost:3000/blog/2026/your-post-slug
# - Case study: http://localhost:3000/case-studies/your-case-slug
```

#### 2. Validate Meta Tags

View page source and verify:

```html
<title>Your SEO Title</title>
<meta name="description" content="Your SEO description" />
<meta property="og:title" content="Your OG title" />
<meta property="og:description" content="Your OG description" />
<meta property="og:image" content="https://majedsiefalnasr.dev/images/..." />
<meta property="og:type" content="article" />
<link rel="canonical" href="https://majedsiefalnasr.dev/..." />
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    ...
  }
</script>
```

#### 3. Test Social Sharing

**Facebook Debugger**: https://developers.facebook.com/tools/debug/
**Twitter Card Validator**: https://cards-dev.twitter.com/validator
**LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

Paste your URL and verify the preview displays correctly.

#### 4. Lighthouse SEO Audit

```bash
# Build the site
bun run generate

# Preview production build
bun run preview

# Run Lighthouse (in Chrome DevTools)
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Select "SEO" category
# 4. Click "Analyze page load"
# Target: SEO score ≥ 95
```

#### 5. Schema.org Validation

**Rich Results Test**: https://search.google.com/test/rich-results

Paste your URL or code to validate structured data. Ensure no errors or warnings.

---

## Common Patterns

### Pattern 1: Fallback Logic for SEO Fields

```typescript
// If author provides custom SEO title, use it
// Otherwise, use display title
const seoTitle = post.seo?.title || post.title

// If author provides custom SEO description, use it
// Otherwise, use excerpt
const seoDescription = post.seo?.description || post.excerpt

// If author provides custom OG image, use it
// Otherwise, use featured image
// Otherwise, use default OG image
const seoImage = post.seo?.ogImage || post.featuredImage || '/images/og/default.png'
```

### Pattern 2: Dynamic Sitemap Routes

```typescript
// server/api/__sitemap__/blog.ts
export default defineSitemapEventHandler(async () => {
  const posts = await queryContent('blog')
    .where({'seo.noindex': {$ne: true}}) // Exclude noindex posts
    .find()

  return posts.map(post => ({
    loc: post._path,
    lastmod: post.date,
    changefreq: 'monthly',
    priority: 0.8,
  }))
})
```

### Pattern 3: Bilingual Hreflang Tags

```typescript
// Automatically generated in pages with i18n
const {locale, locales} = useI18n()
const route = useRoute()

useHead({
  link: [
    // Self-referential canonical
    {rel: 'canonical', href: `https://majedsiefalnasr.dev${route.path}`},
    // Hreflang for each language
    ...locales.value.map(loc => ({
      rel: 'alternate',
      hreflang: loc.code,
      href: `https://majedsiefalnasr.dev${localePath(route.path, loc.code)}`,
    })),
    // Default language
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `https://majedsiefalnasr.dev${route.path}`,
    },
  ],
})
```

---

## Troubleshooting

### Issue: OG image not showing on social media

**Solution**:

1. Ensure image URL is absolute (includes `https://majedsiefalnasr.dev`)
2. Verify image is exactly 1200x630 pixels
3. Clear social media cache using debugger tools
4. Check image is accessible (not blocked by robots.txt)

### Issue: SEO title/description warnings in console

**Solution**: These are guidance warnings, not errors. Adjust character counts:

- Title: 30-60 characters
- Description: 120-160 characters

### Issue: Sitemap not including new content

**Solution**:

1. Rebuild the site: `bun run generate`
2. Verify content doesn't have `seo.noindex: true`
3. Check `/public/sitemap.xml` after build

### Issue: Structured data validation errors

**Solution**:

1. Use Schema.org validator to identify specific error
2. Check contract files in `specs/005-seo-optimization/contracts/`
3. Ensure required fields (headline, author, datePublished) are present

---

## Next Steps

1. **Add SEO metadata** to existing blog posts and case studies
2. **Create default OG image** (1200x630px) at `/public/images/og/default.png`
3. **Test social sharing** on all major platforms
4. **Run Lighthouse audit** to verify SEO score ≥ 95
5. **Submit sitemap** to Google Search Console
6. **Monitor rankings** and adjust metadata based on performance

---

## Image Optimization Checklist for Content Authors

To ensure optimal page performance and Core Web Vitals compliance, follow these guidelines when adding images to your blog posts and case studies:

### Image Requirements

- [ ] **Format**: Use modern formats (WebP, AVIF) with JPEG/PNG fallback. Nuxt Image handles conversion automatically.
- [ ] **Dimensions**: Always specify `width` and `height` attributes to prevent Cumulative Layout Shift (CLS)
- [ ] **Alt Text**: Provide descriptive alt text for accessibility and SEO (recommended: under 125 characters)
- [ ] **File Size**: Optimize images before upload - target < 200KB per image
- [ ] **Naming**: Use descriptive, SEO-friendly filenames (e.g., `nuxt-api-tutorial.jpg` instead of `IMG_1234.jpg`)

### Open Graph Images

- [ ] **Size**: Must be exactly 1200x630 pixels (1.91:1 aspect ratio)
- [ ] **Format**: Use JPEG or PNG (WebP not widely supported by social platforms)
- [ ] **File Size**: Target < 1MB for fast loading on social media previews
- [ ] **Text**: Avoid small text - minimum 40px font size for readability in previews
- [ ] **Testing**: Validate with Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Post Inspector

### Featured Images

- [ ] **Minimum Size**: At least 800x600 pixels for high-quality display
- [ ] **Aspect Ratio**: 16:9 or 4:3 recommended for consistency
- [ ] **Above Fold**: Featured images on blog posts should use `loading="eager"` for faster LCP
- [ ] **Below Fold**: Other images use `loading="lazy"` (default behavior)

### Using NuxtImg Component

```vue
<!-- Featured image (above fold) -->
<NuxtImg
  src="/images/blog/my-post.jpg"
  alt="Descriptive alt text"
  width="1200"
  height="630"
  loading="eager"
  class="w-full rounded-lg" />

<!-- Content image (below fold) -->
<NuxtImg
  src="/images/blog/diagram.png"
  alt="Architecture diagram showing API flow"
  width="800"
  height="600"
  loading="lazy"
  class="w-full" />
```

### Performance Targets

- [ ] **LCP (Largest Contentful Paint)**: < 2.5 seconds
- [ ] **CLS (Cumulative Layout Shift)**: < 0.1
- [ ] **Total Image Weight**: < 1MB per page (sum of all images)
- [ ] **First Contentful Paint**: < 1.8 seconds

### Common Mistakes to Avoid

❌ **Don't**: Use images without width/height attributes  
✅ **Do**: Always specify dimensions to prevent layout shift

❌ **Don't**: Use oversized images (e.g., 4000x3000 for a 400px display)  
✅ **Do**: Use appropriate sizes and let Nuxt Image generate responsive variants

❌ **Don't**: Skip alt text or use generic descriptions  
✅ **Do**: Write descriptive, context-specific alt text

❌ **Don't**: Use `loading="eager"` for all images  
✅ **Do**: Reserve eager loading for above-fold critical images only

### Verification Tools

- **Lighthouse**: Run performance audit to verify Core Web Vitals
- **PageSpeed Insights**: Check real-world performance data
- **WebPageTest**: Detailed filmstrip and waterfall analysis
- **Chrome DevTools**: Network panel to inspect image sizes and loading

---

## Resources

- [Schema.org Documentation](https://schema.org/)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Nuxt SEO Module](https://nuxtseo.com/)
- [Core Web Vitals](https://web.dev/vitals/)

**Questions?** Refer to [data-model.md](./data-model.md) for detailed type definitions and [research.md](./research.md) for implementation decisions.
