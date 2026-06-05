import AboutSection from '../components/AboutSection.jsx'
import ContactSection from '../components/ContactSection.jsx'
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
      <AboutSection />
      <ContactSection />

      <section id="quote" className="px-6 py-12 sm:px-10 lg:px-16 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <QuoteForm />
        </div>
      </section>
    </main>
  )
}

export default HomePage
