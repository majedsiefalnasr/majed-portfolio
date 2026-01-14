/**
 * useContentSEO - Generate SEO meta tags and JSON-LD schema for content
 *
 * Handles Article schema for blog posts and CreativeWork for case studies
 */

import type {BlogPost, CaseStudy, ArticleSchema, CreativeWorkSchema} from '~/types/content'

export function useContentSEO(
  content: BlogPost | CaseStudy,
  type: 'article' | 'project' = 'article'
): void {
  const siteConfig = useSiteConfig()
  const route = useRoute()
  const {locale} = useI18n()
  const switchLocalePath = useSwitchLocalePath()

  // Generate full URL
  const url = `${siteConfig.url}${route.path}`

  // Get excerpt for description
  const description = content.excerpt || useExcerpt(content, 160)

  // Featured image with fallback
  const image = content.featuredImage
    ? `${siteConfig.url}${content.featuredImage}`
    : `${siteConfig.url}/og-image.svg`

  // Generate alternate language URLs for hreflang
  const alternateLinks = []
  const locales = ['en', 'ar']

  for (const loc of locales) {
    const alternatePath = switchLocalePath(loc)
    if (alternatePath) {
      alternateLinks.push({
        rel: 'alternate',
        hreflang: loc,
        href: `${siteConfig.url}${alternatePath}`,
      })
    }
  }

  // Add x-default for primary language
  alternateLinks.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${siteConfig.url}${switchLocalePath('en')}`,
  })

  // Set page meta
  useSeoMeta({
    title: content.title,
    description,
    ogTitle: content.title,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    ogLocale: locale.value === 'ar' ? 'ar_EG' : 'en_US',
    ogType: type === 'article' ? 'article' : 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: content.title,
    twitterDescription: description,
    twitterImage: image,
  })

  // Add hreflang links
  useHead({
    link: alternateLinks,
  })

  // Generate JSON-LD structured data
  if (type === 'article') {
    const blogPost = content as BlogPost
    const schema: ArticleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blogPost.title,
      datePublished: blogPost.date,
      dateModified: blogPost.updatedAt || blogPost.date,
      author: {
        '@type': 'Person',
        name: blogPost.author || 'Majed Sief Alnasr',
      },
      image: image,
      description: description,
    }

    useSchemaOrg([schema])
  } else {
    const caseStudy = content as CaseStudy
    const schema: CreativeWorkSchema = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: caseStudy.title,
      author: {
        '@type': 'Person',
        name: 'Majed Sief Alnasr',
      },
      dateCreated: caseStudy.date,
      image: image,
      description: description,
    }

    useSchemaOrg([schema])
  }
}
