import { defineField, defineType } from 'sanity'

/**
 * Reusable field builders. Every text field on the site supports a little inline
 * markup so editors can colour or break headlines the way the design does:
 *   <br>                     line break
 *   <green>…</green>         green text   (#75CB31)
 *   <yellow>…</yellow>       yellow text  (#F8EA2B)
 *   <strong>…</strong>       bold
 *   <u>…</u>                 underline
 *   <a href="…">…</a>        link (http, mailto: or tel:)
 */
export const MARKUP_HELP = 'Inline markup: <br> line break · <green>…</green> · <yellow>…</yellow> · <strong>…</strong> · <u>…</u> · <a href="…">…</a>'

export const str = (name, title, extra = {}) =>
  defineField({ name, title, type: 'string', ...extra })

export const text = (name, title, extra = {}) =>
  defineField({ name, title, type: 'text', rows: 4, description: MARKUP_HELP, ...extra })

export const url = (name, title, extra = {}) =>
  defineField({
    name, title, type: 'string',
    description: 'A full web address (https://…), a page on this site (/schedule), mailto: or tel:',
    ...extra,
  })

export const image = (name, title, extra = {}) =>
  defineField({ name, title, type: 'image', options: { hotspot: true }, ...extra })

export const file = (name, title, extra = {}) =>
  defineField({ name, title, type: 'file', ...extra })

export const video = (name, title, description) =>
  defineField({
    name, title, type: 'file', options: { accept: 'video/mp4,video/webm' },
    description: description || 'MP4 recommended. Leave empty to keep the default video that ships with the site.',
  })

export const cta = (name = 'cta', title = 'Button') =>
  defineField({
    name, title, type: 'object',
    options: { columns: 2 },
    fields: [
      str('text', 'Button text'),
      url('link', 'Button link'),
    ],
  })

export const stringList = (name, title, extra = {}) =>
  defineField({ name, title, type: 'array', of: [{ type: 'string' }], ...extra })

/** Marks a document as a single page: the Studio shows it once and never offers "create new". */
export const singleton = (name, title, fields, extra = {}) =>
  defineType({
    name, title, type: 'document',
    fields,
    preview: { prepare: () => ({ title }) },
    ...extra,
  })

export const section = (name, title, fields, extra = {}) =>
  defineField({ name, title, type: 'object', fields, options: { collapsible: true, collapsed: false }, ...extra })
