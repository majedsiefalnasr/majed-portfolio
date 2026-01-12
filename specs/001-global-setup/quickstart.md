# Quickstart: Global Setup & Configuration

**Feature**: 001-global-setup  
**Date**: 2026-01-12

## Prerequisites

- **Bun**: Latest stable version installed (`bun --version` to verify)
- **Git**: Repository cloned and on `001-global-setup` branch
- **Editor**: VS Code with Vue/Nuxt extensions recommended

## Setup Commands

### 1. Initialize Project

```bash
# From repository root (existing .specify and .github folders will be preserved)
bunx nuxi@latest init . --force --packageManager bun
```

### 2. Install Dependencies

```bash
# Install all required modules
bun add -D @nuxt/ui @nuxt/content @nuxt/image @nuxtjs/i18n @nuxtjs/seo
```

### 3. Create Directory Structure

```bash
# Create required directories per constitution
mkdir -p locales content assets/css public types composables
```

### 4. Create Configuration Files

**Create `assets/css/main.css`**:

```css
@import 'tailwindcss';
@import '@nuxt/ui';
```

**Create `locales/en.json`**:

```json
{
  "site": {
    "title": "Majed Sief Alnasr - Portfolio",
    "description": "Portfolio showcasing work and insights"
  }
}
```

**Create `locales/ar.json`**:

```json
{
  "site": {
    "title": "ماجد سيف النصر - معرض الأعمال",
    "description": "معرض يعرض الأعمال والرؤى"
  }
}
```

**Create placeholder `public/og-image.png`**:

- Add a 1200x630 placeholder image for OpenGraph

### 5. Configure nuxt.config.ts

Replace contents with:

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2026-01-12',

  modules: ['@nuxt/ui', '@nuxt/content', '@nuxt/image', '@nuxtjs/i18n', '@nuxtjs/seo'],

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://majed-portfolio.vercel.app',
    name: 'Majed Sief Alnasr - Portfolio',
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        language: 'en-US',
        dir: 'ltr',
        file: 'en.json',
        name: 'English',
      },
      {
        code: 'ar',
        language: 'ar-EG',
        dir: 'rtl',
        file: 'ar.json',
        name: 'العربية',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  seo: {
    meta: {
      description: 'Portfolio showcasing work and insights by Majed Sief Alnasr',
      ogImage: '/og-image.png',
      twitterCard: 'summary_large_image',
    },
  },
})
```

### 6. Start Development Server

```bash
bun run dev
```

## Verification Checklist

| Check                  | Command/Action                            | Expected Result                           |
| ---------------------- | ----------------------------------------- | ----------------------------------------- |
| Dev server starts      | `bun run dev`                             | Server running at `http://localhost:3000` |
| No module errors       | Check terminal output                     | No red error messages                     |
| English page loads     | Visit `http://localhost:3000`             | Page renders without errors               |
| Arabic page loads      | Visit `http://localhost:3000/ar`          | Page renders with RTL direction           |
| OpenGraph tags present | View page source                          | `<meta property="og:image">` exists       |
| Sitemap accessible     | Visit `http://localhost:3000/sitemap.xml` | XML sitemap renders                       |

## Common Issues

### "Module not found" errors

```bash
# Reinstall dependencies
rm -rf node_modules bun.lockb
bun install
```

### TypeScript errors in nuxt.config.ts

```bash
# Regenerate types
bun run postinstall
```

### i18n "locale not found" warnings

- Ensure `locales/` directory exists at project root
- Verify JSON files are valid (no trailing commas)

## Next Steps

After verification:

1. Create `pages/index.vue` with basic content
2. Run `/speckit.tasks` to generate implementation tasks
3. Commit initial setup to branch
