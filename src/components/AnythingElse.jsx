import { Link } from 'react-router-dom'
import { useContent } from '../lib/sanity'
import { useReveal } from '../lib/hooks'

/**
 * Yellow "Anything Else?" band that closes most inner pages.
 * Content: Sanity `anythingElse`. The yellow wave curve above it and the cream
 * curve below it are part of the section so every page gets the identical treatment.
 */
export default function AnythingElse({ curve = '/assets/secCurve-cc051464.svg', className = '' }) {
  const [s] = useContent('anythingElse')
  const [r1, c1] = useReveal(); const [r2, c2] = useReveal()
  if (!s) return null
  const contact = s.contactUsLink || { linkText: 'Contact Us', urlSlug: '/contact' }
  const email = s.emailLink || { linkText: 'Info@kiddosatlanta.com', url: 'mailto:Info@kiddosatlanta.com' }
  const phone = s.phoneLink || { linkText: '404.955.3184', url: 'tel:4049553184' }
  const summer = String(s.summerTime || '').replace(/^\s*\./, '')
  return (
    <div className={`relative -mt-[170px] lg:-mt-[250px] ${className}`}>
      <section className="relative z-30">
        <img src={curve} alt="" className="w-full" />
        <div className="bg-[#f8ea2b]">
          {/* desktop */}
          <div ref={r1} className={`space-y-[38px] bg-[#f8ea2b] lg:block hidden max-w-[962px] pb-[150px] w-full mx-auto ${c1}`}>
            <p className="text-[#004aad] text-[64px] font-normal MadeGentle leading-[67px]">{s.mainHeadline}</p>
            <p className="w-full">
              <span className="text-[#004aad] text-[30px] font-normal font-['Montserrat'] leading-[50px]">{s.contactDescription} our </span>
              <span className="text-[#004aad] text-[30px] font-[650] font-['Montserrat'] leading-[50px]"><Link to={contact.urlSlug || '/contact'} className="hover:underline">{contact.linkText}</Link></span>
              <span className="text-[#004aad] text-[30px] font-normal font-['Montserrat'] leading-[50px]"> page or email us at </span>
              <span className="text-[#004aad] text-[30px] font-[650] font-['Montserrat'] leading-[50px]"><a href={email.url} className="hover:underline">{email.linkText}</a>.</span>
              <br /><br />
              <span className="text-[#004aad] text-[30px] font-normal font-['Montserrat'] leading-[50px]">{s.availabilityText} </span>
              <span className="text-[#004aad] text-[30px] font-[650] font-['Montserrat'] leading-[50px]"><a href={phone.url} className="hover:underline">{phone.linkText}</a></span>
              <span className="text-[#004aad] text-[30px] font-normal font-['Montserrat'] leading-[50px]">.{summer ? ` ${summer}` : ''}</span>
            </p>
          </div>
          {/* mobile */}
          <div ref={r2} className={`space-y-[32px] max-w-[334px] bg-[#f8ea2b] lg:hidden pb-[49px] w-full mx-auto ${c2}`}>
            <p className="max-w-[312px] text-[#004aad] text-[45px] font-normal MadeGentle leading-[50px]">{s.mainHeadline}</p>
            <p>
              <span className="text-[#004aad] text-[15px] font-medium font-['Montserrat'] leading-[33.10px]">{s.contactDescription} our </span>
              <span className="text-[#004aad] text-[15px] font-extrabold font-['Montserrat'] leading-[33.10px]"><Link to={contact.urlSlug || '/contact'}>{contact.linkText}</Link></span>
              <span className="text-[#004aad] text-[15px] font-medium font-['Montserrat'] leading-[33.10px]"> page or email us at </span>
              <span className="text-[#004aad] text-[15px] font-extrabold font-['Montserrat'] leading-[33.10px]"><a href={email.url}>{email.linkText}</a>.</span>
              <br /><br />
              <span className="text-[#004aad] text-[15px] font-medium font-['Montserrat'] leading-[33.10px]">{s.availabilityText} </span>
              <span className="text-[#004aad] text-[15px] font-bold font-['Montserrat'] leading-[33.10px]"><a href={phone.url}>{phone.linkText}</a>.</span>
              <span className="text-[#004aad] text-[15px] font-medium font-['Montserrat'] leading-[33.10px]">{summer ? ` ${summer}` : ''}<br /></span>
            </p>
          </div>
        </div>
        <img src="/assets/LastCurve-a8a0e87f.svg" alt="" className="w-full bg-[#f8ea2b]" />
      </section>
    </div>
  )
}
