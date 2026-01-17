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
  ) => any // Query builder
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
   * Filters results based on locale after fetching
   * Path detection:
   * - For typed collections, entries expose `path` (not `_path`)
   * - For legacy content queries, entries may expose `_path`
   * We normalize to `docPath = item.path ?? item._path` and check `.endsWith('.ar')`.
   * @param collection - Content collection name ('blog' or 'caseStudies')
   * @returns Promise resolving to locale-filtered content array
   */
  const queryContentByLocale = <T extends ContentItem = ContentItem>(
    collection: 'blog' | 'caseStudies'
  ) => {
    // Fetch all items and filter by locale manually to avoid where() issues
    return queryCollection<T>(collection)
      .all()
      .then(items => {
        const filtered =
          items?.filter(
            item =>
              item.lang === currentLocale.value &&
              !item.path?.includes('/_draft') &&
              !item.stem?.includes('_draft')
          ) || []
        return filtered
      })
  }

  return {
    currentLocale,
    getContentPath,
    queryContentByLocale,
  }
}
