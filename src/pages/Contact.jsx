import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useContent, assetUrl } from '../lib/sanity'
import { track } from '../lib/analytics'
import { Link } from 'react-router-dom'
import RichText from '../lib/RichText'
import { useReveal } from '../lib/hooks'
import AnythingElse from '../components/AnythingElse'

/* EmailJS — same service/template the current site uses. Override via .env if they change. */
const EMAILJS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE || 'service_nuvhrhi',
  template: import.meta.env.VITE_EMAILJS_TEMPLATE || 'template_porm1gg',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'fms-Ts9Vk_Al7EVMr',
}
const DEFAULT_CATEGORIES = ['General Inquiry', 'Enrollment Questions', 'Extracurricular Classes', 'Partnership / Collaboration', 'Feedback / Complaints', 'Other']
const DEFAULT_SCHOOLS = ['E. Rivers', 'Garden Hills', 'Atlanta Classical Academy', 'Not sure yet']
const PLACEHOLDER = 'Choose from the list....'
const SCHOOL_PLACEHOLDER = 'Choose a school....'

const LABEL = "w-full px-[66px] lg:px-0 lg:max-w-[1019px] text-white text-[25px] lg:text-[38px] font-bold font-['League_Spartan'] lg:leading-[67px]"
const FIELD = "w-full px-[27px] lg:px-[43px] h-[58px] lg:h-[99px] bg-[#0b3163] text-white placeholder:text-[#ffffff7b] text-[14.586px] lg:text-[30px] font-light font-['League_Spartan'] leading-[25px] lg:leading-[67px] outline-none border-none transition-all duration-300 focus:ring-2 focus:ring-[#86d24a]"

function Reveal({ as: Tag = 'p', className = '', children, ...rest }) {
  const [ref, cls] = useReveal()
  return <Tag ref={ref} className={`${className} ${cls}`} {...rest}>{children}</Tag>
}

function Dropdown({ label, value, options, placeholder, onChange, error }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="space-y-[15px] lg:space-y-[9px]">
      <label className={LABEL}>{label}</label>
      <div className="relative px-[48px] lg:px-0 w-full max-w-[998px]">
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className={`w-full px-[27px] lg:px-[43px] flex justify-between items-center h-[58px] lg:h-[99px] bg-[#0b3163] cursor-pointer select-none transition-all duration-300 focus:ring-2 focus:ring-[#86d24a]${error ? ' ring-2 ring-red-400' : ''}`}>
          <p className="text-white text-[14.586px] lg:text-[30px] font-light font-['League_Spartan'] leading-[25px] lg:leading-[67px]">{value || placeholder}</p>
          <div className="w-fit h-fit lg:block hidden">
            <svg className={`transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`} width="33" height="28" viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.0215 27.75L1.76848e-05 -3.01796e-06L32.043 -2.1668e-07L16.0215 27.75Z" fill="#D9D9D9" /></svg>
          </div>
          <div className="w-fit h-fit lg:hidden">
            <svg className={`transition-transform duration-300 ${open ? 'rotate-0' : 'rotate-180'}`} width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.14959 0L12.2992 10.6515L-6.10352e-05 10.6515L6.14959 0Z" fill="#D9D9D9" /></svg>
          </div>
        </button>
        <div className={`absolute z-20 left-[48px] right-[48px] lg:left-0 lg:right-0 bg-[#0b3163] overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {options.map((c) => (
            <div key={c} role="option" aria-selected={value === c} onClick={() => { onChange(c); setOpen(false) }} className="px-[43px] py-4 text-white text-[18px] lg:text-[26px] font-['League_Spartan'] hover:bg-[#0b4a99] cursor-pointer border-t border-[#0e4b9b]">{c}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactForm({ categories = DEFAULT_CATEGORIES, schools = DEFAULT_SCHOOLS, messages = {} }) {
  const [category, setCategory] = useState('')
  const [school, setSchool] = useState('')
  const [form, setForm] = useState({ fullName: '', email: '', phoneNumber: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const onChange = (e) => { const { name, value } = e.target; setForm((f) => ({ ...f, [name]: value })); setErrors((er) => ({ ...er, [name]: false })) }
  const validate = () => {
    const er = {}
    if (!category) er.category = true
    if (!school) er.school = true
    if (!form.fullName.trim()) er.fullName = true
    if (!form.email.trim()) er.email = true
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'invalid'
    if (!form.message.trim()) er.message = true
    setErrors(er)
    return Object.keys(er).length === 0
  }
  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      await emailjs.send(EMAILJS.service, EMAILJS.template, { category, school, ...form }, EMAILJS.publicKey)
      setStatus('success'); track('contact_submit', { category, school }); setForm({ fullName: '', email: '', phoneNumber: '', message: '' }); setCategory(''); setSchool(''); setErrors({})
    } catch { setStatus('error') }
  }
  const ring = (k) => (errors[k] ? ' ring-2 ring-red-400' : '')

  return (
    <form className="space-y-[68px] lg:space-y-[91px]" onSubmit={submit} noValidate>
      <div className="space-y-[30px] lg:space-y-[44px]">
        <Dropdown label="How can we help you?" value={category} options={categories} placeholder={PLACEHOLDER} onChange={(v) => { setCategory(v); setErrors((er) => ({ ...er, category: false })) }} error={errors.category} />
        <Dropdown label="Which school?" value={school} options={schools} placeholder={SCHOOL_PLACEHOLDER} onChange={(v) => { setSchool(v); setErrors((er) => ({ ...er, school: false })) }} error={errors.school} />
        {[['Full Name', 'fullName', 'text', 'My Name is...'], ['Email Address', 'email', 'email', 'My Email Address is...'], ['Phone Number', 'phoneNumber', 'tel', 'My Phone Number is...']].map(([label, name, type, ph]) => (
          <div key={name} className="space-y-[15px] w-full lg:space-y-[9px]">
            <label htmlFor={name} className={LABEL}>{label}</label>
            <div className="relative px-[48px] lg:px-0 w-full max-w-[998px]">
              <input id={name} name={name} type={type} placeholder={ph} value={form[name]} onChange={onChange} className={FIELD + ring(name)} />
              {errors[name] === 'invalid' && <p className="text-[#F8EA2B] text-sm mt-2 font-['Montserrat']">Please enter a valid email address.</p>}
            </div>
          </div>
        ))}
        <div className="space-y-[15px] lg:space-y-[9px]">
          <label htmlFor="message" className={LABEL}>Message</label>
          <div className="relative px-[48px] lg:px-0 w-full max-w-[998px]">
            <textarea id="message" name="message" placeholder="Talk to us... :)" value={form.message} onChange={onChange} className={`w-full px-[27px] lg:px-[43px] pt-[20px] lg:pt-[30px] h-[150px] lg:h-[349px] bg-[#0b3163] text-white placeholder:text-[#ffffff7b] text-[14.586px] lg:text-[30px] font-light font-['League_Spartan'] leading-[25px] lg:leading-[40px] outline-none border-none resize-none transition-all duration-300 focus:ring-2 focus:ring-[#86d24a]${ring('message')}`} />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <button type="submit" disabled={status === 'sending'} className="w-[261.287px] lg:mx-0 mx-auto flex items-center justify-center h-[60.207px] lg:ml-[9px] text-[#004AAD] text-[16px] lg:text-xl font-bold font-['Montserrat'] leading-[69.32px] tracking-[3.90px] bg-[#F8EA2B] rounded-[6px] hover:brightness-95 disabled:opacity-70">
          {status === 'sending' ? 'SENDING…' : (messages.submitText || 'SEND AWAY!')}
        </button>
        {status === 'success' && <p className="text-[#86d24a] lg:ml-[9px] text-center lg:text-left font-['Montserrat'] text-[16px] lg:text-[20px]">{messages.successText || 'Thanks! Your message is on its way — we’ll be in touch soon.'}</p>}
        {status === 'error' && <p className="text-[#F8EA2B] lg:ml-[9px] text-center lg:text-left font-['Montserrat'] text-[16px] lg:text-[20px]">{messages.errorText || 'Something went wrong. Please email us at info@kiddosatlanta.com.'}</p>}
      </div>
    </form>
  )
}

export default function Contact() {
  const [c] = useContent('contactPage')
  const [schoolDocs, sSource] = useContent('school')
  if (!c) return null
  const hero = c.heroSection || {}
  const loc = c.locationSection || {}
  const schools = schoolDocs || []
  return (
    <div>
      <section className="w-full relative bg-[#0B3D80] mt-[78px] pt-[78px]">
        <div className="max-w-[1243.406px] w-full relative lg:px-0 pb-[50px] lg:pb-[200px] pt-[60px] lg:pt-[190px] lg:pl-[120px] mx-auto">
          <div className="space-y-[40px] pb-[60px] px-[66px] lg:px-0 lg:pb-[120px]">
            <h1 className="max-w-[1019px] text-white text-[42px] lg:text-[64px] font-bold font-['League_Spartan'] leading-[44.5px] lg:leading-[67px] fadeIn">
              Any<br className="lg:hidden" /> Questions,<br className="lg:hidden" /> Kudos,<br className="lg:hidden" /> Concerns<br /> or Collabs?<br className="lg:hidden" /> <span className="text-[#86d24a]">Let’s Connect!</span>
            </h1>
            <p className="max-w-[958px] text-white text-[14px] lg:text-xl font-medium font-['Montserrat'] leading-[33.1px] lg:leading-[33.10px] fadeIn"><RichText text={hero.description} /></p>
          </div>
          <ContactForm categories={c.categories?.length ? c.categories : undefined} schools={c.schoolOptions?.length ? c.schoolOptions : undefined} messages={c.form || {}} />
        </div>
        <img src="/assets/firstCurve.svg" alt="" className="w-full -mb-1" />
      </section>
      <section className="w-full relative bg-[#F8FBFF]">
        <div className="max-w-[1243.406px] space-y-[31px] lg:space-y-[98px] w-full relative lg:px-0 px-[66px] pb-[50px] lg:pb-[200px] pt-[60px] lg:pt-[190px] lg:pl-[120px] mx-auto">
          <div className="space-y-[27px] lg:space-y-[35px]">
            <h2 className="w-full max-w-[1019px] text-[#004aad] text-[42px] lg:text-[64px] font-bold font-['League_Spartan'] leading-[44.5px] lg:leading-[67px]">{loc.headline}</h2>
            <Reveal className="w-full max-w-[334px] lg:max-w-[977px] text-[#004aad] text-[14px] lg:text-[38px] font-normal font-['League_Spartan'] leading-[33.1px] lg:leading-[50px]">{loc.description}</Reveal>
          </div>
          <div className="space-y-[60px] lg:space-y-[90px]">
            {schools.map((sc) => { const slug = sc.slug?.current || sc.slug; const ct = sc.contact || sc; const lo = sc.location || sc; const map = assetUrl(lo.mapImage, sSource, ''); return (
              <div key={slug} className="flex lg:flex-row flex-col space-y-[29px] lg:space-y-0 h-fit lg:space-x-[49px]">
                <div className="relative shrink-0">
                  <div className="absolute h-full w-full flex items-center justify-center"><img src="/assets/map-pin.svg" alt="" width="93" height="115" /></div>
                  <img src={map || '/assets/map.png'} alt={`Map showing ${sc.name}`} className="w-[346px] lg:w-[480px] h-[264px] lg:h-[360px] object-cover" />
                  {!map && <p className="absolute bottom-[10px] left-[12px] text-[#004aad] text-[11px] font-bold font-['League_Spartan'] tracking-[2px] bg-white/85 px-[10px] py-[5px] rounded">MAP · pin on {sc.short} <mark className="draft-note">[MAP NEEDED]</mark></p>}
                </div>
                <div className="text-center lg:text-start flex flex-col justify-center space-y-[24px]">
                  <div>
                    <p className="text-[#004aad] text-[26px] lg:text-[38px] font-bold font-['League_Spartan'] leading-[32px] lg:leading-[46px]">{sc.name}</p>
                    <p className="text-[#004aad] text-[17px] lg:text-[24px] font-normal font-['League_Spartan'] leading-[28px] lg:leading-[36px]">{lo.address}</p>
                    <p className="text-[#004aad] text-[16px] lg:text-[22px] font-normal font-['League_Spartan'] leading-[28px] lg:leading-[34px] pt-[8px]">
                      {ct.director}{ct.directorTitle ? `, ${ct.directorTitle}` : ''} · <a href={`tel:${String(ct.phone || '').replace(/\D/g, '')}`} className="font-bold hover:underline">{ct.phone}</a><br />
                      <a href={`mailto:${ct.email}`} className="font-bold hover:underline">{ct.email}</a>
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-[12px]">
                    <a rel="noopener noreferrer" className="w-[220px] flex items-center h-[52px] bg-[#004aad] justify-center text-white text-[14px] font-bold font-['Montserrat'] tracking-[3px] rounded-[5.91px] hover:brightness-110" href={lo.mapLink} target="_blank">GET DIRECTIONS</a>
                    <Link className="w-[220px] flex items-center h-[52px] bg-[#F8EA2B] justify-center text-[#004aad] text-[14px] font-bold font-['Montserrat'] tracking-[3px] rounded-[5.91px] hover:brightness-95" to={`/schools/${slug}`}>SCHOOL PAGE</Link>
                  </div>
                </div>
              </div>
            ) })}
          </div>
        </div>
      </section>
      <div className="bg-[#F8FBFF]">
        <AnythingElse className="!mt-0" />
      </div>
    </div>
  )
}
