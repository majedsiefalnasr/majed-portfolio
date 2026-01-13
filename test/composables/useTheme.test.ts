/**
 * useTheme Composable Tests
 *
 * Tests for theme management including:
 * - Theme state reactivity
 * - setTheme validation and fallback
 * - toggleTheme logic for system vs explicit preferences
 * - Integration with useColorMode
 */

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {useTheme} from '../../app/composables/useTheme'

// Mock useColorMode from Nuxt UI
const mockColorModeValue = ref<string>('light')
const mockColorModePreference = ref<string>('system')

vi.mock('#app', () => ({
  useColorMode: () => ({
    value: mockColorModeValue,
    preference: mockColorModePreference,
  }),
}))

describe('useTheme', () => {
  beforeEach(() => {
    mockColorModeValue.value = 'light'
    mockColorModePreference.value = 'system'
    vi.clearAllMocks()
  })

  it('returns theme computed ref with current resolved theme', () => {
    const {theme} = useTheme()

    expect(theme.value).toBe('light')

    mockColorModeValue.value = 'dark'
    expect(theme.value).toBe('dark')
  })

  it('returns preference computed ref with user preference', () => {
    const {preference} = useTheme()

    expect(preference.value).toBe('system')

    mockColorModePreference.value = 'dark'
    expect(preference.value).toBe('dark')
  })

  it('setTheme updates preference to valid theme', () => {
    const {setTheme, preference} = useTheme()

    setTheme('dark')
    expect(mockColorModePreference.value).toBe('dark')

    setTheme('light')
    expect(mockColorModePreference.value).toBe('light')

    setTheme('system')
    expect(mockColorModePreference.value).toBe('system')
  })

  it('setTheme falls back to system for invalid input', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const {setTheme} = useTheme()

    setTheme('invalid' as any)

    expect(mockColorModePreference.value).toBe('system')
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid theme "invalid"'))

    consoleSpy.mockRestore()
  })

  it('toggleTheme switches light to dark when preference is light', () => {
    mockColorModePreference.value = 'light'
    mockColorModeValue.value = 'light'

    const {toggleTheme} = useTheme()

    toggleTheme()

    expect(mockColorModePreference.value).toBe('dark')
  })

  it('toggleTheme switches dark to light when preference is dark', () => {
    mockColorModePreference.value = 'dark'
    mockColorModeValue.value = 'dark'

    const {toggleTheme} = useTheme()

    toggleTheme()

    expect(mockColorModePreference.value).toBe('light')
  })

  it('toggleTheme sets opposite of resolved theme when preference is system', () => {
    mockColorModePreference.value = 'system'
    mockColorModeValue.value = 'light' // System resolved to light

    const {toggleTheme} = useTheme()

    toggleTheme()

    // Should set explicit dark preference
    expect(mockColorModePreference.value).toBe('dark')
  })

  it('toggleTheme handles system preference resolving to dark', () => {
    mockColorModePreference.value = 'system'
    mockColorModeValue.value = 'dark' // System resolved to dark

    const {toggleTheme} = useTheme()

    toggleTheme()

    // Should set explicit light preference
    expect(mockColorModePreference.value).toBe('light')
  })

  it('exposes all required API methods', () => {
    const result = useTheme()

    expect(result).toHaveProperty('theme')
    expect(result).toHaveProperty('preference')
    expect(result).toHaveProperty('setTheme')
    expect(result).toHaveProperty('toggleTheme')

    expect(typeof result.setTheme).toBe('function')
    expect(typeof result.toggleTheme).toBe('function')
  })

  it('theme and preference are reactive computed refs', () => {
    const {theme, preference} = useTheme()

    // Check they are computed refs (have .value and are readonly)
    expect(theme).toHaveProperty('value')
    expect(preference).toHaveProperty('value')

    // Verify reactivity
    mockColorModeValue.value = 'dark'
    expect(theme.value).toBe('dark')

    mockColorModePreference.value = 'light'
    expect(preference.value).toBe('light')
  })
})
