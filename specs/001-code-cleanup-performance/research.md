# Research: Code Cleanup & Performance

## Decision 1: Cleanup scope includes app/, content/, public/

**Decision**: Limit cleanup to app/, content/, and public/ assets to reduce unused code and assets while preserving UX and content behavior.

**Rationale**: The main sources of unused UI code, content, and static assets live in these directories. Limiting scope reduces risk while meeting performance and readability goals.

**Alternatives considered**:

- Expand to entire repo (scripts/, server/, docs/): rejected to avoid risk of removing non-UX support tooling.
- App-only cleanup: rejected because unused assets in content/ and public/ are common contributors to bloat.

## Decision 2: Remove legacy speckit specs and speckit-related comments/docs

**Decision**: Delete all specs under specs/ except specs/001-code-cleanup-performance and remove comments/docs referencing speckit prompts/spec workflow.

**Rationale**: This meets the requested cleanup target and reduces maintenance noise without affecting runtime behavior.

**Alternatives considered**:

- Keep legacy specs for historical context: rejected because explicit user request mandates removal.
- Remove all comments: rejected to preserve useful code documentation.

## Decision 3: Performance validation aligned with Lighthouse and 2s usability target

**Decision**: Use Lighthouse thresholds (Perf/A11y/SEO ≥ 95) and “primary pages usable within 2s” as validation gates.

**Rationale**: These targets are aligned with the project constitution and provide objective performance measurement.

**Alternatives considered**:

- Only measure bundle size: rejected because user experience is not fully captured by bundle size alone.
- Use only lab metrics: rejected because on-page usability (TTI) is a critical outcome.

## Decision 4: Maintain existing Nuxt stack and file-based content

**Decision**: No changes to the stack; retain Nuxt Content v3 for content and Nuxt Image for image handling.

**Rationale**: The cleanup is structural, not architectural. Preserving the stack avoids breaking changes and respects constitution mandates.

**Alternatives considered**:

- Replace content engine or introduce a DB: rejected as out of scope.
- Introduce new performance tooling: deferred; focus on cleanup first.
