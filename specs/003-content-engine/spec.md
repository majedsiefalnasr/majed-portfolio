# Feature Specification: Content Engine (Blog & Case Studies)

**Feature Branch**: `003-content-engine`  
**Created**: January 13, 2026  
**Status**: Draft  
**Input**: User description: "Content Engine (Blog & Case Studies). Using Nuxt Content with MDC to render Markdown + Vue Components."

## Clarifications

### Session 2026-01-13

- Q: Content directory structure - How should blog posts and case studies be organized within the content directory? → A: Year-based: `/content/blog/YYYY/post-slug.md`, `/content/case-studies/YYYY/project-slug.md` for chronological organization
- Q: Blog list layout presentation - What visual layout should be used to display the blog post list? → A: Single column list - All posts in a vertical stack, one per row (similar to traditional blog indexes)
- Q: Excerpt generation method - How should blog post excerpts be created for list page previews? → A: Frontmatter with fallback to auto-generation (best of both - manual preferred, auto if missing)
- Q: Draft vs published content handling - How should the system distinguish between draft content and published content? → A: Filename prefix like `_draft-post-title.md` (underscore or prefix indicates draft status)
- Q: Content filtering and search - Should visitors be able to filter or search through blog posts and case studies? → A: Tag-based filtering - Click tags to filter by topic/category (structured discovery)

## User Scenarios & Testing _(mandatory)_

### User Story 1 - View Blog Post List (Priority: P1)

As a portfolio visitor, I want to browse a list of all published blog posts so that I can discover written content and choose what interests me.

**Why this priority**: This is the entry point to the blog - without a list view, users cannot discover any content. It delivers immediate value by making content accessible.

**Independent Test**: Can be fully tested by navigating to `/blog` and verifying that a list of blog posts appears with titles, publication dates, excerpts, and read time estimates.

**Acceptance Scenarios**:

1. **Given** blog posts exist in the content directory, **When** a visitor navigates to `/blog`, **Then** they see a single-column vertical list of all published blog posts
2. **Given** the blog list page, **When** viewing each post preview, **Then** the title, publication date, excerpt (from frontmatter or auto-generated from first ~150 characters), and estimated read time are visible in each row
3. **Given** multiple blog posts exist, **When** the list displays, **Then** posts are ordered by publication date (newest first)
4. **Given** a visitor views the blog list, **When** they click on a blog post preview, **Then** they navigate to that post's detail page

---

### User Story 2 - Read Full Blog Post (Priority: P1)

As a portfolio visitor, I want to read a complete blog post with formatted text, headings, code blocks, and images so that I can consume the full content.

**Why this priority**: This delivers the core value proposition - reading the actual content. Without this, the blog list is meaningless.

**Independent Test**: Can be fully tested by navigating to any blog post URL (e.g., `/blog/my-first-post`) and verifying that the full markdown content renders with proper formatting, syntax highlighting for code, and responsive images.

**Acceptance Scenarios**:

1. **Given** a blog post markdown file exists, **When** a visitor navigates to the post URL, **Then** the full content renders with headings, paragraphs, lists, and formatting intact
2. **Given** a blog post contains code blocks, **When** the post displays, **Then** code appears with syntax highlighting and proper language identification
3. **Given** a blog post contains images, **When** the post displays, **Then** images load with optimized formats and responsive sizing
4. **Given** a visitor reads a post, **When** they scroll, **Then** the reading experience is smooth with appropriate typography and line spacing

---

### User Story 3 - View Case Study List (Priority: P2)

As a potential client or employer, I want to browse a portfolio of case studies so that I can evaluate the quality and scope of previous work.

**Why this priority**: Case studies showcase professional work and are critical for portfolio credibility, but blog content can exist independently.

**Independent Test**: Can be fully tested by navigating to `/case-studies` and verifying that a showcase of case study previews appears with project names, client information, and key highlights.

**Acceptance Scenarios**:

1. **Given** case study content exists, **When** a visitor navigates to `/case-studies`, **Then** they see a curated showcase of case study previews
2. **Given** the case studies list, **When** viewing each preview, **Then** the project name, client/company, role, timeline, and preview image are visible
3. **Given** multiple case studies exist, **When** the list displays, **Then** case studies are ordered by completion date (newest first) or custom featured order
4. **Given** a visitor views the case studies list, **When** they click on a case study preview, **Then** they navigate to that case study's detail page

---

### User Story 4 - Read Full Case Study (Priority: P2)

As a potential client or employer, I want to read a detailed case study with problem description, solution approach, outcomes, and visuals so that I can understand the work methodology and results.

**Why this priority**: This provides the detailed evidence of capabilities and results, building on the case study list foundation.

**Independent Test**: Can be fully tested by navigating to any case study URL (e.g., `/case-studies/ecommerce-redesign`) and verifying that the structured content renders with sections, metrics, testimonials, and project visuals.

**Acceptance Scenarios**:

1. **Given** a case study markdown file exists, **When** a visitor navigates to the case study URL, **Then** the full structured content renders with problem statement, solution, and outcomes
2. **Given** a case study contains metrics or results, **When** the study displays, **Then** numerical data and key performance indicators are visually highlighted
3. **Given** a case study contains embedded components, **When** the study displays, **Then** interactive elements like image galleries, sliders, or comparison tools render correctly
4. **Given** a visitor reads a case study, **When** they view project images, **Then** images display in high quality with lazy loading and zoom capabilities

---

### User Story 5 - Content Displays in Selected Language (Priority: P3)

As a bilingual visitor, I want to read blog posts and case studies in my preferred language (English or Arabic) so that I can consume content naturally.

**Why this priority**: Internationalization enhances accessibility but requires foundational content structure first. Content can be English-only initially.

**Independent Test**: Can be fully tested by switching language preference and verifying that content (if translations exist) displays in the selected language with proper text direction.

**Acceptance Scenarios**:

1. **Given** blog posts have translations available, **When** a visitor selects Arabic language, **Then** blog list and post content display in Arabic with RTL text direction
2. **Given** case studies have translations available, **When** a visitor selects Arabic language, **Then** case study list and content display in Arabic
3. **Given** a translation is not available for specific content, **When** viewing in the alternate language, **Then** the content displays in the default language (English) with a notice or falls back gracefully
4. **Given** translated content exists, **When** navigating between languages, **Then** the user stays on the equivalent page (e.g., `/blog/post-title` ↔ `/ar/blog/post-title`)

---

### User Story 6 - Filter Content by Tags (Priority: P3)

As a portfolio visitor, I want to filter blog posts and case studies by topic tags so that I can quickly find content relevant to my interests.

**Why this priority**: Tag-based filtering enhances content discoverability and user experience, but the core content viewing functionality must exist first. It's a valuable enhancement for portfolios with multiple content pieces.

**Independent Test**: Can be fully tested by clicking on a tag in the blog or case studies list and verifying that only content with that tag is displayed, with the ability to clear the filter.

**Acceptance Scenarios**:

1. **Given** blog posts have tags defined in frontmatter, **When** a visitor views the blog list, **Then** all unique tags are displayed as clickable filter options
2. **Given** tag filters are displayed, **When** a visitor clicks on a tag, **Then** the list updates to show only posts containing that tag; clicking the active tag again clears the filter and shows the full unfiltered list
3. **Given** a tag filter is active, **When** the filtered list displays, **Then** a clear visual indicator shows which tag is active with an option to clear the filter
4. **Given** case studies have tags or technology categories, **When** a visitor views case studies, **Then** similar tag-based filtering is available

---

### User Story 7 - Use Interactive Components in Content (Priority: P3)

As a content creator, I want to embed custom interactive components directly in markdown content so that I can create rich, engaging presentations beyond standard markdown.

**Why this priority**: This enhances content quality and differentiation but requires basic content rendering first. Standard markdown is valuable on its own.

**Independent Test**: Can be fully tested by authoring markdown with embedded component syntax (e.g., `::ButtonDemo`) and verifying that the component renders correctly within the content flow.

**Acceptance Scenarios**:

1. **Given** markdown content contains component syntax, **When** the content renders, **Then** the embedded component displays inline with surrounding markdown content
2. **Given** an embedded component requires props or data, **When** the content renders, **Then** the component receives and displays the specified attributes correctly
3. **Given** multiple components are embedded in content, **When** the content renders, **Then** all components function independently without conflicts
4. **Given** a component fails to render, **When** the content displays, **Then** a graceful fallback or error message appears without breaking the entire page

---

### Edge Cases

- What happens when a blog post has no publication date specified?
  - Default to file creation date or current date, with a warning during build
- What happens when a visitor tries to access a draft content URL directly?
  - Return 404 error; draft content (filename starting with underscore) should not generate public routes
- What happens when content markdown contains invalid syntax?
  - Display an error message during development; build should fail with clear error message indicating the problematic file
- What happens when an embedded component doesn't exist?
  - Display a placeholder error message in the content flow without breaking the page
- What happens when content images fail to load?
  - Show alt text and a placeholder icon; ensure content remains readable
- What happens when a visitor navigates to a non-existent content URL?
  - Display a custom 404 page with suggestions to return to blog or case studies list
- What happens when content exceeds reasonable file size?
  - Content should still render but may benefit from pagination or "read more" expansion in future iterations
- What happens when embedded component syntax is malformed?
  - Render the raw syntax as code/text with a warning during development

## Requirements _(mandatory)_

### Functional Requirements

**Content Structure & Organization**

- **FR-001**: System MUST support blog posts stored as markdown files in year-based directories following the pattern `/content/blog/YYYY/post-slug.md`
- **FR-002**: System MUST support case studies stored as markdown files in year-based directories following the pattern `/content/case-studies/YYYY/project-slug.md`
- **FR-003**: Each content file MUST support frontmatter metadata including title, publication date, author, tags, optional excerpt (with auto-generation fallback from first ~150 characters if not provided), and featured image path
- **FR-004**: Content files MUST support standard markdown syntax including headings (H1-H6), paragraphs, lists (ordered/unordered), blockquotes, and links
- **FR-005**: Content files MUST support extended markdown for code blocks with syntax highlighting and language specification

**Content Rendering**

- **FR-006**: System MUST render blog post lists with title, publication date, excerpt, and estimated read time (calculated at 200 words per minute, code blocks weighted 1.5x) for each post
- **FR-007**: System MUST render full blog post detail pages with complete markdown content, proper heading hierarchy, and formatted text
- **FR-008**: System MUST render case study lists with project name, client, role, timeline, and preview image for each case study
- **FR-009**: System MUST render full case study detail pages with structured sections (problem, solution, outcomes, metrics)
- **FR-010**: System MUST apply the established design system (typography, colors, spacing) to all rendered content

**Component Embedding**

- **FR-011**: System MUST support embedding custom interactive components within markdown content using a special syntax
- **FR-012**: Embedded components MUST render inline with surrounding markdown content without layout breaks
- **FR-013**: Embedded components MUST be able to receive and process attributes/props defined in the markdown syntax
- **FR-014**: System MUST gracefully handle missing or invalid component references

**Content Discovery & Navigation**

- **FR-015**: Blog list page MUST display posts in reverse chronological order (newest first)
- **FR-015a**: System MUST exclude content files with filenames starting with underscore (e.g., `_draft-post.md`) from public lists and routes
- **FR-015b**: System MUST provide tag-based filtering on blog and case study list pages, allowing visitors to view content filtered by selected tags
- **FR-015c**: System MUST display all available tags as clickable filter options on list pages
- **FR-015d**: System MUST show active filter state with clear visual indicator and provide option to clear filters
- **FR-016**: Case study list page MUST support featured-first sorting (featured items first, then by date) or chronological ordering
- **FR-017**: Each content detail page MUST include navigation elements (back to list, previous/next content)
- **FR-018**: System MUST generate SEO-friendly URLs for all content (e.g., `/blog/post-slug`, `/case-studies/project-slug`)

**Media & Assets**

- **FR-019**: System MUST support images in content with automatic optimization and responsive sizing
- **FR-020**: System MUST support alt text for all images for accessibility
- **FR-021**: System MUST support lazy loading for images to improve page load performance
- **FR-022**: Images MUST maintain aspect ratios and prevent layout shift during loading

**Internationalization**

- **FR-023**: Content structure MUST support storing translations in separate files or within a locale-specific directory structure
- **FR-024**: System MUST detect and display content in the user's selected language when translations exist
- **FR-025**: System MUST provide fallback to default language (English) when translations are unavailable for specific content
- **FR-026**: RTL text direction MUST be applied when displaying Arabic content

**Performance & Build**

- **FR-027**: Content MUST be processed and validated at build time to catch errors before deployment
- **FR-028**: Invalid markdown or missing required frontmatter MUST generate clear error messages during build
- **FR-029**: Content pages MUST be statically generated for optimal loading performance
- **FR-030**: System MUST generate a content manifest or index for efficient content querying (Note: Auto-generated by Nuxt Content - no manual task required)

### Key Entities

- **Blog Post**: Represents a written article with metadata (title, publication date, author, tags, excerpt, featured image, estimated read time), markdown content body, and optional embedded components
- **Case Study**: Represents a portfolio project showcase with metadata (project name, client/company, role, timeline, technologies, preview image), structured content sections (problem, solution, outcomes, metrics, testimonials), and visual assets
- **Content Metadata**: Frontmatter properties including required fields (title, date) and optional fields (author, tags, excerpt, featured image, custom properties for case studies like client, timeline)
- **Embedded Component**: A reusable interactive element that can be inserted into markdown content with attributes/props for customization

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Visitors can navigate to the blog list page and see all published posts in under 1 second on standard connections
- **SC-002**: Visitors can read a complete blog post with all formatting, code highlighting, and images rendered correctly within 2 seconds of page load
- **SC-003**: Visitors can browse case studies and access full case study details with all media loaded within 3 seconds
- **SC-004**: Content creators can write a new blog post or case study in markdown and see it published after the next build without any manual configuration
- **SC-005**: Embedded custom components in content render and function correctly 100% of the time when proper syntax is used
- **SC-006**: All content images load optimized for the viewport size, reducing bandwidth usage by at least 40% compared to serving full-size images
- **SC-007**: Content pages achieve a Lighthouse performance score of 90+ for static content pages
- **SC-008**: Build process catches and reports 100% of invalid markdown syntax or missing required frontmatter before deployment
