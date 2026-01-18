/**
 * useContentLocale Composable
 *
 * Provides locale-aware content querying for multilingual content files.
 * Files follow the new directory structure:
 * - content/{type}/{lang}/YYYY/slug.md
 * - e.g., content/blog/en/2026/post-slug.md
 * - e.g., content/blog/ar/2026/post-slug.md
 *
 * Uses Nuxt Content v3 queryCollection API with path-based querying.
 */

interface ContentItem {
  path?: string
  _path?: string
}

interface UseContentLocaleReturn {
  currentLocale: Ref<'en' | 'ar'>
  getContentPath: (slug: string) => string
  queryContentByLocale: <T extends ContentItem = ContentItem>(
    collection: 'blog' | 'caseStudies'
  ) => unknown
}

export function useContentLocale(): UseContentLocaleReturn {
  const {locale} = useI18n()
  const currentLocale = computed(() => locale.value as 'en' | 'ar')

  /**
   * Get locale-specific content file path
   * @param slug - Slug which may include lang/YYYY/ or just slug
   * @returns Full path with locale prefix if not present
   */
  const getContentPath = (slug: string): string => {
    // If slug already includes lang (e.g., 'en/2026/my-post'), use as is
    if (slug.match(/^(en|ar)\/\d{4}\//)) {
      return slug
    }
    // Otherwise, construct path with current locale
    const year = new Date().getFullYear() // Default to current year, can be improved
    return `${currentLocale.value}/${year}/${slug}`
  }

  /**
   * Query content with locale-specific filtering using queryCollection (Nuxt Content v3)
   * Uses server-side .where() clause for better performance
   * @param collection - Content collection name ('blog' or 'caseStudies')
   * @returns Promise resolving to locale-filtered content array
   */
  const queryContentByLocale = <T extends ContentItem = ContentItem>(
    collection: 'blog' | 'caseStudies'
  ) => {
    return queryCollection(collection)
      .where('lang', '=', currentLocale.value)
      .where('stem', 'NOT LIKE', '\\_%')
      .all()
  }

  return {
    currentLocale,
    getContentPath,
    queryContentByLocale,
  }
}
