import { motion } from 'framer-motion'
import { FiDownload, FiMail, FiTerminal } from 'react-icons/fi'
import { portfolio } from '../data/portfolio'
import { GlassCard } from '../components/GlassCard'
import { TerminalHero } from '../components/TerminalHero'

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Hero() {
  return (
    <section id="hero" className="scroll-mt-24 py-10 md:py-16">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs text-slate-400">sudo make portfolio --modern</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-slate-100 md:text-6xl">
            {portfolio.name}
          </h1>
          <p className="mt-4 text-pretty font-mono text-sm text-slate-300 md:text-base">
            {portfolio.title}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={portfolio.resumeHref}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[rgb(var(--neon-cyan))] via-[rgb(var(--neon-green))] to-[rgb(var(--neon-blue))] px-4 py-2 font-mono text-xs text-slate-950 transition hover:brightness-110"
            >
              <FiDownload />
              Download_Resume
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-slate-200 backdrop-blur transition hover:bg-white/10"
            >
              <FiTerminal />
              View_Projects
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-slate-200 backdrop-blur transition hover:bg-white/10"
            >
              <FiMail />
              Contact_Me
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <GlassCard className="p-5">
              <div className="font-mono text-xs text-slate-400">focus</div>
              <div className="mt-2 text-sm text-slate-200">
                Linux ops • Azure cloud • CI/CD • IaC
              </div>
            </GlassCard>
            <GlassCard className="p-5">
              <div className="font-mono text-xs text-slate-400">location</div>
              <div className="mt-2 text-sm text-slate-200">{portfolio.location}</div>
            </GlassCard>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <TerminalHero />
        </motion.div>
      </div>
    </section>
  )
}

