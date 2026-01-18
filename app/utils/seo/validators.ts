/**
 * SEO Frontmatter Validators
 *
 * Zod schemas for validating SEO metadata with soft validation (warnings, not errors).
 * Provides character count guidance for optimal SEO performance.
 */

import {z} from 'zod'

/**
 * SEO Metadata validation schema (strict validation)
 * Used for runtime validation of SEO metadata objects
 */
export const seoMetadataSchema = z.object({
  title: z.string().min(1, 'Title is required').max(60, 'Title must be 60 characters or less'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(160, 'Description must be 160 characters or less'),
  ogTitle: z.string().min(1).max(60).optional(),
  ogDescription: z.string().min(1).max(160).optional(),
  ogImage: z.string().optional(),
  ogType: z.enum(['website', 'article', 'profile']).optional(),
  ogUrl: z.string().url('OG URL must be a valid URL').optional(),
  twitterCard: z.enum(['summary', 'summary_large_image', 'app', 'player']).optional(),
  canonical: z.string().url('Canonical URL must be a valid URL').optional(),
  lang: z.enum(['en', 'ar']).optional(),
  robots: z
    .enum(['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow'])
    .optional(),
})

/**
 * SEO frontmatter extension schema (for content)
 * Used to validate optional SEO fields in blog posts and case studies
 */
export const seoFrontmatterSchema = z
  .object({
    title: z.string().max(60, 'SEO title must be 60 characters or less').optional(),
    description: z.string().max(160, 'SEO description must be 160 characters or less').optional(),
    ogImage: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    noindex: z.boolean().optional(),
  })
  .optional()

/**
 * Image metadata validation schema
 * Ensures all images have required SEO attributes
 */
export const imageMetadataSchema = z.object({
  src: z.string().min(1, 'Image source is required'),
  alt: z.string().min(1, 'Alt text is required for SEO and accessibility'),
  width: z.number().positive('Image width must be a positive number'),
  height: z.number().positive('Image height must be a positive number'),
  format: z.enum(['jpeg', 'png', 'webp']).optional(),
})

/**
 * Open Graph image dimensions validation
 * Recommended size: 1200x630 (1.91:1 ratio)
 */
export const ogImageDimensionsSchema = z.object({
  width: z.number().refine(val => val === 1200, {
    message: 'Recommended OG image width is 1200px for optimal display across platforms',
  }),
  height: z.number().refine(val => val === 630, {
    message: 'Recommended OG image height is 630px (1.91:1 ratio)',
  }),
})

/**
 * Validation result with warnings
 */
export interface ValidationResult<T = unknown> {
  success: boolean
  data?: T
  errors?: string[]
  warnings?: string[]
}

/**
 * Validates SEO title with warnings for optimal length
 *
 * @param title - Title to validate
 * @returns Validation result with warnings
 */
export function validateSEOTitle(title: string): ValidationResult<string> {
  const warnings: string[] = []
  const errors: string[] = []

  if (!title || title.trim().length === 0) {
    errors.push('Title is required')
    return {success: false, errors}
  }

  const length = title.length

  if (length > 60) {
    errors.push(`Title is ${length} characters (max 60). It will be truncated in search results.`)
  }

  if (length < 30) {
    warnings.push(`Title is ${length} characters. Recommended: 30-60 for optimal SEO.`)
  }

  if (length >= 30 && length <= 60) {
    warnings.push(`Title length (${length} chars) is optimal for search results.`)
  }

  return {
    success: errors.length === 0,
    data: title,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined,
  }
}

/**
 * Validates SEO description with warnings for optimal length
 *
 * @param description - Description to validate
 * @returns Validation result with warnings
 */
export function validateSEODescription(description: string): ValidationResult<string> {
  const warnings: string[] = []
  const errors: string[] = []

  if (!description || description.trim().length === 0) {
    errors.push('Description is required')
    return {success: false, errors}
  }

  const length = description.length

  if (length > 160) {
    errors.push(
      `Description is ${length} characters (max 160). It will be truncated in search results.`
    )
  }

  if (length < 120) {
    warnings.push(`Description is ${length} characters. Recommended: 120-160 for optimal SEO.`)
  }

  if (length >= 120 && length <= 160) {
    warnings.push(`Description length (${length} chars) is optimal for search results.`)
  }

  return {
    success: errors.length === 0,
    data: description,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined,
  }
}

/**
 * Validates OG image dimensions with warnings
 *
 * @param width - Image width in pixels
 * @param height - Image height in pixels
 * @returns Validation result with warnings
 */
export function validateOGImageDimensions(
  width: number,
  height: number
): ValidationResult<{width: number; height: number}> {
  const warnings: string[] = []
  const aspectRatio = width / height

  const recommendedWidth = 1200
  const recommendedHeight = 630
  const recommendedRatio = recommendedWidth / recommendedHeight // 1.91:1

  if (width !== recommendedWidth || height !== recommendedHeight) {
    warnings.push(
      `Image dimensions are ${width}x${height}. Recommended: ${recommendedWidth}x${recommendedHeight} (1.91:1 ratio) for optimal display on Facebook, LinkedIn, and Twitter.`
    )
  }

  if (Math.abs(aspectRatio - recommendedRatio) > 0.1) {
    warnings.push(
      `Image aspect ratio is ${aspectRatio.toFixed(2)}:1. Recommended: 1.91:1 to prevent cropping on social platforms.`
    )
  }

  // Minimum dimensions warning
  if (width < 600 || height < 315) {
    warnings.push(
      `Image dimensions are below minimum recommended size (600x315). Some platforms may not display the image.`
    )
  }

  return {
    success: true,
    data: {width, height},
    warnings: warnings.length > 0 ? warnings : undefined,
  }
}

/**
 * Validates complete SEO frontmatter for blog posts and case studies
 * Provides comprehensive validation with warnings
 *
 * @param frontmatter - SEO frontmatter object to validate
 * @returns Validation result with detailed feedback
 */
export function validateSEOFrontmatter(frontmatter: {
  title?: string
  description?: string
  ogImage?: string
  keywords?: string[]
  noindex?: boolean
}): ValidationResult {
  const warnings: string[] = []
  const errors: string[] = []

  // Validate custom SEO title if provided
  if (frontmatter.title) {
    const titleResult = validateSEOTitle(frontmatter.title)
    if (titleResult.errors) {
      errors.push(...titleResult.errors)
    }
    if (titleResult.warnings) {
      warnings.push(...titleResult.warnings)
    }
  }

  // Validate custom SEO description if provided
  if (frontmatter.description) {
    const descResult = validateSEODescription(frontmatter.description)
    if (descResult.errors) {
      errors.push(...descResult.errors)
    }
    if (descResult.warnings) {
      warnings.push(...descResult.warnings)
    }
  }

  // Validate keywords count
  if (frontmatter.keywords && frontmatter.keywords.length > 10) {
    warnings.push(
      `${frontmatter.keywords.length} keywords provided. Recommended: 3-7 keywords for focused SEO.`
    )
  }

  // Validate noindex flag
  if (frontmatter.noindex) {
    warnings.push('Content is marked as noindex. It will not appear in search results.')
  }

  return {
    success: errors.length === 0,
    data: frontmatter,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined,
  }
}

/**
 * Validates image has required SEO attributes (alt text, dimensions)
 *
 * @param image - Image metadata to validate
 * @returns Validation result
 */
export function validateImageSEO(image: {
  src: string
  alt?: string
  width?: number
  height?: number
}): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!image.alt || image.alt.trim().length === 0) {
    errors.push('Alt text is required for accessibility and SEO')
  }

  if (!image.width || !image.height) {
    errors.push('Image width and height are required to prevent Cumulative Layout Shift (CLS)')
  }

  if (image.alt && image.alt.length > 125) {
    warnings.push(
      `Alt text is ${image.alt.length} characters. Recommended: under 125 characters for screen readers.`
    )
  }

  return {
    success: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined,
  }
}
