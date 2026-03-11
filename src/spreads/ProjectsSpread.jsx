/**
 * ProjectsSpread — Visa-sticker project cards.
 *
 * Each project card mimics a passport visa sticker:
 *   • Serial number (top-right)
 *   • Approval stamp overlay (rotated)
 *   • Faint holographic rainbow strip
 *   • Tech tags styled as mini visa labels
 *   • Hover: card lifts, deeper shadow, reveals GitHub + Demo actions
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
  <div className="group relative bg-passport-paper-dark/25 border border-gold/15 rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-passport-navy/10 hover:border-gold/35 overflow-hidden">

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
        className="absolute -top-0.5 -right-0.5 stamp-effect stamp-slam px-1.5 py-0.5 border rounded-sm font-stamp text-[7px] tracking-wider uppercase opacity-60 pointer-events-none"
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

      {/* ── Description ── */}
      <p className="text-dark-gray/60 text-[9px] sm:text-[10px] leading-relaxed mb-1.5 line-clamp-2">
        {p.description}
      </p>

      {/* ── Mini visa label tags ── */}
      <div className="flex flex-wrap gap-1 mb-1">
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
      <div className="flex items-center gap-2 h-0 overflow-hidden opacity-0 group-hover:h-5 group-hover:opacity-100 transition-all duration-300 ease-out">
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
        {p.demo && (
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
        )}
      </div>
    </div>

    {/* ── Bottom border strip ── */}
    <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
  </div>
)

const ProjectsSpread = () => (
  <div className="grid grid-cols-2 h-full" style={{ columnGap: 48 }}>

    {/* ═══ Left page ═══ */}
    <div className="p-4 sm:p-5 flex flex-col relative">
      <span className="absolute bottom-2 left-3 font-mrz text-[7px] text-medium-gray/20 tracking-widest select-none">P&nbsp;05</span>

      <div className="mb-2.5 pb-1.5 border-b border-gold/20">
        <h2 className="font-heading text-passport-navy text-sm sm:text-base font-bold">
          Project Visas
        </h2>
        <p className="font-stamp text-[7px] text-medium-gray/40 tracking-[0.25em] uppercase mt-0.5">
          Issued Entries
        </p>
      </div>

      <div className="space-y-2 flex-1">
        {projects.slice(0, 3).map((p) => (
          <VisaCard key={p.serial} p={p} />
        ))}
      </div>
    </div>

    {/* ═══ Right page ═══ */}
    <div className="p-4 sm:p-5 flex flex-col relative">
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

      {/* Large approval stamp */}
      <div className="mt-auto pt-2 flex justify-center">
        <div
          className="stamp-effect stamp-slam border-2 border-stamp-red/35 rounded-sm px-5 py-1.5"
          style={{ transform: 'rotate(-4deg)' }}
        >
          <p className="font-stamp text-stamp-red/45 text-[8px] tracking-[0.3em] uppercase text-center">
            Reviewed &amp; Approved
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default ProjectsSpread
