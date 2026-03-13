import { motion } from 'framer-motion'
import { useState, useRef, useEffect, type FormEvent } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { portfolio } from '../data/portfolio'

type CommandRecord = {
  type: 'input' | 'output' | 'error'
  content: React.ReactNode
}

const WELCOME_MESSAGE = (
  <div className="text-zinc-300">
    <p>Welcome to MohsinOS 22.04 LTS (GNU/Linux 5.15.0 x86_64)</p>
    <p className="mt-2 text-zinc-400">Type <span className="text-emerald-400 font-semibold">'help'</span> to see available commands.</p>
  </div>
)

export function TerminalSandbox() {
  const [history, setHistory] = useState<CommandRecord[]>([
    { type: 'output', content: WELCOME_MESSAGE }
  ])
  const [inputStr, setInputStr] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history])

  // Keep focus on input when clicking inside the terminal window
  const focusInput = () => {
    inputRef.current?.focus()
  }

  const handleCommand = (e: FormEvent) => {
    e.preventDefault()
    
    const cmd = inputStr.trim().toLowerCase()
    if (!cmd) return

    // Add exactly what the user typed to history
    const newHistory: CommandRecord[] = [...history, { type: 'input', content: cmd }]
    setInputStr('')

    // Process the command
    let output: React.ReactNode = null
    let type: 'output' | 'error' = 'output'

    switch (cmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <span className="text-cyan-400">about</span>    <span className="text-zinc-400">Display summary information</span>
            <span className="text-cyan-400">skills</span>   <span className="text-zinc-400">List technical skills</span>
            <span className="text-cyan-400">projects</span> <span className="text-zinc-400">List recent projects</span>
            <span className="text-cyan-400">contact</span>  <span className="text-zinc-400">Show contact details</span>
            <span className="text-cyan-400">resume</span>   <span className="text-zinc-400">Get a link to the resume</span>
            <span className="text-cyan-400">clear</span>    <span className="text-zinc-400">Clear terminal output</span>
            <span className="text-cyan-400">whoami</span>   <span className="text-zinc-400">Print effective userid</span>
          </div>
        )
        break
      case 'about':
        output = (
          <div className="space-y-1">
            {portfolio.about.map((line, i) => <p key={i}>{line}</p>)}
          </div>
        )
        break
      case 'skills':
        output = (
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {portfolio.skills.map((s, i) => (
              <span key={i} className="text-emerald-300">- {s.name}</span>
            ))}
          </div>
        )
        break
      case 'projects':
        output = (
          <div className="space-y-3">
            {portfolio.projects.map((p, i) => (
              <div key={i}>
                <span className="text-emerald-400 font-semibold">{p.name}</span>
                <p className="text-zinc-400 mt-1">{p.description}</p>
              </div>
            ))}
          </div>
        )
        break
      case 'contact':
        output = (
          <div>
            <p>Email: <a href={`mailto:${portfolio.email}`} className="text-cyan-400 underline">{portfolio.email}</a></p>
            <p>LinkedIn: <a href={`https://${portfolio.linkedin}`} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{portfolio.linkedin}</a></p>
            <p>WhatsApp: <a href="https://wa.me/918431758137" target="_blank" rel="noreferrer" className="text-cyan-400 underline">+91 8431758137</a></p>
          </div>
        )
        break
      case 'resume':
        output = (
          <p>
            You can download my resume by clicking here: <a href={portfolio.resumeHref} target="_blank" rel="noreferrer" className="text-cyan-400 underline">resume.pdf</a>
          </p>
        )
        break
      case 'whoami':
        output = "visitor"
        break
      case 'sudo':
        output = "Nice try, but this incident will be reported."
        type = "error"
        break
      case 'clear':
        setHistory([])
        return
      default:
        output = `bash: ${cmd}: command not found`
        type = 'error'
    }

    setHistory([...newHistory, { type, content: output }])
  }

  return (
    <section id="terminal" className="scroll-mt-24 py-10 md:py-16">
      <SectionHeading
        eyebrow="ls /var/log"
        title="Interactive Terminal"
        subtitle="Type commands to explore my profile. Try running 'help'."
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl"
        onClick={focusInput}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3 cursor-default">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-4 font-mono text-xs text-zinc-400">visitor@mohsin-devops:~</span>
        </div>

        {/* Terminal Body */}
        <div 
          ref={containerRef}
          className="h-[400px] overflow-y-auto p-4 sm:p-6 font-mono text-sm sm:text-base cursor-text scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        >
          {history.map((record, i) => (
            <div key={i} className="mb-2">
              {record.type === 'input' ? (
                 <div className="flex items-center">
                   <span className="mr-3 text-emerald-400 font-bold">➜</span>
                   <span className="mr-2 text-cyan-400 font-bold">~</span>
                   <span className="text-zinc-100">{record.content}</span>
                 </div>
              ) : (
                <div className={record.type === 'error' ? 'text-red-400' : 'text-zinc-300'}>
                  {record.content}
                </div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <form onSubmit={handleCommand} className="flex items-center mt-2 group relative">
             <span className="mr-3 text-emerald-400 font-bold">➜</span>
             <span className="mr-2 text-cyan-400 font-bold">~</span>
             <input
               ref={inputRef}
               type="text"
               value={inputStr}
               onChange={(e) => setInputStr(e.target.value)}
               className="flex-1 bg-transparent text-zinc-100 outline-none border-none focus:ring-0"
               autoFocus
               spellCheck={false}
               autoComplete="off"
             />
             {/* Fake cursor matching text length (purely aesthetic if we want to hide real cursor, but real cursor works fine usually) */}
          </form>
        </div>
      </motion.div>
    </section>
  )
}
