import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.25,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[rgb(var(--neon-cyan))] via-[rgb(var(--neon-green))] to-[rgb(var(--neon-blue))]"
      style={{ scaleX }}
    />
  )
}

