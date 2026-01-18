# Quickstart: Code Cleanup & Performance

## Prerequisites

- Bun installed (project runtime)

## Setup

1. Install dependencies: `bun install`
2. Start dev server: `bun run dev`

## Verification

1. Open primary pages: `/`, `/blog`, `/blog/[slug]`, `/case-studies`, `/case-studies/[slug]`.
2. Confirm layout and content match pre-cleanup behavior.
3. Run tests: `bun run test`.
4. Build static output: `bun run generate`.
5. Validate SEO checks if applicable: `scripts/validate-seo.sh`.

## Performance Validation

- Run Lighthouse with targets: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95.
- Verify primary pages are usable within 2 seconds on a standard broadband connection.
