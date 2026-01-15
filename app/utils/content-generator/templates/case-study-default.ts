/**
 * Default Case Study Template
 *
 * Standard structure for project case studies
 */

import type {ContentTemplate} from '../template-schema'

export const caseStudyDefaultTemplate: ContentTemplate = {
  id: 'case-study-default',
  name: 'Default Case Study',
  description: 'Standard case study structure for showcasing projects',
  contentType: 'case-study',

  sections: [
    {
      id: 'overview',
      name: 'Overview',
      required: true,
      placeholder: '## Overview\n\n[Brief introduction to the project, client, and your role]',
      wordCount: {min: 150, max: 300},
      prompt:
        'Write a brief overview introducing the project, the client/company, and your specific role',
    },
    {
      id: 'challenge',
      name: 'Challenge',
      required: true,
      placeholder:
        '## Challenge\n\n[Describe the problem, constraints, and requirements in detail]',
      wordCount: {min: 250, max: 500},
      prompt:
        'Describe the business problem or challenge, including context, constraints, and specific requirements',
    },
    {
      id: 'solution',
      name: 'Solution',
      required: true,
      placeholder:
        '## Solution\n\n[Explain your approach, technologies used, and implementation details]',
      wordCount: {min: 400, max: 800},
      prompt:
        'Explain your solution approach, technical decisions, architecture, and implementation details',
    },
    {
      id: 'results',
      name: 'Results',
      required: true,
      placeholder: '## Results\n\n[Measurable outcomes, metrics, and impact of the solution]',
      wordCount: {min: 200, max: 400},
      prompt:
        'Describe measurable outcomes, performance metrics, business impact, and user feedback',
    },
    {
      id: 'technologies',
      name: 'Technologies Used',
      required: false,
      placeholder: '## Technologies Used\n\n- Technology 1\n- Technology 2\n- Technology 3',
      wordCount: {min: 50, max: 150},
      prompt:
        'List and briefly describe the key technologies, frameworks, and tools used in the project',
    },
  ],

  generationContext: `
Create a compelling case study that:
- Clearly articulates the business problem
- Explains technical decisions and trade-offs
- Highlights your specific contributions
- Provides concrete metrics and outcomes
- Demonstrates both technical and business acumen
`,
}
