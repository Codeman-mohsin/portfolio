import { portfolio } from '../data/portfolio'

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="font-mono text-xs text-slate-400">
          © {new Date().getFullYear()} {portfolio.name}
        </div>
        <div className="font-mono text-xs text-slate-400">
          built_with React • Tailwind • Framer Motion
        </div>
      </div>
    </footer>
  )
}

