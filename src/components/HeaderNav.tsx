import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { ThemeToggle } from './ThemeToggle'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'tools', label: 'Tools' },
  { id: 'journey', label: 'Journey' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'contact', label: 'Contact' },
] as const

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function HeaderNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[rgba(2,6,23,0.6)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="group inline-flex items-baseline gap-2 font-mono text-sm"
        >
          <span className="text-[rgb(var(--neon-green))]">$</span>
          <span className="text-slate-100 transition group-hover:text-white">
            mohsin.devops
          </span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-300">portfolio</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="rounded-lg px-3 py-2 font-mono text-xs text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200 backdrop-blur transition hover:bg-white/10 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
          <a
            href="https://wa.me/918431758137"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-slate-200 backdrop-blur transition hover:bg-[#25D366] hover:text-white hover:border-[#25D366] sm:inline-flex"
          >
            message_me
          </a>
          <ThemeToggle />
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="border-t border-white/10 bg-[rgba(2,6,23,0.6)] px-4 py-3 backdrop-blur">
              <div className="grid grid-cols-2 gap-2">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      setTimeout(() => {
                        scrollToSection(item.id)
                      }, 150)
                    }}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left font-mono text-xs text-slate-200 transition hover:bg-white/10"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

