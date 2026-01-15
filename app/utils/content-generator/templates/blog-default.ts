/**
 * Default Blog Post Template
 *
 * Standard three-section structure for technical blog posts
 */

import type {ContentTemplate} from '../template-schema'

export const blogDefaultTemplate: ContentTemplate = {
  id: 'blog-default',
  name: 'Default Blog Post',
  description: 'Standard blog post with introduction, main content, and conclusion',
  contentType: 'blog',

  sections: [
    {
      id: 'introduction',
      name: 'Introduction',
      required: true,
      placeholder:
        '## Introduction\n\n[Write your introduction here - introduce the topic and why it matters]',
      wordCount: {min: 150, max: 300},
      prompt:
        'Write an engaging introduction that hooks the reader and explains why this topic is important',
    },
    {
      id: 'main-content',
      name: 'Main Content',
      required: true,
      placeholder:
        '## Main Content\n\n[Write your main content here with proper headings (H2, H3)]',
      wordCount: {min: 500, max: 1500},
      prompt:
        'Write comprehensive main content covering all key points with proper structure and examples',
    },
    {
      id: 'conclusion',
      name: 'Conclusion',
      required: true,
      placeholder: '## Conclusion\n\n[Summarize key takeaways and provide actionable next steps]',
      wordCount: {min: 100, max: 200},
      prompt: 'Write a conclusion that summarizes the key points and provides actionable takeaways',
    },
  ],

  generationContext: `
Create a well-structured blog post that:
- Starts with a clear problem statement
- Provides practical solutions and examples
- Includes code snippets where relevant
- Uses proper markdown formatting
- Maintains consistent tone throughout
`,
}
