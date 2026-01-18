/**
 * useTheme Composable
 *
 * Manages theme state (light/dark mode) with localStorage persistence.
 * Wraps Nuxt UI's useColorMode() for enhanced type safety and convenience.
 */

import type {ThemePreference, ThemeValue, UseThemeReturn} from '../types/theme'

export function useTheme(): UseThemeReturn {
  const colorMode = useColorMode()

  // Current resolved theme (light or dark)
  const theme = computed<ThemeValue>(() => {
    return colorMode.value as ThemeValue
  })

  // User's explicit preference
  const preference = computed<ThemePreference>(() => {
    return colorMode.preference as ThemePreference
  })

  /**
   * Set theme preference
   * Updates localStorage and triggers CSS transition
   */
  function setTheme(newTheme: ThemePreference): void {
    if (!['light', 'dark', 'system'].includes(newTheme)) {
      console.warn(`[useTheme] Invalid theme "${newTheme}". Falling back to "system".`)
      colorMode.preference = 'system'
      return
    }

    colorMode.preference = newTheme
  }

  /**
   * Toggle between light and dark modes
   * If preference is 'system', sets to opposite of current resolved theme
   */
  function toggleTheme(): void {
    const newTheme = preference.value === 'system'
      ? (theme.value === 'light' ? 'dark' : 'light')
      : (preference.value === 'light' ? 'dark' : 'light')
    setTheme(newTheme)
  }

  return {
    theme,
    preference,
    setTheme,
    toggleTheme,
  }
}
