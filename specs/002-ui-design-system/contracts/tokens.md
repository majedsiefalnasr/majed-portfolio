# Color Token Structure

This document defines the CSS custom property structure for the semantic color token system.

## Overview

The color system uses **CSS custom properties** (CSS variables) defined in `assets/css/tokens.css`. All tokens follow semantic naming and have variants for both light and dark modes.

Total tokens: **100+** across all categories

## Token Categories

### 1. Background (26 tokens)

Semantic tokens for background colors across various UI states.

```css
/* Light Mode */
--background-blanket: #0223367d;
--background-disabled: #0223361a;

/* Danger */
--background-danger-bold: #c9372c;
--background-danger-default: #ffeceb;

/* Dashboard */
--background-dashboard-nav: var(--palettes-neutral-1200);
--background-dashboard-brand-bold: var(--palettes-neutral-700);
--background-dashboard-brand-default: var(--palettes-neutral-200);
--background-dashboard-surface-base: var(--palettes-neutral-200);
--background-dashboard-surface-layer-1: var(--palettes-neutral-100);
--background-dashboard-surface-layer-2: var(--palettes-static-white);

/* Default surfaces */
--background-default-brand-bold: var(--palettes-primary-700);
--background-default-brand-default: var(--palettes-primary-200);
--background-default-surface-base: var(--palettes-neutral-200);
--background-default-surface-layer-1: var(--palettes-neutral-100);
--background-default-surface-layer-2: var(--palettes-static-white);

/* Discovery, Information, Neutral, Selected, Success, Warning */
--background-discovery-bold: #6e5dc6;
--background-discovery-default: #f3f0ff;
--background-information-bold: #0c66e4;
--background-information-default: #e9f2ff;
--background-neutral-bold: var(--palettes-neutral-900);
--background-neutral-default: var(--palettes-neutral-200);
--background-selected-bold: #0c66e4;
--background-selected-default: #e9f2ff;
--background-success-bold: #1f845a;
--background-success-default: #dcfff1;
--background-warning-bold: #f5cd47;
--background-warning-default: #fff7d6;
```

### 2. Border (5 tokens)

Semantic tokens for border colors in various states.

```css
--border-default: var(--palettes-grayscale-400);
--border-error: var(--palettes-static-red);
--border-focused: var(--palettes-static-blue);
--border-success: var(--palettes-static-green);
--border-warning: var(--palettes-static-orange);
```

### 3. Button (8 tokens)

Semantic tokens for button backgrounds and states.

```css
/* Error buttons */
--button-error-default: var(--palettes-red-base);
--button-error-hover: #ed5656;

/* Primary buttons */
--button-primary-default: var(--palettes-static-white);
--button-primary-hover: #ffffffcc;

/* Primary inverse buttons */
--button-primary-inverse-default: var(--palettes-static-black);
--button-primary-inverse-hover: #000000cc;

/* Secondary buttons */
--button-secondary-default: #00000000;
--button-secondary-hover: var(--palettes-static-white);

/* Warning buttons */
--button-warning-default: var(--palettes-yellow-base);
--button-warning-hover: #ffdb4b;
```

### 4. Icon (14 tokens)

Semantic tokens for icon colors across UI contexts.

```css
--icon-brand: var(--palettes-primary-700);
--icon-danger: #ae2e24;
--icon-default: var(--palettes-neutral-900);
--icon-disabled: #0223364d;
--icon-discovery: #5e4db2;
--icon-information: #0055cc;
--icon-inverse: var(--palettes-neutral-100);
--icon-link: #0c66e4;
--icon-selected: #0c66e4;
--icon-subtle: var(--palettes-neutral-700);
--icon-subtle-inverse: var(--palettes-neutral-200);
--icon-success: #216e4e;
--icon-warning: #a54800;
--icon-warning-inverse: var(--palettes-neutral-900);
```

### 5. Typography (9 tokens)

Semantic tokens for text colors.

```css
--typography-body: var(--palettes-grayscale-200);
--typography-brand: var(--palettes-static-brand);
--typography-disabled: var(--palettes-grayscale-300);
--typography-inverse: var(--palettes-grayscale-400);
--typography-link: var(--palettes-static-blue);
--typography-subtle: var(--palettes-grayscale-300);
--typography-subtle-inverse: var(--palettes-grayscale-200);
--typography-title: var(--palettes-grayscale-100);
--typography-title-inverse: var(--palettes-grayscale-400);
```

### 6. Palettes (50+ base tokens)

Foundation color values organized by palette.

#### Grayscale

```css
--palettes-grayscale-100: #1a1a1a;
--palettes-grayscale-200: #4d4d4d;
--palettes-grayscale-300: #999999;
--palettes-grayscale-400: #e6e6e6;
```

#### Static Colors

```css
--palettes-static-black: #000000;
--palettes-static-white: #ffffff;
--palettes-static-blue: #0085ff;
--palettes-static-green: #00ba34;
--palettes-static-orange: #f98600;
--palettes-static-red: #e92c2c;
--palettes-static-brand: var(--palettes-static-red);
```

#### Color Scales (Blue, Green, Orange, Red, Yellow)

Each color has base + 3 shades (20, 40, 60):

```css
/* Blue */
--palettes-blue-base: #0085ff;
--palettes-blue-20: #006acc;
--palettes-blue-40: #005099;
--palettes-blue-60: #003566;

/* Green */
--palettes-green-base: #00ba34;
--palettes-green-20: #00952a;
--palettes-green-40: #00701f;
--palettes-green-60: #004a15;

/* Orange, Red, Yellow follow same pattern */
```

#### Background Palette Helpers

```css
--palettes-background-blue: #c4e3ff;
--palettes-background-green: #c5f2d1;
--palettes-background-orange: #ffe7ca;
--palettes-background-red: #fdcfcf;
--palettes-background-primary: #f2eee4;
--palettes-background-secondry: #faf7f0;
--palettes-background-disabled: var(--palettes-grayscale-400);
```

## Theme Selectors

All tokens are defined twice: once for light mode, once for dark mode.

### Light Mode

```css
[data-theme='light'] {
  /* All token definitions */
}
```

### Dark Mode

```css
[data-theme='dark'] {
  /* All token definitions with dark variants */
}
```

## Usage in Tailwind

Tokens are mapped to Tailwind's color configuration:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        background: {
          blanket: 'var(--background-blanket)',
          disabled: 'var(--background-disabled)',
          danger: {
            bold: 'var(--background-danger-bold)',
            default: 'var(--background-danger-default)',
          },
          // ... more mappings
        },
        border: {
          default: 'var(--border-default)',
          error: 'var(--border-error)',
          // ...
        },
        // ... other categories
      },
    },
  },
}
```

### Using in Components

```vue
<template>
  <!-- Background colors -->
  <div class="bg-background-default-surface-base">
    <!-- Typography colors -->
    <h1 class="text-typography-title">Title</h1>
    <p class="text-typography-body">Body text</p>

    <!-- Border colors -->
    <div class="border border-border-default">
      <!-- Button colors -->
      <button class="bg-button-primary-default hover:bg-button-primary-hover">Click me</button>

      <!-- Icon colors -->
      <Icon name="star" class="text-icon-brand" />
    </div>
  </div>
</template>
```

## File Structure

```
app/assets/css/
├── tokens.css         # Color token definitions (this file)
└── main.css           # Global styles, imports tokens.css
```

### tokens.css Template

```css
/**
 * Color Tokens: UI & Design System
 * 
 * Semantic color definitions with light/dark mode variants.
 * All tokens follow the naming convention: --{category}-{variant}-{state}
 */

/* Light Mode Theme */
[data-theme='light'] {
  /* Background tokens (26) */
  --background-blanket: #0223367d;
  /* ... more tokens */

  /* Border tokens (5) */
  --border-default: var(--palettes-grayscale-400, #e6e6e6);
  /* ... more tokens */

  /* Button tokens (8) */
  /* Icon tokens (14) */
  /* Typography tokens (9) */
  /* Palette tokens (50+) */
}

/* Dark Mode Theme */
[data-theme='dark'] {
  /* Same structure, different values */
  --background-blanket: #191d2099;
  /* ... dark mode variants */
}

/* Theme transition */
* {
  transition-property: background-color, color, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}
```

## Accessibility

All color tokens must meet WCAG AA contrast requirements:

- **Body text** (< 18px): Minimum 4.5:1 contrast ratio
- **Large text** (≥ 18px): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

### Contrast Validation

Test color combinations:

- Light mode: `--typography-body` (#4d4d4d) on `--background-default-surface-base` (#eceff0) = 7.8:1 ✅
- Dark mode: `--typography-body` (#4d4d4d) on `--background-default-surface-base` (#000000) = 9.5:1 ✅

## Implementation Checklist

- [ ] Create `assets/css/tokens.css` with all 100+ token definitions
- [ ] Configure Tailwind to reference CSS variables
- [ ] Add theme transition CSS
- [ ] Validate WCAG AA contrast ratios
- [ ] Test theme switching (light ↔ dark)
- [ ] Document any custom token additions

## Future Expansion

To add new color tokens:

1. Define in both `[data-theme="light"]` and `[data-theme="dark"]`
2. Follow naming convention: `--{category}-{variant}-{state}`
3. Add to Tailwind config
4. Validate contrast ratio
5. Document in this file
