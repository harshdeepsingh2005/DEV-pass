/**
 * PassportSpine — Realistic booklet binding seam.
 *
 * Sits at the vertical centre of the passport spread.
 * Renders:
 *   • parchment-toned background strip (~48px)
 *   • repeating thread stitch marks (SVG)
 *   • fold-depth shadows on both edges
 *
 * Usage:
 *   <PassportSpine />   — place inside a relative container as a z-overlay.
 */
const PassportSpine = () => (
  <div
    className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-30 pointer-events-none select-none"
    style={{ width: 48 }}
    aria-hidden="true"
  >
    {/* ── Fold depth shadows (outermost) ── */}
    <div
      className="absolute -left-5 top-0 bottom-0"
      style={{
        width: 22,
        background:
          'linear-gradient(to left, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.03) 40%, transparent 100%)',
      }}
    />
    <div
      className="absolute -right-5 top-0 bottom-0"
      style={{
        width: 22,
        background:
          'linear-gradient(to right, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.03) 40%, transparent 100%)',
      }}
    />

    {/* ── Parchment background ── */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(90deg, #d8cdb8 0%, #e6dece 20%, #efe8db 50%, #e6dece 80%, #d8cdb8 100%)',
      }}
    />

    {/* ── Crease highlight (central light line) ── */}
    <div
      className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
      style={{
        width: 1,
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.25) 100%)',
      }}
    />

    {/* ── Inner fold grooves ── */}
    <div
      className="absolute top-0 bottom-0"
      style={{
        left: 8,
        width: 1,
        background:
          'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0.08) 100%)',
      }}
    />
    <div
      className="absolute top-0 bottom-0"
      style={{
        right: 8,
        width: 1,
        background:
          'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0.08) 100%)',
      }}
    />

    {/* ── Thread stitches (SVG) ── */}
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 48 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Generate repeating stitch marks every 20 units */}
      {Array.from({ length: 38 }, (_, i) => {
        const y = 14 + i * 20
        return (
          <g key={i}>
            {/* Thread stitch — a short diagonal line crossing the centre */}
            <line
              x1={20}
              y1={y}
              x2={28}
              y2={y + 8}
              stroke="rgba(139,115,85,0.35)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Needle hole dots */}
            <circle cx={20} cy={y} r="0.7" fill="rgba(100,80,55,0.25)" />
            <circle cx={28} cy={y + 8} r="0.7" fill="rgba(100,80,55,0.25)" />
          </g>
        )
      })}

      {/* Second row of stitches offset — interleaved for realism */}
      {Array.from({ length: 37 }, (_, i) => {
        const y = 24 + i * 20
        return (
          <g key={`b-${i}`}>
            <line
              x1={28}
              y1={y}
              x2={20}
              y2={y + 8}
              stroke="rgba(139,115,85,0.25)"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
            <circle cx={28} cy={y} r="0.5" fill="rgba(100,80,55,0.18)" />
            <circle cx={20} cy={y + 8} r="0.5" fill="rgba(100,80,55,0.18)" />
          </g>
        )
      })}
    </svg>
  </div>
)

export default PassportSpine
