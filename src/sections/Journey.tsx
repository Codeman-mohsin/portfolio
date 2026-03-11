import { portfolio } from '../data/portfolio'
import { SectionHeading } from '../components/SectionHeading'
import { Timeline } from '../components/Timeline'

export function Journey() {
  return (
    <section id="journey" className="scroll-mt-24 py-10 md:py-16">
      <SectionHeading
        eyebrow="git log --oneline"
        title="Experience / Journey"
        subtitle="A timeline-style journey of what I’ve been learning and building in DevOps."
      />

      <Timeline items={portfolio.journey} />
    </section>
  )
}

