/**
 * Meta Tag Builder Utility
 *
 * Generates meta tags for SEO with intelligent fallbacks and defaults.
 * Handles title, description, Open Graph, and Twitter Card tags.
 *
 * @see specs/005-seo-optimization/data-model.md
 */

import type {SEOMetadata} from '~/types/seo'

/**
 * Site configuration for SEO
 * TODO: Move to runtime config or environment variables
 */
const SITE_CONFIG = {
  url: 'https://majedsiefalnasr.dev', // TODO: Replace with actual domain
  defaultImage: '/images/og/default.png',
  author: 'Majed Sief Alnasr',
  twitterHandle: '@majedsiefalnasr', // TODO: Update with actual Twitter handle
}

/**
 * Builds complete SEO meta tags from metadata object
 *
 * @param metadata - SEO metadata configuration
 * @returns Object compatible with useSeoMeta() from @nuxtjs/seo
 */
export function buildMetaTags(metadata: SEOMetadata) {
  const {title, description, lang = 'en'} = metadata

  // Build absolute URLs for images
  const ogImageUrl = metadata.ogImage
    ? buildAbsoluteUrl(metadata.ogImage)
    : buildAbsoluteUrl(SITE_CONFIG.defaultImage)

  const twitterImageUrl = metadata.twitterImage
    ? buildAbsoluteUrl(metadata.twitterImage)
    : ogImageUrl

  // Build canonical URL
  const canonicalUrl = metadata.canonical ? buildAbsoluteUrl(metadata.canonical) : undefined

  return {
    // Basic meta tags
    title,
    description,

    // Open Graph tags
    ogTitle: metadata.ogTitle || title,
    ogDescription: metadata.ogDescription || description,
    ogImage: ogImageUrl,
    ogType: metadata.ogType || 'website',
    ogUrl: metadata.ogUrl || canonicalUrl,
    ogSiteName: 'Majed Sief Alnasr | CX & Product Designer',
    ogLocale: lang === 'ar' ? 'ar_SA' : 'en_US',

    // Twitter Card tags
    twitterCard: metadata.twitterCard || 'summary_large_image',
    twitterTitle: metadata.twitterTitle || metadata.ogTitle || title,
    twitterDescription: metadata.twitterDescription || metadata.ogDescription || description,
    twitterImage: twitterImageUrl,
    twitterSite: SITE_CONFIG.twitterHandle,
    twitterCreator: SITE_CONFIG.twitterHandle,

    // Additional meta tags
    robots: metadata.robots || 'index,follow',
    // Note: htmlAttrs is handled separately in useSEO composable
  }
}

/**
 * Builds link tags for canonical URL and alternate language versions
 *
 * @param metadata - SEO metadata configuration
 * @returns Array of link tag objects compatible with useHead()
 */
export function buildLinkTags(metadata: SEOMetadata) {
  const links: Array<{rel: string; href: string; hreflang?: string}> = []

  // Canonical URL
  if (metadata.canonical) {
    links.push({
      rel: 'canonical',
      href: buildAbsoluteUrl(metadata.canonical),
    })
  }

  // Alternate language links (hreflang)
  if (metadata.alternateLinks && metadata.alternateLinks.length > 0) {
    metadata.alternateLinks.forEach(alternate => {
      links.push({
        rel: 'alternate',
        hreflang: alternate.hreflang,
        href: buildAbsoluteUrl(alternate.href),
      })
    })
  }

  return links
}

/**
 * Truncates text to specified length with ellipsis
 * Preserves word boundaries when possible
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length including ellipsis
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }

  // Find last space before maxLength - 3 (for ellipsis)
  const truncated = text.substring(0, maxLength - 3)
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace > 0 && lastSpace > maxLength * 0.7) {
    // If space found and not too far back, use it
    return truncated.substring(0, lastSpace) + '...'
  }

  // Otherwise, hard truncate
  return truncated + '...'
}

/**
 * Truncates title to optimal SEO length (60 characters)
 *
 * @param title - Title to truncate
 * @returns Truncated title (max 60 chars)
 */
export function truncateTitle(title: string): string {
  return truncateText(title, 60)
}

/**
 * Truncates description to optimal SEO length (160 characters)
 *
 * @param description - Description to truncate
 * @returns Truncated description (max 160 chars)
 */
export function truncateDescription(description: string): string {
  return truncateText(description, 160)
}

/**
 * Builds absolute URL from relative or absolute path
 *
 * @param path - Relative or absolute URL path
 * @returns Absolute URL
 */
export function buildAbsoluteUrl(path: string): string {
  // Already absolute URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  return `${SITE_CONFIG.url}${cleanPath}`
}

/**
 * Validates and normalizes canonical URL
 * Removes trailing slashes per FR-013 specification
 *
 * @param url - URL to normalize
 * @returns Normalized canonical URL
 */
export function normalizeCanonicalUrl(url: string): string {
  let normalized = url.trim()

  // Build absolute URL if relative
  if (!normalized.startsWith('http')) {
    normalized = buildAbsoluteUrl(normalized)
  }

  // Remove trailing slash (except for root /)
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }

  return normalized
}

/**
 * Generates SEO-friendly URL slug from title
 * Ensures lowercase, URL-safe characters
 *
 * @param title - Title to convert to slug
 * @returns URL-safe slug
 */
export function generateSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .trim()
      // Replace spaces and special chars with hyphens
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
  ) // Remove leading/trailing hyphens
}
