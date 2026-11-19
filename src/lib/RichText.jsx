import React from 'react'

/**
 * Renders the lightweight inline markup used throughout the Sanity content:
 *   <br>                      line break
 *   <green>…</green>          brand green text  (#75CB31)
 *   <yellow>…</yellow>        brand yellow text (#F8EA2B)
 *   <strong>…</strong>, <b>   bold
 *   <u>…</u>                  underline
 *   <a href="…">…</a>         link
 * Anything else is rendered as plain text.
 */
const COLORS = { green: '#75CB31', yellow: '#F8EA2B', blue: '#004AAD' }

const TOKEN = /(<br\s*\/?>|<\/?(?:green|yellow|blue|strong|b|u|em|i)>|<a\s+[^>]*>|<\/a>|\[(?:NEEDED|CONFIRM|GRADES NEEDED|TIME|PARENT NAME|TITLE TO CONFIRM|NICKNAME NEEDED|AFTER SCHOOL HANDLE|The after school site)[^\]]*\])/i

function parse(text) {
  const parts = String(text ?? '').split(TOKEN).filter((s) => s !== '')
  const root = { tag: null, children: [] }
  const stack = [root]
  for (const part of parts) {
    if (/^\[/.test(part)) { stack[stack.length - 1].children.push({ tag: 'draft', children: [part] }); continue }
    const m = part.match(/^<(\/?)([a-z]+)([^>]*)>$/i)
    if (!m) { stack[stack.length - 1].children.push(part); continue }
    const [, close, tagRaw, attrs] = m
    const tag = tagRaw.toLowerCase()
    if (tag === 'br') { stack[stack.length - 1].children.push({ tag: 'br' }); continue }
    if (close) {
      // pop to the matching open tag (tolerates unbalanced markup like "<green>…<green>")
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].tag === tag) { stack.length = i; break }
      }
      continue
    }
    const node = { tag, children: [], attrs }
    // Content like "<green>A DAY IN THE LIFE<green>" uses a repeated open tag as a close tag.
    const top = stack[stack.length - 1]
    if (top.tag === tag) { stack.pop(); continue }
    top.children.push(node)
    stack.push(node)
  }
  return root
}

function render(node, key) {
  if (typeof node === 'string') return node
  const kids = node.children?.map((c, i) => render(c, i))
  switch (node.tag) {
    case 'br': return <br key={key} />
    case 'draft': return <mark key={key} className="draft-note" title="Draft placeholder — copy still needed">{kids}</mark>
    case 'green': case 'yellow': case 'blue':
      return <span key={key} style={{ color: COLORS[node.tag] }}>{kids}</span>
    case 'strong': case 'b': return <strong key={key}>{kids}</strong>
    case 'u': return <u key={key}>{kids}</u>
    case 'em': case 'i': return <em key={key}>{kids}</em>
    case 'a': {
      const href = (node.attrs || '').match(/href=["']([^"']+)["']/)?.[1] || '#'
      const ext = /^https?:|^mailto:|^tel:/.test(href)
      return <a key={key} href={href} target={/^https?:/.test(href) ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined} className="underline font-semibold">{kids}</a>
    }
    default: return <React.Fragment key={key}>{kids}</React.Fragment>
  }
}

export default function RichText({ text, as: Tag = 'span', className, style, ...rest }) {
  const tree = parse(text)
  return <Tag className={className} style={style} {...rest}>{tree.children.map((c, i) => render(c, i))}</Tag>
}

/** Convert the markup to plain text (for alt text, titles). */
export function plain(text) {
  return String(text ?? '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}
