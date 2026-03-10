/**
 * ResearchSpread — Left: research papers.  Right: publication details & citations.
 * Items fixed: #11 (differentiate from ProjectsSpread), #13 (hover), #29 (page numbers).
 */
const papers = [
  {
    title: 'RL for Customer Experience Simulation',
    venue: 'IEEE Conference on AI Systems',
    year: '2024',
    summary: 'Deep Q-Networks for modeling stochastic customer behavior in simulated environments with improved prediction accuracy.',
    status: 'Published',
    doi: '10.1109/ICAIS.2024.XXXXX',
  },
  {
    title: 'Urban Heat Island Prediction via Satellite',
    venue: 'MODIS Data Workshop — Geospatial ML',
    year: '2023',
    summary: 'ML pipeline leveraging MODIS satellite data and XGBoost for temperature anomaly prediction in urban environments.',
    status: 'In Review',
    doi: 'arXiv:2312.XXXXX',
  },
  {
    title: 'Explainable AI in Healthcare Triage',
    venue: 'Journal of Medical AI',
    year: '2023',
    summary: 'Explainability methods for neural networks in medical triage, improving trust of AI-driven clinical recommendations.',
    status: 'In Progress',
    doi: null,
  },
]

const statusColor = {
  Published: '#B22222',
  'In Review': '#1E3A8A',
  'In Progress': '#D4AF37',
}

const ResearchSpread = () => (
  <div className="grid grid-cols-2 h-full">
    {/* Left page — Papers */}
    <div className="p-4 sm:p-5 border-r border-black/[0.04] flex flex-col relative">
      <span className="absolute bottom-2 left-3 font-mrz text-[7px] text-medium-gray/20 tracking-widest">P 08</span>

      <div className="mb-3 pb-2 border-b border-gold/20 flex justify-between items-center">
        <h2 className="font-heading text-passport-navy text-sm sm:text-base font-bold">
          Research Papers
        </h2>
      </div>

      <div className="space-y-2.5 flex-1">
        {papers.map((p, i) => {
          const sc = statusColor[p.status] || '#666'
          return (
            <div
              key={i}
              className="group relative bg-passport-paper-dark/30 border border-gold/15 rounded-sm p-2.5 transition-all duration-300 hover:border-gold/30 hover:shadow-sm"
            >
              {/* Status badge */}
              <div
                className="stamp-effect stamp-slam absolute -top-1.5 -right-1 px-1.5 py-0.5 rounded-sm border font-stamp text-[7px] tracking-wider uppercase"
                style={{
                  borderColor: sc,
                  color: sc,
                  transform: `rotate(${-5 + i * 4}deg)`,
                }}
              >
                {p.status}
              </div>
              <h3 className="font-heading text-xs text-passport-navy font-bold pr-14 leading-snug group-hover:text-ink-blue transition-colors">
                {p.title}
              </h3>
              <p className="font-stamp text-[8px] text-stamp-red/60 tracking-wider mt-0.5">
                {p.venue} • {p.year}
              </p>
              <p className="text-dark-gray/65 text-[10px] leading-relaxed mt-1">
                {p.summary}
              </p>
              {p.doi && (
                <p className="font-mono text-[7px] text-medium-gray/50 mt-1 tracking-wider">
                  {p.doi}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>

    {/* Right page — Research metrics & stamps */}
    <div className="p-4 sm:p-5 relative flex flex-col">
      <span className="absolute bottom-2 right-3 font-mrz text-[7px] text-medium-gray/20 tracking-widest">P 09</span>

      <div className="mb-3 pb-2 border-b border-gold/20 flex justify-between items-center">
        <span className="font-stamp text-[8px] text-medium-gray tracking-widest">
          Research Metrics
        </span>
      </div>

      {/* Research metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 border border-gold/15 rounded-sm">
          <p className="font-heading text-lg text-passport-navy font-bold">3</p>
          <p className="font-stamp text-[7px] text-medium-gray/60 tracking-widest uppercase">Papers</p>
        </div>
        <div className="text-center p-2 border border-gold/15 rounded-sm">
          <p className="font-heading text-lg text-stamp-red font-bold">1</p>
          <p className="font-stamp text-[7px] text-medium-gray/60 tracking-widest uppercase">Published</p>
        </div>
        <div className="text-center p-2 border border-gold/15 rounded-sm">
          <p className="font-heading text-lg text-ink-blue font-bold">5+</p>
          <p className="font-stamp text-[7px] text-medium-gray/60 tracking-widest uppercase">Citations</p>
        </div>
        <div className="text-center p-2 border border-gold/15 rounded-sm">
          <p className="font-heading text-lg text-gold font-bold">2</p>
          <p className="font-stamp text-[7px] text-medium-gray/60 tracking-widest uppercase">Domains</p>
        </div>
      </div>

      {/* Research focus areas */}
      <div className="mb-3">
        <p className="font-stamp text-[8px] text-medium-gray/60 tracking-widest uppercase mb-2">Focus Areas</p>
        <div className="flex flex-wrap gap-1.5">
          {['Reinforcement Learning', 'Explainable AI', 'Geospatial ML', 'Healthcare AI', 'Simulation'].map((area) => (
            <span key={area} className="font-stamp text-[7px] text-ink-blue/70 border border-ink-blue/20 rounded-sm px-2 py-0.5 tracking-wider uppercase">
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Validation stamps */}
      <div className="flex-1 relative">
        <div className="absolute top-2 left-4 stamp-effect stamp-slam" style={{ transform: 'rotate(-10deg)' }}>
          <div className="w-16 h-16 rounded-full border-2 border-[#B22222]/50 flex items-center justify-center">
            <div className="text-center">
              <p className="font-stamp text-[7px] text-[#B22222]/60 tracking-wider uppercase font-bold">Peer</p>
              <p className="font-stamp text-[5px] text-[#B22222]/40 tracking-wider uppercase">Reviewed</p>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-6 stamp-effect stamp-slam" style={{ transform: 'rotate(6deg)' }}>
          <div className="border-2 border-[#1E3A8A]/50 rounded-sm px-3 py-1.5">
            <p className="font-stamp text-[7px] text-[#1E3A8A]/60 tracking-[0.2em] uppercase font-bold">IEEE</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ResearchSpread
