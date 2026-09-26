// Build-time render entry — scripts/prerender.js renders every route to static
// HTML so crawlers get real content without running JavaScript.
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'

export { allRoutes, getMeta, NOT_FOUND_META, SITE_URL, BUSINESS } from './seo/site'
export { renderHead } from './seo/head'

export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StaticRouter location={url}><AppRoutes /></StaticRouter>
  )
  let html = ''
  for await (const chunk of prelude) html += chunk
  return html
}
