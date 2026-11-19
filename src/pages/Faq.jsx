import { useState } from 'react'
import { useContent } from '../lib/sanity'
import RichText from '../lib/RichText'
import { useReveal } from '../lib/hooks'
import AnythingElse from '../components/AnythingElse'

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, cls] = useReveal()
  return <Tag ref={ref} className={`${className} ${cls}`} {...rest}>{children}</Tag>
}

function Item({ q, a, open, onToggle }) {
  return (
    <Reveal className="space-y-[30px] lg:space-y-[40px] pb-[30px] lg:pb-[66px] border-b border-[#004AAD]">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex space-x-[40px] lg:space-x-[100px] w-full text-left focus:outline-none">
        <p className="text-[#004aad] text-[20px] lg:text-[40px] font-bold font-['Montserrat'] leading-[27px] lg:leading-[67px]">{q}</p>
        <div className={`w-[29px] lg:block hidden h-[25px] mt-[15px] transform transition-transform duration-300 ${open ? 'rotate-0' : 'rotate-180'}`}>
          <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2893 0L28.5787 24.75L-0.000112534 24.75L14.2893 0Z" fill="#004AAD" /></svg>
        </div>
        <div className={`w-[29px] lg:hidden h-[25px] mt-[15px] transform transition-transform duration-300 ${open ? 'rotate-0' : 'rotate-180'}`}>
          <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.14959 0L12.2992 10.6515L-6.10352e-05 10.6515L6.14959 0Z" fill="#004AAD" /></svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="max-w-[977px] w-full text-[#004aad] text-[14px] lg:text-[38px] font-normal font-['Montserrat'] leading-[24.1px] lg:leading-[44px]"><RichText text={a} /></p>
      </div>
    </Reveal>
  )
}

export default function Faq() {
  const [c] = useContent('faqPage')
  const [open, setOpen] = useState(-1)
  if (!c) return null
  const hero = c.heroSection || {}
  const [d1, d2] = String(hero.description || '').split(/(?<=after school\.)\s*/)
  return (
    <div>
      <section className="w-full relative bg-[#0B3D80] mt-[78px] pt-[78px]">
        <div className="max-w-[1243.406px] w-full relative lg:px-0 px-[66px] pb-[50px] pt-[60px] lg:pt-[120px] lg:pl-[73px] mx-auto">
          <div className="space-y-[40px]">
            <h1 className="max-w-[1019px] text-white text-[50px] lg:text-[75px] font-bold font-['League_Spartan'] leading-[44.5px] lg:leading-[67px] fadeIn">{hero.mainHeadline}</h1>
            <p className="max-w-[958px] text-white text-[15px] lg:text-[25px] font-medium font-['Montserrat'] leading-[22.135px] lg:leading-[41px] fadeIn">
              {d1}{d2 && <><br className="lg:block hidden" /> {d2}</>}<br /><br /><br />
            </p>
          </div>
        </div>
        <img src="/assets/firstCurve-93c5bc49.svg" alt="" className="w-full -mb-1" />
      </section>
      <section className="w-full relative bg-[#F8FBFF] pb-[80px] lg:pb-[167px] pt-[40px] lg:pt-[80px]">
        <div className="max-w-[1229.41px] space-y-[71px] w-full mx-auto px-[40px] lg:px-[100px]">
          <div className="space-y-[30px] lg:space-y-[40px] w-full mb-[26px] pb-[30px] lg:pb-[66px] border-b border-[#004AAD]">
            {c.note && <p className="text-[#004aad] text-[15px] lg:text-[18px] font-medium font-['Montserrat'] leading-[28px]"><RichText text={c.note} /></p>}
          </div>
        </div>
        <div className="max-w-[1229.41px] space-y-[71px] w-full mx-auto px-[40px] lg:px-[100px]">
          {(c.faqs || []).map((f, i) => (
            <Item key={f._key || i} q={f.question} a={f.answer} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </section>
      <AnythingElse className="!mt-0" />
    </div>
  )
}
