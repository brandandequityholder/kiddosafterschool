import { useContent } from '../lib/sanity'
import RichText from '../lib/RichText'
import { useReveal } from '../lib/hooks'
import AnythingElse from '../components/AnythingElse'
import Button from '../components/Button'
import { MobileBlobTL, MobileBlobBR } from '../content/pricingSvgs'

function Reveal({ as: Tag = 'p', className = '', children, ...rest }) {
  const [ref, cls] = useReveal()
  return <Tag ref={ref} className={`${className} ${cls}`} {...rest}>{children}</Tag>
}

const MASK = { maskImage: 'url("/assets/videoSvg.svg")', WebkitMaskImage: 'url("/assets/videoSvg.svg")', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center center', WebkitMaskPosition: 'center center' }
const H2 = 'text-[40px] lg:text-[63px] font-normal MadeGentle leading-[42px] lg:leading-[58.72px]'
const BODY = "w-full max-w-[953px] text-[#004aad] text-base lg:text-lg font-medium font-['Montserrat'] leading-7 lg:leading-9"

function Hero({ s }) {
  return (
    <section className="w-full relative z-10 lg:min-h-screen bg-[#F8FBFF] mt-[78px] pt-[78px]">
      <div className="lg:block hidden">
        <img src="/assets/leftAsset.svg" alt="" className="absolute lg:block hidden bottom-[-220px] left-0" />
        <img src="/assets/rightAsset.svg" alt="" className="absolute lg:block hidden bottom-[-220px] right-0" />
        <div className="absolute top-[163px] right-0">
          <img src="/assets/rightBlob-f0ae92e8.svg" alt="" className="z-30 right-0" />
          <div className="z-40 top-[50px] lg:block hidden absolute right-[-100px] w-fit h-fit">
            <div style={MASK}><img src="/assets/bg.jpg" alt="" className="h-[596.36px] w-[892.51px] object-cover" /></div>
          </div>
        </div>
      </div>
      <div className="h-[410px] relative lg:hidden overflow-hidden">
        <img src="/assets/bg.jpg" alt="" className="h-[596.36px] w-[892.51px] object-cover" />
        <img src="/assets/VidCurveMob-755e8133.svg" alt="" className="absolute z-20 -bottom-1 w-full" />
      </div>
      <div className="max-w-[1243.406px] w-full relative lg:px-0 px-[40px] pb-[50px] lg:pb-[240px] pt-[50px] lg:pt-[150px] mx-auto">
        <div className="pl-[70px] lg:block hidden space-y-[20px]">
          <h1 className="w-full max-w-[524.92px] text-[#004aad] text-[67.80px] leading-[100%] font-bold font-['League_Spartan'] fadeIn"><RichText text={s.mainHeadline} /></h1>
          <p className="max-w-[382px] text-[#004AAD] text-[20px] font-normal font-['Montserrat'] leading-[28.3px] fadeIn"><RichText text={s.description} /></p>
        </div>
        <h1 className="w-[345px] lg:hidden h-[200px] text-[#004aad] text-[50px] font-bold font-['League_Spartan'] leading-[44.50px]"><RichText text={s.mainHeadline} /></h1>
        <div className="lg:hidden">
          <div className="absolute left-0 top-0"><MobileBlobTL /></div>
          <div className="absolute right-0 -bottom-0"><MobileBlobBR /></div>
        </div>
      </div>
    </section>
  )
}

function Block({ headline, body, className = '', headColor = 'text-[#004AAD]', bodyMax = '', cta }) {
  return (
    <div className={`max-w-[1243.406px] space-y-[50px] w-full relative lg:px-[126px] px-[40px] pb-[50px] mx-auto ${className}`}>
      <Reveal as="h2" className={`w-full max-w-[1037px] ${headColor}`}><RichText text={headline} className={H2} /></Reveal>
      <Reveal className={`${BODY} ${bodyMax}`}><RichText text={body} /></Reveal>
      {cta && <Button to={cta.to} variant="blue">{cta.text}</Button>}
    </div>
  )
}

export default function Values() {
  const [c] = useContent('KiddosWayPage')
  if (!c) return null
  const pp = c.pinkyPromiseSection || {}
  return (
    <div>
      <Hero s={c.heroSection || {}} />
      <section className="bg-[#F8FBFF]">
        <div className="max-w-[1243.406px] pb-[50px] lg:pb-[150px] space-y-[50px] w-full relative lg:px-[126px] px-[40px] mx-auto">
          <div className="space-y-[30px] text-center lg:pt-0 pt-[100px] lg:text-start">
            <Reveal as="h2" className="w-full max-w-[1037px] text-[#004aad]"><RichText text={pp.pinkyPromiseTitle} className={H2} /><br /></Reveal>
            <Reveal className="text-[#004aad] text-[28px] lg:text-[47px] font-normal font-['Montserrat'] leading-[28px] lg:leading-[36.08px]">{pp.pinkyPromiseSubtitle}<br /></Reveal>
          </div>
        </div>
        <img src="/assets/midCurveOne.svg" alt="" className="w-full" />
      </section>
      <section className="bg-[#EBF2FB]">
        <Block className="pt-[100px]" headline={c.storyMissionSection?.headline} body={c.storyMissionSection?.bodyText} />
        <Block headline={c.growthSection?.headline} body={c.growthSection?.bodyText} headColor="text-[#86D24A]" />
        <Block headline={c.teamSection?.headline} body={c.teamSection?.bodyText} headColor="text-[#86D24A]" cta={{ to: '/team', text: c.teamSection?.ctaText || 'MEET OUR TEAM' }} />
      </section>
      <section className="bg-[#F8FBFF] pb-[50px] lg:pb-[100px]">
        <img src="/assets/midCurveTwo.svg" className="w-full" alt="" />
        <Block headline={c.recognitionSection?.headline} body={c.recognitionSection?.bodyText} bodyMax="!max-w-[1017px]" />
      </section>
      <div className="bg-[#F8FBFF]">
        <AnythingElse className="!mt-0" />
      </div>
    </div>
  )
}
