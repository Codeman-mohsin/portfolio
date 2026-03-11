import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  eyebrow?: string
  title: string
  subtitle?: string
}>

export function SectionHeading({ eyebrow, title, subtitle, children }: Props) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <div className="font-mono text-xs text-slate-400">{eyebrow}</div>
      ) : null}
      <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-100 md:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 max-w-2xl text-pretty text-sm text-slate-300 md:text-base">
          {subtitle}
        </p>
      ) : null}
      {children}
    </div>
  )
}

