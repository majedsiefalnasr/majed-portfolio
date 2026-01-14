# Page Contracts

**Date**: January 13, 2026

All pages use Nuxt file-system routing and follow SSG (Static Site Generation) patterns.

---

## Blog Pages

### `/pages/blog/index.vue`

**Route**: `/blog` (English) or `/ar/blog` (Arabic)

**Route Params**: None

**Query Params**:

```typescript
interface BlogIndexQuery {
  tag?: string // Filter by tag (e.g., ?tag=typescript)
}
```

**Data Fetching**:

```typescript
const {data: posts} = await useAsyncData('blog-posts', () =>
  queryContent<BlogPost>('/blog')
    .where({_path: {$not: {$regex: '/_'}}}) // Exclude drafts
    .sort({date: -1})
    .find()
)
```

**Page Meta**:

```typescript
useHead({
  title: 'Blog - Majed Sief Alnasr',
  meta: [
    {
      name: 'description',
      content:
        'Technical articles and insights on web development, TypeScript, and modern frameworks.',
    },
  ],
})
```

**Components Used**:

- `BlogList` - Main post list with filtering
- `BlogPostCard` - Individual post cards

**Behavior**:

- Lists all published blog posts
- Tag filtering from query param or user selection
- Updates URL when filter changes (client-side navigation)
- Shows empty state if no posts match filter
- Responsive layout (single column)
- Pagination: Not in initial release (all posts loaded)

---

### `/pages/blog/[...slug].vue`

**Route**: `/blog/{slug}` or `/blog/{year}/{slug}` (both patterns supported)

**Route Params**:

```typescript
interface BlogPostParams {
  slug: string | string[] // Catch-all for year/slug pattern
}
```

**Query Params**: None

**Data Fetching**:

```typescript
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

const {data: post} = await useAsyncData(`blog-${slug}`, () =>
  queryContent<BlogPost>(`/blog/${slug}`).findOne()
)

// 404 if post not found or is draft
if (!post.value || post.value._path.includes('/_')) {
  throw createError({statusCode: 404, statusMessage: 'Post not found'})
}

// Navigation links
const {previous, next} = await useContentNavigation(post.value._path, 'blog')
```

**Page Meta**:

```typescript
useContentSEO(post.value, 'article')

useHead({
  title: `${post.value.title} - Majed Sief Alnasr`,
  meta: [
    {name: 'description', content: post.value.excerpt},
    {property: 'og:type', content: 'article'},
    {property: 'article:published_time', content: post.value.date},
    {property: 'article:author', content: post.value.author},
  ],
})
```

**Components Used**:

- `ContentRenderer` - Renders markdown with MDC components
- `BlogPostMeta` - Date, read time, tags
- Previous/Next navigation links

**Behavior**:

- Renders full blog post content
- Syntax highlighting for code blocks
- Embedded MDC components render inline
- Table of contents (generated from H2/H3 headings)
- Previous/Next post navigation
- Share buttons (optional)
- Back to blog list link
- Smooth scroll to anchors

---

## Case Study Pages

### `/pages/case-studies/index.vue`

**Route**: `/case-studies` or `/ar/case-studies`

**Route Params**: None

**Query Params**:

```typescript
interface CaseStudiesIndexQuery {
  tag?: string // Filter by technology/skill
}
```

**Data Fetching**:

```typescript
const {data: caseStudies} = await useAsyncData('case-studies', () =>
  queryContent<CaseStudy>('/case-studies')
    .where({_path: {$not: {$regex: '/_'}}}) // Exclude drafts
    .sort([
      {featured: -1}, // Featured first
      {order: 1}, // Then custom order
      {date: -1}, // Finally by date
    ])
    .find()
)
```

**Page Meta**:

```typescript
useHead({
  title: 'Case Studies - Majed Sief Alnasr',
  meta: [
    {
      name: 'description',
      content:
        'Portfolio of web development projects and client work showcasing expertise in modern frameworks and best practices.',
    },
  ],
})
```

**Components Used**:

- `CaseStudyList` - Grid showcase of case studies
- `CaseStudyCard` - Individual case study cards

**Behavior**:

- Grid layout (2-3 columns on desktop)
- Featured case studies highlighted
- Tag-based filtering
- Shows client, role, technologies for each study
- Click to view full case study

---

### `/pages/case-studies/[...slug].vue`

**Route**: `/case-studies/{slug}` or `/case-studies/{year}/{slug}`

**Route Params**:

```typescript
interface CaseStudyParams {
  slug: string | string[]
}
```

**Query Params**: None

**Data Fetching**:

```typescript
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

const {data: study} = await useAsyncData(`case-study-${slug}`, () =>
  queryContent<CaseStudy>(`/case-studies/${slug}`).findOne()
)

if (!study.value || study.value._path.includes('/_')) {
  throw createError({statusCode: 404, statusMessage: 'Case study not found'})
}

const {previous, next} = await useContentNavigation(study.value._path, 'case-studies')
```

**Page Meta**:

```typescript
useContentSEO(study.value, 'project')

useHead({
  title: `${study.value.title} - Case Study`,
  meta: [
    {name: 'description', content: study.value.excerpt},
    {property: 'og:type', content: 'website'},
  ],
})
```

**Components Used**:

- `ContentRenderer` - Renders case study content
- `CaseStudyMetrics` - Results/outcomes display
- `ImageGallery` - Project screenshots/visuals
- Testimonial display (if present)

**Behavior**:

- Hero section with featured image
- Client info, role, timeline prominently displayed
- Structured content sections (Problem, Solution, Results)
- Metrics/KPIs highlighted
- Image gallery with lightbox
- Client testimonial (if available)
- Technologies/skills tags
- Previous/Next case study navigation
- Call-to-action (e.g., "View live site" if applicable)

---

## Route Generation

### Static Site Generation

All routes must be pre-rendered at build time:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: async () => {
        const routes: string[] = []

        // Generate blog routes
        const blogPosts = await queryContent('/blog')
          .where({_path: {$not: {$regex: '/_'}}})
          .find()

        routes.push(...blogPosts.map(post => post._path))

        // Generate case study routes
        const caseStudies = await queryContent('/case-studies')
          .where({_path: {$not: {$regex: '/_'}}})
          .find()

        routes.push(...caseStudies.map(study => study._path))

        return routes
      },
    },
  },
})
```

---

## Error Pages

### 404 - Not Found

**Trigger Conditions**:

- Non-existent blog post or case study slug
- Draft content accessed directly (underscore prefix)
- Malformed URL

**Behavior**:

- Custom 404 page with helpful message
- Suggestions: "Browse all blog posts" or "View case studies"
- Search functionality (future enhancement)

---

## Internationalization Routing

### Locale Prefixes

- English (default): `/blog/post-slug`
- Arabic: `/ar/blog/post-slug`

### Translation Detection

Pages check for translated content:

```typescript
const {locale} = useI18n()
const {data: post} = await queryContent(`/blog/${slug}`)
  .where({
    $or: [{lang: locale.value}, {lang: {$exists: false}}],
  })
  .findOne()
```

### Language Switcher

Each page includes alternate language link in head:

```typescript
useHead({
  link: [
    {rel: 'alternate', hreflang: 'en', href: `/blog/${slug}`},
    {rel: 'alternate', hreflang: 'ar', href: `/ar/blog/${slug}`},
  ],
})
```

---

## Performance Requirements

All pages must meet:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Lighthouse Performance**: ≥ 95

Achieved through:

- Static generation (instant navigation)
- Image optimization (NuxtImg)
- Code splitting (automatic)
- Minimal client-side JavaScript

---

## Accessibility Requirements

All pages must provide:

- Semantic HTML structure
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for all images
- Keyboard navigation support
- Focus indicators
- ARIA labels where needed
- Skip to content link
- Color contrast ratios (WCAG AA)

---

## Testing Contracts

Each page must have tests covering:

1. **Data fetching** - Queries return expected content
2. **Error handling** - 404s handled gracefully
3. **Meta tags** - SEO tags generated correctly
4. **Navigation** - Previous/next links work
5. **Filtering** - Tag filters update correctly
6. **i18n** - Locale switching works
7. **Performance** - Lighthouse scores meet thresholds
