/**
 * CoverSpread — Closed passport cover face.
 * Gold foil shimmer typography on navy with laurel emblem.
 * Items fixed: #2 (gold-foil), #30 (emblem), heading structure, serial number, issue dates.
 */
const CoverSpread = () => (
  <div className="h-full flex flex-col items-center justify-center text-center px-8 py-6">
    {/* Laurel wreath emblem with code brackets */}
    <div className="mb-5">
      <svg width="64" height="64" viewBox="0 0 80 80" className="text-gold opacity-85">
        <path d="M40 6 C28 6 18 14 14 26 C10 38 12 50 20 58" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <path d="M40 6 C52 6 62 14 66 26 C70 38 68 50 60 58" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <ellipse cx="16" cy="30" rx="5" ry="2.5" fill="currentColor" opacity="0.3" transform="rotate(-30 16 30)" />
        <ellipse cx="14" cy="40" rx="5" ry="2.5" fill="currentColor" opacity="0.3" transform="rotate(-10 14 40)" />
        <ellipse cx="17" cy="50" rx="5" ry="2.5" fill="currentColor" opacity="0.3" transform="rotate(15 17 50)" />
        <ellipse cx="64" cy="30" rx="5" ry="2.5" fill="currentColor" opacity="0.3" transform="rotate(30 64 30)" />
        <ellipse cx="66" cy="40" rx="5" ry="2.5" fill="currentColor" opacity="0.3" transform="rotate(10 66 40)" />
        <ellipse cx="63" cy="50" rx="5" ry="2.5" fill="currentColor" opacity="0.3" transform="rotate(-15 63 50)" />
        <text x="40" y="42" textAnchor="middle" fill="currentColor" fontSize="18" fontFamily="monospace" opacity="0.85">&lt;/&gt;</text>
        <circle cx="40" cy="38" r="15" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
        <circle cx="22" cy="58" r="1.2" fill="currentColor" opacity="0.5" />
        <circle cx="58" cy="58" r="1.2" fill="currentColor" opacity="0.5" />
      </svg>
    </div>

    <p className="font-stamp text-gold/30 text-[8px] tracking-[0.6em] uppercase mb-3">
      No. DEV-2024-0137
    </p>

    <p className="font-stamp text-gold/55 text-[10px] tracking-[0.5em] uppercase mb-2">
      Portfolio
    </p>
    <h1 className="gold-foil font-heading text-2xl sm:text-3xl font-bold tracking-wide leading-tight">
      DEVELOPER PASSPORT
    </h1>

    <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent my-4" />

    <p className="font-stamp text-gold/75 text-[11px] sm:text-xs tracking-[0.3em] uppercase">
      Harshdeep Singh
    </p>
    <p className="font-stamp text-gold/50 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mt-1">
      AI / Machine Learning Engineer
    </p>

    <div className="mt-5 flex gap-6">
      <div className="text-center">
        <p className="font-stamp text-gold/25 text-[7px] tracking-[0.2em] uppercase">Issued</p>
        <p className="font-stamp text-gold/40 text-[8px] tracking-wider">2020</p>
      </div>
      <div className="text-center">
        <p className="font-stamp text-gold/25 text-[7px] tracking-[0.2em] uppercase">Expires</p>
        <p className="font-stamp text-gold/40 text-[8px] tracking-wider">NEVER</p>
      </div>
    </div>
  </div>
)

export default CoverSpread
