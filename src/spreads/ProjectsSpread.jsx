/**
 * ProjectsSpread — Industrial-official visa-sticker project cards.
 *
 * Visual enhancements:
 *   • Line-ruled paper background (blue horizontal lines)
 *   • Serial numbers & structured entries
 *   • Large slanted red APPROVED rubber stamp (ink-feather-heavy)
 *   • COMPLIANT box stamp on right page
 *   • Protective coating sheen overlay
 *   • Holographic strip on each card
 */

const projects = [
  {
    title: 'HealthSphere AI',
    serial: 'VS-2024-0117',
    stamp: 'Approved',
    stampColor: '#B22222',
    stampRot: -5,
    description:
      'AI-driven healthcare decision-support with explainable AI for patient risk prediction and medical triage.',
    tags: ['TensorFlow', 'Flask', 'XAI', 'Healthcare'],
    github: 'https://github.com/harshdeepsingh2005/Health-Sphere',
    demo: null,
  },
  {
    title: 'Urban Heat Island ML',
    serial: 'VS-2023-0084',
    stamp: 'Verified',
    stampColor: '#1E3A8A',
    stampRot: 4,
    description:
      'ML pipeline predicting urban heat intensity from MODIS satellite imagery and XGBoost for temperature anomaly detection.',
    tags: ['Python', 'XGBoost', 'MODIS', 'Geospatial'],
    github: 'https://github.com/harshdeepsingh2005/urban-heat-island-ml',
    demo: null,
  },
  {
    title: 'LOCAL OLLAMA Agent',
    serial: 'VS-2024-0203',
    stamp: 'Approved',
    stampColor: '#B22222',
    stampRot: -3,
    description:
      'Local code-agent powered by Ollama LLMs for autonomous coding, debugging and refactoring tasks.',
    tags: ['Python', 'LLM', 'Ollama', 'Agent'],
    github: 'https://github.com/harshdeepsingh2005/LOCAL_OLLAMA_code-agent',
    demo: null,
  },
  {
    title: 'CIVITAS',
    serial: 'VS-2024-0291',
    stamp: 'Reviewed',
    stampColor: '#1E3A8A',
    stampRot: 6,
    description:
      'Disaster management application for real-time crisis coordination, resource allocation and citizen safety alerts.',
    tags: ['React', 'Django', 'Maps', 'Real-time'],
    github: 'https://github.com/harshdeepsingh2005/CIVITAS-A_disaster_management_application',
    demo: null,
  },
  {
    title: 'CX-Twin Simulation',
    serial: 'VS-2024-0155',
    stamp: 'Approved',
    stampColor: '#B22222',
    stampRot: -6,
    description:
      'Customer experience simulation engine using Deep Q-Network agents with stochastic behavior modeling.',
    tags: ['Python', 'RL', 'DQN', 'Simulation'],
    github: 'https://github.com/harshdeepsingh2005/CX-Twin',
    demo: null,
  },
]

/* ── Visa sticker card ── */
const VisaCard = ({ p }) => (
  <div className="group relative bg-passport-paper-dark/25 border border-gold/15 rounded-sm transition-all duration-300 hover:-translate-y-[1px] hover:shadow-md hover:shadow-passport-navy/12 hover:border-gold/40 overflow-hidden">

    {/* ── Holographic strip ── */}
    <div
      className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 15%, rgba(30,58,138,0.12) 35%, rgba(178,34,34,0.10) 55%, rgba(212,175,55,0.15) 75%, transparent 100%)',
        backgroundSize: '200% 100%',
      }}
    />

    <div className="p-2.5 relative">
      {/* ── Serial number ── */}
      <span className="absolute top-1.5 right-2 font-mrz text-[6px] text-medium-gray/30 tracking-widest select-none">
        {p.serial}
      </span>

      {/* ── Approval stamp overlay ── */}
      <div
        className="absolute ink-feather stamp-slam px-1.5 py-0.5 border rounded-sm font-stamp text-[7px] tracking-wider uppercase opacity-60 pointer-events-none"
        style={{
          borderColor: p.stampColor,
          color: p.stampColor,
          transform: `rotate(${p.stampRot}deg)`,
          top: '18px',
          right: '4px',
        }}
      >
        {p.stamp}
      </div>

      {/* ── Title row ── */}
      <div className="flex items-center gap-1.5 mb-1 pr-14">
        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: p.stampColor }} />
        <h3 className="font-heading text-[11px] sm:text-xs text-passport-navy font-bold leading-tight group-hover:text-ink-blue transition-colors truncate">
          {p.title}
        </h3>
      </div>

      {/* ── Description — collapses on hover to make room for actions ── */}
      <p className="text-dark-gray/60 text-[9px] sm:text-[10px] leading-relaxed mb-1.5 line-clamp-2 group-hover:line-clamp-1 transition-all duration-200">
        {p.description}
      </p>

      {/* ── Mini visa label tags ── */}
      <div className="flex flex-wrap gap-1">
        {p.tags.map((t) => (
          <span
            key={t}
            className="font-mrz text-[6px] text-ink-blue/65 bg-ink-blue/5 border border-ink-blue/15 rounded-[2px] px-1.5 py-[1px] tracking-wider uppercase"
          >
            {t}
          </span>
        ))}
      </div>

      {/* ── Hover actions row ── */}
      <div className="flex items-center gap-3 mt-1.5 max-h-0 overflow-hidden opacity-0 group-hover:max-h-6 group-hover:opacity-100 transition-all duration-300 ease-out">
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-stamp text-[7px] text-passport-navy/70 hover:text-ink-blue tracking-wider uppercase flex items-center gap-1 transition-colors"
        >
          <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          Source
        </a>
        {p.demo ? (
          <a
            href={p.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-stamp text-[7px] text-stamp-red/70 hover:text-stamp-red tracking-wider uppercase flex items-center gap-1 transition-colors"
          >
            <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="currentColor">
              <path d="M14 2.5a.5.5 0 00-.5-.5h-6a.5.5 0 000 1h4.793L2.146 13.146a.5.5 0 00.708.708L13 3.707V8.5a.5.5 0 001 0v-6z" />
            </svg>
            Demo
          </a>
        ) : (
          <span className="font-stamp text-[7px] text-medium-gray/35 tracking-wider uppercase flex items-center gap-1">
            <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="currentColor">
              <path d="M14 2.5a.5.5 0 00-.5-.5h-6a.5.5 0 000 1h4.793L2.146 13.146a.5.5 0 00.708.708L13 3.707V8.5a.5.5 0 001 0v-6z" />
            </svg>
            No Demo
          </span>
        )}
      </div>
    </div>

    {/* ── Bottom border strip ── */}
    <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
  </div>
)

const ProjectsSpread = () => (
  <div className="grid grid-cols-2 h-full relative" style={{ columnGap: 48 }}>

    {/* ── Line-ruled paper background ── */}
    <div className="absolute inset-0 line-ruled pointer-events-none opacity-40" />

    {/* ── Protective coating sheen overlay ── */}
    <div
      className="absolute inset-0 pointer-events-none z-20"
      style={{
        background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.04) 25%, transparent 50%, rgba(255,255,255,0.06) 75%, transparent 100%)',
      }}
    />

    {/* ═══ Left page ═══ */}
    <div className="p-4 sm:p-5 flex flex-col relative z-10">
      <span className="absolute bottom-2 left-3 font-mrz text-[7px] text-medium-gray/20 tracking-widest select-none">P&nbsp;05</span>

      <div className="mb-2.5 pb-1.5 border-b border-gold/20">
        <h2 className="font-heading text-passport-navy text-sm sm:text-base font-bold">
          Project Visas
        </h2>
        <p className="font-stamp text-[7px] text-medium-gray/40 tracking-[0.25em] uppercase mt-0.5">
          Issued Entries &bull; Official Record
        </p>
      </div>

      <div className="space-y-2 flex-1">
        {projects.slice(0, 3).map((p) => (
          <VisaCard key={p.serial} p={p} />
        ))}
      </div>
    </div>

    {/* ═══ Right page ═══ */}
    <div className="p-4 sm:p-5 flex flex-col relative z-10">
      <span className="absolute bottom-2 right-3 font-mrz text-[7px] text-medium-gray/20 tracking-widest select-none">P&nbsp;06</span>

      <div className="mb-2.5 pb-1.5 border-b border-gold/20">
        <span className="font-stamp text-[8px] text-medium-gray/50 tracking-[0.3em] uppercase">
          Continued
        </span>
      </div>

      <div className="space-y-2 flex-1">
        {projects.slice(3).map((p) => (
          <VisaCard key={p.serial} p={p} />
        ))}
      </div>

      {/* ── Large slanted APPROVED rubber stamp ── */}
      <div className="mt-auto pt-2 flex justify-center">
        <div
          className="ink-feather-heavy stamp-slam border-[3px] border-stamp-red/50 rounded-sm px-6 py-2"
          style={{ transform: 'rotate(-8deg)' }}
        >
          <p className="font-stamp text-stamp-red/65 text-sm tracking-[0.4em] uppercase text-center font-bold">
            Approved
          </p>
        </div>
      </div>

      {/* ── COMPLIANT box stamp (top-right area) ── */}
      <div
        className="absolute top-14 right-6 stamp-effect stamp-slam pointer-events-none z-30"
        style={{ transform: 'rotate(4deg)' }}
      >
        <div className="border-2 border-[#1E3A8A]/40 rounded-sm px-3 py-1">
          <p className="font-stamp text-[8px] text-[#1E3A8A]/50 tracking-[0.3em] uppercase font-bold">
            Compliant
          </p>
        </div>
      </div>
    </div>

    {/* ── ENTRY GRANTED large circle stamp (left page, bottom area) ── */}
    <div
      className="absolute stamp-effect stamp-slam pointer-events-none z-20"
      style={{ left: '8%', bottom: '12%', transform: 'rotate(-12deg)', opacity: 0.3 }}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[2px] border-stamp-red/50 flex items-center justify-center">
        <div className="text-center">
          <p className="font-stamp text-[6px] sm:text-[7px] text-stamp-red/60 tracking-wider uppercase font-bold leading-tight">Entry</p>
          <p className="font-stamp text-[7px] sm:text-[8px] text-stamp-red/60 tracking-wider uppercase font-bold leading-tight">Granted</p>
          <div className="w-6 h-px bg-stamp-red/30 mx-auto mt-0.5" />
          <p className="font-mrz text-[5px] text-stamp-red/40 mt-0.5">2024.11.03</p>
        </div>
      </div>
    </div>

    {/* ── PROCESSED rectangular stamp (left page, middle-right) ── */}
    <div
      className="absolute ink-feather stamp-slam pointer-events-none z-20"
      style={{ left: '30%', top: '55%', transform: 'rotate(6deg)', opacity: 0.28 }}
    >
      <div className="border-[2px] border-[#D4AF37]/50 rounded-sm px-3 py-1">
        <p className="font-stamp text-[8px] text-[#D4AF37]/60 tracking-[0.35em] uppercase font-bold">Processed</p>
      </div>
    </div>

    {/* ── VALID circle stamp (right page, middle-left) ── */}
    <div
      className="absolute stamp-effect stamp-slam pointer-events-none z-20"
      style={{ right: '38%', top: '45%', transform: 'rotate(-8deg)', opacity: 0.25 }}
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[1.5px] border-ink-blue/40 flex items-center justify-center">
        <div className="text-center">
          <p className="font-stamp text-[7px] text-ink-blue/50 tracking-wider uppercase font-bold">Valid</p>
          <p className="font-mrz text-[4px] text-ink-blue/35">NO.0492</p>
        </div>
      </div>
    </div>

    {/* ── Date stamp (right page, bottom-left) ── */}
    <div
      className="absolute ink-feather stamp-slam pointer-events-none z-20"
      style={{ right: '25%', bottom: '22%', transform: 'rotate(3deg)', opacity: 0.3 }}
    >
      <div className="border border-medium-gray/30 rounded-sm px-2.5 py-1">
        <p className="font-mrz text-[7px] text-medium-gray/45 tracking-widest text-center">15 NOV 2024</p>
        <div className="w-full h-px bg-medium-gray/20 my-0.5" />
        <p className="font-stamp text-[5px] text-medium-gray/35 tracking-[0.2em] uppercase text-center">Port of Entry</p>
      </div>
    </div>

    {/* ── TRANSIT triangle stamp (left page, upper area) ── */}
    <div
      className="absolute stamp-effect stamp-slam pointer-events-none z-20"
      style={{ left: '35%', top: '15%', transform: 'rotate(15deg)', opacity: 0.22 }}
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[1.5px] border-[#D4AF37]/40 flex items-center justify-center">
        <div className="text-center">
          <p className="font-stamp text-[6px] text-[#D4AF37]/55 tracking-wider uppercase font-bold">Transit</p>
          <p className="font-mrz text-[4px] text-[#D4AF37]/35">DEV-HUB</p>
        </div>
      </div>
    </div>

    {/* ── REGISTERED stamp (right page, upper-right) ── */}
    <div
      className="absolute ink-feather stamp-slam pointer-events-none z-20"
      style={{ right: '5%', top: '38%', transform: 'rotate(-5deg)', opacity: 0.25 }}
    >
      <div className="border-[1.5px] border-stamp-red/35 rounded-sm px-2 py-0.5">
        <p className="font-stamp text-[6px] text-stamp-red/45 tracking-[0.3em] uppercase font-bold">Registered</p>
      </div>
    </div>

    {/* ── Microtext security line ── */}
    <div className="absolute bottom-1 left-0 right-0 overflow-hidden pointer-events-none z-30">
      <p className="font-mrz text-[4px] text-medium-gray/10 tracking-[0.15em] whitespace-nowrap text-center select-none">
        DEV-PASS&bull;PROJECT-REGISTRY&bull;SERIAL-ENTRY&bull;VERIFIED&bull;COMPLIANT&bull;DEV-PASS&bull;PROJECT-REGISTRY&bull;SERIAL-ENTRY&bull;VERIFIED&bull;COMPLIANT&bull;DEV-PASS&bull;PROJECT-REGISTRY
      </p>
    </div>
  </div>
)

export default ProjectsSpread
