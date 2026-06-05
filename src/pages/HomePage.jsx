import Hero from '../components/Hero.jsx'
import Navbar from '../components/Navbar.jsx'
import QuoteForm from '../components/QuoteForm.jsx'
import ServicesSection from '../components/ServicesSection.jsx'

function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ServicesSection />

      <section id="about" className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/4 p-6 text-white/72">
          About section placeholder
        </div>
      </section>

      <section id="contact" className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/4 p-6 text-white/72">
          Contact section placeholder
        </div>
      </section>

      <section id="quote" className="px-6 py-12 sm:px-10 lg:px-16 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <QuoteForm />
        </div>
      </section>
    </main>
  )
}

export default HomePage
