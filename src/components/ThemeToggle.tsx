import { motion } from 'framer-motion'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../theme/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-slate-200 backdrop-blur transition hover:bg-white/10"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <FiMoon /> : <FiSun />}
      <span>{isDark ? 'dark' : 'light'}</span>
    </motion.button>
  )
}

