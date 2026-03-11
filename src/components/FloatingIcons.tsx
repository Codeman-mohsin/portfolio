import { motion, useReducedMotion } from 'framer-motion'
import { SiDocker, SiGit, SiKubernetes, SiTerraform } from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'

const ICONS = [
  { Icon: SiDocker, x: '6%', y: '28%', color: 'rgb(var(--neon-cyan))', delay: 0.1 },
  { Icon: SiKubernetes, x: '92%', y: '34%', color: 'rgb(var(--neon-blue))', delay: 0.3 },
  { Icon: VscAzure, x: '84%', y: '78%', color: 'rgb(var(--neon-cyan))', delay: 0.2 },
  { Icon: SiTerraform, x: '10%', y: '82%', color: 'rgb(var(--neon-green))', delay: 0.4 },
  { Icon: SiGit, x: '52%', y: '14%', color: 'rgb(var(--neon-green))', delay: 0.0 },
] as const

export function FloatingIcons() {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      {ICONS.map(({ Icon, x, y, color, delay }, idx) => (
        <motion.div
          key={idx}
          className="absolute opacity-[0.18]"
          style={{ left: x, top: y }}
          animate={
            reduceMotion
              ? { opacity: 0.12 }
              : {
                  y: [0, -14, 0],
                  x: [0, 10, 0],
                  rotate: [0, 2, 0],
                }
          }
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : {
                  duration: 10 + idx * 1.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay,
                }
          }
        >
          <Icon style={{ width: 34, height: 34, color, filter: 'drop-shadow(0 0 18px rgba(34,211,238,0.22))' }} />
        </motion.div>
      ))}
    </div>
  )
}

