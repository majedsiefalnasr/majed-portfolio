# Feature Specification: AI Content Generation Agent

**Feature Branch**: `004-content-generation-agent`  
**Created**: January 14, 2026  
**Status**: Draft  
**Input**: User description: "content agent to help to generate the content for my portfolio (Blog or Case study)."

## Clarifications

### Session 2026-01-14

- Q: How will users interact with the content generation agent? → A: GitHub Copilot Chat integration - Use natural language in VS Code chat to generate content
- Q: Which AI service will provide the content generation capabilities? → A: GitHub Copilot's underlying models (already integrated with VS Code)
- Q: How should the agent handle API rate limits or cost constraints when generating content? → A: No limits - Generate unlimited content relying on GitHub Copilot subscription limits
- Q: Should generated content files be automatically saved to disk or require explicit user confirmation before writing? → A: Confirmation required - Show preview in chat, ask user to confirm before creating files
- Q: How should the system handle errors during content generation (e.g., network failures, malformed responses)? → A: Informative errors - Show specific error message, suggest retry, preserve conversation context

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Generate Blog Post from Prompt (Priority: P1)

Portfolio owner provides a topic or brief description and receives a complete, formatted blog post ready for publication in their portfolio.

**Why this priority**: Core value proposition - enables quick content creation without manual writing. Delivers immediate time-saving benefit and ensures consistent quality across blog posts.

**Independent Test**: Can be fully tested by opening GitHub Copilot Chat in VS Code, providing a topic prompt (e.g., "Write about TypeScript best practices"), and receiving a complete markdown blog post with proper frontmatter, structure, and content that can be directly placed in `content/blog/`.

**Acceptance Scenarios**:

1. **Given** user initiates content generation via Copilot Chat, **When** agent starts conversation, **Then** agent asks whether to generate full content or metadata only
2. **Given** user selects content mode (full/metadata), **When** agent needs information, **Then** agent asks specific questions to gather required frontmatter fields (title, date, author, tags, excerpt, lang)
3. **Given** user provides answers to agent questions, **When** agent has all required information, **Then** agent generates content with proper frontmatter matching BlogPost or CaseStudy schema
4. **Given** content has been generated and displayed in chat, **When** user is prompted for confirmation, **Then** user can review the preview and explicitly approve or reject file creation
5. **Given** user specifies a technical topic, **When** agent generates content, **Then** post includes code examples with proper syntax highlighting markers
6. **Given** user requests a specific tone (professional, casual, technical), **When** agent generates content, **Then** the writing style matches the requested tone
7. **Given** user provides keywords or SEO requirements, **When** agent generates content, **Then** post naturally incorporates those keywords while maintaining readability

---

### User Story 2 - Generate Case Study from Project Details (Priority: P1)

Portfolio owner provides project information and receives a structured case study showcasing their work with proper metrics, challenges, and solutions.

**Why this priority**: Critical for portfolio value - case studies demonstrate real-world impact and are key to attracting opportunities. Equal priority to blog generation as both are core content types.

**Independent Test**: Can be fully tested by providing project details (name, role, tech used, problem solved) and receiving a formatted case study with sections for overview, challenge, solution, results, and metrics that can be placed in `content/case-studies/`.

**Acceptance Scenarios**:

1. **Given** user provides project details, **When** agent generates case study, **Then** output includes frontmatter with project metadata (title, client, role, technologies, duration)
2. **Given** user describes challenges faced, **When** agent generates case study, **Then** output includes a structured "Challenge" section with clear problem statements
3. **Given** user provides solution approach, **When** agent generates case study, **Then** output includes detailed "Solution" section with methodology and decisions
4. **Given** user provides metrics or outcomes, **When** agent generates case study, **Then** output includes "Results" section with quantifiable achievements
5. **Given** user wants to showcase visual work, **When** agent generates case study, **Then** output includes image placeholders with proper paths to `public/images/case-studies/`

---

### User Story 3 - Preview and Refine Generated Content (Priority: P2)

User reviews AI-generated content in their local development environment and can request modifications or regenerations before finalizing.

**Why this priority**: Quality control - ensures content meets user's standards and brand voice. Secondary to initial generation as refinement happens after core content creation.

**Independent Test**: Can be tested by generating content, viewing it in the Nuxt dev server at localhost, and requesting modifications (e.g., "make it more technical" or "add more examples"), resulting in updated content.

**Acceptance Scenarios**:

1. **Given** content has been generated, **When** user reviews in browser, **Then** content renders with proper styling and formatting
2. **Given** user requests modifications, **When** agent regenerates sections, **Then** updated content preserves frontmatter and integrates smoothly with unchanged sections
3. **Given** user wants to adjust tone or length, **When** agent refines content, **Then** modifications maintain consistency with overall structure

---

### User Story 4 - Bilingual Content Generation (Priority: P3)

User generates content in both English and Arabic, maintaining consistent structure and meaning across both language versions.

**Why this priority**: Valuable for reaching broader audience but not critical for MVP. Can be added after core generation works well in primary language.

**Independent Test**: Can be tested by requesting content in both languages and verifying both `.md` and `.ar.md` files exist with appropriate translations while maintaining identical structure.

**Acceptance Scenarios**:

1. **Given** user requests bilingual content, **When** agent generates, **Then** both English (`.md`) and Arabic (`.ar.md`) files are created
2. **Given** content is generated in both languages, **When** user reviews, **Then** frontmatter metadata is properly translated while maintaining consistency
3. **Given** technical terms exist in content, **When** translated to Arabic, **Then** common technical terms remain in English where appropriate for clarity

---

### User Story 5 - Content Template Customization (Priority: P3)

User can define and save custom templates for different content types, allowing the agent to generate content following specific structures or formats.

**Why this priority**: Nice to have for personalization but not essential for initial launch. Standard templates work for most use cases.

**Independent Test**: Can be tested by creating a custom template structure, generating content with that template, and verifying the output follows the specified format.

**Acceptance Scenarios**:

1. **Given** user defines a custom blog template, **When** agent generates blog post, **Then** output follows the custom structure
2. **Given** user saves multiple templates, **When** generating content, **Then** user can select which template to use
3. **Given** template includes required sections, **When** agent generates content, **Then** all required sections are populated

---

### Edge Cases

- What happens when user provides minimal information (e.g., just "write about AI")? System should ask clarifying questions or generate based on reasonable assumptions with clear structure
- How does system handle very long or complex topics that might exceed token limits? System should break into manageable chunks or summarize appropriately
- What happens if generated content conflicts with existing filenames? System should either suggest alternative names or append version numbers
- How does system handle requests for topics outside portfolio owner's expertise? System should generate educational content or suggest focusing on owner's actual experience
- What happens if user requests regeneration multiple times in succession? System should maintain conversation context and apply iterative improvements, relying on GitHub Copilot's rate limiting if limits are reached
- How does system handle special characters or emojis in titles that might break file naming? System should sanitize filenames while preserving display titles
- What happens when content generation fails due to network errors or malformed responses? System should display specific error message explaining the issue, preserve the conversation context including user's original prompt, and suggest retry

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST accept natural language prompts describing desired blog posts or case studies through GitHub Copilot Chat interface in VS Code
- **FR-002**: System MUST generate markdown files with frontmatter matching these exact schemas:
  - **Blog**: title, date, tags (array), excerpt (recommended 150-160 chars for SEO), lang (en or ar, default: en), author (optional, defaults from git config or 'Majed Sief Alnasr')
  - **Case Study**: title, client, date, role, timeline, tags (array), excerpt (recommended 150-160 chars for SEO), featuredImage, lang (en or ar, default: en), featured (boolean, default: false), order (number, default: 999), testimonial (optional), metrics (optional)
- **FR-003**: System MUST create files in appropriate directory structure (`content/blog/YYYY/` or `content/case-studies/`)
- **FR-004**: System MUST generate unique, SEO-friendly filenames based on content title
- **FR-005**: System MUST include proper date formatting in frontmatter (YYYY-MM-DD)
- **FR-006**: System MUST generate appropriate tags/categories based on content topic
- **FR-007**: System MUST create image placeholders with correct paths to `public/images/` directories
- **FR-008**: System MUST format code blocks with proper language identifiers for syntax highlighting
- **FR-009**: System MUST generate meta descriptions (excerpt field) suitable for SEO with recommended length 150-160 characters (warn if outside this range, but allow up to 200 characters)
- **FR-010**: System MUST calculate reading time estimates and provide them as runtime computed properties (not in frontmatter YAML, but available via calculateReadTime utility for display)
- **FR-011**: Users MUST be able to specify content length preferences (short, medium, long)
- **FR-012**: Users MUST be able to request specific writing tones (professional, conversational, technical, educational)
- **FR-013**: System MUST validate generated content against schema defined in `app/types/content.ts`
- **FR-014**: System MUST support both English and Arabic content generation with appropriate file naming (`.md` and `.ar.md`)
- **FR-015**: System MUST preserve existing portfolio content when adding new generated content
- **FR-016**: System MUST show preview of generated content in chat and require explicit user confirmation before writing files to disk
- **FR-017**: System MUST provide options to regenerate or refine specific sections of generated content
- **FR-018**: For case studies, system MUST include sections for: Overview, Challenge, Solution, Results, Technologies Used
- **FR-019**: For blog posts, system MUST include sections for: Introduction, Main Content (with subsections), Conclusion
- **FR-020**: System MUST generate content that is unique and not plagiarized from existing sources
- **FR-021**: System MUST display specific error messages when content generation fails and preserve conversation context to allow retry
- **FR-022**: Agent MUST ask user whether to generate full content or metadata-only before proceeding with content generation
- **FR-023**: Agent MUST interactively ask questions to gather all required frontmatter fields based on content type (blog or case study)
- **FR-024**: Agent MUST validate that all required metadata fields are collected before generating content

### Key Entities _(include if feature involves data)_

- **Generation Mode**: User's selection of content generation scope - either "full content" (complete blog/case study with body) or "metadata only" (frontmatter only)
- **Content Prompt**: User's input describing desired content including topic, type (blog/case study), tone, length, language preferences, and any specific requirements
- **Interactive Q&A Session**: Structured conversation where agent asks specific questions to gather required metadata fields (title, date, author, tags, excerpt, client, role, timeline, etc.)
- **Generated Content**: Complete markdown file with frontmatter matching exact schema (BlogPost or CaseStudy from app/types/content.ts) and optional body content (structured sections, code blocks, images, links)
- **Content Template**: Structure definition for different content types including required sections, optional sections, and formatting rules
- **Refinement Request**: User's feedback on generated content including specific sections to modify, tone adjustments, or content additions/removals
- **Content Metadata**: Extracted information from prompts used to populate frontmatter including categories, tags, estimated reading time, and SEO descriptions

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can generate a complete blog post from a simple topic prompt in under 2 minutes
- **SC-002**: Users can generate a complete case study from project details in under 3 minutes
- **SC-003**: Generated content requires minimal manual editing (less than 10% of content length modified)
- **SC-004**: 90% of generated markdown files render correctly without validation errors
- **SC-005**: Generated content includes all required frontmatter fields with appropriate values
- **SC-006**: Time to create portfolio content reduces by 80% compared to manual writing
- **SC-007**: Generated content achieves readability scores appropriate for target audience (Flesch reading ease 60-70 for technical content)
- **SC-008**: Users successfully publish generated content without technical issues in 95% of cases
- **SC-009**: Generated filenames are unique and avoid conflicts with existing content 100% of the time

## Assumptions

- User has basic understanding of their portfolio content and can provide relevant project details
- User will review and approve content before final publication (not fully automated publishing)
- Portfolio uses Nuxt Content with existing schema for blog posts and case studies
- User has access to project metrics and outcomes for case study generation
- Generated content will be factually accurate based on user-provided information (agent doesn't verify claims)
- User will provide or source appropriate images separately (agent creates placeholders, not actual images)
- Content generation leverages GitHub Copilot's AI capabilities without requiring separate API key management
- GitHub Copilot has sufficient context access to understand portfolio structure and content requirements
- GitHub Copilot subscription limits are sufficient for typical portfolio content generation needs (no additional rate limiting required)
- Standard markdown formatting and frontmatter schema will remain consistent with existing portfolio structure

## Dependencies

- GitHub Copilot Chat must be available in VS Code environment with active subscription
- GitHub Copilot's underlying AI models must have content generation capabilities
- Nuxt Content module must be properly configured in the portfolio
- Content schemas defined in `app/types/content.ts` must be stable
- Directory structure in `content/` and `public/images/` must follow established conventions
- User must be running the portfolio in development mode to preview generated content

## Out of Scope

- Automatic image generation or sourcing (user provides images)
- SEO keyword research tools or analytics integration
- Multi-user collaboration features or content approval workflows
- Automated publishing to production environments
- Content plagiarism detection beyond basic uniqueness checks
- Integration with external CMS or content management tools
- Automated translation services (bilingual generation uses AI translation which user should verify)
- Version control or content history tracking beyond git
- Content performance analytics or A/B testing
- Automated social media post generation from content
