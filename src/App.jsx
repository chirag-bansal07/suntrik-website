import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import ProjectReels from './sections/ProjectReels'
import Stats from './sections/Stats'
import WhyUs from './sections/WhyUs'
import Testimonials from './sections/Testimonials'
import Team from './sections/Team'
import Contact from './sections/Contact'
import Footer from './components/Footer'

import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Atmosphere from './components/Atmosphere'

import ProjectsPage  from './pages/ProjectsPage'
import KusumPage     from './pages/KusumPage'
import SuryaGharPage from './pages/SuryaGharPage'
import CIPage        from './pages/CIPage'

gsap.registerPlugin(ScrollTrigger)

function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(time => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
      window.__lenis = null
      gsap.ticker.remove(time => lenis.raf(time * 1000))
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <ProjectReels />
        <Stats />
        <WhyUs />
        <Testimonials />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    // Navigated to e.g. /#contact. The target may not exist yet if we just
    // switched routes, so retry until it mounts, then scroll there. Use Lenis
    // when present so smooth scroll doesn't fight a native jump.
    const id = hash.slice(1)
    let timer
    const scrollToTarget = (attempts) => {
      const el = document.getElementById(id)
      if (el) {
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72 })
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (attempts > 0) {
        timer = setTimeout(() => scrollToTarget(attempts - 1), 120)
      }
    }
    timer = setTimeout(() => scrollToTarget(8), 80)
    return () => clearTimeout(timer)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Atmosphere />
      <ScrollToTop />
      <Routes>
        <Route path="/"                   element={<HomePage />} />
        <Route path="/projects"           element={<ProjectsPage />} />
        <Route path="/schemes/kusum"      element={<KusumPage />} />
        <Route path="/schemes/surya-ghar" element={<SuryaGharPage />} />
        <Route path="/schemes/ci"         element={<CIPage />} />
      </Routes>
    </BrowserRouter>
  )
}
