import { portfolio } from '../data/portfolio'
import { GlassCard } from '../components/GlassCard'
import { SectionHeading } from '../components/SectionHeading'

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-10 md:py-16">
      <SectionHeading
        eyebrow="whoami"
        title="About me"
        subtitle="A DevOps-minded Linux Administrator who enjoys automating the boring stuff and shipping reliable systems."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="md:col-span-2">
          <div className="space-y-3 text-sm leading-relaxed text-slate-300 md:text-base">
            {portfolio.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="font-mono text-xs text-slate-400">quick_facts</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>
              <span className="text-slate-200">OS:</span> Linux (daily driver)
            </li>
            <li>
              <span className="text-slate-200">Cloud:</span> Azure
            </li>
            <li>
              <span className="text-slate-200">Mindset:</span> automate, observe, improve
            </li>
          </ul>
        </GlassCard>
      </div>
    </section>
  )
}

