import Nav from './components/Nav'
import Hero from './components/Hero'
import { Clients, About } from './components/ClientsAbout'
import Packages from './components/Packages'
import Work from './components/Work'
import { WhyUs, Process, FocusedProjects, Careers } from './components/HowWeWork'
import Contact from './components/Contact'
import Faq from './components/Faq'
import Footer from './components/Footer'
import { InquiryProvider } from './components/Inquiry'

// WAGMI HQ LLC single-page site, ported from the /chatgpt HTML prototype.
export default function HqHomePage() {
  return (
    <InquiryProvider>
      <Nav />
      <main id="top" className="mx-auto max-w-[1160px] px-8 max-[800px]:px-5">
        <Hero />
        <Clients />
        <About />
        <Packages />
        <Work />
        <WhyUs />
        <Process />
        <FocusedProjects />
        <Careers />
        <Contact />
        <Faq />
        <Footer />
      </main>
    </InquiryProvider>
  )
}
