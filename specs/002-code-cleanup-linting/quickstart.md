# Quickstart: Code Cleanup Linting and Formatting

**Date**: January 19, 2026  
**Feature**: 002-code-cleanup-linting

## Installation

After implementing this feature, the linting and formatting tools will be automatically available.

## Usage

### Manual Linting

```bash
# Check for linting errors
bun run lint

# Fix auto-fixable linting issues
bun run lint:fix

# Format code
bun run format

# Check formatting
bun run format:check
```

### Pre-commit Hooks

Pre-commit hooks run automatically on `git commit`:

- ESLint checks staged TypeScript/Vue files
- Prettier formats staged files
- Commits are blocked if checks fail

### Development Workflow

1. Write code in your editor
2. Stage changes: `git add .`
3. Commit: `git commit -m "message"`
   - Pre-commit hooks will run automatically
   - Fix any reported issues
4. Push: `git push`

### IDE Integration

- **VS Code**: Install ESLint and Prettier extensions
- **Auto-format on save**: Configure to run Prettier
- **Linting errors**: Show in editor with ESLint extension

## Troubleshooting

### Pre-commit hook fails

If pre-commit fails:

1. Check the error messages
2. Run `bun run lint:fix` to auto-fix issues
3. Run `bun run format` to format code
4. Stage and commit again

### Common Issues

- **ESLint errors**: Check TypeScript types and unused variables
- **Prettier conflicts**: Run format to resolve
- **Hook not running**: Ensure Husky is installed with `bun run prepare`

## Configuration

- `.eslintrc.js`: ESLint rules
- `.prettierrc`: Formatting rules
- `.lintstagedrc`: Pre-commit file patterns
- `.husky/pre-commit`: Hook script
