# Feature Specification: SEO Optimization with Best Practices

**Feature Branch**: `005-seo-optimization`  
**Created**: January 15, 2026  
**Status**: Draft  
**Input**: User description: "SEO implement with the best practises to make sure static pages and denamic (blog and case studies)"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Search Engine Discovery (Priority: P1)

When search engines crawl the portfolio website, they can efficiently discover, index, and rank all pages including static pages (homepage, about), blog posts, and case studies. The site provides clear signals about content structure, relevance, and quality through proper metadata and semantic markup.

**Why this priority**: This is the foundation of SEO - without proper discoverability and indexing, the site won't appear in search results at all. This delivers immediate value by making the content findable.

**Independent Test**: Can be fully tested by submitting the sitemap to Google Search Console and verifying that all pages are indexed within 72 hours, and checking that meta tags are properly rendered in search results.

**Acceptance Scenarios**:

1. **Given** a search engine bot visits the homepage, **When** it crawls the site, **Then** it discovers all blog posts and case studies through the sitemap
2. **Given** a blog post is published, **When** search engines crawl it, **Then** they find properly formatted title tags, meta descriptions, and structured data
3. **Given** a case study page is accessed, **When** viewed in search results, **Then** it displays a rich snippet with title, description, and publication date
4. **Given** the site has both English and Arabic content, **When** search engines index pages, **Then** they correctly identify the language of each page and serve it to appropriate regional searches

---

### User Story 2 - Social Media Sharing Optimization (Priority: P2)

When users share blog posts or case studies on social media platforms (LinkedIn, Twitter, Facebook), the shared links display rich preview cards with compelling images, titles, and descriptions that encourage clicks.

**Why this priority**: Social sharing drives significant traffic and improves SEO through social signals. Optimized previews increase click-through rates by 2-3x.

**Independent Test**: Can be fully tested by sharing a blog post URL on LinkedIn, Twitter, and Facebook, and verifying that each platform displays the correct preview image, title, and description.

**Acceptance Scenarios**:

1. **Given** a user shares a blog post on LinkedIn, **When** the preview generates, **Then** it shows the featured image, compelling title, and full excerpt
2. **Given** a case study is shared on Twitter, **When** the card displays, **Then** it includes the project thumbnail, client name, and project summary
3. **Given** content is shared in Arabic, **When** previews generate, **Then** the text displays correctly with RTL formatting

---

### User Story 3 - Organic Search Visibility (Priority: P1)

When potential clients or readers search for topics related to the portfolio's expertise, blog posts and case studies appear in search results with optimized titles and descriptions that accurately reflect the content and encourage clicks.

**Why this priority**: This directly impacts traffic acquisition and business goals. Improved search visibility leads to more visitors, potential clients, and professional opportunities.

**Independent Test**: Can be fully tested by tracking search rankings for target keywords and measuring organic click-through rates from Google Search Console.

**Acceptance Scenarios**:

1. **Given** a user searches for "[technology] tutorial" in Google, **When** a relevant blog post exists, **Then** it appears in results with a compelling, keyword-optimized title and description
2. **Given** a potential client searches for "[service type] case study", **When** results display, **Then** relevant case studies appear with client testimonials in rich snippets
3. **Given** search results display, **When** title length exceeds 60 characters, **Then** it's truncated gracefully without cutting off important keywords
4. **Given** meta descriptions exceed 160 characters, **When** displayed in results, **Then** the most important information appears in the visible portion

---

### User Story 4 - Page Performance for SEO (Priority: P2)

When search engines evaluate page quality, the site meets Core Web Vitals standards with fast load times, minimal layout shifts, and quick interactivity, which positively impacts search rankings.

**Why this priority**: Page experience is a confirmed ranking factor for Google. Good performance improves both SEO and user experience, creating a competitive advantage.

**Independent Test**: Can be fully tested by running Lighthouse audits and PageSpeed Insights, verifying scores above 90 for performance and meeting all Core Web Vitals thresholds.

**Acceptance Scenarios**:

1. **Given** a blog post page loads, **When** measured by Lighthouse, **Then** it achieves a performance score above 90
2. **Given** a case study with images loads, **When** Core Web Vitals are measured, **Then** LCP is under 2.5 seconds, FID under 100ms, and CLS under 0.1
3. **Given** images are present, **When** the page loads, **Then** all images have width/height attributes to prevent layout shifts

---

### User Story 5 - Canonical URLs and Duplicate Content Prevention (Priority: P3)

When the same content might be accessible through multiple URLs (e.g., with/without trailing slashes, different language versions), the site provides clear canonical URL signals to prevent duplicate content penalties.

**Why this priority**: While important for SEO health, this is less critical than core discoverability and can be implemented after the foundation is solid.

**Independent Test**: Can be fully tested by accessing content through various URL patterns and verifying that canonical tags always point to the preferred version.

**Acceptance Scenarios**:

1. **Given** a blog post URL with a trailing slash, **When** the canonical tag is checked, **Then** it points to the URL without trailing slash
2. **Given** an Arabic version of a case study, **When** inspected, **Then** it includes hreflang tags linking to the English version and vice versa
3. **Given** paginated blog listings, **When** viewing page 2, **Then** it includes proper rel="next" and rel="prev" tags

---

### Edge Cases

- What happens when a blog post has no featured image? (Use default 1200x630 pixel OG image with branding)
- What happens when meta descriptions are missing? (Auto-generate from excerpt, limited to 160 characters)
- How does the system handle very long blog post titles that exceed 60 characters? (Truncate gracefully with ellipsis, preserve key terms at start)
- What happens when case studies have no metrics or testimonials? (Exclude structured data rather than showing empty fields)
- How are 404 pages handled for SEO? (Custom 404 with proper status code, helpful navigation, internal search)
- What happens when content language cannot be determined? (Default to English, log warning)
- How does the system handle dynamic route changes in blog posts? (Implement 301 redirects to preserve link equity)

## Requirements _(mandatory)_

### Functional Requirements

**Meta Tags & Open Graph**

- **FR-001**: System MUST generate unique, descriptive title tags for every page (homepage, blog posts, case studies, blog index, case study index)
- **FR-002**: System MUST generate unique meta descriptions for every page, limited to 155-160 characters
- **FR-003**: System MUST include Open Graph tags (og:title, og:description, og:image, og:type, og:url) on all pages
- **FR-004**: System MUST include Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image) on all pages
- **FR-005**: System MUST use the blog post's featured image as the og:image, falling back to a default 1200x630 pixel image if none exists
- **FR-006**: System MUST use the case study's project image as the og:image, falling back to a default 1200x630 pixel image if none exists

**Structured Data (Schema.org)**

- **FR-007**: System MUST include JSON-LD structured data for blog posts using Article schema
- **FR-008**: Blog post structured data MUST include headline, author, datePublished, dateModified (if applicable), and image
- **FR-009**: System MUST include JSON-LD structured data for case studies using CreativeWork schema
- **FR-010**: Case study structured data MUST include name, description, author, datePublished, and keywords
- **FR-011**: Homepage MUST include Person schema with name, description, jobTitle, and social profile links (sameAs property)
- **FR-012**: System MUST include BreadcrumbList schema on blog posts and case studies to show navigation hierarchy

**Canonical URLs & Internationalization**

- **FR-013**: System MUST include canonical link tags on all pages pointing to the preferred URL version without trailing slashes (e.g., /blog/post-title not /blog/post-title/)
- **FR-014**: System MUST include hreflang tags for bilingual content, linking English and Arabic versions
- **FR-015**: System MUST set the html lang attribute correctly for each page based on content language
- **FR-016**: System MUST ensure Arabic pages include dir="rtl" attribute on the html element

**Sitemaps & Robots**

- **FR-017**: System MUST generate an XML sitemap including all public pages (excluding drafts and private content)
- **FR-018**: XML sitemap MUST include lastmod dates based on content modification times and changefreq values: homepage (weekly), blog index (weekly), blog posts (monthly), case studies (yearly)
- **FR-019**: XML sitemap MUST set priority values: homepage (1.0), blog index (0.9), case study index (0.9), blog posts (0.8), case studies (0.8)
- **FR-020**: System MUST generate a robots.txt file allowing all major search engines to crawl the site
- **FR-021**: Robots.txt MUST reference the sitemap location

**Performance Optimization for SEO**

- **FR-022**: System MUST implement lazy loading for images below the fold
- **FR-023**: System MUST include width and height attributes on all images to prevent Cumulative Layout Shift
- **FR-024**: System MUST optimize images for web (WebP format with fallbacks, appropriate compression)
- **FR-025**: System MUST implement proper heading hierarchy (single h1, followed by h2, h3, etc.) on all pages
- **FR-026**: System MUST preconnect to critical third-party domains (fonts, analytics) in the HTML head

**Content SEO Requirements**

- **FR-027**: Blog posts MUST allow authors to customize SEO title and meta description separately from the display title, with real-time character count feedback and warnings when outside optimal ranges
- **FR-028**: Case studies MUST allow customization of SEO title and meta description, with real-time character count feedback and warnings when outside optimal ranges
- **FR-029**: System MUST automatically generate slugs from titles, ensuring they are URL-safe and lowercase (NOTE: Nuxt Content provides this by default; verify or implement custom utility if custom logic needed)
- **FR-030**: System SHOULD display warnings when titles are outside 30-60 character range, but MUST NOT block content saving
- **FR-031**: System SHOULD display warnings when meta descriptions are outside 120-160 character range, but MUST NOT block content saving

### Key Entities

- **SEO Metadata**: Title, meta description, canonical URL, OG tags, Twitter Card tags, language, and direction (LTR/RTL) associated with each page
- **Structured Data**: JSON-LD schema markup for Articles, CreativeWork, Person, and BreadcrumbList
- **Sitemap Entry**: URL, last modification date, change frequency, and priority for each indexable page
- **Image Metadata**: Alt text, dimensions (width/height), format, and source URL for SEO-optimized images

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: All public pages achieve a Lighthouse SEO score of 95 or higher
- **SC-002**: 100% of blog posts and case studies are indexed by Google within 7 days of publication
- **SC-003**: All pages load with Largest Contentful Paint (LCP) under 2.5 seconds
- **SC-004**: All pages maintain Cumulative Layout Shift (CLS) below 0.1
- **SC-005**: Social media shares display correct preview images and text with 100% accuracy across LinkedIn, Twitter, and Facebook
- **SC-006**: Organic search impressions increase by 50% within 3 months of implementation
- **SC-007**: Average click-through rate from search results improves to above 3.5%
- **SC-008**: XML sitemap includes 100% of public content with accurate last-modified dates
- **SC-009**: All critical pages (homepage, blog index, case study index) achieve First Input Delay (FID) under 100ms
- **SC-010**: Rich snippets appear in search results for at least 80% of blog posts and case studies within 30 days

## Clarifications

### Session 2026-01-15

- Q: When a blog post or case study author provides custom SEO title and meta description (FR-027, FR-028), how should the system handle validation if they don't meet the optimal length requirements (30-60 characters for titles, 120-160 for descriptions)? → A: Warning validation - Allow saving but show warnings in editor with character counts
- Q: For the default OG image used when blog posts or case studies have no featured image, what dimensions should this fallback image use to ensure optimal display across all social platforms? → A: 1200x630 pixels (Facebook/LinkedIn recommended ratio)
- Q: For the XML sitemap change frequency (FR-018), what values should be used for different page types to accurately signal update patterns to search engines? → A: Homepage: weekly, Blog index: weekly, Blog posts: monthly, Case studies: yearly
- Q: For homepage SEO (FR-011), should the structured data use Person schema or Organization schema? → A: Person schema (individual professional portfolio)
- Q: For canonical URL format (FR-013), should URLs include or exclude trailing slashes? → A: Exclude trailing slashes (e.g., /blog/post-title)

## Assumptions

1. **Default Language**: When language is not specified in content frontmatter, the system defaults to English
2. **Image Formats**: The system supports JPEG, PNG, and WebP formats, with automatic WebP conversion for modern browsers
3. **Featured Images**: All new blog posts and case studies should include a featured image; existing content without featured images uses a default branded image
4. **Sitemap Generation**: Sitemaps are generated at build time for static site generation, ensuring up-to-date content links
5. **Search Console Setup**: Google Search Console and Bing Webmaster Tools are configured to monitor indexing and search performance
6. **Analytics Integration**: Basic analytics (Google Analytics or privacy-focused alternative) is integrated to track organic search traffic
7. **Update Frequency**: Blog posts are published weekly, case studies monthly; sitemap reflects these change frequencies
8. **Target Audience**: Primary audience is English-speaking, with secondary Arabic-speaking audience
9. **Social Platforms**: Primary social sharing focus is LinkedIn (professional network), Twitter (tech community), and Facebook (general audience)
10. **Performance Budget**: Page weight should not exceed 1MB for initial load to maintain fast performance on mobile networks
11. **404 Error Handling**: Custom 404 pages will include proper SEO metadata (noindex directive) and helpful navigation, implemented via Nuxt error.vue
