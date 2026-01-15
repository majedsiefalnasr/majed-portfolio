import {promises as fs} from 'fs'
import {join} from 'path'

/**
 * Generate prerender routes from content directory
 * This runs at build time to discover all blog posts and case studies
 */
export async function getPrerenderRoutes(): Promise<string[]> {
  const routes: string[] = ['/', '/blog', '/case-studies']

  try {
    // Get all blog post files
    const blogDir = join(process.cwd(), 'content/blog')
    const years = await fs.readdir(blogDir)

    for (const year of years) {
      if (year.startsWith('_') || year.startsWith('.')) continue

      const yearPath = join(blogDir, year)
      const stat = await fs.stat(yearPath)

      if (stat.isDirectory()) {
        const files = await fs.readdir(yearPath)

        for (const file of files) {
          // Skip draft files and non-markdown files
          if (file.startsWith('_') || !file.endsWith('.md')) continue

          const slug = file.replace(/\.md$/, '').replace(/\.ar$/, '')
          const isArabic = file.endsWith('.ar.md')

          routes.push(isArabic ? `/ar/blog/${year}/${slug}` : `/blog/${year}/${slug}`)
        }
      }
    }

    // Get all case study files
    const caseStudiesDir = join(process.cwd(), 'content/case-studies')
    const caseStudyFiles = await fs.readdir(caseStudiesDir)

    for (const file of caseStudyFiles) {
      if (file.startsWith('_') || !file.endsWith('.md')) continue

      const slug = file.replace(/\.md$/, '').replace(/\.ar$/, '')
      const isArabic = file.endsWith('.ar.md')

      routes.push(isArabic ? `/ar/case-studies/${slug}` : `/case-studies/${slug}`)
    }
  } catch (error) {
    console.warn('Error reading content directory:', error)
  }

  return routes
}
