/**
 * AppFooter Component Tests
 *
 * Tests for the footer component including:
 * - Default props and rendering
 * - Theme toggle functionality
 * - Language switcher functionality
 * - Social links with accessibility
 * - Copyright year interpolation
 */

import {mount} from '@vue/test-utils'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import AppFooter from '../../app/components/AppFooter.vue'
import type {SocialLink} from '../../app/types/layout'

// Mock theme composable
const mockToggleTheme = vi.fn()
const mockTheme = {value: 'light'}

vi.mock('~/app/composables/useTheme', () => ({
  useTheme: () => ({
    theme: mockTheme,
    preference: {value: 'light'},
    toggleTheme: mockToggleTheme,
  }),
}))

// Mock language composable
const mockSetLocale = vi.fn()
const mockLocale = {value: 'en'}

vi.mock('~/app/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string, params?: any) => {
      if (key === 'footer.copyright') return `© {year} Portfolio`
      return key
    },
    locale: mockLocale,
    setLocale: mockSetLocale,
    direction: {value: 'ltr'},
  }),
}))

describe('AppFooter', () => {
  beforeEach(() => {
    mockToggleTheme.mockClear()
    mockSetLocale.mockClear()
    mockTheme.value = 'light'
    mockLocale.value = 'en'
  })

  it('renders with default social links', () => {
    const wrapper = mount(AppFooter, {})

    // Should render all 4 standard social links
    expect(wrapper.text()).toContain('social.github')
    expect(wrapper.text()).toContain('social.linkedin')
    expect(wrapper.text()).toContain('social.twitter')
    expect(wrapper.text()).toContain('social.email')
  })

  it('accepts custom social links via props', () => {
    const customLinks: SocialLink[] = [
      {
        platform: 'Custom',
        icon: 'i-heroicons-star',
        url: 'https://example.com',
        ariaLabel: 'Custom',
      },
    ]

    const wrapper = mount(AppFooter, {
      props: {socialLinks: customLinks},
    })

    expect(wrapper.text()).toContain('Custom')
    expect(wrapper.text()).not.toContain('social.github')
  })

  it('renders copyright with current year', () => {
    const wrapper = mount(AppFooter, {})

    const currentYear = new Date().getFullYear()
    expect(wrapper.text()).toContain(`© ${currentYear} Portfolio`)
  })

  it('shows moon icon when in light mode', () => {
    mockTheme.value = 'light'

    const wrapper = mount(AppFooter, {})

    const themeButton = wrapper.find('[aria-label*="theme"]')
    expect(themeButton.html()).toContain('i-heroicons-moon')
  })

  it('shows sun icon when in dark mode', () => {
    mockTheme.value = 'dark'

    const wrapper = mount(AppFooter, {})

    const themeButton = wrapper.find('[aria-label*="theme"]')
    expect(themeButton.html()).toContain('i-heroicons-sun')
  })

  it('calls toggleTheme when theme button is clicked', async () => {
    const wrapper = mount(AppFooter, {})

    const themeButton = wrapper.find('[aria-label*="theme"]')
    await themeButton.trigger('click')

    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('displays current language in switcher button', () => {
    mockLocale.value = 'en'

    const wrapper = mount(AppFooter, {})

    expect(wrapper.text()).toContain('EN')
  })

  it('shows العربية when locale is Arabic', () => {
    mockLocale.value = 'ar'

    const wrapper = mount(AppFooter, {})

    expect(wrapper.text()).toContain('العربية')
  })

  it('toggles to Arabic when language button clicked in English', async () => {
    mockLocale.value = 'en'

    const wrapper = mount(AppFooter, {})

    const langButton = wrapper.find('[aria-label*="language"]')
    await langButton.trigger('click')

    expect(mockSetLocale).toHaveBeenCalledWith('ar')
  })

  it('toggles to English when language button clicked in Arabic', async () => {
    mockLocale.value = 'ar'

    const wrapper = mount(AppFooter, {})

    const langButton = wrapper.find('[aria-label*="language"]')
    await langButton.trigger('click')

    expect(mockSetLocale).toHaveBeenCalledWith('en')
  })

  it('opens social links in new tab with security attributes', () => {
    const wrapper = mount(AppFooter, {})

    const socialLinks = wrapper.findAll('a[target="_blank"]')

    socialLinks.forEach(link => {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toContain('noopener')
      expect(link.attributes('rel')).toContain('noreferrer')
    })
  })

  it('has proper ARIA labels on all buttons', () => {
    const wrapper = mount(AppFooter, {})

    const buttons = wrapper.findAll('button')

    buttons.forEach(button => {
      expect(button.attributes('aria-label')).toBeDefined()
      expect(button.attributes('aria-label')?.length).toBeGreaterThan(0)
    })
  })
})
