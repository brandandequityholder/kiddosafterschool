import { useContent, docUrl } from '../lib/sanity'
import RichText, { plain } from '../lib/RichText'
import { useReveal } from '../lib/hooks'
import AnythingElse from '../components/AnythingElse'
import { MobileBlobTL, MobileBlobBR } from '../content/pricingSvgs'
import { CARDS, SIDE_DECOR } from '../content/policyCards'

function Reveal({ as: Tag = 'p', className = '', children, ...rest }) {
  const [ref, cls] = useReveal()
  return <Tag ref={ref} className={`${className} ${cls}`} {...rest}>{children}</Tag>
}

const MASK = { maskImage: 'url("/assets/videoSvg.svg")', WebkitMaskImage: 'url("/assets/videoSvg.svg")', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center center', WebkitMaskPosition: 'center center' }

function Hero({ title, description }) {
  const [a, b] = String(description || '').split(/<br\s*\/?>\s*<br\s*\/?>|\n\n/)
  return (
    <section className="w-full relative z-0 bg-[#F8FBFF] mt-[78px] pt-[78px]">
      <div className="lg:block hidden">
        <div className="absolute top-[163px] right-0">
          <img src="/assets/rightBlob.svg" alt="" className="z-30 right-0" />
          <div className="z-40 top-[50px] lg:block hidden absolute right-[-140px] w-fit h-fit">
            <div className="relative" style={MASK}>
              <img src="/assets/bg-7f79f1dd.jpg" alt="" className="h-[596.36px] w-[892.51px] object-cover" />
              <div className="w-full absolute top-0 left-0 h-full opacity-20 bg-[#004AAD]" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[410px] relative lg:hidden overflow-hidden">
        <img src="/assets/bg-7f79f1dd.jpg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/VidCurveMob.svg" alt="" className="absolute z-20 -bottom-1 w-full" />
      </div>
      <div className="max-w-[1243.406px] w-full relative lg:px-[73px] px-[60px] pb-[50px] lg:pb-[200px] pt-[50px] lg:pt-[137px] mx-auto">
        <div className="lg:block hidden space-y-[20px]">
          <h1 className="max-w-[524.92px] text-[#004aad] text-[75px] leading-[100%] font-bold font-['League_Spartan'] fadeIn"><RichText text={title} /></h1>
          <p className="max-w-[460px] text-[#004aad] text-[22px] font-medium font-['Montserrat'] leading-8 fadeIn"><RichText text={a} />{b && <><br /><br /><RichText text={b} /></>}</p>
        </div>
        <div className="space-y-[30px] lg:hidden">
          <h1 className="max-w-[309px] text-[#004aad] text-[50px] font-bold font-['League_Spartan'] leading-[44.50px] fadeIn"><RichText text={title} /><br /></h1>
          <p className="max-w-[300px] text-[#004aad] text-sm font-medium font-['Montserrat'] leading-[27.10px] fadeIn"><RichText text={a} />{b && <><br /><br /><RichText text={b} /></>}</p>
        </div>
        <div className="lg:hidden">
          <div className="absolute left-0 top-0"><MobileBlobTL /></div>
          <div className="absolute right-0 bottom-1/2 translate-y-1/2"><MobileBlobBR /></div>
        </div>
      </div>
    </section>
  )
}

function Card({ p, variant }) {
  const key = `${plain(p.headline)}|${variant}`
  const meta = CARDS[key] || CARDS[`${plain(p.headline)}|lg:block`] || { cls: 'w-full max-w-[360px] lg:w-[360px] relative space-y-[22px] pb-[60px] py-[26px] lg:py-[31.56px] pl-[32px] lg:pl-[50px] px-[26px] mb-[51px]', style: '', deco: null }
  const style = meta.style ? Object.fromEntries(meta.style.split(';').filter(Boolean).map((kv) => { const [k, v] = kv.split(':'); return [k.trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase()), v.trim()] })) : undefined
  return (
    <div className={meta.cls} style={style}>
      <div className="h-full w-full z-10 bg-white rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] absolute inset-0" />
      {meta.deco}
      <Reveal as="h3" className="max-w-[507.17px] z-20 relative text-[#004aad] text-[35.712px] font-normal MadeGentle leading-[40px]"><RichText text={p.headline} /></Reveal>
      <Reveal className="relative z-20 text-[#004aad] text-base font-[400] font-['Montserrat'] leading-[29.303px]"><RichText text={p.bodyText} /></Reveal>
    </div>
  )
}

export default function Policies() {
  const [c] = useContent('policiesPage')
  const [schools, sSource] = useContent('school')
  if (!c) return null
  const items = c.policies || []
  const left = items.filter((p) => CARDS[`${plain(p.headline)}|lg:block`]?.col === 0)
  const right = items.filter((p) => CARDS[`${plain(p.headline)}|lg:block`]?.col === 1)
  const unknown = items.filter((p) => !CARDS[`${plain(p.headline)}|lg:block`])
  return (
    <div className="relative">
      <Hero title={c.pageTitle} description={c.pageDescription} />
      <section className="w-full relative min-h-screen bg-[#F8FBFF]">
        {SIDE_DECOR}
        <div className="max-w-[1243.406px] w-full relative lg:px-0 px-[50px] pb-[100px] lg:pb-[200px] pt-[50px] lg:pt-[240px] mx-auto">
          <div className="flex lg:flex-row items-center lg:items-start flex-col justify-center space-y-[51px] lg:space-y-0 lg:space-x-[141px]">
            <div className="w-[331px]">
              <div className="lg:block hidden">{[...left, ...unknown.filter((_, i) => i % 2 === 0)].map((p) => <Card key={p._key || p.headline} p={p} variant="lg:block" />)}</div>
              <div className="lg:hidden">{items.map((p) => <Card key={p._key || p.headline} p={p} variant="lg:hidden" />)}</div>
            </div>
            <div className="w-[331px] lg:block hidden space-y-[51px]">
              {[...right, ...unknown.filter((_, i) => i % 2 === 1)].map((p) => <Card key={p._key || p.headline} p={p} variant="lg:block" />)}
            </div>
          </div>
          {c.fullPolicies && (
            <div className="pt-[80px] lg:pt-[120px] flex flex-col items-center space-y-[24px] text-center">
              <p className="text-[#004aad] text-[24px] lg:text-[32px] font-normal MadeGentle">{c.fullPolicies.text}</p>
              <div className="flex flex-wrap justify-center gap-[12px]">
                {(c.fullPolicies.links?.length ? c.fullPolicies.links : (schools || []).map((sc) => ({ name: (sc.short || sc.name).toUpperCase(), url: docUrl(sc.documents?.policiesPdf, sc.documents?.policiesUrl, sSource) }))).map((l) => <a key={l.name} href={l.url} target={l.url?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="h-[44px] px-[24px] inline-flex items-center justify-center rounded-[8px] bg-[#004AAD] text-white text-[12px] lg:text-[13px] font-bold font-['League_Spartan'] tracking-[2px] hover:brightness-110">{l.name}</a>)}
              </div>
            </div>
          )}
        </div>
      </section>
      <div className="bg-[#F8FBFF]">
        <AnythingElse className="!mt-0" />
      </div>
    </div>
  )
}
