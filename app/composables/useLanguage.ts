/**
 * useLanguage Composable
 *
 * Manages language/locale state with i18n integration and RTL support.
 * Wraps @nuxtjs/i18n's useI18n() for enhanced type safety.
 */

import type {Locale, TextDirection, UseLanguageReturn} from '../types/layout'

export function useLanguage(): UseLanguageReturn {
  const {locale: i18nLocale, t: i18nT} = useI18n()
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
   * Updates html lang and dir attributes, triggers layout mirroring
   */
  function setLocale(newLocale: Locale): void {
    console.log('[useLanguage] setLocale called with:', newLocale, 'current:', locale.value)

    if (!['en', 'ar'].includes(newLocale)) {
      console.warn(`[useLanguage] Invalid locale "${newLocale}". Staying on current locale.`)
      return
    }

    console.log('[useLanguage] Setting i18nLocale.value to:', newLocale)
    i18nLocale.value = newLocale

    // Update html attributes
    if (import.meta.client) {
      const html = document.documentElement
      const newDir = newLocale === 'ar' ? 'rtl' : 'ltr'
      console.log('[useLanguage] Updating HTML attributes:', {lang: newLocale, dir: newDir})
      html.setAttribute('lang', newLocale)
      html.setAttribute('dir', newDir)
    }

    console.log('[useLanguage] After setLocale, locale.value:', locale.value)
  }

  /**
   * Translation helper
   * Translates a key to current locale
   */
  function t(key: string, ...args: any[]): string {
    return i18nT(key, ...args) as string
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
