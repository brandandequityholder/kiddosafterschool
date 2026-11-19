import { siteSettings, navigation, announcement, footer, lastSection, anythingElse } from './site'
import { homePage, schedulePage, ratesPage, classesPage, school, schoolPageSettings, teamPage, kiddosWayPage, policiesPage, faqPage, contactPage } from './pages'

export const SINGLETONS = [
  homePage, kiddosWayPage, teamPage, schedulePage, ratesPage, classesPage, policiesPage, faqPage, contactPage,
  schoolPageSettings, announcement, navigation, footer, lastSection, anythingElse, siteSettings,
]

export const schemaTypes = [...SINGLETONS, school]
