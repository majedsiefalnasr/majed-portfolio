---
agent: content-generator
---

# Content Generator Agent Prompt

This prompt activates the interactive content generation agent for creating blog posts and case studies.

## Features

- **Interactive metadata collection** with validation
- **Draft mode** - all new content is created with `_draft-` prefix
- **Duplicate detection** - checks for existing slugs across all content
- **Bilingual support** - create English and Arabic versions
- **Year-based organization** - blog posts organized by year
- **AI-generated content** or metadata-only mode

## Usage

Simply reference this agent and it will guide you through the content creation process:

```
@content-generator create a new blog post
```

The agent will:
1. Ask what type of content (blog post or case study)
2. Ask for generation mode (full content or metadata only)
3. Collect required metadata interactively
4. Check for duplicate slugs
5. Generate content (if full mode selected)
6. Create file(s) with draft prefix

## File Organization

### Blog Posts
- Path: `content/blog/YYYY/_draft-slug.md`
- Year extracted from publication date
- Draft prefix added automatically

### Case Studies
- Path: `content/case-studies/_draft-slug.md`
- No year directory
- Draft prefix added automatically

### Publishing Content

To publish draft content, simply rename the file to remove the `_draft-` prefix:

```bash
# Before (draft)
content/blog/2026/_draft-my-post.md

# After (published)
content/blog/2026/my-post.md
```

## Duplicate Detection

The agent checks for duplicate slugs in:
- All year directories for blog posts
- All content types (blog and case studies)
- Both published and draft versions
- Both English (`.md`) and Arabic (`.ar.md`) files

If a duplicate is found, you'll be prompted to:
1. Use a different title
2. Append a number to the slug (e.g., `-2`, `-3`)
3. Cancel the operation

## Bilingual Content

When creating bilingual content (option 3 for language), the agent:
1. Creates English version first
2. Automatically translates to Arabic
3. Preserves technical terms in English
4. Creates both `.md` and `.ar.md` files with draft prefix

Example:
- `content/blog/2026/_draft-my-post.md`
- `content/blog/2026/_draft-my-post.ar.md`
