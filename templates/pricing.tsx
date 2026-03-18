/**
 * Pricing Section Template
 * Design Engine — Antigravity
 *
 * A three-tier pricing section with:
 * - Monthly / Annual billing toggle (saves 20%)
 * - Highlighted "Popular" tier with violet accent
 * - Feature checklist per tier
 * - FAQ accordion
 * - Enterprise gradient CTA banner
 *
 * Styling: Tailwind CSS v4
 * Framework: React 19 + TypeScript
 *
 * Usage:
 *   import PricingSection from './templates/pricing';
 *   <PricingSection />
 */

import { useState } from 'react';
import { Check, X, Zap, ChevronDown } from 'lucide-react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  monthlyPrice: number | 'Custom';
  description: string;
  features: PricingFeature[];
  cta: string;
  ctaHref?: string;
  highlighted?: boolean;
  badge?: string;
}

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const TIERS: PricingTier[] = [
  {
    name: 'Starter',
    monthlyPrice: 0,
    description: 'Perfect for side projects and early experiments.',
    cta: 'Start for Free',
    ctaHref: '#signup-free',
    features: [
      { text: '5 active projects', included: true },
      { text: '1 GB storage', included: true },
      { text: 'Community support', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Custom domains', included: false },
      { text: 'Team collaboration', included: false },
      { text: 'Priority support', included: false },
      { text: 'Advanced analytics', included: false },
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: 29,
    description: 'For professional developers who ship fast.',
    cta: 'Start 14-Day Trial',
    ctaHref: '#signup-pro',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      { text: 'Unlimited projects', included: true },
      { text: '50 GB storage', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom domains', included: true },
      { text: 'Team collaboration (5 seats)', included: true },
      { text: 'CI/CD integrations', included: true },
      { text: 'Dedicated infrastructure', included: false },
    ],
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    description: 'Dedicated support, infrastructure, and SLAs.',
    cta: 'Contact Sales',
    ctaHref: '#contact',
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Unlimited storage', included: true },
      { text: '24/7 dedicated support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom domains', included: true },
      { text: 'Unlimited team seats', included: true },
      { text: 'CI/CD integrations', included: true },
      { text: 'Dedicated infrastructure', included: true },
    ],
  },
];

const FAQS = [
  {
    q: 'Can I switch plans at any time?',
    a: 'Yes. You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards (Visa, Mastercard, Amex) as well as ACH bank transfers for annual Enterprise plans.',
  },
  {
    q: 'Is there a free trial for Pro?',
    a: 'Absolutely — Pro comes with a 14-day free trial. No credit card required to get started.',
  },
  {
    q: 'What happens if I exceed my storage limit?',
    a: 'You will receive an email notification at 80% usage. You can upgrade your plan or purchase additional storage at any time.',
  },
];

// ─────────────────────────────────────────────
// FAQ accordion item
// ─────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-5 text-left text-sm font-medium text-white/75 hover:text-white transition-colors"
        aria-expanded={open}
      >
        {q}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 text-white/30 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm text-white/45 leading-relaxed pr-8">{a}</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Pricing card
// ─────────────────────────────────────────────
function PricingCard({ tier, annual }: { tier: PricingTier; annual: boolean }) {
  const price =
    tier.monthlyPrice === 'Custom'
      ? 'Custom'
      : annual
      ? Math.round((tier.monthlyPrice as number) * 0.8)
      : tier.monthlyPrice;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
        tier.highlighted
          ? 'border-violet-500/40 bg-gradient-to-b from-violet-500/8 to-transparent shadow-[0_0_80px_rgba(139,92,246,0.12)]'
          : 'border-white/8 bg-white/[0.015] hover:border-white/15'
      }`}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500 px-3.5 py-1 text-[11px] font-semibold text-white shadow-lg shadow-violet-500/30">
            <Zap size={10} aria-hidden="true" />
            {tier.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
          {tier.name}
        </p>
        <div className="flex items-end gap-1.5 mb-2">
          {price !== 'Custom' && (
            <span className="text-sm font-semibold text-white/40">$</span>
          )}
          <span className="text-5xl font-extrabold text-white leading-none">
            {price}
          </span>
          {price !== 'Custom' && (
            <span className="text-sm text-white/30 pb-1.5">
              /{annual ? 'mo' : 'mo'}
            </span>
          )}
        </div>
        {annual && price !== 'Custom' && (
          <p className="text-xs text-emerald-400 font-medium">
            Billed annually — save 20%
          </p>
        )}
        <p className="text-sm text-white/40 mt-3 leading-relaxed">
          {tier.description}
        </p>
      </div>

      {/* Features */}
      <ul className="flex-1 flex flex-col gap-3 mb-8">
        {tier.features.map((f) => (
          <li key={f.text} className="flex items-start gap-3">
            {f.included ? (
              <Check
                size={15}
                aria-label="Included"
                className={`mt-0.5 shrink-0 ${tier.highlighted ? 'text-violet-400' : 'text-white/35'}`}
              />
            ) : (
              <X size={15} aria-label="Not included" className="mt-0.5 shrink-0 text-white/15" />
            )}
            <span
              className={`text-sm ${f.included ? 'text-white/70' : 'text-white/25 line-through'}`}
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={tier.ctaHref ?? '#'}
        className={`block text-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
          tier.highlighted
            ? 'bg-violet-500 text-white hover:bg-violet-400 shadow-xl shadow-violet-500/30'
            : 'border border-white/10 text-white/75 hover:text-white hover:bg-white/5'
        }`}
      >
        {tier.cta}
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────
export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      className="relative bg-neutral-950 py-28 px-6 overflow-hidden"
      aria-labelledby="pricing-headline"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(139,92,246,0.12),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">
            Pricing
          </p>
          <h2
            id="pricing-headline"
            className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
          >
            Simple, transparent pricing
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
            No hidden fees. No surprises. Upgrade or downgrade at any time.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                !annual
                  ? 'bg-white text-neutral-900 shadow-md'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                annual
                  ? 'bg-white text-neutral-900 shadow-md'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Annual
              <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                −20%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start mb-20">
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} annual={annual} />
          ))}
        </div>

        {/* Enterprise banner */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-violet-900/30 to-fuchsia-900/20 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              Need a custom solution?
            </h3>
            <p className="text-sm text-white/50 max-w-lg">
              Our team will work with you to build a plan that fits your exact needs — from custom storage limits to dedicated SLAs and on-premise deployment.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-neutral-900 hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-xl shadow-white/10"
          >
            Talk to Sales
          </a>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-8 text-center">
            Frequently asked questions
          </h3>
          <div>
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
