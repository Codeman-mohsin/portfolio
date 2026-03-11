import { GlassCard } from '../components/GlassCard'
import { SectionHeading } from '../components/SectionHeading'
import { ToolIcon } from '../components/ToolIcon'
import { portfolio } from '../data/portfolio'

export function Tools() {
  return (
    <section id="tools" className="scroll-mt-24 py-10 md:py-16">
      <SectionHeading
        eyebrow="which tools"
        title="DevOps tools"
        subtitle="The tools I use to containerize, automate, ship, and monitor infrastructure."
      />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {portfolio.tools.map((t) => (
          <GlassCard
            key={t.name}
            className="flex items-center gap-4 p-5 transition hover:bg-white/10"
          >
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-100">
              <ToolIcon tag={t.tag} className="h-6 w-6" />
            </div>
            <div>
              <div className="font-mono text-sm text-slate-100">{t.name}</div>
              <div className="font-mono text-[11px] text-slate-400">
                {t.tag}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}

