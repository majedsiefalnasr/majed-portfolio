/**
 * Tests for useStructuredData Composable
 *
 * @see app/composables/useStructuredData.ts
 */

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {
  useArticleSchema,
  useBlogPostStructuredData,
  useBreadcrumbSchema,
  useCaseStudyStructuredData,
  useCreativeWorkSchema,
  usePersonSchema,
} from '../../app/composables/useStructuredData'

// Mock Nuxt composables
vi.mock('#app', () => ({
  useHead: vi.fn(),
  useRuntimeConfig: vi.fn(() => ({
    public: {
      siteUrl: 'https://test-site.com',
    },
  })),
}))

describe('useStructuredData Composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useArticleSchema', () => {
    it('should generate valid Article schema', () => {
      const {useHead} = require('#app')

      const schema = {
        headline: 'Building a Scalable API',
        description: 'Learn how to build APIs',
        author: 'John Doe',
        datePublished: '2026-01-15',
        image: 'https://test-site.com/images/blog/api.jpg',
      }

      useArticleSchema(schema)

      expect(useHead).toHaveBeenCalled()
      const call = useHead.mock.calls[0][0]
      expect(call.script).toBeDefined()
      expect(call.script.length).toBe(1)
      expect(call.script[0].type).toBe('application/ld+json')

      const jsonLd = JSON.parse(call.script[0].innerHTML)
      expect(jsonLd['@type']).toBe('Article')
      expect(jsonLd.headline).toBe('Building a Scalable API')
      expect(jsonLd.author.name).toBe('John Doe')
    })

    it('should include optional fields when provided', () => {
      const {useHead} = require('#app')

      const schema = {
        headline: 'Test Article',
        description: 'Test description',
        author: 'John Doe',
        datePublished: '2026-01-15',
        dateModified: '2026-01-16',
        keywords: ['test', 'article'],
      }

      useArticleSchema(schema)

      const call = useHead.mock.calls[0][0]
      const jsonLd = JSON.parse(call.script[0].innerHTML)
      expect(jsonLd.dateModified).toBe('2026-01-16')
      expect(jsonLd.keywords).toEqual(['test', 'article'])
    })
  })

  describe('useCreativeWorkSchema', () => {
    it('should generate valid CreativeWork schema', () => {
      const {useHead} = require('#app')

      const schema = {
        name: 'E-commerce Platform Redesign',
        description: 'Complete platform redesign',
        author: 'Jane Doe',
        datePublished: '2025-12-01',
      }

      useCreativeWorkSchema(schema)

      expect(useHead).toHaveBeenCalled()
      const call = useHead.mock.calls[0][0]
      const jsonLd = JSON.parse(call.script[0].innerHTML)
      expect(jsonLd['@type']).toBe('CreativeWork')
      expect(jsonLd.name).toBe('E-commerce Platform Redesign')
    })
  })

  describe('usePersonSchema', () => {
    it('should generate valid Person schema', () => {
      const {useHead} = require('#app')

      const schema = {
        name: 'Majed Sief Alnasr',
        jobTitle: 'Full Stack Developer',
        description: 'Portfolio description',
        url: 'https://test-site.com',
      }

      usePersonSchema(schema)

      expect(useHead).toHaveBeenCalled()
      const call = useHead.mock.calls[0][0]
      const jsonLd = JSON.parse(call.script[0].innerHTML)
      expect(jsonLd['@type']).toBe('Person')
      expect(jsonLd.name).toBe('Majed Sief Alnasr')
      expect(jsonLd.jobTitle).toBe('Full Stack Developer')
    })

    it('should include social media links when provided', () => {
      const {useHead} = require('#app')

      const schema = {
        name: 'Test Person',
        jobTitle: 'Developer',
        sameAs: ['https://twitter.com/test', 'https://github.com/test'],
      }

      usePersonSchema(schema)

      const call = useHead.mock.calls[0][0]
      const jsonLd = JSON.parse(call.script[0].innerHTML)
      expect(jsonLd.sameAs).toEqual(['https://twitter.com/test', 'https://github.com/test'])
    })
  })

  describe('useBreadcrumbSchema', () => {
    it('should generate valid BreadcrumbList schema', () => {
      const {useHead} = require('#app')

      const breadcrumbs = [
        {name: 'Home', url: '/'},
        {name: 'Blog', url: '/blog'},
        {name: 'My Post', url: '/blog/my-post'},
      ]

      useBreadcrumbSchema(breadcrumbs)

      expect(useHead).toHaveBeenCalled()
      const call = useHead.mock.calls[0][0]
      const jsonLd = JSON.parse(call.script[0].innerHTML)
      expect(jsonLd['@type']).toBe('BreadcrumbList')
      expect(jsonLd.itemListElement).toHaveLength(3)
      expect(jsonLd.itemListElement[0].position).toBe(1)
      expect(jsonLd.itemListElement[0].name).toBe('Home')
    })

    it('should build absolute URLs for breadcrumb items', () => {
      const {useHead} = require('#app')

      const breadcrumbs = [
        {name: 'Home', url: '/'},
        {name: 'Blog', url: '/blog'},
      ]

      useBreadcrumbSchema(breadcrumbs)

      const call = useHead.mock.calls[0][0]
      const jsonLd = JSON.parse(call.script[0].innerHTML)
      expect(jsonLd.itemListElement[0].item).toContain('https://')
      expect(jsonLd.itemListElement[1].item).toContain('https://')
    })
  })

  describe('useBlogPostStructuredData', () => {
    it('should generate complete blog post structured data', () => {
      const {useHead} = require('#app')

      const post = {
        title: 'Test Blog Post',
        excerpt: 'This is a test excerpt',
        date: '2026-01-15',
        author: 'John Doe',
        featuredImage: '/images/blog/test.jpg',
        path: '/blog/test-post',
        slug: 'test-post',
        tags: ['test', 'blog'],
      }

      useBlogPostStructuredData(post)

      expect(useHead).toHaveBeenCalled()
      const call = useHead.mock.calls[0][0]
      const jsonLd = JSON.parse(call.script[0].innerHTML)
      expect(jsonLd['@type']).toBe('BlogPosting')
      expect(jsonLd.headline).toBe('Test Blog Post')
      expect(jsonLd.keywords).toEqual(['test', 'blog'])
    })

    it('should use default author when not provided', () => {
      const {useHead} = require('#app')

      const post = {
        title: 'Test Post',
        excerpt: 'Excerpt',
        date: '2026-01-15',
        author: 'Majed Sief Alnasr',
        path: '/blog/test',
        slug: 'test',
      }

      useBlogPostStructuredData(post)

      const call = useHead.mock.calls[0][0]
      const jsonLd = JSON.parse(call.script[0].innerHTML)
      expect(jsonLd.author.name).toBe('Majed Sief Alnasr')
    })
  })

  describe('useCaseStudyStructuredData', () => {
    it('should generate complete case study structured data', () => {
      const {useHead} = require('#app')

      const caseStudy = {
        title: 'E-commerce Platform',
        excerpt: 'Platform redesign project',
        date: '2025-12-01',
        client: 'Tech Corp',
        featuredImage: '/images/case-studies/ecommerce.jpg',
        path: '/case-studies/ecommerce',
        slug: 'ecommerce',
      }

      useCaseStudyStructuredData(caseStudy)

      expect(useHead).toHaveBeenCalled()
      const call = useHead.mock.calls[0][0]
      const jsonLd = JSON.parse(call.script[0].innerHTML)
      expect(jsonLd['@type']).toBe('CreativeWork')
      expect(jsonLd.name).toBe('E-commerce Platform')
      expect(jsonLd.creator).toBe('Tech Corp')
    })

    it('should include metrics when provided', () => {
      const {useHead} = require('#app')

      const caseStudy = {
        title: 'Test Project',
        excerpt: 'Test description',
        date: '2025-12-01',
        path: '/case-studies/test',
        slug: 'test',
        metrics: [
          {label: 'Performance', value: '+35%'},
          {label: 'Conversion', value: '+20%'},
        ],
      }

      useCaseStudyStructuredData(caseStudy)

      const call = useHead.mock.calls[0][0]
      const jsonLd = JSON.parse(call.script[0].innerHTML)
      expect(jsonLd.description).toContain('Performance')
      expect(jsonLd.description).toContain('35%')
    })
  })
})
