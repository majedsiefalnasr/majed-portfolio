/**
 * Theme System Type Definitions
 *
 * Types for theme preference management and color theming
 */

import type {ComputedRef} from 'vue'

// ============================================================================
// Theme System Types
// ============================================================================

/**
 * User's explicit theme preference
 */
export type ThemePreference = 'light' | 'dark' | 'system'

/**
 * Resolved theme value (computed from preference + system)
 */
export type ThemeValue = 'light' | 'dark'

/**
 * Theme state managed by useTheme() composable
 */
export interface ThemeState {
  /** Current resolved theme (light or dark) */
  theme: ThemeValue
  /** User's explicit preference */
  preference: ThemePreference
  /** Operating system color scheme preference */
  systemPreference: ThemeValue
}

/**
 * Return type for useTheme() composable
 */
export interface UseThemeReturn {
  /** Current resolved theme (reactive) */
  theme: ComputedRef<ThemeValue>
  /** User's preference (reactive) */
  preference: ComputedRef<ThemePreference>
  /** Set theme preference */
  setTheme: (theme: ThemePreference) => void
  /** Toggle between light and dark */
  toggleTheme: () => void
}

/**
 * Theme configuration for app.config.ts
 */
export interface ThemeConfig {
  /** Default theme preference */
  defaultTheme?: ThemePreference
  /** Transition duration (ms) */
  transitionDuration?: number
  /** Force theme (disable system preference) */
  forceTheme?: ThemeValue
}

// ============================================================================
// Color Token Types
// ============================================================================

/**
 * Color token categories (semantic grouping)
 */
export type ColorCategory = 'Background' | 'Border' | 'Button' | 'Icon' | 'Typography' | 'Palettes'

/**
 * Complete color token definition
 */
export interface ColorToken {
  /** Semantic token name (kebab-case) */
  name: string
  /** Category for organization */
  category: ColorCategory
  /** Light mode color value (hex) */
  lightValue: string
  /** Dark mode color value (hex) */
  darkValue: string
  /** CSS custom property name */
  cssVar: string
  /** Optional alias to palette token */
  alias?: string
}

/**
 * Color palette definition (base colors)
 */
export interface ColorPalette {
  /** Palette name (e.g., 'neutral', 'primary', 'red') */
  name: string
  /** Base color value */
  base: string
  /** Shade variations (e.g., 20, 40, 60 for darker/lighter) */
  shades?: Record<number, string>
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * CSS custom property name
 * Must start with '--' prefix
 */
export type CSSVariable = `--${string}`

/**
 * Hex color value
 * Must be valid 3, 4, 6, or 8 digit hex code
 */
export type HexColor = `#${string}`

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Check if value is valid theme preference
 */
export function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system'
}

/**
 * Check if value is valid hex color
 */
export function isHexColor(value: unknown): value is HexColor {
  if (typeof value !== 'string') return false
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value)
}
