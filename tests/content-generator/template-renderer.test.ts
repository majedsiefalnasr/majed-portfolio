/**
 * Template Renderer Tests
 *
 * Test markdown template rendering for blog posts and case studies.
 */

import {describe, expect, it} from 'vitest'
import type {BlogPostMetadata, CaseStudyMetadata} from '../../app/utils/content-generator/schemas'
import {renderBlogPost, renderCaseStudy} from '../../app/utils/content-generator/template-renderer'

describe('renderBlogPost', () => {
  const mockMetadata: BlogPostMetadata = {
    title: 'Test Post',
    date: '2026-01-14',
    tags: ['typescript', 'testing'],
    excerpt: 'A test post for unit testing',
    lang: 'en',
  }

  it('renders metadata-only blog post with placeholders', () => {
    const result = renderBlogPost({
      metadata: mockMetadata,
      mode: 'metadata-only',
    })

    expect(result).toContain('---')
    expect(result).toContain("title: 'Test Post'")
    expect(result).toContain('## Introduction')
    expect(result).toContain('Write your introduction here...')
    expect(result).toContain('## Main Content')
    expect(result).toContain('## Conclusion')
  })

  it('renders full blog post with provided sections', () => {
    const result = renderBlogPost({
      metadata: mockMetadata,
      mode: 'full',
      sections: {
        introduction: '## Introduction\n\nThis is the intro.',
        mainContent: '## Main Section\n\nThis is the main content.',
        conclusion: '## Conclusion\n\nThis is the conclusion.',
      },
    })

    expect(result).toContain('---')
    expect(result).toContain("title: 'Test Post'")
    expect(result).toContain('This is the intro.')
    expect(result).toContain('This is the main content.')
    expect(result).toContain('This is the conclusion.')
  })

  it('throws error when sections are missing in full mode', () => {
    expect(() => {
      renderBlogPost({
        metadata: mockMetadata,
        mode: 'full',
      })
    }).toThrow('Sections are required for full content mode')
  })

  it('includes frontmatter with all metadata fields', () => {
    const richMetadata: BlogPostMetadata = {
      ...mockMetadata,
      author: 'Majed Sief Alnasr',
      featuredImage: '/images/blog/test.jpg',
    }

    const result = renderBlogPost({
      metadata: richMetadata,
      mode: 'metadata-only',
    })

    expect(result).toContain("author: 'Majed Sief Alnasr'")
    expect(result).toContain("featuredImage: '/images/blog/test.jpg'")
  })

  it('preserves markdown formatting in sections', () => {
    const result = renderBlogPost({
      metadata: mockMetadata,
      mode: 'full',
      sections: {
        introduction: '## Introduction\n\nHere is some **bold** text and `code` examples.',
        mainContent: '## Main\n\n- List item 1\n- List item 2',
        conclusion: '## Conclusion\n\n> A quote',
      },
    })

    expect(result).toContain('**bold**')
    expect(result).toContain('`code`')
    expect(result).toContain('- List item 1')
    expect(result).toContain('> A quote')
  })
})

describe('renderCaseStudy', () => {
  const mockMetadata: CaseStudyMetadata = {
    title: 'Test Project',
    client: 'Acme Corp',
    date: '2026-01-14',
    role: 'Lead Developer',
    timeline: '3 months',
    tags: ['react', 'typescript'],
    featuredImage: '/images/case-studies/test.jpg',
    featured: false,
    order: 999,
    lang: 'en',
  }

  it('renders metadata-only case study with placeholders', () => {
    const result = renderCaseStudy({
      metadata: mockMetadata,
      mode: 'metadata-only',
    })

    expect(result).toContain('---')
    expect(result).toContain("title: 'Test Project'")
    expect(result).toContain("client: 'Acme Corp'")
    expect(result).toContain('## Overview')
    expect(result).toContain('Write project overview here...')
    expect(result).toContain('## Challenge')
    expect(result).toContain('## Solution')
    expect(result).toContain('## Results')
    expect(result).toContain('## Technologies Used')
  })

  it('renders full case study with provided sections', () => {
    const result = renderCaseStudy({
      metadata: mockMetadata,
      mode: 'full',
      sections: {
        overview: '## Overview\n\nProject overview goes here.',
        challenge: '## Challenge\n\nThe challenge was...',
        solution: '## Solution\n\nWe solved it by...',
        results: '## Results\n\nAchieved great results.',
      },
    })

    expect(result).toContain('Project overview goes here.')
    expect(result).toContain('The challenge was...')
    expect(result).toContain('We solved it by...')
    expect(result).toContain('Achieved great results.')
  })

  it('includes optional technologies section when provided', () => {
    const result = renderCaseStudy({
      metadata: mockMetadata,
      mode: 'full',
      sections: {
        overview: '## Overview\n\nOverview',
        challenge: '## Challenge\n\nChallenge',
        solution: '## Solution\n\nSolution',
        results: '## Results\n\nResults',
        technologiesUsed: '## Technologies Used\n\n- React\n- TypeScript',
      },
    })

    expect(result).toContain('## Technologies Used')
    expect(result).toContain('- React')
    expect(result).toContain('- TypeScript')
  })

  it('omits technologies section when not provided', () => {
    const result = renderCaseStudy({
      metadata: mockMetadata,
      mode: 'full',
      sections: {
        overview: '## Overview\n\nOverview',
        challenge: '## Challenge\n\nChallenge',
        solution: '## Solution\n\nSolution',
        results: '## Results\n\nResults',
      },
    })

    // Should only have the frontmatter and 4 main sections
    const sectionCount = (result.match(/## /g) || []).length
    expect(sectionCount).toBe(4) // Overview, Challenge, Solution, Results
  })

  it('throws error when sections are missing in full mode', () => {
    expect(() => {
      renderCaseStudy({
        metadata: mockMetadata,
        mode: 'full',
      })
    }).toThrow('Sections are required for full content mode')
  })

  it('includes testimonial in frontmatter when provided', () => {
    const metadataWithTestimonial: CaseStudyMetadata = {
      ...mockMetadata,
      testimonial: {
        quote: 'Excellent work!',
        author: 'John Doe',
        position: 'CEO',
      },
    }

    const result = renderCaseStudy({
      metadata: metadataWithTestimonial,
      mode: 'metadata-only',
    })

    expect(result).toContain('testimonial:')
    expect(result).toContain("quote: 'Excellent work!'")
    expect(result).toContain("author: 'John Doe'")
  })

  it('includes metrics in frontmatter when provided', () => {
    const metadataWithMetrics: CaseStudyMetadata = {
      ...mockMetadata,
      metrics: [
        {label: 'Users', value: '10,000+'},
        {label: 'Performance', value: '2x'},
      ],
    }

    const result = renderCaseStudy({
      metadata: metadataWithMetrics,
      mode: 'metadata-only',
    })

    expect(result).toContain('metrics:')
    expect(result).toContain("label: 'Users'")
    expect(result).toContain("value: '10,000+'")
  })

  it('handles featured case study with custom order', () => {
    const featuredMetadata: CaseStudyMetadata = {
      ...mockMetadata,
      featured: true,
      order: 1,
    }

    const result = renderCaseStudy({
      metadata: featuredMetadata,
      mode: 'metadata-only',
    })

    expect(result).toContain('featured: true')
    expect(result).toContain('order: 1')
  })
})
