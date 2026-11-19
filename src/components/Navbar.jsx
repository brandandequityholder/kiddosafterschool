import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useScrollLock } from '../lib/hooks'

export const ENROLL_URL = 'https://kiddosatlanta.reg.eleyo.com/'

// Program switcher: After School is the current site, so it links home.
const BRANDS = [
  { logo: '/assets/KAS.svg', lines: ['KIDDOS', 'AFTER', 'SCHOOL'], href: '/', internal: true },
  { logo: '/assets/logo.svg', lines: ['KIDDOS', 'SUMMER', 'CAMP'], href: 'https://kiddossummercamp.com' },
  { logo: '/assets/ELC.svg', lines: ['KIDDOS', 'EARLY', 'LEARNING', 'CENTER'], href: 'https://kiddoselc.com' },
]

const MENU = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT US', children: [
    { label: 'THE KIDDOS WAY', to: '/values' },
    { label: 'OUR TEAM', to: '/team' },
  ] },
  { label: 'PROGRAM DETAILS', children: [
    { label: 'SCHEDULE & ACTIVITIES', to: '/schedule' },
    { label: 'RATES & ENROLLMENT', to: '/pricing' },
    { label: 'EXTRACURRICULAR CLASSES', to: '/classes' },
    { label: 'PARENT & GUARDIAN INFO', to: '/policies' },
  ] },
  { label: 'LOCATIONS', children: [
    { label: 'KIDDOS @ E. RIVERS', to: '/schools/e-rivers' },
    { label: 'KIDDOS @ GARDEN HILLS', to: '/schools/garden-hills' },
    { label: 'KIDDOS @ ATLANTA CLASSICAL', to: '/schools/atlanta-classical' },
  ] },
  { label: 'FAQ’S', to: '/faq' },
]

// Mobile order mirrors the approved camp mobile design: Home, Program Details, About Us, Locations, FAQ's
const MOBILE_MENU = [MENU[0], MENU[2], MENU[1], MENU[3], MENU[4]]

const Chevron = ({ className = '' }) => (
  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9.99512 0.999512L5.49727 5.15137L0.999412 0.999512" stroke="white" strokeWidth="1.99905" strokeLinecap="round" />
  </svg>
)
const ChevronRight = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" className="transition-colors" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
  </svg>
)

const dropItem = 'px-5 border-t-[0.5px] border-opacity-20 border-white h-[86px] py-3 flex items-center justify-between text-white hover:bg-[#F8EA2B] hover:text-[#004AAD] text-xs tracking-wider transition-colors'
const dropText = "text-xs font-extrabold font-['League_Spartan'] leading-[14px] tracking-widest"

function BrandList({ onNavigate }) {
  return BRANDS.map((b) => b.internal ? (
    <Link key={b.href} className={dropItem} to={b.href} onClick={onNavigate}>
      <div className="flex items-center space-x-[15px]">
        <img src={b.logo} alt="" className="w-[50px]" />
        <p className={dropText}>
          {b.lines.map((l, i) => <span key={l}>{l}{i < b.lines.length - 1 ? <br /> : null}</span>)}
        </p>
      </div>
      <ChevronRight />
    </Link>
  ) : (
    <a key={b.href} rel="noopener noreferrer" className={dropItem} href={b.href} target="_blank" onClick={onNavigate}>
      <div className="flex items-center space-x-[15px]">
        <img src={b.logo} alt="" className="w-[50px]" />
        <p className={dropText}>
          {b.lines.map((l, i) => <span key={l}>{l}{i < b.lines.length - 1 ? <br /> : null}</span>)}
        </p>
      </div>
      <ChevronRight />
    </a>
  ))
}

export default function Navbar() {
  const [open, setOpen] = useState(false)          // mobile main menu
  const [brands, setBrands] = useState(false)      // mobile brand switcher
  const [expanded, setExpanded] = useState(null)   // mobile accordion
  const location = useLocation()
  useScrollLock(open || brands)
  useEffect(() => { setOpen(false); setBrands(false); setExpanded(null) }, [location.pathname])

  const close = () => { setOpen(false); setBrands(false) }

  return (
    <div className="w-full z-50 absolute flex justify-center">
      <div className="mx-auto w-full lg:max-w-[1284px] items-center flex justify-between lg:mt-[20px] lg:rounded-[33px] bg-[#004AAD] h-[81.9609px] absolute top-[78px] shadow-[0_4px_5px_rgba(0,0,0,0.15)]">
        {/* ---- Brand block + switcher ---- */}
        <div className="relative w-fit lg:rounded-l-[33px] group min-w-[275px] space-x-[20px] flex items-center px-[22px] bg-[#043679] h-full">
          <Link to="/" aria-label="Kiddos After School home"><img src="/assets/KAS.svg" alt="" className="w-[56px]" /></Link>
          <button type="button" className="flex flex-1 justify-between items-end cursor-pointer text-left" onClick={() => { setBrands((v) => !v); setOpen(false) }} aria-label="Switch Kiddos site">
            <div className="w-[141.93px] h-[30.99px] text-white text-xs font-extrabold font-['League_Spartan'] leading-[13.99px] tracking-widest">
              KIDDOS<br />AFTER SCHOOL
            </div>
            <div className="mb-[5px] transform lg:block hidden transition-transform duration-100 group-hover:rotate-180"><Chevron /></div>
            <div className={`mb-[5px] transform lg:hidden block transition-transform duration-300 ${brands ? 'rotate-180' : 'rotate-0'}`}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
            </div>
          </button>
          {/* desktop hover dropdown */}
          <div className="lg:block hidden">
            <div className="absolute right-0 top-full hidden group-hover:flex flex-col bg-[#043679] w-[90%] shadow-lg rounded-b-lg">
              <BrandList />
            </div>
          </div>
        </div>

        {/* ---- Desktop menu ---- */}
        <div className="pr-[28px] hidden lg:flex space-x-[40px]">
          <div className="flex space-x-[36px]">
            {MENU.map((item) => item.children ? (
              <div key={item.label} className="relative group flex items-center space-x-[10px] text-white text-xs font-bold font-['League_Spartan'] leading-[37.18px] tracking-[2.0926px] cursor-pointer">
                <span>{item.label}</span>
                <div className="transform transition-transform duration-100 group-hover:rotate-180"><Chevron /></div>
                <div className={`absolute -left-1/2 top-full hidden group-hover:flex flex-col bg-[#043679] ${item.label === 'ABOUT US' ? 'w-[240px]' : item.label === 'LOCATIONS' ? 'w-[300px]' : 'w-[290px]'} shadow-lg rounded-b-lg overflow-hidden`}>
                  <div className="w-full bg-[#004AAD] h-[23px]" />
                  {item.children.map((c) => (
                    <Link key={c.to} className={dropItem} to={c.to}>
                      <span className={dropText}>{c.label}</span>
                      <ChevronRight />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={item.label} to={item.to}>
                <div className="min-w-[53.16px] text-white text-xs font-bold font-['League_Spartan'] leading-[37.18px] tracking-[2.0926px]">{item.label}</div>
              </NavLink>
            ))}
          </div>
          <div className="flex h-8 space-x-[24px]">
            <a rel="noopener noreferrer" className="w-[101.95px] text-[#004aad] flex items-center justify-center text-[11.99px] font-bold font-['League_Spartan'] leading-[37.18px] tracking-[2.093px] bg-[#f8ea2b] rounded-lg hover:brightness-95 transition" href={ENROLL_URL} target="_blank">ENROLL</a>
            <Link className="min-w-[140px] text-[#004aad] flex items-center justify-center text-[11.99px] font-bold font-['League_Spartan'] leading-[37.18px] tracking-[2.093px] bg-[#f8ea2b] rounded-lg hover:brightness-95 transition" to="/contact">CONTACT US</Link>
          </div>
        </div>

        {/* ---- Mobile burger ---- */}
        <div className="lg:hidden z-[99] h-full flex justify-center items-center pr-[24px]">
          <button type="button" className="z-[101] h-full w-fit flex justify-end relative cursor-pointer" onClick={() => { setOpen((v) => !v); setBrands(false) }} aria-expanded={open} aria-label="Menu">
            <div className="flex items-center justify-end h-full w-full p-0 m-0 space-x-[10px]">
              <div className="text-white font-bold text-[12px] tracking-widest font-['League_Spartan']">{open ? 'CLOSE' : 'MENU'}</div>
              <div className="h-[18px] flex flex-col justify-between items-center cursor-pointer z-50">
                <span className="block w-5 h-[2px] bg-white rounded-sm transition-all duration-300 ease-in-out" style={{ transform: open ? 'translateY(8px) rotate(45deg)' : 'none' }} />
                <span className="block w-5 h-[2px] bg-white rounded-sm transition-all duration-300 ease-in-out" style={{ opacity: open ? 0 : 1 }} />
                <span className="block w-5 h-[2px] bg-white rounded-sm transition-all duration-300 ease-in-out" style={{ transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ---- Mobile brand switcher panel ---- */}
      <div className={`lg:hidden fixed left-0 right-0 top-[160px] z-[95] bg-[#043679] shadow-xl transition-all duration-300 origin-top ${brands ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
        <div className="flex flex-col px-[8px] pb-[20px]">
          <BrandList onNavigate={close} />
        </div>
      </div>

      {/* ---- Mobile full-screen menu ---- */}
      <div className={`lg:hidden fixed inset-0 top-[160px] z-[94] bg-[#043679] text-white transition-opacity duration-300 overflow-y-auto ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col px-[24px] pt-[10px] pb-[40px]">
          {MOBILE_MENU.map((item) => item.children ? (
            <div key={item.label} className="border-b-[0.5px] border-white/20">
              <button type="button" className="w-full flex justify-between items-center h-[70px] text-[13px] font-bold font-['League_Spartan'] tracking-[2.4px]" onClick={() => setExpanded(expanded === item.label ? null : item.label)} aria-expanded={expanded === item.label}>
                <span>{item.label}</span>
                <Chevron className={`transition-transform duration-200 ${expanded === item.label ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${expanded === item.label ? 'max-h-[400px] pb-[10px]' : 'max-h-0'}`}>
                {item.children.map((c) => (
                  <Link key={c.to} to={c.to} className="flex justify-between items-center h-[48px] pl-[4px] text-[11px] font-semibold font-['League_Spartan'] tracking-[2px] text-white/90" onClick={close}>
                    <span>{c.label}</span><ChevronRight />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={item.label} to={item.to} className="flex items-center h-[70px] border-b-[0.5px] border-white/20 text-[13px] font-bold font-['League_Spartan'] tracking-[2.4px]" onClick={close}>{item.label}</Link>
          ))}
          <div className="flex flex-col space-y-[14px] pt-[36px]">
            <a rel="noopener noreferrer" href={ENROLL_URL} target="_blank" className="h-[44px] flex items-center justify-center bg-[#F8EA2B] text-[#004AAD] rounded-[6px] text-[12px] font-bold font-['League_Spartan'] tracking-[2.4px]">ENROLL</a>
            <Link to="/contact" onClick={close} className="h-[44px] flex items-center justify-center bg-[#F8EA2B] text-[#004AAD] rounded-[6px] text-[12px] font-bold font-['League_Spartan'] tracking-[2.4px]">CONTACT US</Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
