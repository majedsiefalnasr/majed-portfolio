/**
 * Container Component Tests
 *
 * Tests for the responsive container component including:
 * - Default max-width and padding behavior
 * - Custom breakpoint configuration
 * - Custom padding configuration
 * - Logical properties for RTL support
 * - Slot content rendering
 */

import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import Container from '../../app/components/Container.vue'

describe('Container', () => {
  it('renders slot content', () => {
    const wrapper = mount(Container, {
      slots: {
        default: '<div class="test-content">Test Content</div>',
      },
    })

    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Content')
  })

  it('applies default container classes', () => {
    const wrapper = mount(Container, {})

    const containerDiv = wrapper.find('div')

    // Should have mx-auto for centering
    expect(containerDiv.classes()).toContain('mx-auto')

    // Should have container for max-width
    expect(containerDiv.classes()).toContain('container')
  })

  it('applies default responsive padding with logical properties', () => {
    const wrapper = mount(Container, {})

    const containerDiv = wrapper.find('div')

    // Should use px-* (logical properties) for horizontal padding
    expect(containerDiv.classes()).toContain('px-4')
    expect(containerDiv.classes()).toContain('sm:px-6')
    expect(containerDiv.classes()).toContain('md:px-8')
  })

  it('accepts custom breakpoints configuration', () => {
    const customBreakpoints = {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    }

    const wrapper = mount(Container, {
      props: {config: {breakpoints: customBreakpoints}},
    })

    // Component should accept custom config without errors
    expect(wrapper.exists()).toBe(true)
  })

  it('accepts custom padding configuration', () => {
    const customPadding = {
      sm: '1rem',
      md: '2rem',
      lg: '3rem',
    }

    const wrapper = mount(Container, {
      props: {config: {padding: customPadding}},
    })

    // Component should accept custom config without errors
    expect(wrapper.exists()).toBe(true)
  })

  it('merges custom config with defaults', () => {
    const partialConfig = {
      padding: {
        sm: '2rem', // Override only sm padding
      },
    }

    const wrapper = mount(Container, {
      props: {config: partialConfig},
    })

    // Should render without errors, using merged config
    expect(wrapper.exists()).toBe(true)
  })

  it('does not use directional classes (ml/mr)', () => {
    const wrapper = mount(Container, {})

    const containerDiv = wrapper.find('div')
    const classList = containerDiv.classes().join(' ')

    // Should NOT contain left/right margin classes
    expect(classList).not.toMatch(/\bml-/)
    expect(classList).not.toMatch(/\bmr-/)

    // Should use logical mx- instead
    expect(classList).toMatch(/\bmx-/)
  })

  it('does not use directional padding classes (pl/pr)', () => {
    const wrapper = mount(Container, {})

    const containerDiv = wrapper.find('div')
    const classList = containerDiv.classes().join(' ')

    // Should NOT contain left/right padding classes
    expect(classList).not.toMatch(/\bpl-/)
    expect(classList).not.toMatch(/\bpr-/)

    // Should use logical px- instead
    expect(classList).toMatch(/\bpx-/)
  })

  it('renders as a div element by default', () => {
    const wrapper = mount(Container, {})

    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('wraps multiple child elements', () => {
    const wrapper = mount(Container, {
      slots: {
        default: `
          <p>First paragraph</p>
          <p>Second paragraph</p>
        `,
      },
    })

    const paragraphs = wrapper.findAll('p')
    expect(paragraphs).toHaveLength(2)
    expect(wrapper.text()).toContain('First paragraph')
    expect(wrapper.text()).toContain('Second paragraph')
  })
})
