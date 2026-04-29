import { portfolio } from './portfolio'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined
const MODEL = 'gemini-2.0-flash'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

/** Build a rich system prompt so Gemini knows everything about Mohsin. */
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
 * Call Google Gemini API with conversation history.
 * Returns the model's text response.
 */
export async function askGemini(
  userMessage: string,
  conversationHistory: GeminiMessage[]
): Promise<string> {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    throw new Error('GEMINI_API_KEY_NOT_SET')
  }

  // Gemini requires first message to be 'user' — filter out leading model messages
  const filteredHistory = conversationHistory.slice(
    conversationHistory.findIndex(m => m.role === 'user')
  )
  // Ensure alternating user/model pattern (Gemini is strict about this)
  const cleanHistory: GeminiMessage[] = []
  for (const msg of filteredHistory.length > 0 ? filteredHistory : []) {
    const lastRole = cleanHistory.length > 0 ? cleanHistory[cleanHistory.length - 1].role : null
    if (lastRole !== msg.role) {
      cleanHistory.push(msg)
    }
  }
  const contents: GeminiMessage[] = [
    ...cleanHistory,
    { role: 'user', parts: [{ text: userMessage }] },
  ]

  const body = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 300,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  }

  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Gemini API error:', res.status, err)
    throw new Error(`GEMINI_API_ERROR: ${res.status}`)
  }

  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    throw new Error('GEMINI_EMPTY_RESPONSE')
  }

  return text.trim()
}
