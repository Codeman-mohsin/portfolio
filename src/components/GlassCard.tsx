import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  className?: string
}>

export function GlassCard({ className = '', children }: Props) {
  return (
    <div
      className={[
        'rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_80px_rgba(0,0,0,0.35)]',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

