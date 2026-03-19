import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'

/* ═══════════════════════════════════════════════════════
   CAREER COMPASS — Celestial Navigator
   A premium, interactive career trajectory visualizer
   ═══════════════════════════════════════════════════════ */

/* ── Career Milestone Data ── */
const MILESTONES = [
  {
    id: 'past',
    label: 'Past',
    period: '2022 — 2024',
    role: 'ML Learner • Project Builder',
    institution: 'LPU — B.Tech CSE (AI & ML)',
    description: 'Laid the algorithmic bedrock — mastering data structures, classical ML models, and building early-stage projects that proved concept to execution capability.',
    skills: ['Python', 'C++', 'Scikit-Learn', 'Algorithms', 'Data Structures', 'Linear Algebra'],
    metric: { value: '10+', unit: 'PROJECTS BUILT' },
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.35)',
    angle: 225,
    ring: 1,
    icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
  },
  {
    id: 'present',
    label: 'Present',
    period: '2024 — Now',
    role: 'AI Systems Thinker • RL Simulation Builder',
    institution: 'IEEE Published • 3 Papers • 5+ Systems',
    description: 'Thinking in systems, not scripts. Building RL-based simulations (CX-Twin, AutoPilot), publishing research at IEEE, and architecting intelligent platforms that learn from real-world dynamics.',
    skills: ['Deep Q-Networks', 'PyTorch', 'React', 'Node.js', 'XGBoost', 'MODIS', 'Docker'],
    metric: { value: '3', unit: 'IEEE PAPERS' },
    color: '#10B981',
    glow: 'rgba(16,185,129,0.35)',
    angle: 315,
    ring: 2,
    icon: 'M9.663 17h4.671M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    id: 'next',
    label: 'Next',
    period: '2026 — Near',
    role: 'Portfolio-Level AI Engineer',
    institution: 'Research + Product Hybrid',
    description: 'Bridging the gap between research papers and shipped products. Operating at the intersection of deep technical research and full-stack product engineering — the rare profile that can both write the paper and ship the system.',
    skills: ['System Design', 'TensorFlow', 'AWS', 'MLOps', 'PostgreSQL', 'Full-Stack'],
    metric: { value: 'R+P', unit: 'HYBRID' },
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.35)',
    angle: 45,
    ring: 2,
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    id: 'future',
    label: 'Future',
    period: '2027 →',
    role: 'AI Systems Architect / Founder / Research Engineer',
    institution: 'Final Coordinates',
    description: '"To architect intelligent autonomous platforms at scale — whether leading a research lab, founding an AI-native company, or engineering the infrastructure that makes the next generation of AI systems possible."',
    skills: ['Distributed Systems', 'Leadership', 'Venture Building', 'Research Strategy', 'MLOps'],
    metric: { value: '∞', unit: 'POTENTIAL' },
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.35)',
    angle: 135,
    ring: 3,
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]

/* Connection arcs between milestones */
const CONNECTIONS = [
  { from: 0, to: 1, label: 'Learn → Build' },
  { from: 0, to: 2, label: 'Projects → Products' },
  { from: 1, to: 2, label: 'Systems → Portfolio' },
  { from: 2, to: 3, label: 'Engineer → Architect' },
  { from: 1, to: 3, label: 'Research → Lead' },
]

/* ── Helper: polar to cartesian ── */
const polar = (cx, cy, r, angleDeg) => {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

/* ── Compass Rose SVG ── */
const CompassRose = ({ size = 120 }) => {
  const c = size / 2
  const dirs = [
    { label: 'N', angle: 0 },
    { label: 'E', angle: 90 },
    { label: 'S', angle: 180 },
    { label: 'W', angle: 270 },
  ]
  const minors = [45, 135, 225, 315]

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      {/* Outer decorative rings */}
      <circle cx={c} cy={c} r={c * 0.95} fill="none" stroke="rgba(200,160,74,0.15)" strokeWidth="0.5" />
      <circle cx={c} cy={c} r={c * 0.88} fill="none" stroke="rgba(200,160,74,0.08)" strokeWidth="0.3" strokeDasharray="2 3" />
      <circle cx={c} cy={c} r={c * 0.35} fill="none" stroke="rgba(200,160,74,0.12)" strokeWidth="0.4" />

      {/* Tick marks around outer ring */}
      {Array.from({ length: 72 }).map((_, i) => {
        const a = i * 5
        const isMajor = a % 90 === 0
        const isMid = a % 45 === 0
        const r1 = c * (isMajor ? 0.82 : isMid ? 0.85 : 0.88)
        const r2 = c * 0.92
        const p1 = polar(c, c, r1, a)
        const p2 = polar(c, c, r2, a)
        return (
          <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={`rgba(200,160,74,${isMajor ? 0.5 : isMid ? 0.3 : 0.1})`}
            strokeWidth={isMajor ? 1.2 : 0.4}
          />
        )
      })}

      {/* Main compass star — 4 points */}
      {dirs.map((d, i) => {
        const tipP = polar(c, c, c * 0.72, d.angle)
        const leftP = polar(c, c, c * 0.12, d.angle - 18)
        const rightP = polar(c, c, c * 0.12, d.angle + 18)
        return (
          <polygon key={`star-${i}`}
            points={`${tipP.x},${tipP.y} ${leftP.x},${leftP.y} ${c},${c} ${rightP.x},${rightP.y}`}
            fill={d.angle === 0 ? 'rgba(220,170,60,0.7)' : 'rgba(200,160,74,0.25)'}
            stroke="rgba(200,160,74,0.4)"
            strokeWidth="0.3"
          />
        )
      })}

      {/* Minor compass points — 4 sub-points */}
      {minors.map((angle, i) => {
        const tipP = polar(c, c, c * 0.42, angle)
        const leftP = polar(c, c, c * 0.08, angle - 12)
        const rightP = polar(c, c, c * 0.08, angle + 12)
        return (
          <polygon key={`minor-${i}`}
            points={`${tipP.x},${tipP.y} ${leftP.x},${leftP.y} ${c},${c} ${rightP.x},${rightP.y}`}
            fill="rgba(200,160,74,0.12)"
            stroke="rgba(200,160,74,0.2)"
            strokeWidth="0.2"
          />
        )
      })}

      {/* Center dot */}
      <circle cx={c} cy={c} r={2.5} fill="rgba(220,170,60,0.8)" />
      <circle cx={c} cy={c} r={1} fill="#0d1117" />

      {/* Cardinal labels */}
      {dirs.map((d) => {
        const p = polar(c, c, c * 0.97, d.angle)
        return (
          <text key={d.label} x={p.x} y={p.y + 1}
            textAnchor="middle" dominantBaseline="central"
            fill={d.angle === 0 ? '#dca83c' : 'rgba(200,160,74,0.55)'}
            fontSize={d.angle === 0 ? 10 : 8}
            fontFamily="'Cinzel', 'Georgia', serif"
            fontWeight={d.angle === 0 ? 700 : 400}
          >{d.label}</text>
        )
      })}
    </svg>
  )
}

/* ── Milestone Node ── */
const MilestoneNode = ({ milestone, index, isActive, onClick, cx, cy }) => {
  const { x, y } = polar(cx, cy, [0, 110, 165, 220][milestone.ring], milestone.angle)

  return (
    <g
      className={`milestone-node milestone-node-${index}`}
      style={{ cursor: 'pointer' }}
      onClick={(e) => { e.stopPropagation(); onClick(index) }}
    >
      {/* Transparent hit area — ensures click works on entire node region */}
      <circle cx={x} cy={y} r={35} fill="transparent" style={{ cursor: 'pointer' }} />

      {/* Glow effect */}
      <circle cx={x} cy={y} r={isActive ? 32 : 22} fill={milestone.glow}
        opacity={isActive ? 0.35 : 0.08}
        style={{ transition: 'all 0.4s ease', filter: 'blur(8px)', pointerEvents: 'none' }}
      />

      {/* Ping ring */}
      <circle cx={x} cy={y} r={20}
        fill="none" stroke={milestone.color} strokeWidth="0.8"
        opacity="0.3"
        className={`ping-ring-${index}`}
        style={{ pointerEvents: 'none' }}
      />

      {/* Main node circle */}
      <circle cx={x} cy={y} r={isActive ? 18 : 14}
        fill={isActive ? milestone.color : `${milestone.color}33`}
        stroke={milestone.color}
        strokeWidth={isActive ? 2 : 1.2}
        style={{ transition: 'all 0.3s ease', pointerEvents: 'none' }}
      />

      {/* Icon */}
      <g transform={`translate(${x - 10}, ${y - 10}) scale(0.83)`} style={{ pointerEvents: 'none' }}>
        <path d={milestone.icon} fill="none" stroke={isActive ? '#fff' : milestone.color}
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'stroke 0.3s' }}
        />
      </g>

      {/* Label */}
      <text
        x={x}
        y={y + (milestone.ring >= 2 ? 28 : 26)}
        textAnchor="middle"
        fill={isActive ? '#fff' : 'rgba(200,160,74,0.7)'}
        fontSize="9.5"
        fontFamily="'Cinzel', 'Georgia', serif"
        fontWeight="600"
        letterSpacing="0.12em"
        style={{ transition: 'fill 0.3s', textTransform: 'uppercase' }}
      >{milestone.label}</text>

      {/* Period */}
      <text
        x={x}
        y={y + (milestone.ring >= 2 ? 39 : 37)}
        textAnchor="middle"
        fill="rgba(200,160,74,0.35)"
        fontSize="7"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="0.08em"
      >{milestone.period}</text>
    </g>
  )
}


/* ═══════════════════════════════════════════════════════
   MAIN COMPASS MODAL
   ═══════════════════════════════════════════════════════ */

export default function CompassModal({ onClose }) {
  const overlayRef = useRef(null)
  const modalRef = useRef(null)
  const svgRef = useRef(null)
  const radarRef = useRef(null)
  const [active, setActive] = useState(null)

  const CX = 280  // SVG center X
  const CY = 240  // SVG center Y

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 })
    gsap.fromTo(modalRef.current,
      { scale: 0.88, y: 30, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.3)', onComplete: animateIn }
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animateIn = useCallback(() => {
    // Animate orbital rings in
    const rings = svgRef.current?.querySelectorAll('.orbital-ring')
    rings?.forEach((ring, i) => {
      const len = ring.getTotalLength()
      gsap.set(ring, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(ring, { strokeDashoffset: 0, duration: 1.8, delay: 0.1 + i * 0.2, ease: 'power2.inOut' })
    })

    // Animate connection lines
    const conns = svgRef.current?.querySelectorAll('.connection-line')
    conns?.forEach((line, i) => {
      const len = line.getTotalLength()
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(line, { strokeDashoffset: 0, duration: 1.2, delay: 0.8 + i * 0.15, ease: 'power2.inOut' })
    })

    // Pop in milestone nodes
    const nodes = svgRef.current?.querySelectorAll('[class*="milestone-node-"]')
    nodes?.forEach((node, i) => {
      gsap.fromTo(node,
        { scale: 0, opacity: 0, transformOrigin: '50% 50%' },
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.5 + i * 0.15, ease: 'back.out(2.5)' }
      )
    })

    // Radar sweep animation
    if (radarRef.current) {
      gsap.to(radarRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: 'linear',
        transformOrigin: `${CX}px ${CY}px`,
      })
    }

    // Ping animations
    MILESTONES.forEach((_, i) => {
      const ping = svgRef.current?.querySelector(`.ping-ring-${i}`)
      if (ping) {
        gsap.to(ping, {
          attr: { r: 28 },
          opacity: 0,
          duration: 2,
          repeat: -1,
          repeatDelay: 1 + i * 0.4,
          ease: 'power1.out',
        })
      }
    })
  }, [])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose })
  }

  const activeMilestone = active !== null ? MILESTONES[active] : null

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(10px)',
      }}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div
        ref={modalRef}
        style={{
          width: 920,
          maxWidth: '95vw',
          background: 'linear-gradient(145deg, #0a0e1a 0%, #0d1321 40%, #0b101c 100%)',
          borderRadius: 12,
          boxShadow: `
            0 50px 120px rgba(0,0,0,0.8),
            0 0 0 1px rgba(200,160,74,0.15),
            inset 0 1px 0 rgba(255,255,255,0.03)
          `,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ══ HEADER ══ */}
        <div style={{
          padding: '14px 22px',
          background: 'linear-gradient(90deg, rgba(200,160,74,0.05) 0%, transparent 50%, rgba(200,160,74,0.03) 100%)',
          borderBottom: '1px solid rgba(200,160,74,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Cinzel', 'Georgia', serif",
              fontSize: 15, fontWeight: 600,
              letterSpacing: '0.3em',
              color: '#dca83c',
              margin: 0,
            }}>CAREER COMPASS</h2>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8.5, letterSpacing: '0.18em',
              color: 'rgba(200,160,74,0.3)',
              margin: '3px 0 0',
            }}>INTERACTIVE TRAJECTORY CHART • CLICK NODES TO EXPLORE</p>
          </div>
          <button onClick={handleClose} style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(200,160,74,0.2)',
            color: 'rgba(200,160,74,0.6)',
            fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(200,160,74,0.12)'
              e.currentTarget.style.color = '#dca83c'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.color = 'rgba(200,160,74,0.6)'
            }}
          >×</button>
        </div>

        {/* ══ MAIN CONTENT ══ */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

          {/* ── LEFT: Navigation Chart ── */}
          <div style={{
            flex: activeMilestone ? '0 0 560px' : '1',
            position: 'relative',
            transition: 'flex 0.4s ease',
            overflow: 'hidden',
          }}>
            {/* Background grid */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `
                linear-gradient(rgba(200,160,74,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(200,160,74,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              pointerEvents: 'none',
            }} />

            {/* Radial gradient glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at ${CX}px ${CY}px, rgba(200,160,74,0.04) 0%, transparent 60%)`,
              pointerEvents: 'none',
            }} />

            {/* SVG Chart */}
            <svg ref={svgRef} width="560" height="480" viewBox="0 0 560 480"
              style={{ display: 'block', margin: '0 auto', position: 'relative', zIndex: 2 }}
            >
              <defs>
                {/* Radar sweep gradient */}
                <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(200,160,74,0)" />
                  <stop offset="100%" stopColor="rgba(200,160,74,0.08)" />
                </linearGradient>
                {/* Glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Orbital rings */}
              {[110, 165, 220].map((r, i) => (
                <circle key={`ring-${i}`} className="orbital-ring"
                  cx={CX} cy={CY} r={r}
                  fill="none"
                  stroke={`rgba(200,160,74,${0.08 - i * 0.015})`}
                  strokeWidth="0.6"
                  strokeDasharray={i === 0 ? 'none' : '4 6'}
                />
              ))}

              {/* Radar sweep */}
              <g ref={radarRef} style={{ pointerEvents: 'none' }}>
                <path
                  d={`M ${CX} ${CY} L ${CX} ${CY - 220} A 220 220 0 0 1 ${CX + 220 * Math.sin(Math.PI / 6)} ${CY - 220 * Math.cos(Math.PI / 6)} Z`}
                  fill="url(#radarGrad)"
                  opacity="0.5"
                />
              </g>

              {/* Connection lines */}
              {CONNECTIONS.map((conn, i) => {
                const from = MILESTONES[conn.from]
                const to = MILESTONES[conn.to]
                const p1 = polar(CX, CY, [0, 110, 165, 220][from.ring], from.angle)
                const p2 = polar(CX, CY, [0, 110, 165, 220][to.ring], to.angle)
                const mx = (p1.x + p2.x) / 2
                const my = (p1.y + p2.y) / 2
                // Slight curve toward center
                const cx2 = mx + (CX - mx) * 0.3
                const cy2 = my + (CY - my) * 0.3
                return (
                  <path key={`conn-${i}`} className="connection-line"
                    d={`M ${p1.x} ${p1.y} Q ${cx2} ${cy2} ${p2.x} ${p2.y}`}
                    fill="none"
                    stroke="rgba(200,160,74,0.15)"
                    strokeWidth="0.8"
                    strokeDasharray="3 5"
                  />
                )
              })}

              {/* Compass Rose (centered) */}
              <g transform={`translate(${CX - 60}, ${CY - 60})`} style={{ opacity: 0.6, pointerEvents: 'none' }}>
                <CompassRose size={120} />
              </g>

              {/* Milestone Nodes */}
              {MILESTONES.map((m, i) => (
                <MilestoneNode key={m.id}
                  milestone={m} index={i}
                  isActive={active === i}
                  onClick={setActive}
                  cx={CX} cy={CY}
                />
              ))}
            </svg>

            {/* Click hint — only when no active milestone */}
            {!activeMilestone && (
              <div style={{
                position: 'absolute', bottom: 14, left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8, letterSpacing: '0.2em',
                color: 'rgba(200,160,74,0.2)',
                textTransform: 'uppercase',
                animation: 'fadeInHint 1s ease 2s both',
              }}>── Click a node to explore trajectory ──</div>
            )}
          </div>

          {/* ── RIGHT: Detail Panel ── */}
          <div style={{
            width: activeMilestone ? 360 : 0,
            overflow: 'hidden',
            transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
            borderLeft: activeMilestone ? '1px solid rgba(200,160,74,0.1)' : 'none',
            background: 'rgba(0,0,0,0.2)',
          }}>
            {activeMilestone && (
              <div style={{
                width: 360, padding: '24px 22px',
                height: '100%', overflowY: 'auto',
                animation: 'slideInDetail 0.35s ease-out',
              }}>
                {/* Close detail */}
                <button onClick={() => setActive(null)} style={{
                  float: 'right',
                  background: 'none', border: 'none',
                  color: 'rgba(200,160,74,0.4)', fontSize: 11,
                  cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace",
                  padding: '2px 8px', letterSpacing: '0.1em',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#dca83c'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,160,74,0.4)'}
                >✕ CLOSE</button>

                {/* Colored accent bar */}
                <div style={{
                  width: 40, height: 3, borderRadius: 2,
                  background: activeMilestone.color,
                  marginBottom: 14,
                  boxShadow: `0 0 12px ${activeMilestone.glow}`,
                }} />

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Cinzel', 'Georgia', serif",
                  fontSize: 20, fontWeight: 700,
                  color: '#f0e6d2',
                  margin: '0 0 4px',
                  letterSpacing: '0.05em',
                }}>{activeMilestone.label}</h3>

                {/* Period */}
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: activeMilestone.color,
                  letterSpacing: '0.15em',
                  margin: '0 0 12px',
                }}>{activeMilestone.period}</p>

                {/* Role & Institution */}
                <div style={{
                  padding: '10px 14px',
                  background: 'rgba(200,160,74,0.04)',
                  border: '1px solid rgba(200,160,74,0.08)',
                  borderRadius: 6,
                  marginBottom: 16,
                }}>
                  <p style={{
                    fontFamily: "'Cinzel', 'Georgia', serif",
                    fontSize: 12, color: '#d4c4a0',
                    margin: '0 0 3px', fontWeight: 600,
                  }}>{activeMilestone.role}</p>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, color: 'rgba(200,160,74,0.4)',
                    letterSpacing: '0.1em', margin: 0,
                  }}>{activeMilestone.institution}</p>
                </div>

                {/* Metric callout */}
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 8,
                  marginBottom: 16,
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(200,160,74,0.06)',
                }}>
                  <span style={{
                    fontFamily: "'Cinzel', 'Georgia', serif",
                    fontSize: 32, fontWeight: 700,
                    color: activeMilestone.color,
                    lineHeight: 1,
                  }}>{activeMilestone.metric.value}</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 8.5, letterSpacing: '0.2em',
                    color: 'rgba(200,160,74,0.4)',
                  }}>{activeMilestone.metric.unit}</span>
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: "'EB Garamond', 'Georgia', serif",
                  fontSize: 13.5, lineHeight: 1.7,
                  color: 'rgba(240,230,210,0.65)',
                  margin: '0 0 18px',
                }}>{activeMilestone.description}</p>

                {/* Skills */}
                <div style={{ marginBottom: 12 }}>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 8, letterSpacing: '0.25em',
                    color: 'rgba(200,160,74,0.3)',
                    margin: '0 0 8px',
                    textTransform: 'uppercase',
                  }}>Key Skills</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {activeMilestone.skills.map((skill) => (
                      <span key={skill} style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9, letterSpacing: '0.05em',
                        color: activeMilestone.color,
                        background: `${activeMilestone.color}12`,
                        border: `1px solid ${activeMilestone.color}30`,
                        borderRadius: 3,
                        padding: '3px 8px',
                      }}>{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Decorative end mark */}
                <div style={{
                  marginTop: 20,
                  display: 'flex', alignItems: 'center', gap: 8,
                  opacity: 0.2,
                }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(200,160,74,0.3)' }} />
                  <span style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 10, color: '#c8a04a',
                  }}>✦</span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(200,160,74,0.3)' }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ══ BOTTOM LEGEND BAR ══ */}
        <div style={{
          padding: '10px 22px',
          background: 'rgba(0,0,0,0.3)',
          borderTop: '1px solid rgba(200,160,74,0.08)',
          display: 'flex', alignItems: 'center', gap: 18,
        }}>
          {MILESTONES.map((m, i) => (
            <div key={m.id}
              onClick={() => setActive(active === i ? null : i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                cursor: 'pointer',
                opacity: active === null || active === i ? 1 : 0.4,
                transition: 'opacity 0.3s',
              }}
            >
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: m.color,
                boxShadow: active === i ? `0 0 8px ${m.glow}` : 'none',
                transition: 'box-shadow 0.3s',
              }} />
              <span style={{
                fontFamily: "'Cinzel', 'Georgia', serif",
                fontSize: 9, letterSpacing: '0.1em',
                color: active === i ? '#dca83c' : 'rgba(200,160,74,0.45)',
                fontWeight: active === i ? 600 : 400,
                transition: 'all 0.3s',
                textTransform: 'uppercase',
              }}>{m.label}</span>
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 7.5, color: 'rgba(200,160,74,0.15)',
            letterSpacing: '0.15em',
          }}>── CAREER TRAJECTORY v2.0 ──</span>
        </div>
      </div>

      {/* ══ KEYFRAME ANIMATIONS ══ */}
      <style>{`
        @keyframes fadeInHint {
          from { opacity: 0; transform: translateX(-50%) translateY(6px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes slideInDetail {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
