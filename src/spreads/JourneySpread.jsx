import { useRef, useEffect } from 'react'
import worldMap from '../assets/maps/world-map.webp'

/**
 * JourneySpread — Aged-parchment world-map with SVG stroke-draw route,
 * sequential milestone markers with floating info cards,
 * an animated plane icon, and glowing region highlights.
 *
 * Visual enhancements:
 *   • foxing-spots class for aged paper effect
 *   • SVG compass rose in bottom-left with metallic gold
 *   • Moodier warm-toned lighting overlay
 *   • Paper edge wear (vignette)
 *   • Milestone year badges styled as red ink flags
 *
 * GSAP class hooks (driven by FloatingPassport timeline):
 *   .journey-path      → strokeDashoffset draw
 *   .journey-milestone  → staggered scale-in
 *   .journey-region     → staggered glow
 *   .journey-plane      → motionPath along route
 *   .journey-ping       → CSS pulse (unpaused by GSAP)
 */
const milestones = [
  /* ── LEFT PAGE (4 milestones) ── */
  { x: 45,  y: 55,  label: 'B.Tech CSE',       sub: 'Lovely Professional Univ.',  year: '2024', cardBelow: true,  region: { rx: 38, ry: 20 } },
  { x: 130, y: 90,  label: 'ML Exploration',    sub: 'Python & TensorFlow',        year: '2024', cardBelow: false, region: { rx: 35, ry: 18 } },
  { x: 215, y: 48,  label: 'AI Simulation',     sub: 'CX-Twin RL Engine',          year: '2025', cardBelow: true,  region: { rx: 36, ry: 20 } },
  { x: 295, y: 85,  label: 'Applied AI',        sub: 'UHI & HealthSphere',         year: '2025', cardBelow: false, region: { rx: 35, ry: 18 } },
  /* ── RIGHT PAGE (3 milestones) ── */
  { x: 395, y: 52,  label: 'AI Research',        sub: 'RL & Simulation Systems',    year: '2026', cardBelow: true,  region: { rx: 36, ry: 20 } },
  { x: 490, y: 88,  label: 'AI Engineer',        sub: 'Next-Gen AI Systems',        year: '2027', cardBelow: false, region: { rx: 35, ry: 18 } },
  { x: 585, y: 50,  label: 'Masters & Research', sub: 'Advanced AI & Beyond',       year: '2028+',cardBelow: true,  region: { rx: 38, ry: 20 } },
]

/* Decorative board pins scattered across both pages */
const boardPins = [
  /* Left page */
  { x: 90,  y: 30,  color: '#B22222', size: 'lg' },
  { x: 175, y: 130, color: '#1E3A8A', size: 'md' },
  { x: 260, y: 25,  color: '#B22222', size: 'sm' },
  /* Right page */
  { x: 360, y: 125, color: '#1E3A8A', size: 'lg' },
  { x: 450, y: 28,  color: '#B22222', size: 'md' },
  { x: 555, y: 130, color: '#1E3A8A', size: 'sm' },
]

/* Decorative thumb tacks */
const thumbTacks = [
  { x: 30,  y: 135, rot: -8,  color: '#B22222' },
  { x: 310, y: 20,  rot: 12,  color: '#1E3A8A' },
  { x: 530, y: 22,  rot: -5,  color: '#D4AF37' },
  { x: 610, y: 130, rot: 8,   color: '#B22222' },
]

/* ── Photorealistic SVG board pin ── */
const BoardPin = ({ x, y, color, size }) => {
  const r = size === 'lg' ? 5.5 : size === 'md' ? 4.2 : 3
  const id = `pin-${x}-${y}`
  return (
    <g>
      <ellipse cx={x + 1.5} cy={y + r + 3} rx={r * 1.1} ry={r * 0.35} fill="#0B1D3A" opacity="0.18" />
      <line x1={x} y1={y + r * 0.5} x2={x + 0.3} y2={y + r + 4} stroke="#888" strokeWidth="0.7" />
      <line x1={x - 0.15} y1={y + r * 0.5} x2={x + 0.15} y2={y + r + 4} stroke="#bbb" strokeWidth="0.25" />
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity="0.6" />
          <stop offset="30%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor="#111" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
      <path
        d={`M ${x + r * 0.5},${y + r * 0.7} A ${r},${r} 0 0 0 ${x + r * 0.85},${y - r * 0.1}`}
        fill="none" stroke="white" strokeWidth="0.4" opacity="0.2"
      />
      <ellipse cx={x - r * 0.22} cy={y - r * 0.28} rx={r * 0.28} ry={r * 0.22} fill="white" opacity="0.65" />
      <circle cx={x - r * 0.08} cy={y - r * 0.45} r={r * 0.1} fill="white" opacity="0.35" />
    </g>
  )
}

/* ── Photorealistic SVG thumb tack ── */
const ThumbTack = ({ x, y, rot, color }) => {
  const id = `tack-${x}-${y}`
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <ellipse cx="1.5" cy="8" rx="5" ry="1.8" fill="#0B1D3A" opacity="0.16" />
      <defs>
        <linearGradient id={`${id}-spike`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ccc" />
          <stop offset="50%" stopColor="#888" />
          <stop offset="100%" stopColor="#555" />
        </linearGradient>
        <radialGradient id={`${id}-top`} cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="35%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor="#111" stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <polygon points="-0.6,3.5 0.6,3.5 0.15,9.5 -0.15,9.5" fill={`url(#${id}-spike)`} />
      <ellipse cx="0" cy="1" rx="5.5" ry="3.2" fill={`url(#${id}-top)`} />
      <ellipse cx="0" cy="1" rx="5.5" ry="3.2" fill="none" stroke="#000" strokeWidth="0.3" opacity="0.12" />
      <ellipse cx="-1.2" cy="-0.3" rx="2.2" ry="1.1" fill="white" opacity="0.5" />
      <ellipse cx="-0.5" cy="-0.8" rx="0.8" ry="0.4" fill="white" opacity="0.3" />
    </g>
  )
}

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
      {/* ── Foxing spots (aged paper) ── */}
      <div className="absolute inset-0 foxing-spots pointer-events-none z-[1]" />

      {/* World map background */}
      <div className="absolute inset-0">
        <img
          src={worldMap}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.18, filter: 'sepia(0.3) saturate(0.8)' }}
          aria-hidden="true"
        />
      </div>

      {/* ── Aged parchment warm tone ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(180,160,120,0.06) 0%, rgba(160,130,90,0.08) 100%)' }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* ── Paper edge wear (vignette) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(120,100,70,0.12) 100%)',
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
          viewBox="0 0 640 165"
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

          <rect width="640" height="165" fill="url(#jGrid)" />

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

          {/* ── Decorative board pins ── */}
          {boardPins.map((p, i) => (
            <BoardPin key={`bp-${i}`} {...p} />
          ))}

          {/* ── Decorative thumb tacks ── */}
          {thumbTacks.map((t, i) => (
            <ThumbTack key={`tt-${i}`} {...t} />
          ))}

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
                  {/* Year badge — red ink flag style */}
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

                {/* Photorealistic card pin */}
                {(() => {
                  const pinColor = i % 2 === 0 ? '#B22222' : '#1E3A8A'
                  const pid = `cpin-${i}`
                  const px = m.x, py = cardY - 1
                  return (
                    <g>
                      <defs>
                        <radialGradient id={pid} cx="35%" cy="30%" r="65%">
                          <stop offset="0%" stopColor="white" stopOpacity="0.55" />
                          <stop offset="30%" stopColor={pinColor} stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#111" stopOpacity="0.35" />
                        </radialGradient>
                      </defs>
                      <ellipse cx={px + 0.8} cy={py + 4.5} rx="3" ry="1" fill="#0B1D3A" opacity="0.15" />
                      <circle cx={px} cy={py} r="3.5" fill={`url(#${pid})`} />
                      <ellipse cx={px - 0.7} cy={py - 0.9} rx="1.2" ry="0.9" fill="white" opacity="0.55" />
                      <circle cx={px - 0.3} cy={py - 1.4} r="0.4" fill="white" opacity="0.3" />
                    </g>
                  )
                })()}
              </g>
            )
          })}

          {/* ── SVG Compass Rose (bottom-left) ── */}
          <g transform="translate(30, 130)" opacity="0.35">
            {/* Outer ring */}
            <circle cx="0" cy="0" r="16" fill="none" stroke="#D4AF37" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="14" fill="none" stroke="#D4AF37" strokeWidth="0.3" />
            {/* N/S/E/W pointers */}
            <polygon points="0,-13 2,-4 -2,-4" fill="#D4AF37" /> {/* N */}
            <polygon points="0,13 2,4 -2,4" fill="#D4AF37" opacity="0.5" /> {/* S */}
            <polygon points="13,0 4,2 4,-2" fill="#D4AF37" opacity="0.5" /> {/* E */}
            <polygon points="-13,0 -4,2 -4,-2" fill="#D4AF37" opacity="0.5" /> {/* W */}
            {/* Center dot */}
            <circle cx="0" cy="0" r="1.5" fill="#D4AF37" />
            {/* Cardinal labels */}
            <text x="0" y="-17" textAnchor="middle" fill="#D4AF37" fontSize="4" fontFamily="'B612 Mono', monospace" fontWeight="bold">N</text>
            <text x="0" y="21" textAnchor="middle" fill="#D4AF37" fontSize="3.5" fontFamily="'B612 Mono', monospace">S</text>
            <text x="19" y="1.5" textAnchor="middle" fill="#D4AF37" fontSize="3.5" fontFamily="'B612 Mono', monospace">E</text>
            <text x="-19" y="1.5" textAnchor="middle" fill="#D4AF37" fontSize="3.5" fontFamily="'B612 Mono', monospace">W</text>
          </g>

          {/* ── Animated plane icon with contrail ── */}
          {/* Contrail — fading dashed trail that follows same path */}
          <path
            d={routePath}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.6"
            strokeDasharray="2 4"
            opacity="0"
            className="journey-contrail"
          />
          <g className="journey-plane" opacity="0">
            <g transform="translate(-8, -6)">
              <path
                d="M14 5 L10 0 L9 0 L11 5 L3 5 L1 3 L0 3 L1.5 6 L0 9 L1 9 L3 7 L11 7 L9 12 L10 12 L14 7 L16 7 L16 5Z"
                fill="#0B1D3A"
                opacity="0.85"
              />
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
            y="155"
            fill="#D4AF37"
            fontSize="6"
            fontFamily="'Special Elite', monospace"
            opacity="0.4"
          >
            ORIGIN
          </text>
          <text
            x={milestones[milestones.length - 1].x - 18}
            y="155"
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
