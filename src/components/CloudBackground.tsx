import { motion, useReducedMotion } from 'framer-motion'
import { FiCloud } from 'react-icons/fi'

const CLOUDS = [
  { x: '8%', y: '14%', size: 26, opacity: 0.12, delay: 0 },
  { x: '78%', y: '18%', size: 34, opacity: 0.1, delay: 0.4 },
  { x: '16%', y: '62%', size: 30, opacity: 0.1, delay: 0.2 },
  { x: '86%', y: '68%', size: 24, opacity: 0.12, delay: 0.6 },
  { x: '52%', y: '40%', size: 40, opacity: 0.08, delay: 0.1 },
] as const

export function CloudBackground() {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_50%),radial-gradient(circle_at_0%_50%,rgba(34,197,94,0.10),transparent_45%),radial-gradient(circle_at_100%_70%,rgba(59,130,246,0.10),transparent_45%)]" />

      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px]" />

      {CLOUDS.map((c, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{ left: c.x, top: c.y }}
          initial={{ opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: c.opacity }
              : { opacity: c.opacity, x: [0, 22, 0], y: [0, -10, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : {
                  duration: 16,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: c.delay,
                }
          }
        >
          <FiCloud
            className="text-[rgb(var(--neon-cyan))]"
            style={{ width: c.size, height: c.size }}
          />
        </motion.div>
      ))}
    </div>
  )
}

