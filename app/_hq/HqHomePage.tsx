import Nav from './components/Nav'
import Hero from './components/Hero'
import { Clients, About } from './components/ClientsAbout'
import Packages from './components/Packages'
import Work from './components/Work'
import { WhyUs, Process, FocusedProjects } from './components/HowWeWork'
import Contact from './components/Contact'
import Faq from './components/Faq'
import Footer from './components/Footer'
import { InquiryProvider } from './components/Inquiry'
import { CareersProvider } from './components/Careers'
import Animations from './components/Animations'
import { GlassDefs } from './components/Glass'

// WAGMI HQ LLC single-page site, ported from the /chatgpt HTML prototype.
export default function HqHomePage() {
  return (
    <InquiryProvider>
      <CareersProvider>
        <Animations />
        <GlassDefs />
        <Nav />
        <main id="top" className="mx-auto max-w-290 px-8 max-[800px]:px-5">
          <Hero />
          <Clients />
          <About />
          <Work />
          <Packages />
          <WhyUs />
          <Process />
          <FocusedProjects />
          <Contact />
          <Faq />
          <Footer />
        </main>
      </CareersProvider>
    </InquiryProvider>
  )
}
