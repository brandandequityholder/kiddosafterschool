import { useContent, assetUrl } from '../lib/sanity'
import RichText from '../lib/RichText'
import { useReveal } from '../lib/hooks'
import { MobileBlobTL, MobileBlobBR } from '../content/pricingSvgs'
import { FounderBlob } from '../content/teamSvgs'

function Reveal({ as: Tag = 'p', className = '', children, ...rest }) {
  const [ref, cls] = useReveal()
  return <Tag ref={ref} className={`${className} ${cls}`} {...rest}>{children}</Tag>
}

const MASK = { maskImage: 'url("/assets/videoSvg-61af47a1.svg")', WebkitMaskImage: 'url("/assets/videoSvg-61af47a1.svg")', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center center', WebkitMaskPosition: 'center center' }

/* ---------- Hero ---------- */
function Hero({ s }) {
  const title = String(s.title || '')
  return (
    <section className="w-full relative bg-[#F8FBFF] mt-[78px] pt-[78px]">
      <div className="lg:block hidden">
        <img src="/assets/leftAsset.svg" alt="" className="absolute lg:block hidden bottom-[-50px] left-0" />
        <img src="/assets/rightAsset.svg" alt="" className="absolute lg:block hidden bottom-[-50px] right-0" />
        <div className="absolute top-[163px] right-0">
          <img src="/assets/RightBlob.svg" alt="" className="z-30 right-[60px]" />
          <div className="z-40 top-[60px] lg:block hidden absolute right-[-200px] h-[596.36px] w-[892.51px]">
            <video playsInline src="/assets/TopVid.mp4" loop autoPlay muted preload="none" poster="/assets/preview.png" className="h-[596.36px] w-[892.51px] object-cover" style={MASK} />
          </div>
        </div>
      </div>
      <div className="h-[410px] relative lg:hidden overflow-hidden">
        <video playsInline src="/assets/TopVid.mp4" loop autoPlay muted className="w-full h-full object-cover" />
        <img src="/assets/VidCurveMob.svg" alt="" className="absolute z-20 -bottom-1 w-full" />
      </div>
      <div className="max-w-[1243.406px] w-full relative lg:pl-[40px] lg:px-0 px-[40px] pb-[100px] lg:pb-[300px] pt-[50px] lg:pt-[137px] mx-auto">
        <h1 className="max-w-[671px] lg:block hidden fadeIn">
          <span className="text-[#004aad] text-[75px] leading-[100%] font-bold font-['League_Spartan']"><RichText text={title} /></span>
          <span className="text-[#74ca31] text-[75px] leading-[100%] font-bold font-['League_Spartan']"><br /><RichText text={s.subtitle} /><br /></span>
        </h1>
        <h1 className="max-w-[345px] lg:hidden fadeIn">
          <span className="text-[#004aad] text-[50px] font-bold font-['League_Spartan'] leading-[44.50px]"><RichText text={title} /></span>
          <span className="text-[#71c92d] text-[50px] font-bold font-['League_Spartan'] leading-[44.50px]"><RichText text={s.subtitle} /></span>
        </h1>
        <div className="lg:hidden">
          <div className="absolute left-0 top-0"><MobileBlobTL /></div>
          <div className="absolute right-0 -bottom-0"><MobileBlobBR /></div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Founder ---------- */
function Founder({ s }) {
  return (
    <section className="w-full h-fit bg-[#F8FBFF]">
      <div className="max-w-[1243.406px] lg:pl-[32px] px-[40px] lg:space-x-[80px] justify-start flex lg:flex-row flex-col w-full mx-auto">
        <h2 className="w-full max-w-[815.77px] pb-[40px] lg:hidden fadeIn">
          <span className="text-[#004aad] text-[39.333px] font-normal MadeGentle leading-[36.973px]"><RichText text={s.title} /><br /></span>
          <span className="text-[#86d24a] text-[39.33px] font-normal MadeGentle leading-[36.97px]">{s.name}</span>
        </h2>
        <div className="relative">
          <div className="bg-white z-10 relative rounded-[30px] py-[24px] w-full max-w-[328px] lg:w-[328px] h-[534px]">
            <video playsInline src="/assets/FounderVid.mp4" loop autoPlay muted className="w-[85%] max-w-[268px] lg:w-[268px] relative h-[487px] z-10 rounded-[20px] mx-auto object-cover" />
            <img src="/assets/FounderSvg.svg" alt="" className="lg:flex hidden z-10 w-[433px] absolute bottom-[23px] right-[35px] justify-center" />
          </div>
          <div className="absolute -top-[10px] -left-[30px]"><FounderBlob /></div>
        </div>
        <div className="space-y-[20px] lg:space-y-[20px]">
          <h2 className="max-w-[1037px] lg:block hidden">
            <span className="text-[#004aad] text-6xl font-normal MadeGentle leading-[58.72px]"><RichText text={String(s.title || '').replace(/<br\s*\/?>/gi, ' ')} /><br /></span>
            <span className="text-[#74ca31] text-6xl font-normal MadeGentle leading-[58.72px]">{s.name}</span>
          </h2>
          <div className="w-full max-w-[320px] lg:max-w-[650px] text-[#004AAD] text-[14px] lg:text-[20px] font-[500] font-['Montserrat'] leading-[27.8px] lg:leading-[33px]"><RichText text={s.description} /></div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Team grid ---------- */
function Card({ f, source }) {
  return (
    <div className="bg-white overflow-hidden space-y-[20px] lg:pl-[48px] pt-[48px] px-[30px] py-[24px] w-full lg:w-[359px] rounded-[30px] h-fit lg:h-[730px]">
      <div className="relative rounded-[20px] overflow-hidden">
        <video playsInline src={assetUrl(f.video, source)} loop autoPlay muted className="w-[265px] rounded-[20px] h-[265px] object-cover" />
        <img className={`absolute w-full bottom-0 ${f.blobPosition || ''}`} src={assetUrl(f.blob, source)} alt="" />
      </div>
      <div className="space-y-[5px]">
        <h3 className="w-full text-[#004aad] text-[28.38px] font-normal MadeGentle leading-[25.68px]">{f.name}</h3>
        <div className="w-full text-[#74ca31] text-[15px] font-normal MadeGentle leading-[25.68px]"><RichText text={f.role} /></div>
        <div className="w-full text-[#004aad] text-[15px] font-[500] font-['Montserrat'] leading-[23.29px]"><RichText text={f.description} /></div>
      </div>
    </div>
  )
}

function TeamGrid({ s, founders, source }) {
  const rows = [founders.slice(0, 3), founders.slice(3)]
  return (
    <section className="bg-[#F8FBFF]">
      <div className="max-w-[1243.406px] space-y-[100px] px-[40px] lg:pl-[115px] pb-[100px] pt-[100px] lg:pt-[240px] w-full mx-auto">
        <div className="space-y-[30px]">
          <h2 className="lg:block hidden w-full max-w-[1037px]"><RichText text={s.title} className="text-[#004aad] text-[63px] font-normal MadeGentle leading-[58.72px]" /></h2>
          <h2 className="max-w-[364px] w-full lg:hidden"><RichText text={s.title} className="text-[#004aad] text-[39.33px] font-normal MadeGentle leading-[36.97px]" /></h2>
          <div className="max-w-[1015px] lg:block hidden w-full text-[#004aad] text-xl font-medium font-['Montserrat'] leading-9">{s.subtitle}</div>
          <div className="max-w-80 w-full lg:hidden text-[#004aad] text-sm font-medium font-['Montserrat'] leading-[27.10px]">{s.subtitle}</div>
        </div>
      </div>
      <div className="relative pb-[200px] px-[40px] lg:pl-[32px] w-full mx-auto">
        <div className="absolute h-[90%] bottom-0 left-0 w-full bg-[#004AAD2B]" />
        <img src="/assets/curveOne.svg" className="absolute bg-[#F8FBFF] top-[300px] lg:top-[136px] left-0 w-full" alt="" />
        <div className="space-y-[44px] lg:space-y-[76px] lg:max-w-[1243.406px] w-full mx-auto">
          {rows.map((row, i) => (
            <div key={i} className="flex lg:flex-row justify-center items-center flex-col relative space-y-[44px] lg:space-x-[32px] lg:space-y-0">
              {row.map((f) => <Card key={f._key || f.name} f={f} source={source} />)}
            </div>
          ))}
        </div>
      </div>
      <div><img src="/assets/LastCurve-a8a0e87f.svg" alt="" className="w-full -bottom-0 bg-[#CEDEF1]" /></div>
    </section>
  )
}

export default function Team() {
  const [c, source] = useContent('teamPage')
  if (!c) return null
  return (
    <div className="overflow-x-hidden relative">
      <Hero s={c.heroSection} />
      <Founder s={c.founderSection} />
      <TeamGrid s={c.FoundersSection} founders={c.founders || []} source={source} />
    </div>
  )
}
