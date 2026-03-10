/**
 * ProjectsSpread — Project visa labels.
 * Each project card looks like a travel visa entry.
 * Items fixed: #10 (add projects), #13 (hover), #29 (page numbers).
 */
const projects = [
  {
    title: 'CX-Twin',
    description:
      'AI-powered customer experience simulation using reinforcement learning and Deep Q-Network agents with stochastic behavior modeling.',
    tags: ['Python', 'RL', 'DQN', 'Simulation'],
    link: 'https://github.com/harshdeepsingh2005/CX-Twin',
  },
  {
    title: 'Urban Heat Island ML',
    description:
      'ML system predicting urban heat island intensity using MODIS satellite imagery and XGBoost for temperature anomaly prediction.',
    tags: ['Python', 'XGBoost', 'MODIS', 'Geospatial'],
    link: 'https://github.com/harshdeepsingh2005',
  },
  {
    title: 'HealthSphere AI',
    description:
      'AI-driven healthcare decision-support with explainable AI for patient risk prediction and medical triage.',
    tags: ['TensorFlow', 'Flask', 'XAI', 'Healthcare'],
    link: 'https://github.com/harshdeepsingh2005',
  },
  {
    title: 'RL Gym Environment',
    description:
      'Custom OpenAI Gym environment for multi-agent reinforcement learning with configurable reward shaping and observation spaces.',
    tags: ['Python', 'Gym', 'RL', 'Multi-Agent'],
    link: 'https://github.com/harshdeepsingh2005',
  },
  {
    title: 'ML Pipeline Toolkit',
    description:
      'End-to-end automated ML pipeline with feature engineering, hyperparameter tuning, and model versioning for production deployment.',
    tags: ['Scikit-learn', 'MLflow', 'Docker', 'CI/CD'],
    link: 'https://github.com/harshdeepsingh2005',
  },
]

const ProjectsSpread = () => (
  <div className="grid grid-cols-2 h-full">
    {/* Left page */}
    <div className="p-4 sm:p-5 border-r border-black/[0.04] flex flex-col relative">
      <span className="absolute bottom-2 left-3 font-mrz text-[7px] text-medium-gray/20 tracking-widest">P 04</span>

      <div className="mb-3 pb-2 border-b border-gold/20 flex justify-between items-center">
        <h2 className="font-heading text-passport-navy text-sm sm:text-base font-bold">
          Project Visas
        </h2>
      </div>

      <div className="space-y-2.5 flex-1">
        {projects.slice(0, 3).map((p, i) => (
          <a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block bg-passport-paper-dark/30 border border-gold/15 rounded-sm p-2.5 transition-all duration-300 hover:border-gold/30 hover:shadow-sm"
          >
            {/* Visa stamp appearance */}
            <div
              className="absolute -top-1.5 -right-1.5 stamp-effect px-1.5 py-0.5 border border-stamp-red/50 rounded-sm font-stamp text-[6px] text-stamp-red/60 tracking-wider uppercase"
              style={{ transform: `rotate(${-4 + i * 6}deg)` }}
            >
              Approved
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-stamp-red" />
              <h3 className="font-heading text-xs sm:text-sm text-passport-navy font-bold group-hover:text-ink-blue transition-colors">
                {p.title}
              </h3>
            </div>
            <p className="text-dark-gray/65 text-[9px] leading-relaxed">{p.description}</p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {p.tags.map((t, j) => (
                <span
                  key={j}
                  className="font-stamp text-[6px] sm:text-[7px] text-ink-blue/70 border border-ink-blue/20 rounded-sm px-1.5 py-0.5 tracking-wider uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>

    {/* Right page */}
    <div className="p-4 sm:p-5 flex flex-col relative">
      <span className="absolute bottom-2 right-3 font-mrz text-[7px] text-medium-gray/20 tracking-widest">P 05</span>

      <div className="mb-3 pb-2 border-b border-gold/20 flex justify-between items-center">
        <span className="font-stamp text-[8px] text-medium-gray tracking-widest">Continued</span>
      </div>

      <div className="space-y-2.5 flex-1">
        {projects.slice(3).map((p, i) => (
          <a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block bg-passport-paper-dark/30 border border-gold/15 rounded-sm p-2.5 transition-all duration-300 hover:border-gold/30 hover:shadow-sm"
          >
            <div
              className="absolute -top-1.5 -right-1.5 stamp-effect px-1.5 py-0.5 border border-ink-blue/50 rounded-sm font-stamp text-[6px] text-ink-blue/60 tracking-wider uppercase"
              style={{ transform: `rotate(${3 + i * -5}deg)` }}
            >
              Reviewed
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-stamp-red" />
              <h3 className="font-heading text-xs sm:text-sm text-passport-navy font-bold group-hover:text-ink-blue transition-colors">
                {p.title}
              </h3>
            </div>
            <p className="text-dark-gray/65 text-[9px] leading-relaxed">{p.description}</p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {p.tags.map((t, j) => (
                <span
                  key={j}
                  className="font-stamp text-[6px] sm:text-[7px] text-ink-blue/70 border border-ink-blue/20 rounded-sm px-1.5 py-0.5 tracking-wider uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* Large approval stamp */}
      <div className="mt-auto pt-3 flex justify-center">
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
