import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes, SINGLETONS } from './schemas'

const SINGLETON_NAMES = new Set(SINGLETONS.map((t) => t.name))
const PAGES = ['homePage', 'kiddosWayPage', 'teamPage', 'schedulePage', 'ratesPage', 'classesPage', 'policiesPage', 'faqPage', 'contactPage']
const GLOBAL = ['announcement', 'navigation', 'footer', 'lastSection', 'anythingElse', 'siteSettings']

const TITLES = Object.fromEntries(SINGLETONS.map((t) => [t.name, t.title]))
const single = (S, name) =>
  S.listItem().title(TITLES[name] || name).id(name).child(S.document().schemaType(name).documentId(name))

export default defineConfig({
  name: 'kiddos-after-school',
  title: 'Kiddos After School',
  projectId: '3p5mllwc',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list().title('Content').items([
          S.listItem().title('Pages').child(S.list().title('Pages').items(PAGES.map((n) => single(S, n)))),
          S.listItem().title('Schools').child(S.documentTypeList('school').title('Schools').defaultOrdering([{ field: 'order', direction: 'asc' }])),
          single(S, 'schoolPageSettings'),
          S.divider(),
          ...GLOBAL.map((n) => single(S, n)),
        ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  document: {
    // Singletons: no "create new", no duplicate, no delete.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global' ? prev.filter((t) => !SINGLETON_NAMES.has(t.templateId)) : prev,
    actions: (prev, { schemaType }) =>
      SINGLETON_NAMES.has(schemaType) ? prev.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action)) : prev,
  },
})
