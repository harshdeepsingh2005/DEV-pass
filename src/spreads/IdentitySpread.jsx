/**
 * IdentitySpread — Premium passport identity page.
 *
 * Left page (ID):
 *   - 160gsm textured ivory paper
 *   - Studio-lit passport headshot with "printed-on-paper" look
 *   - Gold corner brackets on photo frame
 *   - "CLASS: EXPERT" vintage red rubber stamp (over-inked, rough edges)
 *   - Structured metadata fields
 *   - Specialization tag chips
 *
 * Right page (Data):
 *   - Security paper with guilloché wavy blue/gold patterns + microtext
 *   - Sharp professional serif typography
 *   - Animated SVG signature + MRZ zone
 *
 * All animations driven by GSAP via FloatingPassport timeline.
 */

const techStack = [
  'Python', 'TensorFlow', 'PyTorch', 'Django',
  'React', 'JavaScript', 'SQL', 'Docker',
]

const expertise = [
  'Reinforcement Learning',
  'Predictive Modeling',
  'Simulation Engines',
  'Data Pipelines',
]

const focusTags = [
  'RL', 'Data Science', 'Simulation', 'Applied AI',
]

/* ─── Passport-style horizontal rule ─── */
const Rule = ({ className = '' }) => (
  <div className={`w-full flex items-center gap-2 ${className}`}>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
  </div>
)

/* ─── Section label used on the right page ─── */
const SectionLabel = ({ children }) => (
  <span className="font-stamp text-[7px] text-gold/60 tracking-[0.35em] uppercase block mb-0.5 select-none">
    {children}
  </span>
)

/* ─── Metadata row used on the left page ─── */
const MetaField = ({ label, value, mono = false }) => (
  <div className="flex items-baseline gap-2">
    <span className="font-stamp text-[7px] text-medium-gray/55 tracking-[0.2em] uppercase whitespace-nowrap w-[72px] shrink-0 text-right select-none">
      {label}
    </span>
    <span className={`${mono ? 'font-mrz tracking-wider' : 'font-body'} text-[10px] text-passport-navy/80 leading-tight`}>
      {value}
    </span>
  </div>
)

const IdentitySpread = () => (
  <div className="grid grid-cols-2 h-full" style={{ columnGap: 48 }}>

    {/* ════════════════════  LEFT PAGE (ID)  ════════════════════ */}
    <div className="flex flex-col items-center p-4 sm:p-5 relative">

      {/* page number */}
      <span className="absolute bottom-2 left-3 font-mrz text-[7px] text-medium-gray/20 tracking-widest select-none">
        P&nbsp;01
      </span>

      {/* header label */}
      <div className="w-full mb-3 pb-1.5 border-b border-gold/20">
        <span className="font-stamp text-[8px] text-gold/50 tracking-[0.35em] uppercase select-none">
          Identification
        </span>
      </div>

      {/* ── Passport Photo Frame (printed-on-paper look) ── */}
      <div className="relative mt-1">
        {/* photo placeholder with paper-printed treatment */}
        <div
          className="w-[100px] h-[126px] sm:w-[110px] sm:h-[138px] border border-gold/20 shadow-inner flex items-center justify-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #E8E0D0 0%, #D8CFC0 50%, #E2DAC8 100%)',
          }}
        >
          {/* Paper grain overlay */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(180,160,120,0.08) 2px, rgba(180,160,120,0.08) 3px)',
          }} />
          <svg viewBox="0 0 100 120" className="w-16 h-20 text-passport-navy/20 relative z-10">
            <circle cx="50" cy="35" r="22" fill="currentColor" />
            <ellipse cx="50" cy="95" rx="35" ry="25" fill="currentColor" />
          </svg>
        </div>
        {/* gold corner brackets */}
        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-gold/50" />
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-gold/50" />
        <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-gold/50" />
        <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-gold/50" />

        {/* ── "CLASS: EXPERT" rubber stamp (over-inked, rough) ── */}
        <div
          className="absolute -bottom-3 -right-2 stamp-slam pointer-events-none"
          style={{ transform: 'rotate(-12deg)' }}
        >
          <div
            className="ink-feather-heavy px-2 py-0.5 border-2 border-stamp-red/70 rounded-[2px]"
            style={{
              boxShadow: '0 0 3px rgba(178,34,34,0.15)',
            }}
          >
            <p className="font-stamp text-stamp-red/80 text-[8px] tracking-[0.3em] font-bold uppercase leading-none whitespace-nowrap">
              CLASS: EXPERT
            </p>
          </div>
        </div>
      </div>

      <p className="font-stamp text-[7px] text-medium-gray/40 tracking-[0.35em] uppercase mt-3 select-none">
        Passport Photo
      </p>

      <Rule className="my-2.5" />

      {/* ── Metadata Fields ── */}
      <div className="w-full space-y-1.5 px-1">
        <MetaField label="Surname" value="SINGH" mono />
        <MetaField label="Given Name" value="HARSHDEEP" mono />
        <MetaField label="Nationality" value="IND — India" mono />
        <MetaField label="D.O.B." value="2005-XX-XX" mono />
        <MetaField label="Specialization" value="Artificial Intelligence & ML" />
        <MetaField label="Focus Area" value="Reinforcement Learning" />
        <MetaField label="Passport ID" value="DEV-2024-013" mono />
      </div>

      <Rule className="my-2" />

      {/* ── Specialization Tag Chips ── */}
      <div className="flex flex-wrap justify-center gap-1.5 max-w-[210px]">
        {focusTags.map((tag) => (
          <span
            key={tag}
            className="stamp-effect stamp-slam font-stamp text-[7px] text-passport-navy/60 bg-gold/8 border border-gold/20 rounded-sm px-2 py-0.5 tracking-wider uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* ════════════════════  RIGHT PAGE (Data + Security Paper)  ════════════════════ */}
    <div className="flex flex-col p-4 sm:p-5 relative guilloche-bg">

      {/* ── Guilloché wavy pattern overlay ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <pattern id="guillocheWave" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
            <path d="M0 15 Q15 5 30 15 T60 15" fill="none" stroke="rgba(30,58,138,0.04)" strokeWidth="0.5" />
            <path d="M0 20 Q15 10 30 20 T60 20" fill="none" stroke="rgba(212,175,55,0.03)" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#guillocheWave)" />
      </svg>

      {/* ── Microtext security line (repeating faint text) ── */}
      <div className="absolute bottom-8 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <p className="font-mrz text-[3px] text-passport-navy/6 tracking-[0.5em] uppercase whitespace-nowrap">
          DEVELOPER·PASSPORT·HARSHDEEP·SINGH·AI·ENGINEER·VERIFIED·AUTHENTIC·DEVELOPER·PASSPORT·HARSHDEEP·SINGH·AI·ENGINEER·VERIFIED·AUTHENTIC
        </p>
      </div>

      {/* page number */}
      <span className="absolute bottom-2 right-3 font-mrz text-[7px] text-medium-gray/20 tracking-widest select-none">
        P&nbsp;02
      </span>

      {/* header label */}
      <div className="w-full mb-2.5 pb-1.5 border-b border-gold/20 relative z-10">
        <div className="flex justify-between items-center">
          <span className="font-stamp text-[8px] text-gold/50 tracking-[0.35em] uppercase select-none">
            Personal Data
          </span>
          {/* Issue date */}
          <span className="font-mrz text-[6px] text-medium-gray/30 tracking-widest select-none">
            ISSUED 2024
          </span>
        </div>
      </div>

      {/* ── TITLE ── */}
      <div className="mb-2 relative z-10">
        <SectionLabel>Full Name / Title</SectionLabel>
        <p className="font-heading text-base sm:text-lg text-passport-navy font-bold leading-snug">
          Harshdeep Singh
        </p>
        <p className="font-stamp text-[10px] text-stamp-red/80 tracking-wider uppercase mt-0.5">
          AI &amp; Machine Learning Engineer
        </p>
      </div>

      <Rule className="mb-2" />

      {/* ── BIOGRAPHY ── */}
      <div className="mb-2 relative z-10">
        <SectionLabel>Biography</SectionLabel>
        <p className="text-dark-gray/70 text-[10px] sm:text-[11px] leading-relaxed">
          AI engineer building complex simulation engines and research-oriented
          systems. Passionate about reinforcement learning, predictive modeling,
          and turning data into intelligent decision-making tools.
        </p>
      </div>

      <Rule className="mb-2" />

      {/* ── CORE EXPERTISE ── */}
      <div className="mb-2 relative z-10">
        <SectionLabel>Core Expertise</SectionLabel>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
          {expertise.map((item) => (
            <span
              key={item}
              className="text-[9px] text-passport-navy/70 font-body before:content-['▸'] before:mr-1 before:text-gold/60 before:text-[7px]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <Rule className="mb-2" />

      {/* ── TECH STACK ── */}
      <div className="mb-2 relative z-10">
        <SectionLabel>Tech Stack</SectionLabel>
        <div className="flex flex-wrap gap-1 mt-0.5">
          {techStack.map((t) => (
            <span
              key={t}
              className="font-mrz text-[7px] text-passport-navy/55 bg-passport-navy/5 border border-passport-navy/10 rounded-[3px] px-1.5 py-[1px] tracking-wide"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Signature (SVG animated via GSAP) ── */}
      <div className="pt-2 mt-auto border-t border-gold/20 relative z-10">
        <SectionLabel>Holder&apos;s Signature</SectionLabel>
        <svg
          viewBox="0 0 220 40"
          className="w-36 h-8 mt-0.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylised "Harshdeep" cursive path */}
          <path
            className="signature-path"
            d="M8 30 C12 10, 18 10, 20 25 C22 35, 26 8, 30 20
               C34 30, 36 12, 42 18 C48 24, 46 10, 52 15
               C58 22, 56 8, 62 14 C68 20, 66 10, 72 16
               C78 22, 80 8, 86 18 C90 24, 92 10, 98 16
               C104 24, 106 8, 112 18 C116 24, 120 12, 124 20
               C128 28, 132 10, 138 22 C142 30, 146 14, 150 20"
            stroke="#0B1D3A"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
          {/* Underline flourish */}
          <path
            className="signature-path"
            d="M6 34 Q80 28, 155 34"
            stroke="#D4AF37"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* ── MRZ zone ── */}
      <div className="mt-1.5 pt-1.5 border-t border-medium-gray/15 font-mrz text-[7px] text-passport-navy/25 leading-tight tracking-[0.15em] select-none overflow-hidden relative z-10">
        <p>P&lt;IND&lt;SINGH&lt;&lt;HARSHDEEP&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</p>
        <p>DEV2024013&lt;IND&lt;0000000&lt;M&lt;2505010&lt;&lt;&lt;&lt;&lt;&lt;&lt;00</p>
      </div>
    </div>
  </div>
)

export default IdentitySpread
