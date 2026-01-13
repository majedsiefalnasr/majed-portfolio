# Data Model: UI & Design System

**Feature**: UI & Design System  
**Date**: 2026-01-12  
**Phase**: 1 (Design & Contracts)

## Overview

This document defines the data structures and state management patterns for the UI & Design System feature. All entities are managed through Vue composables with localStorage persistence where applicable.

---

## Entity Definitions

### 1. ThemePreference

Represents the user's color scheme preference.

**Attributes**:

- `preference`: `'light' | 'dark' | 'system'` - User's explicit theme choice
- `value`: `'light' | 'dark'` (computed) - Resolved theme accounting for system preference
- `systemPreference`: `'light' | 'dark'` (computed) - Operating system color scheme

**Validation Rules**:

- `preference` must be one of: `'light'`, `'dark'`, or `'system'`
- Default value: `'system'`
- Persisted in localStorage as `'nuxt-color-mode'`

**State Transitions**:

```
[Initial] → 'system' (default)
'system' → 'light' (user toggles to light)
'light' → 'dark' (user toggles to dark)
'dark' → 'light' (user toggles back)
[Any] → 'system' (user resets to system)
```

**Storage Location**: `localStorage['nuxt-color-mode']`

**Managed By**: `useColorMode()` composable (Nuxt UI built-in), wrapped by `useTheme()` helper

---

### 2. ColorToken

Semantic color definition with light and dark mode variants.

**Attributes**:

- `name`: `string` - Semantic token name (e.g., `'background-default-surface-base'`)
- `category`: `'Background' | 'Border' | 'Button' | 'Icon' | 'Typography' | 'Palettes'`
- `lightValue`: `string` - Hex color value for light mode (e.g., `'#eceff0'`)
- `darkValue`: `string` - Hex color value for dark mode (e.g., `'#000000'`)
- `cssVar`: `string` - CSS custom property name (e.g., `'--background-default-surface-base'`)
- `alias`: `string | null` - Reference to palette token if aliased (e.g., `'var(--palettes-neutral-200)'`)

**Validation Rules**:

- `name` must follow kebab-case naming convention
- `category` must match one of the defined categories
- `lightValue` and `darkValue` must be valid CSS color values
- `cssVar` must start with `--` prefix
- All color values must meet WCAG AA contrast requirements when used

**Relationships**:

- **Palette Tokens**: Base colors (Static, Grayscale, Primary, Red, Green, Blue, Yellow, Orange)
- **Semantic Tokens**: Reference palette tokens or define unique values
- Example: `background-default-surface-base` → `var(--palettes-neutral-200)` → `#eceff0`

**Total Count**: 100+ tokens across all categories

---

### 3. LanguageSetting

Represents the current interface language and text direction.

**Attributes**:

- `locale`: `'en' | 'ar'` - Current language code
- `direction`: `'ltr' | 'rtl'` (computed) - Text direction based on locale
- `displayName`: `string` (computed) - Human-readable language name

**Validation Rules**:

- `locale` must be one of the supported languages: `'en'` or `'ar'`
- Default value: `'en'`
- Persisted in localStorage/cookies via @nuxtjs/i18n

**State Transitions**:

```
[Initial] → 'en' (default)
'en' → 'ar' (user switches to Arabic)
'ar' → 'en' (user switches to English)
```

**Computed Properties**:

```typescript
direction = locale === 'ar' ? 'rtl' : 'ltr'
displayName = locale === 'en' ? 'English' : 'العربية'
```

**Storage Location**: Cookie `'i18n_redirected'` and localStorage (managed by @nuxtjs/i18n)

**Managed By**: `useI18n()` composable (@nuxtjs/i18n), wrapped by `useLanguage()` helper

**Side Effects**:

- Updates `<html dir="ltr|rtl">` attribute
- Updates `<html lang="en|ar">` attribute
- Triggers layout mirroring via CSS logical properties
- Switches translation strings throughout UI

---

### 4. LayoutContainer

Configuration for responsive width constraints.

**Attributes**:

- `maxWidth`: `Record<Breakpoint, string>` - Maximum width per breakpoint
- `padding`: `Record<Breakpoint, string>` - Horizontal padding per breakpoint
- `centered`: `boolean` - Whether to center content with auto margins

**Breakpoint Definitions** (Tailwind defaults):

```typescript
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const defaultMaxWidths = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

const defaultPadding = {
  sm: '1rem', // 16px
  md: '1.5rem', // 24px
  lg: '2rem', // 32px
  xl: '2rem', // 32px
  '2xl': '2rem', // 32px
}
```

**Validation Rules**:

- All breakpoint values must be valid CSS length units
- Padding must prevent edge-to-edge content (min 16px)
- Max width should not exceed viewport width at each breakpoint

**Managed By**: `Container.vue` component props with sensible defaults

---

### 5. NavigationLink

Individual navigation link in the AppHeader.

**Attributes**:

- `label`: `string` - Display text (translatable via i18n key)
- `to`: `string` - Route path (e.g., `'/'`, `'/projects'`)
- `active`: `boolean` (computed) - Whether link matches current route
- `order`: `number` - Display order in navigation

**Navigation Structure**:

```typescript
const navLinks: NavigationLink[] = [
  {label: 'nav.home', to: '/', order: 1},
  {label: 'nav.projects', to: '/projects', order: 2},
  {label: 'nav.about', to: '/about', order: 3},
  {label: 'nav.blog', to: '/blog', order: 4},
  {label: 'nav.contact', to: '/contact', order: 5},
]
```

**Validation Rules**:

- `label` must reference valid i18n translation key
- `to` must be valid route path
- `order` must be unique across navigation links

**Managed By**: `AppHeader.vue` component with static configuration

---

### 6. SocialLink

Social media link in the AppFooter.

**Attributes**:

- `platform`: `'github' | 'linkedin' | 'twitter' | 'email'`
- `url`: `string` - Full URL or mailto: link
- `icon`: `string` - Icon name from icon library
- `label`: `string` - Accessible label (translatable)

**Social Links Structure**:

```typescript
const socialLinks: SocialLink[] = [
  {
    platform: 'github',
    url: 'https://github.com/username',
    icon: 'i-simple-icons-github',
    label: 'social.github',
  },
  {
    platform: 'linkedin',
    url: 'https://linkedin.com/in/username',
    icon: 'i-simple-icons-linkedin',
    label: 'social.linkedin',
  },
  {
    platform: 'twitter',
    url: 'https://twitter.com/username',
    icon: 'i-simple-icons-x',
    label: 'social.twitter',
  },
  {
    platform: 'email',
    url: 'mailto:user@example.com',
    icon: 'i-heroicons-envelope',
    label: 'social.email',
  },
]
```

**Validation Rules**:

- `url` must be valid HTTP(S) URL or mailto: link
- `icon` must reference existing icon in Nuxt UI icon library
- `label` must reference valid i18n translation key

**Managed By**: `AppFooter.vue` component with configurable props

---

## State Management Architecture

### Composable Layer

#### `useTheme()`

```typescript
interface UseThemeReturn {
  theme: ComputedRef<'light' | 'dark'> // Current resolved theme
  preference: ComputedRef<'light' | 'dark' | 'system'> // User preference
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleTheme: () => void
}
```

**Storage**: Wraps Nuxt UI's `useColorMode()`, persists to localStorage

---

#### `useLanguage()`

```typescript
interface UseLanguageReturn {
  locale: ComputedRef<'en' | 'ar'> // Current language
  direction: ComputedRef<'ltr' | 'rtl'> // Text direction
  setLocale: (locale: 'en' | 'ar') => void
  t: (key: string) => string // Translation helper
}
```

**Storage**: Wraps @nuxtjs/i18n's `useI18n()`, persists to cookie

---

### Component State

#### AppHeader

- **Local State**: Active navigation item (computed from route)
- **Global State**: Theme (via `useTheme()`), Language (via `useLanguage()`)

#### AppFooter

- **Local State**: None
- **Global State**: Theme toggle (via `useTheme()`), Language switcher (via `useLanguage()`)

#### Container

- **Props**: Custom max-width, padding overrides
- **No State**: Pure presentational component

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser Storage                          │
│  localStorage['nuxt-color-mode']  │  Cookie['i18n_locale']  │
└────────────────┬────────────────────────────┬────────────────┘
                 │                            │
                 ▼                            ▼
         ┌───────────────┐          ┌────────────────┐
         │ useColorMode()│          │   useI18n()    │
         │  (Nuxt UI)    │          │  (@nuxtjs/i18n)│
         └───────┬───────┘          └────────┬───────┘
                 │                           │
                 ▼                           ▼
         ┌───────────────┐          ┌────────────────┐
         │  useTheme()   │          │ useLanguage()  │
         │  (wrapper)    │          │  (wrapper)     │
         └───────┬───────┘          └────────┬───────┘
                 │                           │
                 │                           │
    ┌────────────┴────────────┬──────────────┴──────────────┐
    │                         │                             │
    ▼                         ▼                             ▼
┌────────────┐        ┌───────────────┐          ┌──────────────┐
│ AppHeader  │        │   AppFooter   │          │  Container   │
│ - Nav      │        │ - Social      │          │ - Width      │
│ - Logo     │        │ - Copyright   │          │ - Padding    │
└────────────┘        └───────────────┘          └──────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Theme Toggle    │
                    │ Language Switch │
                    └─────────────────┘
```

---

## Persistence Strategy

### Theme Preference

- **Storage**: `localStorage['nuxt-color-mode']`
- **Format**: Plain string (`'light'`, `'dark'`, or `'system'`)
- **Sync**: Automatic via Nuxt UI
- **SSR**: Handled by `<ColorModeScript>` to prevent flash

### Language Setting

- **Storage**: Cookie (`'i18n_redirected'`) + localStorage
- **Format**: Locale code (`'en'` or `'ar'`)
- **Sync**: Automatic via @nuxtjs/i18n
- **SSR**: Server-side locale detection from cookie

### Color Tokens

- **Storage**: CSS file (`assets/css/tokens.css`)
- **Format**: CSS custom properties with `[data-theme]` selectors
- **Sync**: Static file, loaded once at build time
- **Runtime**: CSS variables update automatically with theme attribute

### Navigation/Social Links

- **Storage**: Static configuration in components
- **Format**: TypeScript arrays/objects
- **Sync**: Not applicable (static data)
- **Future**: Could be moved to app.config.ts or CMS

---

## Type Definitions

See [contracts/types.ts](./contracts/types.ts) for complete TypeScript interfaces.

---

## Summary

The data model uses a lightweight, composable-based architecture with minimal client-side state. Theme and language preferences persist across sessions via browser storage, while color tokens are defined as static CSS custom properties. Layout components are stateless and configuration-driven, following Nuxt and Vue best practices.
