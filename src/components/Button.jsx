import { Link } from 'react-router-dom'

const BASE = "flex justify-center items-center text-[14.149px] lg:text-xl font-[600] font-['Montserrat'] leading-[69.29px] tracking-[3.90px] h-[43.688px] lg:h-[60.207px] rounded-[4.36px] lg:rounded-[6px] transition hover:brightness-95 w-[189.598px] lg:w-[261.29px]"
const VARIANTS = {
  yellow: 'bg-[#F8EA2B] text-[#004AAD]',
  blue: 'bg-[#004AAD] text-white hover:brightness-110',
}

/** Brand CTA button. `to` for internal routes, `href` for external links. */
export default function Button({ to, href, variant = 'yellow', className = '', children, ...rest }) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`
  if (href) return <a className={cls} href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
  return <Link className={cls} to={to || '/'} {...rest}>{children}</Link>
}

/** Sanity stores ctaLink as a bare slug ("schedule"); normalise to a route or URL. */
export function ctaTarget(link) {
  if (!link) return { to: '/' }
  if (/^https?:/i.test(link)) return { href: link }
  return { to: link.startsWith('/') ? link : `/${link}` }
}
