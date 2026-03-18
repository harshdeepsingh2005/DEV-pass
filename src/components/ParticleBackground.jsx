import { useRef, useEffect } from 'react'

const WHITE_COUNT = 50
const GOLD_COUNT  = 8

/**
 * ParticleBackground
 *
 * Canvas-based full-screen background layer rendered behind the passport.
 *
 * Layers (back → front):
 *   1. White glowing micro-dots (ambient atmosphere)
 *   2. Gold shimmer particles
 *
 * Doodle art (arrows, globes, paper planes) is handled by SVG elements
 * in FloatingPassport.jsx — not in this canvas.
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    // ── Resize ───────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    // ── Particles ─────────────────────────────────────
    const makeParticle = (isGold) => ({
      x:          Math.random() * canvas.width,
      y:          Math.random() * canvas.height,
      r:          isGold ? Math.random() * 2.2 + 0.8 : Math.random() * 1.8 + 0.4,
      vx:         (Math.random() - 0.5) * 0.25,
      vy:         (Math.random() - 0.5) * 0.15 - 0.08,
      alpha:      isGold ? Math.random() * 0.35 + 0.15 : Math.random() * 0.45 + 0.08,
      pulse:      Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.008 + 0.003,
      gold:       isGold,
    })

    // ── Wrap helper ────────────────────────────────────
    const wrap = (p, margin = 20) => {
      if (p.x < -margin) p.x = canvas.width  + margin
      if (p.x > canvas.width  + margin) p.x = -margin
      if (p.y < -margin) p.y = canvas.height + margin
      if (p.y > canvas.height + margin) p.y = -margin
    }

    // ── Init ─────────────────────────────────────────
    const init = () => {
      particles = [
        ...Array.from({ length: WHITE_COUNT }, () => makeParticle(false)),
        ...Array.from({ length: GOLD_COUNT },  () => makeParticle(true)),
      ]
    }

    // ── Main draw loop ─────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 1. White ambient particles
      ctx.shadowBlur  = 8
      ctx.shadowColor = 'rgba(255,255,255,0.15)'
      particles.forEach((p) => {
        if (p.gold) return
        p.x += p.vx; p.y += p.vy; p.pulse += p.pulseSpeed
        wrap(p)
        const a = p.alpha + Math.sin(p.pulse) * 0.08
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, a)})`
        ctx.fill()
      })

      // 2. Gold ambient particles
      ctx.shadowBlur  = 10
      ctx.shadowColor = 'rgba(212,175,55,0.25)'
      particles.forEach((p) => {
        if (!p.gold) return
        p.x += p.vx; p.y += p.vy; p.pulse += p.pulseSpeed
        wrap(p)
        const a = p.alpha + Math.sin(p.pulse) * 0.1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,175,55,${Math.max(0, a)})`
        ctx.fill()
      })

      ctx.shadowBlur = 0

      animId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    const onResize = () => { resize(); init() }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[15] pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default ParticleBackground
