# Research: Global Setup & Configuration

**Feature**: 001-global-setup  
**Date**: 2026-01-12  
**Status**: Complete

## Research Tasks

### 1. Nuxt 4 Project Initialization with Bun

**Context**: Need to understand the correct initialization command and Bun compatibility.

**Decision**: Use `bunx nuxi@latest init` for project initialization

**Rationale**:

- Nuxt 4 supports Bun natively as of v4.0.0
- `bunx` is Bun's equivalent to `npx` for running packages
- The `nuxi` CLI handles project scaffolding with all necessary files

**Alternatives Considered**:

- `bun create nuxt` — Less control over version, uses templates
- `npx nuxi@latest init` — Would work but requires Node.js, violates constitution

**Key Configuration**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-01-12',
  // Bun is auto-detected, no explicit config needed
})
```

---

### 2. Nuxt UI v4.3.0 Integration

**Context**: Need UI component library that integrates with Tailwind CSS v4.

**Decision**: Install `@nuxt/ui` as the UI layer

**Rationale**:

- Nuxt UI v4.3.0 uses Tailwind CSS v4 and Tailwind Variants
- Built on Reka UI for accessibility (ARIA compliant)
- Auto-imports components and composables
- Constitution mandates Nuxt UI as the exclusive UI library

**Installation**:

```bash
bun add -D @nuxt/ui
```

**Configuration**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
})
```

**CSS Entry Point** (`assets/css/main.css`):

```css
@import 'tailwindcss';
@import '@nuxt/ui';
```

---

### 3. i18n Configuration with RTL Support

**Context**: Need English (default, LTR) and Arabic (RTL) with lazy-loaded translations.

**Decision**: Use `@nuxtjs/i18n` with `prefix_except_default` strategy

**Rationale**:

- `prefix_except_default` keeps English URLs clean (no `/en` prefix)
- Arabic gets `/ar` prefix for explicit language switching
- Lazy loading reduces initial bundle size
- Built-in RTL direction support via `dir` property

**Installation**:

```bash
bun add -D @nuxtjs/i18n
```

**Configuration**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
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
})
```

**Translation File Structure**:

```json
// locales/en.json
{
  "site": {
    "title": "Majed Sief Alnasr - Portfolio",
    "description": "Portfolio showcasing work and insights"
  }
}

// locales/ar.json
{
  "site": {
    "title": "ماجد سيف النصر - معرض الأعمال",
    "description": "معرض يعرض الأعمال والرؤى"
  }
}
```

---

### 4. SEO Module Configuration

**Context**: Need global SEO defaults, sitemap generation, and OpenGraph support.

**Decision**: Use `@nuxtjs/seo` for comprehensive SEO toolkit

**Rationale**:

- Single module bundles sitemap, meta tags, OpenGraph, robots.txt
- Integrates with `site` config for consistent site name
- Auto-generates sitemap at `/sitemap.xml`
- Constitution requires `nuxt-seo` for sitemap generation

**Installation**:

```bash
bun add -D @nuxtjs/seo
```

**Configuration**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/seo'],
  site: {
    url: 'https://majedsiefalnasr.dev', // Production URL
    name: 'Majed Sief Alnasr - Portfolio',
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

---

### 5. Nuxt Content v3 Setup

**Context**: Need markdown content management for blog posts and case studies.

**Decision**: Use `@nuxt/content` for file-based content

**Rationale**:

- File-based content with markdown/MDX support
- Auto-generates routes from `/content` directory
- Integrates with Nuxt Image for optimized images in content
- Constitution mandates Nuxt Content for all blog/case study content

**Installation**:

```bash
bun add -D @nuxt/content
```

**Configuration**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
})
```

---

### 6. Nuxt Image Configuration

**Context**: Need optimized images with Lighthouse performance requirements.

**Decision**: Use `@nuxt/image` for automatic image optimization

**Rationale**:

- Provides `<NuxtImg>` and `<NuxtPicture>` components
- Auto-optimizes images at build time
- Constitution prohibits raw `<img>` tags
- Required for Lighthouse Performance ≥ 95

**Installation**:

```bash
bun add -D @nuxt/image
```

**Configuration**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
})
```

---

### 7. Module Load Order

**Context**: Need to ensure modules load in correct order without conflicts.

**Decision**: Load modules in this order: `@nuxt/ui`, `@nuxt/content`, `@nuxt/image`, `@nuxtjs/i18n`, `@nuxtjs/seo`

**Rationale**:

- `@nuxt/ui` first to establish styling foundation
- `@nuxt/content` and `@nuxt/image` before i18n for content localization
- `@nuxtjs/i18n` before SEO for localized meta tags
- `@nuxtjs/seo` last to generate sitemap with all routes

---

## Summary

All NEEDS CLARIFICATION items resolved. The technical approach is validated against Nuxt 4 documentation and module-specific best practices. Ready for Phase 1 design.
