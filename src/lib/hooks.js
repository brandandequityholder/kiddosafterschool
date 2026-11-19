import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Scroll-reveal: returns a ref and a className ("fadeIn" once the element has been seen,
 * "fadeOut" before). Mirrors the behaviour of the current site, where blocks fade in as
 * they enter the viewport and stay visible.
 */
export function useReveal(options = { threshold: 0, rootMargin: '0px 0px -8% 0px' }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return }
    // Already on screen (e.g. above the fold, or page restored mid-scroll)
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) { setSeen(true); return }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect() }
    }, options)
    io.observe(el)
    return () => io.disconnect()
  }, [seen]) // eslint-disable-line react-hooks/exhaustive-deps
  return [ref, seen ? 'fadeIn' : 'fadeOut']
}

/** Lock body scroll while `locked` is true (mobile menu). */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [locked])
}

/** Drag-to-scroll for horizontal carousels (desktop mouse). */
export function useDragScroll() {
  const ref = useRef(null)
  const state = useRef({ down: false, x: 0, left: 0, moved: false })
  const onMouseDown = useCallback((e) => {
    const el = ref.current; if (!el) return
    state.current = { down: true, x: e.pageX, left: el.scrollLeft, moved: false }
    el.classList.add('cursor-grabbing')
  }, [])
  const end = useCallback(() => {
    state.current.down = false
    ref.current?.classList.remove('cursor-grabbing')
  }, [])
  const onMouseMove = useCallback((e) => {
    const el = ref.current; const s = state.current
    if (!s.down || !el) return
    e.preventDefault()
    const dx = e.pageX - s.x
    if (Math.abs(dx) > 3) s.moved = true
    el.scrollLeft = s.left - dx
  }, [])
  return { ref, handlers: { onMouseDown, onMouseUp: end, onMouseLeave: end, onMouseMove } }
}
