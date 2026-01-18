import {defineCollection, defineContentConfig} from '@nuxt/content'
import {z} from 'zod'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: [
        {
          include: 'blog/en/**/*.md',
          exclude: ['blog/en/**/*_draft*.md'],
          prefix: '/blog',
        },
        {
          include: 'blog/ar/**/*.md',
          exclude: ['blog/ar/**/*_draft*.md'],
          prefix: '/ar/blog',
        },
      ],
      schema: z.object({
        title: z.string(),
        date: z.string(),
        author: z.string().optional(),
        tags: z.array(z.string()).optional(),
        excerpt: z.string().optional(),
        featuredImage: z.string().optional(),
        lang: z.string().optional(),
        sameAs: z.array(z.string()).optional(),
      }),
    }),
    caseStudies: defineCollection({
      type: 'page',
      source: [
        {
          include: 'case-studies/en/**/*.md',
          exclude: ['case-studies/en/**/*_draft*.md'],
          prefix: '/case-studies',
        },
        {
          include: 'case-studies/ar/**/*.md',
          exclude: ['case-studies/ar/**/*_draft*.md'],
          prefix: '/ar/case-studies',
        },
      ],
      schema: z.object({
        title: z.string(),
        client: z.string(),
        date: z.string(),
        role: z.string(),
        timeline: z.string(),
        tags: z.array(z.string()),
        excerpt: z.string().optional(),
        featuredImage: z.string(),
        testimonial: z
          .object({
            quote: z.string(),
            author: z.string(),
            position: z.string(),
          })
          .optional(),
        metrics: z
          .array(
            z.object({
              label: z.string(),
              value: z.string(),
              icon: z.string().optional(),
            })
          )
          .optional(),
        featured: z.boolean().optional(),
        order: z.number().optional(),
        lang: z.string().optional(),
        sameAs: z.array(z.string()).optional(),
      }),
    }),
  },
})
