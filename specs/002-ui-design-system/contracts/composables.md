# Composable Interfaces

This document defines the API contracts for all composables in the UI & Design System feature.

## useTheme()

Manages theme state (light/dark mode) with localStorage persistence.

### Signature

```typescript
function useTheme(): UseThemeReturn

interface UseThemeReturn {
  theme: ComputedRef<ThemeValue>
  preference: ComputedRef<ThemePreference>
  setTheme: (theme: ThemePreference) => void
  toggleTheme: () => void
}
```

### API

#### `theme`

- **Type**: `ComputedRef<'light' | 'dark'>`
- **Description**: Current resolved theme (read-only computed value)
- **Behavior**: Returns `'dark'` when preference is `'dark'` OR preference is `'system'` and OS preference is dark

#### `preference`

- **Type**: `ComputedRef<'light' | 'dark' | 'system'>`
- **Description**: User's explicit theme preference (read-only computed value)
- **Storage**: Synced with `localStorage['nuxt-color-mode']`

#### `setTheme(theme)`

- **Parameters**: `theme: 'light' | 'dark' | 'system'`
- **Returns**: `void`
- **Description**: Sets user's theme preference
- **Side Effects**:
  - Updates localStorage
  - Triggers CSS transition (200ms duration)
  - Updates `data-theme` attribute on `<html>`

#### `toggleTheme()`

- **Returns**: `void`
- **Description**: Toggles between light and dark modes
- **Behavior**: If preference is `'system'`, sets to opposite of current resolved theme. Otherwise toggles between `'light'` and `'dark'`
- **Side Effects**: Same as `setTheme()`

### Example Usage

```typescript
<script setup lang="ts">
const { theme, preference, setTheme, toggleTheme } = useTheme()

// Check current theme
console.log(theme.value) // 'light' or 'dark'

// Set specific theme
setTheme('dark')

// Toggle theme
toggleTheme()

// Reset to system preference
setTheme('system')
</script>

<template>
  <button @click="toggleTheme">
    <Icon :name="theme === 'dark' ? 'moon' : 'sun'" />
  </button>
</template>
```

### Implementation Notes

- Wraps Nuxt UI's `useColorMode()` composable
- Automatically handles SSR with `<ColorModeScript>`
- Transitions use 200ms duration per clarification
- Respects user's manual override over system preference

---

## useLanguage()

Manages language/locale state with i18n integration and RTL support.

### Signature

```typescript
function useLanguage(): UseLanguageReturn

interface UseLanguageReturn {
  locale: ComputedRef<Locale>
  direction: ComputedRef<TextDirection>
  setLocale: (locale: Locale) => void
  t: (key: string, ...args: any[]) => string
}
```

### API

#### `locale`

- **Type**: `ComputedRef<'en' | 'ar'>`
- **Description**: Current active locale (read-only computed value)
- **Storage**: Synced with cookie and localStorage via @nuxtjs/i18n

#### `direction`

- **Type**: `ComputedRef<'ltr' | 'rtl'>`
- **Description**: Text direction based on current locale (read-only computed value)
- **Behavior**: Returns `'rtl'` for Arabic (`'ar'`), `'ltr'` for English (`'en'`)

#### `setLocale(locale)`

- **Parameters**: `locale: 'en' | 'ar'`
- **Returns**: `void`
- **Description**: Changes the active language
- **Side Effects**:
  - Updates `<html lang="en|ar">` attribute
  - Updates `<html dir="ltr|rtl">` attribute
  - Triggers layout mirroring via logical properties
  - Loads new translation strings

#### `t(key, ...args)`

- **Parameters**:
  - `key: string` - Translation key (e.g., `'nav.home'`)
  - `args: any[]` - Interpolation arguments
- **Returns**: `string` - Translated text
- **Description**: Translates a key to current locale
- **Fallback**: Returns key if translation missing

### Example Usage

```typescript
<script setup lang="ts">
const { locale, direction, setLocale, t } = useLanguage()

// Check current language
console.log(locale.value) // 'en' or 'ar'
console.log(direction.value) // 'ltr' or 'rtl'

// Change language
setLocale('ar')

// Get translation
const homeLabel = t('nav.home') // "Home" or "الرئيسية"
</script>

<template>
  <div :dir="direction">
    <p class="text-start">{{ t('welcome.message') }}</p>

    <button @click="setLocale(locale === 'en' ? 'ar' : 'en')">
      {{ locale === 'en' ? 'العربية' : 'English' }}
    </button>
  </div>
</template>
```

### Implementation Notes

- Wraps @nuxtjs/i18n's `useI18n()` composable
- Automatically handles cookie-based persistence
- Updates `dir` attribute for CSS logical property mirroring
- Compatible with server-side rendering

---

## Type Definitions

For complete type definitions, see [types.ts](./types.ts).

### Key Types

```typescript
type ThemeValue = 'light' | 'dark'
type ThemePreference = 'light' | 'dark' | 'system'
type Locale = 'en' | 'ar'
type TextDirection = 'ltr' | 'rtl'
```

---

## Error Handling

Both composables include runtime validation:

```typescript
// useTheme
setTheme('invalid') // Logs warning, falls back to 'system'

// useLanguage
setLocale('fr') // Logs warning, stays on current locale
```

Errors are logged to console in development, silently handled in production.

---

## Testing

See `test/composables/` for unit tests covering:

- State initialization
- Storage persistence
- Theme toggling logic
- Locale switching
- SSR compatibility
