# Pre-rendering Strategy for Blog & Case Studies

## Overview

This project uses **automatic route discovery** with **hybrid rendering** to ensure all blog posts and case studies are pre-rendered at build time, eliminating 404 errors when accessing content via direct URLs.

## How It Works

### 1. **Route Rules (Hybrid Rendering)** ⭐ Recommended Approach

In `nuxt.config.ts`, we use `routeRules` to tell Nuxt which routes should be pre-rendered:

```typescript
routeRules: {
  '/': {prerender: true},
  '/blog': {prerender: true},
  '/blog/**': {prerender: true},           // All blog posts
  '/case-studies': {prerender: true},
  '/case-studies/**': {prerender: true},   // All case studies
  '/ar/blog/**': {prerender: true},        // Arabic blog posts
  '/ar/case-studies/**': {prerender: true}, // Arabic case studies
}
```

**Benefits:**

- ✅ **Fully automatic** - no manual route listing needed
- ✅ **Wildcard support** - `/**` matches all nested routes
- ✅ **Zero maintenance** - add content files and build, that's it!
- ✅ **Hybrid flexibility** - mix SSR, SSG, and SPA modes per route

### 2. **Automatic Route Discovery Hook**

For additional control, we also use a Nitro hook that scans the `content/` directory:

```typescript
hooks: {
  async 'nitro:config'(nitroConfig) {
    const {getPrerenderRoutes} = await import('./scripts/get-prerender-routes')
    const routes = await getPrerenderRoutes()
    // Adds all discovered routes to prerender list
  }
}
```

This ensures even more routes are discovered by reading the file system at build time.

### 3. **Link Crawling**

The build process also crawls links in rendered pages to discover additional routes:

```typescript
nitro: {
  prerender: {
    crawlLinks: true,  // Discovers routes from <a> tags in HTML
    failOnError: false,
  }
}
```

## Adding New Content

### ✨ For Blog Posts

1. Create a new file: `content/blog/YYYY/slug.md`
2. Run `bun run build` (or deploy to Vercel)
3. Done! The route is automatically discovered and pre-rendered

### ✨ For Case Studies

1. Create a new file: `content/case-studies/slug.md`
2. Run `bun run build` (or deploy to Vercel)
3. Done! The route is automatically discovered and pre-rendered

### ✨ For Bilingual Content

1. Create Arabic version: `content/blog/YYYY/slug.ar.md`
2. Run `bun run build`
3. Done! Both `/blog/YYYY/slug` and `/ar/blog/YYYY/slug` are pre-rendered

## No Manual Maintenance Required! 🎉

**You never need to:**

- ❌ Manually list routes in config files
- ❌ Run special scripts before building
- ❌ Update route arrays when adding content

**Just:**

- ✅ Create your markdown file
- ✅ Build and deploy
- ✅ Everything works automatically!

## How Pre-rendering Happens

1. **Build starts** → Nuxt reads `routeRules`
2. **Route discovery** → Scans content directory via hook
3. **Pre-rendering** → Generates static HTML for each route
4. **Crawling** → Discovers additional routes from links
5. **Build completes** → Static files ready in `.output/public/`

## Verification

After building, check pre-rendered routes:

```bash
# Check total routes pre-rendered
bun run build | grep "Prerendered.*routes"

# List all blog HTML files
find .output/public/blog -name "index.html"

# List all case study HTML files
find .output/public/case-studies -name "index.html"
```

## Deployment to Vercel

When you deploy to Vercel:

1. Vercel runs `nuxt build`
2. All routes are automatically discovered and pre-rendered
3. Static HTML files are served for direct URL access
4. Client-side navigation still works as SPA

**Result:** Perfect combination of static site speed and SPA interactivity!

## Troubleshooting

### If a route isn't being pre-rendered:

1. **Check the file exists**: Ensure `.md` file is in correct location
2. **Check file name**: Shouldn't start with `_` (drafts are excluded)
3. **Rebuild**: Run `bun run build` to regenerate
4. **Check route rules**: Verify wildcard patterns in `routeRules`

### Build errors:

If you see errors during build, check:

- Markdown frontmatter is valid
- No syntax errors in content files
- All referenced images exist

## Performance Benefits

✨ **Fast initial load** - Static HTML served immediately  
✨ **SEO friendly** - Search engines see full content  
✨ **No 404 errors** - All routes exist as static files  
✨ **Better UX** - Instant page loads on direct access

---

## Summary

This setup gives you the **best of both worlds**:

- 🚀 Static Site Generation (SSG) for content pages
- ⚡ Single Page Application (SPA) for navigation
- 🔄 Server-Side Rendering (SSR) fallback for dynamic routes
- 🎯 Zero manual maintenance for new content

Just create content files and deploy - everything else is automatic! 🎉
