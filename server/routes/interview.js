import express from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'

const router = express.Router()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

router.post('/generate', async (req, res) => {
  try {
    const role = req.body.role || 'Software Developer'
    const experience = req.body.experience || 'fresher'
    const skills = req.body.skills || 'general'

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    })

    const prompt = `
Generate 5 interview questions for:
Role: ${role}
Experience: ${experience}
Skills: ${skills}

Return JSON only:
{
  "questions": [
    "question1",
    "question2",
    "question3",
    "question4",
    "question5"
  ]
}
`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)

    const data = jsonMatch
      ? JSON.parse(jsonMatch[0])
      : {
          questions: [
            `Tell me about yourself and your experience as a ${role}.`,
            'What are your greatest technical strengths?',
            'Describe a challenging project you worked on and how you solved it.',
            'Where do you see yourself in 5 years?',
            `Why do you want to work as a ${role}?`,
          ],
        }

    res.json(data)
  } catch (err) {
    res.json({
      questions: [
        'Tell me about yourself and your experience.',
        'What are your greatest technical strengths?',
        'Describe a challenging project you worked on and how you solved it.',
        'Where do you see yourself in 5 years?',
        'Why do you want this role?',
      ],
    })
  }
})

router.post('/feedback', async (req, res) => {
  try {
    const { question, answer } = req.body

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    })

    const prompt = `
You are an expert AI interview coach.

Interview Question:
${question}

Candidate Answer:
${answer}

Analyze the answer carefully.

Give response in this format:

Score: X/10

Feedback:
Explain what is good or bad.

Improvement Tips:
Give practical tips.

Better Sample Answer:
Give a short better answer.
`

    const result = await model.generateContent(prompt)

    const feedback = result.response.text()

    res.json({ feedback })

  } catch (err) {

    console.log("Gemini feedback error:", err.message)

    res.json({
      feedback: `AI failed: ${err.message}`
    })
  }
})

export default router