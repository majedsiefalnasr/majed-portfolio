/**
 * useLanguage Composable
 *
 * Manages language/locale state with i18n integration and RTL support.
 * Wraps @nuxtjs/i18n's useI18n() for enhanced type safety.
 */

import type {Locale, TextDirection, UseLanguageReturn} from '../types/layout'

export function useLanguage(): UseLanguageReturn {
  const {locale: i18nLocale, t: i18nT, setLocale: setI18nLocale} = useI18n()
  const switchLocalePath = useSwitchLocalePath()
  const router = useRouter()
  const nuxtApp = useNuxtApp()

  // Current active locale
  const locale = computed<Locale>(() => {
    return i18nLocale.value as Locale
  })

  // Text direction based on locale
  const direction = computed<TextDirection>(() => {
    return locale.value === 'ar' ? 'rtl' : 'ltr'
  })

  /**
   * Set active locale
   * Updates html lang and dir attributes, navigates to localized URL
   */
  async function setLocale(newLocale: Locale): Promise<void> {
    if (!['en', 'ar'].includes(newLocale)) {
      console.warn(`[useLanguage] Invalid locale "${newLocale}". Staying on current locale.`)
      return
    }

    // Use i18n's switchLocalePath to get the correct localized URL
    const localizedPath = switchLocalePath(newLocale)

    if (localizedPath) {
      // Navigate to the localized path (this will trigger i18n's locale change)
      await router.push(localizedPath)

      // Update html attributes after navigation
      if (import.meta.client) {
        const html = document.documentElement
        const newDir = newLocale === 'ar' ? 'rtl' : 'ltr'
        html.setAttribute('lang', newLocale)
        html.setAttribute('dir', newDir)
      }
    }
  }

  /**
   * Translation helper
   * Translates a key to current locale
   */
  function t(key: string, ...args: unknown[]): string {
    return i18nT(key, args) as string
  }

  // Initialize html attributes on mount
  onMounted(() => {
    const html = document.documentElement
    html.setAttribute('lang', locale.value)
    html.setAttribute('dir', direction.value)
  })

  return {
    locale,
    direction,
    setLocale,
    t,
  }
}
