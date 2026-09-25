// Keeps <title>, description, canonical and og/twitter tags in sync on
// client-side navigation. First load already has them baked in by the prerender.
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getMeta, NOT_FOUND_META } from './site'

function setTag(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

export default function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = getMeta(pathname) || NOT_FOUND_META
    document.title = meta.title
    setTag('meta[name="description"]', 'content', meta.description)
    if (meta.noindex) return
    setTag('link[rel="canonical"]', 'href', meta.url)
    setTag('meta[property="og:url"]', 'content', meta.url)
    setTag('meta[property="og:title"]', 'content', meta.title)
    setTag('meta[property="og:description"]', 'content', meta.description)
    setTag('meta[property="og:image"]', 'content', meta.image)
    setTag('meta[name="twitter:title"]', 'content', meta.title)
    setTag('meta[name="twitter:description"]', 'content', meta.description)
    setTag('meta[name="twitter:image"]', 'content', meta.image)
  }, [pathname])

  return null
}
