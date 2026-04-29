import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getResponse, type ChatMessage } from '../data/chatEngine'
import './AiChatbot.css'

const GREETING: ChatMessage = {
  role: 'bot',
  text: `Hi there! 👋 I'm Mohsin's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch!`,
  isLocal: true,
}

const SUGGESTIONS = [
  'What are his skills?',
  'Tell me about projects',
  'How to contact him?',
  'Download resume',
]

/* ── Simple markdown-ish rendering for bold text ────────── */
function renderBotText(text: string) {
  // Convert **bold** to <strong>
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

/* ── Icons ──────────────────────────────────────────────── */

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <line x1="1" y1="1" x2="13" y2="13" />
      <line x1="13" y1="1" x2="1" y2="13" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  )
}

function BotAvatar() {
  return <span>🤖</span>
}

/* ── Typing Indicator ───────────────────────────────────── */

function TypingIndicator() {
  return (
    <div className="chatbot-msg chatbot-msg--bot">
      <div className="chatbot-msg-avatar">
        <BotAvatar />
      </div>
      <div className="chatbot-msg-bubble chatbot-typing">
        <div className="chatbot-typing-dot" />
        <div className="chatbot-typing-dot" />
        <div className="chatbot-typing-dot" />
      </div>
    </div>
  )
}

/* ── Main Component ─────────────────────────────────────── */

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: ChatMessage = { role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setShowSuggestions(false)

    // Simulate slight delay for local responses to feel natural
    const startTime = Date.now()
    const result = await getResponse(text, [...messages, userMsg])
    const elapsed = Date.now() - startTime

    // Ensure minimum "thinking" time for UX
    const minDelay = result.isLocal ? 400 : 0
    if (elapsed < minDelay) {
      await new Promise(r => setTimeout(r, minDelay - elapsed))
    }

    const botMsg: ChatMessage = { role: 'bot', text: result.text, isLocal: result.isLocal }
    setMessages(prev => [...prev, botMsg])
    setIsTyping(false)
  }, [messages])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isTyping) return
    sendMessage(trimmed)
  }

  const handleSuggestion = (text: string) => {
    if (isTyping) return
    sendMessage(text)
  }

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="chatbot-fab"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Open AI chat"
            id="chatbot-fab"
          >
            <ChatIcon />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-panel"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            id="chatbot-panel"
            onKeyDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-avatar">
                <BotAvatar />
              </div>
              <div className="chatbot-header-info">
                <div className="chatbot-header-title">Mohsin's AI Assistant</div>
                <div className="chatbot-header-status">Online</div>
              </div>
              <button
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                id="chatbot-close"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages" id="chatbot-messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chatbot-msg chatbot-msg--${msg.role === 'user' ? 'user' : 'bot'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i === messages.length - 1 ? 0.05 : 0 }}
                >
                  {msg.role === 'bot' && (
                    <div className="chatbot-msg-avatar">
                      <BotAvatar />
                    </div>
                  )}
                  <div className="chatbot-msg-bubble">
                    {msg.role === 'bot' ? renderBotText(msg.text) : msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            {showSuggestions && messages.length <= 1 && (
              <div className="chatbot-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    className="chatbot-chip"
                    onClick={() => handleSuggestion(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form className="chatbot-input-bar" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                placeholder="Ask about Mohsin..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isTyping}
                autoComplete="off"
                id="chatbot-input"
              />
              <button
                type="submit"
                className="chatbot-send"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                id="chatbot-send"
              >
                <SendIcon />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
