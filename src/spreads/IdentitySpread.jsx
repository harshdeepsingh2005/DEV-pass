/**
 * IdentitySpread — Passport identity page.
 * Left: passport-style photo frame.  Right: name, title, bio, signature.
 */
const IdentitySpread = () => (
  <div className="grid grid-cols-2 h-full">
    {/* Left page — Photo */}
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 border-r border-black/[0.04]">
      <div className="relative">
        <div className="w-28 h-36 sm:w-32 sm:h-40 bg-passport-paper-dark border-2 border-gold/30 shadow-inner flex items-center justify-center">
          <svg viewBox="0 0 100 120" className="w-20 h-24 text-passport-navy/15">
            <circle cx="50" cy="35" r="22" fill="currentColor" />
            <ellipse cx="50" cy="95" rx="35" ry="25" fill="currentColor" />
          </svg>
        </div>
        {/* Photo frame corners */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-gold/40" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-gold/40" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-gold/40" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-gold/40" />
      </div>
      <p className="font-stamp text-[7px] text-medium-gray/50 tracking-[0.3em] uppercase mt-3">
        Passport Photo
      </p>
      <div className="w-16 h-px bg-gold/20 mt-2" />

      {/* Focus areas tags */}
      <div className="flex flex-wrap justify-center gap-1.5 mt-4 max-w-[200px]">
        {['RL', 'Data Science', 'Simulation', 'Applied AI'].map((tag) => (
          <span
            key={tag}
            className="font-stamp text-[7px] text-passport-navy/50 bg-passport-navy/5 border border-passport-navy/10 rounded-sm px-1.5 py-0.5 tracking-wide uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* Right page — Details */}
    <div className="flex flex-col p-4 sm:p-6">
      <div className="mb-3 pb-2 border-b border-gold/20 flex justify-between items-center">
        <span className="font-stamp text-[7px] text-medium-gray tracking-[0.3em] uppercase">
          Identity Page
        </span>
        <span className="font-stamp text-[7px] text-medium-gray tracking-widest">P 01</span>
      </div>

      <div className="space-y-3 flex-1">
        <div>
          <label className="font-stamp text-[7px] text-medium-gray/60 tracking-[0.2em] uppercase block">
            Full Name
          </label>
          <p className="font-heading text-lg sm:text-xl text-passport-navy font-bold mt-0.5">
            Harshdeep Singh
          </p>
        </div>

        <div>
          <label className="font-stamp text-[7px] text-medium-gray/60 tracking-[0.2em] uppercase block">
            Title
          </label>
          <p className="font-stamp text-[10px] text-stamp-red tracking-wider uppercase mt-0.5">
            AI / Machine Learning Engineer
          </p>
        </div>

        <div>
          <label className="font-stamp text-[7px] text-medium-gray/60 tracking-[0.2em] uppercase block">
            Biography
          </label>
          <p className="text-dark-gray/70 text-[10px] sm:text-[11px] leading-relaxed mt-0.5">
            AI engineer building complex simulation engines and research-oriented systems.
            Passionate about reinforcement learning, predictive modeling, and turning
            data into intelligent decision-making tools. Experienced in full-stack development
            with deep expertise in TensorFlow, PyTorch, and Django.
          </p>
        </div>
      </div>

      {/* Signature */}
      <div className="pt-3 mt-auto border-t border-gold/20">
        <p className="font-heading italic text-xl text-passport-navy/40">
          Harshdeep Singh
        </p>
        <p className="font-stamp text-[6px] text-medium-gray/40 tracking-[0.3em] uppercase mt-1">
          Digital Signature
        </p>
      </div>
    </div>
  </div>
)

export default IdentitySpread
