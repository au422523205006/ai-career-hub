import History from '../models/History.js'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { roadmapData } from "../data/roadmapData.js"
export const getRoadmap = (req, res) => {
  const { goal } = req.query

  const data = roadmapData[goal]

  if (!data) {
    return res.json({ message: "No roadmap found" })
  }

  res.json(data)
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const generateRoadmap = async (req, res) => {
  try {
    const { goal, currentLevel, timeframe } = req.body

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `Create a career roadmap for:
Goal: ${goal}
Current Level: ${currentLevel || 'beginner'}
Timeframe: ${timeframe || '3months'}

Respond in JSON format only:
{
  "title": "roadmap title",
  "steps": [
    { "title": "step title", "desc": "step description", "duration": "time needed" },
    { "title": "step title", "desc": "step description", "duration": "time needed" },
    { "title": "step title", "desc": "step description", "duration": "time needed" },
    { "title": "step title", "desc": "step description", "duration": "time needed" },
    { "title": "step title", "desc": "step description", "duration": "time needed" }
  ]
}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const roadmap = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      title: `${goal} Roadmap`,
      steps: [
        { title: 'Learn Basics', desc: 'Master fundamental concepts', duration: '2 weeks' },
        { title: 'Build Projects', desc: 'Create portfolio projects', duration: '1 month' },
        { title: 'Advanced Topics', desc: 'Deep dive into advanced concepts', duration: '3 weeks' },
        { title: 'Interview Prep', desc: 'Practice DSA and mock interviews', duration: '2 weeks' },
        { title: 'Apply for Jobs', desc: 'Polish resume and apply actively', duration: 'Ongoing' },
      ],
    }

    await History.create({
      user: req.user._id,
      type: 'roadmap',
      title: roadmap.title,
      desc: `${roadmap.steps.length} steps roadmap`,
      data: roadmap,
    })

    res.json({ roadmap })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}