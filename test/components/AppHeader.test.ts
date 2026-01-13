/**
 * AppHeader Component Tests
 *
 * Tests for the navigation header component including:
 * - Default props and rendering
 * - Active link detection based on current route
 * - Accessibility features (aria-current)
 * - RTL layout support
 */

import {mount} from '@vue/test-utils'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import AppHeader from '../../app/components/AppHeader.vue'
import type {NavigationLink} from '../../app/types/layout'

// Mock useRoute
const mockRoute = {path: '/'}
vi.mock('#app', () => ({
  useRoute: () => mockRoute,
}))

// Mock useLanguage
vi.mock('~/app/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string) => key, // Return key as translation for testing
    locale: {value: 'en'},
    direction: {value: 'ltr'},
  }),
}))

describe('AppHeader', () => {
  beforeEach(() => {
    mockRoute.path = '/'
  })

  it('renders with default navigation links', () => {
    const wrapper = mount(AppHeader, {})

    // Should render all 5 standard nav links
    expect(wrapper.text()).toContain('nav.home')
    expect(wrapper.text()).toContain('nav.projects')
    expect(wrapper.text()).toContain('nav.about')
    expect(wrapper.text()).toContain('nav.blog')
    expect(wrapper.text()).toContain('nav.contact')
  })

  it('accepts custom navigation links via props', () => {
    const customLinks: NavigationLink[] = [{label: 'Custom Page', to: '/custom'}]

    const wrapper = mount(AppHeader, {
      props: {links: customLinks},
    })

    expect(wrapper.text()).toContain('Custom Page')
    expect(wrapper.text()).not.toContain('nav.home')
  })

  it('marks current route as active', () => {
    mockRoute.path = '/projects'

    const wrapper = mount(AppHeader, {})

    // Active link should have aria-current="page"
    const projectsLink = wrapper.find('a[href="/projects"]')
    expect(projectsLink.attributes('aria-current')).toBe('page')
  })

  it('only marks one link as active at a time', () => {
    mockRoute.path = '/about'

    const wrapper = mount(AppHeader, {})

    // Only /about should be active
    expect(wrapper.find('a[href="/about"]').attributes('aria-current')).toBe('page')
    expect(wrapper.find('a[href="/"]').attributes('aria-current')).toBeUndefined()
    expect(wrapper.find('a[href="/projects"]').attributes('aria-current')).toBeUndefined()
  })

  it('hides navigation when showNav is false', () => {
    const wrapper = mount(AppHeader, {
      props: {showNav: false},
    })

    expect(wrapper.find('nav').exists()).toBe(false)
  })

  it('renders logo slot when provided', () => {
    const wrapper = mount(AppHeader, {
      slots: {
        logo: '<div class="test-logo">My Logo</div>',
      },
    })

    expect(wrapper.find('.test-logo').exists()).toBe(true)
    expect(wrapper.text()).toContain('My Logo')
  })

  it('uses logical properties for RTL support', () => {
    const wrapper = mount(AppHeader, {})

    // Check that logo container uses me-auto (not mr-auto)
    const logoContainer = wrapper.find('[class*="me-auto"]')
    expect(logoContainer.exists()).toBe(true)
  })

  it('applies text-typography-link class to active links', () => {
    mockRoute.path = '/contact'

    const wrapper = mount(AppHeader, {})

    const activeLink = wrapper.find('a[href="/contact"]')
    expect(activeLink.classes()).toContain('text-typography-link')
  })
})
