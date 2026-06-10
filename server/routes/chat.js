import express from 'express'

const router = express.Router()

const getSmartReply = (message) => {
  const msg = message.toLowerCase()

  if (msg.includes('resume')) {
    return 'I can help you with your resume! Go to Resume Analyzer to upload your resume and get an ATS score with detailed feedback.'
  } else if (msg.includes('interview')) {
    return 'Great! Head to AI Interview Prep to practice with custom interview questions based on your role and experience.'
  } else if (msg.includes('roadmap')) {
    return 'I can generate a personalized career roadmap for you! Go to Roadmap Generator and enter your career goal.'
  } else if (msg.includes('job') || msg.includes('career')) {
    return 'I can help with your career journey! Use Resume Analyzer, Interview Prep, and Roadmap Generator to boost your chances.'
  } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return 'Hello! I am your AI Career Assistant. I can help you with resume analysis, interview preparation, and career roadmaps!'
  } else if (msg.includes('help')) {
    return 'I can help you with: 1) Resume Analysis 2) Interview Preparation 3) Career Roadmap. What would you like to know?'
  } else if (msg.includes('skill')) {
    return 'To improve your skills, check out the Roadmap Generator! It will give you a step-by-step learning plan based on your career goal.'
  } else if (msg.includes('salary')) {
    return 'Salary depends on your skills, experience, and location. Focus on building strong projects and practicing interviews to get the best offers!'
  } else {
    return 'That is a great question! I suggest exploring our Resume Analyzer, Interview Prep, and Roadmap Generator features to boost your career.'
  }
}

router.post('/', async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ reply: 'Message is required' })
    }

    const reply = getSmartReply(message)
    res.json({ reply })

  } catch (err) {
    res.status(500).json({ reply: 'Server error. Please try again.' })
  }
})

export default router