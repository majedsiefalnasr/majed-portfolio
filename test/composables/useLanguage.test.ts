/**
 * useLanguage Composable Tests
 *
 * Tests for language/locale management including:
 * - Locale state reactivity
 * - Direction computation (LTR/RTL)
 * - setLocale with HTML attribute updates
 * - Translation helper
 */

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {useLanguage} from '../../app/composables/useLanguage'

// Mock i18n composable
const mockLocale = ref<string>('en')
const mockT = vi.fn((key: string) => key)

vi.mock('#app', () => ({
  useI18n: () => ({
    locale: mockLocale,
    t: mockT,
  }),
}))

// Mock document for HTML attribute updates
const mockDocumentElement = {
  setAttribute: vi.fn(),
}

global.document = {
  documentElement: mockDocumentElement,
} as any

describe('useLanguage', () => {
  beforeEach(() => {
    mockLocale.value = 'en'
    mockT.mockClear()
    mockDocumentElement.setAttribute.mockClear()
  })

  it('returns current locale from i18n', () => {
    const {locale} = useLanguage()

    expect(locale.value).toBe('en')

    mockLocale.value = 'ar'
    expect(locale.value).toBe('ar')
  })

  it('computes direction as ltr for English', () => {
    mockLocale.value = 'en'

    const {direction} = useLanguage()

    expect(direction.value).toBe('ltr')
  })

  it('computes direction as rtl for Arabic', () => {
    mockLocale.value = 'ar'

    const {direction} = useLanguage()

    expect(direction.value).toBe('rtl')
  })

  it('direction updates reactively when locale changes', () => {
    const {direction} = useLanguage()

    mockLocale.value = 'en'
    expect(direction.value).toBe('ltr')

    mockLocale.value = 'ar'
    expect(direction.value).toBe('rtl')
  })

  it('setLocale updates i18n locale', () => {
    const {setLocale, locale} = useLanguage()

    setLocale('ar')

    expect(mockLocale.value).toBe('ar')
  })

  it('setLocale updates HTML lang attribute in browser', () => {
    const {setLocale} = useLanguage()

    setLocale('ar')

    expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith('lang', 'ar')
  })

  it('setLocale updates HTML dir attribute based on locale', () => {
    const {setLocale} = useLanguage()

    setLocale('ar')

    expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith('dir', 'rtl')

    mockDocumentElement.setAttribute.mockClear()

    setLocale('en')

    expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith('dir', 'ltr')
  })

  it('t helper proxies to i18n t function', () => {
    const {t} = useLanguage()

    mockT.mockReturnValue('Translated Text')

    const result = t('nav.home')

    expect(mockT).toHaveBeenCalledWith('nav.home')
    expect(result).toBe('Translated Text')
  })

  it('t helper passes parameters to i18n', () => {
    const {t} = useLanguage()

    t('footer.copyright', {year: 2024})

    expect(mockT).toHaveBeenCalledWith('footer.copyright', {year: 2024})
  })

  it('exposes all required API methods and properties', () => {
    const result = useLanguage()

    expect(result).toHaveProperty('locale')
    expect(result).toHaveProperty('direction')
    expect(result).toHaveProperty('setLocale')
    expect(result).toHaveProperty('t')

    expect(typeof result.setLocale).toBe('function')
    expect(typeof result.t).toBe('function')
  })

  it('locale is a reactive ref', () => {
    const {locale} = useLanguage()

    expect(locale).toHaveProperty('value')

    mockLocale.value = 'ar'
    expect(locale.value).toBe('ar')
  })

  it('direction is a reactive computed ref', () => {
    const {direction} = useLanguage()

    expect(direction).toHaveProperty('value')

    // Verify it's computed (recalculates on locale change)
    mockLocale.value = 'en'
    expect(direction.value).toBe('ltr')

    mockLocale.value = 'ar'
    expect(direction.value).toBe('rtl')
  })

  it('handles unknown locales gracefully (defaults to ltr)', () => {
    mockLocale.value = 'fr' // French - not explicitly handled

    const {direction} = useLanguage()

    // Should default to ltr for unknown locales
    expect(direction.value).toBe('ltr')
  })
})
