import { useEffect, useRef, useState } from 'react'
import { useContent } from '../lib/sanity'
import RichText from '../lib/RichText'
import { useReveal, useDragScroll } from '../lib/hooks'
import Button, { ctaTarget } from '../components/Button'
import { BENEFIT_ROWS as CAMP_ROWS, BENEFIT_MOBILE as CAMP_MOBILE } from '../content/benefits'
import site from '../content/site.json'

// Reuse the camp cards' icons and blob artwork; titles and copy come from site.json (10 items).
const B = site.benefits
let k = 0
const BENEFIT_ROWS = CAMP_ROWS.map((row) => ({ ...row, cards: row.cards.map((c) => { const [titleGreen, titleBlue, body] = B[k++] || []; return { ...c, titleGreen, titleBlue, body } }) }))
const BENEFIT_MOBILE = CAMP_MOBILE.map((c, i) => { const [titleGreen, titleBlue, body] = B[i] || []; return { ...c, titleGreen, titleBlue, body } })

/* ---------- small helpers ---------- */
function Reveal({ as: Tag = 'p', className = '', children, ...rest }) {
  const [ref, cls] = useReveal()
  return <Tag ref={ref} className={`${className} ${cls}`} {...rest}>{children}</Tag>
}

const Blob = ({ blob }) => (
  <div className={blob.cls}>
    <svg width={blob.w} height={blob.h} viewBox={blob.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={blob.d} fill={blob.fill} fillOpacity={blob.fillOpacity || undefined} />
    </svg>
  </div>
)

/* ---------- Hero ---------- */
function Hero({ s }) {
  const cta = ctaTarget(s.ctaLink)
  return (
    <section className="pt-[78px] z-20 h-[920px] relative">
      <div className="relative">
        <video playsInline src="/assets/bgVid.mp4" autoPlay loop muted poster="/assets/bgVidPoster.png" preload="auto" className="h-[920px] w-full object-cover" style={{ width: '100%', display: 'block' }} />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="absolute top-[78px] z-10 w-full h-full">
        <img src="/assets/FirstLeft.svg" alt="" className="h-[1216.778px] hidden lg:block absolute left-0 top-0" />
        <img src="/assets/FirstLeftMb.svg" alt="" className="h-[1216.778px] lg:hidden absolute left-0 top-0" />
        <div className="max-w-[1284.2811px] relative top-0 h-full w-full text-white mx-auto">
          <div className="h-[80px] w-full" />
          <div className="max-w-[278.94px] lg:max-w-[738px] lg:px-0 mt-[100px] lg:mt-[202px] mx-auto space-y-[30px] lg:space-y-[40px] flex flex-col justify-center items-start">
            <div className="space-y-[20px] lg:space-y-[30px]">
              <h1 className="text-white lg:w-full text-[55.749px] lg:text-[77.49px] font-bold font-['League_Spartan'] lg:leading-[66.97px] leading-[48.18px] fadeIn">{s.mainTitle}</h1>
              <p className="w-full lg:max-w-[738.65px] text-white text-[17.809px] lg:text-[23.4588px] leading-[22.13px] lg:leading-normal font-[400] font-['Montserrat'] fadeIn">{s.description}</p>
            </div>
            <Button {...cta} variant="yellow">{s.ctaText || 'LEARN MORE'}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- "Kiddos Day Camp is.." + Dates/Hours/Ages/Enroll ---------- */
function Intro({ s }) {
  const cta = ctaTarget(s.ctaLink)
  return (
    <section className="relative z-20 lg:mt-[-20px]">
      <div className="relative top-1 z-20 w-full">
        <img src="/assets/CurveOne.svg" alt="" className="w-full" />
        <div className="absolute lg:block hidden inset-0">
          <svg width="125" height="200" viewBox="0 0 125 200" fill="none" className="lg:w-[125px] -mt-[22px] lg:mt-0 w-[102px]" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.06945 190.355C-51.9066 215.52 -93.9086 188.852 -115.662 137.873C-137.415 86.8929 -107.24 25.1652 -48.2638 -2.35227e-05C24.5111 13.0606 124.552 21.8085 124.552 21.8085C64.615 59.8664 66.0455 165.19 7.06945 190.355Z" fill="#9AE85D" />
          </svg>
        </div>
        <div className="absolute lg:hidden -top-1 inset-0">
          <svg width="74" height="105" viewBox="0 0 74 105" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.54232 100.502C-23.8065 112.043 -44.959 97.0619 -54.9356 69.9635C-64.9121 42.8652 -47.5865 11.5414 -16.2377 -2.75703e-05C21.2846 8.71137 73.1077 15.8966 73.1077 15.8966C40.9194 34.1211 38.8911 88.9603 7.54232 100.502Z" fill="#9AE85D" />
          </svg>
        </div>
      </div>
      <div className="bg-[#F8FBFF] pt-[50px] pb-[50px] lg:pb-0 lg:pt-[50px] w-full">
        <div className="w-full max-w-[306px] lg:max-w-[1284.2811px] space-y-[70px] lg:space-y-[120px] ml-[40px] lg:px-[131px] lg:mx-auto">
          <div className="flex items-start lg:flex-row flex-col space-y-[40px] lg:space-y-0 space-x-0 lg:space-x-[52px]">
            <div className="w-[225px] lg:w-[329px] flex flex-col items-center space-y-[16px] pt-[10px]">
              <img src="/assets/KAS.svg" alt="Kiddos After School" className="w-[170px] lg:w-[240px]" />
              <p className="text-[#004AAD] text-center text-[14px] lg:text-[18px] font-extrabold font-['League_Spartan'] tracking-[4px] leading-[22px]">KIDDOS<br />AFTER SCHOOL</p>
            </div>
            <div className="space-y-[20px]">
              <Reveal as="h2" className="max-w-[356.625px] text-[43.263px] lg:w-[1037px] text-[#004aad] lg:text-[56px] leading-[45.363px] lg:leading-[58.72px] MadeGentle">{s.mainHeadline}</Reveal>
              <div className="max-w-[350px] lg:max-w-[629px] text-[#004aad] text-[15.474px] lg:text-xl font-[500] font-['Montserrat'] leading-[25.494px] lg:leading-[33px]">{s.description}</div>
              <Button {...cta} variant="blue">{s.ctaText || 'LEARN MORE'}</Button>
            </div>
          </div>
          <div className="flex lg:flex-row lg:space-y-0 space-y-[30px] flex-col justify-between w-full">
            {(s.infoBlocks || []).map((b) => (
              <div className="flex" key={b.blockTitle}>
                <div className="space-y-[15px] lg:space-y-[20px]">
                  <div className="space-y-[15px] lg:space-y-[20px]">
                    <Reveal className="MadeGentle text-[#7DCE3E] text-[44.98px] font-normal uppercase leading-9">{b.blockTitle}</Reveal>
                    <div>
                      <Reveal className="max-w-[227px] lg:text-[24px] text-[18px] text-[#004aad] font-bold font-['League_Spartan'] lg:leading-[31px] leading-[22px]">
                        <span style={{ whiteSpace: 'pre-wrap' }}>{b.mainValue}</span>
                      </Reveal>
                    </div>
                  </div>
                  <Reveal className="max-w-[284px] lg:max-w-[221px] text-[#004aad] text-[15px] lg:text-[20px] font-[500] font-['Montserrat'] leading-[25px] lg:leading-[33px]"><RichText text={b.subText} /></Reveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- A Day in the Life ---------- */
function DayInLife({ s }) {
  const cta = ctaTarget(s.ctaLink)
  const steps = s.steps || []
  return (
    <section className="relative z-[5] pb-[30px] lg:pb-[200px]">
      <img src="/assets/CurveTwo.svg" alt="" className="-mt-[1px] relative z-10 w-full" />
      <div className="absolute h-[1210px] lg:h-full left-0 right-0 top-[-70px] lg:top-[-416px] -z-5 opacity-30 pointer-events-none">
        <video playsInline src="/assets/KidVid.mp4" loop autoPlay muted className="h-full w-full lg:h-auto object-cover object-center lg:object-left" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[#004AAD] pointer-events-none" />
      <div className="relative space-y-[30px] lg:space-y-[50px] max-w-[306px] ml-[40px] w-full lg:px-[90px] lg:max-w-[1291.28px] lg:mx-auto py-[100px] lg:py-[100px]">
        <h2 className="max-w-[749px]">
          {(() => { const [a, b] = String(s.mainHeadline || '').split(/<br\s*\/?>/i); return (<>
            <span className="text-white text-[45px] lg:text-[57.97px] lg:leading-normal leading-[46px] font-normal MadeGentle">{a?.trim()} </span>
            {b && <><br className="lg:hidden" /><span className="text-[#74ca31] text-[45px] lg:text-[57.97px] lg:leading-normal leading-[46px] font-normal MadeGentle">{b.trim()}</span></>}
          </>) })()}
        </h2>
        <div className="flex flex-col space-y-6">
          <div className="lg:block hidden">
            <div className="max-w-[1024px]">
              {steps.map((st, i) => (
                <span key={i}>
                  <span className="text-[#9ae85d] text-[21px] font-bold font-['Montserrat'] leading-9">{i + 1}. </span>
                  <span className="text-white text-[21px] font-medium font-['Montserrat'] leading-9">{st.stepText}<br /></span>
                </span>
              ))}
            </div>
          </div>
          <div className="lg:hidden">
            <div className="max-w-[307px]">
              {steps.map((st, i) => (
                <span key={i}>
                  <span className="text-[#9ae85d] text-[17px] font-[600] font-['Montserrat'] leading-6">{i + 1}. </span>
                  <span className="text-white text-[17px] font-[600] font-['Montserrat'] leading-6">{st.stepText}<br /><br /></span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <Button {...cta} variant="blue" className="relative z-50">{s.ctaText || 'LEARN MORE'}</Button>
      </div>
      <img src="/assets/CurveThree.svg" className="w-full absolute bottom-0 -mb-[1px] z-10" alt="" />
    </section>
  )
}

/* ---------- What makes Kiddos Camp the best ---------- */
function Benefits({ s }) {
  return (
    <section className="relative z-30 bg-[#F8FBFF]">
      <div className="py-[70px] mx-auto w-full max-w-[306px] lg:max-w-[1284.2811px] lg:px-[100px] lg:py-[100px]">
        <div className="lg:space-y-0 space-y-[30px] lg:max-w-[1284.2811px] w-full mx-auto">
          <h2 className="max-w-[1016px] pb-[20px]">
            <RichText text={s.mainHeadline} className="text-[#004aad] text-[45px] leading-[48px] lg:leading-normal lg:text-[64.97px] font-normal MadeGentle capitalize" />
          </h2>
          <div className="max-w-[306px] lg:max-w-[946.55px] min-h-[78.96px] text-[#004AAD] text-[15px] lg:text-[20px] font-medium font-['Montserrat'] leading-[24.451px] lg:leading-[33.08px]">
            {s.summary}<br /><br /><br />
          </div>
          <div className="w-full">
            <div className="lg:block hidden">
              <div className="w-full space-y-[70px]">
                {BENEFIT_ROWS.map((row, ri) => (
                  <div key={ri} className={row.rowClass}>
                    {row.cards.map((c) => (
                      <div key={c.titleGreen} className="relative space-y-[13px] text-center h-fit flex flex-col items-center">
                        <div className={c.iconWrapClass}>
                          <Blob blob={c.blob} />
                          <img src={c.icon} alt="" />
                        </div>
                        <div className={c.titleWrapClass}>
                          <span className="text-[#75CB31] text-[26.49px] font-normal MadeGentle leading-8">{c.titleGreen}</span><br />
                          <span className="text-[#004aad] text-[26.49px] font-normal font-['League_Spartan'] leading-8">{c.titleBlue}</span>
                        </div>
                        <Reveal className={c.bodyClass}><RichText text={c.body} /></Reveal>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:hidden">
              <div className="space-y-[70px]">
                <div className="flex max-w-[325px] mx-auto w-full flex-col justify-center">
                  <div className="flex flex-col items-center flex-1 space-y-16">
                    {BENEFIT_MOBILE.map((c) => (
                      <article key={c.titleGreen} className="relative text-center flex flex-col items-center w-full">
                        <div className="mb-4 relative">
                          <Blob blob={c.blob} />
                          <img src={c.icon} alt="" draggable="false" />
                        </div>
                        <div className="text-center">
                          <span className="block text-[#75CB31] text-[26.49px] font-normal MadeGentle leading-8">{c.titleGreen}</span>
                          <span className="block text-[#004aad] text-[26.49px] font-normal font-['League_Spartan'] leading-8">{c.titleBlue}</span>
                        </div>
                        <p className="mt-2 text-[#004AAD] text-[15px] leading-[25px] font-medium font-['Montserrat'] text-center"><RichText text={c.body} /></p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Campers Choice ---------- */
function CampersChoice({ s }) {
  const cta = ctaTarget(s.ctaLink)
  return (
    <section className="relative bg-[#004AAD] w-full">
      <img src="/assets/CampCurveOne.svg" alt="" className="w-full -mt-1 relative z-30" />
      <div className="py-[70px] lg:py-[200px] w-full">
        <div className="absolute top-0 opacity-60 w-full aspect-auto h-full">
          <img src="/assets/bgCamper.svg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-[50px] lg:max-w-[1229px] mx-auto px-[40px] lg:px-[88px] z-10 relative max-w-[340px] w-full">
          <div className="space-y-[20px] lg:space-y-[50px]">
            <Reveal className="MadeGentle">
              <span className="text-white text-[16.223px] lg:text-[30.99px] font-medium font-['League_Spartan'] uppercase tracking-[6.803px] lg:tracking-[12.99px]">{s.tagline}</span><br />
              <RichText text={s.headline} className="text-white text-[28.352px] lg:text-[57.97px] font-normal MadeGentle uppercase" />
            </Reveal>
            <RichText as="div" text={s.description} className="w-full max-w-[952px] min-h-[64.97px] text-white text-[17px] lg:text-[25px] font-medium font-['Montserrat'] leading-[27.689px] lg:leading-[33.084px]" />
          </div>
          <Button {...cta} variant="yellow" className="relative z-40 font-[700]">{s.ctaText || 'LEARN MORE'}</Button>
        </div>
      </div>
      <img src="/assets/CampCurveTwo.svg" alt="" className="w-full -mb-[2px] relative z-30" />
    </section>
  )
}

/* ---------- Testimonials carousel ---------- */
const CARD_W_DESKTOP = 645.35 + 73
function Testimonials({ s }) {
  const items = s.testimonials || []
  const { ref, handlers } = useDragScroll()
  const [active, setActive] = useState(0)
  const firstCard = useRef(null)

  const cardWidth = () => firstCard.current ? firstCard.current.getBoundingClientRect().width + (window.innerWidth >= 1024 ? 73 : 23) : CARD_W_DESKTOP

  useEffect(() => {
    const el = ref.current; if (!el) return
    const onScroll = () => setActive(Math.min(items.length - 1, Math.max(0, Math.round(el.scrollLeft / cardWidth()))))
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [items.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = (i) => { const el = ref.current; if (!el) return; el.scrollTo({ left: i * cardWidth(), behavior: 'smooth' }); setActive(i) }

  return (
    <section className="relative bg-[#F8EA2B]">
      <div className="py-[50px] lg:pt-[200px]">
        <div className="top-0 left-0 inset-0 w-full h-full">
          <img src="/assets/BgRight.svg" alt="" className="absolute right-[-150px] lg:right-0" />
          <img src="/assets/BgLeft.svg" alt="" className="absolute lg:block hidden left-0" />
        </div>
        <div className="lg:pl-[40px] pl-[56px] lg:max-w-[1278.65px] relative mx-auto w-full">
          <div className="lg:w-[1111.47px] space-y-[10px]">
            <Reveal className="text-[#004aad] text-[16.449px] lg:text-[30.99px] font-medium font-['League_Spartan'] uppercase tracking-[6.898px] leading-[100%] lg:tracking-[12.99px]">{s.tagline}</Reveal>
            <Reveal as="h2" className="text-[#004aad] text-[30.776px] leading-[100%] lg:text-[57.97px] font-normal MadeGentle uppercase">{s.headline}</Reveal>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-[50px] lg:space-y-[100px] pb-[40px] lg:pb-[50px] items-center">
        <div>
          <div ref={ref} {...handlers} className="flex w-screen lg:pl-[150px] lg:space-x-[73px] pr-[40px] lg:pr-[150px] overflow-x-auto hide-scrollbar cursor-grab scroll-smooth select-none">
            {items.map((t, i) => (
              <div key={i} ref={i === 0 ? firstCard : undefined} className={`w-fit mr-[23px] lg:mr-0 overflow-hidden lg:w-[645.35px] flex-col space-y-[28px] ${i === 0 ? 'ml-[50px]' : ''} shrink-0 text-2xl font-semibold relative`}>
                <div className="relative flex w-full lg:w-[645.35px] items-center justify-center">
                  <img src="/assets/ScrollBg.svg" alt="" draggable="false" className="pointer-events-none lg:block hidden lg:w-fit w-[385.918px] select-none" />
                  <div className="pointer-events-none lg:hidden lg:w-fit w-[385.918px] select-none">
                    <svg width="386" height="219" viewBox="0 0 386 219" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M346.239 11.3709C360.866 11.3709 374.983 17.1596 379.872 27.8428C398.938 69.4992 367.6 80.2454 358.823 119.866C350.046 159.486 387.41 160.486 346.239 191.587C307.834 220.599 178.771 199.512 161.608 196.549C160.354 196.332 159.108 196.551 157.992 197.164L119.617 218.258C116.514 219.963 112.63 218.36 111.633 214.962L107.666 201.438C106.816 198.539 103.816 196.841 100.883 197.566C88.4251 200.646 56.5663 207.786 35.7029 205.931C9.29509 203.584 5.26778 189.764 3.23159 177.967C-1.22809 152.129 19.0093 127.864 10.4097 100.954L10.4 100.925C3.7303 80.0538 -5.61559 50.8052 4.36925 26.4778C8.50867 16.3924 22.047 11.3709 35.7029 11.3709C35.7029 11.3709 137.496 -5.25989e-06 192.585 0C247.674 5.25989e-06 346.239 11.3709 346.239 11.3709Z" fill="#FFFDF1" />
                    </svg>
                  </div>
                  <div className="absolute top-0 px-[40px] py-[35px] lg:pt-[70px] lg:px-[60px] text-start">
                    <div className="lg:block hidden text-[#004aad] text-[27.05px] font-normal moreSugar leading-[42.20px] max-w-[515px] min-w-[204px]"><RichText text={t.reviewText} /></div>
                    <div className="lg:hidden max-w-[300.793px] w-full block text-[#004aad] text-[16.176px] font-normal moreSugar leading-[25.24px]"><RichText text={t.reviewText} /></div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="lg:block relative hidden w-[445px] h-[77px]">
                    <svg width="100%" height="100%" viewBox="0 0 445 77" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                      <path d="M414.864 2.05621C447.715 9.26721 431.124 14.9659 442.439 23.0926C450.788 44.4556 431.937 47.4757 415.26 62.7166C392.723 83.3114 105.393 74.3605 105.393 74.3605L75.8892 74.5531C75.8892 74.5531 53.7873 76.0013 39.2361 74.5531C24.685 73.1049 1.99598 62.0209 0.309076 50.8699C-2.74926 30.6533 17.8247 18.9442 18.8416 15.9219C21.0776 9.27658 25.707 -6.0258 74.7922 2.5408C123.877 11.1074 382.012 -5.15479 414.864 2.05621Z" fill="#F0DD2B" />
                    </svg>
                    <div className="absolute inset-0 pt-[5px] flex items-center justify-center z-10 pl-8">
                      <div className="text-[#004aad] text-[25.58px] font-bold font-['Montserrat'] uppercase whitespace-nowrap">
                        <div className="lg:w-[350px] h-10">
                          <span className="text-[#004aad] text-[25.58px] font-bold font-['Montserrat'] uppercase"><RichText text={t.reviewerName} /> </span>
                          <span className="text-[#004aad] text-[20px] font-bold font-['Montserrat'] uppercase">{t.reviewerItentity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:hidden relative">
                    <svg width="266" height="46" viewBox="0 0 266 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M248.088 1.22967C267.733 5.54183 257.811 8.94964 264.578 13.8094C269.571 26.5844 258.298 28.3904 248.325 37.5044C234.848 49.82 63.0256 44.4674 63.0256 44.4674L45.3821 44.5826C45.3821 44.5826 32.1652 45.4487 23.4637 44.5826C14.7621 43.7166 1.19415 37.0884 0.185389 30.4201C-1.64349 18.3307 10.6597 11.3286 11.2678 9.52133C12.6049 5.54743 15.3733 -3.60335 44.7261 1.51945C74.079 6.64226 228.443 -3.08249 248.088 1.22967Z" fill="#F0DD2B" />
                    </svg>
                    <div className="absolute pt-[5px] inset-0 h-fit left-[34px] flex items-center z-10">
                      <div className="text-[#004aad] text-[15.295px] font-bold font-['Montserrat'] uppercase whitespace-nowrap">
                        <div className="h-10">
                          <span className="text-[#004aad] text-[15.295px] font-bold font-['Montserrat'] uppercase"><RichText text={t.reviewerName} /> </span>
                          <span className="text-[#004aad] text-[11.96px] font-bold font-['Montserrat'] uppercase">{t.reviewerItentity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-3 mt-6 pb-6">
          {items.map((_, i) => (
            <button key={i} type="button" onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 cursor-pointer rounded-full transition-all duration-300 ${i === active ? 'bg-[#004aad] scale-110' : 'border-[3px] lg:border-[2px] border-[#004aad] bg-transparent hover:bg-[#004aad]/20'}`} />
          ))}
        </div>
      </div>
      <img src="/assets/LastCurve-a8a0e87f.svg" alt="" className="w-full relative" />
    </section>
  )
}

export default function Home() {
  const [c] = useContent('homePageContent')
  if (!c) return null
  return (
    <div className="relative lg:-mt-[5px]">
      <Hero s={c.firstSection} />
      <Intro s={c.secSection} />
      <DayInLife s={c.dayInLifeSection} />
      <Benefits s={c.benefitsSection} />
      <CampersChoice s={c.camperChoiceSection} />
      <Testimonials s={c.communitySection} />
    </div>
  )
}
