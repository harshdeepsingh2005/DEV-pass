/**
 * SkillsSpread — Scattered visa stamps across both pages.
 * Each stamp represents a skill. Red and blue ink. Naturally scattered.
 * Items fixed: #13 (hover states), #19 (proficiency hierarchy), #29 (page numbers).
 */
const stamps = [
  { skill: 'PYTHON',                color: '#1E3A8A', rot: -8,  x: '5%',  y: '8%',  tier: 'primary' },
  { skill: 'MACHINE\nLEARNING',     color: '#B22222', rot: 6,   x: '54%', y: '5%',  tier: 'primary' },
  { skill: 'REACT',                 color: '#1E3A8A', rot: -3,  x: '28%', y: '28%', tier: 'secondary' },
  { skill: 'DJANGO',                color: '#B22222', rot: 14,  x: '8%',  y: '50%', tier: 'secondary' },
  { skill: 'TENSORFLOW',            color: '#1E3A8A', rot: -5,  x: '58%', y: '30%', tier: 'primary' },
  { skill: 'PYTORCH',               color: '#B22222', rot: 10,  x: '40%', y: '55%', tier: 'secondary' },
  { skill: 'DATA\nENGINEERING',     color: '#1E3A8A', rot: -12, x: '3%',  y: '75%', tier: 'primary' },
  { skill: 'REINFORCEMENT\nLEARNING', color: '#B22222', rot: -7, x: '48%', y: '70%', tier: 'primary' },
]

const circleStamps = [
  { text: 'EXPERT',    sub: 'LEVEL',    color: '#B22222', rot: -15, x: '35%', y: '15%' },
  { text: 'APPROVED',  sub: '',         color: '#1E3A8A', rot: 8,   x: '80%', y: '58%' },
  { text: 'VERIFIED',  sub: 'SKILL',    color: '#D4AF37', rot: -5,  x: '22%', y: '68%' },
  { text: '2024',      sub: 'VALID',    color: '#1E3A8A', rot: 12,  x: '72%', y: '82%' },
]

const SkillsSpread = () => (
  <div className="relative h-full w-full overflow-hidden">
    {/* Page header — left */}
    <div className="absolute top-3 left-4 z-10 flex justify-between items-center" style={{ width: 'calc(50% - 1.5rem)' }}>
      <h2 className="font-heading text-passport-navy/80 text-sm font-bold">Skills Visa</h2>
    </div>
    {/* Page numbers */}
    <span className="absolute bottom-2 left-3 z-10 font-mrz text-[7px] text-medium-gray/20 tracking-widest">P 02</span>
    <span className="absolute bottom-2 right-3 z-10 font-mrz text-[7px] text-medium-gray/20 tracking-widest">P 03</span>
    {/* Header border */}
    <div className="absolute top-8 left-4 right-4 h-px bg-gold/15 z-10" />

    {/* Scattered rectangular stamps — with proficiency-based sizing & hover */}
    {stamps.map((s, i) => {
      const isPrimary = s.tier === 'primary'
      return (
        <div
          key={i}
          className="absolute stamp-effect stamp-slam group cursor-default"
          style={{ left: s.x, top: s.y, transform: `rotate(${s.rot}deg)` }}
        >
          <div
            className={`border-2 rounded-sm transition-transform duration-300 group-hover:scale-110 ${
              isPrimary ? 'px-3 py-2 sm:px-4 sm:py-2.5' : 'px-2 py-1.5 sm:px-2.5 sm:py-1.5'
            }`}
            style={{ borderColor: s.color, color: s.color }}
          >
            <p
              className={`font-stamp tracking-wider font-bold text-center leading-tight whitespace-pre-line ${
                isPrimary ? 'text-[10px] sm:text-xs' : 'text-[8px] sm:text-[9px]'
              }`}
            >
              {s.skill}
            </p>
            <div className="w-full h-px mt-1 opacity-25" style={{ backgroundColor: s.color }} />
            <p className="font-stamp text-[7px] tracking-[0.3em] uppercase text-center mt-0.5 opacity-50">
              {isPrimary ? 'Expert' : 'Proficient'}
            </p>
          </div>
        </div>
      )
    })}

    {/* Circular stamps — with hover */}
    {circleStamps.map((c, i) => (
      <div
        key={`c-${i}`}
        className="absolute stamp-effect stamp-slam group cursor-default"
        style={{ left: c.x, top: c.y, transform: `rotate(${c.rot}deg)` }}
      >
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ borderColor: c.color, color: c.color }}
        >
          <div className="text-center">
            <p className="font-stamp text-[7px] sm:text-[8px] tracking-wider uppercase font-bold leading-tight">
              {c.text}
            </p>
            {c.sub && (
              <p className="font-stamp text-[6px] sm:text-[7px] tracking-wider uppercase opacity-50">
                {c.sub}
              </p>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default SkillsSpread
