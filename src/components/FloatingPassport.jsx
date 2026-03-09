import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import deskBg from '../assets/background/desk-background.webp'
import passportCover from '../assets/passport/passport_cover.webp'
import passportPageTexture from '../assets/texture/passport-page.webp'

gsap.registerPlugin(ScrollTrigger)

/**
 * FloatingPassport — A floating passport book pinned in the viewport.
 *
 * The passport stays centered while scroll progress controls a master GSAP
 * timeline that flips the cover open and cross-fades between spreads.
 *
 * Props:
 *   cover   — React element for the closed cover face
 *   spreads — array of React elements, one per spread (7 spreads expected)
 *
 * Timeline (scroll progress → animation):
 *   0-8%     cover closed, passport on desk
 *   8-20%    cover flips open (3D rotateY)
 *   20-33%   spread 0 (Identity) visible
 *   33-48%   spread 1 (Skills)
 *   48-63%   spread 2 (Projects)
 *   63-78%   spread 3 (Journey)
 *   78-88%   spread 4 (Research)
 *   88-93%   spread 5 (Experience)
 *   93-100%  spread 6 (Exit Visa)
 */
const FloatingPassport = ({ cover, spreads }) => {
  const containerRef = useRef(null)
  const viewportRef = useRef(null)
  const passportRef = useRef(null)
  const coverLeafRef = useRef(null)
  const spreadRefs = useRef([])
  const [coverOpen, setCoverOpen] = useState(false)
  const [activeSpread, setActiveSpread] = useState(-1)

  const setSpreadRef = useCallback((el, i) => {
    if (el) spreadRefs.current[i] = el
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalScroll = window.innerHeight * 8

      /* ---- Pin the viewport ---- */
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalScroll}`,
        pin: viewportRef.current,
        pinSpacing: true,
      })

      /* ---- Floating oscillation (runs continuously) ---- */
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
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress * 100
            setCoverOpen(p >= 16)
            if (p < 20) setActiveSpread(-1)
            else if (p < 33) setActiveSpread(0)
            else if (p < 48) setActiveSpread(1)
            else if (p < 63) setActiveSpread(2)
            else if (p < 78) setActiveSpread(3)
            else if (p < 88) setActiveSpread(4)
            else if (p < 93) setActiveSpread(5)
            else setActiveSpread(6)
          },
        },
      })

      /* Phase: Cover flip (8% → 20%) */
      tl.fromTo(
        coverLeafRef.current,
        { rotationY: 0 },
        { rotationY: -180, ease: 'power2.inOut', duration: 12 },
        8,
      )

      /* Phase: Spreads */
      const entryPoints = [18, 33, 48, 63, 78, 88, 93]
      const transitionDur = 5

      // First spread fades in
      if (spreadRefs.current[0]) {
        tl.fromTo(
          spreadRefs.current[0],
          { opacity: 0, x: 25 },
          { opacity: 1, x: 0, duration: transitionDur, ease: 'power2.out' },
          entryPoints[0],
        )
      }

      // Subsequent: cross-fade
      for (let i = 1; i < spreads.length; i++) {
        const t = entryPoints[i]
        if (!t) break
        // fade out previous
        if (spreadRefs.current[i - 1]) {
          tl.to(
            spreadRefs.current[i - 1],
            { opacity: 0, x: -25, duration: transitionDur, ease: 'power2.in' },
            t - 3,
          )
        }
        // fade in current
        if (spreadRefs.current[i]) {
          tl.fromTo(
            spreadRefs.current[i],
            { opacity: 0, x: 25 },
            { opacity: 1, x: 0, duration: transitionDur, ease: 'power2.out' },
            t,
          )
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [spreads.length])

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
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/25" />
          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)',
            }}
          />
          {/* Warm ambient light */}
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
              transition: 'width 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
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

            {/* Pages container (visible when open) */}
            <div
              className={`absolute inset-0 rounded-md overflow-hidden transition-opacity duration-500 ${
                coverOpen ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transform: 'translateZ(-2px)' }}
            >
              {/* Page texture */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${passportPageTexture})`,
                  backgroundSize: 'cover',
                }}
              />
              <div className="absolute inset-0 bg-passport-paper/92" />

              {/* Left-page shadow (inner) */}
              <div className="absolute right-1/2 top-0 bottom-0 w-6 z-30 bg-gradient-to-l from-black/[0.06] to-transparent" />
              {/* Right-page shadow (inner) */}
              <div className="absolute left-1/2 top-0 bottom-0 w-6 z-30 bg-gradient-to-r from-black/[0.04] to-transparent" />

              {/* Center spine */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 z-30"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.1) 100%)',
                  boxShadow:
                    '-4px 0 12px rgba(0,0,0,0.06), 4px 0 12px rgba(0,0,0,0.06)',
                }}
              />

              {/* ── Spreads (stacked, GSAP controls opacity) ── */}
              {spreads.map((spreadEl, i) => (
                <div
                  key={i}
                  ref={(el) => setSpreadRef(el, i)}
                  className="absolute inset-0 z-20"
                  style={{ opacity: 0, willChange: 'transform, opacity' }}
                >
                  {spreadEl}
                </div>
              ))}
            </div>

            {/* ═══════ FRONT COVER (flips open) ═══════ */}
            <div
              ref={coverLeafRef}
              className="absolute z-40 rounded-md overflow-hidden"
              style={{
                top: 0,
                right: 0,
                bottom: 0,
                width: coverOpen ? '50%' : '100%',
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                transition: 'width 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform',
              }}
            >
              {/* Exterior face */}
              <div
                className="absolute inset-0 rounded-r-md"
                style={{
                  backfaceVisibility: 'hidden',
                  backgroundImage: `url(${passportCover})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div
                  className="absolute inset-0 rounded-r-md"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(15,40,71,0.3) 0%, rgba(11,29,58,0.5) 50%, rgba(9,26,51,0.35) 100%)',
                  }}
                />
                <div className="relative z-10 h-full">{cover}</div>
                {/* Spine shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/20 to-transparent" />
              </div>

              {/* Interior face (back of cover) */}
              <div
                className="absolute inset-0 rounded-l-md"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background:
                    'linear-gradient(135deg, #0B1D3A 0%, #122a52 50%, #0a1a30 100%)',
                }}
              >
                <div className="absolute inset-4 border border-gold/8 rounded-sm" />
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 60 60"
                    className="text-gold"
                  >
                    <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M30 5 L30 55 M5 30 L55 30" stroke="currentColor" strokeWidth="0.3" />
                  </svg>
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
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 transition-opacity duration-500 ${
            coverOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {spreads.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeSpread === i
                  ? 'bg-gold scale-[1.6]'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FloatingPassport
