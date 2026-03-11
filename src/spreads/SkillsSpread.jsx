/**
 * SkillsSpread — "SKILLS VISAS" stamp spread.
 *
 * Focus: Ink physics, depth of field, and reflective materials.
 *
 * Security paper background with faint embedded neural-network watermark.
 * Stamps overlap slightly with ink feathering and uneven press effects.
 * Holographic iridescent security sticker in top-right corner.
 * Shallow depth-of-field edge blur effect.
 *
 * The .stamp-slam class hooks into GSAP timeline for scale-bounce entrance.
 * The .holographic class hooks into GSAP to unpause the hue-shift animation.
 */

/* ── Skill data ─────────────────────────────────────────── */

const engineeringSkills = [
  { skill: 'PYTHON',        color: '#1E3A8A', rot: -7,  x: '6%',  y: '14%', tier: 'expert',    op: 0.92, tip: 'Primary language · 5+ yrs', feather: true },
  { skill: 'REACT',         color: '#B22222', rot: 5,   x: '52%', y: '10%', tier: 'proficient', op: 0.82, tip: 'Frontend framework · 2 yrs', feather: false },
  { skill: 'DJANGO',        color: '#0B1D3A', rot: 12,  x: '8%',  y: '42%', tier: 'proficient', op: 0.85, tip: 'Backend APIs · 3 yrs', feather: false },
  { skill: 'JAVASCRIPT',    color: '#B22222', rot: -4,  x: '50%', y: '38%', tier: 'proficient', op: 0.80, tip: 'Web & tooling · 3 yrs', feather: true },
  { skill: 'SQL',           color: '#1E3A8A', rot: 8,   x: '30%', y: '65%', tier: 'skilled',    op: 0.75, tip: 'Data queries · 3 yrs', feather: false },
  { skill: 'DOCKER',        color: '#B22222', rot: -10, x: '60%', y: '62%', tier: 'skilled',    op: 0.72, tip: 'Containers & CI/CD · 2 yrs', feather: false },
  { skill: 'GIT',           color: '#D4AF37', rot: 6,   x: '10%', y: '78%', tier: 'expert',    op: 0.88, tip: 'Version control · 5+ yrs', feather: false },
]

const mlSkills = [
  { skill: 'TENSORFLOW',               color: '#B22222', rot: -6,  x: '8%',  y: '12%', tier: 'expert',    op: 0.92, tip: 'Deep learning framework · 4 yrs', feather: true },
  { skill: 'PYTORCH',                  color: '#1E3A8A', rot: 9,   x: '55%', y: '8%',  tier: 'expert',    op: 0.90, tip: 'Research & training · 3 yrs', feather: false },
  { skill: 'REINFORCEMENT\nLEARNING',  color: '#B22222', rot: -8,  x: '6%',  y: '40%', tier: 'expert',    op: 0.94, tip: 'Core specialisation · 3 yrs', feather: true },
  { skill: 'DATA\nENGINEERING',        color: '#1E3A8A', rot: 14,  x: '52%', y: '36%', tier: 'proficient', op: 0.82, tip: 'Pipelines & ETL · 2 yrs', feather: false },
  { skill: 'COMPUTER\nVISION',         color: '#B22222', rot: -3,  x: '28%', y: '64%', tier: 'proficient', op: 0.80, tip: 'Image models · 2 yrs', feather: false },
  { skill: 'NLP',                      color: '#1E3A8A', rot: 7,   x: '62%', y: '60%', tier: 'skilled',    op: 0.76, tip: 'Text analysis · 1 yr', feather: false },
  { skill: 'XGBOOST',                  color: '#D4AF37', rot: -11, x: '12%', y: '80%', tier: 'proficient', op: 0.78, tip: 'Tabular ML · 2 yrs', feather: false },
]

/* Border weight & label by tier */
const tierMeta = {
  expert:     { border: 3, label: 'Expert',     labelTrack: '0.35em' },
  proficient: { border: 2, label: 'Proficient',  labelTrack: '0.25em' },
  skilled:    { border: 1.5, label: 'Skilled',   labelTrack: '0.2em'  },
}

/* ── Reusable stamp component with ink physics ── */
const Stamp = ({ s }) => {
  const meta = tierMeta[s.tier]
  const isLarge = s.tier === 'expert'
  /* Simulate uneven press — some stamps are slightly faded on one side */
  const unevenStyle = s.feather
    ? { maskImage: 'linear-gradient(105deg, rgba(0,0,0,1) 30%, rgba(0,0,0,0.75) 100%)' }
    : {}
  return (
    <div
      className={`absolute stamp-slam group cursor-default ${s.feather ? 'ink-feather' : 'stamp-effect'}`}
      style={{ left: s.x, top: s.y, transform: `rotate(${s.rot}deg)`, opacity: s.op, ...unevenStyle }}
    >
      <div
        className={`rounded-sm transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 ${
          isLarge ? 'px-3 py-2 sm:px-4 sm:py-2.5' : 'px-2 py-1.5 sm:px-2.5 sm:py-1.5'
        }`}
        style={{ borderWidth: meta.border, borderStyle: 'solid', borderColor: s.color, color: s.color }}
      >
        <p
          className={`font-stamp tracking-wider font-bold text-center leading-tight whitespace-pre-line ${
            isLarge ? 'text-[10px] sm:text-xs' : 'text-[8px] sm:text-[9px]'
          }`}
        >
          {s.skill}
        </p>
        <div className="w-full h-px mt-1 opacity-25" style={{ backgroundColor: s.color }} />
        <p
          className="font-stamp text-[6px] tracking-wider uppercase text-center mt-0.5 opacity-50"
          style={{ letterSpacing: meta.labelTrack }}
        >
          {meta.label}
        </p>
      </div>

      {/* ── Tooltip ── */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
        <div className="bg-passport-navy/90 text-passport-paper text-[8px] font-body px-2.5 py-1 rounded shadow-lg">
          {s.tip}
        </div>
      </div>
    </div>
  )
}

/* ── Decorative circle accent stamps ── */
const accents = [
  { text: 'DEV',     sub: '2024',  color: '#B22222', rot: -14, page: 'left',  x: '38%', y: '18%' },
  { text: 'APPROVED', sub: '',     color: '#1E3A8A', rot: 8,   page: 'right', x: '40%', y: '82%' },
  { text: 'VERIFIED', sub: 'SKILL', color: '#D4AF37', rot: -5, page: 'left',  x: '62%', y: '82%' },
]

/* ── Main spread ── */
const SkillsSpread = () => (
  <div className="relative h-full w-full overflow-hidden">

    {/* ── Neural network watermark (faint, embedded) ── */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="nnWatermark" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2" fill="rgba(30,58,138,0.03)" />
          <circle cx="40" cy="10" r="2" fill="rgba(30,58,138,0.03)" />
          <circle cx="70" cy="10" r="2" fill="rgba(30,58,138,0.03)" />
          <circle cx="25" cy="40" r="2" fill="rgba(30,58,138,0.03)" />
          <circle cx="55" cy="40" r="2" fill="rgba(30,58,138,0.03)" />
          <circle cx="40" cy="70" r="2" fill="rgba(30,58,138,0.03)" />
          <line x1="10" y1="10" x2="25" y2="40" stroke="rgba(30,58,138,0.02)" strokeWidth="0.5" />
          <line x1="40" y1="10" x2="25" y2="40" stroke="rgba(30,58,138,0.02)" strokeWidth="0.5" />
          <line x1="40" y1="10" x2="55" y2="40" stroke="rgba(30,58,138,0.02)" strokeWidth="0.5" />
          <line x1="70" y1="10" x2="55" y2="40" stroke="rgba(30,58,138,0.02)" strokeWidth="0.5" />
          <line x1="25" y1="40" x2="40" y2="70" stroke="rgba(30,58,138,0.02)" strokeWidth="0.5" />
          <line x1="55" y1="40" x2="40" y2="70" stroke="rgba(30,58,138,0.02)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#nnWatermark)" />
    </svg>

    {/* ═══ Left page header ═══ */}
    <div className="absolute top-3 left-4 z-10" style={{ width: 'calc(50% - 28px)' }}>
      <h2 className="font-heading text-passport-navy/80 text-sm font-bold">Skills Visas</h2>
      <p className="font-stamp text-[7px] text-medium-gray/40 tracking-[0.3em] uppercase mt-0.5">
        Programming &amp; Engineering
      </p>
    </div>

    {/* ═══ Right page header ═══ */}
    <div className="absolute top-3 z-10" style={{ left: 'calc(50% + 28px)' }}>
      <p className="font-stamp text-[7px] text-medium-gray/40 tracking-[0.3em] uppercase">
        Machine Learning &amp; AI
      </p>
    </div>

    {/* Header rule */}
    <div className="absolute top-10 left-4 right-4 h-px bg-gold/15 z-10" />

    {/* Page numbers */}
    <span className="absolute bottom-2 left-3 z-10 font-mrz text-[7px] text-medium-gray/20 tracking-widest select-none">P&nbsp;03</span>
    <span className="absolute bottom-2 right-3 z-10 font-mrz text-[7px] text-medium-gray/20 tracking-widest select-none">P&nbsp;04</span>

    {/* ═══ Holographic security sticker (top-right corner) ═══ */}
    <div
      className="absolute top-3 z-20 holographic gold-foil rounded-[3px] shadow-sm"
      style={{ right: 'calc(4px)', width: '30px', height: '30px' }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/80">
          <path fill="currentColor" d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
        </svg>
      </div>
    </div>

    {/* ═══ Left page stamps — Engineering ═══ */}
    <div className="absolute top-12 left-0 bottom-6" style={{ width: 'calc(50% - 24px)' }}>
      <div className="relative w-full h-full">
        {engineeringSkills.map((s, i) => <Stamp key={`e-${i}`} s={s} />)}
      </div>
    </div>

    {/* ═══ Right page stamps — ML ═══ */}
    <div className="absolute top-12 bottom-6" style={{ left: 'calc(50% + 24px)', width: 'calc(50% - 24px)' }}>
      <div className="relative w-full h-full">
        {mlSkills.map((s, i) => <Stamp key={`m-${i}`} s={s} />)}
      </div>
    </div>

    {/* ═══ Decorative circle accents ═══ */}
    {accents.map((c, i) => {
      const baseLeft = c.page === 'left' ? 0 : 50
      const pxLeft = `calc(${baseLeft}% + ${c.page === 'right' ? '24px' : '0px'})`
      return (
        <div
          key={`a-${i}`}
          className="absolute stamp-effect stamp-slam pointer-events-none"
          style={{
            left: `calc(${pxLeft} + ${c.x})`,
            top: c.y,
            transform: `rotate(${c.rot}deg)`,
            opacity: 0.35,
          }}
        >
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[1.5px] flex items-center justify-center"
            style={{ borderColor: c.color, color: c.color }}
          >
            <div className="text-center">
              <p className="font-stamp text-[7px] tracking-wider uppercase font-bold leading-tight">{c.text}</p>
              {c.sub && <p className="font-stamp text-[5px] tracking-wider uppercase opacity-60">{c.sub}</p>}
            </div>
          </div>
        </div>
      )
    })}

    {/* ═══ Shallow depth-of-field edge blur ═══ */}
    <div
      className="absolute inset-0 pointer-events-none z-30"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(245,241,232,0.2) 100%)',
      }}
    />
  </div>
)

export default SkillsSpread
