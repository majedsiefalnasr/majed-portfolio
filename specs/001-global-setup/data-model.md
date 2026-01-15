# Data Model: Global Setup & Configuration

**Feature**: 001-global-setup  
**Date**: 2026-01-12  
**Status**: Complete

## Overview

This feature focuses on project initialization and configuration rather than domain entities. The data model defines configuration structures and i18n entities.

## Entities

### 1. Locale Configuration

Represents a supported language in the application.

| Field      | Type             | Required | Description                                 |
| ---------- | ---------------- | -------- | ------------------------------------------- |
| `code`     | string           | ✅       | ISO 639-1 language code (e.g., `en`, `ar`)  |
| `language` | string           | ✅       | Full ISO locale (e.g., `en-US`, `ar-EG`)    |
| `dir`      | `'ltr' \| 'rtl'` | ✅       | Text direction                              |
| `file`     | string           | ✅       | Translation file path relative to `langDir` |
| `name`     | string           | ✅       | Human-readable language name                |

**Instances**:

| Code | Language | Direction | File      | Name    |
| ---- | -------- | --------- | --------- | ------- |
| `en` | `en-US`  | `ltr`     | `en.json` | English |
| `ar` | `ar-EG`  | `rtl`     | `ar.json` | العربية |

---

### 2. Translation File

JSON files containing key-value pairs for UI text.

**Location**: `/locales/{code}.json`

**Structure**:

```typescript
interface TranslationFile {
  site: {
    title: string
    description: string
  }
  // Future keys added as needed
}
```

**Validation Rules**:

- All keys in `en.json` MUST exist in `ar.json` (fallback behavior)
- Keys are dot-notation paths (e.g., `site.title`)
- Values are plain strings (no HTML)

---

### 3. Site Configuration

Global site metadata for SEO and branding.

| Field  | Type   | Value                           | Description             |
| ------ | ------ | ------------------------------- | ----------------------- |
| `url`  | string | `https://majedsiefalnasr.dev`   | Production site URL     |
| `name` | string | `Majed Sief Alnasr - Portfolio` | Site name for meta tags |

---

### 4. SEO Meta Configuration

Default meta tags applied to all pages.

| Field         | Type   | Value                 | Description          |
| ------------- | ------ | --------------------- | -------------------- |
| `description` | string | (from translations)   | Page description     |
| `ogImage`     | string | `/og-image.png`       | OpenGraph image path |
| `twitterCard` | string | `summary_large_image` | Twitter card type    |

---

## Relationships

```
┌─────────────────────┐
│  nuxt.config.ts     │
└─────────┬───────────┘
          │
          ├──► Site Configuration
          │
          ├──► SEO Meta Configuration
          │
          └──► i18n Configuration
                    │
                    ├──► Locale: en
                    │         │
                    │         └──► locales/en.json
                    │
                    └──► Locale: ar
                              │
                              └──► locales/ar.json
```

---

## State Transitions

### Locale Switching

```
┌─────────┐   navigate to /ar   ┌─────────┐
│  en     │ ─────────────────► │  ar     │
│  (LTR)  │                     │  (RTL)  │
└─────────┘ ◄───────────────── └─────────┘
             navigate to /
```

**Behavior**:

- Root URL (`/`) → English (default, no prefix)
- `/ar/*` → Arabic with RTL direction
- `dir` attribute on `<html>` updates automatically
- Translation file lazy-loaded on locale switch

---

## Validation Rules

| Entity           | Rule                        | Error Behavior   |
| ---------------- | --------------------------- | ---------------- |
| Locale           | Must have valid `dir` value | Build error      |
| Translation File | Must be valid JSON          | Build error      |
| Missing Key      | Key not in locale file      | Fallback to `en` |
| Site URL         | Must be valid URL           | Warning only     |
