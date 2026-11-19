#!/usr/bin/env node
/**
 * Re-export the Sanity content into src/content/sanity-export.json and refresh the local
 * copies of CMS media in public/cms. Run after editing content in the Studio:
 *
 *   npm run content:pull
 *
 * The site renders from this export first (instant, works offline), then refreshes from
 * the live Sanity API. Single-page types are stored as one object; `school` as an array.
 */
import { writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'

const PROJECT = process.env.VITE_SANITY_PROJECT_ID || '3p5mllwc'
const DATASET = process.env.VITE_SANITY_DATASET || 'production'
const API = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}`
const COLLECTIONS = { school: (a, b) => (a.order ?? 0) - (b.order ?? 0) }

const query = encodeURIComponent('*[!(_id in path("drafts.**")) && !(_type match "system.*")]')
const res = await fetch(`${API}?query=${query}`)
if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`)
const { result } = await res.json()

const docs = {}
const assets = []
for (const d of result) {
  if (d._type === 'sanity.imageAsset' || d._type === 'sanity.fileAsset') { assets.push(d); continue }
  if (COLLECTIONS[d._type]) (docs[d._type] ||= []).push(d)
  else docs[d._type] = d
}
for (const [t, sort] of Object.entries(COLLECTIONS)) docs[t]?.sort(sort)
writeFileSync('src/content/sanity-export.json', JSON.stringify(docs, null, 1))
console.log(`Exported ${Object.keys(docs).length} content types`)

mkdirSync('public/cms', { recursive: true })
const keep = new Set()
let n = 0
for (const a of assets) {
  const file = a.url.split('/').pop()
  keep.add(file)
  const dest = join('public/cms', file)
  if (existsSync(dest)) continue
  const r = await fetch(a.url)
  writeFileSync(dest, Buffer.from(await r.arrayBuffer()))
  n++
}
for (const f of readdirSync('public/cms')) if (!keep.has(f)) unlinkSync(join('public/cms', f))
console.log(`Downloaded ${n} new media files (${assets.length} in the dataset)`)
