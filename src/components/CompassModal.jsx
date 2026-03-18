import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import worldMap from '../assets/maps/world-map.webp'

const MILESTONES = [
  {
    id: 'edu',
    label: 'Education & Foundation',
    sub: 'BASE CAMP',
    desc: 'B.Tech in Computer Science\nFocus: Algorithms & Systems Control',
    x: 20,
    y: 32,
    color: '#1e3a8a',
    ping: '#60a5fa',
    icon: '🎓',
  },
  {
    id: 'research',
    label: 'Research Expeditions',
    sub: 'FIELD WORK',
    desc: 'Exploration into Reinforcement Learning for dynamic environments and geospatial predictive modeling.',
    x: 36,
    y: 60,
    color: '#7a1a1a',
    ping: '#f87171',
    icon: '🔬',
  },
  {
    id: 'eng',
    label: 'Engineering Projects',
    sub: 'EXPEDITIONS',
    desc: 'Building scalable AI systems like CX-Twin and HealthSphere AI. Focus placed on translating predictive models into highly performant web architectures.',
    x: 62,
    y: 28,
    color: '#065f46',
    ping: '#4ade80',
    icon: '⚙️',
  },
  {
    id: 'future',
    label: 'Future Coordinates',
    sub: 'DESTINATION',
    desc: '"To lead the architecture of intelligent autonomous platforms, combining reinforcement learning and full-stack engineering."',
    x: 80,
    y: 55,
    color: '#92400e',
    ping: '#c8a04a',
    icon: '🧭',
  },
]

// Arcs between milestone pairs
const ARCS = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 0, to: 2 },
  { from: 2, to: 3 },
  { from: 1, to: 3 },
]

export default function CompassModal({ onClose }) {
  const overlayRef = useRef(null)
  const modalRef = useRef(null)
  const svgRef = useRef(null)
  const [active, setActive] = useState(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(
      modalRef.current,
      { scale: 0.85, y: 40, opacity: 0 },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.4)',
        onComplete: () => animateArcs(),
      }
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animateArcs = () => {
    const paths = svgRef.current?.querySelectorAll('.arc-path')
    if (!paths) return
    paths.forEach((path, i) => {
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.4,
        delay: 0.15 + i * 0.22,
        ease: 'power2.inOut',
      })
    })

    // Animate dots traveling along arcs
    const dots = svgRef.current?.querySelectorAll('.arc-dot')
    dots?.forEach((dot, i) => {
      const path = paths[i]
      if (!path) return
      gsap.to(dot, {
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
        duration: 1.8,
        delay: 0.5 + i * 0.22,
        ease: 'power1.inOut',
        repeat: -1,
        repeatDelay: 1.5,
      })
      gsap.set(dot, { opacity: 0 })
      gsap.to(dot, { opacity: 1, delay: 0.5 + i * 0.22, duration: 0.3 })
    })

    // Pop in milestones
    const pins = svgRef.current?.querySelectorAll('.pin-group')
    pins?.forEach((pin, i) => {
      gsap.fromTo(
        pin,
        { scale: 0, opacity: 0, transformOrigin: '50% 100%' },
        { scale: 1, opacity: 1, duration: 0.5, delay: 0.6 + i * 0.18, ease: 'back.out(2)' }
      )
    })

    setAnimated(true)
  }

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose })
  }

  // Generate SVG arc path (semicircular, bulging upward)
  const arcPath = (from, to, height = 0.35) => {
    const f = MILESTONES[from]
    const t = MILESTONES[to]
    const x1 = f.x, y1 = f.y, x2 = t.x, y2 = t.y
    const mx = (x1 + x2) / 2
    const my = (y1 + y2) / 2
    const dx = x2 - x1, dy = y2 - y1
    const len = Math.sqrt(dx * dx + dy * dy)
    // Perpendicular upward offset
    const nx = -dy / len, ny = dx / len
    const cx = mx + nx * len * height
    const cy = my + ny * len * height
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
  }

  const activeMilestone = active !== null ? MILESTONES[active] : null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div
        ref={modalRef}
        style={{
          width: 820,
          background: '#0d1117',
          borderRadius: 10,
          boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(200,160,74,0.2)',
          overflow: 'hidden',
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            padding: '14px 20px',
            background: 'linear-gradient(90deg,#0d1117 0%,#12192a 100%)',
            borderBottom: '1px solid rgba(200,160,74,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'Special Elite, monospace',
                fontSize: 16,
                letterSpacing: '0.35em',
                color: '#c8a04a',
              }}
            >
              CAREER TRAJECTORY CHART
            </h2>
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: 9,
                letterSpacing: '0.2em',
                color: 'rgba(200,160,74,0.35)',
                marginTop: 3,
              }}
            >
              INTERACTIVE CAREER MAP • HOVER PINS TO EXPLORE
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(200,160,74,0.25)',
              color: 'rgba(200,160,74,0.7)',
              fontSize: 18,
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>

        {/* ── Map area ── */}
        <div style={{ position: 'relative', height: 420 }}>
          {/* Map photo */}
          <img
            src={worldMap}
            alt="World Map"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.18,
              filter: 'sepia(0.6) hue-rotate(200deg)',
            }}
          />
          {/* Overlay tint */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(13,17,23,0.4) 0%, rgba(13,17,23,0.75) 100%)',
            }}
          />

          {/* Compass rose bottom-right */}
          <div
            style={{
              position: 'absolute',
              right: 20,
              bottom: 20,
              opacity: 0.12,
              fontSize: 72,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            ✦
          </div>

          {/* SVG for arcs + pins */}
          <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <defs>
              {ARCS.map((arc, i) => (
                <marker
                  key={`arrow-${i}`}
                  id={`arrow-${i}`}
                  markerWidth="4"
                  markerHeight="4"
                  refX="2"
                  refY="2"
                  orient="auto"
                >
                  <circle cx="2" cy="2" r="1" fill="rgba(200,160,74,0.8)" />
                </marker>
              ))}
            </defs>

            {/* Arc paths */}
            {ARCS.map((arc, i) => (
              <path
                key={`arc-${i}`}
                className="arc-path"
                d={arcPath(arc.from, arc.to)}
                fill="none"
                stroke="rgba(200,160,74,0.45)"
                strokeWidth="0.4"
                strokeDasharray="1.2 0.8"
                markerEnd={`url(#arrow-${i})`}
              />
            ))}

            {/* Traveling dots along arcs */}
            {ARCS.map((_, i) => (
              <circle key={`dot-${i}`} className="arc-dot" r="0.7" fill="#c8a04a" />
            ))}

            {/* Milestone pins */}
            {MILESTONES.map((m, i) => (
              <g
                key={m.id}
                className="pin-group"
                style={{ cursor: 'pointer' }}
                onClick={() => setActive(active === i ? null : i)}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Ping ring */}
                <circle
                  cx={m.x}
                  cy={m.y}
                  r="3.5"
                  fill="none"
                  stroke={m.ping}
                  strokeWidth="0.3"
                  opacity={animated ? 0.5 : 0}
                  style={{
                    animation: animated
                      ? `compassPulse 2.5s ease-in-out infinite ${i * 0.5}s`
                      : 'none',
                  }}
                />
                {/* Pin fill */}
                <circle
                  cx={m.x}
                  cy={m.y}
                  r="2"
                  fill={active === i ? m.ping : m.color}
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="0.4"
                  style={{ transition: 'fill 0.2s' }}
                />
                {/* Dot center */}
                <circle cx={m.x} cy={m.y} r="0.6" fill="white" opacity="0.9" />
                {/* Label */}
                <text
                  x={m.x + (m.x > 50 ? -3.5 : 3.5)}
                  y={m.y - 3.5}
                  textAnchor={m.x > 50 ? 'end' : 'start'}
                  fontSize="2.8"
                  fill="rgba(200,160,74,0.9)"
                  fontFamily="Special Elite, monospace"
                >
                  {m.label}
                </text>
                <text
                  x={m.x + (m.x > 50 ? -3.5 : 3.5)}
                  y={m.y - 1}
                  textAnchor={m.x > 50 ? 'end' : 'start'}
                  fontSize="1.8"
                  fill="rgba(200,160,74,0.45)"
                  fontFamily="monospace"
                  letterSpacing="0.3"
                >
                  {m.sub}
                </text>
              </g>
            ))}
          </svg>

          {/* ── Detail card ── */}
          {activeMilestone && (
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                maxWidth: 280,
                padding: '14px 16px',
                background: 'rgba(13,17,23,0.92)',
                border: `1px solid ${activeMilestone.ping}55`,
                borderRadius: 6,
                backdropFilter: 'blur(8px)',
                boxShadow: `0 8px 30px rgba(0,0,0,0.5), 0 0 0 1px ${activeMilestone.color}33`,
                animation: 'fadeSlideIn 0.25s ease-out',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{activeMilestone.icon}</span>
                <div>
                  <p
                    style={{
                      fontFamily: 'Special Elite, monospace',
                      fontSize: 11,
                      color: activeMilestone.ping,
                      letterSpacing: '0.1em',
                    }}
                  >
                    {activeMilestone.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 8,
                      letterSpacing: '0.2em',
                      color: 'rgba(200,160,74,0.4)',
                    }}
                  >
                    {activeMilestone.sub}
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  color: 'rgba(245,223,160,0.7)',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                }}
              >
                {activeMilestone.desc}
              </p>
            </div>
          )}

          {/* Grid lines */}
          <svg
            viewBox="0 0 820 420"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * (820 / 7)}
                y1={0}
                x2={i * (820 / 7)}
                y2={420}
                stroke="rgba(200,160,74,0.04)"
                strokeWidth="1"
              />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={i * (420 / 4)}
                x2={820}
                y2={i * (420 / 4)}
                stroke="rgba(200,160,74,0.04)"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>

        {/* ── Bottom legend ── */}
        <div
          style={{
            padding: '10px 20px',
            background: '#0a0d11',
            borderTop: '1px solid rgba(200,160,74,0.12)',
            display: 'flex',
            gap: 20,
            alignItems: 'center',
          }}
        >
          {MILESTONES.map((m) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div
                style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, border: `1px solid ${m.ping}` }}
              />
              <span
                style={{
                  fontFamily: 'Special Elite, monospace',
                  fontSize: 9,
                  letterSpacing: '0.1em',
                  color: 'rgba(200,160,74,0.5)',
                }}
              >
                {m.sub}
              </span>
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(200,160,74,0.2)', letterSpacing: '0.15em' }}>
            ── ── DOTTED ARCS = CAREER TRAJECTORY
          </span>
        </div>
      </div>

      <style>{`
        @keyframes compassPulse {
          0%,100%{r:2.5;opacity:0.4}
          50%{r:4.5;opacity:0.15}
        }
        @keyframes fadeSlideIn {
          from{opacity:0;transform:translateY(8px)}
          to{opacity:1;transform:translateY(0)}
        }
      `}</style>
    </div>
  )
}
