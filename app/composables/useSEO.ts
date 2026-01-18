/**
 * useSEO Composable
 *
 * Main composable for managing SEO meta tags across the application.
 * Wraps Nuxt's useSeoMeta() with intelligent defaults and fallbacks.
 *
 */

import type {SEOMetadata} from '~/types/seo'
import {
  buildLinkTags,
  buildMetaTags,
  truncateDescription,
  truncateTitle,
} from '~/utils/seo/meta-builder'

/**
 * Composable for setting SEO meta tags
 * Provides intelligent defaults and automatic fallbacks
 *
 * @param metadata - SEO metadata configuration
 *
 * @example
 * // Basic usage
 * useSEO({
 *   title: 'My Blog Post',
 *   description: 'This is a great blog post about TypeScript',
 * })
 *
 * @example
 * // With custom OG tags
 * useSEO({
 *   title: 'Case Study: E-commerce Platform',
 *   description: 'Building a scalable e-commerce solution',
 *   ogImage: '/images/case-studies/ecommerce.png',
 *   ogType: 'article',
 * })
 *
 * @example
 * // With language support
 * useSEO({
 *   title: 'مدونة تقنية',
 *   description: 'محتوى تقني باللغة العربية',
 *   lang: 'ar',
 *   alternateLinks: [
 *     { hreflang: 'en', href: '/blog/tech-post' },
 *     { hreflang: 'ar', href: '/ar/blog/tech-post' },
 *     { hreflang: 'x-default', href: '/blog/tech-post' },
 *   ],
 * })
 */
export function useSEO(metadata: SEOMetadata) {
  // Truncate title and description if needed
  const processedMetadata: SEOMetadata = {
    ...metadata,
    title: metadata.title.length > 60 ? truncateTitle(metadata.title) : metadata.title,
    description:
      metadata.description.length > 160
        ? truncateDescription(metadata.description)
        : metadata.description,
  }

  // Build meta tags using utility
  const metaTags = buildMetaTags(processedMetadata)

  // Set meta tags using Nuxt's useSeoMeta
  useSeoMeta(metaTags)

  // Handle titleTemplate separately if needed
  if (processedMetadata.titleTemplate !== undefined) {
    useSeoMeta({titleTemplate: processedMetadata.titleTemplate as string})
  }

  // Build and set link tags for canonical and hreflang
  const linkTags = buildLinkTags(processedMetadata)

  if (linkTags.length > 0) {
    useHead({
      link: linkTags,
    })
  }
}

/**
 * Composable for content-based SEO
 * Automatically generates SEO metadata from content frontmatter
 *
 * @param content - Content object (blog post or case study)
 * @param options - Additional SEO options
 *
 * @example
 * // In blog post page
 * const { data: post } = await useAsyncData('blog-post', () =>
 *   queryContent('blog', slug).findOne()
 * )
 *
 * useContentSEO(post.value, {
 *   ogType: 'article',
 *   canonical: `/blog/${slug}`,
 * })
 */
export function useContentSEO(
  content: {
    title: string
    excerpt?: string
    description?: string
    featuredImage?: string
    seo?: {
      title?: string
      description?: string
      ogImage?: string
      keywords?: string[]
      noindex?: boolean
    }
    lang?: 'en' | 'ar'
    sameAs?: string[]
    _path?: string
  },
  options?: {
    ogType?: 'website' | 'article' | 'profile'
    canonical?: string
    alternateLinks?: Array<{hreflang: string; href: string}>
  }
) {
  // Resolve title (priority: seo.title > title)
  const title = content.seo?.title || content.title

  // Resolve description (priority: seo.description > excerpt > description)
  const description = content.seo?.description || content.excerpt || content.description || ''

  // Resolve OG image (priority: seo.ogImage > featuredImage > default)
  const ogImage = content.seo?.ogImage || content.featuredImage

  // Resolve keywords (not used directly here, but could be added to meta tags if needed)
  const keywords = content.seo?.keywords || []

  // Determine robots directive
  const robots = content.seo?.noindex ? 'noindex,follow' : 'index,follow'

  // Generate alternate links from sameAs if not provided
  let alternateLinks = options?.alternateLinks
  if (!alternateLinks && content.sameAs && content._path) {
    const config = useRuntimeConfig()
    const siteUrl = (config.public?.siteUrl as string | undefined) || 'https://majedsiefalnasr.dev'

    alternateLinks = [
      {hreflang: content.lang || 'en', href: `${siteUrl}${content._path}`},
      ...(content.sameAs
        .map(path => {
          const langMatch = path.match(/\/(en|ar)\//)
          return langMatch ? {hreflang: langMatch[1] as string, href: `${siteUrl}${path}`} : null
        })
        .filter(Boolean) as Array<{hreflang: string; href: string}>),
    ]
  }

  // Build SEO metadata
  const metadata: SEOMetadata = {
    title,
    description,
    ogImage,
    keywords,
    ogType: options?.ogType,
    canonical: options?.canonical,
    lang: content.lang,
    alternateLinks,
    robots,
  }

  // Apply SEO metadata
  useSEO(metadata)
}

/**
 * Composable for homepage SEO
 * Provides specific defaults for the main homepage
 *
 * @param options - Homepage SEO options
 */
export function useHomepageSEO(options?: {
  name?: string
  tagline?: string
  description?: string
  image?: string
  lang?: 'en' | 'ar'
  keywords?: string[]
}) {
  const config = useRuntimeConfig()
  const siteUrl = (config.public?.siteUrl as string | undefined) || 'https://majedsiefalnasr.dev'

  const defaultTitle = options?.name || 'Majed Sief Alnasr'
  const defaultTagline = options?.tagline || 'CX & Product Designer'
  const defaultDescription =
    options?.description ||
    'Portfolio showcasing full-stack development projects, case studies, and technical blog posts. Specialized in TypeScript, Vue.js, Nuxt, and modern web technologies.'

  const defaultKeywords = options?.keywords || [
    'portfolio',
    'full-stack development',
    'case studies',
    'technical blog',
    'TypeScript',
    'Vue.js',
    'Nuxt',
    'web technologies',
  ]

  useSEO({
    title: `${defaultTitle} | ${defaultTagline}`,
    description: defaultDescription,
    keywords: defaultKeywords,
    ogType: 'profile',
    ogImage: options?.image || '/images/og/default.png',
    lang: options?.lang || 'en',
    canonical: siteUrl || '/',
    titleTemplate: false, // Don't append site name to homepage title
  })
}
