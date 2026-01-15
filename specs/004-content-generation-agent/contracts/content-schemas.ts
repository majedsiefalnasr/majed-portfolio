/**
 * Content Validation Schemas
 *
 * Zod runtime validation schemas for blog posts and case studies.
 * These schemas enforce the contracts defined in the data model and align
 * with TypeScript interfaces in app/types/content.ts.
 */

import {z} from 'zod'

// =============================================================================
// Shared Validators
// =============================================================================

/**
 * Date validator: YYYY-MM-DD format
 */
const DateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .refine(
    date => {
      const parsed = new Date(date)
      return !isNaN(parsed.getTime())
    },
    {message: 'Date must be a valid date'}
  )

/**
 * Tag validator: lowercase, alphanumeric with hyphens
 */
const TagSchema = z
  .string()
  .min(2, 'Tag must be at least 2 characters')
  .max(30, 'Tag must be at most 30 characters')
  .regex(/^[a-z0-9-]+$/, 'Tags must be lowercase letters, numbers, and hyphens only')

/**
 * Language validator: en or ar
 */
const LangSchema = z.enum(['en', 'ar']).default('en')

/**
 * URL or path validator
 */
const ImagePathSchema = z
  .string()
  .regex(
    /^\/images\/.*\.(jpg|jpeg|png|svg|webp|gif)$/i,
    'Must be a valid image path starting with /images/'
  )

// =============================================================================
// Blog Post Schema
// =============================================================================

/**
 * Blog post metadata validation schema
 *
 * Aligns with: app/types/content.ts → BlogPost interface
 * Required fields: title, date, tags, excerpt
 * Optional fields: author, lang, featuredImage
 */
export const BlogPostMetadataSchema = z.object({
  // Required fields
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters')
    .trim(),

  date: DateSchema,

  tags: z
    .array(TagSchema)
    .min(1, 'At least one tag is required')
    .max(10, 'Maximum 10 tags allowed'),

  excerpt: z
    .string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(200, 'Excerpt must be at most 200 characters')
    .trim()
    .optional(),

  // Optional fields
  author: z.string().min(2).max(50).trim().optional(),

  lang: LangSchema,

  featuredImage: ImagePathSchema.optional(),
})

/**
 * Type inference for BlogPostMetadata
 */
export type BlogPostMetadata = z.infer<typeof BlogPostMetadataSchema>

// =============================================================================
// Case Study Schema
// =============================================================================

/**
 * Testimonial schema for case studies
 */
const TestimonialSchema = z.object({
  quote: z.string().min(10, 'Quote must be at least 10 characters').trim(),
  author: z.string().min(2, 'Author name must be at least 2 characters').trim(),
  position: z.string().min(2, 'Position must be at least 2 characters').trim(),
})

/**
 * Metric schema for case studies
 */
const MetricSchema = z.object({
  label: z.string().min(2, 'Metric label must be at least 2 characters').trim(),
  value: z.string().min(1, 'Metric value is required').trim(),
})

/**
 * Case study metadata validation schema
 *
 * Aligns with: app/types/content.ts → CaseStudy interface
 * Required fields: title, client, date, role, timeline, tags, featuredImage
 * Optional fields: excerpt, testimonial, metrics, featured, order, lang
 */
export const CaseStudyMetadataSchema = z.object({
  // Required fields
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters')
    .trim(),

  client: z.string().min(2, 'Client name must be at least 2 characters').max(50).trim(),

  date: DateSchema,

  role: z.string().min(2, 'Role must be at least 2 characters').max(50).trim(),

  timeline: z.string().min(5, 'Timeline must be at least 5 characters').trim(),

  tags: z
    .array(TagSchema)
    .min(1, 'At least one tag (technology) is required')
    .max(15, 'Maximum 15 tags allowed'),

  featuredImage: ImagePathSchema,

  // Optional fields
  excerpt: z
    .string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(200, 'Excerpt must be at most 200 characters')
    .trim()
    .optional(),

  testimonial: TestimonialSchema.optional(),

  metrics: z.array(MetricSchema).optional(),

  featured: z.boolean().default(false),

  order: z.number().int().positive().default(999),

  lang: LangSchema,
})

/**
 * Type inference for CaseStudyMetadata
 */
export type CaseStudyMetadata = z.infer<typeof CaseStudyMetadataSchema>

// =============================================================================
// Generation Options Schema
// =============================================================================

/**
 * Content generation options
 */
export const GenerationOptionsSchema = z.object({
  contentType: z.enum(['blog', 'case-study']),
  mode: z.enum(['full', 'metadata-only']),
  length: z.enum(['short', 'medium', 'long']).optional(),
  tone: z.enum(['professional', 'conversational', 'technical', 'educational']).optional(),
})

export type GenerationOptions = z.infer<typeof GenerationOptionsSchema>

// =============================================================================
// Validation Result Schema
// =============================================================================

/**
 * Validation error structure
 */
export const ValidationErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
  code: z.string(),
  severity: z.literal('error'),
})

/**
 * Validation warning structure
 */
export const ValidationWarningSchema = z.object({
  field: z.string(),
  message: z.string(),
  code: z.string(),
  severity: z.literal('warning'),
})

/**
 * Complete validation result
 */
export const ValidationResultSchema = z.object({
  isValid: z.boolean(),
  errors: z.array(ValidationErrorSchema),
  warnings: z.array(ValidationWarningSchema),
  metadata: z.union([BlogPostMetadataSchema, CaseStudyMetadataSchema]),
  timestamp: z.date(),
})

export type ValidationResult = z.infer<typeof ValidationResultSchema>
export type ValidationError = z.infer<typeof ValidationErrorSchema>
export type ValidationWarning = z.infer<typeof ValidationWarningSchema>

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Validate blog post metadata
 *
 * @param data - Raw metadata object
 * @returns Validation result with errors/warnings
 */
export function validateBlogPostMetadata(data: unknown): ValidationResult {
  const result = BlogPostMetadataSchema.safeParse(data)
  const timestamp = new Date()

  if (!result.success) {
    const errors: ValidationError[] = result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
      severity: 'error' as const,
    }))

    return {
      isValid: false,
      errors,
      warnings: [],
      metadata: data as BlogPostMetadata,
      timestamp,
    }
  }

  const warnings: ValidationWarning[] = []

  // Add warnings for missing optional but recommended fields
  if (!result.data.excerpt) {
    warnings.push({
      field: 'excerpt',
      message: 'Excerpt is missing - SEO and social sharing will be affected',
      code: 'MISSING_EXCERPT',
      severity: 'warning' as const,
    })
  }

  if (!result.data.author) {
    warnings.push({
      field: 'author',
      message: 'Author is missing - will use default from config',
      code: 'MISSING_AUTHOR',
      severity: 'warning' as const,
    })
  }

  return {
    isValid: true,
    errors: [],
    warnings,
    metadata: result.data,
    timestamp,
  }
}

/**
 * Validate case study metadata
 *
 * @param data - Raw metadata object
 * @returns Validation result with errors/warnings
 */
export function validateCaseStudyMetadata(data: unknown): ValidationResult {
  const result = CaseStudyMetadataSchema.safeParse(data)
  const timestamp = new Date()

  if (!result.success) {
    const errors: ValidationError[] = result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
      severity: 'error' as const,
    }))

    return {
      isValid: false,
      errors,
      warnings: [],
      metadata: data as CaseStudyMetadata,
      timestamp,
    }
  }

  const warnings: ValidationWarning[] = []

  // Add warnings for missing optional but recommended fields
  if (!result.data.excerpt) {
    warnings.push({
      field: 'excerpt',
      message: 'Excerpt is missing - SEO and social sharing will be affected',
      code: 'MISSING_EXCERPT',
      severity: 'warning' as const,
    })
  } else if (result.data.excerpt.length < 150) {
    warnings.push({
      field: 'excerpt',
      message:
        'Excerpt is shorter than 150 characters - SEO meta descriptions work best at 150-160 characters',
      code: 'EXCERPT_TOO_SHORT',
      severity: 'warning' as const,
    })
  } else if (result.data.excerpt.length > 160) {
    warnings.push({
      field: 'excerpt',
      message: 'Excerpt is longer than 160 characters - may be truncated in search results',
      code: 'EXCERPT_TOO_LONG',
      severity: 'warning' as const,
    })
  }

  if (!result.data.testimonial) {
    warnings.push({
      field: 'testimonial',
      message: 'Testimonial is missing - case studies are more compelling with client quotes',
      code: 'MISSING_TESTIMONIAL',
      severity: 'warning' as const,
    })
  }

  if (!result.data.metrics || result.data.metrics.length === 0) {
    warnings.push({
      field: 'metrics',
      message: 'Metrics are missing - quantifiable results strengthen case studies',
      code: 'MISSING_METRICS',
      severity: 'warning' as const,
    })
  }

  return {
    isValid: true,
    errors: [],
    warnings,
    metadata: result.data,
    timestamp,
  }
}

/**
 * Validate generation options
 *
 * @param data - Raw options object
 * @returns Parsed and validated options
 * @throws ZodError if validation fails
 */
export function validateGenerationOptions(data: unknown): GenerationOptions {
  return GenerationOptionsSchema.parse(data)
}
