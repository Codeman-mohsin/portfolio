import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { portfolio } from '../data/portfolio'

type Props = {
  className?: string
}

export function TerminalHero({ className = '' }: Props) {
  const lines = useMemo(() => portfolio.terminalLines, [])
  const reduceMotion = useReducedMotion()
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

    const tick = window.setInterval(() => {
      setCharIdx((c) => {
        const current = lines[lineIdx] ?? ''
        if (c < current.length) return c + 1
        return c
      })
    }, 28)

    return () => window.clearInterval(tick)
  }, [lines, lineIdx, reduceMotion])

  useEffect(() => {
    if (reduceMotion) return

    const current = lines[lineIdx] ?? ''
    if (charIdx < current.length) return

    const pause = window.setTimeout(() => {
      setLineIdx((i) => (i + 1) % lines.length)
      setCharIdx(0)
    }, 900)

    return () => window.clearTimeout(pause)
  }, [charIdx, lineIdx, lines, reduceMotion])

  return (
    <div
      className={[
        'rounded-2xl border border-white/10 bg-[rgba(2,6,23,0.55)] p-5 font-mono text-xs backdrop-blur',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_80px_rgba(0,0,0,0.45)]',
        className,
      ].join(' ')}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        </div>
        <span className="text-slate-400">~/devops</span>
      </div>

      <div className="mt-4 space-y-2">
        {reduceMotion ? (
          <>
            {lines.slice(0, 2).map((line) => (
              <TerminalLine key={line} text={line} />
            ))}
          </>
        ) : (
          <>
            {lines.slice(0, Math.min(lineIdx, 2)).map((line) => (
              <TerminalLine key={line} text={line} />
            ))}
            <TerminalLine
              key={`${lines[lineIdx] ?? ''}-${lineIdx}`}
              text={(lines[lineIdx] ?? '').slice(0, charIdx)}
              showCursor
            />
          </>
        )}
      </div>
    </div>
  )
}

function TerminalLine({ text, showCursor }: { text: string; showCursor?: boolean }) {
  return (
    <div className="flex gap-2">
      <span className="text-[rgb(var(--neon-green))]">mohsin@linux</span>
      <span className="text-slate-500">:</span>
      <span className="text-[rgb(var(--neon-cyan))]">~</span>
      <span className="text-slate-500">$</span>
      <span className="text-slate-100">
        {text}
        {showCursor ? (
          <span className="ml-1 inline-block h-4 w-2 animate-pulse rounded-sm bg-[rgb(var(--neon-cyan))]" />
        ) : null}
      </span>
    </div>
  )
}

