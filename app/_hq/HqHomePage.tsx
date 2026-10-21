import Nav from './components/Nav'
import Hero from './components/Hero'
import Clients from './components/Clients'
import About from './components/About'
import Packages from './components/Packages'
import Work from './components/Work'
import Reviews from './components/Reviews'
import { WhyUs, Process, FocusedProjects } from './components/HowWeWork'
import Contact from './components/Contact'
import Faq from './components/Faq'
import Footer from './components/Footer'
import { InquiryProvider } from './components/Inquiry'
import { CareersProvider } from './components/Careers'
import Animations from './components/Animations'
import LiquidCursor from './components/LiquidCursor'
import ScrollToTop from './components/ScrollToTop'
import { GlassDefs } from './components/Glass'

// WAGMI HQ LLC single-page site, ported from the /chatgpt HTML prototype.
export default function HqHomePage() {
  return (
    <InquiryProvider>
      <CareersProvider>
        <Animations />
        <LiquidCursor />
        <GlassDefs />
        <div aria-hidden="true" className="hq-aurora" />
        <Nav />
        {/* The page container is shared, but <footer> stays a sibling of <main>
            so the landmarks aren't nested. #top anchors the whole page. */}
        <div id="top" className="mx-auto max-w-290 px-8 max-[800px]:px-5">
          <main>
            <Hero />
            <Clients />
            <About />
            <Work />
            <Packages />
            <Reviews />
            <WhyUs />
            <Process />
            <FocusedProjects />
            <Contact />
            <Faq />
          </main>
          <Footer />
        </div>
        <ScrollToTop />
      </CareersProvider>
    </InquiryProvider>
  )
}
