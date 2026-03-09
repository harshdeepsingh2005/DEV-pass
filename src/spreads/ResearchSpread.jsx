/**
 * ResearchSpread — Left: research papers list.  Right: inspection stamps.
 */
const papers = [
  {
    title: 'RL for Customer Experience Simulation',
    summary: 'Deep Q-Networks for modeling stochastic customer behavior in simulated environments with improved prediction accuracy.',
    status: 'Published',
  },
  {
    title: 'Urban Heat Island Prediction via Satellite',
    summary: 'ML pipeline leveraging MODIS satellite data and XGBoost for temperature anomaly prediction in urban environments.',
    status: 'In Review',
  },
  {
    title: 'Explainable AI in Healthcare',
    summary: 'Explainability methods for neural networks in medical triage, improving trust of AI-driven clinical recommendations.',
    status: 'In Progress',
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
    <div className="p-4 sm:p-5 border-r border-black/[0.04] flex flex-col">
      <div className="mb-3 pb-2 border-b border-gold/20 flex justify-between items-center">
        <h2 className="font-heading text-passport-navy text-sm sm:text-base font-bold">
          Research Papers
        </h2>
        <span className="font-stamp text-[7px] text-medium-gray tracking-widest">P 08</span>
      </div>

      <div className="space-y-3 flex-1">
        {papers.map((p, i) => {
          const sc = statusColor[p.status] || '#666'
          return (
            <div
              key={i}
              className="relative bg-passport-paper-dark/30 border border-gold/15 rounded-sm p-3"
            >
              {/* Status badge */}
              <div
                className="stamp-effect absolute -top-1.5 -right-1 px-1.5 py-0.5 rounded-sm border font-stamp text-[6px] tracking-wider uppercase"
                style={{
                  borderColor: sc,
                  color: sc,
                  transform: `rotate(${-5 + i * 4}deg)`,
                }}
              >
                {p.status}
              </div>
              <h3 className="font-heading text-xs text-passport-navy font-bold pr-14 leading-snug">
                {p.title}
              </h3>
              <p className="text-dark-gray/65 text-[10px] leading-relaxed mt-1">
                {p.summary}
              </p>
            </div>
          )
        })}
      </div>
    </div>

    {/* Right page — Inspection stamps */}
    <div className="p-4 sm:p-5 relative">
      <div className="mb-3 pb-2 border-b border-gold/20 flex justify-between items-center">
        <span className="font-stamp text-[7px] text-medium-gray tracking-widest">
          Inspection Stamps
        </span>
        <span className="font-stamp text-[7px] text-medium-gray tracking-widest">P 09</span>
      </div>

      {/* Decorative scattered stamps */}
      <div className="relative h-[calc(100%-2.5rem)]">
        <div className="absolute top-[5%] left-[8%] stamp-effect" style={{ transform: 'rotate(-10deg)' }}>
          <div className="w-20 h-20 rounded-full border-2 border-[#B22222] flex items-center justify-center">
            <div className="text-center">
              <p className="font-stamp text-[8px] text-[#B22222] tracking-wider uppercase font-bold">
                Peer
              </p>
              <p className="font-stamp text-[6px] text-[#B22222]/50 tracking-wider uppercase">
                Reviewed
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-[38%] right-[5%] stamp-effect" style={{ transform: 'rotate(6deg)' }}>
          <div className="border-2 border-[#1E3A8A] rounded-sm px-3 py-2">
            <p className="font-stamp text-[8px] text-[#1E3A8A] tracking-[0.2em] uppercase font-bold">
              Research
            </p>
            <p className="font-stamp text-[6px] text-[#1E3A8A]/50 tracking-wider uppercase">
              Validated
            </p>
          </div>
        </div>

        <div className="absolute bottom-[12%] left-[18%] stamp-effect" style={{ transform: 'rotate(-14deg)' }}>
          <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
            <p className="font-stamp text-[7px] text-[#D4AF37] tracking-wider uppercase font-bold text-center leading-tight">
              Academic
              <br />
              Seal
            </p>
          </div>
        </div>

        <div className="absolute top-[65%] left-[55%] stamp-effect" style={{ transform: 'rotate(3deg)' }}>
          <div className="border-2 border-[#B22222]/40 rounded-sm px-3 py-1.5">
            <p className="font-stamp text-[7px] text-[#B22222]/50 tracking-[0.3em] uppercase">
              Conference
            </p>
          </div>
        </div>

        <div className="absolute top-[15%] right-[15%] stamp-effect" style={{ transform: 'rotate(-5deg)' }}>
          <div className="w-14 h-14 rounded-full border-2 border-[#1E3A8A]/40 flex items-center justify-center">
            <p className="font-stamp text-[6px] text-[#1E3A8A]/50 tracking-wider uppercase font-bold text-center">
              IEEE
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ResearchSpread
