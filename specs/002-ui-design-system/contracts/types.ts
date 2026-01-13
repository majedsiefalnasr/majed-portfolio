/**
 * Type Definitions: UI & Design System
 *
 * Core type definitions for theme, language, layout, and color systems.
 * All interfaces follow TypeScript strict mode requirements.
 */

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

// ============================================================================
// Language & i18n Types
// ============================================================================

/**
 * Supported locale codes
 */
export type Locale = 'en' | 'ar'

/**
 * Text direction based on locale
 */
export type TextDirection = 'ltr' | 'rtl'

/**
 * Language state managed by useLanguage() composable
 */
export interface LanguageState {
  /** Current active locale */
  locale: Locale
  /** Text direction (computed from locale) */
  direction: TextDirection
  /** Human-readable language name */
  displayName: string
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
// Layout Component Types
// ============================================================================

/**
 * Tailwind breakpoint identifiers
 */
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * Container configuration for responsive width constraints
 */
export interface ContainerConfig {
  /** Maximum width per breakpoint */
  maxWidth?: Partial<Record<Breakpoint, string>>
  /** Horizontal padding per breakpoint */
  padding?: Partial<Record<Breakpoint, string>>
  /** Center content with auto margins */
  centered?: boolean
}

/**
 * Navigation link definition
 */
export interface NavigationLink {
  /** Display label (i18n key) */
  label: string
  /** Route path */
  to: string
  /** Display order */
  order: number
  /** Active state (computed from current route) */
  active?: boolean
}

/**
 * Social media link definition
 */
export interface SocialLink {
  /** Platform identifier */
  platform: 'github' | 'linkedin' | 'twitter' | 'email'
  /** Full URL or mailto: link */
  url: string
  /** Icon name from icon library */
  icon: string
  /** Accessible label (i18n key) */
  label: string
}

// ============================================================================
// Component Prop Types
// ============================================================================

/**
 * AppHeader component props
 */
export interface AppHeaderProps {
  /** Navigation links (defaults to standard portfolio structure) */
  links?: NavigationLink[]
  /** Show/hide navigation */
  showNav?: boolean
  /** Logo component or image URL */
  logo?: string
}

/**
 * AppFooter component props
 */
export interface AppFooterProps {
  /** Social media links */
  socialLinks?: SocialLink[]
  /** Copyright text (supports i18n) */
  copyright?: string
  /** Show/hide theme toggle */
  showThemeToggle?: boolean
  /** Show/hide language switcher */
  showLanguageSwitcher?: boolean
}

/**
 * Container component props
 */
export interface ContainerProps {
  /** Custom configuration (overrides defaults) */
  config?: ContainerConfig
  /** HTML element tag */
  as?: string
}

// ============================================================================
// Composable Return Types
// ============================================================================

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
 * Return type for useLanguage() composable
 */
export interface UseLanguageReturn {
  /** Current locale (reactive) */
  locale: ComputedRef<Locale>
  /** Text direction (reactive, computed) */
  direction: ComputedRef<TextDirection>
  /** Set language */
  setLocale: (locale: Locale) => void
  /** Translation helper */
  t: (key: string, ...args: any[]) => string
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

/**
 * Transition timing (milliseconds)
 */
export type TransitionDuration = number

// ============================================================================
// Configuration Types
// ============================================================================

/**
 * Theme configuration for app.config.ts
 */
export interface ThemeConfig {
  /** Default theme preference */
  defaultTheme?: ThemePreference
  /** Transition duration (ms) */
  transitionDuration?: TransitionDuration
  /** Force theme (disable system preference) */
  forceTheme?: ThemeValue
}

/**
 * i18n configuration
 */
export interface I18nConfig {
  /** Default locale */
  defaultLocale: Locale
  /** Available locales */
  locales: Locale[]
  /** Fallback locale */
  fallbackLocale: Locale
}

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
 * Check if value is valid locale
 */
export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'ar'
}

/**
 * Check if value is valid hex color
 */
export function isHexColor(value: unknown): value is HexColor {
  if (typeof value !== 'string') return false
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value)
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Default Tailwind breakpoints
 */
export const DEFAULT_BREAKPOINTS: Record<Breakpoint, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

/**
 * Default container padding
 */
export const DEFAULT_PADDING: Record<Breakpoint, string> = {
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '2rem',
  '2xl': '2rem',
} as const

/**
 * Standard navigation links structure
 */
export const STANDARD_NAV_LINKS: NavigationLink[] = [
  {label: 'nav.home', to: '/', order: 1},
  {label: 'nav.projects', to: '/projects', order: 2},
  {label: 'nav.about', to: '/about', order: 3},
  {label: 'nav.blog', to: '/blog', order: 4},
  {label: 'nav.contact', to: '/contact', order: 5},
] as const

/**
 * Standard social links structure
 */
export const STANDARD_SOCIAL_LINKS: SocialLink[] = [
  {platform: 'github', url: '', icon: 'i-simple-icons-github', label: 'social.github'},
  {platform: 'linkedin', url: '', icon: 'i-simple-icons-linkedin', label: 'social.linkedin'},
  {platform: 'twitter', url: '', icon: 'i-simple-icons-x', label: 'social.twitter'},
  {platform: 'email', url: '', icon: 'i-heroicons-envelope', label: 'social.email'},
] as const
