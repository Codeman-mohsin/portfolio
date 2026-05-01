import { portfolio } from './portfolio'

const API_KEY = import.meta.env.VITE_GROQ_API_KEY as string | undefined
const MODEL = 'llama-3.1-8b-instant'
const API_URL = 'https://api.groq.com/openai/v1/chat/completions'

/** Build a rich system prompt so the LLM knows everything about Mohsin. */
const SYSTEM_PROMPT = `You are an AI assistant embedded in Shaik Mohsin's portfolio website.
Your role is to help visitors learn about Mohsin — answer their questions warmly, concisely, and professionally.
Always speak in third person about Mohsin (e.g. "Mohsin has experience with…") unless the visitor asks you to speak as Mohsin.
Keep responses short (2-4 sentences max) unless more detail is requested.
Use markdown-style formatting sparingly — no headers, but bold for emphasis is fine.
If asked something unrelated to Mohsin or tech, politely redirect.

Here is everything you know about Mohsin:

**Name:** ${portfolio.name}
**Title:** ${portfolio.title}
**Location:** ${portfolio.location}
**Email:** ${portfolio.email}
**LinkedIn:** ${portfolio.linkedin}
**GitHub:** ${portfolio.github}

**About:**
${portfolio.about.join('\n')}

**Skills:**
${portfolio.skills.map(s => `- ${s.name} (proficiency: ${s.level}%)`).join('\n')}

**Projects:**
${portfolio.projects.map(p => `- **${p.name}**: ${p.description} | Tech: ${p.tech.join(', ')} | GitHub: ${p.githubUrl}`).join('\n')}

**Tools & Technologies:** ${portfolio.tools.map(t => t.name).join(', ')}

**Learning Journey:**
${portfolio.journey.map(j => `- **${j.title}**: ${j.desc}`).join('\n')}
`

export type GeminiMessage = {
  role: 'user' | 'model'
  parts: { text: string }[]
}

/**
 * Call Groq API with conversation history.
 * Returns the model's text response.
 */
export async function askGemini(
  userMessage: string,
  conversationHistory: GeminiMessage[]
): Promise<string> {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    throw new Error('API_KEY_NOT_SET')
  }

  // Convert Gemini format to OpenAI/Groq format
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.map(m => ({
      role: m.role === 'model' ? 'assistant' : 'user',
      content: m.parts[0].text,
    })),
    { role: 'user', content: userMessage },
  ]

  const body = {
    model: MODEL,
    messages,
    temperature: 0.7,
    max_tokens: 300,
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Groq API error:', res.status, err)
    throw new Error(`API_ERROR: ${res.status}`)
  }

  const data = await res.json()
  const text = data?.choices?.[0]?.message?.content

  if (!text) {
    throw new Error('EMPTY_RESPONSE')
  }

  return text.trim()
}
