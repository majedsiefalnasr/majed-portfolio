# Content Generation Agent - Usage Guide

**Version**: 1.0.0  
**Last Updated**: January 15, 2026

## Overview

The Content Generation Agent is an AI-powered tool integrated with GitHub Copilot Chat that helps you create publication-ready blog posts and case studies for your portfolio. It validates metadata against TypeScript schemas, generates proper frontmatter, and creates structured markdown files in the correct directories.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Blog Post Generation](#blog-post-generation)
- [Case Study Generation](#case-study-generation)
- [Advanced Features](#advanced-features)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## Prerequisites

### Required

- **VS Code**: Version 1.85.0 or higher
- **GitHub Copilot**: Active subscription and extension installed
- **Portfolio Project**: Majed Portfolio open in VS Code workspace
- **Bun Runtime**: For running the portfolio (already configured)

### Verify Setup

1. Check GitHub Copilot is active (green icon in status bar)
2. Ensure agent files exist:
   - `.github/agents/content-generator.agent.md`
   - `.github/prompts/content-generator.prompt.md`
3. Verify utilities exist at `app/utils/content-generator/`

---

## Quick Start

### Step 1: Open GitHub Copilot Chat

Press `Cmd/Ctrl + I` or click the Copilot icon in the Activity Bar.

### Step 2: Invoke the Agent

Type one of the following:

```
@content-generator
```

or

```
@content help me create a blog post
```

### Step 3: Follow the Conversation

The agent will guide you through:

1. Content type selection (blog or case study)
2. Mode selection (full content or metadata only)
3. Template selection (default, tutorial, or custom)
4. Metadata collection (title, date, tags, etc.)
5. Content generation (if full mode)
6. Preview and approval
7. File creation

---

## Blog Post Generation

### Full Blog Post Workflow

#### 1. Initiate Generation

**You**:

```
@content-generator I want to write a blog post about TypeScript best practices
```

**Agent Response**:

```
Great! Let me help you create a blog post.

Would you like to:
1. Generate full content (AI-written article)
2. Generate metadata only (you write the content)

Choose 1 or 2.
```

#### 2. Select Mode

**You**: `1` (for full content)

**Agent**: Asks which template (Default or Tutorial)

**You**: `1` (for default template)

#### 3. Answer Metadata Questions

The agent asks in sequence:

| Question  | Example Answer                                                 | Notes                            |
| --------- | -------------------------------------------------------------- | -------------------------------- |
| Title?    | "TypeScript Best Practices for 2026"                           | 3-100 characters                 |
| Date?     | _Press Enter_                                                  | Uses today's date                |
| Author?   | _Press Enter_                                                  | Uses default "Majed Sief Alnasr" |
| Tags?     | "typescript, best-practices, javascript"                       | Comma-separated, min 1           |
| Excerpt?  | "Essential TypeScript practices every developer should follow" | Max 200 chars, SEO optimized     |
| Language? | _Press Enter_ for English, or `2` for Arabic, or `3` for both  |                                  |

#### 4. Content Generation Settings (Full Mode Only)

| Question        | Options                                                 | Recommendation                 |
| --------------- | ------------------------------------------------------- | ------------------------------ |
| Content length? | Short / Medium / Long                                   | Medium for most posts          |
| Writing tone?   | Professional / Conversational / Technical / Educational | Technical for code-heavy posts |

#### 5. Wait for Generation

```
✅ Validating metadata...
✅ All fields valid!

🤖 Generating content...
This may take 30-60 seconds...

✅ Content generated successfully!
```

#### 6. Preview and Approve

```
📄 Preview

File: content/blog/2026/typescript-best-practices-for-2026.md
Reading time: 5 min

--- FRONTMATTER ---
title: 'TypeScript Best Practices for 2026'
date: 2026-01-15
...

--- CONTENT ---
## Introduction
TypeScript has become an essential tool...

What would you like to do?
1. Approve and save file
2. Refine specific sections
3. Regenerate entire content
4. Cancel
```

**Options**:

- **Option 1** - Approve: Saves the file to disk
- **Option 2** - Refine: Modify specific sections (see [Refinement](#content-refinement))
- **Option 3** - Regenerate: Create new content with same metadata
- **Option 4** - Cancel: Exit without saving

#### 7. Success

```
✅ Blog post created successfully!

📂 File: content/blog/2026/typescript-best-practices-for-2026.md
📝 Word count: ~1200
⏱️  Reading time: 5 min

Next steps:
1. Review content in VS Code
2. Preview in browser: bun dev → http://localhost:3000/blog/typescript-best-practices-for-2026
3. Commit to repository
```

### Metadata-Only Mode

Perfect for when you want to write the content yourself but need proper frontmatter structure.

**You**: Choose option `2` (metadata only)

**Agent**: Skips content generation questions (length, tone)

**Output**: Markdown file with frontmatter and placeholder content:

```markdown
---
title: 'Your Title'
date: 2026-01-15
tags: ['tag1', 'tag2']
...
---

## Write your content here...

Use the following structure:

### Introduction

[Your introduction]

### Main Content

[Your main content]

### Conclusion

[Your conclusion]
```

---

## Case Study Generation

Case studies follow a similar workflow but with different metadata questions.

### Metadata Questions

| Question                    | Example                                      | Required    | Notes                         |
| --------------------------- | -------------------------------------------- | ----------- | ----------------------------- |
| Title                       | "AI-Powered Dashboard Platform"              | ✅          | 3-100 chars                   |
| Client                      | "TechCorp Inc."                              | ✅          | Company or "Internal Project" |
| Date                        | "2026-01-10"                                 | ✅          | Project completion date       |
| Role                        | "Lead Full Stack Developer"                  | ✅          | Your role                     |
| Timeline                    | "3 months"                                   | ✅          | Duration or date range        |
| Tags                        | "nuxt, vue, typescript, ai"                  | ✅          | Technologies used             |
| Excerpt                     | "Built an AI dashboard..."                   | ❌          | SEO description               |
| Featured Image              | "/images/case-studies/2026/ai-dashboard.jpg" | ✅          | Path to hero image            |
| Featured on homepage?       | "yes" or "no"                                | ❌          | Default: no                   |
| Display order (if featured) | "1"                                          | Conditional | Lower = first                 |
| Language                    | "en", "ar", or "both"                        | ❌          | Default: en                   |

### Additional Questions (Full Mode)

#### Testimonial (Optional)

```
Include client testimonial? (yes/no)
```

If yes:

- Quote: The testimonial text
- Author: Client's name
- Position: Their title/role

#### Metrics (Optional)

```
Include project metrics? (yes/no)
```

If yes, loop for multiple metrics:

- Label: "Performance improvement"
- Value: "50% faster"
- Add another? yes/no

#### Context Questions

For AI content generation:

- Problem: "Describe the challenge (2-3 sentences)"
- Solution: "Describe your approach (2-3 sentences)"
- Results: "Describe outcomes (2-3 sentences)"

### Case Study Output

File saved to: `content/case-studies/ai-powered-dashboard.md` (no year directory)

Structure includes:

- Overview section
- Challenge section
- Solution section
- Results section
- Technologies Used section
- Testimonial (if provided)
- Metrics (if provided)

---

## Advanced Features

### Content Refinement

After viewing the preview, you can refine specific sections without regenerating everything.

**You**: Choose option `2` (Refine)

**Agent**:

```
Which section would you like to refine?

1. Introduction
2. Main Content
3. Conclusion
4. All sections (specify modification)

Or describe what you'd like to change:
- "make it more technical"
- "add code examples"
- "make it more concise"
```

**You**: `2` (Main Content)

**Agent**: "What changes would you like?"

**You**: "Add more code examples and make it more technical"

**Agent**: Regenerates only the Main Content section with your requirements

**Refinement Limits**:

- Maximum 5 refinements per session
- After 5, you must approve, regenerate entirely, or cancel
- Refinement count resets if you choose "Regenerate entire content"

### Bilingual Content

Generate content in both English and Arabic with a single command.

**Step**: When asked for language, choose option `3` (Both)

**Process**:

1. Agent generates English version first
2. Validates English metadata and content
3. Translates metadata (title, excerpt, tags)
4. Translates content body
5. Creates both files:
   - `slug.md` (English)
   - `slug.ar.md` (Arabic)

**Translation Rules**:

- Technical terms stay in English
- Markdown structure preserved
- RTL text direction for Arabic
- Code blocks remain untranslated

**Output**:

```
✅ Bilingual content created successfully!

📂 English: content/blog/2026/typescript-best-practices.md
📂 Arabic: content/blog/2026/typescript-best-practices.ar.md

Preview URLs:
- English: http://localhost:3000/blog/typescript-best-practices
- Arabic: http://localhost:3000/ar/blog/typescript-best-practices
```

### Custom Templates

Use custom templates for specialized content structures.

#### Using Tutorial Template

**Agent**: "Which template?"

**You**: `2` (Tutorial)

**Sections**:

- Prerequisites
- Tutorial Steps
- Troubleshooting
- Summary

Perfect for step-by-step guides.

#### Creating Custom Template

1. Create a JSON file following the template schema:

```json
{
  "id": "blog-review",
  "name": "Product Review",
  "description": "Template for reviewing tools/frameworks",
  "contentType": "blog",
  "sections": [
    {
      "id": "overview",
      "name": "Overview",
      "required": true,
      "wordCount": {"min": 150, "max": 300}
    },
    {
      "id": "pros",
      "name": "Pros",
      "required": true
    },
    {
      "id": "cons",
      "name": "Cons",
      "required": true
    },
    {
      "id": "verdict",
      "name": "Verdict",
      "required": true
    }
  ]
}
```

2. Save to `app/utils/content-generator/templates/blog-review.ts`

3. When agent asks for template, choose option `3` (Custom)

4. Provide file path when prompted

---

## Troubleshooting

### Agent Not Responding

**Problem**: No response after typing `@content-generator`

**Solutions**:

1. Check GitHub Copilot status icon (should be green)
2. Reload VS Code window: `Cmd/Ctrl + R`
3. Ensure agent files exist in `.github/agents/`
4. Check Copilot subscription is active

### Validation Errors

**Problem**: "Validation failed" with error messages

**Common Errors & Fixes**:

| Error                                 | Fix                    |
| ------------------------------------- | ---------------------- |
| "Title must be at least 3 characters" | Provide longer title   |
| "Date must be YYYY-MM-DD format"      | Use format: 2026-01-15 |
| "At least one tag is required"        | Provide at least 1 tag |
| "Excerpt too long (max 200 chars)"    | Shorten excerpt        |

**What the Agent Does**:

- Shows specific field errors
- Re-prompts for ONLY invalid fields
- Preserves your other answers

### File Conflicts

**Problem**: "File already exists" warning

**Options**:

1. **Rename** - Creates `slug-v2.md`, `slug-v3.md`, etc.
2. **Overwrite** - Replaces existing file (⚠️ destructive)
3. **Cancel** - Exit without saving

**Recommendation**: Choose "Rename" to keep both versions

### Low Quality Content

**Problem**: Generated content doesn't meet expectations

**Solutions**:

1. Use "Refine" instead of regenerating entirely
2. Provide more detailed context in your answers
3. Adjust tone/length settings
4. Try "Regenerate" for completely different content
5. Use metadata-only mode and write content manually

### Generation Timeout

**Problem**: Content generation takes too long or fails

**Causes**:

- Network connectivity issues
- Copilot API rate limits
- Very long content requests

**Solutions**:

1. Try again with shorter content length
2. Check internet connection
3. Wait a few minutes and retry
4. Switch to metadata-only mode

---

## Best Practices

### Writing Effective Titles

✅ **Good**:

- "Building Type-Safe APIs with TypeScript and Zod"
- "Optimizing Nuxt 3 Performance: A Complete Guide"

❌ **Avoid**:

- "APIs" (too vague)
- "This is an extremely long title that goes on and on and exceeds the character limit"

### Choosing Tags

**Guidelines**:

- 3-5 tags is optimal for SEO
- Use lowercase
- Include both broad and specific terms
- Mix technologies and concepts

**Example**:

```
typescript, api, zod, validation, best-practices
```

### Writing Excerpts

**Formula**: Problem + Solution (in 150-160 chars)

**Example**:

```
Learn how to build type-safe APIs using TypeScript and Zod validation.
Includes real-world examples and best practices.
```

(156 characters - perfect for SEO)

### Content Length Selection

| Length | Word Count | When to Use                              |
| ------ | ---------- | ---------------------------------------- |
| Short  | 500-800    | Quick tips, updates, announcements       |
| Medium | 1000-1500  | Most blog posts, tutorials               |
| Long   | 2000+      | In-depth guides, comprehensive tutorials |

### Tone Selection

| Tone           | Best For                               | Example Use Case                    |
| -------------- | -------------------------------------- | ----------------------------------- |
| Professional   | Business blogs, architecture decisions | "Microservices Migration Strategy"  |
| Conversational | Personal blogs, opinion pieces         | "My Journey Learning Rust"          |
| Technical      | Developer tutorials, API docs          | "Implementing OAuth 2.0 in Node.js" |
| Educational    | Beginner guides, explainers            | "Understanding React Hooks"         |

### Refinement Strategy

Instead of regenerating entirely:

1. **First preview**: Assess overall structure
2. **Refine 1-2 sections**: Fix weak areas
3. **Final review**: Manual edits for polish

This is faster and preserves good sections.

### Template Selection

| Template           | Use For                                          |
| ------------------ | ------------------------------------------------ |
| Default Blog       | Standard technical posts, opinion pieces         |
| Tutorial           | Step-by-step guides, how-tos                     |
| Default Case Study | Project showcases                                |
| Custom             | Specialized formats (reviews, comparisons, etc.) |

---

## Examples

### Example 1: Quick Blog Post

```
@content-generator blog post about Nuxt 3 features

→ Mode: Metadata only
→ Title: "New Features in Nuxt 3"
→ Tags: nuxt, vue, javascript
→ Write content manually
```

### Example 2: Comprehensive Tutorial

```
@content-generator create a tutorial on testing Vue components

→ Mode: Full content
→ Template: Tutorial
→ Title: "Complete Guide to Testing Vue 3 Components"
→ Length: Long
→ Tone: Educational
→ Refine: Add more test examples
```

### Example 3: Bilingual Case Study

```
@content-generator case study for recent project

→ Mode: Full content
→ Language: Both (English and Arabic)
→ Include testimonial: Yes
→ Include metrics: Yes
→ Featured: Yes
```

---

## Support

### Getting Help

1. **Documentation**: Re-read this guide
2. **Agent Help**: Ask `@content-generator how do I...?`
3. **Spec Reference**: See `specs/004-content-generation-agent/`
4. **Code Reference**: Check `app/utils/content-generator/`

### Reporting Issues

If you encounter bugs or have suggestions:

1. Check troubleshooting section first
2. Verify all prerequisites are met
3. Note the exact error message
4. Document steps to reproduce
5. Open an issue in the repository

---

## Version History

### v1.0.0 (January 15, 2026)

**Features**:

- ✅ Blog post generation (full and metadata-only)
- ✅ Case study generation
- ✅ Metadata validation with Zod schemas
- ✅ Content refinement workflow
- ✅ Bilingual content support (English/Arabic)
- ✅ Template system (default, tutorial, custom)
- ✅ File conflict detection and resolution
- ✅ Reading time calculation
- ✅ SEO optimization (excerpt length, tag count)

**Future Enhancements** (Planned):

- Image generation integration
- Markdown content parsing from URLs
- Batch content generation
- Content analytics integration
- More predefined templates

---

## Quick Reference Card

```
INVOKE AGENT:
  @content-generator [optional topic]

CONTENT TYPES:
  1. Blog post     → content/blog/YYYY/slug.md
  2. Case study    → content/case-studies/slug.md

MODES:
  1. Full content  → AI generates everything
  2. Metadata only → You write content

LANGUAGES:
  1. English only  → slug.md
  2. Arabic only   → slug.ar.md
  3. Both          → slug.md + slug.ar.md

TEMPLATES (Blog):
  1. Default       → Intro, Main, Conclusion
  2. Tutorial      → Prerequisites, Steps, Troubleshooting, Summary

PREVIEW OPTIONS:
  1. Approve       → Save file
  2. Refine        → Modify sections (max 5 times)
  3. Regenerate    → New content, same metadata
  4. Cancel        → Exit without saving

FILE CONFLICT:
  1. Rename        → slug-v2.md (recommended)
  2. Overwrite     → Replace existing (⚠️)
  3. Cancel        → Exit
```

---

**Happy Content Creating! 🎨✨**
