import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const COLORS = [
  { name: 'Navy',    hex: '#1a3a8a' },
  { name: 'Crimson', hex: '#c0282a' },
  { name: 'Gold',    hex: '#b8900a' },
  { name: 'Black',   hex: '#222222' },
]

export default function PenBoard({ onClose }) {
  const overlayRef = useRef(null)
  const boardRef  = useRef(null)
  const canvasRef = useRef(null)
  const ctxRef    = useRef(null)
  const isDrawing = useRef(false)
  const last      = useRef({ x: 0, y: 0 })

  const [color, setColor] = useState('#1a3a8a')

  /* ── Entrance animation ── */
  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
    gsap.fromTo(boardRef.current,
      { scale: 0.9, y: 28, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' }
    )
  }, [])

  /* ── Init canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width  = W * dpr
    canvas.height = H * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    // Fill cream background
    ctx.fillStyle = '#f0ece4'
    ctx.fillRect(0, 0, W, H)
    // Faint horizontal rules
    ctx.strokeStyle = 'rgba(180,170,155,0.35)'
    ctx.lineWidth = 0.7
    for (let y = 32; y < H; y += 28) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
    }
    ctxRef.current = { ctx, W, H }
  }, [])

  const pos = e => {
    const r = canvasRef.current.getBoundingClientRect()
    if (e.touches) return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top }
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  const startDraw = e => {
    e.preventDefault()
    isDrawing.current = true
    last.current = pos(e)
  }

  const draw = e => {
    if (!isDrawing.current) return
    e.preventDefault()
    const { ctx } = ctxRef.current
    const p = pos(e)
    ctx.beginPath()
    ctx.moveTo(last.current.x, last.current.y)
    ctx.lineTo(p.x, p.y)
    ctx.strokeStyle = color
    ctx.lineWidth = 2.2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.globalCompositeOperation = 'source-over'
    ctx.stroke()
    last.current = p
  }

  const stopDraw = () => { isDrawing.current = false }

  const clear = () => {
    const { ctx, W, H } = ctxRef.current
    ctx.fillStyle = '#f0ece4'
    ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = 'rgba(180,170,155,0.35)'
    ctx.lineWidth = 0.7
    for (let y = 32; y < H; y += 28) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
    }
  }

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onClose })
  }

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.82)',
      }}
      onClick={e => e.target === overlayRef.current && handleClose()}
    >
      <div
        ref={boardRef}
        style={{
          width: 880,
          background: '#f0ece4',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* ── Toolbar — matches Vercel exactly ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '8px 16px',
          background: '#e8e2d8',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}>
          {/* Title — typewriter font, spaced */}
          <span style={{
            fontFamily: 'Special Elite, "Courier New", monospace',
            fontSize: 13,
            letterSpacing: '0.25em',
            color: '#1a1a1a',
            flexShrink: 0,
          }}>DOODLE BOARD</span>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* 4 color swatches */}
          {COLORS.map(c => (
            <button
              key={c.hex}
              onClick={() => setColor(c.hex)}
              title={c.name}
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: c.hex,
                border: color === c.hex
                  ? '2.5px solid rgba(255,255,255,0.9)'
                  : '2.5px solid transparent',
                boxShadow: color === c.hex
                  ? '0 0 0 1.5px rgba(0,0,0,0.5)'
                  : '0 1px 3px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                transform: color === c.hex ? 'scale(1.15)' : 'scale(1)',
                flexShrink: 0,
              }}
            />
          ))}

          {/* CLEAR — red stamp style */}
          <button
            onClick={clear}
            style={{
              background: 'none', border: '1.5px solid #c0282a',
              padding: '3px 10px', borderRadius: 2,
              fontFamily: 'Special Elite, monospace',
              fontSize: 11, letterSpacing: '0.12em',
              color: '#c0282a',
              cursor: 'pointer',
              transition: 'all 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c0282a'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#c0282a' }}
          >CLEAR</button>

          {/* × close */}
          <button
            onClick={handleClose}
            style={{
              width: 28, height: 28,
              background: 'none', border: 'none',
              fontSize: 22, color: 'rgba(60,40,20,0.6)',
              cursor: 'pointer', lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >×</button>
        </div>

        {/* ── Canvas ── */}
        <div style={{ position: 'relative' }}>
          <canvas
            ref={canvasRef}
            style={{
              display: 'block', width: '100%', height: 500,
              cursor: 'crosshair',
            }}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
          />

          {/* Watermark — bottom-right, exactly like Vercel */}
          <p style={{
            position: 'absolute', bottom: 12, right: 16,
            fontFamily: 'Special Elite, monospace',
            fontSize: 9, letterSpacing: '0.2em',
            color: 'rgba(160,145,120,0.4)',
            pointerEvents: 'none', userSelect: 'none',
          }}>PROPERTY OF DEVELOPER</p>
        </div>
      </div>
    </div>
  )
}
