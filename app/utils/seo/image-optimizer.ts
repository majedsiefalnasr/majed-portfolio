/**
 * Image Optimizer for SEO
 *
 * Handles OG image optimization, fallbacks, and validation.
 * Ensures all images meet SEO and performance requirements.
 *
 * @see specs/005-seo-optimization/data-model.md
 */

import type {ImageMetadata} from '~/types/seo'
import {validateImageSEO, validateOGImageDimensions} from './validators'

/**
 * Default OG image configuration
 */
export const DEFAULT_OG_IMAGE = {
  path: '/images/og/default.png',
  width: 1200,
  height: 630,
  alt: 'Majed Sief Alnasr - CX & Product Designer',
}

/**
 * Recommended image dimensions for different contexts
 */
export const IMAGE_SIZES = {
  ogImage: {width: 1200, height: 630}, // Open Graph (Facebook, LinkedIn)
  twitterCard: {width: 1200, height: 630}, // Twitter large card
  twitterSummary: {width: 120, height: 120}, // Twitter summary card
  favicon: {width: 512, height: 512},
} as const

/**
 * Resolves the best OG image for content
 * Priority: custom seo.ogImage → featuredImage → default
 *
 * @param options - Image selection options
 * @returns Image path (absolute URL if external, relative path if local)
 */
export function resolveOGImage(options: {
  seoOgImage?: string
  featuredImage?: string
  defaultImage?: string
}): string {
  const {seoOgImage, featuredImage, defaultImage = DEFAULT_OG_IMAGE.path} = options

  // Priority 1: Custom SEO OG image (highest priority)
  if (seoOgImage) {
    return seoOgImage
  }

  // Priority 2: Featured image
  if (featuredImage) {
    return featuredImage
  }

  // Priority 3: Default fallback
  return defaultImage
}

/**
 * Builds complete image metadata with SEO validation
 *
 * @param src - Image source path
 * @param options - Image metadata options
 * @returns Complete image metadata
 */
export function buildImageMetadata(
  src: string,
  options: {
    alt: string
    width?: number
    height?: number
    format?: 'jpeg' | 'png' | 'webp'
  }
): ImageMetadata {
  const metadata: ImageMetadata = {
    src,
    alt: options.alt,
    width: options.width || DEFAULT_OG_IMAGE.width,
    height: options.height || DEFAULT_OG_IMAGE.height,
    format: options.format,
  }

  // Validate image SEO attributes
  const validation = validateImageSEO({
    src: metadata.src,
    alt: metadata.alt,
    width: metadata.width,
    height: metadata.height,
  })

  if (!validation.success && validation.errors) {
    console.warn('[SEO] Image validation errors:', validation.errors)
  }

  if (validation.warnings) {
    console.info('[SEO] Image validation warnings:', validation.warnings)
  }

  return metadata
}

/**
 * Validates OG image meets platform requirements
 * Provides warnings for non-optimal dimensions
 *
 * @param width - Image width in pixels
 * @param height - Image height in pixels
 * @returns Validation result with warnings
 */
export function validateOGImage(width: number, height: number) {
  return validateOGImageDimensions(width, height)
}

/**
 * Generates srcset for responsive images
 * Creates multiple sizes for different screen densities
 *
 * @param baseSrc - Base image source path
 * @param sizes - Array of sizes to generate
 * @returns srcset string
 */
export function generateSrcSet(
  baseSrc: string,
  sizes: number[] = [640, 750, 828, 1080, 1200, 1920]
): string {
  // Extract file extension and base path
  const lastDot = baseSrc.lastIndexOf('.')
  const ext = lastDot > -1 ? baseSrc.substring(lastDot) : ''
  const base = lastDot > -1 ? baseSrc.substring(0, lastDot) : baseSrc

  return sizes
    .map(size => {
      // Nuxt Image convention: base-{width}.ext
      return `${base}-${size}${ext} ${size}w`
    })
    .join(', ')
}

/**
 * Determines optimal image format based on browser support
 * Prioritizes WebP for better compression
 *
 * @param supportsWebP - Whether browser supports WebP
 * @returns Recommended image format
 */
export function getOptimalImageFormat(supportsWebP: boolean = true): 'webp' | 'jpeg' | 'png' {
  // WebP provides best compression with quality
  if (supportsWebP) {
    return 'webp'
  }

  // Fallback to JPEG for photos, PNG for graphics
  return 'jpeg'
}

/**
 * Extracts image dimensions from image element or file
 * Used for validating images before upload
 *
 * @param src - Image source (URL or path)
 * @returns Promise with image dimensions
 */
export async function getImageDimensions(src: string): Promise<{width: number; height: number}> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Server-side: cannot determine dimensions without file system access
      // Return default dimensions
      resolve({width: DEFAULT_OG_IMAGE.width, height: DEFAULT_OG_IMAGE.height})
      return
    }

    const img = new Image()

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      })
    }

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`))
    }

    img.src = src
  })
}

/**
 * Checks if image path is absolute URL
 *
 * @param path - Image path to check
 * @returns True if absolute URL
 */
export function isAbsoluteUrl(path: string): boolean {
  return path.startsWith('http://') || path.startsWith('https://')
}

/**
 * Generates alt text from filename if not provided
 * Fallback only - proper alt text should be provided
 *
 * @param filename - Image filename
 * @returns Generated alt text
 */
export function generateAltTextFromFilename(filename: string): string {
  // Extract filename without extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')

  // Replace hyphens and underscores with spaces
  const readable = nameWithoutExt.replace(/[-_]/g, ' ')

  // Capitalize first letter of each word
  return readable
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Optimizes image metadata for SEO and performance
 * Ensures lazy loading, dimensions, and proper alt text
 *
 * @param image - Image element or metadata
 * @returns Optimized image attributes
 */
export function optimizeImageForSEO(image: {
  src: string
  alt?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
}) {
  return {
    src: image.src,
    alt: image.alt || generateAltTextFromFilename(image.src),
    width: image.width || DEFAULT_OG_IMAGE.width,
    height: image.height || DEFAULT_OG_IMAGE.height,
    loading: image.loading || 'lazy',
    decoding: 'async' as const,
    // Prevent layout shift
    style:
      image.width && image.height ? `aspect-ratio: ${image.width} / ${image.height}` : undefined,
  }
}
