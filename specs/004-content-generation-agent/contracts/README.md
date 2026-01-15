# API Contracts: AI Content Generation Agent

This directory contains all contract definitions for the AI Content Generation Agent feature.

## Contents

### 1. [agent-prompts.md](./agent-prompts.md)

Conversation flow and question templates for the GitHub Copilot Chat agent.

### 2. [content-schemas.ts](./content-schemas.ts)

Zod runtime validation schemas for blog posts and case studies.

### 3. [workflow.md](./workflow.md)

Detailed step-by-step workflows for different generation scenarios.

## Purpose

These contracts serve as the interface between:

- User interactions (via GitHub Copilot Chat)
- Content generation logic (AI prompts and templates)
- File system operations (creating markdown files)
- Validation layer (Zod schemas)

## Usage

Developers implementing this feature should:

1. Start with [workflow.md](./workflow.md) to understand the overall flow
2. Reference [agent-prompts.md](./agent-prompts.md) for conversation templates
3. Use [content-schemas.ts](./content-schemas.ts) for validation logic

## Validation

All contracts must align with:

- Feature spec: `../spec.md`
- Data model: `../data-model.md`
- TypeScript types: `app/types/content.ts`
- Constitution: `.specify/memory/constitution.md`
