import { useRef, useEffect } from 'react'
import worldMap from '../assets/maps/world-map.webp'

/**
 * JourneySpread — Animated world-map with SVG stroke-draw route,
 * sequential milestone markers with floating info cards,
 * an animated plane icon, and glowing region highlights.
 *
 * GSAP class hooks (driven by FloatingPassport timeline):
 *   .journey-path      → strokeDashoffset draw
 *   .journey-milestone  → staggered scale-in
 *   .journey-region     → staggered glow
 *   .journey-plane      → motionPath along route
 *   .journey-ping       → CSS pulse (unpaused by GSAP)
 */
const milestones = [
  { x: 70,  y: 78,  label: 'B.Tech CS',    sub: 'VIT University', year: '2020', cardBelow: false, region: { rx: 40, ry: 22 } },
  { x: 195, y: 52,  label: 'ML Research',   sub: 'ML Lab',         year: '2021', cardBelow: true,  region: { rx: 35, ry: 20 } },
  { x: 310, y: 82,  label: 'AI Systems',    sub: 'Industry',       year: '2022', cardBelow: false, region: { rx: 38, ry: 22 } },
  { x: 425, y: 48,  label: 'RL Engine',     sub: 'CX-Twin',        year: '2023', cardBelow: true,  region: { rx: 35, ry: 20 } },
  { x: 550, y: 72,  label: 'Grad Studies',  sub: 'Research',       year: '2024', cardBelow: false, region: { rx: 40, ry: 22 } },
]

/** Build a smooth bezier path through milestone points */
const buildBezierPath = (pts) => {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x},${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const dx = (curr.x - prev.x) * 0.4
    d += ` C ${prev.x + dx},${prev.y} ${curr.x - dx},${curr.y} ${curr.x},${curr.y}`
  }
  return d
}

const routePath = buildBezierPath(milestones)

const JourneySpread = () => {
  const pathRef = useRef(null)

  /* Compute exact path length for precise stroke-draw animation */
  useEffect(() => {
    const el = pathRef.current
    if (!el) return
    const len = el.getTotalLength()
    el.style.strokeDasharray = len
    el.style.strokeDashoffset = len
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* World map background */}
      <div className="absolute inset-0">
        <img
          src={worldMap}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.22 }}
          aria-hidden="true"
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-5 pt-4 flex justify-between items-center">
        <h2 className="font-heading text-passport-navy text-sm sm:text-base font-bold">
          Journey Map
        </h2>
        <span className="font-mrz text-[8px] text-medium-gray tracking-widest">P 06–07</span>
      </div>
      <div className="mx-5 mt-1 h-px bg-gold/15" />

      {/* ════ SVG Journey Map ════ */}
      <div className="relative z-10 px-4 mt-3 sm:mt-5">
        <svg
          viewBox="0 0 620 160"
          className="w-full h-auto"
          role="img"
          aria-label="Professional journey timeline"
        >
          <defs>
            <pattern id="jGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D4AF37" strokeWidth="0.12" opacity="0.25" />
            </pattern>
            {/* Glow filter for region highlights */}
            <filter id="regionGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Drop shadow for info cards */}
            <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#0B1D3A" floodOpacity="0.12" />
            </filter>
          </defs>

          <rect width="620" height="160" fill="url(#jGrid)" />

          {/* Faint continent shapes */}
          <g opacity="0.10" fill="#0B1D3A">
            <ellipse cx="120" cy="70" rx="75" ry="35" />
            <ellipse cx="340" cy="72" rx="65" ry="30" />
            <ellipse cx="520" cy="65" rx="60" ry="32" />
          </g>

          {/* ── Region highlights (glow under each milestone) ── */}
          {milestones.map((m, i) => (
            <ellipse
              key={`region-${i}`}
              className="journey-region"
              cx={m.x}
              cy={m.y}
              rx={m.region.rx}
              ry={m.region.ry}
              fill="#D4AF37"
              opacity="0"
              filter="url(#regionGlow)"
              style={{ transformOrigin: `${m.x}px ${m.y}px` }}
            />
          ))}

          {/* ── Dashed trail (full route, always faintly visible) ── */}
          <path
            d={routePath}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            opacity="0.2"
          />

          {/* ── Animated solid route (stroke-draw on scroll) ── */}
          <path
            ref={pathRef}
            d={routePath}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.7"
            className="journey-path"
          />

          {/* ── Milestone markers + floating info cards ── */}
          {milestones.map((m, i) => {
            const above = !m.cardBelow
            const cardY = above ? m.y - 55 : m.y + 20
            const lineY1 = above ? m.y - 7 : m.y + 7
            const lineY2 = above ? m.y - 19 : m.y + 20

            return (
              <g
                key={`ms-${i}`}
                className="journey-milestone"
                style={{ transformOrigin: `${m.x}px ${m.y}px` }}
              >
                {/* Ping ring (CSS pulse, unpaused by GSAP) */}
                <circle
                  cx={m.x}
                  cy={m.y}
                  r="12"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="0.6"
                  opacity="0.3"
                  className="journey-ping"
                  style={{ transformOrigin: `${m.x}px ${m.y}px` }}
                />
                {/* Outer ring */}
                <circle cx={m.x} cy={m.y} r="6" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
                {/* Core dot */}
                <circle cx={m.x} cy={m.y} r="3" fill="#D4AF37" />
                {/* Inner highlight */}
                <circle cx={m.x} cy={m.y} r="1.2" fill="#F5F1E8" opacity="0.7" />

                {/* Connector line from card to dot */}
                <line
                  x1={m.x}
                  y1={lineY1}
                  x2={m.x}
                  y2={lineY2}
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                  opacity="0.35"
                  strokeDasharray="2 1.5"
                />

                {/* ── Floating info card ── */}
                <g filter="url(#cardShadow)">
                  {/* Card background */}
                  <rect
                    x={m.x - 42}
                    y={cardY}
                    width="84"
                    height="36"
                    rx="3"
                    fill="#F5F1E8"
                    stroke="#D4AF37"
                    strokeWidth="0.5"
                    opacity="0.95"
                  />
                  {/* Top accent strip */}
                  <rect
                    x={m.x - 42}
                    y={cardY}
                    width="84"
                    height="4"
                    rx="3"
                    fill="#D4AF37"
                    opacity="0.25"
                  />
                  {/* Year badge */}
                  <rect
                    x={m.x + 20}
                    y={cardY + 2}
                    width="18"
                    height="9"
                    rx="1.5"
                    fill="#B22222"
                    opacity="0.85"
                  />
                  <text
                    x={m.x + 29}
                    y={cardY + 9}
                    textAnchor="middle"
                    fill="#F5F1E8"
                    fontSize="5.5"
                    fontFamily="'B612 Mono', monospace"
                    fontWeight="bold"
                  >
                    {m.year}
                  </text>
                  {/* Title */}
                  <text
                    x={m.x - 36}
                    y={cardY + 16}
                    fill="#0B1D3A"
                    fontSize="7.5"
                    fontFamily="'Special Elite', monospace"
                    fontWeight="bold"
                  >
                    {m.label}
                  </text>
                  {/* Institution / subtitle */}
                  <text
                    x={m.x - 36}
                    y={cardY + 28}
                    fill="#666666"
                    fontSize="6"
                    fontFamily="'Special Elite', monospace"
                  >
                    {m.sub}
                  </text>
                </g>
              </g>
            )
          })}

          {/* ── Animated plane icon ── */}
          <g className="journey-plane" opacity="0">
            <g transform="translate(-8, -6)">
              {/* Airplane silhouette */}
              <path
                d="M14 5 L10 0 L9 0 L11 5 L3 5 L1 3 L0 3 L1.5 6 L0 9 L1 9 L3 7 L11 7 L9 12 L10 12 L14 7 L16 7 L16 5Z"
                fill="#0B1D3A"
                opacity="0.85"
              />
              {/* Fuselage gold accent */}
              <path
                d="M14 5.5 L11 5.5 L11 6.5 L14 6.5Z"
                fill="#D4AF37"
                opacity="0.5"
              />
            </g>
          </g>

          {/* Origin / Current labels */}
          <text
            x={milestones[0].x - 12}
            y="150"
            fill="#D4AF37"
            fontSize="6"
            fontFamily="'Special Elite', monospace"
            opacity="0.4"
          >
            ORIGIN
          </text>
          <text
            x={milestones[milestones.length - 1].x - 18}
            y="150"
            fill="#D4AF37"
            fontSize="6"
            fontFamily="'Special Elite', monospace"
            opacity="0.4"
          >
            CURRENT
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-5">
        <span className="flex items-center gap-1.5 font-stamp text-[7px] text-medium-gray/50 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" /> Milestone
        </span>
        <span className="flex items-center gap-1.5 font-stamp text-[7px] text-medium-gray/50 tracking-widest uppercase">
          <span className="w-4 h-px border-t border-dashed border-gold" /> Route
        </span>
        <span className="flex items-center gap-1.5 font-stamp text-[7px] text-medium-gray/50 tracking-widest uppercase">
          <svg className="w-3 h-2.5" viewBox="0 0 16 12">
            <path
              d="M14 5 L10 0 L9 0 L11 5 L3 5 L1 3 L0 3 L1.5 6 L0 9 L1 9 L3 7 L11 7 L9 12 L10 12 L14 7 L16 7 L16 5Z"
              fill="currentColor"
            />
          </svg>
          Current
        </span>
      </div>
    </div>
  )
}

export default JourneySpread
