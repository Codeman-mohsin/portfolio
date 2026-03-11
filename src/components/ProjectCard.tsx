import { motion } from 'framer-motion'
import { FiGithub, FiLink } from 'react-icons/fi'
import { GlassCard } from './GlassCard'

type Props = {
  name: string
  description: string
  tech: readonly string[]
  githubUrl?: string
  liveUrl?: string
}

export function ProjectCard({
  name,
  description,
  tech,
  githubUrl,
  liveUrl,
}: Props) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 240, damping: 22 }} className="h-full flex">
      <GlassCard className="group relative overflow-hidden flex-1 flex flex-col w-full">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
          <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[rgba(34,211,238,0.16)] blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-56 w-56 rounded-full bg-[rgba(34,197,94,0.14)] blur-3xl" />
        </div>

        <div className="relative flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-slate-100">{name}</h3>
          <p className="mt-2 text-sm text-slate-300">{description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6 flex items-center gap-3">
            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-slate-200 transition hover:bg-white/10"
              >
                <FiGithub />
                GitHub
              </a>
            ) : null}
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-slate-200 transition hover:bg-white/10"
              >
                <FiLink />
                Live
              </a>
            ) : null}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

