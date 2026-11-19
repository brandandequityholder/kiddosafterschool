import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { initAnalytics, pageview } from './lib/analytics'
import Announcement from './components/Announcement'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import Pricing from './pages/Pricing'
import Team from './pages/Team'
import Values from './pages/Values'
import Policies from './pages/Policies'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import Classes from './pages/Classes'
import School from './pages/School'

const TITLES = {
  '/': 'Kiddos After School | Atlanta’s Best After School',
  '/schedule': 'Schedule & Activities | Kiddos After School',
  '/pricing': 'Rates & Enrollment | Kiddos After School',
  '/classes': 'Extracurricular Classes | Kiddos After School',
  '/team': 'Our Team | Kiddos After School',
  '/values': 'The Kiddos Way | Kiddos After School',
  '/policies': 'Parent & Guardian Info | Kiddos After School',
  '/faq': 'FAQ’s | Kiddos After School',
  '/contact': 'Contact Us | Kiddos After School',
  '/schools/e-rivers': 'Kiddos @ E. Rivers | Kiddos After School',
  '/schools/garden-hills': 'Kiddos @ Garden Hills | Kiddos After School',
  '/schools/atlanta-classical': 'Kiddos @ Atlanta Classical | Kiddos After School',
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const title = TITLES[pathname] || (pathname.startsWith('/schools/') ? 'Kiddos After School' : 'Kiddos After School')
    document.title = title
    initAnalytics()
    pageview(pathname, title)
    if (hash) {
      const el = document.querySelector(hash)
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="overflow-hidden p-0 m-0">
      <ScrollToTop />
      <Analytics />
      <Announcement />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/team" element={<Team />} />
        <Route path="/values" element={<Values />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/schools/:slug" element={<School />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}
