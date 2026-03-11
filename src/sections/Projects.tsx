import { portfolio } from '../data/portfolio'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeading } from '../components/SectionHeading'

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-10 md:py-16">
      <SectionHeading
        eyebrow="ls projects/"
        title="Projects"
        subtitle="Hands-on work where I supported deployments, improved workflows, and kept Linux servers healthy."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {portfolio.projects.map((p) => (
          <ProjectCard
            key={p.name}
            name={p.name}
            description={p.description}
            tech={p.tech}
            githubUrl={p.githubUrl}
          />
        ))}
      </div>
    </section>
  )
}

