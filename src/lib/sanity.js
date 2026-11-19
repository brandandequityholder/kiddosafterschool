import { createClient } from '@sanity/client'
import { useEffect, useState } from 'react'
import exported from '../content/site.json'

/**
 * Sanity content layer.
 *
 * Every page renders instantly from the bundled content (src/content/site.json),
 * then refreshes from the live Sanity dataset when the API is reachable. If Sanity is
 * unreachable (offline, CORS, preview hosting) the bundled content is what you see.
 *
 * Re-export the content with `npm run content:pull` after editing in the Sanity Studio
 * so the fallback stays current.
 */
export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'mpky4rym'
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production'
// The After School site has no Sanity dataset yet: content ships in src/content/site.json.
// Set VITE_SANITY_LIVE=true (and the project/dataset vars) once an after-school dataset exists.
const LIVE = import.meta.env.VITE_SANITY_LIVE === 'true'

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const cache = new Map()

/** Fetch the single document of a given _type, resolving image/file asset refs to URLs. */
async function fetchDoc(type) {
  if (cache.has(type)) return cache.get(type)
  const p = client.fetch(`*[_type == $type && !(_id in path("drafts.**"))][0]`, { type }).catch(() => null)
  cache.set(type, p)
  return p
}

export function useContent(type) {
  const [doc, setDoc] = useState(() => exported[type] || null)
  const [source, setSource] = useState('bundle')
  useEffect(() => {
    if (!LIVE) return
    let alive = true
    fetchDoc(type).then((d) => {
      if (alive && d) { setDoc(d); setSource('live') }
    })
    return () => { alive = false }
  }, [type])
  return [doc, source]
}

/**
 * Resolve a Sanity asset reference (`image-<id>-<w>x<h>-svg`, `file-<id>-mp4`) or an
 * asset object to a usable URL. Bundled content resolves to the local /cms copy so the
 * site is fully self-contained; live content resolves to the Sanity CDN.
 */
export function assetUrl(assetOrRef, source = 'bundle') {
  if (!assetOrRef) return ''
  const ref = typeof assetOrRef === 'string' ? assetOrRef : assetOrRef?.asset?._ref || assetOrRef?._ref || ''
  if (!ref) return ''
  const [kind, id, ...rest] = ref.split('-')
  let file
  if (kind === 'image') {
    const dims = rest[0]
    const ext = rest[1]
    file = `${id}-${dims}.${ext}`
    return source === 'live'
      ? `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${file}`
      : `/cms/${file}`
  }
  const ext = rest[0]
  file = `${id}.${ext}`
  return source === 'live'
    ? `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${file}`
    : `/cms/${file}`
}
