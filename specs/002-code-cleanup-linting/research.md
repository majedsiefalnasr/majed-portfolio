# Research & Decisions: Code Cleanup Linting and Formatting

**Date**: January 19, 2026  
**Feature**: 002-code-cleanup-linting

## Research Tasks

### ESLint Configuration for Nuxt 4 + TypeScript + Vue

**Task**: Find best practices for ESLint in Nuxt 4 projects with TypeScript and Vue 3.

**Findings**:

- Nuxt 4 uses `@nuxt/eslint-config` which extends from `@nuxtjs/eslint-config-typescript`
- Includes Vue 3 essential rules via `eslint-plugin-vue`
- TypeScript rules from `@typescript-eslint/eslint-plugin`
- Recommended: Use flat config format for modern ESLint

**Decision**: Use `@nuxt/eslint-config` with minimal overrides for strict TypeScript compliance.

**Rationale**: Aligns with Constitution V. Type Safety & Code Quality, zero warnings policy.

**Alternatives Considered**:

- Custom config: Too complex for small project
- Vue CLI ESLint: Not Nuxt-specific

### Prettier Configuration for Vue/TypeScript

**Task**: Best practices for Prettier in Vue + TypeScript projects.

**Findings**:

- Standard Prettier config works well with Vue single-file components
- Tailwind CSS plugin recommended for class sorting
- Single quotes for JSX/TSX consistency

**Decision**: Standard Prettier with Tailwind plugin, single quotes, 2-space indentation.

**Rationale**: Minimal config, consistent with Nuxt UI and Tailwind usage.

**Alternatives Considered**:

- Extensive custom rules: Overkill for small project

### Husky + lint-staged Integration

**Task**: Best practices for pre-commit hooks in Nuxt projects.

**Findings**:

- Husky v8+ uses modern git hooks
- lint-staged runs linters only on staged files for performance
- Common pattern: lint-staged runs ESLint and Prettier on commit

**Decision**: Husky v9 with lint-staged, pre-commit hook for linting and formatting.

**Rationale**: Prevents commits with violations, aligns with zero warnings policy.

**Alternatives Considered**:

- Manual pre-commit checks: Less reliable

### Clean Code Practices Enforcement

**Task**: How to enforce clean code principles automatically.

**Findings**:

- ESLint can enforce some rules (max-len, complexity)
- Manual code review for subjective practices
- Focus on automated checks for small project

**Decision**: Basic ESLint rules for code complexity, manual review for principles.

**Rationale**: Keep minimal, not advanced as specified.

**Alternatives Considered**:

- Advanced static analysis tools: Too heavy for small project

## Resolved Clarifications

- ESLint config: Use Nuxt recommended with TypeScript strict
- Prettier config: Standard with Tailwind sorting
- Pre-commit: Husky + lint-staged for staged files
- Clean code: Basic automated rules + manual review

## Dependencies Identified

- @nuxt/eslint-config
- eslint
- prettier
- @prettier/plugin-tailwindcss
- husky
- lint-staged
