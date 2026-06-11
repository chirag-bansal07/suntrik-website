import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Stats from './sections/Stats'
import WhyUs from './sections/WhyUs'
import Savings from './sections/Savings'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './components/Footer'

import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Atmosphere from './components/Atmosphere'

import ProjectsPage  from './pages/ProjectsPage'
import KusumPage     from './pages/KusumPage'
import SuryaGharPage from './pages/SuryaGharPage'

gsap.registerPlugin(ScrollTrigger)

function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(time => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
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
        <Projects />
        <Stats />
        <WhyUs />
        <Savings />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
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
      </Routes>
    </BrowserRouter>
  )
}
