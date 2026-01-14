# Quickstart Guide: Content Engine

**Date**: January 13, 2026  
**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

This guide helps developers and content creators get started with creating and managing blog posts and case studies using Nuxt Content with MDC.

---

## Table of Contents

1. [Creating a Blog Post](#creating-a-blog-post)
2. [Creating a Case Study](#creating-a-case-study)
3. [Using MDC Components](#using-mdc-components)
4. [Adding Images](#adding-images)
5. [Tag Management](#tag-management)
6. [Draft Workflow](#draft-workflow)
7. [Translations](#translations)
8. [Testing Content Locally](#testing-content-locally)

---

## Creating a Blog Post

### Step 1: Create the File

Blog posts live in year-based directories:

```bash
# Create a new blog post for 2026
touch content/blog/2026/my-first-post.md
```

### Step 2: Add Frontmatter

Open the file and add YAML frontmatter at the top:

```markdown
---
title: 'My First Blog Post'
date: 2026-01-13
author: 'Majed Sief Alnasr'
tags: ['typescript', 'nuxt', 'web-dev']
excerpt: 'A brief summary of what this post is about. This will appear in list views and meta descriptions.'
featuredImage: '/images/blog/2026/my-first-post-hero.jpg'
lang: 'en'
---
```

**Required fields**: `title`, `date`  
**Optional fields**: `author`, `tags`, `excerpt`, `featuredImage`, `updatedAt`, `lang`

### Step 3: Write Content

Add your content below the frontmatter using markdown:

````markdown
## Introduction

This is my first blog post using Nuxt Content!

### Key Points

- Point one
- Point two
- Point three

## Code Example

```typescript
const greeting = (name: string) => {
  console.log(`Hello, ${name}!`)
}
```
````

## Conclusion

That's all for now!

````

### Step 4: Preview

Start the dev server and navigate to `/blog/my-first-post`:

```bash
bun run dev
````

---

## Creating a Case Study

### Step 1: Create the File

Case studies also use year-based directories:

```bash
touch content/case-studies/2026/ecommerce-redesign.md
```

### Step 2: Add Frontmatter

```markdown
---
title: 'E-Commerce Platform Redesign'
client: 'TechCorp Inc.'
date: 2026-01-10
role: 'Lead Frontend Developer'
timeline: '6 months (Jul 2025 - Dec 2025)'
tags: ['vue', 'nuxt', 'tailwind', 'stripe', 'vercel']
excerpt: 'Complete redesign of enterprise e-commerce platform with 40% performance improvement.'
featuredImage: '/images/case-studies/2026/ecommerce-hero.jpg'
testimonial:
  quote: 'The new platform exceeded our expectations.'
  author: 'Jane Smith'
  position: 'CTO, TechCorp Inc.'
metrics:
  - label: 'Performance'
    value: '+40%'
  - label: 'Conversion'
    value: '+25%'
  - label: 'Lighthouse'
    value: '98/100'
featured: true
order: 1
lang: 'en'
---
```

**Required fields**: `title`, `client`, `date`, `role`, `timeline`, `tags`, `featuredImage`  
**Optional fields**: `excerpt`, `testimonial`, `metrics`, `featured`, `order`, `lang`

### Step 3: Write Structured Content

Use recommended sections:

````markdown
## Problem

TechCorp's legacy platform was slow and had poor mobile experience...

## Solution

We rebuilt the frontend using Nuxt 4 with a focus on performance...

## Implementation

### Architecture Decisions

- Static generation for product pages
- Incremental Static Regeneration for inventory
- Edge caching for global performance

::CodeComparison{language="vue"}
#before

```vue
<!-- Old approach -->
<img :src="product.image" />
```
````

#after

```vue
<!-- New approach with optimization -->
<NuxtImg :src="product.image" format="webp" />
```

::

## Results

The redesign achieved remarkable improvements:

::CaseStudyMetrics{:metrics="metrics"}
::

## Gallery

## ::ImageGallery

images:

- src: "/images/case-studies/2026/ecom-screenshot-1.jpg"
  alt: "Homepage redesign"
  caption: "New homepage with improved hero section"
- src: "/images/case-studies/2026/ecom-screenshot-2.jpg"
  alt: "Product page"
  caption: "Optimized product detail page"

---

::

````

---

## Using MDC Components

MDC (Markdown Components) allows you to embed Vue components in markdown.

### Basic Component

```markdown
::ComponentName
Component content goes here
::
````

### Component with Props

```markdown
::ComponentName{prop1="value1" prop2="value2"}
::
```

### Component with YAML Props

```markdown
## ::ComponentName

complexProp:

- item1
- item2
  anotherProp: "value"

---

::
```

### Component with Slots

```markdown
::ComponentName
#slotName
Slot content
::
```

### Available MDC Components

#### ContentImage

```markdown
::ContentImage{src="/images/blog/2026/example.jpg" alt="Example diagram" caption="Figure 1: Architecture overview"}
::
```

#### CodeBlock (with copy button)

````markdown
::CodeBlock{language="typescript" filename="app.ts" :highlights="[3, 4, 5]"}

```typescript
const app = createApp()
app.mount('#app')
```
````

::

````

#### CodeComparison (before/after)

```markdown
::CodeComparison{language="javascript"}
#before
```javascript
var x = 1
````

#after

```typescript
const x: number = 1
```

::

````

#### ImageGallery

```markdown
::ImageGallery
---
images:
  - src: "/images/example1.jpg"
    alt: "Example 1"
  - src: "/images/example2.jpg"
    alt: "Example 2"
columns: 3
gap: "md"
---
::
````

---

## Adding Images

### Step 1: Organize Images

Store images in year-based directories matching content:

```
public/
└── images/
    ├── blog/
    │   └── 2026/
    │       ├── my-first-post-hero.jpg
    │       └── my-first-post-diagram.jpg
    └── case-studies/
        └── 2026/
            ├── ecommerce-hero.jpg
            └── ecommerce-screenshot-1.jpg
```

### Step 2: Reference in Frontmatter

```yaml
featuredImage: '/images/blog/2026/my-first-post-hero.jpg'
```

### Step 3: Use in Content

**Standard Markdown** (auto-optimized):

```markdown
![Diagram description](/images/blog/2026/diagram.jpg)
```

**MDC Component** (enhanced features):

```markdown
::ContentImage{src="/images/blog/2026/diagram.jpg" alt="Architecture diagram" caption="Figure 1: System architecture"}
::
```

### Image Best Practices

- ✅ Use descriptive filenames: `ecommerce-hero.jpg` not `IMG_1234.jpg`
- ✅ Provide alt text for accessibility
- ✅ Keep images under 2MB (will be optimized automatically)
- ✅ Use high-quality source images (optimization handles sizing)
- ✅ Prefer JPG for photos, PNG for diagrams/screenshots with text

---

## Tag Management

### Choosing Tags

- Use lowercase kebab-case: `web-dev`, `typescript`, `case-study`
- Keep tags 2-20 characters
- Limit to 1-10 tags per post
- Use consistent tags across content for better filtering

### Common Tags

**Blog Posts**:

- Technologies: `typescript`, `vue`, `nuxt`, `tailwind`
- Topics: `web-dev`, `performance`, `accessibility`, `seo`
- Format: `tutorial`, `opinion`, `case-study`

**Case Studies**:

- Technologies used: `vue`, `nuxt`, `aws`, `stripe`
- Industry: `ecommerce`, `saas`, `portfolio`
- Skills: `frontend`, `backend`, `full-stack`

### Adding Tags

```yaml
tags: ['typescript', 'nuxt', 'tutorial']
```

---

## Draft Workflow

### Creating Drafts

Prefix filename with underscore to exclude from public routes:

```bash
# Draft blog post (not published)
content/blog/2026/_draft-upcoming-feature.md

# Draft case study (not published)
content/case-studies/2026/_draft-client-project.md
```

### Publishing Drafts

When ready to publish, remove the underscore:

```bash
# Rename to publish
mv content/blog/2026/_draft-upcoming-feature.md \
   content/blog/2026/upcoming-feature.md
```

### Draft Benefits

- ✅ Drafts stay in version control
- ✅ Can collaborate on drafts via Git
- ✅ Won't appear in public lists or generate routes
- ✅ Return 404 if accessed directly
- ✅ Simple filename convention (no frontmatter flag needed)

---

## Translations

### File-Based Translations

Create translations with `.ar.md` suffix:

```
content/
└── blog/
    └── 2026/
        ├── my-post.md       # English (default)
        └── my-post.ar.md    # Arabic translation
```

### Arabic Translation Example

```markdown
---
title: 'أول منشور لي في المدونة'
date: 2026-01-13
author: 'ماجد سيف النصر'
tags: ['typescript', 'nuxt', 'web-dev']
excerpt: 'ملخص موجز عن موضوع هذا المنشور.'
featuredImage: '/images/blog/2026/my-first-post-hero.jpg'
lang: 'ar'
---

## مقدمة

هذا هو أول منشور لي في المدونة باستخدام Nuxt Content!
```

### Translation Workflow

1. **Create English version first**: `content/blog/2026/post.md`
2. **Create Arabic version with `.ar` suffix**: `content/blog/2026/post.ar.md`
3. **Translate all content** (frontmatter and body)
4. **Set `lang: "ar"` in Arabic frontmatter**
5. **Test RTL rendering**: Visit `/ar/blog/post`

### Important Notes on Translations

**No Language Fallback:**
- Each language displays only its own content
- English blog (`/blog`) shows only `.md` files (without `.ar` suffix)
- Arabic blog (`/ar/blog`) shows only `.ar.md` files
- If a post doesn't exist in a language, it simply won't appear in that locale's list

**Same Slug, Different Files:**
- Use the same base slug for both languages
- Only the file suffix differs: `post.md` vs `post.ar.md`
- This ensures consistent URLs across locales

**Case Studies Work the Same Way:**
- English: `content/case-studies/2026/project-name.md`
- Arabic: `content/case-studies/2026/project-name.ar.md`
- URLs: `/case-studies/project-name` and `/ar/case-studies/project-name`

---

## Testing Content Locally

### Development Server

```bash
# Start dev server
bun run dev

# Visit blog
# http://localhost:3000/blog

# Visit specific post
# http://localhost:3000/blog/my-first-post

# Visit case studies
# http://localhost:3000/case-studies

# Visit in Arabic
# http://localhost:3000/ar/blog
```

### Build Preview

Test static generation locally:

```bash
# Generate static site
bun run generate

# Preview generated site
bun run preview
```

### Content Validation

The build will fail if:

- ❌ Required frontmatter fields are missing
- ❌ Date format is invalid
- ❌ Tags don't match naming convention
- ❌ Featured image path doesn't exist

Watch for build errors:

```
ERROR  Invalid frontmatter in content/blog/2026/my-post.md
       Required field 'title' is missing
```

### Checking Lighthouse Scores

```bash
# Build and generate
bun run generate

# Start preview server
bun run preview

# Run Lighthouse (use Chrome DevTools or CLI)
# Target: Performance ≥95, Accessibility ≥95, SEO ≥95
```

---

## Content Checklist

Before publishing, verify:

- [ ] Required frontmatter fields present
- [ ] Date in ISO8601 format (YYYY-MM-DD)
- [ ] Tags use lowercase kebab-case
- [ ] Excerpt is 50-200 characters
- [ ] Featured image exists and is optimized
- [ ] Alt text provided for all images
- [ ] Code blocks have language specified
- [ ] MDC components render correctly
- [ ] Content builds without errors
- [ ] Preview looks correct in both light/dark mode
- [ ] Arabic translation (if applicable) tested with RTL
- [ ] Links are working
- [ ] No typos or formatting issues

---

## Common Issues & Solutions

### Issue: Post doesn't appear in list

**Cause**: Filename starts with underscore (draft)  
**Solution**: Remove underscore prefix to publish

### Issue: Featured image not loading

**Cause**: Path doesn't match actual file location  
**Solution**: Verify path starts with `/images/` and file exists in `/public/images/`

### Issue: Tags not clickable

**Cause**: Tags not defined in frontmatter array  
**Solution**: Add `tags: ["tag1", "tag2"]` to frontmatter

### Issue: Code not syntax highlighted

**Cause**: Missing language specification  
**Solution**: Add language after triple backticks: ` ```typescript `

### Issue: MDC component not rendering

**Cause**: Component doesn't exist or typo in name  
**Solution**: Check component exists in `components/content/` and name is correct

### Issue: Build fails with validation error

**Cause**: Invalid frontmatter field  
**Solution**: Check error message, fix the specified field in the specified file

---

## Next Steps

- Read [data-model.md](./data-model.md) for complete schema reference
- Review [contracts/](./contracts/) for component and API details
- Check existing blog posts and case studies for examples
- Refer to [Nuxt Content documentation](https://content.nuxt.com) for advanced features

**Happy writing! 🚀**
