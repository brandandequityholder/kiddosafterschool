#!/usr/bin/env node
/**
 * One-time seed: maps the bundled copy (src/content/site.json, the pre-CMS content file)
 * onto the Studio schema, uploads the media the site already ships with, and writes every
 * document into the Sanity dataset. Safe to re-run: documents are createOrReplace'd by id.
 *
 *   SANITY_TOKEN=sk… node scripts/seed.mjs
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { basename } from 'node:path'

const PROJECT = process.env.SANITY_PROJECT_ID || '3p5mllwc'
const DATASET = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_TOKEN
if (!token) throw new Error('SANITY_TOKEN is required')

const client = createClient({ projectId: PROJECT, dataset: DATASET, apiVersion: '2024-01-01', token, useCdn: false })
const site = JSON.parse(readFileSync('src/content/site.json', 'utf8'))

/* ---------- media: upload public/cms files referenced by old asset refs ---------- */
const cmsFiles = readdirSync('public/cms')
const uploaded = new Map()
async function upload(oldRef) {
  if (!oldRef) return undefined
  if (uploaded.has(oldRef)) return uploaded.get(oldRef)
  const [kind, id, ...rest] = oldRef.split('-')
  const file = kind === 'image' ? `${id}-${rest[0]}.${rest[1]}` : `${id}.${rest[0]}`
  if (!cmsFiles.includes(file)) throw new Error(`Missing media file public/cms/${file}`)
  const buf = readFileSync(`public/cms/${file}`)
  const contentType = file.endsWith('.svg') ? 'image/svg+xml' : file.endsWith('.mp4') ? 'video/mp4' : undefined
  const asset = await client.assets.upload(kind === 'image' ? 'image' : 'file', buf, { filename: file, contentType })
  const ref = { _type: kind === 'image' ? 'image' : 'file', asset: { _type: 'reference', _ref: asset._id } }
  uploaded.set(oldRef, ref)
  console.log(`  uploaded ${file} → ${asset._id}`)
  return ref
}
const refOf = (obj) => obj?.asset?._ref

/* ---------- helpers ---------- */
let keyN = 0
const key = () => `k${(++keyN).toString(36).padStart(4, '0')}`
const withKeys = (arr) => (arr || []).map((x) => (typeof x === 'object' && x !== null ? { _key: key(), ...x } : x))
const strip = ({ _key, _type, ...rest }) => rest

/* ---------- documents ---------- */
const H = site.homePageContent
const P = site.homePage          // old name for the Rates & Enrollment page
const docs = []

docs.push({
  _id: 'siteSettings', _type: 'siteSettings',
  siteName: 'Kiddos After School',
  enrollUrl: 'https://kiddosatlanta.reg.eleyo.com/',
  email: site.footer.email, phone: site.footer.phone,
  brands: withKeys([
    { name: 'KIDDOS AFTER SCHOOL', url: '/', color: '#F58235' },
    { name: 'KIDDOS SUMMER CAMP', url: 'https://kiddossummercamp.com', color: '#8BC53F' },
    { name: 'KIDDOS EARLY LEARNING CENTER', url: 'https://kiddoselc.com', color: '#00B6BE' },
  ]),
  seo: { titleSuffix: ' | Kiddos After School', description: H.firstSection.description },
})

docs.push({
  _id: 'navigation', _type: 'navigation',
  menu: withKeys([
    { label: 'HOME', link: '/' },
    { label: 'ABOUT US', children: withKeys([{ label: 'THE KIDDOS WAY', link: '/values' }, { label: 'OUR TEAM', link: '/team' }]) },
    { label: 'PROGRAM DETAILS', children: withKeys([
      { label: 'SCHEDULE & ACTIVITIES', link: '/schedule' }, { label: 'RATES & ENROLLMENT', link: '/pricing' },
      { label: 'EXTRACURRICULAR CLASSES', link: '/classes' }, { label: 'PARENT & GUARDIAN INFO', link: '/policies' },
    ]) },
    { label: 'LOCATIONS', children: withKeys(site.schools.map((s) => ({ label: s.name.toUpperCase(), link: `/schools/${s.slug}` }))) },
    { label: 'FAQ’S', link: '/faq' },
  ]),
  mobileOrder: ['HOME', 'PROGRAM DETAILS', 'ABOUT US', 'LOCATIONS', 'FAQ’S'],
  enrollButton: { text: 'ENROLL', link: 'https://kiddosatlanta.reg.eleyo.com/' },
  contactButton: { text: 'CONTACT US', link: '/contact' },
})

docs.push({ _id: 'announcement', _type: 'announcement', ...strip(site.announcement) })

docs.push({
  _id: 'footer', _type: 'footer',
  ...strip(site.footer),
  locations: withKeys(site.footer.locations),
  externalLinks: withKeys(site.footer.externalLinks.map(strip)),
  socialLinks: withKeys(site.footer.socialLinks.map(strip)),
})

docs.push({ _id: 'lastSection', _type: 'lastSection', ...strip(site.lastSec) })
docs.push({ _id: 'anythingElse', _type: 'anythingElse', ...strip(site.anythingElseSection) })

docs.push({
  _id: 'homePage', _type: 'homePage',
  hero: { ...H.firstSection },
  intro: { ...H.secSection, infoBlocks: withKeys(H.secSection.infoBlocks) },
  dayInLife: { ...H.dayInLifeSection, steps: H.dayInLifeSection.steps.map((s) => s.stepText) },
  benefits: { ...H.benefitsSection, items: withKeys(site.benefits.map(([titleGreen, titleBlue, body]) => ({ titleGreen, titleBlue, body }))) },
  activityChoices: { ...H.camperChoiceSection },
  testimonials: { tagline: H.communitySection.tagline, headline: H.communitySection.headline,
    items: withKeys(H.communitySection.testimonials.map((t) => ({ reviewText: t.reviewText, reviewerName: t.reviewerName, reviewerIdentity: t.reviewerItentity }))) },
})

const SP = site.schedulePage
docs.push({
  _id: 'schedulePage', _type: 'schedulePage',
  firstSection: { ...SP.firstSection },
  heroSection: { ...SP.heroSection, calendarUrl: SP.heroSection.calendarUrl === '#' ? '' : SP.heroSection.calendarUrl },
  campersChoice: { ...SP.campersChoice },
  activities: withKeys(await Promise.all(SP.activitiesSection.activities.map(async (a) => ({ title: a.title, description: a.description, icon: await upload(refOf(a.icon)) })))),
  questsSection: { ...SP.questsSection },
  dailyProgram: { headline: SP.dailyProgram.headline, schedule: withKeys(SP.dailyProgram.schedule.map(strip)) },
})

docs.push({
  _id: 'ratesPage', _type: 'ratesPage',
  heroSection: { ...P.heroSection },
  steps: withKeys(await Promise.all(P.steps.map(async (s) => ({ title: s.title, description: s.description, icon: await upload(refOf(s.icon)) })))),
  ratesSection: { ...P.ratesSection },
  ratesBySchool: { heading: P.ratesBySchool.heading, columns: P.ratesBySchool.schools,
    rows: withKeys(P.ratesBySchool.rows.map(([label, ...values]) => ({ label, values }))), note: P.ratesBySchool.note, confirm: P.ratesBySchool.confirm },
  discountsSection: {
    first: { heading: P.discountsSection.first.heading, subHeading: P.discountsSection.first.subHeadiing },
    second: { heading: P.discountsSection.second.heading, subHeading: P.discountsSection.second.subHeadiing },
    third: { heading: P.discountsSection.third.heading, subHeading: P.discountsSection.third.subHeadiing },
    paySchedule: { heading: P.discountsSection.paySchedule.heading, subHeading: P.discountsSection.paySchedule.subHeadiing, ctaText: P.discountsSection.paySchedule.ctaText, ctaLink: P.discountsSection.paySchedule.ctaLink },
  },
  policiesSection: { scholarshipText: P.policiesSection.Scholarshipheading, scholarshipLink: 'mailto:info@KiddosAtlanta.com?subject=Scholarship%20Application', cancelationText: P.policiesSection.Cancelationheading },
})

const C = site.classesPage
docs.push({
  _id: 'classesPage', _type: 'classesPage',
  title: C.title, description: C.description, ctaText: C.ctaText, ctaUrl: C.ctaUrl, term: C.term,
  info: withKeys(C.info.map(([label, value, detail]) => ({ label, value, detail }))),
  notes: C.notes, scheduleHeading: C.scheduleHeading, scheduleSub: C.scheduleSub,
  week: withKeys(C.week.map(([day, items]) => ({ day, items }))),
  classes: withKeys(C.classes.map((k) => ({ name: k.name, meta: k.meta, description: k.description, price: k.price }))),
})

site.schools.forEach((s, i) => docs.push({
  _id: `school-${s.slug}`, _type: 'school',
  name: s.name, short: s.short, slug: { _type: 'slug', current: s.slug }, order: i + 1,
  contact: { director: s.director, directorTitle: s.directorTitle, phone: s.phone, email: s.email },
  location: { address: s.address, mapLink: s.mapLink, locationNote: s.locationNote },
  program: { hours: s.hours, grades: s.grades, enrollment: s.enrollment, enrollmentNote: s.enrollmentNote },
  rates: { rows: withKeys(s.rates.map(([label, value]) => ({ label, value }))), ratesNote: s.ratesNote },
  media: {},
  documents: { policiesUrl: s.policiesUrl === '#' ? '' : s.policiesUrl },
}))

docs.push({
  _id: 'schoolPageSettings', _type: 'schoolPageSettings',
  tagline: 'After School', registerButton: 'REGISTER SY 26/27',
  enroll: {
    heading: 'How to Enroll',
    steps: [
      'Review all Kiddos {policies}.',
      'Log in or create a new account in our {portal}.',
      'You will receive an email once you complete registration that indicates your registration went through.',
      'Send a Transportation note to your teacher.',
      'We will anticipate your student arriving on the date you select for them to start. If the start date changes, you must text {phone}.',
    ],
    ctaText: 'ENROLL NOW',
  },
  whatGoesOn: {
    heading: 'What Goes On During After School...',
    body: 'Each day is broken into Snack Time, Outside Time, Homework Help and Activity Choices. We also offer After School Specials, Fun Fridays and a Showcase each semester!',
    learnMoreText: 'LEARN MORE', learnMoreLink: '/schedule', calendarText: 'SAMPLE CALENDAR',
  },
  rates: { headingSuffix: ' Rates', subheading: 'Full Time Tuition for SY 26/27',
    scholarships: '<strong>Scholarships:</strong> sliding scale, first come first served. Scholarships are now closed.',
    allRatesText: 'ALL RATES & ENROLLMENT', policiesText: 'POLICIES & PROCEDURES' },
  classes: { headingPrefix: 'Extracurricular Classes @',
    body: 'Martial Arts, Gymnastics, Film Making, Chess, Soccer, STEM and Tap/Ballet. You do not have to be in After School to participate in classes.',
    ctaText: 'SEE CLASSES' },
})

const T = site.teamPage
docs.push({
  _id: 'teamPage', _type: 'teamPage',
  heroSection: { ...T.heroSection },
  founderSection: { ...T.founderSection },
  teamSection: { ...T.FoundersSection },
  members: withKeys(await Promise.all(T.founders.map(async (f) => ({
    name: f.name, role: f.role, description: f.description, blobPosition: f.blobPosition || '',
    video: await upload(refOf(f.video)), blob: await upload(refOf(f.blob)),
  })))),
})

docs.push({ _id: 'kiddosWayPage', _type: 'kiddosWayPage', ...site.KiddosWayPage })

const PO = site.policiesPage
docs.push({
  _id: 'policiesPage', _type: 'policiesPage',
  pageTitle: PO.pageTitle, pageDescription: PO.pageDescription,
  policies: withKeys(PO.policies.map(strip)),
  fullPolicies: { text: PO.fullPolicies.text, links: [] },   // empty → the site lists each school's uploaded PDF automatically
})

docs.push({ _id: 'faqPage', _type: 'faqPage', heroSection: site.faqPage.heroSection, faqs: withKeys(site.faqPage.faqs.map(strip)) })

docs.push({
  _id: 'contactPage', _type: 'contactPage',
  heroSection: site.contactPage.heroSection, categories: site.contactPage.categories, schoolOptions: site.contactPage.schoolOptions,
  form: { submitText: 'SEND AWAY!', successText: 'Thanks! Your message is on its way — we’ll be in touch soon.', errorText: 'Something went wrong. Please email us at info@kiddosatlanta.com.' },
  locationSection: site.contactPage.locationSection,
})

/* ---------- write ---------- */
const tx = client.transaction()
for (const d of docs) tx.createOrReplace(d)
const res = await tx.commit()
console.log(`Wrote ${docs.length} documents (${uploaded.size} media assets uploaded). Transaction ${res.transactionId}`)
