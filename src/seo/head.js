// Serialises route meta (from getMeta / NOT_FOUND_META) into <head> markup.
// Used at build time by scripts/prerender.js.
import { SITE_NAME } from './site'

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// JSON-LD lives inside <script>, so only "</" needs neutralising.
const ld = obj => JSON.stringify(obj).replace(/<\//g, '<\\/')

export function renderHead(meta) {
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
  ]
  if (!meta.noindex) {
    tags.push(
      `<link rel="canonical" href="${esc(meta.url)}" />`,
      `<meta property="og:type" content="${meta.type}" />`,
      `<meta property="og:site_name" content="${SITE_NAME}" />`,
      `<meta property="og:title" content="${esc(meta.title)}" />`,
      `<meta property="og:description" content="${esc(meta.description)}" />`,
      `<meta property="og:url" content="${esc(meta.url)}" />`,
      `<meta property="og:image" content="${esc(meta.image)}" />`,
      `<meta property="og:locale" content="en_IN" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(meta.title)}" />`,
      `<meta name="twitter:description" content="${esc(meta.description)}" />`,
      `<meta name="twitter:image" content="${esc(meta.image)}" />`,
    )
  }
  for (const obj of meta.jsonLd) tags.push(`<script type="application/ld+json">${ld(obj)}</script>`)
  return tags.join('\n    ')
}
