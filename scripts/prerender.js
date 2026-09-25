/**
 * Post-build prerender: renders every route (src/seo/site.js → allRoutes) to a
 * static HTML file with its own <title>, description, canonical, og tags and
 * JSON-LD, plus the page's real body markup — so crawlers see content without
 * executing JavaScript. The browser app then renders over it as normal.
 *
 * Output (served by Vercel with cleanUrls): dist/index.html, dist/projects.html,
 * dist/schemes/kusum.html, dist/blog/<slug>.html, dist/404.html, dist/sitemap.xml
 *
 * Run via `npm run build` (after the client and SSR builds).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, renderHead, allRoutes, getMeta, NOT_FOUND_META, SITE_URL } =
  await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/
const HERO_PRELOAD = /\s*<!-- Paint the hero's first frame ASAP -->\s*<link rel="preload"[^>]*>/
if (!SEO_BLOCK.test(template)) throw new Error('index.html is missing the <!-- seo:start --> … <!-- seo:end --> block')

function page(meta, body, { home = false } = {}) {
  let html = template.replace(SEO_BLOCK, renderHead(meta))
  if (!home) html = html.replace(HERO_PRELOAD, '') // hero image only exists on the homepage
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

function write(file, html) {
  const out = path.join(dist, file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
}

const routes = allRoutes()
for (const { path: route } of routes) {
  const meta = getMeta(route)
  const body = await render(route)
  if (!body.includes('<h1')) console.warn(`  ! ${route} rendered without an <h1>`)
  write(route === '/' ? 'index.html' : `${route.slice(1)}.html`, page(meta, body, { home: route === '/' }))
  console.log(`  ✓ ${route}  (${(body.length / 1024).toFixed(0)} KB)`)
}

write('404.html', page(NOT_FOUND_META, await render('/404')))
console.log('  ✓ 404.html')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`
write('sitemap.xml', sitemap)
console.log(`  ✓ sitemap.xml (${routes.length} URLs)`)

fs.rmSync(ssrDir, { recursive: true, force: true })
