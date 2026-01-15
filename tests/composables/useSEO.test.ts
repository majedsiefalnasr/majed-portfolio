/**
 * Tests for useSEO Composable
 *
 * @see app/composables/useSEO.ts
 */

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {useContentSEO, useHomepageSEO, useSEO} from '../../app/composables/useSEO'

// Mock Nuxt composables
vi.mock('#app', () => ({
  useSeoMeta: vi.fn(),
  useHead: vi.fn(),
  useRuntimeConfig: vi.fn(() => ({
    public: {
      siteUrl: 'https://test-site.com',
    },
  })),
}))

describe('useSEO Composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useSEO', () => {
    it('should truncate long titles to 60 characters', () => {
      const {useSeoMeta} = require('#app')

      useSEO({
        title: 'This is an extremely long title that exceeds the recommended sixty character limit',
        description: 'A description',
      })

      expect(useSeoMeta).toHaveBeenCalled()
      const call = useSeoMeta.mock.calls[0][0]
      expect(call.title.length).toBeLessThanOrEqual(60)
      expect(call.title).toContain('...')
    })

    it('should truncate long descriptions to 160 characters', () => {
      const {useSeoMeta} = require('#app')

      useSEO({
        title: 'Test Title',
        description:
          'This is an extremely long description that far exceeds the recommended maximum length of one hundred and sixty characters for optimal search engine display and user experience in search results.',
      })

      expect(useSeoMeta).toHaveBeenCalled()
      const call = useSeoMeta.mock.calls[0][0]
      expect(call.description.length).toBeLessThanOrEqual(160)
      expect(call.description).toContain('...')
    })

    it('should set HTML lang and dir attributes', () => {
      const {useHead} = require('#app')

      useSEO({
        title: 'Test',
        description: 'Test description',
        lang: 'ar',
      })

      expect(useHead).toHaveBeenCalled()
      const headCall = useHead.mock.calls.find((call: any) => call[0].htmlAttrs)
      expect(headCall).toBeDefined()
      expect(headCall[0].htmlAttrs.lang).toBe('ar')
      expect(headCall[0].htmlAttrs.dir).toBe('rtl')
    })

    it('should build canonical link tags', () => {
      const {useHead} = require('#app')

      useSEO({
        title: 'Test',
        description: 'Test description',
        canonical: '/blog/my-post',
      })

      expect(useHead).toHaveBeenCalled()
      const linkCall = useHead.mock.calls.find((call: any) => call[0].link)
      expect(linkCall).toBeDefined()
      expect(linkCall[0].link).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            rel: 'canonical',
            href: expect.stringContaining('/blog/my-post'),
          }),
        ])
      )
    })

    it('should build hreflang link tags', () => {
      const {useHead} = require('#app')

      useSEO({
        title: 'Test',
        description: 'Test description',
        alternateLinks: [
          {hreflang: 'en', href: '/blog/my-post'},
          {hreflang: 'ar', href: '/ar/blog/my-post'},
        ],
      })

      expect(useHead).toHaveBeenCalled()
      const linkCall = useHead.mock.calls.find((call: any) => call[0].link)
      expect(linkCall).toBeDefined()
      expect(linkCall[0].link.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('useContentSEO', () => {
    it('should prioritize seo.title over content title', () => {
      const {useSeoMeta} = require('#app')

      const content = {
        title: 'Default Title',
        excerpt: 'Default excerpt',
        seo: {
          title: 'Custom SEO Title',
        },
      }

      useContentSEO(content, {ogType: 'article'})

      expect(useSeoMeta).toHaveBeenCalled()
      const call = useSeoMeta.mock.calls[0][0]
      expect(call.title).toBe('Custom SEO Title')
    })

    it('should prioritize seo.description over excerpt', () => {
      const {useSeoMeta} = require('#app')

      const content = {
        title: 'Title',
        excerpt: 'Default excerpt',
        seo: {
          description: 'Custom SEO description',
        },
      }

      useContentSEO(content, {ogType: 'article'})

      expect(useSeoMeta).toHaveBeenCalled()
      const call = useSeoMeta.mock.calls[0][0]
      expect(call.description).toBe('Custom SEO description')
    })

    it('should use featuredImage as fallback for OG image', () => {
      const {useSeoMeta} = require('#app')

      const content = {
        title: 'Title',
        excerpt: 'Excerpt',
        featuredImage: '/images/blog/post.jpg',
      }

      useContentSEO(content, {ogType: 'article'})

      expect(useSeoMeta).toHaveBeenCalled()
      const call = useSeoMeta.mock.calls[0][0]
      expect(call.ogImage).toContain('/images/blog/post.jpg')
    })

    it('should set noindex robots directive when seo.noindex is true', () => {
      const {useSeoMeta} = require('#app')

      const content = {
        title: 'Title',
        excerpt: 'Excerpt',
        seo: {
          noindex: true,
        },
      }

      useContentSEO(content, {ogType: 'article'})

      expect(useSeoMeta).toHaveBeenCalled()
      const call = useSeoMeta.mock.calls[0][0]
      expect(call.robots).toBe('noindex,follow')
    })

    it('should default to index,follow robots directive', () => {
      const {useSeoMeta} = require('#app')

      const content = {
        title: 'Title',
        excerpt: 'Excerpt',
      }

      useContentSEO(content, {ogType: 'article'})

      expect(useSeoMeta).toHaveBeenCalled()
      const call = useSeoMeta.mock.calls[0][0]
      expect(call.robots).toBe('index,follow')
    })
  })

  describe('useHomepageSEO', () => {
    it('should use default homepage values', () => {
      const {useSeoMeta} = require('#app')

      useHomepageSEO()

      expect(useSeoMeta).toHaveBeenCalled()
      const call = useSeoMeta.mock.calls[0][0]
      expect(call.title).toContain('Majed Sief Alnasr')
      expect(call.ogType).toBe('profile')
    })

    it('should allow custom homepage options', () => {
      const {useSeoMeta} = require('#app')

      useHomepageSEO({
        name: 'Custom Name',
        tagline: 'Custom Tagline',
        description: 'Custom description',
      })

      expect(useSeoMeta).toHaveBeenCalled()
      const call = useSeoMeta.mock.calls[0][0]
      expect(call.title).toContain('Custom Name')
      expect(call.title).toContain('Custom Tagline')
      expect(call.description).toBe('Custom description')
    })

    it('should support Arabic language', () => {
      const {useHead} = require('#app')

      useHomepageSEO({
        lang: 'ar',
      })

      expect(useHead).toHaveBeenCalled()
      const headCall = useHead.mock.calls.find((call: any) => call[0].htmlAttrs)
      expect(headCall).toBeDefined()
      expect(headCall[0].htmlAttrs.lang).toBe('ar')
      expect(headCall[0].htmlAttrs.dir).toBe('rtl')
    })
  })
})
