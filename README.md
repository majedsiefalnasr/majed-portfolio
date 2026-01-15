# Majed's Portfolio

A modern, bilingual portfolio website showcasing technical blog posts and case studies. Built with Nuxt 4, TypeScript, and Tailwind CSS.

## Features

- 📝 **Content Management**: Markdown-based blog posts and case studies with Nuxt Content
- 🌐 **Bilingual Support**: English and Arabic content with RTL support
- 🎨 **Modern Design**: Responsive UI built with Tailwind CSS
- 🔍 **SEO Optimized**: Meta tags, Open Graph, and structured data
- 🎯 **Type Safe**: Full TypeScript support with strict mode
- 🤖 **AI Content Generation**: GitHub Copilot agent for creating content
- ⚡ **Fast**: Server-side rendering with Nuxt 4
- ✅ **Well Tested**: Comprehensive test coverage with Vitest

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3)
- **Content**: [Nuxt Content v3](https://content.nuxt.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript (strict mode)
- **Testing**: [Vitest](https://vitest.dev/)
- **Runtime**: [Bun](https://bun.sh/) 1.3.5
- **Validation**: [Zod](https://zod.dev/) for runtime type checking

## Quick Start

### Prerequisites

- Bun 1.3.5 or higher
- Node.js 20+ (for compatibility)
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd majed-portfolio

# Install dependencies
bun install
```

### Development

```bash
# Start the development server
bun run dev

# Run tests
bun test

# Run tests in watch mode
bun test --watch

# Type check
bun run typecheck

# Lint
bun run lint
```

Visit `http://localhost:3000` to see your portfolio.

## Content Generation with AI

This portfolio includes a powerful GitHub Copilot agent for creating blog posts and case studies.

### Quick Usage

1. Open GitHub Copilot Chat in VS Code
2. Type `@content-generator` to start the agent
3. Follow the interactive prompts to create content

**Example commands**:

```
@content-generator create a new blog post about TypeScript
@content-generator generate a case study for my latest project
@content-generator help me write a tutorial
```

### Key Features

- **Interactive Workflow**: Step-by-step metadata collection
- **AI-Powered Writing**: Generate high-quality content with AI
- **Bilingual Support**: Create content in English, Arabic, or both
- **Template System**: Use predefined templates (default, tutorial) or create custom ones
- **Content Refinement**: Preview and refine content up to 5 iterations
- **SEO Optimization**: Automatic tag suggestions, excerpt generation, and validation
- **Conflict Detection**: Smart file path resolution with rename/overwrite options

### Documentation

- **Usage Guide**: [specs/004-content-generation-agent/USAGE.md](specs/004-content-generation-agent/USAGE.md)
- **Examples**: See [specs/004-content-generation-agent/examples/](specs/004-content-generation-agent/examples/)
  - [Sample Blog Post](specs/004-content-generation-agent/examples/sample-blog-post.md)
  - [Sample Case Study](specs/004-content-generation-agent/examples/sample-case-study.md)

## Project Structure

```
majed-portfolio/
├── app/
│   ├── components/        # Vue components
│   ├── composables/       # Vue composables
│   ├── pages/             # Nuxt pages
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
│       └── content-generator/  # Content generation utilities
├── content/
│   ├── blog/              # Blog posts (markdown)
│   └── case-studies/      # Case studies (markdown)
├── specs/                 # Feature specifications
│   ├── 001-global-setup/
│   ├── 002-ui-design-system/
│   ├── 003-content-engine/
│   └── 004-content-generation-agent/
├── test/                  # Test files
├── i18n/                  # Internationalization
└── public/                # Static assets
```

## Content Structure

### Blog Posts

Create blog posts in `content/blog/YYYY/slug.md`:

```yaml
---
title: 'Your Blog Post Title'
date: 2025-01-15
author: 'Majed Siefalnaser'
tags: ['typescript', 'nuxt', 'vue']
excerpt: 'A brief description of the blog post...'
lang: 'en'
---
Your content here...
```

For Arabic version, create `slug.ar.md` with `lang: 'ar'`.

### Case Studies

Create case studies in `content/case-studies/slug.md`:

```yaml
---
title: 'Project Title'
client: 'Client Name'
date: 2025-01-15
role: 'Your Role'
timeline: 'Project Duration'
tags: ['technology', 'tags']
excerpt: 'Brief project description...'
lang: 'en'
testimonial:
  quote: 'Client testimonial...'
  author: 'Client Name'
  position: 'Client Position'
metrics:
  - label: 'Performance Improvement'
    value: '50%'
---
Your case study content...
```

## Development Guidelines

### Code Style

- Use TypeScript strict mode
- Follow Vue 3 Composition API patterns
- Use Zod for runtime validation
- Write tests for new utilities
- Keep components small and focused

### Testing

```bash
# Run all tests
bun test

# Watch mode
bun test --watch

# Coverage report
bun test --coverage
```

### Adding New Features

1. Create specification in `specs/00X-feature-name/`
2. Write tests first (TDD approach)
3. Implement utilities in `app/utils/`
4. Create components in `app/components/`
5. Update documentation

## Building for Production

```bash
# Build the application
bun run build

# Preview production build locally
bun run preview
```

The build output will be in `.output/` directory.

## Deployment

This project can be deployed to:

- **Vercel**: Zero-config deployment
- **Netlify**: Static site generation
- **Cloudflare Pages**: Edge deployment
- **Any Node.js hosting**: Using `.output/` directory

See [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment) for details.

## Contributing

This is a personal portfolio project, but feedback and suggestions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Copyright © 2025 Majed Siefalnaser. All rights reserved.

## Contact

- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Your Name](https://linkedin.com/in/yourprofile)

---

Built with ❤️ using Nuxt 4 and modern web technologies.
