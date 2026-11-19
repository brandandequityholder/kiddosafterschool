import { createClient } from '@sanity/client'
import { useEffect, useState } from 'react'
import exported from '../content/sanity-export.json'

/**
 * Sanity content layer.
 *
 * Every page renders instantly from the bundled export (src/content/sanity-export.json),
 * then refreshes from the live Sanity dataset. If Sanity is unreachable (offline, CORS not
 * yet allowed for this host) the bundled content is what you see.
 *
 * After editing in the Studio, `npm run content:pull` refreshes the bundled export + the
 * local media copies in public/cms so the fallback stays current.
 */
export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || '3p5mllwc'
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production'
const LIVE = import.meta.env.VITE_SANITY_LIVE !== 'false'

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
})

/** Document types that exist many times (everything else is a single page/settings doc). */
const COLLECTIONS = { school: { order: 'order asc' } }

const cache = new Map()
function fetchDoc(type) {
  if (cache.has(type)) return cache.get(type)
  const coll = COLLECTIONS[type]
  const q = coll
    ? `*[_type == $type && !(_id in path("drafts.**"))] | order(${coll.order})`
    : `*[_type == $type && !(_id in path("drafts.**"))][0]`
  const p = client.fetch(q, { type }).catch(() => null)
  cache.set(type, p)
  return p
}

/**
 * useContent('homePage')  → [doc, source]
 * useContent('school')    → [docs[], source]  (collection types return an ordered array)
 * `source` is 'bundle' or 'live' and is what assetUrl() needs to build media URLs.
 */
export function useContent(type) {
  const [doc, setDoc] = useState(() => exported[type] ?? null)
  const [source, setSource] = useState('bundle')
  useEffect(() => {
    if (!LIVE) return
    let alive = true
    fetchDoc(type).then((d) => {
      if (alive && d && (!Array.isArray(d) || d.length)) { setDoc(d); setSource('live') }
    })
    return () => { alive = false }
  }, [type])
  return [doc, source]
}

/**
 * Resolve a Sanity image/file (asset object or `image-<id>-<w>x<h>-svg` style ref) to a URL.
 * Bundled content resolves to the local /cms copy; live content to the Sanity CDN.
 * Returns `fallback` when the field is empty, so every media field can be optional.
 */
export function assetUrl(assetOrRef, source = 'bundle', fallback = '') {
  if (!assetOrRef) return fallback
  const ref = typeof assetOrRef === 'string' ? assetOrRef : assetOrRef?.asset?._ref || assetOrRef?._ref || ''
  if (!ref) return fallback
  const [kind, id, ...rest] = ref.split('-')
  if (kind === 'image') {
    const file = `${id}-${rest[0]}.${rest[1]}`
    return source === 'live' ? `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${file}` : `/cms/${file}`
  }
  const file = `${id}.${rest[0]}`
  return source === 'live' ? `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${file}` : `/cms/${file}`
}

/** Prefer an uploaded PDF, then a typed link, then the fallback. */
export function docUrl(fileField, urlField, source, fallback = '#') {
  return assetUrl(fileField, source, '') || urlField || fallback
}
