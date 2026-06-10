import History from '../models/History.js'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const generateQuestions = async (req, res) => {
  try {
    const { role, experience, skills } = req.body

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `Generate 5 interview questions for:
Role: ${role}
Experience: ${experience || 'fresher'}
Skills: ${skills || 'general'}

Respond in JSON format only:
{
  "questions": ["question1", "question2", "question3", "question4", "question5"]
}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      questions: [
        'Tell me about yourself.',
        'What are your greatest strengths?',
        'Where do you see yourself in 5 years?',
        'Why do you want this role?',
        'Describe a challenging situation you overcame.',
      ],
    }

    await History.create({
      user: req.user._id,
      type: 'interview',
      title: `${role} Interview`,
      desc: '5 questions generated',
      data,
    })

    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getFeedback = async (req, res) => {
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
(Explain what is good or bad)

Improvement Tips:
(How to improve the answer)

Better Sample Answer:
(Give a short better example answer)

Rules:
- Be honest and encouraging.
- If answer is too short like "hi" or "I don't know", mention it clearly.
- Suggest STAR method if useful.
- Keep explanation beginner friendly.
- Keep response under 150 words.
`
console.log("Feedback API hit")
console.log("Question:", question)
console.log("Answer:", answer)
    const result = await model.generateContent(prompt)

    const feedback = result.response.text()

    res.json({ feedback })

  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}