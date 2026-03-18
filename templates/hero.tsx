/**
 * Hero Section Template
 * Design Engine — Antigravity
 *
 * A full-viewport hero section with glassmorphism gradient mesh background,
 * animated badge, primary + ghost CTAs, and a social proof strip.
 *
 * Styling: Tailwind CSS v4 + custom CSS variables
 * Framework: React 19 + TypeScript
 *
 * Usage:
 *   import HeroSection from './templates/hero';
 *   <HeroSection />
 */

import { ArrowRight, Sparkles, Github, Twitter } from 'lucide-react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface HeroProps {
  badge?: string;
  headline?: string;
  highlight?: string;       // coloured portion of headline (appended after headline)
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  socialProof?: { count: string; label: string }[];
}

// ─────────────────────────────────────────────
// Defaults
// ─────────────────────────────────────────────
const DEFAULT_PROPS: Required<HeroProps> = {
  badge: '✦ Now in public beta',
  headline: 'Build something',
  highlight: 'extraordinary',
  subheadline:
    'The modern platform that ships fast, scales instantly, and looks stunning — without the overhead.',
  primaryCta: { label: 'Get Started Free', href: '#signup' },
  secondaryCta: { label: 'View Demo', href: '#demo' },
  socialProof: [
    { count: '10K+', label: 'developers' },
    { count: '500+', label: 'companies' },
    { count: '99.9%', label: 'uptime' },
  ],
};

// ─────────────────────────────────────────────
// Avatar strip (social proof)
// ─────────────────────────────────────────────
function AvatarStrip() {
  const initials = ['AK', 'JM', 'SR', 'TL', 'NP'];
  const colors = [
    'bg-violet-600',
    'bg-sky-600',
    'bg-emerald-600',
    'bg-amber-600',
    'bg-rose-600',
  ];

  return (
    <div className="flex -space-x-2">
      {initials.map((init, i) => (
        <div
          key={init}
          className={`w-7 h-7 rounded-full ring-2 ring-neutral-950 flex items-center justify-center text-[9px] font-bold text-white ${colors[i]}`}
        >
          {init}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function HeroSection(props: HeroProps = {}) {
  const {
    badge,
    headline,
    highlight,
    subheadline,
    primaryCta,
    secondaryCta,
    socialProof,
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-950 px-6"
      aria-labelledby="hero-headline"
    >
      {/* ── Background layers ───────────────── */}
      {/* Top gradient blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(139,92,246,0.25),transparent)]"
      />
      {/* Bottom-right blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_90%,rgba(56,189,248,0.12),transparent)]"
      />
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Noise texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"
      />

      {/* ── Content ─────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full gap-6">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-md">
          <Sparkles size={11} className="text-violet-400" aria-hidden="true" />
          {badge}
        </div>

        {/* Headline */}
        <h1
          id="hero-headline"
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white"
        >
          {headline}{' '}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
            {highlight}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-white/45 max-w-2xl leading-relaxed">
          {subheadline}
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <a
            href={primaryCta.href}
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-xl shadow-white/10 hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            {primaryCta.label}
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>

          <a
            href={secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/75 backdrop-blur-sm hover:bg-white/10 hover:text-white hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
          >
            {secondaryCta.label}
          </a>
        </div>

        {/* Social proof strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <AvatarStrip />
            <span className="text-xs text-white/30">Trusted by teams worldwide</span>
          </div>
          <div className="hidden sm:flex items-center gap-5">
            {socialProof.map(({ count, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-sm font-bold text-white">{count}</span>
                <span className="text-xs text-white/30">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub / Twitter links */}
        <div className="flex items-center gap-4 mt-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/25 hover:text-white/60 transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-white/25 hover:text-white/60 transition-colors"
          >
            <Twitter size={18} />
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 animate-bounce"
      >
        <ArrowRight size={16} className="rotate-90" />
      </div>
    </section>
  );
}
