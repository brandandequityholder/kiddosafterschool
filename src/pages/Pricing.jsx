import { Link } from 'react-router-dom'
import { useContent, assetUrl } from '../lib/sanity'
import RichText from '../lib/RichText'
import { useReveal } from '../lib/hooks'
import AnythingElse from '../components/AnythingElse'
import { ENROLL_URL } from '../components/Navbar'
import { MobileBlobTL, MobileBlobBR, BackpackIcon, ClockIcon, SiblingsIcon, CalendarIcon, RowBlob1, RowBlob2, RowBlob3, RowBlob4 } from '../content/pricingSvgs'

function Reveal({ as: Tag = 'p', className = '', children, ...rest }) {
  const [ref, cls] = useReveal()
  return <Tag ref={ref} className={`${className} ${cls}`} {...rest}>{children}</Tag>
}

const ROW = 'border-b-[0.80px] items-start lg:items-center lg:space-y-0 space-y-[10px] justify-between lg:flex-row flex flex-col pl-[15px] lg:py-0 py-[20px] lg:px-[40.86px] min-h-[84.851px] w-full border-[#75CB31]'
const LABEL = 'w-full lg:w-[391px] text-[#004AAD] text-[24px] lg:text-[31.64px] font-normal MadeGentle leading-[34.42px]'
const VALUE = 'text-[#75CB31] text-[24px] lg:text-[31.64px] font-normal MadeGentle leading-[23px] lg:leading-[34.42px]'

/* ---------- Hero ---------- */
function Hero({ s }) {
  return (
    <section className="w-full relative bg-[#F8FBFF] mt-[78px] pt-[78px]">
      <div className="lg:block hidden">
        <img src="/assets/leftAsset.svg" alt="" className="absolute lg:block hidden bottom-[-220px] left-0" />
        <img src="/assets/rightAsset.svg" alt="" className="absolute lg:block hidden bottom-[-220px] right-0" />
        <div className="absolute top-[163px] right-0">
          <img src="/assets/rightBlob-f0ae92e8.svg" alt="" className="z-30 right-0" />
          <div className="z-40 top-[50px] lg:block hidden absolute right-[-100px] w-fit h-fit">
            <div className="relative" style={{ maskImage: 'url("/assets/videoSvg.svg")', WebkitMaskImage: 'url("/assets/videoSvg.svg")', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center center', WebkitMaskPosition: 'center center' }}>
              <img src="/assets/bg-abcb3fa6.jpg" alt="" className="h-[596.36px] w-[892.51px] object-cover" />
              <div className="w-full absolute top-0 left-0 h-full opacity-20 bg-[#004AAD]" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[410px] relative lg:hidden overflow-hidden">
        <img src="/assets/bg-abcb3fa6.jpg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/VidCurveMob-755e8133.svg" alt="" className="absolute z-20 -bottom-1 w-full" />
      </div>
      <div className="max-w-[1243.406px] w-full relative lg:px-0 px-[40px] pb-[50px] lg:pb-[240px] pt-[50px] lg:pt-[160px] mx-auto">
        <div className="pl-[70px] lg:block hidden space-y-[20px]">
          <h1 className="w-full max-w-[524.92px] text-[#004aad] text-[67.80px] leading-[100%] font-bold font-['League_Spartan'] fadeIn"><RichText text={s.headline} /></h1>
          <p className="max-w-[420px] w-full text-[#004aad] text-[20px] font-normal font-['Montserrat'] leading-[28.3px] fadeIn">{s.subHeadline}</p>
        </div>
        <div className="lg:hidden space-y-[20px]">
          <h1 className="w-[345px] text-[#004aad] text-[50px] font-bold font-['League_Spartan'] leading-[44.50px]"><RichText text={String(s.headline || '').replace(/<br\s*\/?>/gi, ' ')} /></h1>
          <p className="max-w-[320px] text-[#004aad] text-[15px] font-normal font-['Montserrat'] leading-[24px]">{s.subHeadline}</p>
        </div>
        <div className="lg:hidden">
          <div className="absolute left-0 top-0"><MobileBlobTL /></div>
          <div className="absolute right-0 -bottom-0"><MobileBlobBR /></div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 5 easy steps ---------- */
function Steps({ steps, source }) {
  return (
    <div className="max-w-[1243.406px] space-y-[100px] w-full relative lg:px-[126px] px-[40px] pb-[50px] mx-auto">
      <Reveal as="h2" className="w-full text-[#004aad] text-[40px] lg:text-[63px] font-normal MadeGentle leading-[42px] lg:leading-[58.72px] max-w-[1037px]">
        Enrollment in <span className="text-[#75CB31]">5 Easy Steps!</span>
      </Reveal>
      <div className="space-y-[120px] lg:space-y-[30px]">
        {steps.map((st) => (
          <div key={st._key || st.title} className="flex lg:flex-row flex-col space-y-[20px] lg:space-y-0">
            <div className="lg:w-[183px]">
              <div className="max-w-[150px] lg:min-w-[243px] lg:max-w-[244px] h-fit"><img src={assetUrl(st.icon, source)} alt="" /></div>
            </div>
            <div className="font-['Montserrat'] space-y-[10px]">
              <Reveal as="h3" className="text-[20px] lg:text-[24px] leading-8 lg:leading-9 font-bold text-[#75CB31]">{String(st.title).trim()}</Reveal>
              <Reveal className="leading-[24px] lg:text-base text-sm lg:leading-[36px] text-[#004AAD] font-[500]"><RichText text={st.description} /></Reveal>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Rates table ---------- */
const TH = "text-[#004aad] text-[13px] lg:text-[16px] font-bold font-['League_Spartan'] tracking-[1.5px] uppercase"
const TD = "text-[#004aad] text-[14px] lg:text-[16px] font-medium font-['Montserrat'] leading-[22px] lg:leading-[26px]"

function RatesBySchool({ t }) {
  if (!t) return null
  return (
    <div className="lg:max-w-[1000px] mx-auto space-y-[20px]">
      <h3 className="text-[#004aad] text-[28px] lg:text-[36px] font-normal MadeGentle leading-[36px] lg:leading-[42px] text-center">{t.heading}</h3>
      <div className="overflow-x-auto border-[0.80px] border-[#75CB31] rounded-[6px] bg-white">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="bg-[#eef5e6]">
              <th className={`${TH} text-left px-[18px] py-[14px] border-b-[0.80px] border-[#75CB31]`}></th>
              {t.schools.map((h) => <th key={h} className={`${TH} text-left px-[18px] py-[14px] border-b-[0.80px] border-l-[0.80px] border-[#75CB31]`}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((r, i) => (
              <tr key={i} className={i % 2 ? 'bg-[#f8fbff]' : ''}>
                <th scope="row" className={`${TD} font-bold text-left px-[18px] py-[12px] border-b-[0.80px] border-[#75CB31] align-top`}><RichText text={r[0]} /></th>
                {r.slice(1).map((v, j) => <td key={j} className={`${TD} px-[18px] py-[12px] border-b-[0.80px] border-l-[0.80px] border-[#75CB31] align-top`}><RichText text={v} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={`${TD} text-center`}>{t.note}</p>
      {t.confirm && <p className={`${TD} text-center`}><RichText text={t.confirm} /></p>}
    </div>
  )
}

function Addon({ heading, body, Icon, Blob, blobClass, cta, rowClass = 'h-[250px] lg:h-[212.93px]', pt = '' }) {
  return (
    <div className={`${rowClass} ${pt} lg:text-start text-center space-y-[10px] relative flex flex-col justify-center lg:pl-[34.42px] w-full`}>
      <div className={`absolute lg:block hidden ${blobClass}`}><Blob /></div>
      <div className="lg:hidden h-[140px] flex justify-center"><Icon /></div>
      <Reveal className="text-[#004aad] text-[14px] lg:text-[20px] font-bold font-['League_Spartan'] leading-[22px] lg:leading-[34.42px]">
        <span className="uppercase">{heading}</span><br />
        <span className="text-[#004aad] text-[14px] lg:text-[20.012px] font-normal font-['League_Spartan'] leading-[22px] lg:leading-[34.42px]"><RichText text={body} /></span>
      </Reveal>
      {cta && <Link className="w-[140px] relative z-30 flex items-center justify-center lg:w-[165.87px] h-[38.22px] text-white text-[11px] lg:text-[13.18px] font-bold font-['Montserrat'] leading-[29.77px] tracking-widest bg-[#75CB31] rounded-[6px] hover:brightness-95" to={cta.to}>{cta.text}</Link>}
    </div>
  )
}

function Rates({ rates, discounts, policies, bySchool }) {
  return (
    <div className="max-w-[1243.406px] space-y-[50px] w-full relative pt-[50px] lg:pt-[100px] lg:px-[126px] px-[40px] pb-[50px] mx-auto">
      <h2 className="w-full lg:w-[1037px] text-center">
        <RichText text={rates.heading} className="text-[#004aad] text-[40px] lg:text-[63px] font-normal MadeGentle leading-[42px] lg:leading-[58.72px]" />
      </h2>
      <div className="lg:max-w-[819.69px] min-h-[100px] mx-auto border-[0.80px] border-[#75CB31]">
        <div className={ROW}><div className={LABEL}>Annual Registration Fee:</div><div className={VALUE}>{rates.baseRate}</div></div>
        <div className={ROW}><div className={LABEL}>Full Time, Fixed Monthly Rate:</div><div className={VALUE}>{rates.deposit}</div></div>
        <div className={ROW}><div className="text-[#004aad] text-[24px] lg:text-[31.64px] font-normal MadeGentle leading-[28px] lg:leading-[34.42px]">Pay Schedule:</div><div className={VALUE}>{rates.paySchedule}</div></div>
        <div className="border-b-[0.80px] items-center flex px-[20px] lg:px-[40.86px] py-[20px] min-h-[84.851px] w-full border-[#75CB31]">
          <div className="text-[#004aad] text-[17px] font-medium font-['Montserrat'] leading-[30.42px]">{rates.details}{rates.confirm && <><br /><br /><RichText text={rates.confirm} /></>}</div>
        </div>
      </div>

      <RatesBySchool t={bySchool} />

      <div className="lg:max-w-[819.69px] min-h-[100px] mx-auto border-[0.80px] border-[#75CB31]">
        <div className="border-b-[0.80px] items-center lg:space-y-0 space-y-[10px] lg:flex-row flex flex-col lg:pr-0 px-[15px] pl-[15px] lg:py-0 py-[20px] lg:pl-[40.86px] min-h-[84.851px] w-full border-[#75CB31]">
          <div className="text-[#004aad] text-[24px] lg:text-[31.64px] font-normal MadeGentle leading-[34.42px]">Other Add-Ons & Discounts</div>
        </div>
        <div className="border-b-[0.80px] flex items-center lg:p-0 p-[15px] min-h-[84.851px] w-full border-[#75CB31]">
          <div className="lg:flex-1 lg:block hidden">
            <div className="h-[250px] lg:h-[212.93px] lg:pt-[40px] flex items-center justify-center"><SiblingsIcon /></div>
            <div className="h-[250px] lg:h-[212.93px] lg:pt-[40px] flex items-center justify-center"><CalendarIcon /></div>
            <div className="h-[239.34px] lg:pt-[40px] flex items-center justify-center"><BackpackIcon /></div>
            <div className="h-[212.93px] lg:pt-[40px] flex items-center justify-center"><ClockIcon /></div>
          </div>
          <div className="w-full lg:w-[553.93px] h-full pb-[18px] lg:border-l-[0.80px] border-[#75CB31]">
            <Addon heading={discounts.first?.heading} body={discounts.first?.subHeadiing} Icon={SiblingsIcon} Blob={RowBlob1} blobClass="right-[-55.23px] bottom-0" />
            <Addon heading={discounts.second?.heading} body={discounts.second?.subHeadiing} Icon={CalendarIcon} Blob={RowBlob2} blobClass="right-[-77.23px] bottom-0" pt="pt-[100px] lg:pt-0" />
            <Addon heading={discounts.third?.heading} body={discounts.third?.subHeadiing} Icon={BackpackIcon} Blob={RowBlob3} blobClass="right-[-77.23px] bottom-0" rowClass="h-[250px] lg:h-[239.34px]" pt="pt-[160px] lg:pt-[15px]" />
            <Addon heading={discounts.paySchedule?.heading} body={discounts.paySchedule?.subHeadiing} Icon={ClockIcon} Blob={RowBlob4} blobClass="right-[-52.23px] bottom-0" rowClass="h-[250px] lg:h-[212.13px] mb-[180px] lg:mb-0" pt="pt-[220px] lg:pt-[25px]" cta={{ to: discounts.paySchedule?.ctaLink || '/classes', text: discounts.paySchedule?.ctaText || 'SEE CLASSES' }} />
          </div>
        </div>
        {/* Scholarships */}
        <div className="border-b-[0.80px] items-center justify-between lg:flex-row flex-col flex px-[15px] lg:py-0 py-[20px] space-y-[15px] lg:space-y-0 lg:px-[40.86px] min-h-[84.851px] w-full border-[#75CB31]">
          <div className="text-[#004aad] text-[26px] lg:text-[31.64px] font-normal MadeGentle leading-[26px] lg:leading-[34.42px]">Scholarships</div>
          <a className="w-[276.97px] flex items-center h-[38.42px] bg-[#75CB31] justify-center text-white text-[13.184px] font-[600] font-['Montserrat'] leading-[29.77px] tracking-[1.676px] rounded-md hover:brightness-95" href="mailto:info@KiddosAtlanta.com?subject=Scholarship%20Application">APPLY FOR A SCHOLARSHIP</a>
        </div>
        <div className="border-b-[0.80px] items-center flex px-[30.86px] py-[20px] min-h-[84.851px] w-full border-[#75CB31]">
          <div className="text-[#004aad] text-[17px] font-medium font-['Montserrat'] leading-[31.219px]"><RichText text={policies.Scholarshipheading} /></div>
        </div>
        {/* Cancelation */}
        <div className="border-b-[0.80px] items-center flex px-[40.86px] min-h-[84.851px] w-full border-[#75CB31]">
          <div className="text-[#004aad] text-[31.64px] font-normal MadeGentle leading-[34.42px]">Cancelation Policy</div>
        </div>
        <div className="items-center flex px-[30.86px] py-[20px] min-h-[84.851px] w-full border-[#75CB31]">
          <div className="text-[#004aad] text-[17px] font-medium font-['Montserrat'] leading-[30.42px]">{policies.Cancelationheading}</div>
        </div>
      </div>
      <div className="flex justify-center pt-[20px]">
        <a rel="noopener noreferrer" className="w-[261.287px] flex items-center justify-center h-[60.207px] text-[#004AAD] text-[16px] lg:text-xl font-bold font-['Montserrat'] leading-[69.32px] tracking-[3.90px] bg-[#F8EA2B] rounded-[6px] hover:brightness-95" href={ENROLL_URL} target="_blank">ENROLL NOW</a>
      </div>
    </div>
  )
}

export default function Pricing() {
  const [c, source] = useContent('homePage')   // Sanity type name for the Rates & Enrollment page
  if (!c) return null
  return (
    <div>
      <Hero s={c.heroSection} />
      <section className="bg-[#F8FBFF]">
        <Steps steps={c.steps || []} source={source} />
        <Rates rates={c.ratesSection} discounts={c.discountsSection} policies={c.policiesSection} bySchool={c.ratesBySchool} />
      </section>
      <div className="bg-[#F8FBFF]">
        <AnythingElse className="!mt-0" />
      </div>
    </div>
  )
}
