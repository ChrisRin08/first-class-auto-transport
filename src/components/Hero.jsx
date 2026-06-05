import { useState } from 'react'
import { brand } from '../data/brand.js'

// These badges highlight the core service promises without adding extra page sections yet.
const trustBadges = ['24/7 Service', 'Flatbed Available', 'Local & Long-Distance']
const heroImage = {
  src: '/images/hero-tow-truck.webp',
  alt: 'Tow truck prepared for premium towing and auto transport service in New York with no visible people or branding.',
}

function Hero() {
  const [imageMissing, setImageMissing] = useState(false)

  return (
    <section id="home" className="relative overflow-hidden px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-brand-gold)]">
            New York Towing Support
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-[var(--color-brand-off-white)] sm:text-5xl lg:text-6xl">
            Premium Towing &amp; Auto Transport in New York
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/76 sm:text-lg">
            Fast, reliable towing, flatbed transport, and roadside assistance
            when you need it most.
          </p>

          {/* Keep the two primary actions obvious and easy to tap on mobile. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-gold)] px-6 py-3.5 text-sm font-semibold text-[var(--color-brand-black)] transition hover:brightness-105"
            >
              Get a Quote
            </a>
            <a
              href={brand.phone.href}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/4 px-6 py-3.5 text-sm font-semibold text-[var(--color-brand-off-white)] transition hover:border-[var(--color-brand-gold)]/40 hover:bg-white/7"
            >
              Call Now
            </a>
          </div>

          {/* Rendering from an array keeps these trust points easy to update later. */}
          <div className="mt-10 flex flex-wrap gap-3">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-full border border-[var(--color-brand-gold)]/28 bg-[var(--color-brand-gold-soft)] px-4 py-2 text-sm font-medium text-[var(--color-brand-off-white)]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(212,160,23,0.26),_transparent_58%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-brand-gold)]/24 bg-[linear-gradient(160deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-6 shadow-2xl shadow-black/35">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--color-brand-black)]/88">
              <div className="relative aspect-[4/3] bg-[linear-gradient(135deg,rgba(212,160,23,0.18),rgba(255,255,255,0.04))]">
                {!imageMissing ? (
                  <img
                    src={heroImage.src}
                    alt={heroImage.alt}
                    className="h-full w-full object-cover"
                    onError={() => setImageMissing(true)}
                  />
                ) : null}

                {/* This keeps the hero polished until the approved image file is added manually. */}
                <div
                  className={`absolute inset-0 flex items-end p-5 ${
                    imageMissing ? 'bg-[radial-gradient(circle_at_top,rgba(212,160,23,0.26),transparent_58%)]' : 'bg-gradient-to-t from-[rgba(10,10,10,0.8)] via-transparent to-transparent'
                  }`}
                >
                  <div className="rounded-full border border-[var(--color-brand-gold)]/30 bg-[var(--color-brand-black)]/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brand-gold)] backdrop-blur">
                    {imageMissing ? 'Hero Image Placeholder' : 'Premium Transport'}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-brand-gold)]">
                Dispatch Ready
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
                    <p className="text-sm text-white/62">Service Window</p>
                    <p className="mt-2 text-2xl font-semibold text-[var(--color-brand-off-white)]">
                      24/7
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
                    <p className="text-sm text-white/62">Coverage</p>
                    <p className="mt-2 text-2xl font-semibold text-[var(--color-brand-off-white)]">
                      NY Region
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--color-brand-gold)]/28 bg-[var(--color-brand-gold-soft)] p-5 sm:col-span-2">
                    <p className="text-sm text-white/72">Fastest Action</p>
                    <p className="mt-2 text-xl font-semibold text-[var(--color-brand-off-white)]">
                      Call dispatch now at {brand.phone.display}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
