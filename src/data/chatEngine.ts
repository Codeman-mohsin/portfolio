import { portfolio } from './portfolio'
import { askGemini, type GeminiMessage } from './gemini'

/* ── Intent definitions ─────────────────────────────────── */

type Intent =
  | 'greeting'
  | 'about'
  | 'skills'
  | 'projects'
  | 'contact'
  | 'resume'
  | 'location'
  | 'journey'
  | 'tools'
  | 'thanks'
  | 'name'

const INTENT_KEYWORDS: Record<Intent, string[]> = {
  greeting: ['hi', 'hello', 'hey', 'hola', 'sup', 'yo', 'greetings', 'good morning', 'good evening', 'good afternoon'],
  about: ['about him', 'who is', 'introduce', 'yourself', 'summary', 'bio', 'background'],
  skills: ['skills', 'skill', 'tech stack', 'proficient', 'expertise', 'competencies'],
  projects: ['projects', 'project', 'flexwork', 'gazette', 'lbs'],
  contact: ['contact', 'email', 'reach', 'hire', 'connect', 'linkedin', 'whatsapp', 'phone'],
  resume: ['resume', 'cv', 'download resume', 'pdf'],
  location: ['location', 'where is he', 'based', 'city', 'bangalore'],
  journey: ['journey', 'learning path', 'roadmap', 'growth'],
  tools: ['tools', 'what tools'],
  thanks: ['thanks', 'thank', 'thx', 'appreciate', 'helpful'],
  name: ['what is his name', 'what\u0027s his name'],
}

/* ── Local response builders ────────────────────────────── */

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const LOCAL_RESPONSES: Record<Intent, () => string> = {
  greeting: () =>
    randomPick([
      `Hey there! 👋 I'm Mohsin's AI assistant. Ask me anything about his skills, projects, or experience!`,
      `Hello! Welcome to Mohsin's portfolio. How can I help you today? Try asking about his skills or projects!`,
      `Hi! 😊 I'm here to help you learn about Mohsin. What would you like to know?`,
    ]),

  about: () =>
    `${portfolio.about.join(' ')}\n\nHe's based in **${portfolio.location}** and is passionate about DevOps, cloud, and automation.`,

  skills: () => {
    const top = portfolio.skills
      .slice()
      .sort((a, b) => b.level - a.level)
      .slice(0, 5)
    const list = top.map(s => `• **${s.name}** — ${s.level}%`).join('\n')
    return `Here are Mohsin's top skills:\n\n${list}\n\nHe also has experience with ${portfolio.skills.length - 5} more technologies!`
  },

  projects: () => {
    const list = portfolio.projects
      .map(p => `🔹 **${p.name}** — ${p.description.slice(0, 100)}…\n   Tech: ${p.tech.join(', ')}`)
      .join('\n\n')
    return `Here are Mohsin's projects:\n\n${list}`
  },

  contact: () =>
    `You can reach Mohsin through:\n\n📧 **Email:** ${portfolio.email}\n🔗 **LinkedIn:** ${portfolio.linkedin}\n📍 **Location:** ${portfolio.location}\n\nHe's open to DevOps and Linux admin roles and always happy to connect!`,

  resume: () =>
    `You can download Mohsin's resume here: [📄 Resume PDF](${portfolio.resumeHref})\n\nFeel free to reach out after reviewing it!`,

  location: () =>
    `Mohsin is based in **${portfolio.location}**. He's available for both remote and on-site opportunities.`,

  journey: () => {
    const list = portfolio.journey
      .map(j => `🚀 **${j.title}** — ${j.desc}`)
      .join('\n')
    return `Here's Mohsin's learning journey:\n\n${list}`
  },

  tools: () => {
    const list = portfolio.tools.map(t => t.name).join(', ')
    return `Mohsin works with: **${list}**.\n\nHe's continuously expanding his DevOps toolkit!`
  },

  thanks: () =>
    randomPick([
      `You're welcome! 😊 Feel free to ask anything else about Mohsin.`,
      `Happy to help! Let me know if there's anything else you'd like to know.`,
      `Glad I could help! Don't hesitate to reach out to Mohsin directly if you'd like to connect.`,
    ]),

  name: () =>
    `His name is **${portfolio.name}**. He's a ${portfolio.title} based in ${portfolio.location}.`,
}

/* ── Intent detection ───────────────────────────────────── */

function detectIntent(input: string): Intent | null {
  const lower = input.toLowerCase().trim()
  const wordCount = lower.split(/\s+/).length

  // Very short inputs (1-3 words) — match greetings exactly
  if (wordCount <= 3) {
    for (const kw of INTENT_KEYWORDS.greeting) {
      if (lower === kw || lower.startsWith(kw + ' ') || lower.startsWith(kw + '!')) {
        return 'greeting'
      }
    }
    for (const kw of INTENT_KEYWORDS.thanks) {
      if (lower.includes(kw)) return 'thanks'
    }
  }

  // Score each intent by keyword matches
  let bestIntent: Intent | null = null
  let bestScore = 0

  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS) as [Intent, string[]][]) {
    let score = 0
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        score += kw.length
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestIntent = intent
    }
  }

  // Use ratio of score to word count — direct questions have high ratios,
  // conversational questions have low ratios and should go to Gemini
  const ratio = bestScore / wordCount

  // Short direct queries: "what are his skills" → ratio ~1.25 → local
  // Long conversational: "what makes mohsin good for devops role" → ratio ~0.85 → Gemini
  const threshold = wordCount <= 5 ? 1.0 : wordCount <= 8 ? 1.5 : 2.0

  return ratio >= threshold ? bestIntent : null
}

/* ── Public API ─────────────────────────────────────────── */

export type ChatMessage = {
  role: 'user' | 'bot'
  text: string
  isLocal?: boolean // true if answered locally
}

/**
 * Process user input: try local matching first, fall back to Gemini.
 * Returns the bot's response text.
 */
export async function getResponse(
  userMessage: string,
  history: ChatMessage[]
): Promise<{ text: string; isLocal: boolean }> {
  // 1. Try local intent matching
  const intent = detectIntent(userMessage)
  if (intent) {
    return { text: LOCAL_RESPONSES[intent](), isLocal: true }
  }

  // 2. Fall back to Gemini
  try {
    // Convert chat history to Gemini format (last 10 messages for context)
    const geminiHistory: GeminiMessage[] = history
      .slice(-10)
      .map(m => ({
        role: m.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.text }],
      }))

    const text = await askGemini(userMessage, geminiHistory)
    return { text, isLocal: false }
  } catch (err) {
    const error = err as Error
    if (error.message === 'GEMINI_API_KEY_NOT_SET') {
      return {
        text: `I can answer common questions about Mohsin's skills, projects, contact info, and more! Try asking:\n\n• "What are his skills?"\n• "Tell me about his projects"\n• "How can I contact him?"`,
        isLocal: true,
      }
    }
    return {
      text: `I'm having trouble connecting right now. But I can still help! Try asking about Mohsin's **skills**, **projects**, **contact info**, or **experience**.`,
      isLocal: true,
    }
  }
}
