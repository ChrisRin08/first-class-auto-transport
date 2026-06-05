import { brand } from '../data/brand.js'

function ContactSection() {
  return (
    <section id="contact" className="px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[var(--color-brand-gold)]/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-7 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-brand-gold)]">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-brand-off-white)] sm:text-4xl">
              Reach out anytime for towing, transport, or emergency assistance
            </h2>
            <p className="mt-5 text-base leading-7 text-white/72 sm:text-lg">
              {brand.name} supports drivers across {brand.serviceArea} with{' '}
              {brand.availability}.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Shared contact info is centralized in brand.js so each CTA stays in sync. */}
            <a
              href={brand.phone.href}
              className="rounded-[1.5rem] border border-[var(--color-brand-gold)]/28 bg-[var(--color-brand-gold-soft)] p-5 text-[var(--color-brand-off-white)] transition hover:border-[var(--color-brand-gold)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-brand-gold)]">
                Call Now
              </p>
              <p className="mt-4 text-xl font-semibold">{brand.phone.display}</p>
            </a>

            <a
              href={`mailto:${brand.email}`}
              className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5 text-[var(--color-brand-off-white)] transition hover:border-[var(--color-brand-gold)]/35"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-brand-gold)]">
                Email
              </p>
              <p className="mt-4 text-lg font-semibold break-all">{brand.email}</p>
            </a>

            {/* Instagram opens in a new tab, so rel protects the new page connection. */}
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5 text-[var(--color-brand-off-white)] transition hover:border-[var(--color-brand-gold)]/35"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-brand-gold)]">
                Instagram
              </p>
              <p className="mt-4 text-lg font-semibold">@firstclassautotransport_</p>
            </a>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5 text-[var(--color-brand-off-white)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-brand-gold)]">
                Service Area
              </p>
              <p className="mt-4 text-base leading-7 text-white/72">
                {brand.serviceArea}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-[var(--color-brand-black)]/70 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-[var(--color-brand-off-white)]">
              Need pricing for your tow or transport?
            </p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Start with the quote form and we will use your details to follow
              up about the request.
            </p>
          </div>
          <a
            href="#quote"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-brand-black)] transition hover:brightness-105"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
