import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, ArrowLeft, Map, CheckCircle, Circle } from 'lucide-react'
import { roadmapAPI } from '../services/api'
import toast, { Toaster } from 'react-hot-toast'

function RoadmapGenerator() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState(null)
  const [form, setForm] = useState({ goal: '', currentLevel: '', timeframe: '' })
  const [completed, setCompleted] = useState([])

  



  const handleGenerate = async () => {
    if (!form.goal) return toast.error('Please enter your career goal!')
    setLoading(true)
    try {
      const res = await roadmapAPI.generate(form)
      setRoadmap(res.data.roadmap || defaultRoadmap(form.goal))
      toast.success('Roadmap generated!')
    } catch (err) {
      setRoadmap(defaultRoadmap(form.goal))
      toast.success('Roadmap generated!')
    } finally {
      setLoading(false)
    }
  }
  const defaultRoadmap = (goal) => {
  const userGoal = goal.toLowerCase()

  // FRONTEND
  if (
    userGoal.includes('frontend') ||
    userGoal.includes('react')
  ) {
    return {
      title: `${goal} Roadmap`,
      steps: [
        {
          title: 'HTML',
          desc: 'Learn webpage structure, tags, forms, links, images, and semantic elements.',
          duration: '1 week',
        },
        {
          title: 'CSS',
          desc: 'Learn styling, flexbox, grid, responsiveness, and animations.',
          duration: '2 weeks',
        },
        {
          title: 'JavaScript',
          desc: 'Learn DOM, functions, arrays, events, and API calls.',
          duration: '3 weeks',
        },
        {
          title: 'React',
          desc: 'Learn components, hooks, routing, and state management.',
          duration: '1 month',
        },
        {
          title: 'Projects',
          desc: 'Build and deploy frontend projects.',
          duration: 'Ongoing',
        },
      ],
    }
  }

  // BACKEND
  if (
    userGoal.includes('backend') ||
    userGoal.includes('node')
  ) {
    return {
      title: `${goal} Roadmap`,
      steps: [
        {
          title: 'Node.js',
          desc: 'Learn backend JavaScript runtime and server basics.',
          duration: '2 weeks',
        },
        {
          title: 'Express.js',
          desc: 'Build APIs, routes, middleware, and controllers.',
          duration: '2 weeks',
        },
        {
          title: 'MongoDB',
          desc: 'Learn database CRUD operations and schemas.',
          duration: '3 weeks',
        },
        {
          title: 'Authentication',
          desc: 'Learn JWT login, protected routes, and bcrypt.',
          duration: '2 weeks',
        },
        {
          title: 'Backend Projects',
          desc: 'Build and deploy backend APIs.',
          duration: 'Ongoing',
        },
      ],
    }
  }

  // MERN
  if (
    userGoal.includes('mern') ||
    userGoal.includes('full stack')
  ) {
    return {
      title: `${goal} Roadmap`,
      steps: [
        {
          title: 'Frontend Basics',
          desc: 'Learn HTML, CSS, JavaScript, and React.',
          duration: '1 month',
        },
        {
          title: 'Backend Basics',
          desc: 'Learn Node.js, Express.js, and REST APIs.',
          duration: '1 month',
        },
        {
          title: 'Database',
          desc: 'Learn MongoDB and Mongoose CRUD operations.',
          duration: '3 weeks',
        },
        {
          title: 'Authentication',
          desc: 'Implement JWT login and protected routes.',
          duration: '2 weeks',
        },
        {
          title: 'MERN Projects',
          desc: 'Build and deploy full-stack applications.',
          duration: 'Ongoing',
        },
      ],
    }
  }

  // AI / ML
  if (
    userGoal.includes('ai') ||
    userGoal.includes('machine learning')
  ) {
    return {
      title: `${goal} Roadmap`,
      steps: [
        {
          title: 'Python',
          desc: 'Learn Python basics, functions, loops, and file handling.',
          duration: '3 weeks',
        },
        {
          title: 'Math Basics',
          desc: 'Learn statistics, probability, and linear algebra basics.',
          duration: '1 month',
        },
        {
          title: 'Machine Learning',
          desc: 'Learn regression, classification, and model training.',
          duration: '1 month',
        },
        {
          title: 'Deep Learning',
          desc: 'Learn neural networks and AI frameworks.',
          duration: '1 month',
        },
        {
          title: 'AI Projects',
          desc: 'Build chatbot and prediction projects.',
          duration: 'Ongoing',
        },
      ],
    }
  }

  // DATA ANALYST
  if (userGoal.includes('data')) {
    return {
      title: `${goal} Roadmap`,
      steps: [
        {
          title: 'Python',
          desc: 'Learn Python for data analysis.',
          duration: '3 weeks',
        },
        {
          title: 'SQL',
          desc: 'Learn queries, joins, and database operations.',
          duration: '3 weeks',
        },
        {
          title: 'Data Analysis',
          desc: 'Learn Pandas, NumPy, and data cleaning.',
          duration: '1 month',
        },
        {
          title: 'Visualization',
          desc: 'Create charts and dashboards.',
          duration: '3 weeks',
        },
        {
          title: 'Data Projects',
          desc: 'Build dashboards and analytics case studies.',
          duration: 'Ongoing',
        },
      ],
    }
  }

  // DEFAULT
  return {
    title: `${goal} Roadmap`,
    steps: [
      {
        title: 'Basics',
        desc: 'Learn the fundamentals required for this career.',
        duration: '2 weeks',
      },
      {
        title: 'Core Skills',
        desc: 'Build strong understanding of important concepts.',
        duration: '1 month',
      },
      {
        title: 'Practice',
        desc: 'Practice mini tasks and exercises daily.',
        duration: '3 weeks',
      },
      {
        title: 'Projects',
        desc: 'Build real-world portfolio projects.',
        duration: '1 month',
      },
      {
        title: 'Interview Prep',
        desc: 'Prepare resume and practice interviews.',
        duration: 'Ongoing',
      },
    ],
  }
}
  
  const toggleComplete = (i) => {
    setCompleted(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Toaster position="top-right" />

      {/* Navbar */}
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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Roadmap Generator</h1>
          <p className="text-gray-400">Get a personalized step-by-step career roadmap powered by AI</p>
        </div>

        {/* Form */}
        {!roadmap && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Career Goal *</label>
              <input
                type="text"
                placeholder="e.g. Become a Full Stack Developer"
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Current Level</label>
              <select
                value={form.currentLevel}
                onChange={(e) => setForm({ ...form, currentLevel: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition"
              >
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Timeframe</label>
              <select
                value={form.timeframe}
                onChange={(e) => setForm({ ...form, timeframe: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition"
              >
                <option value="">Select timeframe</option>
                <option value="1month">1 Month</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
                <option value="1year">1 Year</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 py-3 rounded-xl font-semibold transition"
            >
              {loading ? 'Generating Roadmap...' : 'Generate My Roadmap'}
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500 mx-auto mb-4"></div>
            <p className="text-gray-400">AI is creating your roadmap...</p>
          </div>
        )}

        {/* Roadmap Result */}
        {roadmap && !loading && (
          <div>
            {/* Progress */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-lg">{roadmap.title}</h2>
                <span className="text-violet-400 text-sm">{completed.length}/{roadmap.steps.length} done</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-violet-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(completed.length / roadmap.steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

           {/* Steps */}
<div className="space-y-4 mb-6">
  {roadmap.steps.map((step, i) => (
    <div
      key={i}
      className={`bg-gray-900 border rounded-xl p-5 transition ${
        completed.includes(i)
          ? 'border-emerald-500/40 bg-emerald-500/5'
          : 'border-gray-800 hover:border-violet-500/40'
      }`}
    >
      <div className="flex items-start gap-4">
        
        {/* Complete Toggle */}
        <div
          onClick={() => toggleComplete(i)}
          className="cursor-pointer mt-0.5"
        >
          {completed.includes(i) ? (
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          ) : (
            <Circle className="w-5 h-5 text-gray-600" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3
              className={`font-medium ${
                completed.includes(i)
                  ? 'line-through text-gray-500'
                  : 'text-white'
              }`}
            >
              Step {i + 1}: {step.title}
            </h3>

            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
              {step.duration}
            </span>
          </div>

          <p className="text-gray-400 text-sm mt-1">
            {step.desc}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            
            <button
              onClick={() => toggleComplete(i)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                completed.includes(i)
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              {completed.includes(i)
                ? '✅ Completed'
                : 'Mark Complete'}
            </button>

            <button
              onClick={() =>
                navigate(`/learn/${encodeURIComponent(step.title)}`)
              }
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm transition"
            >
              Learn 📘
            </button>

          </div>
        </div>
      </div>
    </div>
  ))}
</div>

            {/* Done Message */}
            {completed.length === roadmap.steps.length && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 text-center mb-6">
                <p className="text-emerald-400 font-semibold text-lg">🎉 Roadmap Complete! You're ready!</p>
              </div>
            )}

            {/* Reset */}
            <button
              onClick={() => { setRoadmap(null); setCompleted([]); setForm({ goal: '', currentLevel: '', timeframe: '' }) }}
              className="w-full border border-gray-700 hover:border-gray-500 py-3 rounded-xl font-medium transition text-gray-400 hover:text-white"
            >
              Generate New Roadmap
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default RoadmapGenerator