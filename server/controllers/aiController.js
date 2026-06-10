import dotenv from "dotenv"
dotenv.config()

import OpenAI from "openai"

let openai

try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
} catch (err) {
  console.log("OpenAI not initialized")
}

export const explainTopic = async (req, res) => {
  const { topic } = req.body

  try {
    if (!openai) throw new Error("No API")

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Explain ${topic} in simple English with examples`
        }
      ]
    })

    return res.json({
      explanation: response.choices[0].message.content
    })

  } catch (err) {
    // 🔥 fallback (NO API version)
    return res.json({
      explanation: `${topic} is an important concept. Learn basics, understand core ideas, and practice simple examples to master it.`
    })
  }
}