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

interface UseContentLocaleReturn {
  currentLocale: Ref<'en' | 'ar'>
  getContentPath: (slug: string) => string
  queryContentByLocale: <T = any>(collection: 'blog' | 'caseStudies') => Promise<T[]>
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
   * @param collection - Content collection name ('blog' or 'caseStudies')
   * @returns Promise resolving to locale-filtered content array
   */
  const queryContentByLocale = async <T = any>(collection: 'blog' | 'caseStudies'): Promise<T[]> => {
    const isArabic = currentLocale.value === 'ar'
    
    console.log(`[useContentLocale] Query collection: ${collection}, locale: ${currentLocale.value}`)
    
    try {
      // Fetch all items from the collection
      const allItems = await queryCollection<T>(collection).all()
      
      console.log(`[useContentLocale] Total items fetched: ${allItems.length}`)
      
      if (isArabic) {
        // For Arabic, only include files with .ar suffix
        console.log('[useContentLocale] Filtering for Arabic (.ar suffix)')
        const filtered = allItems.filter((item: any) => {
          const hasArSuffix = item._path?.endsWith('.ar') || false
          return hasArSuffix
        })
        console.log(`[useContentLocale] Arabic items after filter: ${filtered.length}`)
        return filtered
      } else {
        // For English (default), exclude files with .ar suffix
        console.log('[useContentLocale] Filtering for English (no .ar suffix)')
        const filtered = allItems.filter((item: any) => {
          const hasArSuffix = item._path?.includes('.ar') || false
          return !hasArSuffix
        })
        console.log(`[useContentLocale] English items after filter: ${filtered.length}`)
        return filtered
      }
    } catch (error) {
      console.error(`[useContentLocale] Error querying ${collection}:`, error)
      return []
    }
  }

  return {
    currentLocale,
    getContentPath,
    queryContentByLocale,
  }
}
