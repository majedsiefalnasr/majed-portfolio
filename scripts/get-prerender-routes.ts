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
    const langs = await fs.readdir(blogDir)

    for (const lang of langs) {
      if (lang.startsWith('_') || lang.startsWith('.')) continue

      const langPath = join(blogDir, lang)
      const stat = await fs.stat(langPath)

      if (stat.isDirectory()) {
        const years = await fs.readdir(langPath)

        for (const year of years) {
          if (year.startsWith('_') || year.startsWith('.')) continue

          const yearPath = join(langPath, year)
          const yearStat = await fs.stat(yearPath)

          if (yearStat.isDirectory()) {
            const files = await fs.readdir(yearPath)

            for (const file of files) {
              // Skip draft files and non-markdown files
              if (file.startsWith('_') || !file.endsWith('.md')) continue

              const slug = file.replace(/\.md$/, '')
              // Generate routes based on new URL structure
              if (lang === 'en') {
                routes.push(`/blog/${year}/${slug}`)
              } else {
                routes.push(`/ar/blog/${year}/${slug}`)
              }
            }
          }
        }
      }
    }

    // Get all case study files
    const caseStudiesDir = join(process.cwd(), 'content/case-studies')
    const caseLangs = await fs.readdir(caseStudiesDir)

    for (const lang of caseLangs) {
      if (lang.startsWith('_') || lang.startsWith('.')) continue

      const langPath = join(caseStudiesDir, lang)
      const stat = await fs.stat(langPath)

      if (stat.isDirectory()) {
        const files = await fs.readdir(langPath)

        for (const file of files) {
          if (file.startsWith('_') || !file.endsWith('.md')) continue

          const slug = file.replace(/\.md$/, '')
          // Generate routes based on new URL structure
          if (lang === 'en') {
            routes.push(`/case-studies/${slug}`)
          } else {
            routes.push(`/ar/case-studies/${slug}`)
          }
        }
      }
    }
  } catch (error) {
    console.warn('Error reading content directory:', error)
  }

  return routes
}
