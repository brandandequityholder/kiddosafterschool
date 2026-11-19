import { defineField, defineType } from 'sanity'
import { str, text, url, image, cta, singleton, section, stringList, video } from './shared'

/* ------------------------------------------------------------------ */
/* Site-wide settings                                                  */
/* ------------------------------------------------------------------ */
export const siteSettings = singleton('siteSettings', 'Site Settings', [
  str('siteName', 'Site name', { initialValue: 'Kiddos After School' }),
  url('enrollUrl', 'Enrollment portal URL', { description: 'Every ENROLL button on the site points here.' }),
  str('email', 'Main email'),
  str('phone', 'Main phone', { description: 'Shown as typed, e.g. 404.955.3184' }),
  defineField({
    name: 'brands', title: 'Brand switcher (top of the navigation)', type: 'array',
    description: 'The coloured tabs that jump between the Kiddos sites. The current site should link to "/".',
    of: [{
      type: 'object',
      fields: [
        str('name', 'Label'),
        url('url', 'Link'),
        str('color', 'Tab colour (hex)', { description: 'e.g. #C9368A' }),
      ],
      preview: { select: { title: 'name', subtitle: 'url' } },
    }],
  }),
  defineField({
    name: 'seo', title: 'Search & sharing', type: 'object',
    fields: [
      str('titleSuffix', 'Browser title suffix', { description: 'Appended to every page title, e.g. " | Kiddos After School"' }),
      text('description', 'Default meta description', { rows: 3, description: 'Shown by Google and when the site is shared. 150–160 characters.' }),
      image('shareImage', 'Share image', { description: '1200×630 image used when a link to the site is shared.' }),
    ],
  }),
])

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
const navLink = {
  type: 'object',
  fields: [str('label', 'Label'), url('link', 'Link')],
  preview: { select: { title: 'label', subtitle: 'link' } },
}

export const navigation = singleton('navigation', 'Navigation', [
  defineField({
    name: 'menu', title: 'Desktop menu', type: 'array',
    description: 'Top-level items left to right. Add children to turn an item into a dropdown.',
    of: [{
      type: 'object',
      fields: [
        str('label', 'Label'),
        url('link', 'Link', { description: 'Leave empty for a dropdown-only item.' }),
        defineField({ name: 'children', title: 'Dropdown items', type: 'array', of: [navLink] }),
      ],
      preview: {
        select: { title: 'label', link: 'link', children: 'children' },
        prepare: ({ title, link, children }) => ({ title, subtitle: children?.length ? `${children.length} dropdown items` : link }),
      },
    }],
  }),
  stringList('mobileOrder', 'Mobile menu order', {
    description: 'Top-level labels in the order they appear on phones. Items not listed here follow in desktop order.',
  }),
  cta('enrollButton', 'ENROLL button'),
  cta('contactButton', 'CONTACT US button'),
])

/* ------------------------------------------------------------------ */
/* Announcement bar                                                    */
/* ------------------------------------------------------------------ */
export const announcement = singleton('announcement', 'Announcement Bar', [
  defineField({ name: 'enabled', title: 'Show the yellow bar', type: 'boolean', initialValue: true }),
  str('text', 'Text'),
  str('linkText', 'Link text'),
  url('linkUrl', 'Link'),
])

/* ------------------------------------------------------------------ */
/* Footer + shared CTAs                                                */
/* ------------------------------------------------------------------ */
export const footer = singleton('footer', 'Footer', [
  str('title', 'Title'),
  text('description', 'Description', { rows: 3 }),
  defineField({
    name: 'locations', title: 'Locations', type: 'array',
    of: [{
      type: 'object',
      fields: [str('name', 'Name'), str('address', 'Address'), url('mapLink', 'Map link')],
      preview: { select: { title: 'name', subtitle: 'address' } },
    }],
  }),
  str('email', 'Email'),
  str('phone', 'Phone'),
  defineField({
    name: 'externalLinks', title: 'Kiddos family links (bottom bar)', type: 'array',
    of: [{
      type: 'object',
      fields: [str('name', 'Label'), url('url', 'Link'), str('bgColor', 'Colour (hex)')],
      preview: { select: { title: 'name', subtitle: 'url' } },
    }],
  }),
  str('socialsText', 'Social handle text', { description: 'e.g. @kiddosafterschool' }),
  defineField({
    name: 'socialLinks', title: 'Social links', type: 'array',
    of: [{
      type: 'object',
      fields: [
        defineField({ name: 'platform', title: 'Platform', type: 'string', options: { list: ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'LinkedIn'] } }),
        url('url', 'Link'),
      ],
      preview: { select: { title: 'platform', subtitle: 'url' } },
    }],
  }),
  str('copyrightText', 'Copyright line'),
  video('video', 'Footer background video'),
])

export const lastSection = singleton('lastSection', '"One Click Away" CTA', [
  text('preTitle', 'Lead-in lines', { rows: 3, description: 'Use <br> between lines.' }),
  str('boldTitle', 'Big line', { description: 'The large green line, e.g. ONE CLICK AWAY' }),
  text('description', 'Paragraph'),
  str('ctaText', 'Button text'),
  url('ctaUrl', 'Button link'),
])

export const anythingElse = singleton('anythingElse', '"Anything Else?" block', [
  str('mainHeadline', 'Headline'),
  text('contactDescription', 'Intro paragraph'),
  defineField({ name: 'contactUsLink', title: 'Contact link', type: 'object', options: { columns: 2 }, fields: [str('linkText', 'Text'), url('urlSlug', 'Link')] }),
  defineField({ name: 'emailLink', title: 'Email link', type: 'object', options: { columns: 2 }, fields: [str('linkText', 'Text'), url('url', 'Link')] }),
  text('availabilityText', 'Availability paragraph'),
  defineField({ name: 'phoneLink', title: 'Phone link', type: 'object', options: { columns: 2 }, fields: [str('linkText', 'Text'), url('url', 'Link')] }),
  text('summerTime', 'Summer note', { rows: 2, description: 'Optional extra line (used on the camp site for summer hours).' }),
])
