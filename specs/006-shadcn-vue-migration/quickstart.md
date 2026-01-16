# shadcn-vue Migration Quickstart Guide

> **Developer Guide**: Get started with shadcn-vue in this Nuxt 4 portfolio project

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Adding Components](#adding-components)
6. [First Component Usage](#first-component-usage)
7. [Migration Workflow](#migration-workflow)
8. [Testing Checklist](#testing-checklist)
9. [Troubleshooting](#troubleshooting)

---

## Overview

This guide walks you through setting up shadcn-vue to replace Nuxt UI in this portfolio project.

**What is shadcn-vue?**

- **Not a component library** — Copy-paste components you own
- **CLI-based** — Add components one at a time
- **Built on Radix Vue** — Accessible, unstyled primitives
- **Tailwind CSS** — Styled with utility classes and CSS variables
- **TypeScript** — Fully typed with Vue 3 Composition API

**Key Differences from Nuxt UI:**

| Aspect              | Nuxt UI                     | shadcn-vue                         |
| ------------------- | --------------------------- | ---------------------------------- |
| Installation        | npm package                 | CLI copy-paste                     |
| Component ownership | Node modules                | Project files                      |
| Customization       | UI config object            | Direct file editing                |
| Icons               | Heroicons (UnoCSS)          | Radix Icons (Iconify)              |
| Theming             | Custom tokens               | CSS variables (HSL)                |
| Component structure | Monolithic (e.g., `UCard`)  | Composition (e.g., `Card` family)  |
| Bundle size         | All components always       | Only components you add            |
| Update strategy     | `bun update`                | Re-run CLI to update individual    |
| Dark mode           | `@nuxtjs/color-mode` module | `@nuxtjs/color-mode` (same module) |

---

## Prerequisites

Before starting, ensure you have:

- **Bun 1.3.5+** (runtime used in this project)
- **Node.js 20+** (for compatibility)
- **Git** (for version control)
- **Feature branch** created: `006-shadcn-vue-migration`

**Current Tech Stack:**

- **Framework**: Nuxt 4
- **UI (current)**: Nuxt UI v4.3.0
- **UI (target)**: shadcn-vue
- **Styling**: Tailwind CSS
- **Language**: TypeScript (strict mode)
- **Dark mode**: `@nuxtjs/color-mode`

---

## Installation

### Step 1: Initialize shadcn-vue

Run the CLI initialization command from the project root:

```bash
npx shadcn-vue@latest init
```

**CLI Prompts and Answers:**

```
✔ Would you like to use TypeScript? … yes
✔ Which framework are you using? › Nuxt
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › Slate
✔ Where is your global CSS file? › app/assets/css/main.css
✔ Would you like to use CSS variables for colors? … yes
✔ Where is your tailwind.config located? › tailwind.config.ts
✔ Configure the import alias for components: › @/components
✔ Configure the import alias for utils: › @/utils
✔ Are you using React Server Components? … no
✔ Write configuration to components.json. Proceed? … yes
```

**What this does:**

- Creates `components.json` with configuration
- Updates `tailwind.config.ts` with color variables
- Updates `app/assets/css/main.css` with theme variables
- Sets up import aliases (`@/components`, `@/utils`)

### Step 2: Install Icon Dependencies

shadcn-vue uses Radix Icons via Iconify:

```bash
bun add @iconify/vue @iconify-json/radix-icons
```

### Step 3: Install shadcn-vue Dependencies

The CLI should have added these, but verify in `package.json`:

```bash
bun add radix-vue class-variance-authority clsx tailwind-merge
```

### Step 4: Remove Nuxt UI

```bash
bun remove @nuxt/ui
```

Update `nuxt.config.ts`:

```diff
export default defineNuxtConfig({
  modules: [
-   '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
  ],

-  ui: {
-    primary: 'green',
-    gray: 'slate',
-  },

+  colorMode: {
+    classSuffix: '',  // Use .dark instead of .dark-mode
+  },
})
```

---

## Configuration

### Tailwind Config

After running `shadcn-vue init`, your `tailwind.config.ts` should include:

```typescript
import type {Config} from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
} satisfies Config
```

### CSS Variables

Update `app/assets/css/main.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

**Remove old tokens file:**

```bash
rm app/assets/css/tokens.css
```

### components.json

Verify `components.json` was created with:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/assets/css/main.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "framework": "nuxt",
  "tsx": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/utils",
    "ui": "@/components/ui"
  },
  "iconLibrary": "radix-icons"
}
```

---

## Adding Components

### CLI Command

Add components one at a time:

```bash
npx shadcn-vue@latest add <component-name>
```

**Example: Add Button component**

```bash
npx shadcn-vue@latest add button
```

**What happens:**

- Creates `app/components/ui/button/Button.vue`
- Creates `app/components/ui/button/index.ts`
- Adds utility functions to `app/utils/` if needed

### Components to Add

For this migration, add these components:

```bash
# Core components
npx shadcn-vue@latest add button
npx shadcn-vue@latest add card
npx shadcn-vue@latest add dropdown-menu
npx shadcn-vue@latest add badge
npx shadcn-vue@latest add alert

# Optional (if needed)
npx shadcn-vue@latest add separator
npx shadcn-vue@latest add skeleton
```

### Component Structure

After adding Button, you'll see:

```
app/components/ui/button/
├── Button.vue          # Main component
└── index.ts            # Exports

app/utils/
└── ui.ts               # cn() utility for class merging
```

**Button.vue** (example):

```vue
<script setup lang="ts">
  import {type HTMLAttributes, computed} from 'vue'
  import {type ButtonVariants, buttonVariants} from '.'
  import {cn} from '@/utils'

  interface Props {
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    as?: string
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'button',
  })

  const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props
    return delegated
  })
</script>

<template>
  <component
    :is="as"
    :class="cn(buttonVariants({variant, size}), props.class)"
    v-bind="delegatedProps">
    <slot />
  </component>
</template>
```

---

## First Component Usage

### Example: Convert UButton to Button

**BEFORE (Nuxt UI):**

```vue
<template>
  <UButton icon="i-heroicons-arrow-left" @click="goBack">Back</UButton>
</template>
```

**AFTER (shadcn-vue):**

```vue
<script setup lang="ts">
  import {Icon} from '@iconify/vue'
  import {Button} from '@/components/ui/button'

  function goBack() {
    // ...
  }
</script>

<template>
  <Button @click="goBack">
    <Icon icon="radix-icons:arrow-left" class="me-2 h-4 w-4" />
    Back
  </Button>
</template>
```

**Key Changes:**

1. Import `Button` from `@/components/ui/button`
2. Import `Icon` from `@iconify/vue`
3. Replace `icon` prop with `<Icon>` component in slot
4. Use Radix Icons (`radix-icons:arrow-left`)
5. Add spacing (`me-2`) and sizing (`h-4 w-4`) classes

### Example: Convert UCard to Card Composition

**BEFORE (Nuxt UI):**

```vue
<template>
  <UCard>
    <template #header>
      <h3>Card Title</h3>
    </template>
    <p>Card content goes here.</p>
    <template #footer>
      <UButton>Action</UButton>
    </template>
  </UCard>
</template>
```

**AFTER (shadcn-vue):**

```vue
<script setup lang="ts">
  import {Card, CardHeader, CardTitle, CardContent, CardFooter} from '@/components/ui/card'
  import {Button} from '@/components/ui/button'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Card content goes here.</p>
    </CardContent>
    <CardFooter>
      <Button>Action</Button>
    </CardFooter>
  </Card>
</template>
```

**Key Changes:**

1. Card is now composed of multiple sub-components
2. Header slot → `<CardHeader>` + `<CardTitle>`
3. Default slot → `<CardContent>`
4. Footer slot → `<CardFooter>`
5. Each section has default padding (no manual p-6 needed)

---

## Migration Workflow

### Step-by-Step Component Migration

1. **Identify Nuxt UI components** in a file (e.g., `BlogPostCard.vue`)
2. **Add shadcn-vue equivalents** via CLI
3. **Update imports** to use shadcn-vue components
4. **Transform props to slots** (see contracts/)
5. **Update icon syntax** (Heroicons → Radix Icons)
6. **Replace color classes** with semantic variables
7. **Test in browser** (light & dark modes)
8. **Commit changes**

### Priority Order

Migrate components in this order:

1. **Button** (most used: 20+ instances)
2. **Card** (8 instances: BlogPostCard, CaseStudyCard)
3. **DropdownMenu** (theme switcher, language switcher)
4. **Icon** (all Heroicons → Radix Icons)
5. **Badge** (blog tags, case study tags)
6. **Alert** (error states, notifications)

### File-by-File Migration

**Recommended approach:**

- Migrate one component file at a time
- Start with leaf components (no dependencies)
- Move to composed components (use migrated leaf components)

**Example order:**

1. `app/components/blog/BlogPostMeta.vue` (uses Icon, Badge)
2. `app/components/blog/BlogPostCard.vue` (uses Card, Button, BlogPostMeta)
3. `app/components/blog/BlogList.vue` (uses BlogPostCard)
4. `app/pages/blog/index.vue` (uses BlogList)

---

## Testing Checklist

After migrating each component, verify:

### Visual Testing

- [ ] Component renders correctly in light mode
- [ ] Component renders correctly in dark mode
- [ ] Component is responsive on mobile (< 768px)
- [ ] Component is responsive on tablet (768px - 1024px)
- [ ] Component is responsive on desktop (> 1024px)
- [ ] Icons are properly sized and aligned
- [ ] Spacing matches design (no double padding)
- [ ] Colors use semantic variables (not hardcoded)

### Functional Testing

- [ ] Click interactions work (buttons, links)
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Dropdowns open/close correctly
- [ ] Theme switcher changes theme
- [ ] Language switcher changes language (for bilingual content)
- [ ] Hover states display correctly
- [ ] Focus states are visible (accessibility)
- [ ] Disabled states prevent interaction

### RTL Testing (for Arabic)

- [ ] Switch to Arabic language
- [ ] Layout flips to RTL correctly
- [ ] Icons with `me-*` / `ms-*` classes flip position
- [ ] Text alignment is correct (right-aligned)
- [ ] Navigation order is reversed

### Accessibility Testing

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Screen reader announcements are correct (ARIA labels)
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] Semantic HTML is used (buttons, headings, lists)

### TypeScript Testing

- [ ] No TypeScript errors in editor
- [ ] Props are properly typed
- [ ] Auto-completion works for component props
- [ ] Build completes without errors (`bun run build`)

---

## Troubleshooting

### Issue: Import errors for shadcn components

**Error:**

```
Cannot find module '@/components/ui/button'
```

**Solution:**

1. Verify component was added: `npx shadcn-vue@latest add button`
2. Check `components.json` has correct aliases
3. Restart TypeScript server in VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server"

### Issue: Icons not rendering

**Error:**

Icons show as empty boxes or don't appear.

**Solution:**

1. Install icon dependencies:
   ```bash
   bun add @iconify/vue @iconify-json/radix-icons
   ```
2. Import Icon component:
   ```typescript
   import {Icon} from '@iconify/vue'
   ```
3. Use correct syntax:
   ```vue
   <Icon icon="radix-icons:moon" class="h-5 w-5" />
   ```

### Issue: Dark mode not working

**Error:**

Theme doesn't change when toggling dark mode.

**Solution:**

1. Verify `@nuxtjs/color-mode` is installed and configured:
   ```typescript
   // nuxt.config.ts
   colorMode: {
     classSuffix: '',  // Use .dark instead of .dark-mode
   }
   ```
2. Check CSS variables defined for `.dark` class in `main.css`
3. Ensure `<html>` tag gets `.dark` class (inspect in DevTools)

### Issue: Styles not applying

**Error:**

shadcn components render but have no styling.

**Solution:**

1. Verify Tailwind config includes shadcn color variables
2. Check `main.css` is imported in `app.vue`:
   ```vue
   <style>
     @import '@/assets/css/main.css';
   </style>
   ```
3. Clear Nuxt cache:
   ```bash
   rm -rf .nuxt node_modules/.cache
   bun run dev
   ```

### Issue: cn() utility not found

**Error:**

```
Cannot find module '@/utils'
```

**Solution:**

1. Verify `app/utils/ui.ts` exists (created by shadcn CLI)
2. If missing, create manually:

   ```typescript
   // app/utils/ui.ts
   import {type ClassValue, clsx} from 'clsx'
   import {twMerge} from 'tailwind-merge'

   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs))
   }
   ```

### Issue: Component props not working

**Error:**

Props like `variant` or `size` don't change component appearance.

**Solution:**

1. Check component imports use correct destructuring:
   ```typescript
   import {Button} from '@/components/ui/button' // ✅
   import Button from '@/components/ui/button' // ❌
   ```
2. Verify prop names match component API (check component file)
3. Ensure Tailwind classes are not purged (check `content` in `tailwind.config.ts`)

---

## Next Steps

After completing this quickstart:

1. **Review migration contracts** in `specs/006-shadcn-vue-migration/contracts/`
   - [button.contract.ts](./contracts/button.contract.ts) - Button migration patterns
   - [card.contract.ts](./contracts/card.contract.ts) - Card composition patterns
   - [dropdown.contract.ts](./contracts/dropdown.contract.ts) - DropdownMenu patterns
   - [icon.contract.ts](./contracts/icon.contract.ts) - Icon migration guide
   - [theme.contract.ts](./contracts/theme.contract.ts) - Theme system setup
2. **Start migration** with Button component (most used)
3. **Follow testing checklist** for each migrated component
4. **Update documentation** as you discover patterns
5. **Commit frequently** (one component type at a time)

---

## Resources

### Official Documentation

- [shadcn-vue](https://www.shadcn-vue.com/) - Official shadcn-vue docs
- [Radix Vue](https://www.radix-vue.com/) - Primitive components
- [Radix Icons](https://www.radix-ui.com/icons) - Icon catalog
- [Iconify](https://icon-sets.iconify.design/) - Icon framework

### Project Documentation

- [Migration Spec](./spec.md) - Feature specification
- [Research](./research.md) - Design decisions
- [Data Model](./data-model.md) - Component structure
- [Contracts](./contracts/) - Transformation patterns

### Community

- [shadcn-vue GitHub](https://github.com/radix-vue/shadcn-vue)
- [Radix Vue Discord](https://chat.radix-vue.com/)
- [Nuxt Discord](https://discord.com/invite/nuxt)

---

**Ready to migrate?** Start with `npx shadcn-vue@latest init` and follow the installation steps above.
