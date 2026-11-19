import { useContent } from '../lib/sanity'
import RichText from '../lib/RichText'
import { useReveal } from '../lib/hooks'
import { ENROLL_URL } from './Navbar'

const PinIcon = () => (
  <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.21306 15.7387C3.59617 13.7146 0 8.8089 0 6.05336C0 2.71014 2.66259 0 5.94716 0C9.23049 0 11.8943 2.71014 11.8943 6.05336C11.8943 8.8089 8.27027 13.7146 6.68126 15.7387C6.30027 16.2211 5.59405 16.2211 5.21306 15.7387ZM5.94716 8.07115C7.04057 8.07115 7.92955 7.1663 7.92955 6.05336C7.92955 4.94042 7.04057 4.03557 5.94716 4.03557C4.85375 4.03557 3.96477 4.94042 3.96477 6.05336C3.96477 7.1663 4.85375 8.07115 5.94716 8.07115Z" fill="#004AAD" />
  </svg>
)
const MailIcon = () => (
  <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.91668 0H15.4252C16.6996 0 17.3419 0.601513 17.3419 1.82493V10.4092C17.3419 11.6224 16.6996 12.2342 15.4252 12.2342H1.91668C0.642293 12.2342 0 11.6224 0 10.4092V1.82493C0 0.601513 0.642293 0 1.91668 0ZM8.66586 8.76781L15.5374 3.12991C15.7821 2.926 15.9758 2.45703 15.6699 2.03903C15.3743 1.62103 14.8339 1.61083 14.4771 1.86571L8.66586 5.80103L2.86483 1.86571C2.508 1.61083 1.96766 1.62103 1.672 2.03903C1.36615 2.45703 1.55985 2.926 1.80454 3.12991L8.66586 8.76781Z" fill="#004AAD" />
  </svg>
)
const PhoneIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.765051 2.59259L2.88572 0.473914C3.03531 0.323663 3.21312 0.204448 3.40892 0.123119C3.60473 0.04179 3.81467 -5.08156e-05 4.0267 4.63152e-08C4.45879 4.63152e-08 4.86501 0.169255 5.16966 0.473914L7.45162 2.75587C7.60187 2.90547 7.72109 3.08327 7.80242 3.27908C7.88375 3.47488 7.92559 3.68483 7.92554 3.89685C7.92554 4.32895 7.75628 4.73516 7.45162 5.03982L5.78297 6.70848C6.17356 7.56941 6.71661 8.35262 7.38591 9.0203C8.05353 9.69123 8.83667 10.2363 9.69774 10.6292L11.3664 8.96056C11.516 8.81031 11.6938 8.6911 11.8896 8.60977C12.0854 8.52844 12.2953 8.4866 12.5074 8.48665C12.9395 8.48665 13.3457 8.65591 13.6503 8.96056L15.9343 11.2405C16.0847 11.3904 16.204 11.5685 16.2854 11.7647C16.3667 11.9608 16.4084 12.1712 16.4082 12.3835C16.4082 12.8156 16.2389 13.2218 15.9343 13.5265L13.8176 15.6432C13.3317 16.131 12.6607 16.4078 11.9717 16.4078C11.8264 16.4078 11.687 16.3958 11.5496 16.3719C8.8654 15.9299 6.20312 14.5022 4.05457 12.3556C1.90802 10.2111 0.482295 7.55077 0.0342674 4.85862C-0.101137 4.03624 0.171663 3.18996 0.765051 2.59259Z" fill="#004AAD" />
  </svg>
)
const InstagramIcon = () => (
  <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.0081 6.19988C7.16774 6.19988 4.87672 8.4551 4.87672 11.251C4.87672 14.047 7.16774 16.3022 10.0081 16.3022C12.8484 16.3022 15.1394 14.047 15.1394 11.251C15.1394 8.4551 12.8484 6.19988 10.0081 6.19988ZM10.0081 14.535C8.17257 14.535 6.67202 13.0623 6.67202 11.251C6.67202 9.43984 8.1681 7.96713 10.0081 7.96713C11.848 7.96713 13.3441 9.43984 13.3441 11.251C13.3441 13.0623 11.8436 14.535 10.0081 14.535ZM16.5462 5.99326C16.5462 6.64829 16.0103 7.17143 15.3493 7.17143C14.6839 7.17143 14.1524 6.64389 14.1524 5.99326C14.1524 5.34263 14.6884 4.81509 15.3493 4.81509C16.0103 4.81509 16.5462 5.34263 16.5462 5.99326ZM19.9447 7.18901C19.8688 5.6108 19.5026 4.21282 18.3281 3.06103C17.158 1.90924 15.7378 1.54876 14.1346 1.46963C12.4822 1.37731 7.52948 1.37731 5.87709 1.46963C4.27829 1.54436 2.85812 1.90485 1.68358 3.05664C0.509047 4.20843 0.147307 5.6064 0.0669203 7.18462C-0.0268641 8.81119 -0.0268641 13.6865 0.0669203 15.3131C0.142841 16.8913 0.509047 18.2893 1.68358 19.4411C2.85812 20.5929 4.27382 20.9533 5.87709 21.0325C7.52948 21.1248 12.4822 21.1248 14.1346 21.0325C15.7378 20.9577 17.158 20.5972 18.3281 19.4411C19.4981 18.2893 19.8644 16.8913 19.9447 15.3131C20.0385 13.6865 20.0385 8.81558 19.9447 7.18901ZM17.81 17.0584C17.4617 17.92 16.7873 18.5838 15.9075 18.9311C14.5901 19.4455 11.464 19.3268 10.0081 19.3268C8.55217 19.3268 5.42156 19.4411 4.10858 18.9311C3.23326 18.5882 2.55891 17.9244 2.2061 17.0584C1.68358 15.7615 1.80416 12.6842 1.80416 11.251C1.80416 9.81791 1.68805 6.73621 2.2061 5.44374C2.55444 4.5821 3.22879 3.91828 4.10858 3.57099C5.42603 3.05664 8.55217 3.17533 10.0081 3.17533C11.464 3.17533 14.5946 3.06103 15.9075 3.57099C16.7829 3.91389 17.4572 4.5777 17.81 5.44374C18.3325 6.7406 18.212 9.81791 18.212 11.251C18.212 12.6842 18.3325 15.7659 17.81 17.0584Z" fill="white" />
  </svg>
)
const FacebookIcon = () => (
  <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.23449 17.5054V9.29093H0V6.3333H2.23449V3.80711C2.23449 1.822 3.55442 -0.000976562 6.5958 -0.000976562C7.82721 -0.000976562 8.73778 0.113778 8.73778 0.113778L8.66603 2.8757C8.66603 2.8757 7.7374 2.86691 6.72403 2.86691C5.62726 2.86691 5.45154 3.35823 5.45154 4.17369V6.3333H8.75322L8.60956 9.29093H5.45154V17.5054H2.23449Z" fill="white" />
  </svg>
)

const BTN_PRIMARY = "w-[189.598px] lg:w-[261.29px] flex justify-center items-center text-[#fff] text-[14.149px] lg:text-xl font-[600] font-['Montserrat'] leading-[69.29px] tracking-[3.90px] h-[43.688px] lg:h-[60.207px] bg-[#004AAD] rounded-[4.36px] lg:rounded-[6px] hover:brightness-110 transition"

/** "THE BEST DAY CAMP EXPERIENCE … ONE CLICK AWAY" closing CTA. Content: Sanity `lastSec`. */
export function LastSection() {
  const [s] = useContent('lastSec')
  const [r1, c1] = useReveal(); const [r2, c2] = useReveal()
  if (!s) return null
  return (
    <section className="bg-[#fdf9ef] pt-[30px] lg:pt-0 pb-[120px] lg:pb-[260px] min-h-[591px] w-full overflow-hidden relative h-fit lg:min-h-[500px]">
      <div className="max-w-[1277.294px] space-y-[100px] mx-auto flex flex-col justify-center items-center w-full">
        <div className="space-y-[40px]">
          <div className="max-w-[1033.51px] h-fit relative lg:min-h-[192.91px] text-center justify-center">
            <p ref={r1} className={`text-[#004aad] leading-[100%] text-[27.313px] lg:text-[64.97px] font-normal font-['League_Spartan'] uppercase ${c1}`}>
              <RichText text={s.preTitle} /><br />
              <span className="text-[#004aad] h-fit text-[27.313px] lg:text-[64.97px] font-bold font-['League_Spartan'] uppercase">{s.boldTitle}</span>
            </p>
          </div>
          <p ref={r2} className={`max-w-[327px] lg:max-w-[965px] min-h-[64.97px] text-center text-[#004aad] text-[17px] lg:text-[20px] font-medium font-['Montserrat'] leading-[24.451px] lg:leading-[33.08px] ${c2}`}><RichText text={s.description} /></p>
        </div>
        <a rel="noopener noreferrer" className={BTN_PRIMARY} href={s.ctaUrl || ENROLL_URL} target="_blank">{s.ctaText || 'ENROLL NOW'}</a>
      </div>
    </section>
  )
}

/** Site footer (video band + contact info + brand tabs + social bar). Content: Sanity `footer`. */
export default function Footer({ withLastSection = true }) {
  const [f] = useContent('footer')
  const [r1, c1] = useReveal()
  if (!f) return null
  const socials = f.socialLinks || []
  const fb = socials.find((s) => /facebook/i.test(s.platform))
  const ig = socials.find((s) => /instagram/i.test(s.platform))
  return (
    <footer className="overflow-hidden">
      {withLastSection && <LastSection />}
      <div className="lg:mt-[260px] lg:-mb-[70px] lg:h-fit mt-[131px] relative">
        <video playsInline src="/assets/FooterVideo.mp4" autoPlay loop muted preload="auto" className="bg-[#fdf9ef] w-full lg:h-[725.653px] absolute -top-[240px] lg:-top-[500px] lg:w-full object-cover" style={{ width: '100%', display: 'block' }} />
        <div className="bg-white lg:mb-[70px] w-full relative bottom-0">
          <div className="flex py-[50px] space-y-[22px] lg:space-y-0 px-[50px] w-full lg:flex-row flex-col max-w-[1293.38px] mx-auto justify-between lg:px-[100px] lg:py-[60px]">
            <div className="flex items-center space-x-[18px] lg:w-[260px] shrink-0 self-start">
              <img src="/assets/KAS.svg" alt="Kiddos After School" className="w-[96px] lg:w-[110px]" />
              <p className="text-[#004AAD] text-[15px] font-extrabold font-['League_Spartan'] leading-[17px] tracking-widest">KIDDOS<br />AFTER<br />SCHOOL</p>
            </div>
            <div ref={r1} className={`flex space-y-[30px] lg:space-y-0 flex-col lg:flex-row lg:space-x-[30px] ${c1}`}>
              <div className="flex space-y-[20px] flex-col lg:space-y-[10px]">
                <p className="text-[#004AAD] lg:text-[15.305px] text-[11.312px] font-normal MadeGentle uppercase leading-6 tracking-[3.52px]">{f.title}</p>
                <p className="max-w-96 text-[#004AAD] text-[12px] lg:text-[15px] font-medium font-['League_Spartan'] leading-[16.99px] lg:leading-[22.989px]">{f.description}</p>
              </div>
              <div className="flex flex-col space-y-[21px]">
                {(f.locations || []).map((l) => (
                  <div key={l.name} className="flex space-x-[34px] items-start">
                    <div className="mt-[5px] w-[15px]"><PinIcon /></div>
                    <a href={l.mapLink} target="_blank" rel="noopener noreferrer" className="max-w-[464.73px] text-[#004AAD] text-sm font-normal font-['League_Spartan'] leading-6 hover:underline">
                      <span className="font-bold">{l.name}</span> · {l.address}
                    </a>
                  </div>
                ))}
                <div className="flex space-x-[34px] items-start">
                  <div className="mt-[5px] w-[15px]"><MailIcon /></div>
                  <a href={`mailto:${f.email}`} className="max-w-[464.73px] text-[#004AAD] text-sm font-normal font-['League_Spartan'] leading-6 hover:underline">{f.email}</a>
                </div>
                <div className="flex space-x-[34px] items-start">
                  <div className="mt-[5px] w-[15px]"><PhoneIcon /></div>
                  <a href={`tel:${String(f.phone).replace(/\D/g, '')}`} className="max-w-[464.73px] text-[#004AAD] text-sm font-normal font-['League_Spartan'] leading-6 hover:underline">{f.phone}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-screen flex lg:flex-row flex-col lg:h-[36.98px] text-white text-xs font-normal MadeGentle uppercase leading-6 tracking-[2.76px]">
            {(f.externalLinks || []).map((l) => (
              <a key={l.name} rel="noopener noreferrer" className="lg:flex-1 h-[53.707px] lg:text-base text-[12.42px] lg:h-full flex items-center justify-center whitespace-nowrap hover:brightness-95 transition" href={l.url} target="_blank" style={{ backgroundColor: l.bgColor }}>{l.name}</a>
            ))}
          </div>
          <div className="lg:h-[70px] py-[33px] space-y-[20px] lg:py-0 lg:px-[80px] flex lg:flex-row flex-col justify-between w-full bg-[#004AAD]">
            <div className="hidden lg:flex items-center">
              <p className="text-white text-base font-normal MadeGentle uppercase leading-6 tracking-[3.52px]">{f.copyrightText}</p>
            </div>
            <div className="flex lg:w-fit w-full justify-center items-center">
              <p className="text-white text-[11.312px] lg:text-base font-normal MadeGentle uppercase leading-6 tracking-[3.52px]"><RichText text={f.socialsText} /></p>
              <div className="flex mr-[20px] lg:mr-0 space-x-[20px] lg:space-x-[26px] ml-[26px] items-center">
                {fb && <a href={fb.url} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-80"><FacebookIcon /></a>}
                {ig && <a href={ig.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="lg:w-fit w-[14.787px] hover:opacity-80"><InstagramIcon /></a>}
              </div>
            </div>
            <div className="lg:hidden w-full flex items-end justify-center">
              <div className="max-w-[276px] flex justify-center items-center mx-0 text-center w-fit h-8 text-white text-xs font-normal MadeGentle uppercase leading-[17.01px] tracking-[2.60px]">
                <p>{f.copyrightText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
