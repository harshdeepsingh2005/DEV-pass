import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import deskBg from '../assets/background/desk-background.webp'
import passportCover from '../assets/passport/passport_cover.webp'
import passportPageTexture from '../assets/texture/passport-page.webp'
import PassportSpine from './PassportSpine'

gsap.registerPlugin(ScrollTrigger)

/**
 * FloatingPassport — 3D page-flip passport driven by scroll.
 *
 * Architecture:
 *   • Only ONE spread visible at a time (GSAP controls autoAlpha).
 *   • Page leaves (right-half, hinged at spine) flip with rotateY(0 → −180°).
 *   • At the midpoint of each flip (90°), the base spread swaps.
 *   • Front face of leaf = right half of current spread.
 *   • Back face of leaf = left half of next spread.
 *   • After flip completes, leaf is hidden to avoid z-stacking issues.
 *   • clip-path instead of overflow-hidden (which kills preserve-3d).
 *   • filter isolated to wrapper div (also kills preserve-3d).
 */
const FloatingPassport = ({ cover, spreads }) => {
  const containerRef = useRef(null)
  const viewportRef = useRef(null)
  const passportRef = useRef(null)
  const coverLeafRef = useRef(null)
  const pagesRef = useRef(null)
  const pageLeafRefs = useRef([])
  const spreadRefs = useRef([])
  const [coverOpen, setCoverOpen] = useState(false)
  const [activeSpread, setActiveSpread] = useState(-1)

  const setPageLeafRef = useCallback((el, i) => {
    if (el) pageLeafRefs.current[i] = el
  }, [])
  const setSpreadRef = useCallback((el, i) => {
    if (el) spreadRefs.current[i] = el
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalScroll = window.innerHeight * 8
      const numPages = spreads.length - 1

      /* ---- Initial state ---- */
      gsap.set(pagesRef.current, { autoAlpha: 0 })
      spreadRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 })
      })

      /* Hide ALL content in each spread — reveal only after the page fully turns */
      spreadRefs.current.forEach((el) => {
        if (!el) return
        const children = el.querySelectorAll(':scope > *')
        if (children.length) gsap.set(children, { autoAlpha: 0, y: 8 })
      })

      /* ---- Pin ---- */
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalScroll}`,
        pin: viewportRef.current,
        pinSpacing: true,
      })

      /* ---- Float ---- */
      gsap.fromTo(
        passportRef.current,
        { y: 6, rotation: -1 },
        { y: -10, rotation: 2, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' },
      )

      /* ---- Master timeline ---- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress * 100
            setCoverOpen(p >= 14)
            if (p < 18) setActiveSpread(-1)
            else {
              const start = 18, end = 97, range = end - start
              const prog = Math.min(p - start, range) / range
              setActiveSpread(Math.min(Math.floor(prog * spreads.length), spreads.length - 1))
            }
          },
        },
      })

      /* ── Phase 1: Cover flip (6% → 18%) ── */
      tl.fromTo(
        coverLeafRef.current,
        { rotationY: 0 },
        { rotationY: -180, ease: 'power2.inOut', duration: 12 },
        6,
      )
      tl.to(pagesRef.current, { autoAlpha: 1, duration: 3 }, 8)
      tl.to(coverLeafRef.current, { autoAlpha: 0, z: -10, duration: 3, ease: 'power1.in' }, 15)

      /* Reveal first spread content — at 80% of cover flip */
      const coverFlipStart = 6
      const coverFlipDur = 12
      const firstChildren = spreadRefs.current[0]?.querySelectorAll(':scope > *')
      if (firstChildren?.length) {
        tl.to(firstChildren,
          { autoAlpha: 1, y: 0, stagger: 0.15, duration: 2.5, ease: 'power3.out' },
          coverFlipStart + coverFlipDur * 0.8,
        )
      }

      /* ── Phase 2: Page flips (18% → 97%) ── */
      const flipStart = 18
      const flipEnd = 97
      const flipSegment = (flipEnd - flipStart) / numPages
      const flipDur = flipSegment * 0.75

      for (let i = 0; i < numPages; i++) {
        const leaf = pageLeafRefs.current[i]
        if (!leaf) continue

        const segStart = flipStart + i * flipSegment
        const midpoint = segStart + flipDur / 2

        tl.fromTo(
          leaf,
          { rotationY: 0 },
          { rotationY: -180, ease: 'power2.inOut', duration: flipDur },
          segStart,
        )

        if (spreadRefs.current[i]) {
          tl.set(spreadRefs.current[i], { autoAlpha: 0 }, midpoint)
        }
        if (spreadRefs.current[i + 1]) {
          tl.set(spreadRefs.current[i + 1], { autoAlpha: 1 }, midpoint)
        }

        tl.set(leaf, { autoAlpha: 0 }, segStart + flipDur + 0.2)

        /* Reveal content on newly visible spread — at 80% of page flip */
        const nextChildren = spreadRefs.current[i + 1]?.querySelectorAll(':scope > *')
        if (nextChildren?.length) {
          tl.to(nextChildren,
            { autoAlpha: 1, y: 0, stagger: 0.15, duration: 2.5, ease: 'power3.out' },
            segStart + flipDur * 0.8,
          )
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [spreads.length])

  /* ---- Keyboard navigation ---- */
  useEffect(() => {
    const totalScroll = window.innerHeight * 8
    const scrollTargets = Array.from({ length: spreads.length + 1 }, (_, i) => {
      if (i === 0) return 0
      return 18 + ((i - 0.5) / spreads.length) * 79
    })

    const handleKeyDown = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      const container = containerRef.current
      if (!container) return
      const containerTop = container.offsetTop
      const currentScroll = window.scrollY - containerTop
      const currentProgress = Math.max(0, currentScroll / totalScroll) * 100

      let closestIdx = 0
      let closestDist = Infinity
      scrollTargets.forEach((t, i) => {
        const dist = Math.abs(currentProgress - t)
        if (dist < closestDist) { closestDist = dist; closestIdx = i }
      })

      let nextIdx = closestIdx
      if (e.key === 'ArrowRight') nextIdx = Math.min(closestIdx + 1, scrollTargets.length - 1)
      if (e.key === 'ArrowLeft') nextIdx = Math.max(closestIdx - 1, 0)

      const targetScroll = containerTop + (scrollTargets[nextIdx] / 100) * totalScroll
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [spreads.length])

  const numPages = spreads.length - 1

  return (
    <div ref={containerRef}>
      <div ref={viewportRef} className="w-full h-screen relative overflow-hidden">
        {/* ═══════ DESK BACKGROUND ═══════ */}
        <div className="absolute inset-0 z-0">
          <img src={deskBg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-black/25" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)' }}
          />
          <div
            className="absolute inset-0 mix-blend-soft-light"
            style={{ background: 'radial-gradient(ellipse at 45% 40%, rgba(255,220,160,0.08) 0%, transparent 70%)' }}
          />
        </div>

        {/* ═══════ FLOATING PASSPORT ═══════ */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{ perspective: '2200px' }}
        >
          {/* Shadow wrapper — filter isolated here so it doesn't kill preserve-3d */}
          <div
            style={{
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5)) drop-shadow(0 12px 24px rgba(0,0,0,0.3))',
            }}
          >
            <div
              ref={passportRef}
              className="relative"
              style={{
                width: coverOpen ? 'min(82vw, 880px)' : 'min(34vw, 380px)',
                height: 'min(56vh, 500px)',
                transition: 'width 0.5s ease-out',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Back cover */}
              <div
                className="absolute inset-0 rounded-md"
                style={{
                  background: 'linear-gradient(145deg, #0a1a30 0%, #0B1D3A 50%, #081629 100%)',
                  transform: 'translateZ(-4px)',
                }}
              />

              {/* ═══════ PAGES CONTAINER ═══════ */}
              <div
                ref={pagesRef}
                className="passport-paper absolute inset-0 rounded-md"
                style={{
                  transform: 'translateZ(-2px)',
                  transformStyle: 'preserve-3d',
                  clipPath: 'inset(5px round 6px)',
                }}
              >
                <div
                  className="absolute inset-0 z-[1]"
                  style={{ backgroundImage: `url(${passportPageTexture})`, backgroundSize: 'cover' }}
                />
                <div className="absolute inset-0 z-[2] bg-passport-paper/92" />

                {/* ── Base spread layers (only active one visible) ── */}
                {spreads.map((spreadEl, i) => (
                  <div
                    key={`spread-${i}`}
                    ref={(el) => setSpreadRef(el, i)}
                    className="absolute"
                    style={{ inset: 10, zIndex: 5 + i }}
                  >
                    {spreadEl}
                  </div>
                ))}

                {/* ── Page leaves (right half, hinge at spine) ── */}
                {Array.from({ length: numPages }, (_, i) => (
                  <div
                    key={`leaf-${i}`}
                    ref={(el) => setPageLeafRef(el, i)}
                    className="absolute top-0 bottom-0"
                    style={{
                      left: '50%',
                      width: '50%',
                      zIndex: 20 + (numPages - i),
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'left center',
                      willChange: 'transform',
                    }}
                  >
                    {/* Front face — right half of spread[i] */}
                    <div
                      className="absolute overflow-hidden"
                      style={{ inset: 5, backfaceVisibility: 'hidden' }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{ backgroundImage: `url(${passportPageTexture})`, backgroundSize: 'cover' }}
                      />
                      <div className="absolute inset-0 bg-passport-paper/95" />
                      <div
                        className="absolute top-0 bottom-0"
                        style={{ width: '200%', left: '-100%' }}
                      >
                        {spreads[i]}
                      </div>
                      <div
                        className="absolute right-0 top-0 bottom-0 pointer-events-none"
                        style={{ width: 8, background: 'linear-gradient(to left, rgba(0,0,0,0.08) 0%, transparent 100%)' }}
                      />
                    </div>

                    {/* Back face — left half of spread[i+1] */}
                    <div
                      className="absolute overflow-hidden"
                      style={{ inset: 5, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{ backgroundImage: `url(${passportPageTexture})`, backgroundSize: 'cover' }}
                      />
                      <div className="absolute inset-0 bg-passport-paper/95" />
                      <div
                        className="absolute top-0 bottom-0"
                        style={{ width: '200%', left: '0' }}
                      >
                        {spreads[i + 1]}
                      </div>
                      <div
                        className="absolute left-0 top-0 bottom-0 pointer-events-none"
                        style={{ width: 8, background: 'linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 100%)' }}
                      />
                    </div>
                  </div>
                ))}

                {/* ── Booklet binding seam ── */}
                <div style={{ zIndex: 35 }} className="absolute inset-0 pointer-events-none">
                  <PassportSpine />
                </div>
              </div>

              {/* ═══════ FRONT COVER ═══════ */}
              <div
                ref={coverLeafRef}
                className="absolute z-40 rounded-md"
                style={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: coverOpen ? '50%' : '100%',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center',
                  transition: 'width 0.5s ease-out',
                  willChange: 'transform',
                }}
              >
                {/* Exterior face */}
                <div
                  className="absolute inset-0 rounded-r-md overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    backgroundImage: `url(${passportCover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="relative z-10 h-full">{cover}</div>
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/20 to-transparent" />
                </div>

                {/* Interior face */}
                <div
                  className="absolute inset-0 rounded-l-md overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, #0B1D3A 0%, #122a52 50%, #0a1a30 100%)',
                  }}
                >
                  <div className="absolute inset-3 border border-gold/15 rounded-sm" />
                  <div className="absolute inset-5 border border-gold/8 rounded-sm" />
                  <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/25" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/25" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/25" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/25" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <svg width="80" height="80" viewBox="0 0 60 60" className="text-gold/20">
                      <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="0.6" />
                      <circle cx="30" cy="30" r="22" fill="none" stroke="currentColor" strokeWidth="0.4" />
                      <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.3" />
                      <text x="30" y="33" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="'Special Elite', monospace">&lt;/&gt;</text>
                    </svg>
                    <p className="font-stamp text-gold/15 text-[8px] tracking-[0.4em] uppercase mt-3">
                      Developer Passport
                    </p>
                    <div className="w-16 h-px bg-gold/10 mt-1.5" />
                    <p className="font-stamp text-gold/10 text-[7px] tracking-[0.3em] uppercase mt-1">
                      Official Document
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ SCROLL HINT ═══════ */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center transition-opacity duration-600 ${
            coverOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <p className="font-stamp text-passport-paper/35 text-[10px] tracking-[0.35em] uppercase mb-2">
            Scroll to Open
          </p>
          <div className="animate-bounce text-passport-paper/25">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 8 L10 14 L16 8" />
            </svg>
          </div>
        </div>

        {/* ═══════ SPREAD INDICATORS ═══════ */}
        <div
          className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 transition-opacity duration-500 ${
            coverOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <p className="font-stamp text-passport-paper/40 text-[9px] tracking-[0.3em] uppercase transition-all duration-300">
            {['Identity', 'Skills', 'Projects', 'Journey', 'Research', 'Experience', 'Contact'][activeSpread] || ''}
          </p>
          <div className="flex gap-2">
            {spreads.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeSpread === i ? 'bg-gold scale-[1.6]' : 'bg-white/20'
                }`}
                title={['Identity', 'Skills', 'Projects', 'Journey', 'Research', 'Experience', 'Contact'][i]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FloatingPassport
