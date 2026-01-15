# Agent Prompts & Conversation Templates

**Purpose**: Define all question templates, conversation flows, and agent prompts for the GitHub Copilot Chat content generation agent.

## Agent Persona

```yaml
name: Content Generation Agent
role: Portfolio content creation assistant
personality: Professional, helpful, detail-oriented
tone: Friendly but focused, asks clear questions
expertise: Technical writing, content structure, SEO best practices
```

## Conversation Flows

### Flow 1: Blog Post Generation

#### Step 1: Content Type Selection

**Agent**:

```
I can help you create content for your portfolio! What would you like to generate?

1. Blog post
2. Case study

Reply with the number or name.
```

**Expected Input**: "1" | "blog" | "blog post"

---

#### Step 2: Mode Selection

**Agent**:

```
Great! For your blog post, would you like me to:

1. Generate full content (complete article with all sections)
2. Generate metadata only (frontmatter fields for you to write the content)

Which option would you prefer?
```

**Expected Input**: "1" | "full" | "full content" | "2" | "metadata" | "metadata only"

---

#### Step 3-N: Metadata Questions (Blog Post)

**Question: Title** (Required)

```
What's the title of your blog post?

Example: "Building Type-Safe APIs with TypeScript"
```

**Validation**: Min 3 characters, max 100 characters

---

**Question: Date** (Required, with default)

```
What date should this post be published?

Format: YYYY-MM-DD
Default: {TODAY_DATE}

Press Enter to use default or type a custom date.
```

**Validation**: Must match /^\d{4}-\d{2}-\d{2}$/, must be valid date

---

**Question: Author** (Optional, with default)

```
Author name?

Default: {GIT_USER_NAME or "Majed Sief Alnasr"}

Press Enter to use default or type a custom name.
```

**Validation**: None (optional field)

---

**Question: Tags** (Required)

```
What tags describe this post? (comma-separated)

Examples: typescript, api, backend
          react, hooks, performance
          nuxt, vue, ssr

At least 1 tag required.
```

**Validation**: Min 1 tag, each tag 2-30 chars, convert to lowercase array

---

**Question: Excerpt** (Optional but recommended)

```
Write a brief excerpt (1-2 sentences) that describes this post.

This will be used for:
- SEO meta description
- Post preview cards
- Social media shares

Max 200 characters.
```

**Validation**: Max 200 chars, recommended but optional

---

**Question: Language** (Optional, with default)

```
What language is this content in?

1. English (en) - Default
2. Arabic (ar)

Press Enter for English or choose an option.
```

**Validation**: Must be 'en' or 'ar'

---

#### Full Content Mode: Additional Questions

**Question: Content Length** (if mode === 'full')

```
How long should this blog post be?

1. Short (500-800 words, ~3-4 min read)
2. Medium (1000-1500 words, ~5-7 min read)
3. Long (2000+ words, ~10+ min read)

Choose your preferred length.
```

**Expected Input**: "1" | "short" | "2" | "medium" | "3" | "long"

---

**Question: Writing Tone** (if mode === 'full')

```
What tone should I use for writing?

1. Professional - Formal, industry-standard language
2. Conversational - Friendly, approachable, casual
3. Technical - Deep technical detail, assumes expertise
4. Educational - Teaching-focused, beginner-friendly

Choose the tone that fits your audience.
```

**Expected Input**: "1" | "professional" | "2" | "conversational" | "3" | "technical" | "4" | "educational"

---

### Flow 2: Case Study Generation

#### Steps 1-2: Same as Blog Post

(Content Type Selection + Mode Selection)

#### Step 3-N: Metadata Questions (Case Study)

**Question: Title** (Required)

```
What's the title of this case study?

Example: "AI-Powered Dashboard Platform"
```

**Validation**: Min 3 characters, max 100 characters

---

**Question: Client** (Required)

```
What company or client was this project for?

Example: "DataFlow Systems"
```

**Validation**: Min 2 characters, max 50 characters

---

**Question: Date** (Required, with default)

```
When was this project completed?

Format: YYYY-MM-DD
Default: {TODAY_DATE}

Press Enter to use default or type the completion date.
```

**Validation**: Must match /^\d{4}-\d{2}-\d{2}$/, must be valid date

---

**Question: Role** (Required)

```
What was your role in this project?

Examples:
- Full Stack Developer
- Frontend Lead
- Technical Architect
- Solo Developer

Your role:
```

**Validation**: Min 2 characters, max 50 characters

---

**Question: Timeline** (Required)

```
What was the project timeline?

Examples:
- "3 months (Jun 2025 - Aug 2025)"
- "6 weeks (Sprint-based)"
- "1 year (Ongoing)"

Timeline:
```

**Validation**: Min 5 characters

---

**Question: Tags** (Required)

```
What technologies did you use? (comma-separated)

Examples: react, node.js, postgresql, tailwind
          vue, nuxt, mongodb, typescript
          python, django, aws, docker

Technologies:
```

**Validation**: Min 1 tag

---

**Question: Excerpt** (Optional but recommended)

```
Write a brief summary of this project (1-2 sentences).

This highlights the key achievement or value delivered.

Max 200 characters.
```

**Validation**: Max 200 chars

---

**Question: Featured Image** (Required)

```
Path to the featured image for this case study.

Format: /images/case-studies/{YEAR}/{filename}

Example: /images/case-studies/2025/dashboard-hero.svg

Image path:
```

**Validation**: Must be valid path format

**Note**: Agent should suggest creating placeholder if image doesn't exist yet

---

**Question: Featured Flag** (Optional, with default)

```
Should this case study be featured on your homepage?

1. Yes - Featured (shown prominently)
2. No - Regular (normal listing)

Default: No

Choose an option or press Enter for default.
```

**Expected Input**: "yes" | "1" | "no" | "2" | [Enter for default]

---

**Question: Display Order** (Optional, conditional)

```
{IF featured === true}

What display order should this have? (Lower numbers appear first)

Default: 999 (last)

Enter a number or press Enter for default:
```

**Validation**: Must be positive integer

---

**Question: Language** (Same as blog post)

---

**Question: Include Testimonial?** (Optional)

```
Do you have a client testimonial to include?

1. Yes - I'll provide testimonial details
2. No - Skip testimonial

Choose an option:
```

**Expected Input**: "yes" | "1" | "no" | "2"

---

**If testimonial === yes:**

**Sub-question: Testimonial Quote**

```
What's the testimonial quote from the client?

Quote:
```

---

**Sub-question: Testimonial Author**

```
Who said this? (Name)

Example: John Martinez

Author:
```

---

**Sub-question: Testimonial Position**

```
What's their position/title?

Example: VP of Analytics, DataFlow Systems

Position:
```

---

**Question: Include Metrics?** (Optional)

```
Do you have quantifiable results or metrics to showcase?

Examples:
- "1M+ events processed daily"
- "Query time < 200ms"
- "99.95% uptime"

1. Yes - I'll provide metrics
2. No - Skip metrics

Choose an option:
```

**Expected Input**: "yes" | "1" | "no" | "2"

---

**If metrics === yes:**

**Sub-question: Metric Entry** (Loop)

```
Enter a metric:

Label (what was measured):
Value (the result):

Example:
Label: Events Processed
Value: 1M+/day

Add another metric? (yes/no)
```

**Validation**: Both label and value required, loop until user says "no"

---

#### Full Content Mode: Additional Questions (Case Study)

**Same as blog post**:

- Content Length
- Writing Tone

**Additional context question**:

```
To write a compelling case study, I need to understand:

1. What problem were you solving?
2. What was your solution approach?
3. What were the key results/outcomes?

Please provide a brief description for each (2-3 sentences each).

Problem:
```

(Wait for response)

```
Solution:
```

(Wait for response)

```
Results:
```

---

## Validation & Confirmation

### Validation Summary

After all questions answered, show summary:

```
Great! Let me validate your inputs...

✓ Title: "{TITLE}"
✓ {... other validated fields}

{IF any errors}
⚠️  Found some issues:
- {ERROR 1}
- {ERROR 2}

Let's fix these. {Ask corrective questions}

{IF valid}
✅ All metadata validated successfully!

{IF mode === 'full'}
Now generating your {content_type}...
{ELSE}
Ready to create metadata file.
```

---

### Preview & Confirmation

After generation (full mode) or metadata collection (metadata mode):

```
Here's your generated {content_type}:

{SHOW PREVIEW - first 20 lines of content}
...
{IF long content}
(Showing first 20 lines. Full content is {WORD_COUNT} words, ~{READ_TIME} min read)
{END IF}

This will be saved to:
📄 {FILE_PATH}

What would you like to do?

1. Approve - Create this file
2. Refine - Regenerate specific sections
3. Regenerate - Start content generation over
4. Cancel - Don't create file

Choose an option:
```

---

### Refinement Flow

If user chooses "Refine":

```
Which section would you like me to improve?

{LIST sections based on content type}

Blog Post:
1. Introduction
2. Main content
3. Conclusion
4. Code examples
5. Overall tone

Case Study:
1. Problem statement
2. Solution description
3. Results & metrics
4. Technical details
5. Overall structure

Choose a section or describe what to change:
```

---

### File Creation Confirmation

After approval:

```
✅ File created successfully!

📄 {FILE_PATH}

You can now:
- Edit the file directly in VS Code
- Preview it in your Nuxt dev server
- Commit and push to your repository

{IF lang === 'ar'}
📝 Note: This is Arabic content with RTL support. Make sure to review the layout.
{END IF}

{IF featured_image_placeholder}
⚠️  Don't forget to add your featured image at:
   {IMAGE_PATH}
{END IF}

Need anything else?
```

---

## Error Messages

### Validation Errors

```
❌ Invalid {FIELD}: {ERROR_MESSAGE}

{SPECIFIC_GUIDANCE}

Please provide a valid {FIELD}:
```

---

### File Conflict

```
⚠️  A file already exists at:
   {FILE_PATH}

Created: {EXISTING_FILE_DATE}
Title: "{EXISTING_FILE_TITLE}"

What would you like to do?

1. Rename - I'll suggest "{SLUG}-v2.md"
2. Overwrite - Replace the existing file (⚠️  Warning: This is permanent!)
3. Cancel - Don't create this file

Choose an option:
```

---

### Generation Error

```
❌ Content generation failed: {ERROR_MESSAGE}

I've preserved all your answers. Let's try again.

Options:
1. Retry - Attempt generation again with same inputs
2. Modify - Change some of your answers
3. Cancel - Exit without creating file

Choose an option:
```

---

### Permission Error

```
❌ Unable to write file: Permission denied

Path: {FILE_PATH}

Please check:
- File/folder permissions
- Disk space
- File is not open in another program

Try again? (yes/no)
```

---

## Agent Behavior Guidelines

### 1. Be Conversational

- Use friendly, natural language
- Acknowledge user input ("Great choice!", "Got it!")
- Provide examples when asking questions

### 2. Show Progress

- Indicate how many questions remain
- Show validation feedback immediately
- Display loading indicators during generation

### 3. Handle Errors Gracefully

- Never lose user's data
- Provide specific, actionable error messages
- Offer retry/correction options

### 4. Provide Context

- Explain why you're asking for information
- Show how metadata will be used (SEO, previews, etc.)
- Offer examples for unfamiliar fields

### 5. Respect User's Time

- Offer smart defaults where possible
- Allow skipping optional fields
- Remember answers if user restarts

---

## Implementation Notes

These prompts should be:

- Stored as templates with variable interpolation
- Localized if supporting multiple languages (future)
- Tested with various user input patterns
- Updated based on user feedback

**Next**: See [workflow.md](./workflow.md) for complete flow diagrams.
