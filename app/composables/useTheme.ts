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
    console.log('[useTheme] toggleTheme called, current:', {
      theme: theme.value,
      preference: preference.value,
    })

    if (preference.value === 'system') {
      // Toggle based on current resolved theme
      const newTheme = theme.value === 'light' ? 'dark' : 'light'
      console.log('[useTheme] System preference, setting to:', newTheme)
      setTheme(newTheme)
    } else {
      // Toggle between light and dark
      const newTheme = preference.value === 'light' ? 'dark' : 'light'
      console.log('[useTheme] Explicit preference, setting to:', newTheme)
      setTheme(newTheme)
    }

    console.log('[useTheme] After toggle:', {
      theme: theme.value,
      preference: preference.value,
    })
  }

  return {
    theme,
    preference,
    setTheme,
    toggleTheme,
  }
}
