import { useRef, useEffect } from 'react'

const WHITE_COUNT = 50
const GOLD_COUNT = 8

/**
 * ParticleBackground — Canvas-based floating particle system.
 * White glowing dots + a few warm gold particles.
 * Items fixed: #24 (batch shadowBlur for perf), #25 (gold particles).
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const makeParticle = (isGold) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: isGold ? Math.random() * 2.2 + 0.8 : Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.15 - 0.08,
      alpha: isGold ? Math.random() * 0.35 + 0.15 : Math.random() * 0.45 + 0.08,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.008 + 0.003,
      gold: isGold,
    })

    const init = () => {
      particles = [
        ...Array.from({ length: WHITE_COUNT }, () => makeParticle(false)),
        ...Array.from({ length: GOLD_COUNT }, () => makeParticle(true)),
      ]
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Batch white particles with single shadowBlur setting
      ctx.shadowBlur = 8
      ctx.shadowColor = 'rgba(255,255,255,0.15)'
      particles.forEach((p) => {
        if (p.gold) return // skip gold in this pass
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20
        const flickerAlpha = p.alpha + Math.sin(p.pulse) * 0.08
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, flickerAlpha)})`
        ctx.fill()
      })

      // Batch gold particles with gold shadowColor
      ctx.shadowBlur = 10
      ctx.shadowColor = 'rgba(212,175,55,0.25)'
      particles.forEach((p) => {
        if (!p.gold) return
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20
        const flickerAlpha = p.alpha + Math.sin(p.pulse) * 0.1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,175,55,${Math.max(0, flickerAlpha)})`
        ctx.fill()
      })

      ctx.shadowBlur = 0

      animId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    const onResize = () => {
      resize()
      init()
    }
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
