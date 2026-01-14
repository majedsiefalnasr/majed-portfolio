# API Contracts: Content Engine

**Date**: January 13, 2026  
**Feature**: [spec.md](../spec.md) | **Plan**: [plan.md](../plan.md)

This directory contains API contracts for components, composables, pages, and content schemas.

## Contract Files

- [components.md](./components.md) - Component prop interfaces and events
- [composables.md](./composables.md) - Composable function signatures and return types
- [pages.md](./pages.md) - Page route params, query params, and data fetching contracts
- [types.ts](./types.ts) - Shared TypeScript type definitions

## Usage

These contracts serve as the source of truth for:

1. Component API design before implementation
2. Type definitions for TypeScript strict mode
3. Testing mock data structures
4. Documentation generation

All contracts are technology-agnostic descriptions that will be implemented using Vue 3 Composition API, TypeScript, and Nuxt conventions.
