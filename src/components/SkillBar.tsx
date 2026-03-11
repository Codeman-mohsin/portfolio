import { motion } from 'framer-motion'

type Props = {
  label: string
  value: number
}

export function SkillBar({ label, value }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div className="font-mono text-xs text-slate-200">{label}</div>
        <div className="font-mono text-xs text-slate-400">{value}%</div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[rgb(var(--neon-cyan))] via-[rgb(var(--neon-green))] to-[rgb(var(--neon-blue))]"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

