import { useState } from 'react'
import { services } from '../data/services.js'

function ServiceCard({ service }) {
  const [imageMissing, setImageMissing] = useState(false)

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] shadow-xl shadow-black/20">
      <div className="relative aspect-[16/10] bg-[linear-gradient(135deg,rgba(212,160,23,0.18),rgba(255,255,255,0.04))]">
        {!imageMissing ? (
          <img
            src={service.image}
            alt={service.alt}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setImageMissing(true)}
          />
        ) : null}

        {/* This fallback keeps the layout polished until approved image files are added. */}
        <div
          className={`absolute inset-0 flex items-end p-5 ${
            imageMissing ? 'bg-[radial-gradient(circle_at_top,rgba(212,160,23,0.26),transparent_58%)]' : ''
          }`}
        >
          <div className="rounded-full border border-[var(--color-brand-gold)]/30 bg-[var(--color-brand-black)]/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brand-gold)] backdrop-blur">
            {imageMissing ? 'Image Placeholder' : service.title}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-semibold text-[var(--color-brand-off-white)]">
          {service.title}
        </h3>
        <p className="mt-4 text-base leading-7 text-white/72">
          {service.description}
        </p>
      </div>
    </article>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-brand-gold)]">
            Services
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-brand-off-white)] sm:text-4xl">
            Towing and transport options built for urgent calls and planned moves
          </h2>
          <p className="mt-5 text-base leading-7 text-white/72 sm:text-lg">
            Each service card uses a replaceable image path in
            <code className="mx-1 rounded bg-white/8 px-2 py-1 text-sm text-[var(--color-brand-off-white)]">
              /public/images
            </code>
            so approved photos can be dropped in later without changing the layout.
          </p>
        </div>

        {/* The service list comes from shared data so image paths and text stay easy to replace later. */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
