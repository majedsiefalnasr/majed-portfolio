/**
 * Tutorial Blog Post Template
 *
 * Step-by-step tutorial structure with prerequisites and troubleshooting
 */

import type {ContentTemplate} from '../template-schema'

export const blogTutorialTemplate: ContentTemplate = {
  id: 'blog-tutorial',
  name: 'Tutorial',
  description: 'Step-by-step tutorial with prerequisites and troubleshooting',
  contentType: 'blog',

  sections: [
    {
      id: 'prerequisites',
      name: 'Prerequisites',
      required: true,
      placeholder:
        '## Prerequisites\n\n- Required knowledge\n- Required tools\n- Setup requirements',
      wordCount: {min: 100, max: 200},
      prompt:
        'List all prerequisites including required knowledge, tools, and initial setup needed to follow this tutorial',
    },
    {
      id: 'steps',
      name: 'Tutorial Steps',
      required: true,
      placeholder:
        '## Steps\n\n### Step 1: [Title]\n\n[Instructions]\n\n### Step 2: [Title]\n\n[Instructions]',
      wordCount: {min: 800, max: 2000},
      prompt:
        'Write detailed step-by-step instructions with code examples, screenshots references, and explanations for each step',
    },
    {
      id: 'troubleshooting',
      name: 'Troubleshooting',
      required: false,
      placeholder:
        '## Troubleshooting\n\n### Common Issue 1\n\n**Problem**: [Description]\n**Solution**: [Fix]',
      wordCount: {min: 200, max: 400},
      prompt:
        'Provide common issues users might encounter and their solutions, formatted as problem-solution pairs',
    },
    {
      id: 'summary',
      name: 'Summary',
      required: true,
      placeholder: '## Summary\n\n[Recap what was built, next steps, and additional resources]',
      wordCount: {min: 100, max: 250},
      prompt:
        'Summarize what was accomplished, suggest next steps for learning, and provide links to additional resources',
    },
  ],

  generationContext: `
Create a hands-on tutorial that:
- Clearly lists all prerequisites upfront
- Provides step-by-step instructions that are easy to follow
- Includes code examples with explanations
- Anticipates common problems and provides solutions
- Encourages further learning with next steps
`,
}
