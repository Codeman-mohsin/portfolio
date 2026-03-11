import { GlassCard } from './GlassCard'

type Item = {
  title: string
  desc: string
}

type Props = {
  items: readonly Item[]
}

export function Timeline({ items }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, idx) => (
        <GlassCard key={item.title} className="relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[rgb(var(--neon-cyan))] via-[rgb(var(--neon-green))] to-[rgb(var(--neon-blue))]" />
          <div className="pl-4">
            <div className="font-mono text-xs text-slate-400">
              step_{String(idx + 1).padStart(2, '0')}
            </div>
            <div className="mt-2 text-base font-semibold text-slate-100">
              {item.title}
            </div>
            <div className="mt-2 text-sm text-slate-300">{item.desc}</div>
          </div>
        </GlassCard>
      ))}
    </div>
  )
}

