# Component Contracts

**Date**: January 13, 2026

All components use Vue 3 Composition API with TypeScript. Props are defined with runtime validation and TypeScript interfaces.

---

## Blog Components

### BlogList

**Purpose**: Display list of blog posts with tag filtering

**Props**:

```typescript
interface BlogListProps {
  posts: BlogPost[] // Array of blog post objects
  initialTag?: string // Pre-selected tag filter (from URL param)
}
```

**Events**:

```typescript
{
  'tag-selected': (tag: string | null) => void  // Emitted when tag filter changes
}
```

**Slots**: None

**Behavior**:

- Renders single-column vertical list of blog post previews
- Shows tag filter chips above list
- Filters posts client-side when tag selected
- Updates URL query param when filter changes
- Shows "No posts found" message when filtered list is empty

---

### BlogPostCard

**Purpose**: Individual blog post preview card for lists

**Props**:

```typescript
interface BlogPostCardProps {
  post: BlogPost // Blog post object with metadata
  showExcerpt?: boolean // Show excerpt text (default: true)
  showTags?: boolean // Show tags (default: true)
}
```

**Events**:

```typescript
{
  'click': (post: BlogPost) => void  // Emitted when card is clicked
}
```

**Slots**: None

**Behavior**:

- Displays title as heading (H2 or H3 depending on context)
- Shows publication date in localized format
- Shows read time estimate
- Shows excerpt (from frontmatter or auto-generated)
- Shows clickable tags
- Entire card is clickable, navigates to post detail
- Featured image optional, shown if provided

---

### BlogPostMeta

**Purpose**: Reusable metadata display (date, read time, tags)

**Props**:

```typescript
interface BlogPostMetaProps {
  date: string // ISO8601 date string
  readTime: number // Minutes
  tags?: string[] // Array of tags
  author?: string // Author name
  showTags?: boolean // Display tags (default: true)
  showAuthor?: boolean // Display author (default: false)
}
```

**Events**: None

**Slots**: None

**Behavior**:

- Formats date using i18n locale
- Displays read time with icon/label
- Tags are clickable, emit navigation event to parent
- Responsive layout (stacks on mobile)

---

## Case Study Components

### CaseStudyList

**Purpose**: Display curated showcase of case studies

**Props**:

```typescript
interface CaseStudyListProps {
  caseStudies: CaseStudy[] // Array of case study objects
  showFeaturedFirst?: boolean // Show featured items at top (default: true)
  layout?: 'grid' | 'list' // Display layout (default: 'grid')
}
```

**Events**:

```typescript
{
  'study-selected': (study: CaseStudy) => void
}
```

**Slots**: None

**Behavior**:

- Grid layout: 2 columns on desktop, 1 on mobile
- Featured items highlighted with border/badge
- Shows client, role, timeline, tags
- Featured image as background or prominent position
- Entire card clickable

---

### CaseStudyCard

**Purpose**: Individual case study preview card

**Props**:

```typescript
interface CaseStudyCardProps {
  caseStudy: CaseStudy
  featured?: boolean // Show featured badge (default: from data)
}
```

**Events**:

```typescript
{
  'click': (study: CaseStudy) => void
}
```

**Slots**: None

**Behavior**:

- Shows project title, client, role
- Shows featured image with overlay gradient
- Shows timeline and key tags
- Featured badge if `featured: true`
- Hover effect with scale/shadow

---

### CaseStudyMetrics

**Purpose**: Display key metrics/results in structured format

**Props**:

```typescript
interface CaseStudyMetricsProps {
  metrics: Metric[] // Array of metric objects
  layout?: 'grid' | 'inline' // Display layout (default: 'grid')
}

interface Metric {
  label: string // Metric name
  value: string // Metric value
  icon?: string // Optional icon name
}
```

**Events**: None

**Slots**: None

**Behavior**:

- Grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile
- Large prominent value display
- Label underneath value
- Optional icon above value
- Animated on scroll (fade in/up)

---

## Content (MDC) Components

### ContentImage

**Purpose**: Enhanced image component for MDC with optimization

**Props**:

```typescript
interface ContentImageProps {
  src: string // Image path (relative or absolute)
  alt: string // Alt text (required for accessibility)
  caption?: string // Optional figure caption
  width?: number // Optional width hint
  height?: number // Optional height hint
  lazy?: boolean // Lazy loading (default: true)
}
```

**Events**: None

**Slots**: None

**Behavior**:

- Wraps NuxtImg with responsive sizing
- Converts to webp format
- Renders as `<figure>` with optional `<figcaption>`
- Prevents layout shift with aspect ratio
- Loading placeholder/blur

---

### CodeBlock

**Purpose**: Enhanced code block with copy button

**Props**:

```typescript
interface CodeBlockProps {
  code: string // Code content
  language?: string // Language for highlighting
  filename?: string // Optional filename display
  highlights?: number[] // Line numbers to highlight
  showLineNumbers?: boolean // Show line numbers (default: false)
}
```

**Events**:

```typescript
{
  'copy': (code: string) => void  // Emitted when copy button clicked
}
```

**Slots**: None

**Behavior**:

- Syntax highlighting via Shiki (SSG)
- Copy to clipboard button in top-right
- Optional filename bar above code
- Line highlighting support
- Dark mode theme switching

---

### CodeComparison

**Purpose**: Side-by-side code comparison for before/after

**Props**:

```typescript
interface CodeComparisonProps {
  language?: string // Language for both sides
  labels?: [string, string] // Custom labels (default: ['Before', 'After'])
}
```

**Events**: None

**Slots**:

```typescript
{
  before: () => VNode // Before code content
  after: () => VNode // After code content
}
```

**Behavior**:

- Two-column layout on desktop, stacked on mobile
- Labels for each column
- Syntax highlighting
- Equal height columns

---

### ImageGallery

**Purpose**: Image gallery with lightbox for case studies

**Props**:

```typescript
interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
  columns?: 2 | 3 | 4 // Gallery columns (default: 3)
  gap?: 'sm' | 'md' | 'lg' // Spacing (default: 'md')
}
```

**Events**:

```typescript
{
  'image-click': (index: number) => void  // Open lightbox at index
}
```

**Slots**: None

**Behavior**:

- Responsive grid layout
- Click to open lightbox modal
- Keyboard navigation in lightbox (arrow keys, escape)
- Image zoom in lightbox
- Lazy loading for all images

---

## Shared Component Patterns

### Loading States

All list components support a loading state:

```typescript
interface ListLoadingProps {
  loading?: boolean
  skeleton?: boolean // Show skeleton instead of spinner
}
```

### Empty States

All list components handle empty data:

```typescript
interface EmptyStateProps {
  emptyMessage?: string // Custom message
  emptyAction?: {
    // Optional action button
    label: string
    onClick: () => void
  }
}
```

### Error States

All data-fetching components handle errors:

```typescript
interface ErrorStateProps {
  error?: Error
  retry?: () => void
}
```

---

## Component Testing Contracts

Each component must have unit tests covering:

1. **Props validation** - Required props, default values, type checking
2. **Event emission** - Correct events emitted with correct payloads
3. **Slot rendering** - Slots render correctly with provided content
4. **Conditional rendering** - Elements show/hide based on props
5. **Accessibility** - ARIA labels, keyboard navigation, focus management
6. **RTL support** - Layout mirrors correctly for Arabic locale

---

## Design System Integration

All components extend Nuxt UI primitives:

- Use `UButton`, `UCard`, `UBadge`, etc. from Nuxt UI
- Follow design tokens from `002-ui-design-system` spec
- Support dark mode via theme composable
- RTL-aware layouts using logical properties
