/**
 * Schema Validation Tests
 *
 * Test Zod schemas and validation helpers for blog posts and case studies.
 */

import {describe, expect, it} from 'vitest'
import {
  CaseStudyMetadataSchema,
  validateBlogPostMetadata,
  validateCaseStudyMetadata,
  validateGenerationOptions,
} from '../../app/utils/content-generator/schemas'

describe('BlogPostMetadataSchema', () => {
  it('validates correct blog post metadata', () => {
    const validData = {
      title: 'Building Type-Safe APIs',
      date: '2026-01-14',
      tags: ['typescript', 'api'],
      excerpt: 'Learn best practices for building type-safe APIs with TypeScript',
      lang: 'en',
    }

    const result = validateBlogPostMetadata(validData)
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
    expect(result.metadata.title).toBe('Building Type-Safe APIs')
  })

  it('rejects blog post with missing title', () => {
    const invalidData = {
      date: '2026-01-14',
      tags: ['typescript'],
    }

    const result = validateBlogPostMetadata(invalidData)
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
    expect(result.errors[0].field).toBe('title')
  })

  it('rejects blog post with invalid date format', () => {
    const invalidData = {
      title: 'Test Post',
      date: '14-01-2026', // Invalid format
      tags: ['test'],
    }

    const result = validateBlogPostMetadata(invalidData)
    expect(result.isValid).toBe(false)
    expect(result.errors.some(e => e.field === 'date')).toBe(true)
  })

  it('rejects blog post with no tags', () => {
    const invalidData = {
      title: 'Test Post',
      date: '2026-01-14',
      tags: [], // Empty array
    }

    const result = validateBlogPostMetadata(invalidData)
    expect(result.isValid).toBe(false)
    expect(result.errors.some(e => e.field === 'tags')).toBe(true)
  })

  it('warns when excerpt is missing', () => {
    const dataWithoutExcerpt = {
      title: 'Test Post',
      date: '2026-01-14',
      tags: ['test'],
      lang: 'en',
    }

    const result = validateBlogPostMetadata(dataWithoutExcerpt)
    expect(result.isValid).toBe(true)
    expect(result.warnings.some(w => w.code === 'MISSING_EXCERPT')).toBe(true)
  })

  it('warns when excerpt is too short for SEO', () => {
    const dataWithShortExcerpt = {
      title: 'Test Post',
      date: '2026-01-14',
      tags: ['test'],
      excerpt: 'Too short',
      lang: 'en',
    }

    const result = validateBlogPostMetadata(dataWithShortExcerpt)
    expect(result.isValid).toBe(true)
    expect(result.warnings.some(w => w.code === 'EXCERPT_TOO_SHORT')).toBe(true)
  })

  it('warns when excerpt is too long for SEO', () => {
    const dataWithLongExcerpt = {
      title: 'Test Post',
      date: '2026-01-14',
      tags: ['test'],
      excerpt: 'A'.repeat(170), // 170 characters
      lang: 'en',
    }

    const result = validateBlogPostMetadata(dataWithLongExcerpt)
    expect(result.isValid).toBe(true)
    expect(result.warnings.some(w => w.code === 'EXCERPT_TOO_LONG')).toBe(true)
  })

  it('accepts excerpt in SEO-optimal range (150-160 chars)', () => {
    const dataWithOptimalExcerpt = {
      title: 'Test Post',
      date: '2026-01-14',
      tags: ['test'],
      excerpt: 'A'.repeat(155), // 155 characters - optimal
      lang: 'en',
    }

    const result = validateBlogPostMetadata(dataWithOptimalExcerpt)
    expect(result.isValid).toBe(true)
    expect(result.warnings.filter(w => w.field === 'excerpt')).toHaveLength(0)
  })
})

describe('CaseStudyMetadataSchema', () => {
  it('validates correct case study metadata', () => {
    const validData = {
      title: 'AI Dashboard Project',
      client: 'Acme Corp',
      date: '2026-01-14',
      role: 'Lead Developer',
      timeline: '3 months',
      tags: ['react', 'typescript', 'ai'],
      featuredImage: '/images/case-studies/2026/ai-dashboard.jpg',
      excerpt: 'Built an AI-powered analytics dashboard',
      lang: 'en',
    }

    const result = validateCaseStudyMetadata(validData)
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
    expect(result.metadata.title).toBe('AI Dashboard Project')
  })

  it('applies default values for featured and order', () => {
    const dataWithoutDefaults = {
      title: 'Test Project',
      client: 'Client',
      date: '2026-01-14',
      role: 'Developer',
      timeline: '1 month',
      tags: ['test'],
      featuredImage: '/images/case-studies/test.jpg',
      lang: 'en',
    }

    const parsed = CaseStudyMetadataSchema.parse(dataWithoutDefaults)
    expect(parsed.featured).toBe(false)
    expect(parsed.order).toBe(999)
  })

  it('validates testimonial structure', () => {
    const validData = {
      title: 'Test Project',
      client: 'Client',
      date: '2026-01-14',
      role: 'Developer',
      timeline: '1 month',
      tags: ['test'],
      featuredImage: '/images/case-studies/test.jpg',
      testimonial: {
        quote: 'Excellent work!',
        author: 'John Doe',
        position: 'CEO',
      },
      lang: 'en',
    }

    const result = validateCaseStudyMetadata(validData)
    expect(result.isValid).toBe(true)
    expect(result.metadata.testimonial?.quote).toBe('Excellent work!')
  })

  it('validates metrics array structure', () => {
    const validData = {
      title: 'Test Project',
      client: 'Client',
      date: '2026-01-14',
      role: 'Developer',
      timeline: '1 month',
      tags: ['test'],
      featuredImage: '/images/case-studies/test.jpg',
      metrics: [
        {label: 'Users', value: '10,000+'},
        {label: 'Performance', value: '2x faster'},
      ],
      lang: 'en',
    }

    const result = validateCaseStudyMetadata(validData)
    expect(result.isValid).toBe(true)
    expect(result.metadata.metrics).toHaveLength(2)
  })

  it('warns when testimonial is missing', () => {
    const dataWithoutTestimonial = {
      title: 'Test Project',
      client: 'Client',
      date: '2026-01-14',
      role: 'Developer',
      timeline: '1 month',
      tags: ['test'],
      featuredImage: '/images/case-studies/test.jpg',
      lang: 'en',
    }

    const result = validateCaseStudyMetadata(dataWithoutTestimonial)
    expect(result.isValid).toBe(true)
    expect(result.warnings.some(w => w.code === 'MISSING_TESTIMONIAL')).toBe(true)
  })

  it('warns when metrics are missing', () => {
    const dataWithoutMetrics = {
      title: 'Test Project',
      client: 'Client',
      date: '2026-01-14',
      role: 'Developer',
      timeline: '1 month',
      tags: ['test'],
      featuredImage: '/images/case-studies/test.jpg',
      lang: 'en',
    }

    const result = validateCaseStudyMetadata(dataWithoutMetrics)
    expect(result.isValid).toBe(true)
    expect(result.warnings.some(w => w.code === 'MISSING_METRICS')).toBe(true)
  })
})

describe('validateGenerationOptions', () => {
  it('validates correct generation options', () => {
    const validOptions = {
      contentType: 'blog',
      mode: 'full',
      length: 'medium',
      tone: 'technical',
    }

    const result = validateGenerationOptions(validOptions)
    expect(result.contentType).toBe('blog')
    expect(result.mode).toBe('full')
    expect(result.length).toBe('medium')
    expect(result.tone).toBe('technical')
  })

  it('accepts options without optional fields', () => {
    const minimalOptions = {
      contentType: 'case-study',
      mode: 'metadata-only',
    }

    const result = validateGenerationOptions(minimalOptions)
    expect(result.contentType).toBe('case-study')
    expect(result.mode).toBe('metadata-only')
    expect(result.length).toBeUndefined()
    expect(result.tone).toBeUndefined()
  })

  it('rejects invalid content type', () => {
    const invalidOptions = {
      contentType: 'article', // Invalid
      mode: 'full',
    }

    expect(() => validateGenerationOptions(invalidOptions)).toThrow()
  })
})
