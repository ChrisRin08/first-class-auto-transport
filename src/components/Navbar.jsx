import { brand } from '../data/brand.js'

// These anchor links keep navigation simple until routing or full sections are added.
const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[var(--color-brand-black)]/88 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <a
              href="#home"
              className="inline-flex items-center text-lg font-semibold tracking-[0.18em] text-[var(--color-brand-off-white)] uppercase"
            >
              {brand.name}
            </a>
          </div>

          <nav aria-label="Primary" className="flex flex-wrap gap-3 text-sm text-white/78">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 transition hover:bg-white/6 hover:text-[var(--color-brand-off-white)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Shared business contact data lives in brand.js so both CTAs stay in sync. */}
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a
              href={brand.phone.href}
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-brand-gold)]/35 px-5 py-3 text-sm font-semibold text-[var(--color-brand-off-white)] transition hover:border-[var(--color-brand-gold)] hover:bg-white/6"
            >
              Call Now: {brand.phone.display}
            </a>
            <a
              href="#quote"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-gold)] px-5 py-3 text-sm font-semibold text-[var(--color-brand-black)] transition hover:brightness-105"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
