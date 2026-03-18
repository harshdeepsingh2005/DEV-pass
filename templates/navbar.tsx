/**
 * Navbar Template
 * Design Engine — Antigravity
 *
 * A sticky, backdrop-blurred navigation bar with:
 * - Logo with icon
 * - Desktop links with hover states
 * - Primary CTA button
 * - Responsive mobile hamburger menu
 * - Active link detection via window.location
 *
 * Styling: Tailwind CSS v4
 * Framework: React 19 + TypeScript
 *
 * Usage:
 *   import Navbar from './templates/navbar';
 *   <Navbar />
 */

import { useState, useEffect } from 'react';
import { Box, Menu, X, ChevronDown, ExternalLink } from 'lucide-react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  children?: { label: string; href: string; description?: string }[];
}

export interface NavbarProps {
  logo?: { text: string; href?: string };
  links?: NavLink[];
  cta?: { label: string; href: string };
  theme?: 'dark' | 'light';
}

// ─────────────────────────────────────────────
// Defaults
// ─────────────────────────────────────────────
const DEFAULT_LINKS: NavLink[] = [
  { label: 'Features', href: '#features' },
  {
    label: 'Products',
    href: '#products',
    children: [
      { label: 'Analytics', href: '#analytics', description: 'Real-time metrics and insights' },
      { label: 'Automation', href: '#automation', description: 'Workflow automation engine' },
      { label: 'Collaboration', href: '#collaboration', description: 'Team workspaces' },
    ],
  },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
  { label: 'Blog', href: '#blog' },
];

// ─────────────────────────────────────────────
// Dropdown submenu
// ─────────────────────────────────────────────
function Dropdown({ items }: { items: NonNullable<NavLink['children']> }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-xl border border-white/10 bg-neutral-900/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/50">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="block rounded-lg px-3 py-2.5 hover:bg-white/5 transition-colors group"
        >
          <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
            {item.label}
          </p>
          {item.description && (
            <p className="text-xs text-white/35 mt-0.5">{item.description}</p>
          )}
        </a>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function Navbar({
  logo = { text: 'Acme', href: '/' },
  links = DEFAULT_LINKS,
  cta = { label: 'Get Started', href: '#signup' },
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for border appearance
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/8 bg-neutral-950/85 backdrop-blur-xl shadow-xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">

          {/* Logo */}
          <a
            href={logo.href ?? '/'}
            className="flex items-center gap-2 font-bold text-white shrink-0 hover:opacity-80 transition-opacity"
            aria-label={`${logo.text} – Home`}
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-md shadow-violet-500/30">
              <Box size={14} className="text-white" aria-hidden="true" />
            </div>
            <span className="text-[15px]">{logo.text}</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {links.map((link) => (
              <li key={link.label} className="relative group">
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-white/55 hover:text-white hover:bg-white/5 transition-all duration-150"
                >
                  {link.label}
                  {link.external && <ExternalLink size={11} aria-hidden="true" />}
                  {link.children && (
                    <ChevronDown
                      size={13}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:rotate-180 text-white/30"
                    />
                  )}
                </a>

                {/* Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Dropdown items={link.children} />
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="#login"
              className="text-sm text-white/50 hover:text-white transition-colors px-3 py-2"
            >
              Sign In
            </a>
            <a
              href={cta.href}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-white/90 transition-all duration-200 shadow-lg shadow-white/10 hover:-translate-y-0.5 active:translate-y-0"
            >
              {cta.label}
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            role="dialog"
            aria-label="Mobile navigation"
            className="md:hidden border-t border-white/8 bg-neutral-950/98 backdrop-blur-xl px-6 py-5 flex flex-col gap-1"
          >
            {links.map((link) => (
              <div key={link.label}>
                <a
                  href={link.href}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} className="text-white/30" />}
                </a>
                {link.children && (
                  <div className="ml-4 flex flex-col gap-0.5">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="rounded-lg px-3 py-2 text-xs text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-white/8 flex flex-col gap-3">
              <a
                href="#login"
                className="text-center rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </a>
              <a
                href={cta.href}
                className="text-center rounded-lg bg-white px-4 py-3 text-sm font-semibold text-neutral-900 hover:bg-white/90 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {cta.label}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
