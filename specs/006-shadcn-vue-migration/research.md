# Research: shadcn-vue UI Library Migration

**Feature**: shadcn-vue UI Library Migration  
**Branch**: `006-shadcn-vue-migration`  
**Date**: 2026-01-16  
**Phase**: 0 (Research & Design Decisions)

## Executive Summary

This document consolidates research findings for migrating from Nuxt UI to shadcn-vue. All technical unknowns from the Technical Context have been resolved through documentation review and MCP server queries.

---

## Decision 1: shadcn-vue CLI Installation & Configuration

### Context

shadcn-vue uses a fundamentally different approach than Nuxt UI: instead of installing components as an npm module, it copies component source code directly into your project via CLI.

### Decision

**Use shadcn-vue CLI with `npx shadcn-vue@latest init` for project initialization and component installation**

### Rationale

1. **Component Ownership**: Developers have full control over component source code (can modify directly)
2. **No Lock-in**: Components live in the project, not in node_modules
3. **Customization**: Easier to customize components without fighting framework abstractions
4. **Tree-shaking**: Only the components you use are added to the project
5. **MCP Server Compatibility**: The CLI approach aligns with the shadcn MCP server for AI-assisted component generation

### Implementation Approach

```bash
# Initialize shadcn-vue (one-time setup)
npx shadcn-vue@latest init

# Add individual components as needed
npx shadcn-vue@latest add button
npx shadcn-vue@latest add card
npx shadcn-vue@latest add dropdown-menu
```

### Configuration File (`components.json`)

```json
{
  "$schema": "https://shadcn-vue.com/schema.json",
  "style": "new-york",
  "typescript": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/assets/css/main.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "composables": "@/composables",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib"
  },
  "iconLibrary": "radix-icons"
}
```

### Alternatives Considered

- **Alt 1**: Use `shadcn-nuxt` module (wrapper around shadcn-vue CLI)
  - **Rejected**: Adds unnecessary abstraction layer; direct CLI approach is simpler and more maintainable
- **Alt 2**: Manual component copy-paste from documentation
  - **Rejected**: CLI ensures consistent configuration and handles dependencies automatically

---

## Decision 2: Radix Icons Integration

### Context

shadcn-vue components can use various icon libraries (Lucide, Radix Icons via Iconify). Current project may use Heroicons with Nuxt UI.

### Decision

**Use Radix Icons via @iconify/vue and @iconify-json/radix-icons**

### Rationale

1. **shadcn-vue Examples**: Official documentation uses Radix Icons extensively
2. **Iconify Integration**: Provides type-safe icon access with tree-shaking
3. **Consistent Ecosystem**: Matches the Radix UI primitives used by shadcn-vue
4. **Icon Variety**: Radix Icons provides sufficient coverage for UI needs (300+ icons)
5. **Performance**: Iconify only bundles used icons, minimizing bundle size

### Implementation Approach

```bash
# Install dependencies
npm install -D @iconify/vue @iconify-json/radix-icons
```

```vue
<!-- Usage in components -->
<script setup lang="ts">
  import {Icon} from '@iconify/vue'
</script>

<template>
  <Icon icon="radix-icons:moon" class="h-5 w-5" />
  <Icon icon="radix-icons:sun" class="h-5 w-5" />
  <Icon icon="radix-icons:arrow-right" class="h-4 w-4" />
</template>
```

### Icon Migration Map

| Current (Heroicons)       | New (Radix Icons)         |
| ------------------------- | ------------------------- |
| `i-heroicons-arrow-left`  | `radix-icons:arrow-left`  |
| `i-heroicons-arrow-right` | `radix-icons:arrow-right` |
| `i-heroicons-moon`        | `radix-icons:moon`        |
| `i-heroicons-sun`         | `radix-icons:sun`         |
| `i-heroicons-clipboard`   | `radix-icons:clipboard`   |
| `i-heroicons-check`       | `radix-icons:check`       |

### Alternatives Considered

- **Alt 1**: Lucide Icons (default in many shadcn-vue examples)
  - **Rejected**: Radix Icons are more tightly integrated with Radix UI ecosystem
- **Alt 2**: Keep Heroicons
  - **Rejected**: Would require custom integration; Radix Icons are better suited for shadcn-vue

---

## Decision 3: Theming System & CSS Variables

### Context

Nuxt UI likely uses its own color system. shadcn-vue uses CSS variables with oklch color space for consistent theming across light/dark modes.

### Decision

**Adopt shadcn-vue default theme with CSS variable-based theming**

### Rationale

1. **Modern Color Space**: oklch provides perceptually uniform colors (better than HSL/RGB)
2. **Dark Mode Support**: Built-in light/dark mode with CSS variables
3. **Customizable**: Can easily override CSS variables for brand colors
4. **Accessibility**: Color contrast ratios maintained across themes
5. **Consistency**: All shadcn-vue components work seamlessly with the default theme

### Implementation Approach

**CSS Variables** (`app/assets/css/main.css`):

```css
@import 'tailwindcss';

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**Tailwind Config** (`tailwind.config.ts`):

```typescript
import type {Config} from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,vue}',
    './components/**/*.{js,ts,vue}',
    './pages/**/*.{js,ts,vue}',
    './content/**/*.md',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
} satisfies Config
```

### Dark Mode Implementation

**Using Nuxt Color Mode** (already installed):

```vue
<script setup lang="ts">
  import {Icon} from '@iconify/vue'
  import {Button} from '@/components/ui/button'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'

  const colorMode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon">
        <Icon icon="radix-icons:moon" class="h-5 w-5 dark:hidden" />
        <Icon icon="radix-icons:sun" class="h-5 w-5 hidden dark:block" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="colorMode.preference = 'light'"> Light </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'dark'"> Dark </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'system'"> System </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Alternatives Considered

- **Alt 1**: Map existing Nuxt UI design tokens to shadcn-vue CSS variables
  - **Rejected**: User clarification specified adopting shadcn-vue defaults
- **Alt 2**: Use HSL color space instead of oklch
  - **Rejected**: oklch provides better perceptual uniformity

---

## Decision 4: Component Equivalence Mapping

### Context

Nuxt UI components need to be mapped to shadcn-vue equivalents. Not all components have 1:1 equivalents.

### Decision

**Component mapping with functional equivalence (not necessarily visual parity)**

### Component Migration Matrix

| Nuxt UI Component             | shadcn-vue Equivalent                                                             | Notes                                                         |
| ----------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `UCard`                       | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | shadcn-vue uses composition pattern (multiple sub-components) |
| `UButton` (default)           | `Button` (variant="default")                                                      | Direct equivalent                                             |
| `UButton` (variant="ghost")   | `Button` (variant="ghost")                                                        | Direct equivalent                                             |
| `UButton` (variant="link")    | `Button` (variant="link")                                                         | Direct equivalent                                             |
| `UButton` (variant="outline") | `Button` (variant="outline")                                                      | Direct equivalent                                             |
| `UButton` (icon prop)         | `Button` (size="icon") with Icon component                                        | Requires separate Icon component                              |
| `UButton` (trailing-icon)     | `Button` with slotted Icon                                                        | Manual icon placement in slot                                 |
| `UButton` (leading-icon)      | `Button` with slotted Icon                                                        | Manual icon placement in slot                                 |
| `UDropdownMenu`               | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`  | Composition pattern                                           |
| `UBadge`                      | `Badge`                                                                           | Direct equivalent                                             |
| `UAlert`                      | `Alert`, `AlertTitle`, `AlertDescription`                                         | Composition pattern                                           |
| `USelect`                     | `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`                          | Composition pattern                                           |
| Container (custom)            | Custom component (retain as-is)                                                   | Not a Nuxt UI component                                       |
| Navigation (custom)           | Custom component with shadcn-vue primitives                                       | Rebuild with Button, DropdownMenu                             |

### Implementation Pattern

**Before (Nuxt UI)**:

```vue
<UCard class="hover:shadow-lg">
  <h3>Title</h3>
  <p>Content</p>
  <UButton variant="link" trailing-icon="i-heroicons-arrow-right">
    Read more
  </UButton>
</UCard>
```

**After (shadcn-vue)**:

```vue
<Card class="hover:shadow-lg">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
  <CardFooter>
    <Button variant="link">
      Read more
      <Icon icon="radix-icons:arrow-right" class="ml-2 h-4 w-4" />
    </Button>
  </CardFooter>
</Card>
```

### Rationale

1. **Composition over Configuration**: shadcn-vue uses composable sub-components for flexibility
2. **Explicit Structure**: CardHeader/CardContent/CardFooter make layout intentions clear
3. **Customization**: Easier to customize individual sections
4. **TypeScript Support**: Better type inference with composition pattern

### Alternatives Considered

- **Alt 1**: Create wrapper components that mimic Nuxt UI API
  - **Rejected**: Defeats the purpose of migration; maintains old abstraction layer
- **Alt 2**: Mix Nuxt UI and shadcn-vue during transition
  - **Rejected**: User clarification specified complete replacement

---

## Decision 5: Nuxt.config.ts Module Configuration

### Context

Nuxt UI is currently registered as a module in `nuxt.config.ts`. shadcn-vue doesn't use a Nuxt module.

### Decision

**Remove `@nuxt/ui` module from nuxt.config.ts; no shadcn-vue module needed**

### Implementation

**Before**:

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui', // REMOVE
    '@nuxt/fonts',
    '@nuxt/content',
    // ...
  ],
})
```

**After**:

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/fonts',
    '@nuxt/content',
    // ...
  ],
  // shadcn-vue components are auto-imported from app/components/ui/
})
```

### Rationale

1. **No Module Needed**: shadcn-vue components are just Vue components in `app/components/ui/`
2. **Nuxt Auto-imports**: Nuxt's built-in component auto-import handles shadcn-vue components
3. **Simpler Configuration**: Less module dependencies = simpler build

### Alternatives Considered

- **Alt 1**: Use `shadcn-nuxt` module
  - **Rejected**: Unnecessary abstraction; direct approach is simpler

---

## Decision 6: Package.json Dependencies

### Decision

**Remove @nuxt/ui, add @iconify/vue and @iconify-json/radix-icons**

### Implementation

**Remove**:

```json
{
  "dependencies": {
    "@nuxt/ui": "4.3.0" // REMOVE
  }
}
```

**Add**:

```json
{
  "devDependencies": {
    "@iconify/vue": "^4.1.2",
    "@iconify-json/radix-icons": "^1.2.3"
  }
}
```

### Rationale

1. **No Runtime Dependency**: shadcn-vue components are source code, not npm package
2. **Icon Library**: Iconify provides type-safe, tree-shakeable icon access
3. **Dev Dependency**: Icon JSON data only needed at build time

---

## Open Questions / Deferred Decisions

None. All technical unknowns from the Technical Context have been resolved.

---

## Risk Assessment

| Risk                           | Likelihood | Impact | Mitigation                                                      |
| ------------------------------ | ---------- | ------ | --------------------------------------------------------------- |
| Component prop incompatibility | Medium     | High   | Manual component-by-component migration with testing            |
| Visual regression              | High       | Medium | Acceptable per user clarifications (adopting new design system) |
| RTL support issues             | Low        | High   | shadcn-vue uses Tailwind RTL utilities (same as current)        |
| Performance degradation        | Low        | Medium | shadcn-vue components are lightweight (no framework overhead)   |
| Build time increase            | Low        | Low    | Components are tree-shaken; only used components bundled        |

---

## Next Steps (Phase 1)

1. Generate `data-model.md` - Document component structure, props, relationships
2. Generate `contracts/` - Define component interfaces for migration
3. Generate `quickstart.md` - Developer guide for shadcn-vue setup
4. Update agent context - Add shadcn-vue to Copilot instructions
5. Re-evaluate Constitution Check - Verify no additional violations

---

## References

- [shadcn-vue Documentation](https://www.shadcn-vue.com/docs/introduction)
- [shadcn-vue MCP Server Docs](https://www.shadcn-vue.com/docs/mcp)
- [Reka UI Documentation](https://reka-ui.com/) (underlying primitives)
- [Iconify for Vue](https://iconify.design/docs/icon-components/vue/)
- [Radix Icons](https://www.radix-ui.com/icons)
- [oklch Color Space](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
