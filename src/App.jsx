import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Background from './components/Background'
import BackToTop from './components/BackToTop'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import CertificatesPage from './pages/CertificatesPage'
import About from './sections/About'
import Certificates from './sections/Certificates'
import Contact from './sections/Contact'
import Experience from './sections/Experience'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'

/**
 * Show the intro preloader only on the first visit of a browser session and
 * never for users who prefer reduced motion.
 */
function shouldShowPreloader() {
  try {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !reduce && !sessionStorage.getItem('intro-seen')
  } catch {
    return false
  }
}

/** Check if the current URL points to the dedicated /certificates page. */
function isCertificatesRoute() {
  if (typeof window === 'undefined') return false
  const path = window.location.pathname.replace(/\/+$/, '')
  const hash = window.location.hash
  return path === '/certificates' || hash === '#/certificates'
}

export default function App() {
  const [loading, setLoading] = useState(shouldShowPreloader)
  const [page, setPage] = useState(() => (isCertificatesRoute() ? 'certificates' : 'home'))

  const finishLoading = useCallback(() => {
    try {
      sessionStorage.setItem('intro-seen', '1')
    } catch {
      /* ignore */
    }
    setLoading(false)
  }, [])

  // Keep page state synced with browser Back / Forward buttons
  useEffect(() => {
    const syncRoute = () => {
      setPage(isCertificatesRoute() ? 'certificates' : 'home')
    }
    window.addEventListener('popstate', syncRoute)
    window.addEventListener('hashchange', syncRoute)
    return () => {
      window.removeEventListener('popstate', syncRoute)
      window.removeEventListener('hashchange', syncRoute)
    }
  }, [])

  const openCertificatesPage = useCallback(() => {
    window.history.pushState({}, '', '/certificates')
    setPage('certificates')
  }, [])

  const backToPortfolio = useCallback(() => {
    window.history.pushState({}, '', '/#certificates')
    setPage('home')
    requestAnimationFrame(() => {
      document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="preloader" onDone={finishLoading} />}</AnimatePresence>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:border-2 focus:border-ink focus:bg-accent-solid focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      <Background />
      <CustomCursor />
      <ScrollProgress />

      {page === 'certificates' ? (
        <CertificatesPage onBack={backToPortfolio} />
      ) : (
        <>
          <Navbar />

          <main id="main" className="overflow-x-clip">
            <Hero ready={!loading} />
            <About />
            <Skills />
            <Projects />
            <Certificates onBrowseAll={openCertificatesPage} />
            <Experience />
            <Contact />
          </main>

          <Footer />
        </>
      )}

      <BackToTop />
    </MotionConfig>
  )
}
