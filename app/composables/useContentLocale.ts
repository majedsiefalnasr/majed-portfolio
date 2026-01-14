/**
 * useContentLocale Composable
 *
 * Provides locale-aware content querying for bilingual content files.
 * Files follow the naming convention:
 * - English (default): post-slug.md, case-study-slug.md
 * - Arabic: post-slug.ar.md, case-study-slug.ar.md
 *
 * Uses Nuxt Content v3 queryCollection API with post-query filtering.
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
  ) => Promise<T[]>
}

export function useContentLocale(): UseContentLocaleReturn {
  const {locale} = useI18n()
  const currentLocale = computed(() => locale.value as 'en' | 'ar')

  /**
   * Get locale-specific content file path
   * @param slug - Base slug without extension (e.g., 'my-post', 'my-case-study')
   * @returns Full path with locale suffix for non-English (e.g., 'my-post.ar' for Arabic)
   */
  const getContentPath = (slug: string): string => {
    if (currentLocale.value === 'ar') {
      return `${slug}.ar`
    }
    return slug
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
  const queryContentByLocale = async <T extends ContentItem = ContentItem>(
    collection: 'blog' | 'caseStudies'
  ): Promise<T[]> => {
    const isArabic = currentLocale.value === 'ar'

    try {
      // Fetch all items from the collection
      const allItems = await queryCollection<T>(collection).all()

      if (isArabic) {
        // For Arabic, only include files with .ar suffix AND exclude drafts (/_)
        // Example: /2026/post-slug.ar
        const filtered = allItems.filter((item: T) => {
          const path = (item?.path ?? item?._path ?? '') as string
          const isArabicFile = path.endsWith('.ar')
          const isDraft = path.includes('/_')
          return isArabicFile && !isDraft
        })
        return filtered
      } else {
        // For English (default), exclude files with .ar suffix AND exclude drafts (/_)
        // Example: /2026/post-slug (but NOT /2026/post-slug.ar or /2026/_draft)
        const filtered = allItems.filter((item: T) => {
          const path = (item?.path ?? item?._path ?? '') as string
          const isArabicFile = path.endsWith('.ar')
          const isDraft = path.includes('/_')
          return !isArabicFile && !isDraft
        })
        return filtered
      }
    } catch {
      // Silently handle errors and return empty array
      return []
    }
  }

  return {
    currentLocale,
    getContentPath,
    queryContentByLocale,
  }
}
