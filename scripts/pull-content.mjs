#!/usr/bin/env node
/**
 * Re-export the Sanity content into src/content/sanity-export.json and refresh the
 * local copies of CMS media in public/cms. Run after editing content in the Studio:
 *
 *   npm run content:pull
 *
 * The site always renders from this export first (instant, works offline), then
 * refreshes from the live Sanity API when it is reachable.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const PROJECT = process.env.VITE_SANITY_PROJECT_ID || 'mpky4rym'
const DATASET = process.env.VITE_SANITY_DATASET || 'production'
const API = `https://${PROJECT}.apicdn.sanity.io/v2024-01-01/data/query/${DATASET}`

const query = encodeURIComponent('*[!(_id in path("drafts.**"))]')
const res = await fetch(`${API}?query=${query}`)
if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`)
const { result } = await res.json()

const docs = {}
const assets = []
for (const d of result) {
  if (d._type === 'sanity.imageAsset' || d._type === 'sanity.fileAsset') assets.push(d)
  else docs[d._type] = d
}
writeFileSync('src/content/sanity-export.json', JSON.stringify(docs, null, 1))
console.log(`Exported ${Object.keys(docs).length} documents`)

mkdirSync('public/cms', { recursive: true })
let n = 0
for (const a of assets) {
  const file = a.url.split('/').pop()
  const dest = join('public/cms', file)
  if (existsSync(dest)) continue
  const r = await fetch(a.url)
  writeFileSync(dest, Buffer.from(await r.arrayBuffer()))
  n++
}
console.log(`Downloaded ${n} new media files (${assets.length} total)`)
