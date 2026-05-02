# Documentation Structure

This project has a clean separation between **human developer documentation** and **AI tool instructions**.

## For Developers 👨‍💻

**Start here**: `docs/DEVELOPMENT.md`

This guide covers everything you need to know about developing on this project:

- Setup and installation
- How to run the project
- Project structure explanation
- Code standards and conventions
- How to write tests
- How to create blog posts and case studies
- Common development tasks
- Troubleshooting problems

It's written for humans, in plain language, with practical examples.

## For AI Tools 🤖

**See**: `AGENTS.md` (in project root)

This is the comprehensive technical reference for:

- Claude Code
- Cursor
- GitHub Copilot
- Kilocode
- Any other AI tools integrated with the project

All AI tools reference the same single source of truth. When it's updated, all tools automatically have the latest information.

## Project Overview 📖

**See**: `README.md` (in project root)

High-level project information:

- What this project does
- Feature list
- Tech stack
- Quick start
- Contributing guidelines

## File Structure

```
project-root/
├── README.md                           # Project overview
├── AGENTS.md                          # ← AI tool instructions (single source of truth)
├── DOCUMENTATION.md                    # This file
├── docs/
│   ├── README.md                      # Navigation guide for docs/
│   └── DEVELOPMENT.md                 # ← Developer guide for humans
├── .github/
│   └── copilot-instructions.md        # Quick ref → points to AGENTS.md
└── [rest of project]
```

## When to Update

### Adding New Development Info

1. Edit `docs/DEVELOPMENT.md`
2. Save
3. Done! Developers will see the update

### Adding New AI Instructions

1. Edit `AGENTS.md`
2. Save
3. Done! All AI tools will see the update

### Updating Project Overview

1. Edit `README.md`
2. Save
3. Done!

## Key Differences

### docs/DEVELOPMENT.md (Humans)

- ✅ Written in plain language
- ✅ Practical, step-by-step examples
- ✅ Focused on "how to get things done"
- ✅ Includes troubleshooting for common issues
- ✅ Task-oriented sections (Add a blog post, Run tests, etc.)
- ✅ Shorter, more scannable format

### AGENTS.md (AI Tools)

- ✅ Comprehensive technical reference
- ✅ Includes all code patterns and examples
- ✅ Architecture and design decisions
- ✅ Edge cases and special configurations
- ✅ Detailed for AI processing
- ✅ Includes SEO best practices and agent documentation

## Why Separate?

**For Developers:**

- Simpler, clearer documentation
- Focused on practical tasks
- Not cluttered with AI-specific info
- Faster to find what you need

**For AI Tools:**

- Complete technical reference
- All patterns and conventions
- Architecture and design info
- Structured for AI processing

## Navigation

If you're a **developer**:

1. Start with `docs/DEVELOPMENT.md`
2. Check `README.md` for project overview
3. Look at existing code for patterns

If you're using **AI tools**:

1. The tool automatically references `AGENTS.md`
2. You can also manually check `AGENTS.md` for complete info
3. Use `docs/DEVELOPMENT.md` for human-readable explanations

## Keeping It Clean

When updating documentation:

- ✅ Always update the appropriate source
- ✅ Don't duplicate information across files
- ✅ Keep human docs simple and practical
- ✅ Keep AI docs complete and technical
- ✅ Use this DOCUMENTATION.md as a reference

## Questions?

- **How do I develop on this project?** → `docs/DEVELOPMENT.md`
- **What tech does this use?** → `README.md`
- **Can I integrate AI tools?** → `AGENTS.md`
- **Where should I add new docs?** → `docs/DEVELOPMENT.md` (for humans) or `AGENTS.md` (for AI)
