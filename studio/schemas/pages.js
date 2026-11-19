import { defineField } from 'sanity'
import { str, text, url, image, file, video, cta, singleton, section, stringList } from './shared'

const faqItem = {
  type: 'object',
  fields: [str('question', 'Question'), text('answer', 'Answer')],
  preview: { select: { title: 'question' } },
}

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */
export const homePage = singleton('homePage', 'Home', [
  section('hero', 'Hero', [
    str('mainTitle', 'Headline'),
    text('description', 'Paragraph'),
    str('ctaText', 'Button text'),
    url('ctaLink', 'Button link'),
    video('video', 'Background video'),
    image('poster', 'Video poster image', { description: 'Shown while the video loads. Leave empty to keep the default.' }),
  ]),
  section('intro', '"Kiddos After School is…" + info blocks', [
    str('mainHeadline', 'Headline'),
    text('description', 'Paragraph'),
    str('ctaText', 'Button text'),
    url('ctaLink', 'Button link'),
    defineField({
      name: 'infoBlocks', title: 'Info blocks (Dates / Hours / Grades / Enroll)', type: 'array',
      of: [{
        type: 'object',
        fields: [str('blockTitle', 'Title'), text('mainValue', 'Main value', { rows: 2 }), text('subText', 'Small text', { rows: 2 })],
        preview: { select: { title: 'blockTitle', subtitle: 'mainValue' } },
      }],
    }),
  ]),
  section('dayInLife', 'A Day in the Life', [
    str('mainHeadline', 'Headline', { description: 'Use <br> where the green second line starts.' }),
    stringList('steps', 'Numbered steps'),
    str('ctaText', 'Button text'),
    url('ctaLink', 'Button link'),
    video('video', 'Faded background video'),
  ]),
  section('benefits', 'What Makes Kiddos the Best', [
    text('mainHeadline', 'Headline', { rows: 2 }),
    text('summary', 'Paragraph'),
    defineField({
      name: 'items', title: 'The ten benefit cards', type: 'array',
      description: 'Exactly ten cards fill the layout. Each card has a green first line, a blue second line and a short paragraph. Artwork is fixed per position.',
      validation: (R) => R.max(10),
      of: [{
        type: 'object',
        fields: [str('titleGreen', 'Title line 1 (green)'), str('titleBlue', 'Title line 2 (blue)'), text('body', 'Paragraph', { rows: 3 })],
        preview: { select: { title: 'titleGreen', subtitle: 'titleBlue' } },
      }],
    }),
  ]),
  section('activityChoices', 'Activity Choices (blue band)', [
    str('tagline', 'Small caps line'),
    str('headline', 'Headline'),
    text('description', 'Paragraph'),
    str('ctaText', 'Button text'),
    url('ctaLink', 'Button link'),
  ]),
  section('testimonials', 'Testimonials', [
    str('tagline', 'Small caps line'),
    str('headline', 'Headline'),
    defineField({
      name: 'items', title: 'Testimonials', type: 'array',
      of: [{
        type: 'object',
        fields: [text('reviewText', 'Quote'), str('reviewerName', 'Name'), str('reviewerIdentity', 'Who they are', { description: 'e.g. After School Parent' })],
        preview: { select: { title: 'reviewerName', subtitle: 'reviewText' } },
      }],
    }),
  ]),
])

/* ------------------------------------------------------------------ */
/* Schedule & Activities                                               */
/* ------------------------------------------------------------------ */
export const schedulePage = singleton('schedulePage', 'Schedule & Activities', [
  section('firstSection', 'Hero', [
    text('title', 'Headline', { rows: 2 }),
    text('description', 'Paragraph'),
    video('video', 'Hero video'),
  ]),
  section('heroSection', 'What Goes On', [
    text('titleBlue', 'Headline (blue)', { rows: 2 }),
    str('titleGreen', 'Headline (green)'),
    text('description', 'Paragraph'),
    str('calendarText', 'Calendar link text'),
    file('calendarPdf', 'Sample calendar (PDF)', { options: { accept: 'application/pdf' } }),
    url('calendarUrl', 'Calendar link (if not uploading a PDF)'),
  ]),
  section('campersChoice', 'Activity Choices', [
    str('titleWhite', 'Headline (white)'),
    str('titleYellow', 'Headline (yellow)'),
    text('description', 'Paragraph'),
  ]),
  defineField({
    name: 'activities', title: 'Activity cards', type: 'array',
    of: [{
      type: 'object',
      fields: [str('title', 'Title', { description: 'Use <br> for a two-line title.' }), text('description', 'Description', { rows: 3 }), image('icon', 'Icon', { description: 'SVG or PNG, square.' })],
      preview: { select: { title: 'title', media: 'icon' } },
    }],
  }),
  section('questsSection', 'Specials', [
    str('titleMainOne', 'Headline line 1'),
    str('titleMainTwo', 'Headline line 2'),
    text('description', 'Paragraph'),
  ]),
  section('dailyProgram', 'A Day in the Life (clock)', [
    text('headline', 'Headline', { rows: 2 }),
    defineField({
      name: 'schedule', title: 'Timeline', type: 'array',
      of: [{
        type: 'object',
        fields: [str('time', 'Time', { description: 'e.g. 2:15pm' }), str('label', 'Label'), text('description', 'Description', { rows: 3 })],
        preview: { select: { title: 'label', subtitle: 'time' } },
      }],
    }),
  ]),
])

/* ------------------------------------------------------------------ */
/* Rates & Enrollment                                                  */
/* ------------------------------------------------------------------ */
const addon = (name, title) => section(name, title, [str('heading', 'Heading'), text('subHeading', 'Text', { rows: 3 })], { options: { collapsible: true, collapsed: true } })

export const ratesPage = singleton('ratesPage', 'Rates & Enrollment', [
  section('heroSection', 'Hero', [text('headline', 'Headline', { rows: 2 }), text('subHeadline', 'Paragraph'), image('photo', 'Hero photo')]),
  defineField({
    name: 'steps', title: 'Enrollment steps', type: 'array',
    of: [{
      type: 'object',
      fields: [str('title', 'Title'), text('description', 'Description'), image('icon', 'Icon')],
      preview: { select: { title: 'title', media: 'icon' } },
    }],
  }),
  section('ratesSection', 'Rates box', [
    text('heading', 'Heading', { rows: 2 }),
    str('baseRate', 'Annual registration fee'),
    str('deposit', 'Full-time fixed monthly rate'),
    str('paySchedule', 'Pay schedule'),
    text('details', 'Details paragraph'),
    text('confirm', 'Extra note', { rows: 2, description: 'Optional second paragraph under the details.' }),
  ]),
  section('ratesBySchool', 'Rates by school table', [
    str('heading', 'Heading'),
    stringList('columns', 'Column headings (one per school)'),
    defineField({
      name: 'rows', title: 'Rows', type: 'array',
      of: [{
        type: 'object',
        fields: [str('label', 'Row label'), stringList('values', 'Values (one per column)')],
        preview: { select: { title: 'label', values: 'values' }, prepare: ({ title, values }) => ({ title, subtitle: (values || []).join(' · ') }) },
      }],
    }),
    text('note', 'Note under the table', { rows: 2 }),
    text('confirm', 'Extra note', { rows: 2 }),
  ]),
  section('discountsSection', 'Add-ons & discounts', [
    addon('first', 'Row 1 (siblings)'),
    addon('second', 'Row 2 (drop-ins)'),
    addon('third', 'Row 3 (pre-K)'),
    section('paySchedule', 'Row 4 (extracurricular classes)', [str('heading', 'Heading'), text('subHeading', 'Text', { rows: 3 }), str('ctaText', 'Button text'), url('ctaLink', 'Button link')], { options: { collapsible: true, collapsed: true } }),
  ]),
  section('policiesSection', 'Scholarships & cancelation', [
    text('scholarshipText', 'Scholarship paragraph'),
    url('scholarshipLink', 'Apply button link', { description: 'Usually a mailto: link with a subject.' }),
    text('cancelationText', 'Cancelation policy paragraph'),
  ]),
])

/* ------------------------------------------------------------------ */
/* Extracurricular classes                                             */
/* ------------------------------------------------------------------ */
export const classesPage = singleton('classesPage', 'Extracurricular Classes', [
  text('title', 'Headline', { rows: 2 }),
  text('description', 'Paragraph'),
  str('ctaText', 'Button text'),
  url('ctaUrl', 'Button link'),
  image('photo', 'Hero photo'),
  str('term', 'Term name', { description: 'e.g. Fall 2026 — used in the "Info" heading.' }),
  defineField({
    name: 'info', title: 'Term info blocks', type: 'array',
    of: [{
      type: 'object',
      fields: [str('label', 'Label'), str('value', 'Main value'), text('detail', 'Detail', { rows: 2 })],
      preview: { select: { title: 'label', subtitle: 'value' } },
    }],
  }),
  stringList('notes', 'Notes under the info blocks'),
  str('scheduleHeading', 'Weekly schedule heading'),
  str('scheduleSub', 'Weekly schedule subheading'),
  defineField({
    name: 'week', title: 'Weekly schedule', type: 'array',
    of: [{
      type: 'object',
      fields: [str('day', 'Day'), stringList('items', 'Classes that day')],
      preview: { select: { title: 'day', items: 'items' }, prepare: ({ title, items }) => ({ title, subtitle: (items || []).join(', ') }) },
    }],
  }),
  defineField({
    name: 'classes', title: 'Class cards', type: 'array',
    of: [{
      type: 'object',
      fields: [
        str('name', 'Class name'),
        str('meta', 'Day · time · grades', { description: 'e.g. MONDAYS · 2:15–3:30 · GRADES 2–5' }),
        text('description', 'Description'),
        str('price', 'Price line'),
        defineField({ name: 'schools', title: 'Offered at', type: 'array', of: [{ type: 'reference', to: [{ type: 'school' }] }], description: 'Leave empty if offered at every school.' }),
        url('registerUrl', 'Register link', { description: 'Optional per-class link; otherwise the page button is used.' }),
      ],
      preview: { select: { title: 'name', subtitle: 'meta' } },
    }],
  }),
])

/* ------------------------------------------------------------------ */
/* Schools (one document per school) + shared school-page copy          */
/* ------------------------------------------------------------------ */
export const school = {
  name: 'school', title: 'School', type: 'document',
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  fields: [
    str('name', 'Page title', { description: 'e.g. Kiddos @ E. Rivers', validation: (R) => R.required() }),
    str('short', 'Short name', { description: 'e.g. E. Rivers' }),
    defineField({ name: 'slug', title: 'URL', type: 'slug', options: { source: 'short' }, description: 'The page lives at /schools/<this>', validation: (R) => R.required() }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
    section('contact', 'Contact', [
      str('director', 'Director name'),
      str('directorTitle', 'Director title'),
      str('phone', 'Phone'),
      str('email', 'Email'),
    ]),
    section('location', 'Location', [
      str('address', 'Address'),
      url('mapLink', 'Google Maps link'),
      text('locationNote', 'Location note', { rows: 3 }),
      image('mapImage', 'Map image', { description: 'Shown on the Contact page. 480×360 or larger.' }),
    ]),
    section('program', 'Program', [
      str('hours', 'Hours', { description: 'e.g. 2:15 – 6:30pm' }),
      str('grades', 'Grades', { description: 'e.g. Pre-K – 5th grade' }),
      str('enrollment', 'Enrollment line'),
      text('enrollmentNote', 'Enrollment note', { rows: 3 }),
    ]),
    section('rates', 'Rates', [
      defineField({
        name: 'rows', title: 'Rate rows', type: 'array',
        of: [{ type: 'object', fields: [str('label', 'Label'), str('value', 'Value')], preview: { select: { title: 'label', subtitle: 'value' } } }],
      }),
      text('ratesNote', 'Note under the rates', { rows: 3 }),
    ]),
    section('media', 'Media', [
      video('heroVideo', 'Hero video'),
      image('heroImage', 'Hero image (used if there is no video)'),
      defineField({ name: 'photos', title: 'Photo carousel', type: 'array', of: [image('photo', 'Photo')] }),
    ]),
    section('documents', 'Documents', [
      file('policiesPdf', 'Policies & Procedures (PDF)', { options: { accept: 'application/pdf' } }),
      url('policiesUrl', 'Policies link (if not uploading)'),
    ]),
  ],
  preview: { select: { title: 'name', subtitle: 'address', media: 'heroImage' } },
}

export const schoolPageSettings = singleton('schoolPageSettings', 'School pages — shared copy', [
  str('tagline', 'Small caps line above the school name', { initialValue: 'After School' }),
  str('registerButton', 'Register button text', { initialValue: 'REGISTER SY 26/27' }),
  section('enroll', 'How to Enroll', [
    str('heading', 'Heading'),
    stringList('steps', 'Steps', { description: 'Use {policies} for the policies link, {portal} for the registration portal link and {phone} for the school phone.' }),
    str('ctaText', 'Button text'),
  ]),
  section('whatGoesOn', 'What Goes On', [
    str('heading', 'Heading'),
    text('body', 'Paragraph'),
    str('learnMoreText', 'Learn more button text'),
    url('learnMoreLink', 'Learn more link'),
    str('calendarText', 'Calendar button text'),
    file('calendarPdf', 'Sample calendar (PDF)', { options: { accept: 'application/pdf' } }),
  ]),
  section('rates', 'Rates block', [
    str('headingSuffix', 'Heading suffix', { description: 'Appended to the school name, e.g. " Rates"' }),
    str('subheading', 'Sub-heading', { description: 'e.g. Full Time Tuition for SY 26/27' }),
    text('scholarships', 'Scholarships line', { rows: 2 }),
    str('allRatesText', 'All rates button text'),
    str('policiesText', 'Policies button text', { description: 'The school name is added in front automatically.' }),
  ]),
  section('classes', 'Classes block', [
    str('headingPrefix', 'Heading prefix', { description: 'e.g. "Extracurricular Classes @" — the school name follows.' }),
    text('body', 'Paragraph'),
    str('ctaText', 'Button text'),
  ]),
])

/* ------------------------------------------------------------------ */
/* Team                                                                */
/* ------------------------------------------------------------------ */
export const teamPage = singleton('teamPage', 'Our Team', [
  section('heroSection', 'Hero', [text('title', 'Headline (blue)', { rows: 3 }), text('subtitle', 'Headline (green)', { rows: 2 }), video('video', 'Hero video')]),
  section('founderSection', 'Founder', [
    str('title', 'Title line', { description: 'e.g. Owner & Founder' }),
    str('name', 'Name'),
    text('description', 'Bio', { rows: 8 }),
    video('video', 'Founder video'),
    image('photo', 'Founder photo (used if there is no video)'),
  ]),
  section('teamSection', 'Team intro', [text('title', 'Headline', { rows: 3 }), text('subtitle', 'Paragraph')]),
  defineField({
    name: 'members', title: 'Team members', type: 'array',
    of: [{
      type: 'object',
      fields: [
        str('name', 'Name'),
        str('role', 'Role'),
        text('description', 'Bio', { rows: 5 }),
        video('video', 'Video', 'Square MP4, about 10 seconds. Shown in the card.'),
        image('photo', 'Photo (used if there is no video)'),
        image('blob', 'Name blob artwork', { description: 'The coloured SVG shape with the name on it.' }),
        str('blobPosition', 'Blob position classes', { description: 'Optional Tailwind offset classes, e.g. "bottom-[-10px]". Leave empty normally.' }),
      ],
      preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
    }],
  }),
])

/* ------------------------------------------------------------------ */
/* The Kiddos Way                                                      */
/* ------------------------------------------------------------------ */
const block = (name, title, withCta = false) => section(name, title, [
  text('headline', 'Headline', { rows: 2 }),
  text('bodyText', 'Paragraph', { rows: 6 }),
  ...(withCta ? [str('ctaText', 'Button text'), url('ctaLink', 'Button link')] : []),
])

export const kiddosWayPage = singleton('kiddosWayPage', 'The Kiddos Way', [
  section('heroSection', 'Hero', [str('mainHeadline', 'Headline'), text('description', 'Paragraph'), image('photo', 'Hero photo')]),
  section('pinkyPromiseSection', 'Pinky Promise', [str('pinkyPromiseTitle', 'Title'), str('pinkyPromiseSubtitle', 'Subtitle')]),
  block('storyMissionSection', 'Our Story & Mission'),
  block('growthSection', 'Our Growth'),
  block('teamSection', 'Our Team', true),
  block('recognitionSection', 'Recognition & Community Trust'),
])

/* ------------------------------------------------------------------ */
/* Parent & Guardian info (policies)                                   */
/* ------------------------------------------------------------------ */
export const policiesPage = singleton('policiesPage', 'Parent & Guardian Info', [
  text('pageTitle', 'Headline', { rows: 2 }),
  text('pageDescription', 'Paragraph'),
  defineField({
    name: 'policies', title: 'Policy cards', type: 'array',
    of: [{ type: 'object', fields: [str('headline', 'Title', { description: 'Use <br> for a two-line title.' }), text('bodyText', 'Text', { rows: 5 })], preview: { select: { title: 'headline' } } }],
  }),
  section('fullPolicies', 'Full policies links', [
    str('text', 'Lead-in text'),
    defineField({
      name: 'links', title: 'Links', type: 'array',
      description: 'Leave empty to list every school automatically using its uploaded Policies PDF.',
      of: [{ type: 'object', fields: [str('name', 'Label'), url('url', 'Link')], preview: { select: { title: 'name', subtitle: 'url' } } }],
    }),
  ]),
])

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
export const faqPage = singleton('faqPage', "FAQ's", [
  section('heroSection', 'Hero', [str('mainHeadline', 'Headline'), text('description', 'Paragraph')]),
  defineField({ name: 'faqs', title: 'Questions', type: 'array', of: [faqItem] }),
])

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */
export const contactPage = singleton('contactPage', 'Contact', [
  section('heroSection', 'Hero', [text('description', 'Intro paragraph')]),
  stringList('categories', 'Form: "What is this about?" options'),
  stringList('schoolOptions', 'Form: "Which school?" options'),
  section('form', 'Form messages', [
    str('submitText', 'Submit button', { initialValue: 'SEND AWAY!' }),
    str('successText', 'Success message'),
    str('errorText', 'Error message'),
  ]),
  section('locationSection', 'Locations', [str('headline', 'Headline'), text('description', 'Paragraph')]),
])
