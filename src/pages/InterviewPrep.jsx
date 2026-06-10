import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, ArrowLeft, Send, RefreshCw, MessageSquare } from 'lucide-react'
import { interviewAPI } from '../services/api'
import toast, { Toaster } from 'react-hot-toast'

function InterviewPrep() {
  const navigate = useNavigate()
  const [step, setStep] = useState('setup')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ role: '', experience: '', skills: '' })
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [feedbackLoading, setFeedbackLoading] = useState(false)

  const handleGenerate = async () => {
    if (!form.role.trim()) {
      toast.error('Please enter job role!')
      return
    }

    setLoading(true)

    try {
      const res = await interviewAPI.generate(form)

      setQuestions(
        res.data.questions || [
          'Tell me about yourself and your experience.',
          'What are your greatest strengths?',
          'Where do you see yourself in 5 years?',
          'Why do you want this role?',
          'Describe a challenging situation you overcame.',
        ]
      )

      setStep('interview')
      toast.success('Questions generated!')
    } catch (err) {
      console.log('Question generation error:', err)

      setQuestions([
        'Tell me about yourself and your experience.',
        'What are your greatest strengths?',
        'Where do you see yourself in 5 years?',
        'Why do you want this role?',
        'Describe a challenging situation you overcame.',
      ])

      setStep('interview')
      toast.error('Using default questions')
    } finally {
      setLoading(false)
    }
  }

  const handleFeedback = async () => {
    if (!answer.trim()) {
      toast.error('Please write your answer first!')
      return
    }

    setFeedbackLoading(true)

    try {
      const res = await interviewAPI.feedback({
        question: questions[current],
        answer,
      })

      setFeedback(
        res.data.feedback ||
          'No feedback received from AI. Please try again.'
      )
    } catch (err) {
      console.log('Feedback error:', err)

      setFeedback(
        `Score: 1/10

Feedback:
Your answer is too short or not specific enough for an interview.

Improvement Tips:
Mention your education, skills, projects, and career goal. Try to answer in 4-6 lines.

Better Sample Answer:
I am a pre-final year IT student learning full-stack development. I have built MERN projects and I am improving my DSA and interview skills. I am looking for an opportunity where I can apply my technical skills and learn from real-world projects.`
      )
    } finally {
      setFeedbackLoading(false)
    }
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setAnswer('')
      setFeedback(null)
    } else {
      setStep('done')
    }
  }

  const handleRestart = () => {
    setStep('setup')
    setQuestions([])
    setCurrent(0)
    setAnswer('')
    setFeedback(null)
    setForm({ role: '', experience: '', skills: '' })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Toaster position="top-right" />

      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-violet-500" />
          <span className="text-lg font-bold">AI Career Hub</span>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {step === 'setup' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">AI Interview Prep</h1>
              <p className="text-gray-400">
                Tell us about the role and we&apos;ll generate custom interview questions
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Job Role *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Experience Level
                </label>
                <select
                  value={form.experience}
                  onChange={(e) =>
                    setForm({ ...form, experience: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition"
                >
                  <option value="">Select level</option>
                  <option value="fresher">Fresher</option>
                  <option value="junior">Junior (1-2 years)</option>
                  <option value="mid">Mid (3-5 years)</option>
                  <option value="senior">Senior (5+ years)</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Key Skills
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, MongoDB"
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 py-3 rounded-xl font-semibold transition mt-2"
              >
                {loading ? 'Generating Questions...' : 'Generate Interview Questions'}
              </button>
            </div>
          </div>
        )}

        {step === 'interview' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold">Interview Session</h1>
              <span className="text-gray-400 text-sm">
                {current + 1} / {questions.length}
              </span>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
              <div
                className="bg-violet-500 h-2 rounded-full transition-all"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" />
                <p className="text-white font-medium leading-relaxed">
                  {questions[current]}
                </p>
              </div>
            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={5}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition resize-none mb-4"
            />

            {feedback && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
                <p className="text-blue-300 text-sm font-medium mb-1">
                  AI Feedback
                </p>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {feedback}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              {!feedback ? (
                <button
                  onClick={handleFeedback}
                  disabled={feedbackLoading}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-3 rounded-xl font-medium transition"
                >
                  <Send className="w-4 h-4" />
                  {feedbackLoading ? 'Getting Feedback...' : 'Get AI Feedback'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-violet-600 hover:bg-violet-700 py-3 rounded-xl font-medium transition"
                >
                  {current < questions.length - 1
                    ? 'Next Question →'
                    : 'Finish Interview'}
                </button>
              )}
            </div>
          </div>
        )}

        {step === 'done' && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold mb-4">Interview Complete!</h2>
            <p className="text-gray-400 mb-8">
              Great job! Keep practicing to improve your confidence.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-medium transition"
              >
                <RefreshCw className="w-4 h-4" /> Practice Again
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="border border-gray-700 hover:border-gray-500 px-6 py-3 rounded-xl font-medium transition text-gray-400 hover:text-white"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewPrep