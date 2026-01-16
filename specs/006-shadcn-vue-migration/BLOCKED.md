# ⚠️ Implementation BLOCKED - Constitution Violation

**Feature**: shadcn-vue UI Library Migration  
**Branch**: `006-shadcn-vue-migration`  
**Date**: 2026-01-16  
**Status**: 🛑 **BLOCKED** - Requires Constitution Amendment

## Critical Violation

### Constitution Principle I: Tech Stack Mandates - UI Library

**Current Constitution Requirement**:

> UI Library: Nuxt UI v4 (v4.3.0+) — Custom component libraries prohibited unless extending Nuxt UI

**This Migration**:

> Complete replacement of Nuxt UI with shadcn-vue

**Violation Type**: Direct contradiction of mandated technology stack

## Why This Matters

The Constitution exists to ensure consistency, maintainability, and alignment with project goals. Violating the UI library mandate without amendment would:

1. Create precedent for ignoring Constitution principles
2. Potentially fragment the codebase with competing UI patterns
3. Undermine the governance process established for the project

## Resolution Options

Before implementation can proceed, the project owner must choose ONE of the following:

### Option 1: Amend Constitution (RECOMMENDED)

Update `.specify/memory/constitution.md` to change the UI Library mandate:

```markdown
### I. Tech Stack Mandates (NON-NEGOTIABLE)

- **UI Library**: shadcn-vue — CLI-based component installation with Radix Icons
```

**Rationale for Amendment**:

- User explicitly requested shadcn-vue migration
- shadcn-vue provides direct component ownership (copy-paste approach)
- Better customization control and modern component-driven architecture
- Enables use of shadcn MCP server for AI-assisted component generation

### Option 2: Document Approved Exception

Add an exception clause to the Constitution:

```markdown
### Approved Exceptions

- **shadcn-vue Migration (2026-01-16)**: Approved replacement of Nuxt UI with shadcn-vue
  - Rationale: [User-requested architectural improvement, component ownership benefits]
  - Scope: Portfolio project only
  - Review: Annual review to assess migration success
```

### Option 3: Cancel Migration

Abandon this feature branch and retain Nuxt UI as the mandated UI library.

## Implementation Plan Status

The implementation plan has been partially generated but is **BLOCKED** at:

- ✅ Technical Context filled
- ✅ Constitution Check performed
- ✅ Project Structure documented
- ❌ **BLOCKED**: Phase 0 Research cannot proceed
- ❌ **BLOCKED**: Phase 1 Design cannot proceed
- ❌ **BLOCKED**: Phase 2 Implementation cannot proceed

## Next Steps

1. **Project Owner Decision**: Choose Option 1, 2, or 3 above
2. **If Option 1 or 2**: Update Constitution file with amendment/exception
3. **After Constitution Update**: Re-run `/speckit.plan` to continue with Phase 0 Research
4. **If Option 3**: Close this feature branch and delete specification

## Contact

This blocking issue requires project owner decision. The planning process cannot continue until the Constitution violation is resolved.

**Files Generated**:

- [x] `spec.md` - Feature specification (complete)
- [x] `plan.md` - Implementation plan (partial - blocked at Constitution Check)
- [ ] `research.md` - BLOCKED
- [ ] `data-model.md` - BLOCKED
- [ ] `contracts/` - BLOCKED
- [ ] `quickstart.md` - BLOCKED

---

_This file will be deleted once the Constitution issue is resolved and planning resumes._
