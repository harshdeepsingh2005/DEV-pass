/**
 * ContactSpread — Exit visa spread.
 * Left: large EXIT VISA stamp.  Right: stamp-style contact buttons.
 * Items fixed: #1 (real URLs), #17 (brand colors), #7 (typography), #29 (page numbers).
 */
const contacts = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: 'GitHub',
    url: 'https://github.com/harshdeepsingh2005',
    color: '#24292e',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/harshdeepsingh2005',
    color: '#0077B5',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    url: 'mailto:harshdeepsingh2005@gmail.com',
    color: '#B22222',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    label: 'Download CV',
    url: '/Harshdeep_Singh_CV.pdf',
    color: '#B22222',
    download: true,
  },
]

const ContactSpread = () => (
  <div className="grid grid-cols-2 h-full" style={{ columnGap: 48 }}>
    {/* Left page — Exit visa stamp */}
    <div className="relative flex flex-col items-center justify-center p-6">
      {/* Page number watermark */}
      <span className="absolute bottom-2 left-3 font-mrz text-[7px] text-medium-gray/20 tracking-widest">P 12</span>

      <div
        className="stamp-effect stamp-slam border-stamp-red/50 rounded-sm px-8 py-5 mb-5"
        style={{ transform: 'rotate(-3deg)', borderWidth: '3px', borderStyle: 'solid', borderColor: 'rgba(178,34,34,0.5)' }}
      >
        <p className="font-stamp text-stamp-red/40 text-[9px] tracking-[0.5em] uppercase text-center">
          Developer Passport
        </p>
        <h3 className="font-heading text-stamp-red text-2xl sm:text-3xl font-bold tracking-wide mt-1 text-center">
          EXIT VISA
        </h3>
        <div className="w-14 h-px bg-stamp-red/30 mx-auto mt-2.5" />
        <p className="font-stamp text-stamp-red/30 text-[8px] tracking-[0.3em] uppercase text-center mt-2">
          Authorized
        </p>
      </div>

      <p className="font-stamp text-medium-gray/50 text-[9px] tracking-[0.3em] uppercase text-center">
        Connect · Collaborate · Explore
      </p>

      {/* Footer */}
      <div className="mt-auto pt-4">
        <p className="font-stamp text-medium-gray/35 text-[8px] tracking-widest uppercase text-center">
          © {new Date().getFullYear()} Harshdeep Singh
        </p>
        <p className="font-stamp text-medium-gray/25 text-[8px] tracking-wider uppercase text-center mt-0.5">
          Valid for unlimited opportunities
        </p>
      </div>
    </div>

    {/* Right page — Contact stamp buttons */}
    <div className="flex flex-col items-center justify-center p-5 sm:p-6 relative">
      <span className="absolute bottom-2 right-3 font-mrz text-[7px] text-medium-gray/20 tracking-widest">P 13</span>

      <div className="w-full mb-3 pb-2 border-b border-gold/20 flex justify-between items-center">
        <span className="font-stamp text-[8px] text-medium-gray tracking-widest">
          Exit Points
        </span>
        <span className="font-stamp text-[8px] text-medium-gray tracking-widest">Contact</span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 flex-1 content-center">
        {contacts.map((c, i) => (
          <a
            key={i}
            href={c.url}
            target={c.download ? '_self' : '_blank'}
            rel="noopener noreferrer"
            download={c.download ? true : undefined}
            className="group flex flex-col items-center gap-2 text-passport-navy/60 hover:text-passport-navy transition-colors"
            aria-label={c.label}
          >
            <div
              className="stamp-effect stamp-slam w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              style={{ borderColor: c.color, color: c.color }}
            >
              {c.icon}
            </div>
            <span className="font-stamp text-[8px] sm:text-[9px] tracking-widest uppercase transition-colors duration-300" style={{ color: c.color }}>
              {c.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  </div>
)

export default ContactSpread
