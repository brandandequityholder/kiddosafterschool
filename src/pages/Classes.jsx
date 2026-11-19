import { useState } from 'react'
import { useContent } from '../lib/sanity'
import RichText from '../lib/RichText'
import { useReveal } from '../lib/hooks'
import AnythingElse from '../components/AnythingElse'
import { MobileBlobTL, MobileBlobBR } from '../content/pricingSvgs'

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, cls] = useReveal()
  return <Tag ref={ref} className={`${className} ${cls}`} {...rest}>{children}</Tag>
}

const MASK = { maskImage: 'url("/assets/videoSvg.svg")', WebkitMaskImage: 'url("/assets/videoSvg.svg")', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center center', WebkitMaskPosition: 'center center' }
const SCHOOLS = ['@ E. RIVERS', '@ GARDEN HILLS', '@ ATLANTA CLASSICAL']

export default function Classes() {
  const [c] = useContent('classesPage')
  const [school, setSchool] = useState(0)
  if (!c) return null
  return (
    <div>
      {/* Hero — same treatment as Rates & Enrollment */}
      <section className="w-full relative bg-[#F8FBFF] mt-[78px] pt-[78px]">
        <div className="lg:block hidden">
          <img src="/assets/leftAsset.svg" alt="" className="absolute lg:block hidden bottom-[-220px] left-0" />
          <img src="/assets/rightAsset.svg" alt="" className="absolute lg:block hidden bottom-[-220px] right-0" />
          <div className="absolute top-[163px] right-0">
            <img src="/assets/rightBlob-f0ae92e8.svg" alt="" className="z-30 right-0" />
            <div className="z-40 top-[50px] lg:block hidden absolute right-[-100px] w-fit h-fit">
              <div className="relative" style={MASK}>
                <img src="/assets/bg.jpg" alt="" className="h-[596.36px] w-[892.51px] object-cover" />
                <div className="w-full absolute top-0 left-0 h-full opacity-20 bg-[#004AAD]" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[410px] relative lg:hidden overflow-hidden">
          <img src="/assets/bg.jpg" alt="" className="w-full h-full object-cover" />
          <img src="/assets/VidCurveMob-755e8133.svg" alt="" className="absolute z-20 -bottom-1 w-full" />
        </div>
        <div className="max-w-[1243.406px] w-full relative lg:px-0 px-[40px] pb-[50px] lg:pb-[200px] pt-[50px] lg:pt-[160px] mx-auto">
          <div className="lg:pl-[70px] space-y-[20px]">
            <h1 className="w-full max-w-[524.92px] text-[#004aad] text-[50px] lg:text-[67.80px] leading-[44.5px] lg:leading-[100%] font-bold font-['League_Spartan'] fadeIn"><RichText text={c.title} /></h1>
            <p className="max-w-[420px] w-full text-[#004aad] text-[15px] lg:text-[20px] font-normal font-['Montserrat'] leading-[24px] lg:leading-[28.3px] fadeIn">{c.description}</p>
            <a rel="noopener noreferrer" className="w-[261.287px] flex items-center justify-center h-[60.207px] text-[#004AAD] text-[14px] lg:text-[16px] font-bold font-['Montserrat'] leading-[69.32px] tracking-[3px] bg-[#F8EA2B] rounded-[6px] hover:brightness-95 relative z-40 whitespace-nowrap" href={c.ctaUrl} target="_blank">{c.ctaText}</a>
          </div>
          <div className="lg:hidden">
            <div className="absolute left-0 top-0"><MobileBlobTL /></div>
            <div className="absolute right-0 -bottom-0"><MobileBlobBR /></div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FBFF]">
        <div className="max-w-[1243.406px] space-y-[60px] lg:space-y-[90px] w-full relative lg:px-[126px] px-[40px] pb-[80px] mx-auto">
          {/* School tabs */}
          <div className="flex flex-wrap gap-[10px] lg:gap-[16px]">
            {SCHOOLS.map((s, i) => (
              <button key={s} type="button" onClick={() => setSchool(i)} className={`h-[44px] px-[22px] rounded-[8px] text-[12px] lg:text-[13px] font-bold font-['League_Spartan'] tracking-[2px] transition ${school === i ? 'bg-[#004AAD] text-white' : 'bg-white border border-[#004AAD] text-[#004AAD] hover:bg-[#eef3fb]'}`}>{s}</button>
            ))}
          </div>

          {/* Term info */}
          <div className="space-y-[40px]">
            <Reveal as="h2" className="text-[#004aad] text-[40px] lg:text-[63px] font-normal MadeGentle leading-[42px] lg:leading-[58.72px]">{c.term} <span className="text-[#75CB31]">Info</span></Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[36px] lg:gap-[40px]">
              {c.info.map(([k, v, d]) => (
                <Reveal key={k} className="space-y-[12px]">
                  <p className="MadeGentle text-[#7DCE3E] text-[34px] lg:text-[40px] font-normal uppercase leading-[36px]">{k}</p>
                  <p className="text-[#004aad] text-[18px] lg:text-[22px] font-bold font-['League_Spartan'] leading-[26px]">{v}</p>
                  <p className="text-[#004aad] text-[15px] lg:text-[17px] font-[500] font-['Montserrat'] leading-[25px] lg:leading-[28px]">{d}</p>
                </Reveal>
              ))}
            </div>
            <div className="space-y-[12px] max-w-[980px]">
              {c.notes.map((n) => <p key={n} className="text-[#004aad] text-[15px] lg:text-[17px] font-[500] font-['Montserrat'] leading-[26px]">{n}</p>)}
            </div>
          </div>

          {/* Weekly schedule */}
          <div className="space-y-[30px]">
            <div className="space-y-[8px]">
              <Reveal as="h2" className="text-[#004aad] text-[36px] lg:text-[50px] font-normal MadeGentle leading-[40px] lg:leading-[54px]">{c.scheduleHeading}</Reveal>
              <p className="text-[#004aad] text-[15px] lg:text-[17px] font-[500] font-['Montserrat']">{c.scheduleSub} · {SCHOOLS[school].replace('@ ', 'Kiddos @ ')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[16px]">
              {c.week.map(([day, items]) => (
                <div key={day} className="bg-white rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] p-[20px] space-y-[12px]">
                  <p className="text-[#75CB31] text-[13px] font-bold font-['League_Spartan'] tracking-[2.5px]">{day}</p>
                  {items.map((it) => <p key={it} className="text-[#004aad] text-[16px] font-[600] font-['Montserrat'] leading-[22px]">{it}</p>)}
                </div>
              ))}
            </div>
          </div>

          {/* The classes */}
          <div className="space-y-[30px]">
            <Reveal as="h2" className="text-[#004aad] text-[36px] lg:text-[50px] font-normal MadeGentle leading-[40px] lg:leading-[54px]">The Classes</Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              {c.classes.map((k, i) => (
                <Reveal key={i} className="bg-white rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] p-[28px] flex flex-col space-y-[12px]">
                  <p className="text-[#75CB31] text-[12px] font-bold font-['League_Spartan'] tracking-[2px]">{k.meta}</p>
                  <h3 className="text-[#004aad] text-[30px] font-normal MadeGentle leading-[34px]">{k.name}</h3>
                  <p className="text-[#004aad] text-[15px] font-[500] font-['Montserrat'] leading-[25px] flex-1">{k.description}</p>
                  <p className="text-[#004aad] text-[14px] font-bold font-['League_Spartan'] tracking-[1px] pt-[6px] border-t border-[#dfe8f5]">{k.price}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="bg-[#F8FBFF]">
        <AnythingElse className="!mt-0" />
      </div>
    </div>
  )
}
