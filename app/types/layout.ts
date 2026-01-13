/**
 * Layout & Navigation Type Definitions
 *
 * Types for layout components, navigation, and i18n
 */

import type {ComputedRef} from 'vue'

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
 *
 * TODO (T060): Update URLs with actual portfolio social media links:
 * - GitHub: Replace with https://github.com/[username]
 * - LinkedIn: Replace with https://linkedin.com/in/[username]
 * - Twitter/X: Replace with https://twitter.com/[username]
 * - Email: Replace with mailto:[email@domain.com]
 */
export const STANDARD_SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'github',
    url: 'https://github.com/majedsiefalnasr',
    icon: 'i-simple-icons-github',
    label: 'social.github',
  },
  {
    platform: 'linkedin',
    url: 'https://linkedin.com/in/majedsiefalnasr',
    icon: 'i-simple-icons-linkedin',
    label: 'social.linkedin',
  },
  {
    platform: 'twitter',
    url: 'https://twitter.com/majedsiefalnasr',
    icon: 'i-simple-icons-x',
    label: 'social.twitter',
  },
  {
    platform: 'email',
    url: 'mailto:contact@example.com',
    icon: 'i-heroicons-envelope',
    label: 'social.email',
  },
] as const

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Check if value is valid locale
 */
export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'ar'
}
