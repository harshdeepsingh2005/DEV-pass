/**
 * SkillsSpread — Passport visa stamps organised by discipline.
 *
 * Left page:  Programming & Engineering tools.
 * Right page: Machine Learning & AI technologies.
 *
 * Every stamp carries ink texture (stamp-effect), random rotation,
 * opacity jitter, and border weight keyed to proficiency tier.
 * The .stamp-slam class hooks into the GSAP timeline for the
 * scale-bounce entrance animation.
 *
 * Hover shows a tooltip with usage description + experience level.
 */

/* ── Skill data ─────────────────────────────────────────── */

const engineeringSkills = [
  { skill: 'PYTHON',        color: '#1E3A8A', rot: -7,  x: '6%',  y: '14%', tier: 'expert',    op: 0.92, tip: 'Primary language · 5+ yrs' },
  { skill: 'REACT',         color: '#B22222', rot: 5,   x: '52%', y: '10%', tier: 'proficient', op: 0.82, tip: 'Frontend framework · 2 yrs' },
  { skill: 'DJANGO',        color: '#1E3A8A', rot: 12,  x: '8%',  y: '42%', tier: 'proficient', op: 0.85, tip: 'Backend APIs · 3 yrs' },
  { skill: 'JAVASCRIPT',    color: '#B22222', rot: -4,  x: '50%', y: '38%', tier: 'proficient', op: 0.80, tip: 'Web & tooling · 3 yrs' },
  { skill: 'SQL',           color: '#1E3A8A', rot: 8,   x: '30%', y: '65%', tier: 'skilled',    op: 0.75, tip: 'Data queries · 3 yrs' },
  { skill: 'DOCKER',        color: '#B22222', rot: -10, x: '60%', y: '62%', tier: 'skilled',    op: 0.72, tip: 'Containers & CI/CD · 2 yrs' },
  { skill: 'GIT',           color: '#D4AF37', rot: 6,   x: '10%', y: '78%', tier: 'expert',    op: 0.88, tip: 'Version control · 5+ yrs' },
]

const mlSkills = [
  { skill: 'TENSORFLOW',               color: '#B22222', rot: -6,  x: '8%',  y: '12%', tier: 'expert',    op: 0.92, tip: 'Deep learning framework · 4 yrs' },
  { skill: 'PYTORCH',                  color: '#1E3A8A', rot: 9,   x: '55%', y: '8%',  tier: 'expert',    op: 0.90, tip: 'Research & training · 3 yrs' },
  { skill: 'REINFORCEMENT\nLEARNING',  color: '#B22222', rot: -8,  x: '6%',  y: '40%', tier: 'expert',    op: 0.94, tip: 'Core specialisation · 3 yrs' },
  { skill: 'DATA\nENGINEERING',        color: '#1E3A8A', rot: 14,  x: '52%', y: '36%', tier: 'proficient', op: 0.82, tip: 'Pipelines & ETL · 2 yrs' },
  { skill: 'COMPUTER\nVISION',         color: '#B22222', rot: -3,  x: '28%', y: '64%', tier: 'proficient', op: 0.80, tip: 'Image models · 2 yrs' },
  { skill: 'NLP',                      color: '#1E3A8A', rot: 7,   x: '62%', y: '60%', tier: 'skilled',    op: 0.76, tip: 'Text analysis · 1 yr' },
  { skill: 'XGBOOST',                  color: '#D4AF37', rot: -11, x: '12%', y: '80%', tier: 'proficient', op: 0.78, tip: 'Tabular ML · 2 yrs' },
]

/* Border weight & label by tier */
const tierMeta = {
  expert:     { border: 3, label: 'Expert',     labelTrack: '0.35em' },
  proficient: { border: 2, label: 'Proficient',  labelTrack: '0.25em' },
  skilled:    { border: 1.5, label: 'Skilled',   labelTrack: '0.2em'  },
}

/* ── Reusable stamp component ── */
const Stamp = ({ s }) => {
  const meta = tierMeta[s.tier]
  const isLarge = s.tier === 'expert'
  return (
    <div
      className="absolute stamp-effect stamp-slam group cursor-default"
      style={{ left: s.x, top: s.y, transform: `rotate(${s.rot}deg)`, opacity: s.op }}
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

    {/* ═══ Left page header ═══ */}
    <div className="absolute top-3 left-4 z-10" style={{ width: 'calc(50% - 28px)' }}>
      <h2 className="font-heading text-passport-navy/80 text-sm font-bold">Skills Visa</h2>
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
  </div>
)

export default SkillsSpread
