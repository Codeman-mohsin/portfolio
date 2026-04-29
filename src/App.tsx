import { useEffect } from 'react'
import { CloudBackground } from './components/CloudBackground'
import { FloatingIcons } from './components/FloatingIcons'
import { HeaderNav } from './components/HeaderNav'
import { ScrollProgress } from './components/ScrollProgress'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Journey } from './sections/Journey'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Tools } from './sections/Tools'
import { TerminalSandbox } from './sections/TerminalSandbox'
import { TechMarquee } from './components/TechMarquee'
import { AiChatbot } from './components/AiChatbot'

function App() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="font-sans">
      <CloudBackground />
      <FloatingIcons />
      <ScrollProgress />
      <div className="relative z-10">
        <HeaderNav />

        <main className="mx-auto max-w-6xl px-4 md:px-6">
          <Hero />
          <TechMarquee />
          <About />
          <Skills />
          <Projects />
          <Tools />
          <Journey />
          <TerminalSandbox />
          <Contact />
        </main>

        <Footer />
      </div>

      <AiChatbot />
    </div>
  )
}

export default App
