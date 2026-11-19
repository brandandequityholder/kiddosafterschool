/**
 * Analytics: Vercel Web Analytics (always on when deployed to Vercel) + Google Analytics 4
 * (when VITE_GA_ID is set) + optional Microsoft Clarity session recordings (VITE_CLARITY_ID).
 *
 * Page views are tracked on every route change. Custom events are sent to both GA4 and
 * Vercel. Most events are captured automatically from the links people click:
 *
 *   enroll_click        any link to the registration portal      { page, label }
 *   phone_click         tel: links                                { page, number }
 *   email_click         mailto: links                            { page, address }
 *   document_download   PDF / calendar / policies links           { page, file }
 *   directions_click    Google Maps links                         { page, label }
 *   outbound_click      any other external link                   { page, url }
 *   school_view         a school page opened                      { school }
 *   contact_submit      contact form sent successfully            { category, school }
 */
import { track as vercelTrack } from '@vercel/analytics'

const GA_ID = import.meta.env.VITE_GA_ID
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID
const ENROLL_HOST = 'eleyo.com'

let booted = false
export function initAnalytics() {
  if (booted || typeof window === 'undefined') return
  booted = true
  if (GA_ID) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID, { send_page_view: false })
  }
  if (CLARITY_ID) {
    ;(function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y)
    })(window, document, 'clarity', 'script', CLARITY_ID)
  }
  document.addEventListener('click', onClick, { capture: true })
}

export function pageview(path, title) {
  if (window.gtag) window.gtag('event', 'page_view', { page_path: path, page_title: title, page_location: window.location.href })
  // Vercel tracks page views itself via <Analytics />.
}

export function track(name, params = {}) {
  const data = { page: window.location.pathname, ...params }
  try { if (window.gtag) window.gtag('event', name, data) } catch {}
  try { vercelTrack(name, data) } catch {}
}

function onClick(e) {
  const a = e.target.closest?.('a[href]')
  if (!a) return
  const href = a.getAttribute('href') || ''
  const label = (a.textContent || '').trim().slice(0, 60)
  if (href.startsWith('tel:')) return track('phone_click', { number: href.slice(4), label })
  if (href.startsWith('mailto:')) return track('email_click', { address: href.slice(7).split('?')[0], label })
  let url
  try { url = new URL(href, window.location.href) } catch { return }
  if (url.hostname.endsWith(ENROLL_HOST)) return track('enroll_click', { label })
  if (/\.pdf($|\?)/i.test(url.pathname) || url.hostname === 'cdn.sanity.io' && url.pathname.includes('/files/')) return track('document_download', { file: url.pathname.split('/').pop(), label })
  if (/google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/.test(url.href)) return track('directions_click', { label })
  if (url.origin !== window.location.origin) return track('outbound_click', { url: url.href, label })
}
