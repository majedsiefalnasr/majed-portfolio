/**
 * Frontmatter Builder Tests
 *
 * Test YAML frontmatter generation for blog posts and case studies.
 */

import {describe, expect, it} from 'vitest'
import {buildFrontmatter} from '../../app/utils/content-generator/frontmatter-builder'

describe('buildFrontmatter', () => {
  it('builds blog post frontmatter with required fields', () => {
    const metadata = {
      title: 'My Blog Post',
      date: '2026-01-14',
      tags: ['typescript', 'api'],
      lang: 'en' as const,
    }

    const frontmatter = buildFrontmatter(metadata)

    expect(frontmatter).toContain('---')
    expect(frontmatter).toContain("title: 'My Blog Post'")
    expect(frontmatter).toContain('date: 2026-01-14')
    expect(frontmatter).toContain("tags: ['typescript', 'api']")
    expect(frontmatter).toContain("lang: 'en'")
  })

  it('builds blog post frontmatter with optional fields', () => {
    const metadata = {
      title: 'My Blog Post',
      date: '2026-01-14',
      author: 'Majed Sief Alnasr',
      tags: ['typescript'],
      excerpt: 'A great post about TypeScript',
      lang: 'en' as const,
    }

    const frontmatter = buildFrontmatter(metadata)

    expect(frontmatter).toContain("author: 'Majed Sief Alnasr'")
    expect(frontmatter).toContain("excerpt: 'A great post about TypeScript'")
  })

  it('escapes single quotes in YAML strings', () => {
    const metadata = {
      title: "Developer's Guide to TypeScript",
      date: '2026-01-14',
      tags: ['typescript'],
      excerpt: "It's a comprehensive guide",
      lang: 'en' as const,
    }

    const frontmatter = buildFrontmatter(metadata)

    expect(frontmatter).toContain("title: 'Developer''s Guide to TypeScript'")
    expect(frontmatter).toContain("excerpt: 'It''s a comprehensive guide'")
  })

  it('builds case study frontmatter with all required fields', () => {
    const metadata = {
      title: 'AI Dashboard',
      client: 'Acme Corp',
      date: '2026-01-14',
      role: 'Lead Developer',
      timeline: '3 months',
      tags: ['react', 'typescript'],
      featuredImage: '/images/case-studies/2026/ai-dashboard.jpg',
      featured: false,
      order: 999,
      lang: 'en' as const,
    }

    const frontmatter = buildFrontmatter(metadata)

    expect(frontmatter).toContain("title: 'AI Dashboard'")
    expect(frontmatter).toContain("client: 'Acme Corp'")
    expect(frontmatter).toContain("role: 'Lead Developer'")
    expect(frontmatter).toContain("timeline: '3 months'")
    expect(frontmatter).toContain("featuredImage: '/images/case-studies/2026/ai-dashboard.jpg'")
    expect(frontmatter).toContain('featured: false')
    expect(frontmatter).toContain('order: 999')
  })

  it('builds case study frontmatter with testimonial', () => {
    const metadata = {
      title: 'Test Project',
      client: 'Client',
      date: '2026-01-14',
      role: 'Developer',
      timeline: '1 month',
      tags: ['test'],
      featuredImage: '/images/test.jpg',
      testimonial: {
        quote: 'Excellent work!',
        author: 'John Doe',
        position: 'CEO',
      },
      lang: 'en' as const,
    }

    const frontmatter = buildFrontmatter(metadata)

    expect(frontmatter).toContain('testimonial:')
    expect(frontmatter).toContain("  quote: 'Excellent work!'")
    expect(frontmatter).toContain("  author: 'John Doe'")
    expect(frontmatter).toContain("  position: 'CEO'")
  })

  it('builds case study frontmatter with metrics array', () => {
    const metadata = {
      title: 'Test Project',
      client: 'Client',
      date: '2026-01-14',
      role: 'Developer',
      timeline: '1 month',
      tags: ['test'],
      featuredImage: '/images/test.jpg',
      metrics: [
        {label: 'Users', value: '10,000+'},
        {label: 'Performance', value: '2x faster'},
      ],
      lang: 'en' as const,
    }

    const frontmatter = buildFrontmatter(metadata)

    expect(frontmatter).toContain('metrics:')
    expect(frontmatter).toContain("  - label: 'Users'")
    expect(frontmatter).toContain("    value: '10,000+'")
    expect(frontmatter).toContain("  - label: 'Performance'")
    expect(frontmatter).toContain("    value: '2x faster'")
  })

  it('handles empty metrics array gracefully', () => {
    const metadata = {
      title: 'Test Project',
      client: 'Client',
      date: '2026-01-14',
      role: 'Developer',
      timeline: '1 month',
      tags: ['test'],
      featuredImage: '/images/test.jpg',
      metrics: [],
      lang: 'en' as const,
    }

    const frontmatter = buildFrontmatter(metadata)

    // Should not include metrics section for empty array
    expect(frontmatter).not.toContain('metrics:')
  })

  it('starts and ends with YAML delimiters', () => {
    const metadata = {
      title: 'Test',
      date: '2026-01-14',
      tags: ['test'],
      lang: 'en' as const,
    }

    const frontmatter = buildFrontmatter(metadata)

    expect(frontmatter.startsWith('---\n')).toBe(true)
    expect(frontmatter.endsWith('---')).toBe(true)
  })

  it('handles Arabic language', () => {
    const metadata = {
      title: 'عنوان المقال',
      date: '2026-01-14',
      tags: ['typescript'],
      lang: 'ar' as const,
    }

    const frontmatter = buildFrontmatter(metadata)

    expect(frontmatter).toContain("title: 'عنوان المقال'")
    expect(frontmatter).toContain("lang: 'ar'")
  })

  it('preserves field order consistently', () => {
    const metadata = {
      title: 'Test',
      date: '2026-01-14',
      author: 'Author',
      tags: ['test'],
      excerpt: 'Excerpt',
      lang: 'en' as const,
    }

    const frontmatter = buildFrontmatter(metadata)
    const lines = frontmatter.split('\n')

    // Title should come before date
    const titleIndex = lines.findIndex(l => l.includes('title:'))
    const dateIndex = lines.findIndex(l => l.includes('date:'))
    const authorIndex = lines.findIndex(l => l.includes('author:'))
    const tagsIndex = lines.findIndex(l => l.includes('tags:'))

    expect(titleIndex).toBeLessThan(dateIndex)
    expect(dateIndex).toBeLessThan(authorIndex)
    expect(authorIndex).toBeLessThan(tagsIndex)
  })
})
