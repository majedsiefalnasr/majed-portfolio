# Implementation Plan: Code Cleanup & Performance

**Branch**: `001-code-cleanup-performance` | **Date**: January 17, 2026 | **Spec**: [specs/001-code-cleanup-performance/spec.md](specs/001-code-cleanup-performance/spec.md)
**Input**: Feature specification from [specs/001-code-cleanup-performance/spec.md](specs/001-code-cleanup-performance/spec.md)

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Improve site performance and maintainability by removing unused code, assets, and speckit-related documentation while preserving current user-facing behavior. The cleanup targets app/, content/, and public/ and aligns performance validation with Lighthouse and page usability thresholds.

## Technical Context

**Language/Version**: TypeScript 5.6.3 (Nuxt 4.2.2 / Vue 3.5.26)  
**Primary Dependencies**: Nuxt 4, Nuxt Content v3, Nuxt Image, Nuxt i18n, Nuxt SEO, Tailwind CSS, Zod  
**Storage**: File-based Markdown content in content/ (Nuxt Content v3)  
**Testing**: Vitest, @nuxt/test-utils, happy-dom  
**Target Platform**: Web (SSG/hybrid rendering per Nuxt configuration)  
**Project Type**: Web application (Nuxt 4)  
**Performance Goals**: Lighthouse ≥ 95 (Perf/A11y/SEO), primary pages usable ≤ 2s for 95% of visits  
**Constraints**: Preserve existing UX and routes, remove unused items only, remove legacy speckit specs/comments, cleanup scope limited to app/, content/, public/, specs/, .github/prompts/, README.md, and docs/  
**Scale/Scope**: Personal portfolio site with blog and case studies

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **Tech Stack Mandates**: PASS — Nuxt 4 + Bun + TypeScript + Nuxt Content + Tailwind preserved.
- **Performance-First**: PASS — targets align with Lighthouse thresholds and 2s usability requirement.
- **Internationalization (i18n)**: PASS — no changes to i18n behavior; ensure cleanups don’t remove translations.
- **SEO & Accessibility**: PASS — no SEO regression; maintain structured data and metadata.
- **Type Safety & Code Quality**: PASS — cleanup preserves strict TypeScript and linting rules.

**Post-Design Check**: PASS — design artifacts add no stack deviations.

## Project Structure

### Documentation (this feature)

```text
specs/001-code-cleanup-performance/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── assets/
│   └── css/
├── components/
├── composables/
├── pages/
├── types/
└── utils/

content/
├── blog/
└── case-studies/

public/
└── images/

server/
└── api/
  └── __sitemap__/

i18n/
```

**Structure Decision**: Web application using Nuxt 4 with app/ as the main code root. The constitution-mandated directories (components/, pages/, composables/, assets/, types/) are represented within app/.

## Complexity Tracking

No constitution violations detected.

## Phase 0: Research

- Confirm cleanup scope (app/, content/, public/).
- Identify best practices for Nuxt cleanup and performance validation.
- Define approach for removing legacy speckit specs and comments.

## Phase 1: Design & Contracts

- Document data model impact (no new entities; clarify existing content and asset types).
- Confirm there are no API contract changes.
- Define verification steps (performance, navigation, content integrity).

## Phase 2: Implementation Plan

- Inventory unused files/assets in app/, content/, public/ and remove safely.
- Remove legacy speckit specs (all specs except specs/001-code-cleanup-performance).
- Remove speckit-related comments/docs from remaining code/docs.
- Refactor for readability where needed without changing behavior.
- Validate pages, links, and performance against success criteria.
