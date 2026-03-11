import { motion } from 'framer-motion'
import { FiCopy, FiMail, FiMapPin } from 'react-icons/fi'
import { GlassCard } from '../components/GlassCard'
import { SectionHeading } from '../components/SectionHeading'
import { portfolio } from '../data/portfolio'
import { ToolIcon } from '../components/ToolIcon'

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // ignore
  }
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-10 md:py-16">
      <SectionHeading
        eyebrow="ping mohsin@contact"
        title="Contact"
        subtitle="Let’s connect — I’m always happy to talk about Linux, Azure, and DevOps automation."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="md:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-100">
                  <FiMail className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-mono text-[11px] text-slate-400">email</div>
                  <div className="mt-1 text-sm text-slate-200">
                    {portfolio.email}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <a
                  href={`mailto:${portfolio.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-slate-200 transition hover:bg-white/10"
                >
                  send_mail
                </a>
                <motion.button
                  type="button"
                  onClick={() => copy(portfolio.email)}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-slate-200 transition hover:bg-white/10"
                >
                  <FiCopy />
                  copy
                </motion.button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-100">
                  <ToolIcon tag="github" className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-mono text-[11px] text-slate-400">linkedin</div>
                  <div className="mt-1 text-sm text-slate-200">
                    {portfolio.linkedin}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href={`https://${portfolio.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-slate-200 transition hover:bg-white/10"
                >
                  open_profile
                </a>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="font-mono text-xs text-slate-400">location</div>
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-200">
            <FiMapPin className="h-4 w-4 text-[rgb(var(--neon-cyan))]" />
            {portfolio.location}
          </div>
          <p className="mt-4 text-sm text-slate-300">
            Available for DevOps / Linux admin roles and projects.
          </p>
        </GlassCard>
      </div>
    </section>
  )
}

