# Research: UI & Design System

**Feature**: UI & Design System  
**Date**: 2026-01-12  
**Phase**: 0 (Outline & Research)

## Overview

This document resolves all NEEDS CLARIFICATION items from the Technical Context and provides best practices for implementing the design system using Nuxt 4, Nuxt UI v4, and Tailwind CSS.

## Research Tasks

### 1. Geist Font Integration with Nuxt

**Decision**: Use `@nuxt/fonts` module with Geist font family

**Rationale**:

- `@nuxt/fonts` provides automatic font optimization with zero configuration
- Supports font subsetting to reduce bundle size
- Handles `font-display: swap` automatically to prevent layout shift
- Integrates seamlessly with Nuxt 4's build pipeline

**Implementation Pattern**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/fonts'],
  fonts: {
    families: [
      {name: 'Geist', provider: 'bunny'}, // Or 'google', 'fontshare' depending on availability
    ],
    defaults: {
      fallbacks: {
        'sans-serif': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto'],
      },
    },
  },
})
```

**Alternatives Considered**:

- Manual `@font-face` declarations - Rejected due to manual optimization burden and CLS risk
- Google Fonts CDN - Rejected due to privacy concerns and potential GDPR issues
- Self-hosted fonts - Considered but `@nuxt/fonts` provides better DX with same control

**Zero CLS Strategy**:

- Use `font-display: swap` (default in @nuxt/fonts)
- Preload font files in critical path
- Define fallback metrics matching Geist dimensions
- Use `size-adjust` CSS property for fallback fonts

---

### 2. Nuxt UI v4 Theming System

**Decision**: Extend Nuxt UI's built-in theming with custom color tokens

**Rationale**:

- Nuxt UI v4 uses CSS custom properties for theming (perfect for our light/dark modes)
- Provides `app.config.ts` for theme configuration
- Built-in `useColorMode()` composable for theme switching
- Seamless integration with Tailwind CSS classes

**Implementation Pattern**:

```typescript
// app.config.ts
export default defineAppConfig({
  ui: {
    primary: 'brand', // Maps to our custom brand color
    gray: 'neutral',   // Maps to our neutral palette
    colors: ['brand', 'neutral', 'primary', 'static']
  }
})

// assets/css/tokens.css
[data-theme="light"] {
  --color-primary-700: #1b718a;
  --color-neutral-900: #173749;
  /* ... all 100+ tokens */
}

[data-theme="dark"] {
  --color-primary-700: #1b718a;
  --color-neutral-900: #173749;
  /* ... dark mode variants */
}
```

**Nuxt UI Components to Extend**:

- `UContainer` - Will customize for our Container component
- `UButton` - Use for navigation links and toggles
- `UIcon` - For social media icons and directional indicators

**Alternatives Considered**:

- Custom theming from scratch - Rejected, reinvents wheel and violates constitution
- Tailwind UI - Rejected, not integrated with Nuxt ecosystem
- Vuetify - Rejected, too heavy and doesn't use Tailwind

---

### 3. Color Token Implementation in Tailwind

**Decision**: Define color tokens as CSS custom properties with Tailwind color configuration

**Rationale**:

- CSS custom properties allow runtime theme switching without recompilation
- Tailwind's `colors` config can reference CSS variables
- Semantic naming (Background, Border, Button, Icon, Typography) maps directly to use cases
- Single source of truth for all color values

**Implementation Pattern**:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        background: {
          blanket: 'var(--background-blanket)',
          disabled: 'var(--background-disabled)',
          // ... semantic mappings
        },
        border: {
          default: 'var(--border-default)',
          error: 'var(--border-error)',
          // ... more border colors
        },
        // Repeat for button, icon, typography categories
      },
    },
  },
}
```

**Usage in Components**:

```vue
<div class="bg-background-default-surface-base text-typography-title">
  <!-- Automatically switches with theme -->
</div>
```

**Color Token Organization**:

- **Base Palettes**: Static colors, grayscale, primary colors (100+ tokens)
- **Semantic Tokens**: Background (26 variants), Border (5), Button (8), Icon (14), Typography (9)
- **Mode-Specific**: Light/Dark variants stored in `[data-theme]` selectors

**Alternatives Considered**:

- Inline color values - Rejected, no theming support
- Tailwind's default palette - Rejected, doesn't meet semantic naming requirements
- SCSS variables - Rejected, can't switch at runtime

---

### 4. RTL Support Patterns

**Decision**: Use Tailwind CSS logical properties with `dir="rtl"` attribute

**Rationale**:

- Tailwind v3.3+ has built-in logical property utilities (`ms-`, `me-`, `ps-`, `pe-`)
- Logical properties automatically flip with `dir` attribute
- No JavaScript required for layout mirroring
- Performance-friendly (no recalculations, pure CSS)

**Implementation Pattern**:

```vue
<!-- Composable sets dir attribute -->
<html :dir="locale === 'ar' ? 'rtl' : 'ltr'">
  <!-- Components use logical properties -->
  <div class="ms-4 me-2">
    <!-- margin-inline-start, margin-inline-end -->
    <p class="text-start">
      <!-- text-align: start -->
      Content automatically flips
    </p>
  </div>
</html>
```

**Logical Property Mappings**:

- `ml-4` → `ms-4` (margin-inline-start)
- `mr-2` → `me-2` (margin-inline-end)
- `pl-6` → `ps-6` (padding-inline-start)
- `text-left` → `text-start`
- `float-left` → `float-start`

**Logo Positioning Strategy**:

```vue
<template>
  <header class="flex items-center">
    <!-- Logo always on start edge (left LTR, right RTL) -->
    <div class="me-auto">
      <Logo />
    </div>
    <!-- Nav always on end edge (right LTR, left RTL) -->
    <nav class="ms-auto">
      <NavLinks />
    </nav>
  </header>
</template>
```

**Directional Icons**:

```vue
<!-- Icons flip with rtl: modifier -->
<Icon name="chevron-right" class="rtl:rotate-180" />
```

**Alternatives Considered**:

- JavaScript-based layout flipping - Rejected, performance overhead
- Duplicate LTR/RTL stylesheets - Rejected, maintenance burden
- Manual transforms - Rejected, error-prone and verbose

---

### 5. Theme Switching Patterns

**Decision**: Use Nuxt UI's `useColorMode()` composable with localStorage persistence

**Rationale**:

- Built-in `useColorMode()` handles system preference detection
- Automatic localStorage sync (no manual implementation)
- SSR-safe (no flash of unstyled content)
- Integrates with `<ColorModeScript>` for instant theme application

**Implementation Pattern**:

```typescript
// composables/useTheme.ts
export const useTheme = () => {
  const colorMode = useColorMode()

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    colorMode.preference = theme
  }

  const toggleTheme = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme: computed(() => colorMode.value),
    preference: computed(() => colorMode.preference),
    setTheme,
    toggleTheme,
  }
}
```

**Theme Toggle Component**:

```vue
<template>
  <button
    @click="toggleTheme"
    :aria-label="$t('theme.toggle')"
    class="transition-colors duration-200">
    <Icon :name="theme === 'dark' ? 'moon' : 'sun'" />
  </button>
</template>
```

**Transition Timing**:

- Duration: 200ms (per clarification session)
- Easing: `ease-in-out` for smooth color interpolation
- Properties: `background-color`, `color`, `border-color`

**System Preference Detection**:

```typescript
// Nuxt UI handles this automatically via useColorMode()
// User manual toggle overrides system preference
// Preference stored in localStorage as 'nuxt-color-mode'
```

**Alternatives Considered**:

- VueUse `useDark()` - Considered, but Nuxt UI's solution is more integrated
- Custom implementation - Rejected, reinvents well-tested solution
- CSS-only with `prefers-color-scheme` - Rejected, no manual toggle support

---

### 6. Performance Optimization Strategies

**Decision**: Multi-layered optimization approach for Lighthouse 95+ score

**Strategies**:

#### Font Loading Optimization

- Use `@nuxt/fonts` with automatic subsetting
- Preload Geist font files in critical path
- Implement `font-display: swap` to prevent FOIT
- Use `size-adjust` for fallback metrics to prevent CLS

#### CSS Optimization

- Purge unused Tailwind classes (automatic in production)
- Extract critical CSS for above-the-fold content
- Minify and compress CSS files
- Use CSS containment for isolated component rendering

#### Theme Switching Performance

- Use `will-change: background-color, color` on transitioning elements
- Debounce rapid theme toggles (prevent excessive repaints)
- Transition only necessary properties (avoid `all`)
- Duration: 200ms (fast enough to feel instant)

#### Color Token Performance

- CSS custom properties have minimal runtime cost
- Browser native interpolation for transitions
- No JavaScript computation required

#### Component Lazy Loading

```typescript
// Defer non-critical components
const AppFooter = defineAsyncComponent(() => import('~/components/AppFooter.vue'))
```

#### Bundle Size Management

- Tree-shake unused Nuxt UI components
- Use dynamic imports for heavy dependencies
- Monitor bundle size in CI/CD pipeline

**Performance Budget**:

- Total CSS: < 50KB (gzipped)
- Geist font: < 100KB (with subsetting)
- Component JS: < 20KB (for layout components)

**Monitoring**:

- Lighthouse CI in GitHub Actions
- Core Web Vitals tracking
- Bundle size checks on PR

---

## Technology Stack Summary

| Technology   | Version | Purpose                                   |
| ------------ | ------- | ----------------------------------------- |
| Nuxt         | 4.x     | SSG framework, file-system routing        |
| Nuxt UI      | v4.3.0+ | Component library, theming system         |
| Tailwind CSS | 3.4+    | Utility-first styling, logical properties |
| @nuxt/fonts  | Latest  | Optimized font loading                    |
| @nuxtjs/i18n | Latest  | Internationalization, RTL support         |
| TypeScript   | 5.x     | Type safety (strict mode)                 |
| Vitest       | Latest  | Component and unit testing                |

---

## Best Practices Applied

### 1. Nuxt 4 Conventions

- File-system routing for pages
- Auto-imported components
- Composition API with `<script setup>`
- `app.config.ts` for theme configuration

### 2. Tailwind Best Practices

- Logical properties for RTL support
- Semantic color naming
- Utility classes over custom CSS
- Responsive design with mobile-first approach

### 3. Performance Best Practices

- Optimized font loading (zero CLS)
- CSS custom properties for runtime theming
- Fast transition timing (200ms)
- Lighthouse score targets (95+)

### 4. Accessibility Best Practices

- WCAG AA contrast ratios
- Keyboard navigation support
- ARIA labels for interactive elements
- Semantic HTML structure

### 5. Internationalization Best Practices

- Logical properties for automatic RTL
- Translatable UI strings via i18n
- Language-aware layout mirroring
- Proper `dir` and `lang` attributes

---

## Open Questions Resolved

All NEEDS CLARIFICATION items from Technical Context have been resolved through this research phase. The implementation can proceed with confidence using the patterns and technologies documented above.
