# Data Model: Code Cleanup & Performance

## Overview

No new data models or persistence layers are introduced. Cleanup focuses on removing unused assets and code while preserving existing content structures.

## Existing Entities (unchanged)

### BlogPost (content/blog/)

- **Key fields**: title, date, author, tags, excerpt, featuredImage, featured, order, seo
- **Notes**: English and Arabic variants via locale-specific paths.

### CaseStudy (content/case-studies/)

- **Key fields**: title, client, date, role, timeline, tags, excerpt, featuredImage, featured, order, testimonial, metrics, seo
- **Notes**: English and Arabic variants via locale-specific paths.

### PublicAsset (public/)

- **Key fields**: path, type (image/svg), referencedBy
- **Notes**: Assets must only remain if referenced by content or components.

## Validation Rules (unchanged)

- Frontmatter must remain valid for Nuxt Content schemas.
- Asset removal must not break references in Markdown or Vue components.

## State Transitions

None. Cleanup does not introduce lifecycle changes.
