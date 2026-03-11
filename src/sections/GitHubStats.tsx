import { useEffect, useMemo, useState } from 'react'
import { GlassCard } from '../components/GlassCard'
import { SectionHeading } from '../components/SectionHeading'
import { portfolio } from '../data/portfolio'
import { ToolIcon } from '../components/ToolIcon'

type GitHubProfile = {
  login: string
  public_repos: number
  followers: number
  following: number
  avatar_url: string
  html_url: string
}

export function GitHubStats() {
  const username = useMemo(() => portfolio.github, [])
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!username) return
      try {
        setError(null)
        const res = await fetch(`https://api.github.com/users/${username}`)
        if (!res.ok) throw new Error(`GitHub API error (${res.status})`)
        const data = (await res.json()) as GitHubProfile
        if (!cancelled) setProfile(data)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load GitHub stats')
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [username])

  return (
    <section id="stats" className="scroll-mt-24 py-10 md:py-16">
      <SectionHeading
        eyebrow="gh api /users/:username"
        title="GitHub stats"
        subtitle="Public GitHub profile stats (placeholder username for now — replace it in `src/data/portfolio.ts`)."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-100">
              <ToolIcon tag="github" className="h-6 w-6" />
            </div>
            <div>
              <div className="font-mono text-sm text-slate-100">{username}</div>
              <div className="text-sm text-slate-300">
                {error
                  ? `Status: ${error}`
                  : profile
                    ? 'Status: online'
                    : 'Status: loading...'}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Stat label="public_repos" value={profile?.public_repos ?? '—'} />
            <Stat label="followers" value={profile?.followers ?? '—'} />
            <Stat label="following" value={profile?.following ?? '—'} />
            <Stat label="login" value={profile?.login ?? '—'} />
          </div>
        </GlassCard>

        <GlassCard>
          <div className="font-mono text-xs text-slate-400">hint</div>
          <p className="mt-3 text-sm text-slate-300">
            Update your username here:
          </p>
          <code className="mt-2 block rounded-xl border border-white/10 bg-white/5 p-3 font-mono text-[11px] text-slate-200">
            src/data/portfolio.ts → github
          </code>
        </GlassCard>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="font-mono text-[11px] text-slate-400">{label}</div>
      <div className="mt-2 font-mono text-lg text-slate-100">{value}</div>
    </div>
  )
}

