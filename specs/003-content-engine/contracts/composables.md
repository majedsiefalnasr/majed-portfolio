# Composable Contracts

**Date**: January 13, 2026

All composables use Vue 3 Composition API and follow Nuxt auto-import conventions.

---

## Content Query Composables

### useContentQuery

**Purpose**: Type-safe wrapper for Nuxt Content queries with common filters

**Signature**:

```typescript
function useContentQuery<T = BlogPost | CaseStudy>(
  path: string,
  options?: ContentQueryOptions
): Promise<{
  data: Ref<T[]>
  pending: Ref<boolean>
  error: Ref<Error | null>
  refresh: () => Promise<void>
}>

interface ContentQueryOptions {
  where?: Record<string, any>
  sort?: Record<string, 1 | -1>
  limit?: number
  skip?: number
  excludeDrafts?: boolean // Default: true
}
```

**Behavior**:

- Automatically excludes draft files (underscore prefix) unless `excludeDrafts: false`
- Returns reactive refs for data, pending, error states
- Provides refresh function for manual refetch
- Uses `useAsyncData` internally for SSR compatibility

**Usage Example**:

```typescript
const {data: posts, pending} = await useContentQuery<BlogPost>('/blog', {
  sort: {date: -1},
  limit: 10,
})
```

---

### useContentFilter

**Purpose**: Client-side content filtering with state management

**Signature**:

```typescript
function useContentFilter<T extends {tags?: string[]}>(
  items: ComputedRef<T[]> | Ref<T[]>
): {
  selectedTag: Ref<string | null>
  filteredItems: ComputedRef<T[]>
  availableTags: ComputedRef<string[]>
  tagCounts: ComputedRef<Record<string, number>>
  selectTag: (tag: string | null) => void
  clearFilter: () => void
}
```

**Behavior**:

- Manages filter state with `useState` for cross-component sharing
- Computes filtered items based on selected tag
- Extracts unique tags from all items
- Calculates post count per tag
- Syncs with URL query params (`?tag=typescript`)
- Clears filter when same tag clicked twice

**Usage Example**:

```typescript
const {data: posts} = await useContentQuery('/blog')
const {selectedTag, filteredItems, availableTags} = useContentFilter(posts)
```

---

### useReadTime

**Purpose**: Calculate estimated reading time from content

**Signature**:

```typescript
function useReadTime(content: string | ParsedContent): number

interface ParsedContent {
  body?: {
    children?: Array<{type: string; value?: string}>
  }
}
```

**Behavior**:

- Accepts raw text string or parsed Nuxt Content object
- Strips HTML/markdown syntax
- Counts words (splits on whitespace)
- Uses 200 words per minute average reading speed
- Multiplies code blocks by 1.5x (slower to read)
- Rounds up to nearest minute
- Minimum 1 minute

**Usage Example**:

```typescript
const readTime = useReadTime(post.body) // Returns: 5 (minutes)
```

---

## Navigation Composables

### useContentNavigation

**Purpose**: Generate previous/next navigation links for content pages

**Signature**:

```typescript
function useContentNavigation(
  currentPath: string,
  collection: 'blog' | 'case-studies'
): Promise<{
  previous: Ref<ContentNavItem | null>
  next: Ref<ContentNavItem | null>
}>

interface ContentNavItem {
  title: string
  _path: string
  date?: string
}
```

**Behavior**:

- Fetches all items in collection
- Sorts by date (chronological)
- Finds current item position
- Returns adjacent items
- Handles edge cases (first/last item)
- Returns null for previous/next when not available

**Usage Example**:

```typescript
const {previous, next} = await useContentNavigation(route.path, 'blog')
```

---

## SEO Composables

### useContentSEO

**Purpose**: Generate SEO meta tags for content pages

**Signature**:

```typescript
function useContentSEO(content: BlogPost | CaseStudy, type: 'article' | 'project'): void
```

**Behavior**:

- Sets page title from content.title
- Sets meta description from content.excerpt
- Generates OpenGraph tags (og:title, og:description, og:image)
- Generates Twitter Card tags
- Adds JSON-LD structured data using `useSchemaOrg`
- For articles: adds `datePublished`, `dateModified`, `author`
- For projects: adds custom properties
- Handles missing featured images with fallback

**Usage Example**:

```typescript
const {data: post} = await useAsyncData(/* ... */)
useContentSEO(post.value, 'article')
```

---

## Internationalization Composables

### useContentLocale

**Purpose**: Handle content translation and locale-aware queries

**Signature**:

```typescript
function useContentLocale(): {
  locale: Ref<'en' | 'ar'>
  queryWithLocale: <T>(path: string, options?: QueryOptions) => Promise<T>
  getTranslation: (content: ContentWithLocale) => ContentWithLocale | null
}

interface ContentWithLocale {
  lang?: 'en' | 'ar'
  _path: string
}
```

**Behavior**:

- Gets current locale from Nuxt i18n
- Filters content by language in queries
- Falls back to default locale (en) when translation missing
- Handles both `.ar.md` suffix and locale directories
- Updates locale when language switched

**Usage Example**:

```typescript
const {queryWithLocale} = useContentLocale()
const posts = await queryWithLocale('/blog', {sort: {date: -1}})
```

---

## Utility Composables

### useExcerpt

**Purpose**: Generate excerpt from content body if not in frontmatter

**Signature**:

```typescript
function useExcerpt(
  content: {excerpt?: string; body?: ParsedContent},
  maxLength: number = 150
): string
```

**Behavior**:

- Returns frontmatter excerpt if exists
- Otherwise extracts from content body
- Strips markdown/HTML syntax
- Truncates to maxLength at word boundary
- Adds ellipsis (...) if truncated
- Handles edge cases (empty content, very short content)

**Usage Example**:

```typescript
const excerpt = useExcerpt(post, 200)
```

---

### useContentImages

**Purpose**: Extract and optimize image paths from content

**Signature**:

```typescript
function useContentImages(content: ParsedContent): {
  featuredImage: string | null
  allImages: string[]
  getOptimizedUrl: (src: string, size?: ImageSize) => string
}

type ImageSize = 'thumbnail' | 'medium' | 'large' | 'full'
```

**Behavior**:

- Extracts featured image from frontmatter
- Parses content body for all image references
- Returns array of unique image paths
- Provides helper to generate Nuxt Image URLs with sizing
- Handles relative and absolute paths

**Usage Example**:

```typescript
const {featuredImage, getOptimizedUrl} = useContentImages(post)
const thumbnail = getOptimizedUrl(featuredImage, 'medium')
```

---

## Error Handling

All composables follow consistent error handling:

1. **Network errors**: Caught and returned in `error` ref
2. **Validation errors**: Throw with descriptive message
3. **Not found**: Return null/empty array, don't throw
4. **Type errors**: Caught by TypeScript at compile time

---

## Testing Contracts

Each composable must have tests covering:

1. **Happy path** - Returns expected data with valid inputs
2. **Empty state** - Handles empty/null inputs gracefully
3. **Error cases** - Handles and reports errors correctly
4. **Type safety** - TypeScript types are accurate
5. **Reactivity** - Refs update when dependencies change
6. **SSR compatibility** - Works in server and client context
