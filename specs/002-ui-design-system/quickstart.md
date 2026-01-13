# Quickstart Guide: UI & Design System

**Feature**: UI & Design System  
**Branch**: `002-ui-design-system`  
**Prerequisites**: Nuxt 4 project initialized, Bun installed

This guide walks through setting up the complete UI & Design System from scratch.

---

## Step 1: Install Dependencies

```bash
# Install required packages
bun add @nuxt/fonts @nuxtjs/i18n

# Nuxt UI should already be installed (v4.3.0+)
# If not: bun add @nuxt/ui
```

---

## Step 2: Configure Nuxt

Update `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/fonts', '@nuxtjs/i18n'],

  // Font configuration
  fonts: {
    families: [
      {name: 'Geist', provider: 'bunny'}, // or 'google', depending on availability
    ],
    defaults: {
      fallbacks: {
        'sans-serif': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto'],
      },
      preload: true,
    },
  },

  // i18n configuration
  i18n: {
    locales: [
      {code: 'en', iso: 'en-US', file: 'en.json', dir: 'ltr'},
      {code: 'ar', iso: 'ar-SA', file: 'ar.json', dir: 'rtl'},
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix', // or 'prefix' if you want /en/, /ar/ routes
    lazy: true,
    langDir: 'i18n/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  // Tailwind configuration
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Geist', 'system-ui', 'sans-serif'],
          },
        },
      },
    },
  },
})
```

---

## Step 3: Create Color Tokens

Create `app/assets/css/tokens.css`:

```css
/**
 * Color Tokens: Light and Dark Mode
 */

/* Light Mode */
[data-theme='light'] {
  /* Background */
  --background-default-surface-base: #eceff0;
  --background-default-surface-layer-1: #fafbfb;
  --background-default-surface-layer-2: #ffffff;

  /* Typography */
  --typography-title: #1a1a1a;
  --typography-body: #4d4d4d;
  --typography-subtle: #999999;
  --typography-link: #0085ff;

  /* Border */
  --border-default: #e6e6e6;
  --border-focused: #0085ff;

  /* Icon */
  --icon-default: #173749;
  --icon-subtle: #546b79;

  /* ... Add all 100+ tokens from contracts/tokens.md */
}

/* Dark Mode */
[data-theme='dark'] {
  /* Background */
  --background-default-surface-base: #000000;
  --background-default-surface-layer-1: #fafbfb;
  --background-default-surface-layer-2: #eceff0;

  /* Typography */
  --typography-title: #e5e5e5;
  --typography-body: #b2b2b2;
  --typography-subtle: #666666;
  --typography-link: #0085ff;

  /* ... Dark mode variants */
}

/* Theme transitions */
* {
  transition-property: background-color, color, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}
```

Update `app/assets/css/main.css`:

```css
@import './tokens.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Apply Geist font globally */
body {
  font-family:
    'Geist',
    system-ui,
    -apple-system,
    sans-serif;
}
```

---

## Step 4: Configure Tailwind Colors

Create/update `tailwind.config.ts`:

```typescript
import type {Config} from 'tailwindcss'

export default <Partial<Config>>{
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
          default: {
            'surface-base': 'var(--background-default-surface-base)',
            'surface-layer-1': 'var(--background-default-surface-layer-1)',
            'surface-layer-2': 'var(--background-default-surface-layer-2)',
          },
          // ... map all color categories
        },
        typography: {
          title: 'var(--typography-title)',
          body: 'var(--typography-body)',
          subtle: 'var(--typography-subtle)',
          link: 'var(--typography-link)',
        },
        border: {
          default: 'var(--border-default)',
          focused: 'var(--border-focused)',
        },
        // ... more categories
      },
    },
  },
}
```

---

## Step 5: Create Composables

### `app/composables/useTheme.ts`

```typescript
export const useTheme = () => {
  const colorMode = useColorMode()

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    colorMode.preference = theme
  }

  const toggleTheme = () => {
    if (colorMode.preference === 'system') {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    } else {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  }

  return {
    theme: computed(() => colorMode.value),
    preference: computed(() => colorMode.preference),
    setTheme,
    toggleTheme,
  }
}
```

### `app/composables/useLanguage.ts`

```typescript
export const useLanguage = () => {
  const {locale, setLocale: i18nSetLocale, t} = useI18n()

  const direction = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))

  const setLocale = (newLocale: 'en' | 'ar') => {
    i18nSetLocale(newLocale)
  }

  return {
    locale: computed(() => locale.value as 'en' | 'ar'),
    direction,
    setLocale,
    t,
  }
}
```

---

## Step 6: Create Translation Files

### `i18n/en.json`

```json
{
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "about": "About",
    "blog": "Blog",
    "contact": "Contact"
  },
  "social": {
    "github": "GitHub",
    "linkedin": "LinkedIn",
    "twitter": "Twitter",
    "email": "Email"
  },
  "theme": {
    "toggle": "Toggle theme",
    "light": "Light mode",
    "dark": "Dark mode"
  },
  "footer": {
    "copyright": "© {year} All rights reserved"
  }
}
```

### `i18n/ar.json`

```json
{
  "nav": {
    "home": "الرئيسية",
    "projects": "المشاريع",
    "about": "عني",
    "blog": "المدونة",
    "contact": "اتصل"
  },
  "social": {
    "github": "GitHub",
    "linkedin": "LinkedIn",
    "twitter": "تويتر",
    "email": "البريد الإلكتروني"
  },
  "theme": {
    "toggle": "تبديل السمة",
    "light": "الوضع الفاتح",
    "dark": "الوضع الداكن"
  },
  "footer": {
    "copyright": "© {year} جميع الحقوق محفوظة"
  }
}
```

---

## Step 7: Create Layout Components

### `app/components/Container.vue`

```vue
<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      as?: string
    }>(),
    {
      as: 'div',
    }
  )
</script>

<template>
  <component :is="as" class="container mx-auto px-4 md:px-6 lg:px-8">
    <slot />
  </component>
</template>
```

### `app/components/AppHeader.vue`

```vue
<script setup lang="ts">
  const {t} = useLanguage()
  const route = useRoute()

  const navLinks = [
    {label: t('nav.home'), to: '/'},
    {label: t('nav.projects'), to: '/projects'},
    {label: t('nav.about'), to: '/about'},
    {label: t('nav.blog'), to: '/blog'},
    {label: t('nav.contact'), to: '/contact'},
  ]
</script>

<template>
  <header class="border-b border-border-default">
    <Container as="nav" class="flex items-center justify-between py-4">
      <!-- Logo on start edge -->
      <div class="font-bold text-typography-title">
        <NuxtLink to="/">Logo</NuxtLink>
      </div>

      <!-- Navigation on end edge -->
      <ul class="flex gap-6">
        <li v-for="link in navLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="text-typography-body hover:text-typography-link"
            :class="{'text-typography-link': route.path === link.to}">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </Container>
  </header>
</template>
```

### `app/components/AppFooter.vue`

```vue
<script setup lang="ts">
  const {theme, toggleTheme} = useTheme()
  const {locale, setLocale, t} = useLanguage()

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {platform: 'github', url: 'https://github.com/username', icon: 'i-simple-icons-github'},
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/username',
      icon: 'i-simple-icons-linkedin',
    },
    {platform: 'twitter', url: 'https://twitter.com/username', icon: 'i-simple-icons-x'},
    {platform: 'email', url: 'mailto:user@example.com', icon: 'i-heroicons-envelope'},
  ]
</script>

<template>
  <footer class="border-t border-border-default mt-auto">
    <Container class="py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Social links -->
        <div class="flex gap-4">
          <a
            v-for="link in socialLinks"
            :key="link.platform"
            :href="link.url"
            :aria-label="t(`social.${link.platform}`)"
            class="text-icon-subtle hover:text-icon-default">
            <UIcon :name="link.icon" class="w-5 h-5" />
          </a>
        </div>

        <!-- Copyright -->
        <p class="text-typography-subtle text-sm">
          {{ t('footer.copyright', {year: currentYear}) }}
        </p>

        <!-- Controls -->
        <div class="flex gap-4">
          <!-- Theme toggle -->
          <button
            @click="toggleTheme"
            :aria-label="t('theme.toggle')"
            class="text-icon-subtle hover:text-icon-default">
            <UIcon
              :name="theme === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
              class="w-5 h-5" />
          </button>

          <!-- Language toggle -->
          <button
            @click="setLocale(locale === 'en' ? 'ar' : 'en')"
            class="text-typography-subtle hover:text-typography-body text-sm">
            {{ locale === 'en' ? 'العربية' : 'English' }}
          </button>
        </div>
      </div>
    </Container>
  </footer>
</template>
```

---

## Step 8: Update Root Layout

Update `app/app.vue`:

```vue
<script setup lang="ts">
  const {direction} = useLanguage()
</script>

<template>
  <Html :dir="direction" :lang="$i18n.locale">
    <Head>
      <Title>Portfolio</Title>
    </Head>

    <Body
      class="bg-background-default-surface-base text-typography-body min-h-screen flex flex-col">
      <AppHeader />

      <main class="flex-1">
        <NuxtPage />
      </main>

      <AppFooter />
    </Body>
  </Html>
</template>
```

---

## Step 9: Test RTL Mode

Create a test page to verify RTL layout:

```vue
<!-- pages/test-rtl.vue -->
<script setup lang="ts">
  const {locale, setLocale} = useLanguage()
</script>

<template>
  <Container>
    <div class="py-12">
      <h1 class="text-typography-title text-4xl mb-8">RTL Test Page</h1>

      <div class="space-y-4">
        <button @click="setLocale('en')" class="bg-button-primary-default px-4 py-2 rounded">
          Switch to English (LTR)
        </button>

        <button @click="setLocale('ar')" class="bg-button-primary-default px-4 py-2 rounded">
          Switch to Arabic (RTL)
        </button>

        <div class="border border-border-default p-6 rounded">
          <h2 class="text-typography-title mb-4">Current Locale: {{ locale }}</h2>

          <!-- Test logical properties -->
          <div class="flex gap-4">
            <div class="bg-background-neutral-default p-4 ms-4">Margin start (ms-4)</div>
            <div class="bg-background-neutral-default p-4 me-4">Margin end (me-4)</div>
          </div>

          <p class="text-start mt-4">This text aligns to start (text-start)</p>
        </div>
      </div>
    </div>
  </Container>
</template>
```

---

## Step 10: Verify Setup

Run the development server:

```bash
bun run dev
```

### Checklist

- [ ] Geist font loads correctly
- [ ] Light mode displays correct colors
- [ ] Dark mode toggle works smoothly (200ms transition)
- [ ] Theme preference persists across page refreshes
- [ ] English (LTR) layout: logo left, nav right
- [ ] Arabic (RTL) layout: logo right, nav left
- [ ] Navigation links translated correctly
- [ ] Social icons appear in footer
- [ ] Container limits max-width at each breakpoint
- [ ] All colors use CSS custom properties

---

## Troubleshooting

### Font not loading

- Check `@nuxt/fonts` is installed
- Verify Geist is available from chosen provider
- Check browser console for font loading errors

### Theme toggle not working

- Ensure `useColorMode()` is available (Nuxt UI installed)
- Check `data-theme` attribute on `<html>` element
- Verify `tokens.css` is imported in `main.css`

### RTL not working

- Confirm `dir` attribute on `<html>` is updating
- Use logical properties (`ms-`, `me-`, `text-start`) not directional (`ml-`, `mr-`, `text-left`)
- Check i18n config has correct `dir` values

### Colors not applying

- Verify Tailwind config includes color variable mappings
- Check `tokens.css` is loaded (inspect browser DevTools)
- Ensure class names match Tailwind config structure

---

## Next Steps

- [ ] Run `/speckit.tasks` to generate implementation tasks
- [ ] Create type definition file from `contracts/types.ts`
- [ ] Add comprehensive tests for components and composables
- [ ] Validate WCAG AA contrast ratios with automated tools
- [ ] Run Lighthouse audit to verify performance targets

---

## Resources

- [Nuxt UI Documentation](https://ui.nuxt.com)
- [@nuxt/fonts Documentation](https://github.com/nuxt/fonts)
- [@nuxtjs/i18n Documentation](https://i18n.nuxtjs.org)
- [Tailwind CSS Logical Properties](https://tailwindcss.com/docs)
- [Complete Type Definitions](./contracts/types.ts)
- [Component Interfaces](./contracts/components.md)
- [Composable Interfaces](./contracts/composables.md)
