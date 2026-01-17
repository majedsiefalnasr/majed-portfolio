/**
 * useContentLanguage Composable
 *
 * Handles language switching for content with translation support.
 * Checks for available translations via sameAs property and navigates accordingly.
 */

import type {BlogPost, CaseStudy} from '../types/content'

export interface UseContentLanguageReturn {
  switchContentLanguage: (newLang: 'en' | 'ar', content: BlogPost | CaseStudy) => Promise<void>
  getAvailableLanguages: (content: BlogPost | CaseStudy) => {lang: string; path: string}[]
  hasTranslation: (lang: 'en' | 'ar', content: BlogPost | CaseStudy) => boolean
}

export function useContentLanguage(): UseContentLanguageReturn {
  const {setLocale} = useLanguage()
  const router = useRouter()

  /**
   * Check if a translation exists for the given language
   */
  function hasTranslation(lang: 'en' | 'ar', content: BlogPost | CaseStudy): boolean {
    if (!content.sameAs) return false
    if (lang === 'en') {
      // English paths don't have language prefix
      return content.sameAs.some(path => !path.includes('/ar/'))
    } else {
      // Arabic paths have /ar/ prefix
      return content.sameAs.some(path => path.includes('/ar/'))
    }
  }

  /**
   * Get all available languages for the content
   */
  function getAvailableLanguages(content: BlogPost | CaseStudy): {lang: string; path: string}[] {
    const languages = [{lang: content.lang || 'en', path: content.path || content._path}]

    if (content.sameAs) {
      content.sameAs.forEach(path => {
        if (path.includes('/ar/')) {
          languages.push({lang: 'ar', path})
        } else if (!path.includes('/ar/')) {
          languages.push({lang: 'en', path})
        }
      })
    }

    return languages
  }

  /**
   * Switch to content in the specified language
   * If translation exists, navigate to it; otherwise, show not available page
   */
  async function switchContentLanguage(
    newLang: 'en' | 'ar',
    content: BlogPost | CaseStudy
  ): Promise<void> {
    // If already in that language, do nothing
    if (content.lang === newLang) return

    // Check if translation exists
    if (hasTranslation(newLang, content)) {
      let translationPath: string | undefined

      if (newLang === 'en') {
        // English paths don't have language prefix
        translationPath = content.sameAs!.find(path => !path.includes('/ar/'))
      } else {
        // Arabic paths have /ar/ prefix
        translationPath = content.sameAs!.find(path => path.includes('/ar/'))
      }

      if (translationPath) {
        await router.push(translationPath)
        return
      }
    }

    // No translation available, navigate to not available page
    const notAvailablePath = `/not-available?lang=${newLang}&content=${encodeURIComponent(content.path || content._path)}`
    await router.push(notAvailablePath)
  }

  return {
    switchContentLanguage,
    getAvailableLanguages,
    hasTranslation,
  }
}
