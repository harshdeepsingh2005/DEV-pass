import worldMap from '../assets/maps/world-map.webp'

/**
 * JourneySpread — Large vintage world map with animated SVG travel path.
 * Items fixed: #3 (drawPath anim – CSS), #8 (map/grid opacity), #20 (bezier curves), #22 (institution names).
 */
const milestones = [
  { x: 80,  y: 60,  label: 'B.Tech CS',     institution: 'VIT University', year: '2020' },
  { x: 195, y: 42,  label: 'ML Research',    institution: 'ML Lab',         year: '2021' },
  { x: 310, y: 68,  label: 'AI Systems',     institution: 'Industry',       year: '2022' },
  { x: 420, y: 38,  label: 'RL Engine',      institution: 'CX-Twin',        year: '2023' },
  { x: 540, y: 58,  label: 'Grad Studies',   institution: 'Research',       year: '2024' },
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

const JourneySpread = () => (
  <div className="relative h-full w-full overflow-hidden">
    {/* World map background — higher opacity for visibility */}
    <div className="absolute inset-0">
      <img
        src={worldMap}
        alt=""
        className="w-full h-full object-cover"
        style={{ opacity: 0.22 }}
        aria-hidden="true"
      />
    </div>

    {/* Grid overlay — more visible */}
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
      <span className="font-stamp text-[8px] text-medium-gray tracking-widest">P 06–07</span>
    </div>
    <div className="mx-5 mt-1 h-px bg-gold/15" />

    {/* SVG travel path — centered */}
    <div className="relative z-10 px-4 mt-4 sm:mt-6">
      <svg
        viewBox="0 0 620 140"
        className="w-full h-auto"
        role="img"
        aria-label="Professional journey timeline"
      >
        {/* Fine grid */}
        <defs>
          <pattern id="jGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.12"
              opacity="0.25"
            />
          </pattern>
        </defs>
        <rect width="620" height="140" fill="url(#jGrid)" />

        {/* Faint continent shapes — boosted opacity */}
        <g opacity="0.12" fill="#0B1D3A">
          <ellipse cx="120" cy="55" rx="75" ry="32" />
          <ellipse cx="340" cy="60" rx="65" ry="28" />
          <ellipse cx="520" cy="50" rx="60" ry="30" />
        </g>

        {/* Smooth bezier travel route */}
        <path
          d={buildBezierPath(milestones)}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.65"
          className="journey-path"
        />

        {/* Milestone markers */}
        {milestones.map((m, i) => (
          <g key={i}>
            <circle cx={m.x} cy={m.y} r="10" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.45" />
            <circle cx={m.x} cy={m.y} r="3.5" fill="#D4AF37" />
            <text
              x={m.x}
              y={m.y - 17}
              textAnchor="middle"
              fill="#0B1D3A"
              fontSize="7"
              fontFamily="'Special Elite', monospace"
              fontWeight="bold"
            >
              {m.label}
            </text>
            {/* Institution/org name */}
            <text
              x={m.x}
              y={m.y + 20}
              textAnchor="middle"
              fill="#0B1D3A"
              fontSize="5.5"
              fontFamily="'Special Elite', monospace"
              opacity="0.5"
            >
              {m.institution}
            </text>
            <text
              x={m.x}
              y={m.y + 30}
              textAnchor="middle"
              fill="#B22222"
              fontSize="6.5"
              fontFamily="'Special Elite', monospace"
            >
              {m.year}
            </text>
          </g>
        ))}

        {/* Labels */}
        <text x={milestones[0].x - 15} y="128" fill="#D4AF37" fontSize="5.5" fontFamily="'Special Elite', monospace" opacity="0.45">
          ORIGIN
        </text>
        <text x={milestones[milestones.length - 1].x - 15} y="128" fill="#D4AF37" fontSize="5.5" fontFamily="'Special Elite', monospace" opacity="0.45">
          CURRENT
        </text>
      </svg>
    </div>

    {/* Legend */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-5">
      <span className="flex items-center gap-1.5 font-stamp text-[8px] text-medium-gray/50 tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-gold" /> Milestone
      </span>
      <span className="flex items-center gap-1.5 font-stamp text-[8px] text-medium-gray/50 tracking-widest uppercase">
        <span className="w-4 h-px border-t border-dashed border-gold" /> Route
      </span>
    </div>
  </div>
)

export default JourneySpread
