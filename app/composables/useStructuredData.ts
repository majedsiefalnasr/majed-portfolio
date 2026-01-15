/**
 * useStructuredData Composable
 *
 * Composable for generating and injecting Schema.org structured data (JSON-LD).
 * Provides type-safe builders for Article, CreativeWork, Person, and Breadcrumb schemas.
 *
 * @see specs/005-seo-optimization/data-model.md
 * @see specs/005-seo-optimization/contracts/
 */

import type {
  ArticleSchema,
  BreadcrumbItem,
  BreadcrumbListSchema,
  CreativeWorkSchema,
  PersonSchema,
} from '~/types/seo'

/**
 * Base composable for injecting structured data
 * Uses Nuxt's useHead to inject JSON-LD script tags
 *
 * @param schema - Schema.org structured data object
 */
function useStructuredDataBase(schema: unknown) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
      },
    ],
  })
}

/**
 * Generates Article schema for blog posts
 * Complies with Schema.org BlogPosting/Article specification
 *
 * @param article - Article data
 *
 * @example
 * useArticleSchema({
 *   headline: 'Understanding TypeScript Generics',
 *   description: 'A deep dive into TypeScript generic types',
 *   author: 'Majed Sief Alnasr',
 *   datePublished: '2026-01-15',
 *   image: '/images/blog/typescript-generics.png',
 *   keywords: ['TypeScript', 'Generics', 'Programming'],
 * })
 */
export function useArticleSchema(article: {
  headline: string
  description?: string
  author: string
  datePublished: string
  dateModified?: string
  image?: string | string[]
  keywords?: string[]
  url?: string
}) {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://majedsiefalnasr.dev'

  const schema: ArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.headline,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.datePublished,
    ...(article.dateModified && {dateModified: article.dateModified}),
    ...(article.description && {description: article.description}),
    ...(article.image && {
      image: Array.isArray(article.image)
        ? article.image.map(img => (img.startsWith('http') ? img : `${siteUrl}${img}`))
        : article.image.startsWith('http')
          ? article.image
          : `${siteUrl}${article.image}`,
    }),
    ...(article.keywords && {keywords: article.keywords}),
    publisher: {
      '@type': 'Person',
      name: article.author,
    },
  }

  useStructuredDataBase(schema)
}

/**
 * Generates CreativeWork schema for case studies
 * Represents portfolio projects and creative work
 *
 * @param work - Creative work data
 *
 * @example
 * useCreativeWorkSchema({
 *   name: 'E-commerce Platform',
 *   description: 'Built a scalable e-commerce solution with Nuxt and Stripe',
 *   author: 'Majed Sief Alnasr',
 *   datePublished: '2025-12-01',
 *   keywords: ['E-commerce', 'Nuxt', 'Stripe', 'TypeScript'],
 *   about: 'Full-stack development',
 * })
 */
export function useCreativeWorkSchema(work: {
  name: string
  description: string
  author: string
  datePublished: string
  keywords?: string[]
  about?: string
  url?: string
}) {
  const schema: CreativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.name,
    description: work.description,
    author: {
      '@type': 'Person',
      name: work.author,
    },
    datePublished: work.datePublished,
    ...(work.keywords && {keywords: work.keywords}),
    ...(work.about && {about: work.about}),
  }

  useStructuredDataBase(schema)
}

/**
 * Generates Person schema for homepage/profile pages
 * Represents the portfolio owner's professional information
 *
 * @param person - Person data
 *
 * @example
 * usePersonSchema({
 *   name: 'Majed Sief Alnasr',
 *   description: 'Full-Stack Developer specializing in Vue.js and TypeScript',
 *   jobTitle: 'Senior Full-Stack Developer',
 *   url: 'https://majedsiefalnasr.dev',
 *   sameAs: [
 *     'https://github.com/majedsiefalnasr',
 *     'https://linkedin.com/in/majedsiefalnasr',
 *     'https://twitter.com/majedsiefalnasr',
 *   ],
 *   image: '/images/profile.jpg',
 * })
 */
export function usePersonSchema(person: {
  name: string
  description?: string
  jobTitle?: string
  url?: string
  sameAs?: string[]
  image?: string
}) {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://majedsiefalnasr.dev'

  const schema: PersonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    ...(person.description && {description: person.description}),
    ...(person.jobTitle && {jobTitle: person.jobTitle}),
    ...(person.url && {url: person.url}),
    ...(person.sameAs && person.sameAs.length > 0 && {sameAs: person.sameAs}),
    ...(person.image && {
      image: person.image.startsWith('http') ? person.image : `${siteUrl}${person.image}`,
    }),
  }

  useStructuredDataBase(schema)
}

/**
 * Generates BreadcrumbList schema for navigation
 * Helps search engines understand site hierarchy
 *
 * @param breadcrumbs - Array of breadcrumb items
 *
 * @example
 * useBreadcrumbSchema([
 *   { name: 'Home', url: '/' },
 *   { name: 'Blog', url: '/blog' },
 *   { name: 'TypeScript Generics' }, // Current page (no URL)
 * ])
 */
export function useBreadcrumbSchema(
  breadcrumbs: Array<{
    name: string
    url?: string
  }>
) {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://majedsiefalnasr.dev'

  const itemListElement: BreadcrumbItem[] = breadcrumbs.map((crumb, index) => {
    const item: BreadcrumbItem = {
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
    }

    // Only add item (URL) if it's not the current page (last item)
    if (crumb.url && index < breadcrumbs.length - 1) {
      item.item = crumb.url.startsWith('http') ? crumb.url : `${siteUrl}${crumb.url}`
    }

    return item
  })

  const schema: BreadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }

  useStructuredDataBase(schema)
}

/**
 * Convenience composable for blog post structured data
 * Combines Article schema with Breadcrumb schema
 *
 * @param post - Blog post data
 *
 * @example
 * useBlogPostStructuredData({
 *   title: 'Understanding TypeScript Generics',
 *   excerpt: 'A deep dive into TypeScript generic types',
 *   author: 'Majed Sief Alnasr',
 *   date: '2026-01-15',
 *   image: '/images/blog/typescript-generics.png',
 *   tags: ['TypeScript', 'Generics'],
 *   slug: 'understanding-typescript-generics',
 * })
 */
export function useBlogPostStructuredData(post: {
  title: string
  excerpt?: string
  author: string
  date: string
  dateModified?: string
  image?: string
  tags?: string[]
  slug: string
}) {
  // Article schema
  useArticleSchema({
    headline: post.title,
    description: post.excerpt,
    author: post.author,
    datePublished: post.date,
    dateModified: post.dateModified,
    image: post.image,
    keywords: post.tags,
  })

  // Breadcrumb schema
  useBreadcrumbSchema([
    {name: 'Home', url: '/'},
    {name: 'Blog', url: '/blog'},
    {name: post.title}, // Current page
  ])
}

/**
 * Convenience composable for case study structured data
 * Combines CreativeWork schema with Breadcrumb schema
 *
 * @param caseStudy - Case study data
 *
 * @example
 * useCaseStudyStructuredData({
 *   title: 'E-commerce Platform',
 *   description: 'Built a scalable e-commerce solution',
 *   author: 'Majed Sief Alnasr',
 *   date: '2025-12-01',
 *   tags: ['E-commerce', 'Nuxt', 'Stripe'],
 *   slug: 'ecommerce-platform',
 * })
 */
export function useCaseStudyStructuredData(caseStudy: {
  title: string
  excerpt?: string
  author?: string
  date: string
  tags?: string[]
  role?: string
  slug: string
}) {
  // CreativeWork schema
  useCreativeWorkSchema({
    name: caseStudy.title,
    description: caseStudy.excerpt || caseStudy.title,
    author: caseStudy.author || 'Majed Sief Alnasr',
    datePublished: caseStudy.date,
    keywords: caseStudy.tags,
    about: caseStudy.role,
  })

  // Breadcrumb schema
  useBreadcrumbSchema([
    {name: 'Home', url: '/'},
    {name: 'Case Studies', url: '/case-studies'},
    {name: caseStudy.title}, // Current page
  ])
}

/**
 * Generic composable for any Schema.org type
 * Use when specific helpers don't cover your use case
 *
 * @param schema - Complete Schema.org object
 */
export function useStructuredData(schema: Record<string, unknown>) {
  useStructuredDataBase(schema)
}
