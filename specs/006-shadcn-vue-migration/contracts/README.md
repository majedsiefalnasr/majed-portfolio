# Component Migration Contracts

**Feature**: shadcn-vue UI Library Migration  
**Date**: 2026-01-16  
**Purpose**: Define migration contracts for replacing Nuxt UI components with shadcn-vue equivalents

## Overview

This directory contains TypeScript interface definitions that serve as "contracts" for the migration. Each contract defines:

1. **Before**: Current Nuxt UI component API
2. **After**: Target shadcn-vue component API
3. **Migration Path**: How to transform usage from Before → After

These contracts ensure consistent migration across all components and provide reference for developers.

---

## Contract Index

1. [button.contract.ts](./button.contract.ts) - Button component migration
2. [card.contract.ts](./card.contract.ts) - Card component family migration
3. [dropdown.contract.ts](./dropdown.contract.ts) - DropdownMenu migration
4. [icon.contract.ts](./icon.contract.ts) - Icon system migration
5. [theme.contract.ts](./theme.contract.ts) - Theme toggle migration

---

## Usage

These contracts are **documentation artifacts** for the migration, not runtime code. They serve as:

1. **Migration Guide**: Reference when converting components
2. **Type Reference**: TypeScript definitions for new components
3. **Testing Checklist**: Verify all prop/event transformations
4. **Code Review**: Ensure consistent API usage across codebase

---

## Validation

After migration, validate that:

- [ ] All component usages match "After" API
- [ ] No Nuxt UI components remain (grep search for `<U[A-Z]`)
- [ ] All icon references use Radix Icons format (`radix-icons:*`)
- [ ] TypeScript compilation passes with zero errors
- [ ] All components follow composition patterns from contracts
