import { motion } from 'framer-motion'
import {
  SiLinux,
  SiUbuntu,
  SiGit,
  SiDocker,
  SiNginx,
  SiTerraform,
  SiJenkins,
  SiReact,
  SiDjango,
} from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'

const TECHNOLOGIES = [
  { name: 'Linux', icon: SiLinux, color: 'hover:text-amber-300' },
  { name: 'Ubuntu', icon: SiUbuntu, color: 'hover:text-orange-500' },
  { name: 'Git', icon: SiGit, color: 'hover:text-red-500' },
  { name: 'Docker', icon: SiDocker, color: 'hover:text-blue-500' },
  { name: 'Nginx', icon: SiNginx, color: 'hover:text-green-500' },
  { name: 'Azure', icon: VscAzure, color: 'hover:text-blue-400' },
  { name: 'Terraform', icon: SiTerraform, color: 'hover:text-purple-500' },
  { name: 'Jenkins', icon: SiJenkins, color: 'hover:text-red-400' },
  { name: 'React', icon: SiReact, color: 'hover:text-cyan-400' },
  { name: 'Django', icon: SiDjango, color: 'hover:text-emerald-500' },
]

export function TechMarquee() {
  return (
    <div className="relative mt-12 flex w-full overflow-hidden border-y border-white/5 bg-black/20 py-6 backdrop-blur-sm sm:mt-20">
      
      {/* Left/Right Fade Gradients for smooth entrance/exit */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[rgb(var(--bg))] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[rgb(var(--bg))] to-transparent" />

      {/* Repeating Marquee Tracks */}
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 25,
        }}
      >
        {/* We repeat the array multiple times so there's never empty space as it scrolls */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-10 px-5 sm:gap-16 sm:px-8">
            {TECHNOLOGIES.map((tech) => (
              <div
                key={`${i}-${tech.name}`}
                className="group flex flex-col items-center justify-center gap-2 grayscale transition-all duration-300 hover:grayscale-0"
              >
                <tech.icon className={`h-8 w-8 text-slate-400 transition-colors sm:h-10 sm:w-10 ${tech.color}`} />
                <span className="font-mono text-[10px] text-slate-500 transition-colors group-hover:text-slate-300 sm:text-xs">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
