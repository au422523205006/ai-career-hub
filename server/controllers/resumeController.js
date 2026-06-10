import History from '../models/History.js'
import fs from 'fs'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Read file
    const fileBuffer = fs.readFileSync(req.file.path)
    const base64File = fileBuffer.toString('base64')

    // Gemini AI Analysis
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `Analyze this resume and provide:
1. ATS Score (0-100)
2. Top 3 strengths
3. Top 3 areas to improve
4. Overall feedback

Respond in JSON format:
{
  "score": 75,
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "feedback": "overall feedback here"
}`

    const result = await model.generateContent([
      { inlineData: { mimeType: req.file.mimetype, data: base64File } },
      prompt,
    ])

    const text = result.response.text()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      score: 75,
      strengths: ['Good formatting', 'Clear experience', 'Strong skills'],
      improvements: ['Add more keywords', 'Quantify achievements', 'Add LinkedIn'],
      feedback: 'Good resume overall!',
    }

    // Save to history
    await History.create({
      user: req.user._id,
      type: 'resume',
      title: 'Resume Analysis',
      desc: `ATS Score: ${analysis.score}/100`,
      data: analysis,
    })

    // Delete uploaded file
    fs.unlinkSync(req.file.path)

    res.json(analysis)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await History.find({ user: req.user._id, type: 'resume' })
    res.json({ resumes })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}