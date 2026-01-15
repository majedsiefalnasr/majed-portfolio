/**
 * Tests for SEO Validators
 *
 * @see app/utils/seo/validators.ts
 */

import {describe, expect, it} from 'vitest'
import {
  validateImageSEO,
  validateOGImageDimensions,
  validateSEODescription,
  validateSEOFrontmatter,
  validateSEOTitle,
} from '../../../app/utils/seo/validators'

describe('SEO Validators', () => {
  describe('validateSEOTitle', () => {
    it('should pass for titles within optimal range (30-60 chars)', () => {
      const result = validateSEOTitle('Building a Scalable API with Nuxt 4')
      expect(result.success).toBe(true)
      expect(result.data).toBe('Building a Scalable API with Nuxt 4')
      expect(result.warnings).toBeDefined()
      expect(result.warnings![0]).toContain('optimal')
    })

    it('should warn for titles below 30 characters', () => {
      const result = validateSEOTitle('Short Title')
      expect(result.success).toBe(true)
      expect(result.warnings).toBeDefined()
      expect(result.warnings![0]).toContain('Recommended: 30-60')
    })

    it('should error for titles above 60 characters', () => {
      const result = validateSEOTitle(
        'This is an extremely long title that exceeds the recommended sixty character limit'
      )
      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors![0]).toContain('max 60')
    })

    it('should error for empty titles', () => {
      const result = validateSEOTitle('')
      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors![0]).toContain('required')
    })

    it('should error for whitespace-only titles', () => {
      const result = validateSEOTitle('   ')
      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
    })
  })

  describe('validateSEODescription', () => {
    it('should pass for descriptions within optimal range (120-160 chars)', () => {
      const result = validateSEODescription(
        'Learn how to build a production-ready API with Nuxt 4, TypeScript, and modern best practices. Includes code examples and deployment guides.'
      )
      expect(result.success).toBe(true)
      expect(result.warnings).toBeDefined()
      expect(result.warnings![0]).toContain('optimal')
    })

    it('should warn for descriptions below 120 characters', () => {
      const result = validateSEODescription('A short description about APIs.')
      expect(result.success).toBe(true)
      expect(result.warnings).toBeDefined()
      expect(result.warnings![0]).toContain('Recommended: 120-160')
    })

    it('should error for descriptions above 160 characters', () => {
      const result = validateSEODescription(
        'This is an extremely long description that far exceeds the recommended maximum length of one hundred and sixty characters for optimal search engine display and user experience.'
      )
      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors![0]).toContain('max 160')
    })

    it('should error for empty descriptions', () => {
      const result = validateSEODescription('')
      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors![0]).toContain('required')
    })
  })

  describe('validateOGImageDimensions', () => {
    it('should pass for recommended dimensions (1200x630)', () => {
      const result = validateOGImageDimensions(1200, 630)
      expect(result.success).toBe(true)
      expect(result.data).toEqual({width: 1200, height: 630})
      expect(result.warnings).toBeUndefined()
    })

    it('should warn for non-recommended dimensions', () => {
      const result = validateOGImageDimensions(800, 600)
      expect(result.success).toBe(true)
      expect(result.warnings).toBeDefined()
      expect(result.warnings![0]).toContain('1200x630')
    })

    it('should warn for incorrect aspect ratio', () => {
      const result = validateOGImageDimensions(1200, 800)
      expect(result.success).toBe(true)
      expect(result.warnings).toBeDefined()
      expect(result.warnings!.some(w => w.includes('aspect ratio'))).toBe(true)
    })

    it('should warn for dimensions below minimum', () => {
      const result = validateOGImageDimensions(400, 200)
      expect(result.success).toBe(true)
      expect(result.warnings).toBeDefined()
      expect(result.warnings!.some(w => w.includes('minimum'))).toBe(true)
    })
  })

  describe('validateSEOFrontmatter', () => {
    it('should pass for valid frontmatter', () => {
      const frontmatter = {
        title: 'Optimized SEO Title for Search Results',
        description:
          'A compelling meta description that falls within the recommended character count range for optimal search engine display.',
      }
      const result = validateSEOFrontmatter(frontmatter)
      expect(result.success).toBe(true)
    })

    it('should warn for too many keywords', () => {
      const frontmatter = {
        keywords: [
          'keyword1',
          'keyword2',
          'keyword3',
          'keyword4',
          'keyword5',
          'keyword6',
          'keyword7',
          'keyword8',
          'keyword9',
          'keyword10',
          'keyword11',
        ],
      }
      const result = validateSEOFrontmatter(frontmatter)
      expect(result.success).toBe(true)
      expect(result.warnings).toBeDefined()
      expect(result.warnings!.some(w => w.includes('keywords'))).toBe(true)
    })

    it('should warn for noindex flag', () => {
      const frontmatter = {
        noindex: true,
      }
      const result = validateSEOFrontmatter(frontmatter)
      expect(result.success).toBe(true)
      expect(result.warnings).toBeDefined()
      expect(result.warnings![0]).toContain('noindex')
    })

    it('should aggregate errors from title and description', () => {
      const frontmatter = {
        title: 'Way too long title that exceeds the maximum recommended character limit',
        description: 'Short',
      }
      const result = validateSEOFrontmatter(frontmatter)
      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors!.length).toBeGreaterThan(0)
    })
  })

  describe('validateImageSEO', () => {
    it('should pass for images with all required attributes', () => {
      const image = {
        src: '/images/blog/post.jpg',
        alt: 'Diagram showing API architecture',
        width: 800,
        height: 600,
      }
      const result = validateImageSEO(image)
      expect(result.success).toBe(true)
    })

    it('should error for missing alt text', () => {
      const image = {
        src: '/images/blog/post.jpg',
        width: 800,
        height: 600,
      }
      const result = validateImageSEO(image)
      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors![0]).toContain('Alt text')
    })

    it('should error for missing dimensions', () => {
      const image = {
        src: '/images/blog/post.jpg',
        alt: 'Diagram',
      }
      const result = validateImageSEO(image)
      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors!.some(e => e.includes('width and height'))).toBe(true)
    })

    it('should warn for excessively long alt text', () => {
      const image = {
        src: '/images/blog/post.jpg',
        alt: 'This is an extremely detailed and verbose alt text description that far exceeds the recommended maximum character count of one hundred and twenty-five characters for screen reader compatibility',
        width: 800,
        height: 600,
      }
      const result = validateImageSEO(image)
      expect(result.success).toBe(true)
      expect(result.warnings).toBeDefined()
      expect(result.warnings![0]).toContain('125 characters')
    })

    it('should error for empty alt text', () => {
      const image = {
        src: '/images/blog/post.jpg',
        alt: '',
        width: 800,
        height: 600,
      }
      const result = validateImageSEO(image)
      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
    })

    it('should error for whitespace-only alt text', () => {
      const image = {
        src: '/images/blog/post.jpg',
        alt: '   ',
        width: 800,
        height: 600,
      }
      const result = validateImageSEO(image)
      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
    })
  })
})
