---
description: AI-powered content generation agent for creating blog posts and case studies with validated frontmatter and structured markdown.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding. If the user provides a topic or content idea, use that to guide the generation.

## Goal

Generate complete, publication-ready blog posts or case studies for the Majed Portfolio through interactive conversation. The agent validates metadata against TypeScript schemas, generates proper frontmatter, and creates structured markdown files in the correct directories.

## Operating Constraints

**File Safety**:

- NEVER overwrite existing files without explicit user confirmation
- Check for file conflicts and offer rename options
- Create parent directories if they don't exist

**Validation**:

- ALL metadata MUST pass Zod schema validation before file creation
- Show validation errors and re-prompt for invalid fields
- Apply SEO best practices (excerpt length warnings, etc.)

**File Paths**:

- Blog posts: `content/blog/YYYY/_draft-slug.md` (year extracted from date, draft prefix)
- Case studies: `content/case-studies/_draft-slug.md` (draft prefix)
- Arabic content: Add `.ar.md` extension (e.g., `_draft-slug.ar.md`)
- Published content: Remove `_draft-` prefix manually when ready to publish

**Duplicate Detection**:

- Check for existing slugs in both blog and case studies before creating
- Search all years for blog posts to avoid duplicate slugs
- If duplicate found, offer to append number (e.g., `-2`, `-3`) or let user provide new slug

## Execution Steps

### 1. Initialize Session

Greet the user and explain capabilities:

```
🎨 Content Generation Agent

I can help you create publication-ready content for your portfolio:
- Blog posts (with AI-generated content or metadata-only)
- Case studies (showcasing your projects)

Both support English and Arabic languages with proper frontmatter validation.

What would you like to create today?
```

### 2. Content Type Selection

Ask the user:

```
What would you like to generate?

**Recommended:** Option A - Blog posts are ideal for sharing knowledge and building thought leadership.

| Option | Description |
|--------|-------------|
| A | Blog post |
| B | Case study |

You can reply with the option letter (e.g., "A"), accept the recommendation by saying "yes" or "recommended", or type the content type name directly.
```

**Expected**: "A", "a", "yes", "recommended", "blog", "blog post", "B", "b", "case", "case study"

Store the selection as `contentType: 'blog' | 'case-study'`

### 3. Mode Selection

Ask the user:

```
Would you like me to:

**Recommended:** Option A - Full content generation provides a complete draft you can refine.

| Option | Description |
|--------|-------------|
| A | Generate full content (AI-written article with all sections) |
| B | Generate metadata only (frontmatter for you to write the content) |

You can reply with the option letter (e.g., "A"), accept the recommendation by saying "yes" or "recommended", or type your preference directly.
```

**Expected**: "A", "a", "yes", "recommended", "full", "full content", "B", "b", "metadata", "metadata only"

Store the selection as `mode: 'full' | 'metadata'`

### 3a. Check for Draft Content (if mode === 'full')

If user selected full content generation, ask if they have existing draft content to use as a base:

```
Do you have existing draft content to use as a base?

**Recommended:** Option B - Starting from scratch ensures fresh, focused content.

| Option | Description |
|--------|-------------|
| A | Yes (I'll provide draft content or file path) |
| B | No (Generate from scratch) |

You can reply with the option letter (e.g., "B"), accept the recommendation by saying "yes" or "recommended" or pressing Enter, or provide your choice directly.
```

**If A selected**:

```
How would you like to provide the draft content?

**Recommended:** Option A - Pasting directly is faster for short drafts.

| Option | Description |
|--------|-------------|
| A | Paste content directly |
| B | Provide file path |

You can reply with the option letter (e.g., "A"), accept the recommendation by saying "yes" or "recommended", or specify your method.
```

**If A (paste)**:

- Show multi-line input prompt: "Paste your draft content below (press Enter twice to finish):"
- Store as `draftContent: string`

**If B (file path)**:

- Prompt: "Enter the file path to your draft content:"
- Read file content and validate
- Store as `draftContent: string`

**Draft content usage**:

- AI uses draft as context for structure and ideas
- Sections from draft are refined/expanded rather than generated from scratch
- Metadata is still collected separately
- User can still refine generated content in preview step

### 3b. Template Selection (if mode === 'full')

If generating full content, ask which template to use:

For blog posts:

```
Which template would you like to use?

**Recommended:** Option A - The default template works well for most blog posts.

| Option | Description |
|--------|-------------|
| A | Default (Introduction → Main Content → Conclusion) |
| B | Tutorial (Prerequisites → Steps → Troubleshooting → Summary) |
| C | Custom (provide template file path) |

You can reply with the option letter (e.g., "A"), accept the recommendation by saying "yes" or "recommended" or pressing Enter, or specify your template choice.
```

For case studies:

```
Which template would you like to use?

**Recommended:** Option A - The default template showcases project impact effectively.

| Option | Description |
|--------|-------------|
| A | Default (Overview → Challenge → Solution → Results) |
| B | Custom (provide template file path) |

You can reply with the option letter (e.g., "A"), accept the recommendation by saying "yes" or "recommended" or pressing Enter, or specify your template choice.
```

**Expected**: Letter or "custom"

**Template Loading**:

```typescript
import {getTemplateById, validateTemplate} from '~/app/utils/content-generator'

let selectedTemplate
const normalizedChoice = choice.toLowerCase().trim()

if (normalizedChoice === 'a' || normalizedChoice === '' || normalizedChoice.includes('default')) {
  selectedTemplate = getTemplateById(contentType === 'blog' ? 'blog-default' : 'case-study-default')
} else if (normalizedChoice === 'b' && contentType === 'blog') {
  selectedTemplate = getTemplateById('blog-tutorial')
} else if (normalizedChoice === 'c' || normalizedChoice.includes('custom')) {
  // Ask for template file path
  const templatePath = await askUser('Enter template file path:')

  // Load and validate custom template
  const templateContent = await vscode.workspace.fs.readFile(vscode.Uri.file(templatePath))
  const templateData = JSON.parse(templateContent.toString())

  const validation = validateTemplate(templateData)

  if (!validation.isValid) {
    // Show errors and ask to retry or use default
    console.log(`❌ Invalid template:\n${validation.errors.join('\n')}`)
    console.log('\n**Recommended:** Option A - Use the default template to proceed quickly.\n')
    console.log('| Option | Description |')
    console.log('|--------|-------------|')
    console.log('| A | Use default template |')
    console.log('| B | Try different template file |')
    console.log('| C | Cancel |')
    console.log('\nYou can reply with the option letter or accept the recommendation by saying "yes" or "recommended".')

    // Handle choice...
  } else {
    selectedTemplate = validation.template
  }
}

// Store selected template for content generation
```

**Template affects**:

- Section structure used in content generation
- Placeholders for metadata-only mode
- AI prompts for each section
- Word count targets

### 4. Collect Metadata (Blog Post)

If `contentType === 'blog'`, collect the following fields in order:

#### Title (Required)

```
What's the title of your blog post?

Example: "Building Type-Safe APIs with TypeScript"
```

**Validation**: 3-100 characters
**Store as**: `metadata.title`

#### Date (Required, with default)

```
Publication date (YYYY-MM-DD)?

Default: {TODAY_DATE}
Press Enter to use default or type a custom date.
```

**Validation**: Match `/^\d{4}-\d{2}-\d{2}$/`, must be valid date
**Store as**: `metadata.date`
**Extract year**: For file path generation

#### Author (Optional, with default)

```
Author name?

Default: "Majed Sief Alnasr"
Press Enter to use default or type a custom name.
```

**Validation**: None (optional)
**Store as**: `metadata.author`

#### Tags (Required)

```
Tags for this post (comma-separated):

Examples:
- typescript, api, backend
- react, hooks, performance
- nuxt, vue, ssr

At least 1 tag required.
```

**Validation**: Min 1 tag, convert to lowercase, trim whitespace
**Store as**: `metadata.tags` (array)

#### Excerpt (Optional but recommended)

```
Brief excerpt (1-2 sentences):

Used for SEO meta description, post previews, and social shares.
Max 200 characters. Press Enter to skip.
```

**Validation**: Max 200 chars
**Store as**: `metadata.excerpt`

#### Language (Optional, with default)

```
Content language?

**Recommended:** Option A - English reaches the widest audience.

| Option | Description |
|--------|-------------|
| A | English only (en) - Default |
| B | Arabic only (ar) |
| C | Both languages (bilingual - creates both .md and .ar.md files) |
| D | Other (specify language code) |

You can reply with the option letter (e.g., "A"), accept the recommendation by saying "yes" or "recommended" or pressing Enter, or specify a language code directly.
```

**Validation**: Must be valid language code (e.g., 'en', 'ar', 'fr', 'es')
**If D selected**: Prompt for custom language code and validate format (2-letter ISO code)
**Store as**: `metadata.lang` (for single language) or `bilingualMode = true` (for both)

**If bilingual mode selected**:

- Primary language is English (generated first)
- Arabic translation generated after English content
- Both files created: `slug.md` and `slug.ar.md`

### 5. Validate Blog Metadata

Import and call the validation function:

```typescript
import {validateBlogPostMetadata} from '~/app/utils/content-generator'

const result = validateBlogPostMetadata(metadata)
```

**If validation fails** (`!result.isValid`):

```
❌ Validation failed:

{list each error.field and error.message}

Let's fix these issues...
```

Then re-prompt ONLY for the invalid fields.

**If validation passes with warnings**:

```
✅ Metadata is valid!

⚠️ Recommendations:
{list each warning.field and warning.message}

Proceeding with generation...
```

### 5a. Check for Duplicate Slugs

After metadata validation, generate slug and check for duplicates:

```typescript
import {generateSlug, checkDuplicateSlug} from '~/app/utils/content-generator'

const slug = generateSlug(metadata.title)
const duplicate = await checkDuplicateSlug({
  slug,
  contentType,
  workspaceRoot,
})
```

**If duplicate found**:

```
⚠️ A {contentType} with slug "{slug}" already exists at:
{duplicate.filePath}

What would you like to do?

**Recommended:** Option B - Appending a number creates a unique slug while keeping context.

| Option | Description |
|--------|-------------|
| A | Use a different title/slug |
| B | Append number (suggested: {slug}-2) |
| C | Cancel |

You can reply with the option letter (e.g., "B"), accept the recommendation by saying "yes" or "recommended", or specify your action.
```

**User Choice Handling**:

- Choice A → Re-prompt for title, regenerate slug, check again
- Choice B → Use suggested slug with number, proceed
- Choice C → Cancel and exit

**If no duplicate found**:

Proceed with generation.

### 6. Full Content Mode (if mode === 'full')

If generating full content, ask these additional questions:

#### Content Length

```
How long should this post be?

**Recommended:** Option B - Medium length balances depth with readability.

| Option | Description |
|--------|-------------|
| A | Short (500-800 words, ~3-4 min read) |
| B | Medium (1000-1500 words, ~5-7 min read) |
| C | Long (2000+ words, ~10+ min read) |

You can reply with the option letter (e.g., "B"), accept the recommendation by saying "yes" or "recommended", or specify your preference.
```

**Store as**: `length: 'short' | 'medium' | 'long'`

#### Writing Tone

```
What tone should I use?

**Recommended:** Option B - Conversational tone engages readers while maintaining professionalism.

| Option | Description |
|--------|-------------|
| A | Professional - Formal, industry-standard |
| B | Conversational - Friendly, approachable |
| C | Technical - Deep detail, assumes expertise |
| D | Educational - Teaching-focused, beginner-friendly |
| E | Other (describe your preferred tone) |

You can reply with the option letter (e.g., "B"), accept the recommendation by saying "yes" or "recommended", or describe your preferred tone.
```

**If E selected**: Prompt for custom tone description and use in AI generation prompt

**Store as**: `tone: 'professional' | 'conversational' | 'technical' | 'educational'`

#### Generate Content with AI

Use the Language Model API to generate blog post sections:

```typescript
const baseContext = draftContent
  ? `\n\nDraft content to use as a base (refine and expand on this):\n${draftContent}\n\n`
  : ''

const prompt = `Create a ${length} blog post with a ${tone} tone about: ${title}

Tags: ${tags.join(', ')}
Excerpt: ${excerpt}${baseContext}

Structure:
## Introduction
[2-3 paragraphs introducing the topic]

## Main Content  
[Well-structured content with H2/H3 headings]

## Conclusion
[1-2 paragraphs summarizing key points]

Guidelines:
- Use proper markdown formatting
- Include code examples where appropriate (TypeScript/JavaScript)
- Add inline links to relevant resources
- Use bullet points and numbered lists
- Target ${wordCount} words
`

const [model] = await vscode.lm.selectChatModels({vendor: 'copilot', family: 'gpt-4'})
const messages = [vscode.LanguageModelChatMessage.User(prompt)]
const response = await model.sendRequest(messages, {}, token)

// Collect response text
let generatedContent = ''
for await (const part of response.text) {
  generatedContent += part
}
```

**Parse sections** from generated content (split by `## ` headings)

### 7. Render Content

Use the template renderer:

```typescript
import {renderBlogPost, generateSlug} from '~/app/utils/content-generator'

const slug = generateSlug(metadata.title)

const content = renderBlogPost({
  metadata: result.metadata,
  mode,
  sections:
    mode === 'full'
      ? {
          introduction: generatedIntro,
          mainContent: generatedMain,
          conclusion: generatedConclusion,
        }
      : undefined,
})
```

### 8. Preview Generated Content

Calculate reading time and show preview:

```typescript
import {calculateReadTime} from '~/app/utils/content-generator'

const readTime = calculateReadTime(content)
```

Display to user:

```
📄 Preview

File: content/blog/{year}/{slug}.md
Reading time: {readTime} min

--- FRONTMATTER ---
{show first 10 lines of frontmatter}

--- CONTENT ---
{show first 500 characters}
...

What would you like to do?

**Recommended:** Option A - The generated content is ready to save and refine later.

| Option | Description |
|--------|-------------|
| A | Approve and save file |
| B | Refine specific sections |
| C | Regenerate entire content |
| D | Cancel (discard) |

You can reply with the option letter (e.g., "A"), accept the recommendation by saying "yes" or "recommended", or specify your action.
```

**User Choice Handling**:

- Choice A → Proceed to Step 9 (File Operations)
- Choice B → Go to Refinement Workflow (see below)
- Choice C → Go to Step 12 (Regenerate)
- Choice D → Cancel and exit

### 8a. Refinement Workflow (if user chose option 2)

**Step 1: Ask Which Section**

For blog posts:

```
Which section would you like to refine?

| Option | Description |
|--------|-------------|
| A | Introduction |
| B | Main Content |
| C | Conclusion |
| D | All sections (specify modification) |
| E | Other (describe what you'd like to change) |

Or describe what you'd like to change:
Examples:
- "make it more technical"
- "add code examples"
- "make it more concise"
- "add more data and statistics"
```

For case studies:

```
Which section would you like to refine?

| Option | Description |
|--------|-------------|
| A | Overview |
| B | Challenge |
| C | Solution |
| D | Results |
| E | Technologies Used |
| F | All sections (specify modification) |
| G | Other (describe what you'd like to change) |

```

**Expected Input**: Letter (A-G) or free-form modification request

**Step 2: Collect Refinement Details**

If user selected a specific section:

```
What changes would you like to the {section} section?

Examples:
- "Add more code examples"
- "Make it more technical"
- "Make it shorter"
- "Add real-world examples"
- "Focus more on performance"
```

If user provided free-form request, use it directly.

**Step 3: Regenerate Selected Section**

Preserve all other sections and metadata. Use AI to regenerate only the selected section:

```typescript
const refinementPrompt = `Refine the ${sectionName} section based on this request: ${userRequest}

Current content:
${currentSectionContent}

Original context:
- Title: ${metadata.title}
- Tags: ${metadata.tags.join(', ')}
- Tone: ${tone}
- Target length: ${length}

Generate an improved version that addresses the refinement request while maintaining consistency with the rest of the article.
`

const [model] = await vscode.lm.selectChatModels({vendor: 'copilot', family: 'gpt-4'})
const messages = [vscode.LanguageModelChatMessage.User(refinementPrompt)]
const response = await model.sendRequest(messages, {}, token)

// Collect refined section
let refinedSection = ''
for await (const part of response.text) {
  refinedSection += part
}

// Replace only the refined section in the content
sections[sectionName] = refinedSection
```

**Step 4: Show Updated Preview**

Display the preview again with the refined section and return to Step 8 confirmation.

**Step 5: Iteration Limit**

Track refinement count. Maximum 5 refinements allowed:

```typescript
let refinementCount = 0
const MAX_REFINEMENTS = 5

// After each refinement
refinementCount++

if (refinementCount >= MAX_REFINEMENTS) {
  // Show warning
  console.log(`⚠️  You've reached the maximum of ${MAX_REFINEMENTS} refinements.\n`)
  console.log('**Recommended:** Option A - Save the current version and refine manually if needed.\n')
  console.log('| Option | Description |')
  console.log('|--------|-------------|')
  console.log('| A | Approve and save the current version |')
  console.log('| B | Regenerate entire content (resets refinement count) |')
  console.log('| C | Cancel |')
  console.log('\nYou can reply with the option letter or accept the recommendation by saying "yes" or "recommended".')
}
```

### 8b. Regenerate Workflow (if user chose option 3)

**Preserve Metadata, Regenerate Content**:

```
🔄 Regenerating entire content...

Keeping your metadata:
- Title: ${metadata.title}
- Tags: ${metadata.tags}
- [all other metadata fields]

Generating new content body...
```

Repeat Steps 6-7 (content generation and preview) with same metadata but fresh AI generation.

Reset refinement count to 0.

### 9. File Path Resolution and Conflict Detection

```typescript
import {resolveFilePath} from '~/app/utils/content-generator'

// Use finalSlug from draft status choice
const filePath = resolveFilePath({
  contentType: 'blog',
  slug: finalSlug,
  date: metadata.date,
  lang: metadata.lang,
})

// Check if file exists
const fullPath = path.join(workspaceRoot, filePath)
const exists = await vscode.workspace.fs
  .stat(vscode.Uri.file(fullPath))
  .then(() => true)
  .catch(() => false)
```

**If file exists**:

```
⚠️ File already exists: {filePath}

What would you like to do?

**Recommended:** Option A - Renaming preserves the existing file safely.

| Option | Description |
|--------|-------------|
| A | Rename (create {slug}-v2.md) |
| B | Overwrite existing file |
| C | Cancel |

You can reply with the option letter (e.g., "A"), accept the recommendation by saying "yes" or "recommended", or specify your action.
```

Handle rename by appending `-v2`, `-v3`, etc. until unique filename found.

### 10. Ask Draft Status

Before saving the file, ask the user if they want to keep it as a draft:

```
Do you want to keep this as a draft?

**Recommended:** Option A - Keeping as draft allows review before publishing.

| Option | Description |
|--------|-------------|
| A | Yes (file will start with _draft- prefix) |
| B | No (ready to publish) |

You can reply with the option letter (e.g., "A"), accept the recommendation by saying "yes" or "recommended" or pressing Enter, or specify your choice.
```

**Draft handling**:

- If A or Enter: Use `_draft-` prefix in filename
- If B: Use slug without prefix (ready for immediate publishing)

**Store choice**: `isDraft: boolean`

### 10a. Write File

```typescript
// Apply draft prefix based on user choice
const finalSlug = isDraft ? `_draft-${slug}` : slug

// Ensure directory exists
const dirPath = path.dirname(fullPath)
await vscode.workspace.fs.createDirectory(vscode.Uri.file(dirPath))

// Write file
const fileContent = Buffer.from(content, 'utf-8')
await vscode.workspace.fs.writeFile(vscode.Uri.file(fullPath), fileContent)
```

**Success message**:

```
✅ Blog post created successfully!${isDraft ? ' (Draft mode)' : ' (Published)'}

📂 File: {filePath}
📝 Word count: ~{wordCount}
⏱️  Reading time: {readTime} min
📅 Last modified: {new Date().toISOString().split('T')[0]}
${isDraft ? '⚠️  Status: DRAFT (file starts with _draft-)' : '✓ Status: PUBLISHED'}

Next steps:
1. Review content in VS Code
2. Preview in browser: bun dev → http://localhost:3000/blog/YYYY/{slug}${isDraft ? '\n3. When ready to publish:\n   - Rename file: Remove \'_draft-\' prefix\n   - Example: _draft-my-post.md → my-post.md' : ''}
${isDraft ? '4' : '3'}. Commit to repository

Would you like to create another piece of content?
```

### 10a. Bilingual Generation Workflow (if bilingualMode === true)

After creating the English file, automatically proceed with Arabic version:

**Step 1: Inform User**

```
✅ English version created!

Now generating Arabic version...
🌐 Translating content to Arabic...
```

**Step 2: Translate Metadata**

```typescript
// Translate frontmatter fields
const translationPrompt = `Translate the following content metadata to Arabic:

Title: ${metadata.title}
Excerpt: ${metadata.excerpt}
Tags: ${metadata.tags.join(', ')}

Guidelines:
- Keep technical terms in English (e.g., "TypeScript", "API", "React")
- Translate the meaning accurately
- Maintain professional tone
- Keep it concise

Return in JSON format:
{
  "title": "Arabic translation",
  "excerpt": "Arabic translation",
  "tags": ["tag1", "tag2"]
}
`

const [model] = await vscode.lm.selectChatModels({vendor: 'copilot', family: 'gpt-4'})
const messages = [vscode.LanguageModelChatMessage.User(translationPrompt)]
const response = await model.sendRequest(messages, {}, token)

// Parse translated metadata
const translatedMetadata = JSON.parse(responseText)
```

**Step 3: Translate Content Body**

```typescript
const contentTranslationPrompt = `Translate the following blog post content to Arabic:

${content}

Guidelines:
- Keep technical terms and code snippets in English
- Preserve all markdown formatting (headings, lists, code blocks)
- Maintain the structure and section organization
- Use professional Arabic appropriate for technical content
- Keep URLs and image paths unchanged
- Ensure proper RTL text direction

Translate only the text content, not the markdown syntax.
`

const contentResponse = await model.sendRequest(
  [vscode.LanguageModelChatMessage.User(contentTranslationPrompt)],
  {},
  token
)

// Collect translated content
let translatedContent = ''
for await (const part of contentResponse.text) {
  translatedContent += part
}
```

**Step 4: Build Arabic File**

```typescript
import {buildFrontmatter, renderBlogPost} from '~/app/utils/content-generator'

const arabicMetadata = {
  ...metadata,
  title: translatedMetadata.title,
  excerpt: translatedMetadata.excerpt,
  tags: translatedMetadata.tags,
  lang: 'ar',
}

const arabicContent = renderBlogPost({
  metadata: arabicMetadata,
  mode: 'full',
  sections: parsedTranslatedSections,
})
```

**Step 5: Write Arabic File**

```typescript
import {resolveFilePath} from '~/app/utils/content-generator'

const arabicFilePath = resolveFilePath({
  contentType: 'blog',
  slug,
  date: metadata.date,
  lang: 'ar', // This adds .ar.md extension
})

const arabicFullPath = path.join(workspaceRoot, arabicFilePath)
await vscode.workspace.fs.writeFile(
  vscode.Uri.file(arabicFullPath),
  Buffer.from(arabicContent, 'utf-8')
)
```

**Step 6: Bilingual Success Message**

```
✅ Bilingual content created successfully!

📂 English: {englishFilePath}
📂 Arabic: {arabicFilePath}

Both files are ready for review. The Arabic version:
- Uses RTL text direction
- Preserves technical terms in English
- Maintains markdown structure
- Has proper `.ar.md` extension

Next steps:
1. Review both files in VS Code
2. Preview English: http://localhost:3000/blog/YYYY/{slug}
3. Preview Arabic: http://localhost:3000/ar/blog/YYYY/{slug}
4. Commit both files to repository

Would you like to create another piece of content?
```

### 11. Case Study Workflow

If `contentType === 'case-study'`, collect these fields:

#### Required Metadata

- **title**: "What's the title?" (3-100 chars)
- **client**: "Client name?" (2-50 chars)
- **date**: "Project date (YYYY-MM-DD)?" (with today default)
- **role**: "Your role?" (e.g., "Full Stack Developer")
- **timeline**: "Project timeline?" (e.g., "3 months", "Q1 2026")
- **tags**: "Technologies used (comma-separated)?" (min 1)
- **featuredImage**: "Featured image path?" (e.g., `/images/case-studies/project.jpg`)

#### Optional Metadata

- **excerpt**: "Brief description (max 200 chars)?" (optional)
- **featured**: "Feature on homepage? (yes/no)" (default: no)
- **order**: "Display order (if featured)?" (only ask if featured === true)
- **lang**: "Language? (en/ar)" (default: en)

#### Conditional Fields

**Testimonial** (optional):

```
Include client testimonial? (yes/no)
```

If yes:

- **quote**: "Testimonial quote?"
- **author**: "Author name?"
- **position**: "Author position/title?"

**Metrics** (optional):

```
Include project metrics? (yes/no)
```

If yes, loop:

- **label**: "Metric label?" (e.g., "Performance improvement")
- **value**: "Metric value?" (e.g., "50% faster")
- **Continue**: "Add another metric? (yes/no)"

#### Case Study Context (for full mode)

If `mode === 'full'`, ask:

- **problem**: "Describe the problem (2-3 sentences):"
- **solution**: "Describe your solution (2-3 sentences):"
- **results**: "Describe the results (2-3 sentences):"

#### Validate Case Study

```typescript
import {validateCaseStudyMetadata} from '~/app/utils/content-generator'

const result = validateCaseStudyMetadata(metadata)
```

Follow same validation error/warning pattern as blog posts.

#### Generate Case Study Content

If `mode === 'full'`, generate with AI:

```typescript
const prompt = `Create a case study for: ${title}

Client: ${client}
Role: ${role}
Timeline: ${timeline}
Technologies: ${tags.join(', ')}

Context:
- Problem: ${problem}
- Solution: ${solution}
- Results: ${results}

Structure:
## Overview
[Brief project introduction]

## Challenge
[Detailed problem description]

## Solution
[Your approach and implementation]

## Results
[Measurable outcomes and impact]

${testimonial ? `## Client Testimonial\n> ${testimonial.quote}\n> — ${testimonial.author}, ${testimonial.position}` : ''}

## Technologies Used
- ${tags.map(tag => tag).join('\n- ')}
`
```

#### Render and Save

```typescript
import {renderCaseStudy} from '~/app/utils/content-generator'

const content = renderCaseStudy({
  metadata: result.metadata,
  mode,
  sections: mode === 'full' ? generatedSections : undefined,
})

const filePath = resolveFilePath({
  contentType: 'case-study',
  slug: generateSlug(title),
  date: metadata.date,
  lang: metadata.lang,
})
```

Follow same preview → confirmation → write flow as blog posts.

## Error Handling

### Validation Errors

```
❌ Validation failed:

- title: Title must be at least 3 characters
- tags: At least one tag is required

Let's fix these...
```

Re-prompt for ONLY the invalid fields.

### File Write Errors

```
❌ Failed to write file: {error message}

This might be due to:
- Insufficient permissions
- Disk space
- Invalid file path

Would you like to:

**Recommended:** Option A - Retry in case it was a temporary issue.

| Option | Description |
|--------|-------------|
| A | Retry |
| B | Save to different location |
| C | Cancel |

You can reply with the option letter (e.g., "A"), accept the recommendation by saying "yes" or "recommended", or specify your action.
```

### AI Generation Errors

```
❌ Content generation failed: {error message}

Would you like to:

**Recommended:** Option A - Retry generation as it may succeed on second attempt.

| Option | Description |
|--------|-------------|
| A | Retry generation |
| B | Switch to metadata-only mode |
| C | Cancel |

You can reply with the option letter (e.g., "A"), accept the recommendation by saying "yes" or "recommended", or specify your action.
```

## Operating Principles

### Conversation Flow

- One question at a time (don't overwhelm user)
- Show defaults clearly (press Enter to accept)
- Validate immediately after each critical field
- Preserve all collected data if user needs to retry

### User Experience

- Use emojis for visual cues (✅ ❌ ⚠️ 📄 📂)
- Show concrete examples in prompts
- Explain what each field is used for
- Provide clear next steps after completion

### Data Safety

- NEVER overwrite files silently
- Always validate before file operations
- Show full file path before writing
- Offer rename options for conflicts

### Code Quality

- Use TypeScript utilities from `~/app/utils/content-generator`
- All metadata MUST pass Zod validation
- Reading time calculated with `calculateReadTime()`
- Slugs generated with `generateSlug()`
- File paths resolved with `resolveFilePath()`

## Context

$ARGUMENTS
