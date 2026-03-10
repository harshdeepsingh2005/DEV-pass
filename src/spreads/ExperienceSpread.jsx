/**
 * ExperienceSpread — Timeline across both pages.
 * Items fixed: #9 (bridge spine gap), #13 (hover), #14 (employer names), #7 (legend text), #29 (page numbers).
 */
const experiences = [
  {
    year: '2024–Now',
    title: 'Graduate Research – AI & RL',
    employer: 'University Research Lab',
    description: 'Advanced research in reinforcement learning for simulation systems and customer behavior modeling.',
    type: 'research',
  },
  {
    year: '2023',
    title: 'AI Engineer – Simulation',
    employer: 'CX-Twin Project',
    description: 'Built CX-Twin simulation engine with Deep Q-Network agents and stochastic modeling.',
    type: 'work',
  },
  {
    year: '2022',
    title: 'ML Engineer',
    employer: 'Industry — Geospatial Analytics',
    description: 'Developed ML pipelines for geospatial analysis and urban heat island prediction.',
    type: 'work',
  },
  {
    year: '2021',
    title: 'Research Assistant – ML Lab',
    employer: 'Healthcare AI Lab',
    description: 'Contributed to explainable AI research in healthcare and patient risk prediction.',
    type: 'research',
  },
  {
    year: '2020',
    title: 'B.Tech Computer Science',
    employer: 'VIT University',
    description: 'Completed CS studies focused on AI and data science. First RL research exposure.',
    type: 'education',
  },
]

const typeColor = { research: '#D4AF37', work: '#1E3A8A', education: '#B22222' }

const ExperienceSpread = () => (
  <div className="grid grid-cols-2 h-full relative">
    {/* Bridging timeline line across both pages — goes through the spine */}
    <div className="absolute left-[calc(50%-0.5px)] top-14 bottom-12 w-px bg-gold/20 z-10" />

    {/* Left page */}
    <div className="p-4 sm:p-5 border-r border-black/[0.04] flex flex-col relative">
      <span className="absolute bottom-2 left-3 font-mrz text-[7px] text-medium-gray/20 tracking-widest">P 10</span>

      <div className="mb-3 pb-2 border-b border-gold/20 flex justify-between items-center">
        <h2 className="font-heading text-passport-navy text-sm sm:text-base font-bold">
          Immigration Record
        </h2>
      </div>

      <div className="relative pl-5 flex-1">
        <div className="absolute left-1.5 top-1 bottom-1 w-px bg-gold/25" />
        {experiences.slice(0, 3).map((exp, i) => (
          <div key={i} className="group relative mb-4 last:mb-0 cursor-default">
            <div
              className="absolute -left-3.5 top-1 w-2.5 h-2.5 rounded-full border-2 transition-transform duration-300 group-hover:scale-150"
              style={{
                borderColor: typeColor[exp.type],
                backgroundColor: i === 0 ? typeColor[exp.type] : 'transparent',
              }}
            />
            <span
              className="font-stamp text-[8px] tracking-wider uppercase"
              style={{ color: typeColor[exp.type] }}
            >
              {exp.year}
            </span>
            <h3 className="font-heading text-xs sm:text-sm text-passport-navy font-bold leading-snug mt-0.5">
              {exp.title}
            </h3>
            <p className="font-stamp text-[8px] text-medium-gray/60 tracking-wider uppercase mt-0.5">
              {exp.employer}
            </p>
            <p className="text-dark-gray/60 text-[10px] leading-relaxed mt-0.5">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Right page */}
    <div className="p-4 sm:p-5 flex flex-col relative">
      <span className="absolute bottom-2 right-3 font-mrz text-[7px] text-medium-gray/20 tracking-widest">P 11</span>

      <div className="mb-3 pb-2 border-b border-gold/20 flex justify-between items-center">
        <span className="font-stamp text-[8px] text-medium-gray tracking-widest">Continued</span>
      </div>

      <div className="relative pl-5 flex-1">
        <div className="absolute left-1.5 top-1 bottom-1 w-px bg-gold/25" />
        {experiences.slice(3).map((exp, i) => (
          <div key={i} className="group relative mb-4 last:mb-0 cursor-default">
            <div
              className="absolute -left-3.5 top-1 w-2.5 h-2.5 rounded-full border-2 transition-transform duration-300 group-hover:scale-150"
              style={{ borderColor: typeColor[exp.type] }}
            />
            <span
              className="font-stamp text-[8px] tracking-wider uppercase"
              style={{ color: typeColor[exp.type] }}
            >
              {exp.year}
            </span>
            <h3 className="font-heading text-xs sm:text-sm text-passport-navy font-bold leading-snug mt-0.5">
              {exp.title}
            </h3>
            <p className="font-stamp text-[8px] text-medium-gray/60 tracking-wider uppercase mt-0.5">
              {exp.employer}
            </p>
            <p className="text-dark-gray/60 text-[10px] leading-relaxed mt-0.5">
              {exp.description}
            </p>
          </div>
        ))}
      </div>

      {/* Legend — fixed text size from 6px to 8px */}
      <div className="flex gap-3 mt-auto pt-3 border-t border-gold/15">
        {Object.entries(typeColor).map(([type, color]) => (
          <span key={type} className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="font-stamp text-[8px] text-medium-gray tracking-wider uppercase">
              {type}
            </span>
          </span>
        ))}
      </div>
    </div>
  </div>
)

export default ExperienceSpread
