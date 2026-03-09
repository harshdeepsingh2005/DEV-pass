import { useRef, useEffect } from 'react'

const PARTICLE_COUNT = 55

/**
 * ParticleBackground — Canvas-based floating white particle system.
 * Small white glowing dots that drift slowly across the screen.
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

    const init = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.15 - 0.08,
        alpha: Math.random() * 0.45 + 0.08,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.008 + 0.003,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        // wrap around edges
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20

        const flickerAlpha = p.alpha + Math.sin(p.pulse) * 0.08

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, flickerAlpha)})`
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(255,255,255,${flickerAlpha * 0.4})`
        ctx.fill()
        ctx.shadowBlur = 0
      })

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
