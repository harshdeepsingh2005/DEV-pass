/**
 * ExperienceSpread — Immigration record timeline across both pages.
 *
 * Visual enhancements:
 *   • paper-weathered yellowed background
 *   • Dog-eared corner effects (top-right, bottom-left)
 *   • Color-coded timeline nodes (gold=research, blue=work, red=education)
 *   • Ink bleed effect on year labels
 *   • ADMITTED stamp from "AI Research Lab"
 *   • coffee-stain class on left page
 *   • Handling smudge marks
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
  <div className="grid grid-cols-2 h-full relative" style={{ columnGap: 48 }}>

    {/* ── Weathered paper background ── */}
    <div className="absolute inset-0 paper-weathered pointer-events-none" />

    {/* ── Dog-eared corner (top-right) ── */}
    <div
      className="absolute top-0 right-0 w-6 h-6 pointer-events-none z-20"
      style={{
        background: 'linear-gradient(225deg, rgba(200,185,160,0.4) 0%, rgba(200,185,160,0.15) 50%, transparent 50%)',
      }}
    />
    {/* ── Dog-eared corner (bottom-left) ── */}
    <div
      className="absolute bottom-0 left-0 w-5 h-5 pointer-events-none z-20"
      style={{
        background: 'linear-gradient(45deg, rgba(200,185,160,0.3) 0%, rgba(200,185,160,0.1) 50%, transparent 50%)',
      }}
    />

    {/* ── Coffee stain (left page) ── */}
    <div className="absolute coffee-stain pointer-events-none z-[1]" style={{ left: '12%', top: '65%', width: '50px', height: '50px' }} />

    {/* ── Handling smudge marks ── */}
    <div
      className="absolute pointer-events-none z-[1]"
      style={{
        right: '15%',
        top: '20%',
        width: '30px',
        height: '45px',
        background: 'radial-gradient(ellipse, rgba(140,130,110,0.06) 0%, transparent 70%)',
        transform: 'rotate(25deg)',
      }}
    />

    {/* Bridging timeline line across both pages — goes through the spine */}
    <div className="absolute left-[calc(50%-0.5px)] top-14 bottom-12 w-px bg-gold/20 z-10" />

    {/* Left page */}
    <div className="p-4 sm:p-5 flex flex-col relative z-10">
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
            {/* Color-coded timeline node */}
            <div
              className="absolute -left-3.5 top-1 w-2.5 h-2.5 rounded-full border-2 transition-transform duration-300 group-hover:scale-150"
              style={{
                borderColor: typeColor[exp.type],
                backgroundColor: i === 0 ? typeColor[exp.type] : 'transparent',
              }}
            />
            {/* Year with ink bleed effect */}
            <span
              className="font-stamp text-[8px] tracking-wider uppercase ink-feather"
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

      {/* ── ADMITTED stamp ── */}
      <div
        className="absolute bottom-12 right-4 ink-feather-heavy stamp-slam pointer-events-none z-20"
        style={{ transform: 'rotate(-12deg)' }}
      >
        <div className="border-[2.5px] border-stamp-red/50 rounded-sm px-3 py-1.5">
          <p className="font-stamp text-stamp-red/55 text-[9px] tracking-[0.3em] uppercase font-bold text-center">
            Admitted
          </p>
          <p className="font-stamp text-stamp-red/35 text-[5px] tracking-[0.15em] uppercase text-center mt-0.5">
            AI Research Lab
          </p>
        </div>
      </div>
    </div>

    {/* Right page */}
    <div className="p-4 sm:p-5 flex flex-col relative z-10">
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
              className="font-stamp text-[8px] tracking-wider uppercase ink-feather"
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

      {/* Legend */}
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

    {/* ── Microtext ── */}
    <div className="absolute bottom-1 left-0 right-0 overflow-hidden pointer-events-none z-20">
      <p className="font-mrz text-[4px] text-medium-gray/10 tracking-[0.15em] whitespace-nowrap text-center select-none">
        IMMIGRATION&bull;RECORD&bull;EMPLOYMENT&bull;HISTORY&bull;VERIFIED&bull;IMMIGRATION&bull;RECORD&bull;EMPLOYMENT&bull;HISTORY&bull;VERIFIED
      </p>
    </div>
  </div>
)

export default ExperienceSpread
