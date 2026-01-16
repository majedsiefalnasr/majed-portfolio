# Implementation Plan: shadcn-vue UI Library Migration

**Branch**: `006-shadcn-vue-migration` | **Date**: 2026-01-16 | **Spec**: [spec.md](./spec.md)  
**Status**: ✅ **PHASE 1 COMPLETE** - Research and design artifacts generated  
**Input**: Feature specification from `/specs/006-shadcn-vue-migration/spec.md`

**Phase Status**:

- ✅ Phase 0: Research completed (research.md generated with 6 design decisions)
- ✅ Phase 1: Design completed (data-model.md, contracts/, quickstart.md generated)
- ⏳ Phase 2: Tasks generation pending (requires separate `/speckit.tasks` command)

**Constitution Status**: Violation identified and justified in Complexity Tracking section. User explicitly requested migration despite Constitution mandate.

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Replace Nuxt UI component library with shadcn-vue across the entire portfolio site. This migration adopts shadcn-vue's CLI-based component installation approach, Radix Icons, and default theming system while preserving all functional behavior, responsive design, dark/light theme switching, RTL support, and accessibility standards. The migration will be executed as a single comprehensive replacement with no gradual or hybrid approach.

## Technical Context

**Language/Version**: TypeScript (strict mode), Vue 3, Nuxt 4  
**Primary Dependencies**: shadcn-vue (CLI-based), Radix Icons, Tailwind CSS, Nuxt Content v3, @nuxtjs/i18n  
**Storage**: N/A (static site, content in markdown files)  
**Testing**: None required per clarifications (manual testing only)  
**Target Platform**: Web (SSG/Hybrid rendering, multiple browsers, mobile-responsive)
**Project Type**: Web application (Nuxt 4 framework)  
**Performance Goals**: Lighthouse Performance ≥90, Accessibility ≥95, SEO ≥95, Theme switch <200ms  
**Constraints**: Zero console errors, RTL support for Arabic, bundle size within 5% of current  
**Scale/Scope**: Portfolio site with ~14 Vue components, blog posts, case studies, bilingual (en/ar)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

⚠️ **CRITICAL VIOLATION DETECTED**

### Principle I: Tech Stack Mandates - UI Library

**Constitution Requirement**: "UI Library: Nuxt UI v4 (v4.3.0+) — Custom component libraries prohibited unless extending Nuxt UI"

**This Feature**: Migrates from Nuxt UI to shadcn-vue (complete replacement)

**Status**: ❌ **VIOLATION** - Requires Constitution amendment or explicit justification

**Justification Required**: This migration fundamentally changes the UI library from Nuxt UI to shadcn-vue. This violates the Constitution's Tech Stack Mandate (Principle I) which explicitly requires Nuxt UI and prohibits custom component libraries.

**Recommendation**: Before proceeding with implementation:

1. **Amend Constitution** to allow shadcn-vue as the mandated UI library, OR
2. **Document explicit exception** in the Constitution with rationale for this specific project decision, OR
3. **Reconsider this migration** and remain with Nuxt UI

### Additional Constitution Compliance

✅ **Runtime**: Bun - Maintained (no changes)  
✅ **Framework**: Nuxt 4 - Maintained (no changes)  
✅ **Styling**: Tailwind CSS - Maintained (shadcn-vue uses Tailwind)  
✅ **Content**: Nuxt Content v3 - Maintained (no changes)  
✅ **Language**: TypeScript strict mode - Maintained (no changes)  
✅ **Performance**: Lighthouse scores ≥95/95/95/90 - Required per spec success criteria  
✅ **i18n**: English/Arabic RTL support - Maintained per FR-005  
✅ **SEO**: Meta tags, structured data - Maintained (no changes to SEO layer)  
✅ **Type Safety**: Strict TypeScript - Maintained per FR-013

**Re-evaluation After Phase 1 Design**: Constitution Check must be re-run after contracts and data model are generated to ensure no additional violations are introduced.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
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
├── components/
│   ├── ui/                    # NEW: shadcn-vue components (CLI-installed)
│   │   ├── button.vue
│   │   ├── card.vue
│   │   └── [other shadcn components]
│   ├── blog/
│   │   ├── BlogPostCard.vue   # MODIFIED: Update to use shadcn-vue components
│   │   ├── BlogList.vue       # MODIFIED: Update to use shadcn-vue components
│   │   └── BlogPostMeta.vue   # MODIFIED: Update to use shadcn-vue components
│   ├── case-study/
│   │   ├── CaseStudyCard.vue  # MODIFIED: Update to use shadcn-vue components
│   │   ├── CaseStudyList.vue  # MODIFIED: Update to use shadcn-vue components
│   │   └── CaseStudyMetrics.vue # MODIFIED: Update to use shadcn-vue components
│   ├── content/
│   │   └── [MDC components - minimal changes]
│   ├── AppHeader.vue          # MODIFIED: Replace Nuxt UI with shadcn-vue
│   ├── AppFooter.vue          # MODIFIED: Replace Nuxt UI with shadcn-vue
│   └── AppContainer.vue       # MODIFIED: Replace Nuxt UI with shadcn-vue
├── composables/
│   ├── useTheme.ts            # MODIFIED: Adapt for shadcn-vue theming
│   └── [other composables - minimal/no changes]
├── assets/
│   └── css/
│       ├── main.css           # MODIFIED: Remove Nuxt UI imports, add shadcn-vue styles
│       └── tokens.css         # MODIFIED: Replace with shadcn-vue CSS variables
├── pages/
│   └── [minimal/no changes - use updated components]
└── types/
    └── [minimal changes for shadcn-vue component types]

content/                        # NO CHANGES (markdown content unchanged)
nuxt.config.ts                  # MODIFIED: Remove @nuxt/ui module, add shadcn-vue config
package.json                    # MODIFIED: Remove @nuxt/ui, add shadcn-vue dependencies
tailwind.config.ts              # MODIFIED: Update for shadcn-vue theming
components.json                 # NEW: shadcn-vue CLI configuration
```

**Structure Decision**: This is a Nuxt 4 web application following the existing directory structure. The migration adds a dedicated `app/components/ui/` directory for shadcn-vue CLI-installed components (per clarifications) and modifies existing custom components to consume the new UI primitives. The core Nuxt structure (pages/, composables/, content/) remains unchanged, with updates focused on the component and styling layers.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                        | Why Needed                                                                                                                                                                              | Simpler Alternative Rejected Because                                                                                                                                               |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI Library: Nuxt UI → shadcn-vue | User explicitly requested shadcn-vue migration. shadcn-vue provides copy-paste component ownership, better customization control, and aligns with modern component-driven architecture. | Extending Nuxt UI would not provide the architectural benefits of component ownership, direct code access for customization, and the MCP server integration requested by the user. |

**Note**: This violation has been justified by explicit user request. The user chose to proceed with shadcn-vue migration despite Constitution mandate for Nuxt UI.

---

## Phase 0: Research (COMPLETED)

**Output**: [research.md](./research.md)

**Status**: ✅ **COMPLETE**

**Design Decisions Made**:

1. **CLI Installation**: Use `npx shadcn-vue@latest init` for setup and component-by-component installation
2. **Icon Library**: Radix Icons via @iconify/vue with @iconify-json/radix-icons package
3. **Theming**: Adopt shadcn-vue default theme with oklch CSS variables (no preservation of custom tokens)
4. **Component Mapping**: UCard → Card + subcomponents, UButton → Button + Icon slots
5. **Nuxt Config**: Remove @nuxt/ui module, keep @nuxtjs/color-mode
6. **Dependencies**: Remove @nuxt/ui, add @iconify packages, radix-vue, class-variance-authority, clsx, tailwind-merge

**All NEEDS CLARIFICATION items from Technical Context resolved**. See [research.md](./research.md) for full rationale and alternatives.

---

## Phase 1: Design (COMPLETED)

**Outputs**:

- [data-model.md](./data-model.md) - Component structure documentation
- [contracts/](./contracts/) - Before→After transformation patterns
- [quickstart.md](./quickstart.md) - Developer setup guide
- Agent context updated via `update-agent-context.sh`

**Status**: ✅ **COMPLETE**

**Artifacts Generated**:

### data-model.md

Documented 9 component entities with TypeScript interfaces:

- Button (props, slots, usage patterns)
- Card family (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- DropdownMenu family (DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator)
- Icon (Iconify integration with Radix Icons)
- Badge, Alert (additional shadcn components)
- BlogPostCard, CaseStudyCard, AppHeader (custom components requiring migration)

### contracts/

Created 5 migration contract files:

- [button.contract.ts](./contracts/button.contract.ts) - UButton → Button + Icon transformation
- [card.contract.ts](./contracts/card.contract.ts) - UCard → Card composition patterns
- [dropdown.contract.ts](./contracts/dropdown.contract.ts) - UDropdown → DropdownMenu transformation
- [icon.contract.ts](./contracts/icon.contract.ts) - Heroicons → Radix Icons mapping (with ICON_MAPPING table)
- [theme.contract.ts](./contracts/theme.contract.ts) - Nuxt UI theme → shadcn-vue CSS variables

Each contract includes:

- Before/After API comparison
- 10+ migration patterns with code examples
- Migration checklist (10-15 items)
- Common pitfalls (5+ anti-patterns with corrections)

### quickstart.md

Comprehensive developer guide with:

- Installation steps (CLI init, icon dependencies, Nuxt UI removal)
- Configuration (Tailwind config, CSS variables, components.json)
- Adding components (CLI workflow)
- First component usage (Button, Card examples)
- Migration workflow (file-by-file strategy, priority order)
- Testing checklist (visual, functional, RTL, accessibility, TypeScript)
- Troubleshooting (6 common issues with solutions)

### Agent Context Update

Successfully updated `.github/agents/copilot-instructions.md` with:

- Language: TypeScript (strict mode), Vue 3, Nuxt 4
- Framework: shadcn-vue (CLI-based), Radix Icons, Tailwind CSS, Nuxt Content v3, @nuxtjs/i18n
- Database: N/A (static site, content in markdown files)

**Constitution Re-evaluation**: No additional violations introduced by Phase 1 design. The UI library change remains the only violation, which has been justified.

---

## Phase 2: Tasks (PENDING)

**Output**: tasks.md (generated by `/speckit.tasks` command)

**Status**: ⏳ **NOT STARTED** - Requires separate command invocation

**Next Steps**:

1. Run `/speckit.tasks` command to generate tasks.md
2. tasks.md will break down implementation into actionable phases with:
   - Detailed task breakdown (CLI setup, component installation, file-by-file migration)
   - Testing requirements per task
   - Success criteria per phase
   - Dependency ordering between tasks

**Note**: This plan command ends after Phase 1 completion per workflow specification. Task generation is a separate workflow step.

1. Update Constitution to mandate shadcn-vue as the new UI library
2. Document this as an approved exception with rationale
3. Reconsider the migration and remain with Nuxt UI
