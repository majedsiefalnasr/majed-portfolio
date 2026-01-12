# Contracts: Global Setup & Configuration

**Feature**: 001-global-setup  
**Date**: 2026-01-12

## Overview

This feature focuses on project initialization and configuration. There are no API endpoints or contracts to define.

## Configuration Contracts

The following configuration structures serve as implicit contracts:

### nuxt.config.ts Schema

```typescript
interface NuxtConfig {
  compatibilityDate: string // ISO date string
  modules: string[]
  css: string[]
  site: {
    url: string
    name: string
  }
  i18n: I18nConfig
  seo: SeoConfig
}

interface I18nConfig {
  defaultLocale: 'en' | 'ar'
  strategy: 'prefix_except_default'
  lazy: boolean
  langDir: string
  locales: LocaleConfig[]
  detectBrowserLanguage: {
    useCookie: boolean
    cookieKey: string
    redirectOn: 'root'
  }
}

interface LocaleConfig {
  code: string
  language: string
  dir: 'ltr' | 'rtl'
  file: string
  name: string
}

interface SeoConfig {
  meta: {
    description: string
    ogImage: string
    twitterCard: 'summary' | 'summary_large_image'
  }
}
```

### Translation File Schema

```typescript
interface TranslationSchema {
  site: {
    title: string
    description: string
  }
}
```

## Future Contracts

API contracts will be added in features that introduce:

- Backend services
- External API integrations
- Dynamic data fetching
