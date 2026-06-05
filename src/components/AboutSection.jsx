import { brand } from '../data/brand.js'

// These trust items are rendered from shared content so the section stays easy to update.
const trustItems = [
  'Reliable dispatch',
  'Careful vehicle handling',
  'Local & long-distance support',
  '24/7 emergency availability',
]

function AboutSection() {
  return (
    <section id="about" className="px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="rounded-[2rem] border border-[var(--color-brand-gold)]/22 bg-[linear-gradient(180deg,rgba(10,10,10,0.94),rgba(10,10,10,0.84))] p-7 shadow-2xl shadow-black/25 sm:p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-brand-gold)]">
            About Us
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-brand-off-white)] sm:text-4xl">
            Reliable towing and transport support built around careful service
          </h2>

          {/* Shared business details stay in brand.js so the messaging stays consistent site-wide. */}
          <p className="mt-6 text-base leading-7 text-white/72 sm:text-lg">
            {brand.name} provides towing, flatbed transport, roadside
            assistance, and long-distance vehicle transport for drivers who need
            dependable help without unnecessary hassle.
          </p>
          <p className="mt-4 text-base leading-7 text-white/72 sm:text-lg">
            We focus on reliable service, careful vehicle handling, and clear
            communication from pickup to drop-off across {brand.serviceArea}.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {trustItems.map((item) => (
            <div
              key={item}
              className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5 shadow-lg shadow-black/15"
            >
              <div className="h-10 w-10 rounded-full border border-[var(--color-brand-gold)]/35 bg-[var(--color-brand-gold-soft)]" />
              <p className="mt-5 text-lg font-semibold text-[var(--color-brand-off-white)]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
