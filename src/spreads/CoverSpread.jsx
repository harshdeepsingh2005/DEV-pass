/**
 * CoverSpread — Oxblood leather cover with coarse grain texture,
 * gold-foil embossed text that catches the light, cinematic 10-o'clock
 * directional lighting, and premium material realism.
 */
import passportLogo from '../assets/icons/passport_logo.png'

const CoverSpread = () => (
  <div className="h-full flex flex-col items-center justify-between text-center px-8 py-8 relative leather-grain">

    {/* ── Directional light wash (top-left 10 o'clock) ── */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'linear-gradient(145deg, rgba(212,175,55,0.06) 0%, transparent 40%, rgba(0,0,0,0.08) 100%)',
      }}
    />

    {/* ── Leather edge accents (oxblood red visible at margins) ── */}
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#6B1C23]/15 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#6B1C23]/15 to-transparent" />
    <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-transparent via-[#6B1C23]/12 to-transparent" />
    <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-gradient-to-b from-transparent via-[#6B1C23]/12 to-transparent" />

    {/* ── Embossed corner filigree (top-left & bottom-right) ── */}
    <div className="absolute top-3 left-3 w-10 h-10 border-t border-l border-gold/15 rounded-tl-sm pointer-events-none" />
    <div className="absolute bottom-3 right-3 w-10 h-10 border-b border-r border-gold/15 rounded-br-sm pointer-events-none" />

    {/* Top — Title + serial + subtitle */}
    <div className="flex flex-col items-center pt-1 relative z-10">
      <h1 className="gold-foil font-heading text-xl sm:text-2xl font-bold tracking-wide leading-tight">
        DEVELOPER PASSPORT
      </h1>
      <p className="font-mrz text-gold/30 text-[7px] tracking-[0.5em] uppercase mt-2">
        No. DEV-2024-0137
      </p>
      <p className="font-stamp text-gold/55 text-[10px] tracking-[0.5em] uppercase mt-1">
        Portfolio
      </p>
      {/* Gold rule under title */}
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-2" />
    </div>

    {/* Centre — Passport logo + name */}
    <div className="flex flex-col items-center relative z-10">
      {/* Embossed ring around logo */}
      <div className="relative">
        <div className="absolute -inset-2 rounded-full border border-gold/10" />
        <img
          src={passportLogo}
          alt="Passport logo"
          className="w-20 h-20 sm:w-24 sm:h-24 opacity-85"
        />
      </div>

      <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent my-3" />

      <p className="font-stamp text-gold/75 text-[11px] sm:text-xs tracking-[0.3em] uppercase">
        Harshdeep Singh
      </p>
      <p className="font-stamp text-gold/50 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase mt-1">
        AI / Machine Learning Engineer
      </p>
    </div>

    {/* Bottom — Issued / Expires + microtext */}
    <div className="flex flex-col items-center pb-1 relative z-10">
      <div className="flex gap-10 mb-2">
        <div className="text-center">
          <p className="font-stamp text-gold/25 text-[7px] tracking-[0.2em] uppercase">Issued</p>
          <p className="font-stamp text-gold/40 text-[9px] tracking-wider mt-0.5">2020</p>
        </div>
        <div className="text-center">
          <p className="font-stamp text-gold/25 text-[7px] tracking-[0.2em] uppercase">Expires</p>
          <p className="font-stamp text-gold/40 text-[9px] tracking-wider mt-0.5">NEVER</p>
        </div>
      </div>
      {/* Microtext security line */}
      <p className="font-mrz text-gold/10 text-[4px] tracking-[0.8em] uppercase select-none">
        DEVELOPER PASSPORT · HARSHDEEP SINGH · AI ENGINEER · PORTFOLIO · AUTHORIZED
      </p>
    </div>
  </div>
)

export default CoverSpread
