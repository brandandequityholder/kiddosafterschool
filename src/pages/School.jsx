import { Link, useParams, Navigate } from 'react-router-dom'
import { useContent } from '../lib/sanity'
import RichText from '../lib/RichText'
import { useReveal } from '../lib/hooks'
import AnythingElse from '../components/AnythingElse'
import { ENROLL_URL } from '../components/Navbar'

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, cls] = useReveal()
  return <Tag ref={ref} className={`${className} ${cls}`} {...rest}>{children}</Tag>
}

const PILL = "h-[44px] px-[24px] inline-flex items-center justify-center rounded-[8px] text-[12px] lg:text-[13px] font-bold font-['League_Spartan'] tracking-[2px] transition"
const H3 = 'MadeGentle text-[#7DCE3E] text-[34px] lg:text-[40px] font-normal uppercase leading-[36px]'
const LEAD = "text-[#004aad] text-[18px] lg:text-[22px] font-bold font-['League_Spartan'] leading-[26px]"
const BODY = "text-[#004aad] text-[15px] lg:text-[17px] font-[500] font-['Montserrat'] leading-[25px] lg:leading-[28px]"

/** One page per school: /schools/:slug. Content: site.json → schools[]. */
export default function School() {
  const { slug } = useParams()
  const [schools] = useContent('schools')
  const s = (schools || []).find((x) => x.slug === slug)
  if (!s) return <Navigate to="/" replace />
  const steps = [
    <>Review all Kiddos <a href={s.policiesUrl} className="underline font-semibold">policies and procedures</a>.</>,
    <>Log in or create a new account in our <a href={ENROLL_URL} target="_blank" rel="noopener noreferrer" className="underline font-semibold">registration portal</a>.</>,
    <>You will receive an email once you complete registration that indicates your registration went through.</>,
    <>Send a Transportation note to your teacher.</>,
    <>We will anticipate your student arriving on the date you select for them to start. If the start date changes, you must text <a href={`tel:${s.phone.replace(/\D/g, '')}`} className="underline font-semibold">{s.phone}</a>.</>,
  ]
  return (
    <div>
      {/* Hero: background photo with dark overlay */}
      <section className="pt-[78px] relative min-h-[720px] lg:min-h-[820px] overflow-hidden">
        <div className="absolute inset-0 top-[78px]">
          <video playsInline src="/assets/KidVid.mp4" loop autoPlay muted className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative max-w-[1284px] mx-auto px-[40px] lg:px-[132px] pt-[180px] lg:pt-[230px] pb-[120px] text-white space-y-[28px]">
          <p className="text-[14px] lg:text-[22px] font-medium font-['League_Spartan'] uppercase tracking-[6px] lg:tracking-[10px] fadeIn">After School</p>
          <h1 className="text-[50px] lg:text-[77.49px] font-bold font-['League_Spartan'] leading-[48px] lg:leading-[67px] fadeIn">{s.name}</h1>
          <div className="flex flex-wrap gap-[12px] pt-[10px]">
            <a href="#after-school" className={`${PILL} bg-[#F8EA2B] text-[#004AAD] hover:brightness-95`}>AFTER SCHOOL</a>
            <Link to="/classes" className={`${PILL} bg-white/15 border border-white text-white hover:bg-white/25`}>EXTRACURRICULAR CLASSES</Link>
            <a href={ENROLL_URL} target="_blank" rel="noopener noreferrer" className={`${PILL} bg-[#F8EA2B] text-[#004AAD] hover:brightness-95`}>REGISTER SY 26/27</a>
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
              <p className={LEAD}>{s.director}, {s.directorTitle}</p>
              <p className={BODY}>Text or call <a href={`tel:${s.phone.replace(/\D/g, '')}`} className="font-bold underline">{s.phone}</a><br /><a href={`mailto:${s.email}`} className="font-bold underline">{s.email}</a></p>
            </Reveal>
            <Reveal className="space-y-[12px]">
              <p className={H3}>Location</p>
              <p className={LEAD}>Onsite at {s.short}</p>
              <p className={BODY}>{s.locationNote}</p>
              <a href={s.mapLink} target="_blank" rel="noopener noreferrer" className={`${PILL} bg-[#004AAD] text-white hover:brightness-110 !h-[38px] !px-[18px]`}>GET DIRECTIONS</a>
            </Reveal>
            <Reveal className="space-y-[12px]">
              <p className={H3}>Times</p>
              <p className={LEAD}>{s.hours}</p>
              <p className={BODY}>Every day school is open.</p>
            </Reveal>
            <Reveal className="space-y-[12px]">
              <p className={H3}>Enrollment</p>
              <p className={LEAD}><RichText text={s.enrollment} /></p>
              <p className={BODY}><RichText text={s.enrollmentNote} /></p>
            </Reveal>
          </div>

          {/* How to enroll */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[40px] lg:gap-[80px] items-start">
            <div className="space-y-[24px]">
              <Reveal as="h2" className="text-[#004aad] text-[40px] lg:text-[56px] font-normal MadeGentle leading-[42px] lg:leading-[58px]">How to Enroll</Reveal>
              <ol className="space-y-[14px]">
                {steps.map((st, i) => (
                  <li key={i} className="flex space-x-[14px]">
                    <span className="MadeGentle text-[#7DCE3E] text-[28px] leading-[28px] w-[28px] shrink-0">{i + 1}.</span>
                    <span className={BODY}>{st}</span>
                  </li>
                ))}
              </ol>
              <a href={ENROLL_URL} target="_blank" rel="noopener noreferrer" className="w-[261.287px] flex items-center justify-center h-[60.207px] text-[#004AAD] text-[15px] lg:text-xl font-bold font-['Montserrat'] leading-[69.32px] tracking-[3.90px] bg-[#F8EA2B] rounded-[6px] hover:brightness-95">ENROLL NOW</a>
            </div>
            <div className="rounded-[30px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] bg-white relative aspect-[4/3]">
              <video playsInline src="/assets/TopVid.mp4" loop autoPlay muted className="w-full h-full object-cover" />
              <p className="absolute bottom-[14px] left-[18px] text-white text-[11px] font-bold font-['League_Spartan'] tracking-[2px] bg-black/40 px-[10px] py-[6px] rounded">PHOTO CAROUSEL · After School at {s.short} <mark className="draft-note">[PHOTOS NEEDED]</mark></p>
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
            <Reveal as="h2" className="text-white text-[34px] lg:text-[57.97px] font-normal MadeGentle leading-[38px] lg:leading-[62px]">What Goes On During After School...</Reveal>
            <p className="max-w-[952px] text-white text-[17px] lg:text-[25px] font-medium font-['Montserrat'] leading-[27.689px] lg:leading-[33.084px]">Each day is broken into Snack Time, Outside Time, Homework Help and Activity Choices. We also offer After School Specials, Fun Fridays and a Showcase each semester!</p>
            <div className="flex flex-wrap gap-[14px]">
              <Link to="/schedule" className="w-[220px] flex items-center justify-center h-[56px] text-[#004AAD] text-[15px] lg:text-[18px] font-bold font-['Montserrat'] tracking-[3px] bg-[#F8EA2B] rounded-[6px] hover:brightness-95">LEARN MORE</Link>
              <a href="#" className="w-[260px] flex items-center justify-center h-[56px] text-white text-[15px] lg:text-[18px] font-bold font-['Montserrat'] tracking-[3px] border-2 border-white rounded-[6px] hover:bg-white/10">SAMPLE CALENDAR</a>
            </div>
          </div>
        </div>
        <img src="/assets/CampCurveTwo.svg" alt="" className="w-full -mb-[2px] relative z-30" />
      </section>

      {/* Rates */}
      <section className="bg-[#F8FBFF]">
        <div className="max-w-[1243.406px] w-full lg:px-[126px] px-[40px] py-[60px] lg:py-[100px] mx-auto space-y-[40px]">
          <div className="space-y-[8px]">
            <Reveal as="h2" className="text-[#004aad] text-[40px] lg:text-[56px] font-normal MadeGentle leading-[42px] lg:leading-[58px]">Kiddos @ {s.short} Rates</Reveal>
            <p className={LEAD}>Full Time Tuition for SY 26/27</p>
          </div>
          <div className="lg:max-w-[819.69px] border-[0.80px] border-[#75CB31] bg-white">
            {s.rates.map(([k, v]) => (
              <div key={k} className="border-b-[0.80px] items-start lg:items-center lg:space-y-0 space-y-[6px] justify-between lg:flex-row flex flex-col px-[15px] lg:px-[40.86px] py-[16px] min-h-[70px] w-full border-[#75CB31]">
                <div className="text-[#004AAD] text-[20px] lg:text-[26px] font-normal MadeGentle leading-[30px]">{k}</div>
                <div className="text-[#75CB31] text-[18px] lg:text-[22px] font-normal MadeGentle leading-[28px] lg:text-right"><RichText text={v} /></div>
              </div>
            ))}
            <div className="px-[15px] lg:px-[40.86px] py-[18px] text-[#004aad] text-[15px] lg:text-[17px] font-medium font-['Montserrat'] leading-[28px]">
              {s.ratesNote}<br /><br /><strong>Scholarships:</strong> sliding scale, first come first served. Scholarships are now closed.
            </div>
          </div>
          <div className="flex flex-wrap gap-[14px]">
            <Link to="/pricing" className={`${PILL} bg-[#004AAD] text-white hover:brightness-110`}>ALL RATES & ENROLLMENT</Link>
            <a href={s.policiesUrl} className={`${PILL} bg-white border border-[#004AAD] text-[#004AAD] hover:bg-[#eef3fb]`}>{s.short.toUpperCase()} POLICIES & PROCEDURES</a>
          </div>
        </div>
      </section>

      {/* Classes */}
      <section className="bg-[#EBF2FB]">
        <div className="max-w-[1243.406px] w-full lg:px-[126px] px-[40px] py-[60px] lg:py-[90px] mx-auto space-y-[24px]">
          <Reveal as="h2" className="text-[#004aad] text-[36px] lg:text-[50px] font-normal MadeGentle leading-[40px] lg:leading-[54px]">Extracurricular Classes @ {s.short}</Reveal>
          <p className={`${BODY} max-w-[900px]`}>Martial Arts, Gymnastics, Film Making, Chess, Soccer, STEM and Tap/Ballet. You do not have to be in After School to participate in classes.</p>
          <Link to="/classes" className={`${PILL} bg-[#75CB31] text-white hover:brightness-95`}>SEE CLASSES</Link>
        </div>
      </section>
      <div className="bg-[#EBF2FB]">
        <AnythingElse className="!mt-0" />
      </div>
    </div>
  )
}
