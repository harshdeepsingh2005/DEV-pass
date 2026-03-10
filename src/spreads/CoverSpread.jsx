/**
 * CoverSpread — Closed passport cover face.
 * Passport logo PNG centred, gold foil heading, structured layout.
 */
import passportLogo from '../assets/icons/passport_logo.png'

const CoverSpread = () => (
  <div className="h-full flex flex-col items-center justify-between text-center px-8 py-8 p-[5px]">
    {/* Top — Title + serial + subtitle */}
    <div className="flex flex-col items-center pt-1">
      <h1 className="gold-foil font-heading text-xl sm:text-2xl font-bold tracking-wide leading-tight">
        DEVELOPER PASSPORT
      </h1>
      <p className="font-mrz text-gold/30 text-[7px] tracking-[0.5em] uppercase mt-2">
        No. DEV-2024-0137
      </p>
      <p className="font-stamp text-gold/55 text-[10px] tracking-[0.5em] uppercase mt-1">
        Portfolio
      </p>
    </div>

    {/* Centre — Passport logo + name */}
    <div className="flex flex-col items-center">
      <img
        src={passportLogo}
        alt="Passport logo"
        className="w-20 h-20 sm:w-24 sm:h-24 opacity-85"
      />

      <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent my-3" />

      <p className="font-stamp text-gold/75 text-[11px] sm:text-xs tracking-[0.3em] uppercase">
        Harshdeep Singh
      </p>
      <p className="font-stamp text-gold/50 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase mt-1">
        AI / Machine Learning Engineer
      </p>
    </div>

    {/* Bottom — Issued / Expires */}
    <div className="flex gap-10 pb-1">
      <div className="text-center">
        <p className="font-stamp text-gold/25 text-[7px] tracking-[0.2em] uppercase">Issued</p>
        <p className="font-stamp text-gold/40 text-[9px] tracking-wider mt-0.5">2020</p>
      </div>
      <div className="text-center">
        <p className="font-stamp text-gold/25 text-[7px] tracking-[0.2em] uppercase">Expires</p>
        <p className="font-stamp text-gold/40 text-[9px] tracking-wider mt-0.5">NEVER</p>
      </div>
    </div>
  </div>
)

export default CoverSpread
