import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import upload from '../middleware/upload.js'
import History from '../models/History.js'

const router = express.Router()

router.post('/analyze', protect, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

    const analysis = {
      score: Math.floor(Math.random() * 30) + 65,
      strengths: [
        'Good educational background',
        'Relevant technical skills mentioned',
        'Clear work experience section'
      ],
      improvements: [
        'Add more quantifiable achievements',
        'Include keywords from job description',
        'Add LinkedIn profile URL'
      ],
      feedback: 'Your resume shows good potential. Focus on quantifying your achievements and tailoring it for specific job roles.'
    }

    await History.create({
      user: req.user._id,
      type: 'resume',
      title: 'Resume Analysis',
      desc: 'ATS Score: ' + analysis.score + '/100',
      data: analysis,
    })

    res.json(analysis)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/all', protect, async (req, res) => {
  try {
    const resumes = await History.find({ user: req.user._id, type: 'resume' })
    res.json({ resumes })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router