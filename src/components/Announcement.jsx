import { useContent } from '../lib/sanity'

/** Fixed yellow bar across the top of every page. Content: Sanity `announcement`. */
export default function Announcement() {
  const [a] = useContent('announcement')
  if (!a || a.enabled === false) return null
  return (
    <div className="fixed z-[90] top-0 w-full h-[78px] flex justify-center items-center bg-[#F8EA2B]">
      <div className="flex w-full justify-center space-x-[5px] lg:space-x-[10px] items-center">
        <p className="text-right MadeGentle text-[#004AAD] text-[10px] lg:text-lg font-normal leading-[50.33px] tracking-wide">{a.text}</p>
        {a.linkText && (
          <a rel="noopener noreferrer" href={a.linkUrl} target="_blank">
            <p className="text-right underline MadeGentle text-[#004AAD] text-[10px] lg:text-lg font-normal leading-[50.33px] tracking-wide">{a.linkText}</p>
          </a>
        )}
      </div>
    </div>
  )
}
