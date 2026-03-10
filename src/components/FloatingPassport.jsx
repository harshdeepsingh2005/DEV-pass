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
 *   • Pages stacked like a real book — each "page leaf" has a front & back face.
 *   • GSAP ScrollTrigger scrubs rotateY(0 → −180°) on each leaf sequentially.
 *   • Cover flips open first, then inner pages flip one-by-one.
 *   • Each spread sits on a layer; when a page leaf flips, the next spread is revealed.
 *   • Shadows, paper texture, and bending illusion enhance realism.
 *
 * Props:
 *   cover   — React element for the closed cover face
 *   spreads — array of React elements (7 spreads)
 */
const FloatingPassport = ({ cover, spreads }) => {
  const containerRef = useRef(null)
  const viewportRef = useRef(null)
  const passportRef = useRef(null)
  const coverLeafRef = useRef(null)
  const pageLeafRefs = useRef([])
  const [coverOpen, setCoverOpen] = useState(false)
  const [activeSpread, setActiveSpread] = useState(-1)

  const setPageLeafRef = useCallback((el, i) => {
    if (el) pageLeafRefs.current[i] = el
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalScroll = window.innerHeight * 8
      const numPages = spreads.length - 1 // 6 page flips between 7 spreads

      /* ---- Pin the viewport ---- */
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalScroll}`,
        pin: viewportRef.current,
        pinSpacing: true,
      })

      /* ---- Floating oscillation ---- */
      gsap.fromTo(
        passportRef.current,
        { y: 6, rotation: -1 },
        {
          y: -10,
          rotation: 2,
          duration: 4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        },
      )

      /* ---- Master scroll timeline ---- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress * 100
            setCoverOpen(p >= 14)

            // Determine which spread is active based on page flips
            if (p < 18) setActiveSpread(-1)
            else {
              // Each page flip occupies a portion of the remaining timeline
              const flipZoneStart = 18
              const flipZoneEnd = 97
              const flipRange = flipZoneEnd - flipZoneStart
              const progressInFlips = Math.min(p - flipZoneStart, flipRange) / flipRange
              const idx = Math.min(
                Math.floor(progressInFlips * spreads.length),
                spreads.length - 1,
              )
              setActiveSpread(idx)
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
      // Fade out the cover leaf as the flip finishes so it can't block pages.
      // autoAlpha tweens opacity → 0 then sets visibility:hidden automatically.
      // Starts at 15 (about 75% through the flip) so it fades out smoothly
      // as the cover completes its rotation. GSAP scrub auto-reverts on scroll-back.
      tl.to(coverLeafRef.current, { autoAlpha: 0, z: -10, duration: 3, ease: 'power1.in' }, 15)

      /* ── Phase 2: Page flips (18% → 97%) ── */
      // Each page leaf flips sequentially, revealing the next spread
      const flipStart = 18
      const flipEnd = 97
      const flipSegment = (flipEnd - flipStart) / numPages
      const flipDur = flipSegment * 0.7 // actual flip takes 70% of segment

      for (let i = 0; i < numPages; i++) {
        const leaf = pageLeafRefs.current[i]
        if (!leaf) continue

        const segStart = flipStart + i * flipSegment
        // Flip: rotateY 0 → -180
        tl.fromTo(
          leaf,
          { rotationY: 0 },
          {
            rotationY: -180,
            ease: 'power2.inOut',
            duration: flipDur,
          },
          segStart,
        )
        // After the flip, hide the leaf so its back face doesn't stack above
        // later pages (z-index ordering causes leaf[0]'s back to cover leaf[5]'s).
        // The base spread layers underneath show the correct content.
        // GSAP scrub auto-reverts autoAlpha when scrolling back.
        tl.set(leaf, { autoAlpha: 0 }, segStart + flipDur + 0.3)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [spreads.length])

  /* ---- Keyboard navigation (← →) ---- */
  useEffect(() => {
    const totalScroll = window.innerHeight * 8
    const numStops = spreads.length + 1 // cover + each spread
    const scrollTargets = Array.from({ length: numStops }, (_, i) => {
      if (i === 0) return 0
      // Spread centers spread across 18%–97%
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

  /*
   * Page-leaf model:
   *   We need (spreads.length - 1) page leaves between spreads.
   *   Leaf i sits between spread[i] and spread[i+1].
   *   Front face = right side of spread[i] content (blank page paper).
   *   Back face  = left side of spread[i+1] content (blank page paper).
   *   When leaf i flips (rotateY → -180), it hides spread[i] and shows spread[i+1].
   *
   * Z-stacking (reverse order so leaf 0 is on top):
   *   Spread 0     z: 7   (bottom-most spread, always visible behind everything)
   *   Spread 1     z: 8
   *   ...
   *   Spread N     z: 7+N
   *   Leaf 0       z: 20 + (numPages - 0)   (highest = on top of stack)
   *   Leaf 1       z: 20 + (numPages - 1)
   *   ...
   */
  const numPages = spreads.length - 1

  return (
    <div ref={containerRef}>
      <div ref={viewportRef} className="w-full h-screen relative overflow-hidden">
        {/* ═══════ DESK BACKGROUND ═══════ */}
        <div className="absolute inset-0 z-0">
          <img
            src={deskBg}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/25" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)',
            }}
          />
          <div
            className="absolute inset-0 mix-blend-soft-light"
            style={{
              background:
                'radial-gradient(ellipse at 45% 40%, rgba(255,220,160,0.08) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* ═══════ FLOATING PASSPORT ═══════ */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{ perspective: '2200px' }}
        >
          <div
            ref={passportRef}
            className="relative"
            style={{
              width: coverOpen ? 'min(82vw, 880px)' : 'min(34vw, 380px)',
              height: 'min(56vh, 500px)',
              transition: 'width 0.5s ease-out',
              transformStyle: 'preserve-3d',
              filter:
                'drop-shadow(0 30px 60px rgba(0,0,0,0.5)) drop-shadow(0 12px 24px rgba(0,0,0,0.3))',
            }}
          >
            {/* Back cover */}
            <div
              className="absolute inset-0 rounded-md"
              style={{
                background:
                  'linear-gradient(145deg, #0a1a30 0%, #0B1D3A 50%, #081629 100%)',
                transform: 'translateZ(-4px)',
              }}
            />

            {/* ═══════ PAGES CONTAINER ═══════ */}
            <div
              className={`passport-paper absolute inset-0 rounded-md overflow-hidden transition-opacity duration-500 ${
                coverOpen ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: 'translateZ(-2px)',
                transformStyle: 'preserve-3d',
                perspective: '2200px',
              }}
            >
              {/* Page texture background */}
              <div
                className="absolute inset-0 z-[1]"
                style={{
                  backgroundImage: `url(${passportPageTexture})`,
                  backgroundSize: 'cover',
                }}
              />
              <div className="absolute inset-0 z-[2] bg-passport-paper/92" />

              {/* ── Spread layers (stacked, always rendered) ── */}
              {spreads.map((spreadEl, i) => (
                <div
                  key={`spread-${i}`}
                  className="absolute inset-0"
                  style={{
                    zIndex: 7 + i,
                  }}
                >
                  {spreadEl}
                </div>
              ))}

              {/* ── Page leaves (right-half only, flip from spine) ── */}
              {Array.from({ length: numPages }, (_, i) => (
                <div
                  key={`leaf-${i}`}
                  ref={(el) => setPageLeafRef(el, i)}
                  className="absolute top-0 bottom-0 overflow-visible"
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
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${passportPageTexture})`,
                        backgroundSize: 'cover',
                      }}
                    />
                    <div className="absolute inset-0 bg-passport-paper/95" />
                    {/* Full spread shifted left so right half is visible */}
                    <div className="absolute top-0 bottom-0" style={{ width: '200%', left: '-100%' }}>
                      {spreads[i]}
                    </div>
                    {/* Page edge shadow (right edge) */}
                    <div
                      className="absolute right-0 top-0 bottom-0 pointer-events-none"
                      style={{
                        width: 8,
                        background:
                          'linear-gradient(to left, rgba(0,0,0,0.08) 0%, transparent 100%)',
                      }}
                    />
                  </div>

                  {/* Back face — left half of spread[i+1] (visible when flipped) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${passportPageTexture})`,
                        backgroundSize: 'cover',
                      }}
                    />
                    <div className="absolute inset-0 bg-passport-paper/95" />
                    {/* Full spread at normal position so left half is visible */}
                    <div className="absolute top-0 bottom-0" style={{ width: '200%', left: '0' }}>
                      {spreads[i + 1]}
                    </div>
                    {/* Page edge shadow (left edge on back face) */}
                    <div
                      className="absolute left-0 top-0 bottom-0 pointer-events-none"
                      style={{
                        width: 8,
                        background:
                          'linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 100%)',
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* ── Booklet binding seam (always on top of pages) ── */}
              <div style={{ zIndex: 35 }} className="absolute inset-0 pointer-events-none">
                <PassportSpine />
              </div>
            </div>

            {/* ═══════ FRONT COVER (flips open) ═══════ */}
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

              {/* Interior face (back of cover) */}
              <div
                className="absolute inset-0 rounded-l-md overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background:
                    'linear-gradient(135deg, #0B1D3A 0%, #122a52 50%, #0a1a30 100%)',
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
                  activeSpread === i
                    ? 'bg-gold scale-[1.6]'
                    : 'bg-white/20'
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
