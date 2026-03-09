/**
 * CoverSpread — Closed passport cover face.
 * Gold typography on navy background.
 */
const CoverSpread = () => (
  <div className="h-full flex flex-col items-center justify-center text-center px-8 py-6">
    {/* Emblem */}
    <div className="mb-5">
      <svg width="56" height="56" viewBox="0 0 60 60" className="text-gold opacity-80">
        <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <path d="M30 10 L30 50 M10 30 L50 30" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
        <circle cx="30" cy="30" r="4" fill="currentColor" opacity="0.6" />
      </svg>
    </div>

    <p className="font-stamp text-gold/50 text-[9px] tracking-[0.5em] uppercase mb-2">
      Portfolio
    </p>
    <h1 className="font-heading text-gold text-2xl sm:text-3xl font-bold tracking-wide leading-tight">
      DEVELOPER
    </h1>
    <h2 className="font-heading text-gold text-2xl sm:text-3xl font-bold tracking-wide leading-tight -mt-0.5">
      PASSPORT
    </h2>

    <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent my-4" />

    <p className="font-stamp text-gold/70 text-[10px] sm:text-xs tracking-[0.3em] uppercase">
      Harshdeep Singh
    </p>
    <p className="font-stamp text-gold/45 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase mt-1">
      AI / Machine Learning Engineer
    </p>

    <div className="mt-6">
      <svg width="40" height="20" viewBox="0 0 40 20" className="text-gold opacity-30">
        <path d="M0 10 Q10 0 20 10 Q30 20 40 10" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  </div>
)

export default CoverSpread
