/**
 * SEO Type Definitions
 *
 * Type definitions for SEO metadata, structured data, and content frontmatter extensions.
 * Based on data-model.md specifications.
 *
 * @see specs/005-seo-optimization/data-model.md
 */

/**
 * Complete SEO metadata for any page (static or dynamic content)
 */
export interface SEOMetadata {
  // Basic Meta Tags
  title: string // Page title (<title> tag)
  description: string // Meta description
  titleTemplate?: string | boolean | null // Title template (default: appends site name)
  keywords?: string[] // Meta keywords

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

/**
 * Alternate language link for hreflang tags
 */
export interface AlternateLink {
  hreflang: string // Language code (e.g., 'en', 'ar', 'x-default')
  href: string // Absolute URL to alternate version
}

/**
 * Robots meta tag directives
 */
export type RobotsDirective =
  | 'index,follow'
  | 'noindex,follow'
  | 'index,nofollow'
  | 'noindex,nofollow'

/**
 * Custom SEO fields that can be added to content frontmatter
 */
export interface SEOFrontmatter {
  title?: string // Custom SEO title (overrides display title)
  description?: string // Custom meta description (overrides excerpt)
  ogImage?: string // Custom OG image (overrides featuredImage)
  keywords?: string[] // Additional keywords for meta keywords tag
  noindex?: boolean // Prevent indexing (default: false)
}

/**
 * Image metadata for SEO optimization
 */
export interface ImageMetadata {
  src: string // Image source URL (relative or absolute)
  alt: string // Alt text for accessibility and SEO
  width: number // Image width in pixels
  height: number // Image height in pixels
  format?: 'jpeg' | 'png' | 'webp' // Image format
}

/**
 * Sitemap entry for XML sitemap generation
 */
export interface SitemapEntry {
  loc: string // URL location (absolute)
  lastmod?: string // Last modification date (ISO 8601)
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number // Priority 0.0 to 1.0
  alternateLinks?: AlternateLink[] // Alternate language versions
}

/**
 * Structured data base interface (Schema.org)
 */
export interface StructuredDataBase {
  '@context': 'https://schema.org'
  '@type': string
}

/**
 * Article schema for blog posts (Schema.org)
 */
export interface ArticleSchema extends StructuredDataBase {
  '@type': 'Article' | 'BlogPosting' | 'TechArticle'
  headline: string // Title of the article
  description?: string // Article description
  image?: string | string[] // Featured image(s)
  author: {
    '@type': 'Person'
    name: string
  }
  datePublished: string // ISO 8601 date
  dateModified?: string // ISO 8601 date
  publisher?: {
    '@type': 'Organization' | 'Person'
    name: string
    logo?: {
      '@type': 'ImageObject'
      url: string
    }
  }
  keywords?: string[] // Article keywords/tags
}

/**
 * CreativeWork schema for case studies (Schema.org)
 */
export interface CreativeWorkSchema extends StructuredDataBase {
  '@type': 'CreativeWork'
  name: string // Case study title
  description: string // Case study description
  author: {
    '@type': 'Person'
    name: string
  }
  datePublished: string // ISO 8601 date
  keywords?: string[] // Tags
  about?: string // Subject matter
}

/**
 * Person schema for homepage (Schema.org)
 */
export interface PersonSchema extends StructuredDataBase {
  '@type': 'Person'
  name: string // Full name
  description?: string // Bio/description
  jobTitle?: string // Professional title
  url?: string // Personal website URL
  sameAs?: string[] // Social media profile URLs
  image?: string // Profile picture
}

/**
 * BreadcrumbList schema for navigation (Schema.org)
 */
export interface BreadcrumbListSchema extends StructuredDataBase {
  '@type': 'BreadcrumbList'
  itemListElement: BreadcrumbItem[]
}

/**
 * Individual breadcrumb item
 */
export interface BreadcrumbItem {
  '@type': 'ListItem'
  position: number // 1-indexed position
  name: string // Breadcrumb label
  item?: string // URL (omit for current page)
}
