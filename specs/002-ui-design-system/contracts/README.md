# API Contracts: UI & Design System

This directory contains interface definitions and API contracts for the UI & Design System feature.

## Contents

- [types.ts](./types.ts) - TypeScript type definitions for all entities
- [composables.md](./composables.md) - Composable function interfaces
- [components.md](./components.md) - Component prop interfaces
- [tokens.md](./tokens.md) - Color token structure and CSS variables

## Usage

These contracts serve as the single source of truth for type definitions and API signatures. All implementations must conform to these specifications.

## Validation

TypeScript strict mode ensures compile-time validation of all contracts. Runtime validation is handled by component prop validators and composable guards.
