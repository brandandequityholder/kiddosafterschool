import { Link, useParams, Navigate } from 'react-router-dom'
import { useContent, assetUrl, docUrl } from '../lib/sanity'
import RichText from '../lib/RichText'
import { useReveal } from '../lib/hooks'
import AnythingElse from '../components/AnythingElse'
import { ENROLL_URL } from '../components/Navbar'
import { useState, useEffect } from 'react'
import { track } from '../lib/analytics'

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, cls] = useReveal()
  return <Tag ref={ref} className={`${className} ${cls}`} {...rest}>{children}</Tag>
}

const PILL = "h-[44px] px-[24px] inline-flex items-center justify-center rounded-[8px] text-[12px] lg:text-[13px] font-bold font-['League_Spartan'] tracking-[2px] transition"
const H3 = 'MadeGentle text-[#7DCE3E] text-[34px] lg:text-[40px] font-normal uppercase leading-[36px]'
const LEAD = "text-[#004aad] text-[18px] lg:text-[22px] font-bold font-['League_Spartan'] leading-[26px]"
const BODY = "text-[#004aad] text-[15px] lg:text-[17px] font-[500] font-['Montserrat'] leading-[25px] lg:leading-[28px]"

const tel = (p) => `tel:${String(p || '').replace(/\D/g, '')}`

/** Simple cross-fading photo carousel for the school's uploaded photos. */
function Photos({ photos, source, label }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (photos.length < 2) return
    const t = setInterval(() => setI((x) => (x + 1) % photos.length), 4000)
    return () => clearInterval(t)
  }, [photos.length])
  if (!photos.length) {
    return (
      <>
        <video playsInline src="/assets/TopVid.mp4" loop autoPlay muted className="w-full h-full object-cover" />
        <p className="absolute bottom-[14px] left-[18px] text-white text-[11px] font-bold font-['League_Spartan'] tracking-[2px] bg-black/40 px-[10px] py-[6px] rounded">PHOTO CAROUSEL · After School at {label} <mark className="draft-note">[PHOTOS NEEDED]</mark></p>
      </>
    )
  }
  return (
    <>
      {photos.map((p, n) => (
        <img key={p._key || n} src={assetUrl(p, source)} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${n === i ? 'opacity-100' : 'opacity-0'}`} />
      ))}
      {photos.length > 1 && (
        <div className="absolute bottom-[14px] left-0 right-0 flex justify-center space-x-2">
          {photos.map((_, n) => <button key={n} type="button" aria-label={`Photo ${n + 1}`} onClick={() => setI(n)} className={`w-2.5 h-2.5 rounded-full ${n === i ? 'bg-white' : 'bg-white/50'}`} />)}
        </div>
      )}
    </>
  )
}

/**
 * One page per school: /schools/:slug.
 * Content: `school` documents (per school) + `schoolPageSettings` (copy shared by every school page).
 */
export default function School() {
  const { slug } = useParams()
  const [schools, source] = useContent('school')
  const [cfg, cfgSource] = useContent('schoolPageSettings')
  const s = (schools || []).find((x) => (x.slug?.current || x.slug) === slug)
  useEffect(() => {
    if (!s) return
    document.title = `${s.name} | Kiddos After School`
    track('school_view', { school: s.short || s.name })
  }, [s?.name]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!s || !cfg) return <Navigate to="/" replace />

  const contact = s.contact || s
  const loc = s.location || s
  const prog = s.program || s
  const rateRows = (s.rates?.rows || s.rates || []).map((r) => (Array.isArray(r) ? { label: r[0], value: r[1] } : r))
  const ratesNote = s.rates?.ratesNote ?? s.ratesNote
  const policiesUrl = docUrl(s.documents?.policiesPdf, s.documents?.policiesUrl || s.policiesUrl, source)
  const calendarUrl = docUrl(cfg.whatGoesOn?.calendarPdf, null, cfgSource, '')
  const heroVideo = assetUrl(s.media?.heroVideo, source, '')
  const heroImage = assetUrl(s.media?.heroImage, source, '')
  const photos = s.media?.photos || []
  const ext = (u) => (u && u.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})

  // "How to enroll" steps support {policies}, {portal} and {phone} placeholders.
  const fill = (text) => {
    const parts = String(text).split(/(\{policies\}|\{portal\}|\{phone\})/)
    return parts.map((p, i) => {
      if (p === '{policies}') return <a key={i} href={policiesUrl} {...ext(policiesUrl)} className="underline font-semibold">policies and procedures</a>
      if (p === '{portal}') return <a key={i} href={ENROLL_URL} target="_blank" rel="noopener noreferrer" className="underline font-semibold">registration portal</a>
      if (p === '{phone}') return <a key={i} href={tel(contact.phone)} className="underline font-semibold">{contact.phone}</a>
      return <RichText key={i} text={p} />
    })
  }

  return (
    <div>
      {/* Hero: background video/photo with dark overlay */}
      <section className="pt-[78px] relative min-h-[720px] lg:min-h-[820px] overflow-hidden">
        <div className="absolute inset-0 top-[78px]">
          {!heroVideo && heroImage
            ? <img src={heroImage} alt="" className="w-full h-full object-cover" />
            : <video playsInline src={heroVideo || '/assets/KidVid.mp4'} loop autoPlay muted className="w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative max-w-[1284px] mx-auto px-[40px] lg:px-[132px] pt-[180px] lg:pt-[230px] pb-[120px] text-white space-y-[28px]">
          <p className="text-[14px] lg:text-[22px] font-medium font-['League_Spartan'] uppercase tracking-[6px] lg:tracking-[10px] fadeIn">{cfg.tagline || 'After School'}</p>
          <h1 className="text-[50px] lg:text-[77.49px] font-bold font-['League_Spartan'] leading-[48px] lg:leading-[67px] fadeIn">{s.name}</h1>
          <div className="flex flex-wrap gap-[12px] pt-[10px]">
            <a href="#after-school" className={`${PILL} bg-[#F8EA2B] text-[#004AAD] hover:brightness-95`}>AFTER SCHOOL</a>
            <Link to="/classes" className={`${PILL} bg-white/15 border border-white text-white hover:bg-white/25`}>EXTRACURRICULAR CLASSES</Link>
            <a href={ENROLL_URL} target="_blank" rel="noopener noreferrer" className={`${PILL} bg-[#F8EA2B] text-[#004AAD] hover:brightness-95`}>{cfg.registerButton || 'REGISTER'}</a>
          </div>
        </div>
        <img src="/assets/FirstCurve.svg" alt="" className="absolute bottom-0 z-20 w-full" />
      </section>

      {/* Key facts */}
      <section id="after-school" className="bg-[#F8FBFF]">
        <div className="max-w-[1243.406px] w-full lg:px-[126px] px-[40px] py-[60px] lg:py-[100px] mx-auto space-y-[70px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[36px] lg:gap-[40px]">
            <Reveal className="space-y-[12px]">
              <p className={H3}>Contact</p>
              <p className={LEAD}>{contact.director}{contact.directorTitle ? `, ${contact.directorTitle}` : ''}</p>
              <p className={BODY}>Text or call <a href={tel(contact.phone)} className="font-bold underline">{contact.phone}</a><br /><a href={`mailto:${contact.email}`} className="font-bold underline">{contact.email}</a></p>
            </Reveal>
            <Reveal className="space-y-[12px]">
              <p className={H3}>Location</p>
              <p className={LEAD}>Onsite at {s.short}</p>
              <p className={BODY}><RichText text={loc.locationNote} /></p>
              {loc.mapLink && <a href={loc.mapLink} target="_blank" rel="noopener noreferrer" className={`${PILL} bg-[#004AAD] text-white hover:brightness-110 !h-[38px] !px-[18px]`}>GET DIRECTIONS</a>}
            </Reveal>
            <Reveal className="space-y-[12px]">
              <p className={H3}>Times</p>
              <p className={LEAD}>{prog.hours}</p>
              <p className={BODY}>Every day school is open.</p>
            </Reveal>
            <Reveal className="space-y-[12px]">
              <p className={H3}>Enrollment</p>
              <p className={LEAD}><RichText text={prog.enrollment} /></p>
              <p className={BODY}><RichText text={prog.enrollmentNote} /></p>
            </Reveal>
          </div>

          {/* How to enroll */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[40px] lg:gap-[80px] items-start">
            <div className="space-y-[24px]">
              <Reveal as="h2" className="text-[#004aad] text-[40px] lg:text-[56px] font-normal MadeGentle leading-[42px] lg:leading-[58px]">{cfg.enroll?.heading || 'How to Enroll'}</Reveal>
              <ol className="space-y-[14px]">
                {(cfg.enroll?.steps || []).map((st, i) => (
                  <li key={i} className="flex space-x-[14px]">
                    <span className="MadeGentle text-[#7DCE3E] text-[28px] leading-[28px] w-[28px] shrink-0">{i + 1}.</span>
                    <span className={BODY}>{fill(st)}</span>
                  </li>
                ))}
              </ol>
              <a href={ENROLL_URL} target="_blank" rel="noopener noreferrer" className="w-[261.287px] flex items-center justify-center h-[60.207px] text-[#004AAD] text-[15px] lg:text-xl font-bold font-['Montserrat'] leading-[69.32px] tracking-[3.90px] bg-[#F8EA2B] rounded-[6px] hover:brightness-95">{cfg.enroll?.ctaText || 'ENROLL NOW'}</a>
            </div>
            <div className="rounded-[30px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] bg-white relative aspect-[4/3]">
              <Photos photos={photos} source={source} label={s.short} />
            </div>
          </div>
        </div>
      </section>

      {/* What goes on */}
      <section className="relative bg-[#004AAD] w-full">
        <img src="/assets/CampCurveOne.svg" alt="" className="w-full -mt-1 relative z-30" />
        <div className="py-[60px] lg:py-[140px]">
          <div className="absolute top-0 opacity-60 w-full h-full"><img src="/assets/bgCamper.svg" alt="" className="w-full h-full object-cover" /></div>
          <div className="space-y-[40px] lg:max-w-[1229px] mx-auto px-[40px] lg:px-[88px] z-10 relative w-full">
            <Reveal as="h2" className="text-white text-[34px] lg:text-[57.97px] font-normal MadeGentle leading-[38px] lg:leading-[62px]"><RichText text={cfg.whatGoesOn?.heading} /></Reveal>
            <p className="max-w-[952px] text-white text-[17px] lg:text-[25px] font-medium font-['Montserrat'] leading-[27.689px] lg:leading-[33.084px]"><RichText text={cfg.whatGoesOn?.body} /></p>
            <div className="flex flex-wrap gap-[14px]">
              <Link to={cfg.whatGoesOn?.learnMoreLink || '/schedule'} className="w-[220px] flex items-center justify-center h-[56px] text-[#004AAD] text-[15px] lg:text-[18px] font-bold font-['Montserrat'] tracking-[3px] bg-[#F8EA2B] rounded-[6px] hover:brightness-95">{cfg.whatGoesOn?.learnMoreText || 'LEARN MORE'}</Link>
              {cfg.whatGoesOn?.calendarText && <a href={calendarUrl || '#'} {...ext(calendarUrl)} className="w-[260px] flex items-center justify-center h-[56px] text-white text-[15px] lg:text-[18px] font-bold font-['Montserrat'] tracking-[3px] border-2 border-white rounded-[6px] hover:bg-white/10">{cfg.whatGoesOn.calendarText}</a>}
            </div>
          </div>
        </div>
        <img src="/assets/CampCurveTwo.svg" alt="" className="w-full -mb-[2px] relative z-30" />
      </section>

      {/* Rates */}
      <section className="bg-[#F8FBFF]">
        <div className="max-w-[1243.406px] w-full lg:px-[126px] px-[40px] py-[60px] lg:py-[100px] mx-auto space-y-[40px]">
          <div className="space-y-[8px]">
            <Reveal as="h2" className="text-[#004aad] text-[40px] lg:text-[56px] font-normal MadeGentle leading-[42px] lg:leading-[58px]">{s.name}{cfg.rates?.headingSuffix ?? ' Rates'}</Reveal>
            {cfg.rates?.subheading && <p className={LEAD}>{cfg.rates.subheading}</p>}
          </div>
          <div className="lg:max-w-[819.69px] border-[0.80px] border-[#75CB31] bg-white">
            {rateRows.map((r, i) => (
              <div key={r._key || i} className="border-b-[0.80px] items-start lg:items-center lg:space-y-0 space-y-[6px] justify-between lg:flex-row flex flex-col px-[15px] lg:px-[40.86px] py-[16px] min-h-[70px] w-full border-[#75CB31]">
                <div className="text-[#004AAD] text-[20px] lg:text-[26px] font-normal MadeGentle leading-[30px]">{r.label}</div>
                <div className="text-[#75CB31] text-[18px] lg:text-[22px] font-normal MadeGentle leading-[28px] lg:text-right"><RichText text={r.value} /></div>
              </div>
            ))}
            {(ratesNote || cfg.rates?.scholarships) && (
              <div className="px-[15px] lg:px-[40.86px] py-[18px] text-[#004aad] text-[15px] lg:text-[17px] font-medium font-['Montserrat'] leading-[28px]">
                <RichText text={ratesNote} />{ratesNote && cfg.rates?.scholarships && <><br /><br /></>}<RichText text={cfg.rates?.scholarships} />
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-[14px]">
            <Link to="/pricing" className={`${PILL} bg-[#004AAD] text-white hover:brightness-110`}>{cfg.rates?.allRatesText || 'ALL RATES & ENROLLMENT'}</Link>
            <a href={policiesUrl} {...ext(policiesUrl)} className={`${PILL} bg-white border border-[#004AAD] text-[#004AAD] hover:bg-[#eef3fb]`}>{(s.short || '').toUpperCase()} {cfg.rates?.policiesText || 'POLICIES & PROCEDURES'}</a>
          </div>
        </div>
      </section>

      {/* Classes */}
      <section className="bg-[#EBF2FB]">
        <div className="max-w-[1243.406px] w-full lg:px-[126px] px-[40px] py-[60px] lg:py-[90px] mx-auto space-y-[24px]">
          <Reveal as="h2" className="text-[#004aad] text-[36px] lg:text-[50px] font-normal MadeGentle leading-[40px] lg:leading-[54px]">{cfg.classes?.headingPrefix || 'Extracurricular Classes @'} {s.short}</Reveal>
          <p className={`${BODY} max-w-[900px]`}><RichText text={cfg.classes?.body} /></p>
          <Link to="/classes" className={`${PILL} bg-[#75CB31] text-white hover:brightness-95`}>{cfg.classes?.ctaText || 'SEE CLASSES'}</Link>
        </div>
      </section>
      <div className="bg-[#EBF2FB]">
        <AnythingElse className="!mt-0" />
      </div>
    </div>
  )
}
