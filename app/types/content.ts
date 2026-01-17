/**
 * Type Definitions: Content Engine
 *
 * Shared TypeScript types for blog posts, case studies, and content infrastructure.
 * Note: H1 auto-generated from frontmatter title; markdown content uses H2-H6
 */

import type {ParsedContentv2 as NuxtParsedContent} from '@nuxt/content'
import type {SEOFrontmatter} from './seo'

// ============================================================================
// Core Content Types
// ============================================================================

/**
 * Base metadata shared across all content types
 */
export interface ContentMetadata {
  title: string
  date: string // ISO8601 format
  author?: string
  tags?: string[]
  excerpt?: string
  featuredImage?: string
  updatedAt?: string
  lang?: 'en' | 'ar'
  sameAs?: string[] // Array of _path strings for other language variants
  _path: string
  _id: string
}

/**
 * Blog post entity
 * File location: /content/blog/{lang}/YYYY/post-slug.md
 */
export interface BlogPost extends ContentMetadata {
  // Frontmatter fields
  title: string
  date: string
  author?: string
  tags?: string[]
  excerpt?: string
  featuredImage?: string
  updatedAt?: string
  lang?: 'en' | 'ar'

  // SEO Extensions (optional)
  seo?: SEOFrontmatter

  // Nuxt Content computed fields
  _path: string
  _id: string
  body?: NuxtParsedContent

  // Runtime computed
  readTime?: number
  slug?: string
  year?: number
}

/**
 * Case study entity
 * File location: /content/case-studies/{lang}/YYYY/project-slug.md
 */
export interface CaseStudy extends ContentMetadata {
  // Required fields
  title: string
  client: string
  date: string
  role: string
  timeline: string
  tags: string[]
  featuredImage: string

  // Optional fields
  excerpt?: string
  testimonial?: Testimonial
  metrics?: Metric[]
  featured?: boolean
  order?: number
  lang?: 'en' | 'ar'

  // SEO Extensions (optional)
  seo?: SEOFrontmatter

  // Nuxt Content computed
  _path: string
  _id: string
  body?: NuxtParsedContent

  // Runtime computed
  readTime?: number
  slug?: string
  year?: number
}

/**
 * Client testimonial structure
 */
export interface Testimonial {
  quote: string
  author: string
  position: string
}

/**
 * Performance metric or result
 */
export interface Metric {
  label: string
  value: string
  icon?: string
}

// ============================================================================
// Content Query Types
// ============================================================================

/**
 * Options for content queries
 */
export interface ContentQueryOptions {
  path?: string
  where?: Record<string, string | number | boolean>
  sort?: Record<string, 1 | -1>
  limit?: number
  skip?: number
  excludeDrafts?: boolean
}

/**
 * Result of content query operations
 */
export interface ContentQueryResult<T> {
  data: Ref<T[]>
  pending: Ref<boolean>
  error: Ref<Error | null>
  refresh: () => Promise<void>
}

// ============================================================================
// Filter & Navigation Types
// ============================================================================

/**
 * Tag filter state
 */
export interface TagFilter {
  selectedTag: string | null
  availableTags: string[]
  filteredCount: number
}

/**
 * Tag with post count
 */
export interface TagWithCount {
  name: string
  count: number
  slug: string
}

/**
 * Content navigation item (previous/next links)
 */
export interface ContentNavItem {
  title: string
  _path: string
  date?: string
}

/**
 * Navigation result
 */
export interface ContentNavigation {
  previous: ContentNavItem | null
  next: ContentNavItem | null
}

// ============================================================================
// Component Prop Types
// ============================================================================

/**
 * BlogList component props
 */
export interface BlogListProps {
  posts: BlogPost[]
  initialTag?: string
}

/**
 * BlogPostCard component props
 */
export interface BlogPostCardProps {
  post: BlogPost
  showExcerpt?: boolean
  showTags?: boolean
}

/**
 * BlogPostMeta component props
 */
export interface BlogPostMetaProps {
  date: string
  readTime: number
  tags?: string[]
  author?: string
  showTags?: boolean
  showAuthor?: boolean
}

/**
 * CaseStudyList component props
 */
export interface CaseStudyListProps {
  caseStudies: CaseStudy[]
  showFeaturedFirst?: boolean
  layout?: 'grid' | 'list'
  initialTag?: string
}

/**
 * CaseStudyCard component props
 */
export interface CaseStudyCardProps {
  caseStudy: CaseStudy
  featured?: boolean
}

/**
 * CaseStudyMetrics component props
 */
export interface CaseStudyMetricsProps {
  metrics: Metric[]
  layout?: 'grid' | 'inline'
}

/**
 * ContentImage component props (MDC)
 */
export interface ContentImageProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  lazy?: boolean
}

/**
 * CodeBlock component props (MDC)
 */
export interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  highlights?: number[]
  showLineNumbers?: boolean
}

/**
 * CodeComparison component props (MDC)
 */
export interface CodeComparisonProps {
  language?: string
  labels?: [string, string]
}

/**
 * ImageGallery component props (MDC)
 */
export interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
  columns?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
}

// ============================================================================
// Route Types
// ============================================================================

/**
 * Blog index page query params
 */
export interface BlogIndexQuery {
  tag?: string
}

/**
 * Blog post page params
 */
export interface BlogPostParams {
  slug: string | string[]
}

/**
 * Case studies index page query params
 */
export interface CaseStudiesIndexQuery {
  tag?: string
}

/**
 * Case study page params
 */
export interface CaseStudyParams {
  slug: string | string[]
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Image size presets for optimization
 */
export type ImageSize = 'thumbnail' | 'medium' | 'large' | 'full'

/**
 * Content collection type
 */
export type ContentCollection = 'blog' | 'case-studies'

/**
 * Content type discriminator
 */
export type ContentType = 'article' | 'project'

/**
 * Supported locales
 */
export type Locale = 'en' | 'ar'

/**
 * Content with locale information
 */
export interface ContentWithLocale {
  lang?: Locale
  _path: string
}

// ============================================================================
// Validation Types
// ============================================================================

/**
 * Frontmatter validation schema
 */
export interface FrontmatterValidation {
  required: string[]
  optional: string[]
  types: Record<string, string>
  ranges: Record<string, {min?: number; max?: number}>
}

/**
 * Validation error
 */
export interface ValidationError {
  field: string
  message: string
  file: string
}

// ============================================================================
// SEO Types
// ============================================================================

/**
 * Schema.org Article type
 */
export interface ArticleSchema {
  '@context': 'https://schema.org'
  '@type': 'Article' | 'BlogPosting'
  headline: string
  datePublished: string
  dateModified?: string
  author: {
    '@type': 'Person'
    name: string
  }
  image?: string
  description?: string
}

/**
 * Schema.org CreativeWork type for case studies
 */
export interface CreativeWorkSchema {
  '@context': 'https://schema.org'
  '@type': 'CreativeWork'
  name: string
  author: {
    '@type': 'Person'
    name: string
  }
  dateCreated: string
  image?: string
  description?: string
}
