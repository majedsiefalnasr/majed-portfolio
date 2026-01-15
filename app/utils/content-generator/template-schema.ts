/**
 * Template Schema for Content Generation
 *
 * Defines the structure for custom content templates
 */

import {z} from 'zod'

/**
 * Section definition in a template
 */
const TemplateSectionSchema = z.object({
  /** Section identifier (slug) */
  id: z.string().min(1),

  /** Display name for the section */
  name: z.string().min(1),

  /** Whether this section is required */
  required: z.boolean().default(true),

  /** Placeholder content for metadata-only mode */
  placeholder: z.string().optional(),

  /** AI generation prompt for this section */
  prompt: z.string().optional(),

  /** Suggested word count range for this section */
  wordCount: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
})

export type TemplateSection = z.infer<typeof TemplateSectionSchema>

/**
 * Complete template definition
 */
export const ContentTemplateSchema = z.object({
  /** Template identifier */
  id: z.string().min(1),

  /** Display name */
  name: z.string().min(1),

  /** Template description */
  description: z.string(),

  /** Content type this template applies to */
  contentType: z.enum(['blog', 'case-study']),

  /** Ordered list of sections */
  sections: z.array(TemplateSectionSchema).min(1),

  /** Default values for frontmatter */
  defaultMetadata: z.record(z.any()).optional(),

  /** AI generation context/instructions */
  generationContext: z.string().optional(),
})

export type ContentTemplate = z.infer<typeof ContentTemplateSchema>

/**
 * Validate a template definition
 */
export function validateTemplate(template: unknown): {
  isValid: boolean
  errors: string[]
  template?: ContentTemplate
} {
  const result = ContentTemplateSchema.safeParse(template)

  if (!result.success) {
    return {
      isValid: false,
      errors: result.error.issues.map(err => `${err.path.join('.')}: ${err.message}`),
    }
  }

  // Additional validation
  const errors: string[] = []

  // Check for duplicate section IDs
  const sectionIds = new Set<string>()
  result.data.sections.forEach(section => {
    if (sectionIds.has(section.id)) {
      errors.push(`Duplicate section ID: ${section.id}`)
    }
    sectionIds.add(section.id)
  })

  if (errors.length > 0) {
    return {isValid: false, errors}
  }

  return {
    isValid: true,
    errors: [],
    template: result.data,
  }
}
