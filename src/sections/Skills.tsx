import { portfolio } from '../data/portfolio'
import { SectionHeading } from '../components/SectionHeading'
import { SkillBar } from '../components/SkillBar'
import { ToolIcon } from '../components/ToolIcon'

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-10 md:py-16">
      <SectionHeading
        eyebrow="cat skills.json"
        title="Skills"
        subtitle="Core strengths across Linux administration, cloud, containers, automation, and delivery pipelines."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {portfolio.skills.map((s) => (
          <div key={s.name} className="relative">
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200">
                <ToolIcon tag={iconTagFromSkill(s.tag)} className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <SkillBar label={s.name} value={s.level} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function iconTagFromSkill(tag: (typeof portfolio.skills)[number]['tag']) {
  switch (tag) {
    case 'linux':
      return 'linux'
    case 'docker':
      return 'docker'
    case 'kubernetes':
      return 'kubernetes'
    case 'azure':
      return 'azure'
    case 'terraform':
      return 'terraform'
    case 'git':
      return 'git'
    case 'web':
      return 'nginx'
    case 'cicd':
      return 'jenkins'
    case 'bash':
      return 'linux'
  }
}

