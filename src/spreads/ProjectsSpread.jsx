/**
 * ProjectsSpread — Project visa labels.
 * Each project card looks like a travel visa entry.
 */
const projects = [
  {
    title: 'CX-Twin',
    description:
      'AI-powered customer experience simulation using reinforcement learning and Deep Q-Network agents with stochastic behavior modeling.',
    tags: ['Python', 'RL', 'DQN', 'Simulation'],
  },
  {
    title: 'Urban Heat Island ML',
    description:
      'ML system predicting urban heat island intensity using MODIS satellite imagery and XGBoost for temperature anomaly prediction.',
    tags: ['Python', 'XGBoost', 'MODIS', 'Geospatial'],
  },
  {
    title: 'HealthSphere AI',
    description:
      'AI-driven healthcare decision-support with explainable AI for patient risk prediction and medical triage.',
    tags: ['TensorFlow', 'Flask', 'XAI', 'Healthcare'],
  },
]

const ProjectsSpread = () => (
  <div className="grid grid-cols-2 h-full">
    {/* Left page */}
    <div className="p-4 sm:p-5 border-r border-black/[0.04] flex flex-col">
      <div className="mb-3 pb-2 border-b border-gold/20 flex justify-between items-center">
        <h2 className="font-heading text-passport-navy text-sm sm:text-base font-bold">
          Project Visas
        </h2>
        <span className="font-stamp text-[7px] text-medium-gray tracking-widest">P 04</span>
      </div>

      <div className="space-y-3 flex-1">
        {projects.slice(0, 2).map((p, i) => (
          <div
            key={i}
            className="relative bg-passport-paper-dark/30 border border-gold/15 rounded-sm p-3"
          >
            {/* Visa stamp appearance */}
            <div
              className="absolute -top-1.5 -right-1.5 stamp-effect px-1.5 py-0.5 border border-stamp-red/50 rounded-sm font-stamp text-[6px] text-stamp-red/60 tracking-wider uppercase"
              style={{ transform: `rotate(${-4 + i * 6}deg)` }}
            >
              Approved
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-stamp-red" />
              <h3 className="font-heading text-xs sm:text-sm text-passport-navy font-bold">
                {p.title}
              </h3>
            </div>
            <p className="text-dark-gray/65 text-[10px] leading-relaxed">{p.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {p.tags.map((t, j) => (
                <span
                  key={j}
                  className="font-stamp text-[6px] sm:text-[7px] text-ink-blue/70 border border-ink-blue/20 rounded-sm px-1.5 py-0.5 tracking-wider uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Right page */}
    <div className="p-4 sm:p-5 flex flex-col">
      <div className="mb-3 pb-2 border-b border-gold/20 flex justify-between items-center">
        <span className="font-stamp text-[7px] text-medium-gray tracking-widest">Continued</span>
        <span className="font-stamp text-[7px] text-medium-gray tracking-widest">P 05</span>
      </div>

      <div className="space-y-3">
        {projects.slice(2).map((p, i) => (
          <div
            key={i}
            className="relative bg-passport-paper-dark/30 border border-gold/15 rounded-sm p-3"
          >
            <div
              className="absolute -top-1.5 -right-1.5 stamp-effect px-1.5 py-0.5 border border-ink-blue/50 rounded-sm font-stamp text-[6px] text-ink-blue/60 tracking-wider uppercase"
              style={{ transform: 'rotate(3deg)' }}
            >
              Reviewed
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-stamp-red" />
              <h3 className="font-heading text-xs sm:text-sm text-passport-navy font-bold">
                {p.title}
              </h3>
            </div>
            <p className="text-dark-gray/65 text-[10px] leading-relaxed">{p.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {p.tags.map((t, j) => (
                <span
                  key={j}
                  className="font-stamp text-[6px] sm:text-[7px] text-ink-blue/70 border border-ink-blue/20 rounded-sm px-1.5 py-0.5 tracking-wider uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Large approval stamp */}
      <div className="mt-auto pt-4 flex justify-center">
        <div
          className="stamp-effect border-2 border-stamp-red/40 rounded-sm px-5 py-2"
          style={{ transform: 'rotate(-4deg)' }}
        >
          <p className="font-stamp text-stamp-red/50 text-[8px] tracking-[0.3em] uppercase text-center">
            Reviewed &amp; Approved
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default ProjectsSpread
