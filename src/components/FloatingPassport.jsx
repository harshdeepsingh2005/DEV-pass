import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import deskBg from '../assets/background/desk-background.webp'
import passportCover from '../assets/passport/passport_cover.webp'
import passportPageTexture from '../assets/texture/passport-page.webp'
import PassportSpine from './PassportSpine'
import DiaryModal from './DiaryModal'
import PenBoard from './PenBoard'
import CompassModal from './CompassModal'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

/* ═══════ DOODLE ART SVG COMPONENTS — matching Vercel deployment ═══════ */

/** Paper airplane — hand-drawn triangle shape with tail lines */
const PaperAirplane = ({ className, top, left, right, bottom }) => (
  <svg
    style={{ top, left, right, bottom }}
    viewBox="0 0 100 100"
    className={`absolute pointer-events-none text-white/40 ${className}`}
  >
    <path
      d="M10,50 L80,20 L60,80 Z M10,50 L50,50 L60,80 M50,50 L80,20"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
    />
    <path
      d="M-10,60 C0,65 5,55 8,52 M-20,68 C-15,70 -10,65 -8,58"
      fill="none" stroke="currentColor" strokeWidth="1"
      strokeDasharray="2 3"
    />
  </svg>
)

/** Curved dashed arrow — sweeping arc with barb tip */
const CurvedArrow = ({ className, top, left, right, bottom }) => (
  <svg
    style={{ top, left, right, bottom }}
    viewBox="0 0 100 100"
    className={`absolute pointer-events-none text-white/40 ${className}`}
  >
    <path
      d="M20,80 C20,50 50,30 80,20"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeDasharray="3 2"
    />
    <path
      d="M60,15 L80,20 L85,40"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

/** Dotted globe wireframe — outer circle + equator ellipse + meridian + pole line */
const DottedGlobe = ({ className, top, left, right, bottom }) => (
  <svg
    style={{ top, left, right, bottom }}
    viewBox="0 0 100 100"
    className={`absolute pointer-events-none text-white/30 ${className}`}
  >
    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeDasharray="5 3" />
    <ellipse cx="50" cy="50" rx="20" ry="45" fill="none" stroke="currentColor"
      strokeWidth="1" strokeDasharray="3 4" />
    <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="currentColor"
      strokeWidth="1" strokeDasharray="3 4" />
    <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor"
      strokeWidth="1" strokeDasharray="2 4" />
  </svg>
)

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
  const [modal, setModal] = useState(null) // 'diary' | 'pen' | 'compass'
  const [isFullscreen, setIsFullscreen] = useState(false)

  /* ── Fullscreen state listener ── */
  useEffect(() => {
    const onFullscreenChange = () => {
      const fs = !!document.fullscreenElement
      setIsFullscreen(fs)
      // Recalculate scroll positions after viewport change
      setTimeout(() => ScrollTrigger.refresh(), 300)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    document.addEventListener('webkitfullscreenchange', onFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
    }
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }, [])

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
      /* Hide ALL page leaves — they sit above the base spread layer and
         block the animated right-half content. Show each leaf only when
         its flip animation begins so the GSAP-animated base layer is
         visible on BOTH halves between flips. */
      pageLeafRefs.current.forEach(leaf => {
        if (leaf) gsap.set(leaf, { autoAlpha: 0 })
      })

      /* Hide ALL content in each spread — reveal only after the page fully turns */
      spreadRefs.current.forEach((el) => {
        if (!el) return
        const children = el.querySelectorAll('.passport-spread-inner > *')
        if (children.length) gsap.set(children, { autoAlpha: 0, y: 8 })
        /* Stamp-slam elements — bigger initial scale + brightness flash for dramatic slam */
        const stamps = el.querySelectorAll('.stamp-slam')
        if (stamps.length) gsap.set(stamps, { scale: 2.5, autoAlpha: 0, filter: 'brightness(1.5)', transformOrigin: 'center center' })
        /* Journey milestone markers start hidden + scaled down for pop-in */
        const jMs = el.querySelectorAll('.journey-milestone')
        if (jMs.length) gsap.set(jMs, { autoAlpha: 0, scale: 0 })
        /* Journey region highlights start hidden */
        const jRg = el.querySelectorAll('.journey-region')
        if (jRg.length) gsap.set(jRg, { autoAlpha: 0, scale: 0.3 })
      })

      /* Unpause gold-foil & holographic shimmer on cover (it's always visible, not part of flip reveals) */
      coverLeafRef.current?.querySelectorAll('.gold-foil, .holographic').forEach(
        (el) => { el.style.animationPlayState = 'running' },
      )

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
        {
          rotationY: -180, ease: 'power2.inOut', duration: 12,
          onUpdate: function () {
            const cover = coverLeafRef.current
            if (!cover) return
            const angle = gsap.getProperty(cover, 'rotationY')
            const ext = cover.querySelector('.cover-exterior-face')
            const int_ = cover.querySelector('.cover-interior-face')
            if (!ext || !int_) return
            if (angle <= -90) {
              gsap.set(ext, { opacity: 0 })
              gsap.set(int_, { opacity: 1 })
            } else {
              gsap.set(ext, { opacity: 1 })
              gsap.set(int_, { opacity: 0 })
            }
          },
        },
        6,
      )
      tl.to(pagesRef.current, { autoAlpha: 1, duration: 3 }, 8)
      tl.to(coverLeafRef.current, { autoAlpha: 0, z: -10, duration: 3, ease: 'power1.in' }, 15)

      /* Reveal first spread content — at 80% of cover flip */
      const coverFlipStart = 6
      const coverFlipDur = 12
      const revealPos0 = coverFlipStart + coverFlipDur * 0.8
      const firstChildren = spreadRefs.current[0]?.querySelectorAll('.passport-spread-inner > *')
      if (firstChildren?.length) {
        tl.to(firstChildren,
          { autoAlpha: 1, y: 0, stagger: 0.15, duration: 2.5, ease: 'power3.out' },
          revealPos0,
        )
      }
      /* Stamp-slam on first spread — slam in with brightness flash */
      const firstStamps = spreadRefs.current[0]?.querySelectorAll('.stamp-slam')
      if (firstStamps?.length) {
        tl.to(firstStamps, {
          autoAlpha: 1, scale: 1, y: 0, filter: 'brightness(0.95)',
          duration: 0.8, stagger: 0.2, ease: 'back.out(3)',
        }, revealPos0 + 1.5)
      }
      /* Trigger any in-page animations on first spread */
      const firstPaths = spreadRefs.current[0]?.querySelectorAll('.journey-path')
      if (firstPaths?.length) {
        tl.to(firstPaths, { strokeDashoffset: 0, duration: 4, ease: 'power2.inOut' }, revealPos0)
      }
      const firstSigs = spreadRefs.current[0]?.querySelectorAll('.signature-path')
      if (firstSigs?.length) {
        tl.to(firstSigs, { strokeDashoffset: 0, duration: 3, stagger: 0.8, ease: 'power2.out' }, revealPos0 + 2)
      }
      const firstAnimated = spreadRefs.current[0]?.querySelectorAll('.gold-foil, .holographic, [style*="animation"]')
      if (firstAnimated?.length) {
        tl.call(() => firstAnimated.forEach(el => el.style.animationPlayState = 'running'), null, revealPos0)
      }

      /* ── Journey element animator (milestones, regions, plane, pings) ── */
      const revealJourney = (spreadEl, pos) => {
        if (!spreadEl) return
        /* Milestones — staggered scale-in synced to path draw */
        const ms = spreadEl.querySelectorAll('.journey-milestone')
        if (ms.length) {
          const n = ms.length
          ms.forEach((m, idx) => {
            const off = n > 1 ? (idx / (n - 1)) * 2.5 : 0
            tl.to(m, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'back.out(3)' }, pos + 0.3 + off)
          })
        }
        /* Region highlights — glow when milestone appears */
        const rg = spreadEl.querySelectorAll('.journey-region')
        if (rg.length) {
          const n = rg.length
          rg.forEach((r, idx) => {
            const off = n > 1 ? (idx / (n - 1)) * 2.5 : 0
            tl.to(r, { autoAlpha: 0.08, scale: 1, duration: 1.2, ease: 'power2.out' }, pos + 0.3 + off)
          })
        }
        /* Plane — follows route via MotionPathPlugin */
        const plane = spreadEl.querySelector('.journey-plane')
        const route = spreadEl.querySelector('.journey-path')
        const contrail = spreadEl.querySelector('.journey-contrail')
        if (plane && route) {
          /* Set up contrail stroke for draw-on animation */
          if (contrail) {
            const cLen = contrail.getTotalLength()
            gsap.set(contrail, { strokeDasharray: cLen, strokeDashoffset: cLen })
            tl.to(contrail, { autoAlpha: 0.35, duration: 0.2 }, pos)
            tl.to(contrail, { strokeDashoffset: 0, duration: 3, ease: 'power2.inOut' }, pos + 0.2)
            tl.to(contrail, { autoAlpha: 0, duration: 0.8, ease: 'power1.in' }, pos + 2.8)
          }
          tl.to(plane, { autoAlpha: 0.9, duration: 0.3 }, pos)
          tl.to(plane, {
            motionPath: { path: route, align: route, autoRotate: true, alignOrigin: [0.5, 0.5] },
            duration: 3, ease: 'power2.inOut',
          }, pos + 0.2)
        }
        /* Ping ring CSS pulse — unpause as each milestone appears */
        const pings = spreadEl.querySelectorAll('.journey-ping')
        if (pings.length) {
          const n = pings.length
          pings.forEach((p, idx) => {
            const off = n > 1 ? (idx / (n - 1)) * 2.5 : 0
            tl.call(() => { p.style.animationPlayState = 'running' }, null, pos + 0.5 + off)
          })
        }
      }
      revealJourney(spreadRefs.current[0], revealPos0)

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

        /* Show leaf right when its flip begins */
        tl.set(leaf, { autoAlpha: 1 }, segStart)

        tl.fromTo(
          leaf,
          { rotationY: 0 },
          { rotationY: -180, ease: 'power2.inOut', duration: flipDur },
          segStart,
        )

        /* ── Animated page shadows — shadow sweeps across the page during turn ── */
        const shadowFront = leaf.querySelector('.page-shadow-front')
        const shadowBack  = leaf.querySelector('.page-shadow-back')
        if (shadowFront) {
          tl.fromTo(shadowFront,
            { opacity: 0 },
            { opacity: 1, duration: flipDur / 2, ease: 'power1.in' },
            segStart,
          )
        }
        if (shadowBack) {
          tl.fromTo(shadowBack,
            { opacity: 1 },
            { opacity: 0, duration: flipDur / 2, ease: 'power1.out' },
            midpoint,
          )
        }

        if (spreadRefs.current[i]) {
          tl.set(spreadRefs.current[i], { autoAlpha: 0 }, midpoint)
        }
        if (spreadRefs.current[i + 1]) {
          tl.set(spreadRefs.current[i + 1], { autoAlpha: 1 }, midpoint)
        }

        tl.set(leaf, { autoAlpha: 0 }, segStart + flipDur + 0.2)

        /* Reveal content on newly visible spread — at 80% of page flip */
        const revealPos = segStart + flipDur * 0.8
        const nextChildren = spreadRefs.current[i + 1]?.querySelectorAll('.passport-spread-inner > *')
        if (nextChildren?.length) {
          tl.to(nextChildren,
            { autoAlpha: 1, y: 0, stagger: 0.15, duration: 2.5, ease: 'power3.out' },
            revealPos,
          )
        }
        /* Stamp-slam — dramatic slam with brightness flash */
        const stamps = spreadRefs.current[i + 1]?.querySelectorAll('.stamp-slam')
        if (stamps?.length) {
          tl.to(stamps, {
            autoAlpha: 1, scale: 1, y: 0, filter: 'brightness(0.95)',
            duration: 0.8, stagger: 0.2, ease: 'back.out(3)',
          }, revealPos + 1.5)
        }
        /* Trigger any in-page animations on this spread */
        const paths = spreadRefs.current[i + 1]?.querySelectorAll('.journey-path')
        if (paths?.length) {
          tl.to(paths, { strokeDashoffset: 0, duration: 4, ease: 'power2.inOut' }, revealPos)
        }
        const sigs = spreadRefs.current[i + 1]?.querySelectorAll('.signature-path')
        if (sigs?.length) {
          tl.to(sigs, { strokeDashoffset: 0, duration: 3, stagger: 0.8, ease: 'power2.out' }, revealPos + 2)
        }
        const animated = spreadRefs.current[i + 1]?.querySelectorAll('.gold-foil, .holographic, [style*="animation"]')
        if (animated?.length) {
          tl.call(() => animated.forEach(el => el.style.animationPlayState = 'running'), null, revealPos)
        }
        revealJourney(spreadRefs.current[i + 1], revealPos)
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
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)' }}
          />
          <div
            className="absolute inset-0 mix-blend-soft-light pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 45% 40%, rgba(255,220,160,0.08) 0%, transparent 70%)' }}
          />

          {/* ── SVG Doodle Art — dotted globes ── */}
          <DottedGlobe top="5%" right="12%" className="w-36 h-36" />
          <DottedGlobe bottom="15%" left="8%" className="w-48 h-48 -rotate-12" />
          <DottedGlobe top="45%" right="5%" className="w-24 h-24 rotate-[25deg] opacity-60" />

          {/* ── SVG Doodle Art — paper airplanes ── */}
          <PaperAirplane top="20%" right="28%" className="w-24 h-24 -rotate-12" />
          <PaperAirplane bottom="40%" left="15%" className="w-20 h-20 rotate-[60deg]" />
          <PaperAirplane bottom="10%" right="30%" className="w-28 h-28 rotate-[-20deg]" />

          {/* ── SVG Doodle Art — curved arrows ── */}
          <CurvedArrow top="13%" left="19%" className="w-16 h-16 -scale-x-100 rotate-[-15deg] opacity-70" />
          <CurvedArrow top="42%" left="18%" className="w-20 h-20 -scale-x-100 rotate-[5deg] opacity-70" />
          <CurvedArrow bottom="22%" right="16%" className="w-20 h-20 -scale-y-100 rotate-[20deg] opacity-70" />
          <CurvedArrow bottom="18%" left="12%" className="w-20 h-20 rotate-[10deg] opacity-70" />
        </div>

        {/* ═══════ FLOATING PASSPORT ═══════ */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ perspective: '2200px' }}
        >
          {/* Shadow wrapper — filter isolated here so it doesn't kill preserve-3d */}
          <div
            style={{
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5)) drop-shadow(0 12px 24px rgba(0,0,0,0.3))',
              pointerEvents: 'auto',
            }}
          >
            <div
              ref={passportRef}
              className={`relative passport-content${isFullscreen ? ' passport-fullscreen' : ''}`}
              style={{
                width: isFullscreen
                  ? (coverOpen ? 'min(92vw, 1200px)' : 'min(42vw, 520px)')
                  : (coverOpen ? 'min(82vw, 880px)' : 'min(34vw, 380px)'),
                height: isFullscreen ? 'min(80vh, 750px)' : 'min(56vh, 500px)',
                transition: 'width 0.5s ease-out, height 0.5s ease-out',
                transformStyle: 'preserve-3d',
                pointerEvents: 'none',
                '--passport-scale': isFullscreen ? '1.35' : '1',
              }}
            >
              {/* Back cover */}
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: 'linear-gradient(145deg, #0a1a30 0%, #0B1D3A 50%, #081629 100%)',
                  transform: 'translateZ(-4px)',
                }}
              />

              <div
                ref={pagesRef}
                className="passport-paper absolute inset-0 rounded-md"
                style={{
                  transformStyle: 'preserve-3d',
                  clipPath: 'inset(5px round 6px)',
                  pointerEvents: 'auto',
                  zIndex: 1,
                }}
              >
                <div
                  className="absolute inset-0 z-[1] pointer-events-none"
                  style={{ backgroundImage: `url(${passportPageTexture})`, backgroundSize: 'cover' }}
                />
                <div className="absolute inset-0 z-[2] bg-passport-paper/92 pointer-events-none" />

                {/* ── Base spread layers (only active one visible) ── */}
                {spreads.map((spreadEl, i) => (
                  <div
                    key={`spread-${i}`}
                    ref={(el) => setSpreadRef(el, i)}
                    className="absolute"
                    style={{
                      inset: 10,
                      zIndex: activeSpread === i ? 15 : 5 + i,
                      overflow: 'hidden',
                      pointerEvents: activeSpread === i ? 'auto' : 'none',
                    }}
                  >
                    <div className="passport-spread-inner w-full h-full relative" style={{ zIndex: 10, pointerEvents: 'auto' }}>
                      {spreadEl}
                    </div>
                  </div>
                ))}

                {/* ── Page leaves (right half, hinge at spine) ── */}
                {Array.from({ length: numPages }, (_, i) => (
                  <div
                    key={`leaf-${i}`}
                    ref={(el) => setPageLeafRef(el, i)}
                    className="absolute top-0 bottom-0 pointer-events-none"
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
                      style={{ inset: 5, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{ backgroundImage: `url(${passportPageTexture})`, backgroundSize: 'cover' }}
                      />
                      <div className="absolute inset-0 bg-passport-paper/95" />
                      <div
                        className="passport-leaf-content absolute top-0 bottom-0"
                        style={{ width: '200%', left: '-100%' }}
                      >
                        {spreads[i]}
                      </div>
                      {/* Shadow overlay — darkens as page lifts during flip */}
                      <div className="page-shadow-front absolute inset-0 bg-gradient-to-l from-black/0 via-black/10 to-black/60 pointer-events-none opacity-0 mix-blend-multiply" />
                      <div
                        className="absolute right-0 top-0 bottom-0 pointer-events-none"
                        style={{ width: 8, background: 'linear-gradient(to left, rgba(0,0,0,0.08) 0%, transparent 100%)' }}
                      />
                    </div>

                    {/* Back face — left half of spread[i+1] */}
                    <div
                      className="absolute overflow-hidden"
                      style={{ inset: 5, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{ backgroundImage: `url(${passportPageTexture})`, backgroundSize: 'cover' }}
                      />
                      <div className="absolute inset-0 bg-passport-paper/95" />
                      <div
                        className="passport-leaf-content absolute top-0 bottom-0"
                        style={{ width: '200%', left: '0' }}
                      >
                        {spreads[i + 1]}
                      </div>
                      {/* Shadow overlay — fades off as back face is revealed */}
                      <div className="page-shadow-back absolute inset-0 bg-gradient-to-r from-black/0 via-black/10 to-black/60 pointer-events-none opacity-0 mix-blend-multiply" />
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
                className="absolute z-40 rounded-md shadow-[8px_0_20px_rgba(0,0,0,0.5)]"
                style={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: coverOpen ? '50%' : '100%',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center',
                  transition: 'width 0.5s ease-out',
                  willChange: 'transform',
                  pointerEvents: coverOpen ? 'none' : 'auto',
                }}
              >
                {/* Exterior face */}
                <div
                  className="cover-exterior-face absolute inset-0 rounded-r-md overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
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
                  className="cover-interior-face absolute inset-0 rounded-l-md overflow-hidden opacity-0"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
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

        {/* ═══════ FLOATING DESK LINKS — Vercel pill-button style ═══════ */}

        {/* Log Journal — top-left */}
        <button
          onClick={() => setModal('diary')}
          style={{ top: '12%', left: '10%' }}
          className="absolute z-10 bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-md text-white/80 hover:text-white transition-all rounded-full px-3.5 py-1.5 flex items-center gap-2 font-sans text-[10px] tracking-wide shadow-xl hover:scale-105 pointer-events-auto"
        >
          <span className="opacity-70">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </span>
          Log Journal
        </button>

        {/* Digital Pen Tool — mid-left, slight rotation */}
        <button
          onClick={() => setModal('pen')}
          style={{ top: '36%', left: '16%' }}
          className="absolute z-10 bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-md text-white/80 hover:text-white transition-all rounded-full px-3.5 py-1.5 flex items-center gap-2 font-sans text-[10px] tracking-wide shadow-xl hover:scale-105 pointer-events-auto -rotate-12"
        >
          <span className="opacity-70">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </span>
          Digital Pen Tool
        </button>

        {/* Connect on LinkedIn — bottom-left */}
        <button
          onClick={() => window.open('https://linkedin.com/in/harshdeep-singh-28a4a6283/', '_blank')}
          style={{ bottom: '25%', left: '20%' }}
          className="absolute z-10 bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-md text-white/80 hover:text-white transition-all rounded-full px-3.5 py-1.5 flex items-center gap-2 font-sans text-[10px] tracking-wide shadow-xl hover:scale-105 pointer-events-auto"
        >
          <span className="opacity-70">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </span>
          Connect on LinkedIn
        </button>

        {/* Career Compass — bottom-right */}
        <button
          onClick={() => setModal('compass')}
          style={{ bottom: '14%', right: '8%' }}
          className="absolute z-10 bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-md text-white/80 hover:text-white transition-all rounded-full px-3.5 py-1.5 flex items-center gap-2 font-sans text-[10px] tracking-wide shadow-xl hover:scale-105 pointer-events-auto"
        >
          <span className="opacity-70">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </span>
          Career Compass
        </button>

        {/* Fullscreen toggle — bottom-right corner */}
        <button
          onClick={toggleFullscreen}
          className="absolute z-10 bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-md text-white/80 hover:text-white transition-all rounded-full px-3.5 py-1.5 flex items-center gap-2 font-sans text-[10px] tracking-wide shadow-xl hover:scale-105 pointer-events-auto"
          style={{ bottom: 24, right: 24 }}
        >
          <span className="opacity-70">
            {isFullscreen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 14h6v6m10-10h-6V4m0 6l7-7M3 21l7-7" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
          </span>
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>

      {/* ═══════ MODALS ═══════ */}
      {modal === 'diary' && <DiaryModal onClose={() => setModal(null)} />}
      {modal === 'pen'   && <PenBoard  onClose={() => setModal(null)} />}
      {modal === 'compass' && <CompassModal onClose={() => setModal(null)} />}
    </div>
  )
}

export default FloatingPassport
