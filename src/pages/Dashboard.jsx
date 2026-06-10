import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Brain,
  FileText,
  Map,
  MessageSquare,
  Clock,
  LogOut,
  User,
  Flame,
  BarChart3,
  CheckCircle,
} from 'lucide-react'
import axios from 'axios'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [progress, setProgress] = useState(null)

  const userId = '1'
  const goal = 'frontend'

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/progress?userId=${userId}&goal=${goal}`)
      .then((res) => {
        setProgress(res.data)
      })
      .catch((err) => {
        console.log('Dashboard progress error:', err)
      })
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const completedLevels = progress?.completedLevels || []
  const topicTasks = progress?.topicTasks || {}
  const streak = progress?.streak || 0

  const totalTasks = Object.values(topicTasks).reduce(
    (sum, tasks) => sum + tasks.length,
    0
  )

  const totalSteps = 5
  const stepPercent = Math.round((completedLevels.length / totalSteps) * 100)

  const tools = [
    {
      icon: <FileText className="w-7 h-7 text-violet-400" />,
      title: 'Resume Analyzer',
      desc: 'Analyze your resume with AI and get ATS score',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
      path: '/resume',
    },
    {
      icon: <MessageSquare className="w-7 h-7 text-blue-400" />,
      title: 'AI Interview Prep',
      desc: 'Practice interview questions with AI feedback',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      path: '/interview',
    },
    {
      icon: <Map className="w-7 h-7 text-emerald-400" />,
      title: 'Roadmap Generator',
      desc: 'Get a personalized career learning roadmap',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      path: '/roadmap',
    },
    {
      icon: <Clock className="w-7 h-7 text-pink-400" />,
      title: 'Saved History',
      desc: 'View all your previous AI sessions',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20',
      path: '/history',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-violet-500" />
          <span className="text-lg font-bold">AI Career Hub</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <User className="w-4 h-4" />
            <span className="text-sm">{user?.name || 'User'}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back,{' '}
            <span className="text-violet-400">{user?.name || 'User'}</span> 👋
          </h1>
          <p className="text-gray-400">What would you like to work on today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-6 h-6 text-orange-400" />
              <h3 className="font-semibold">Learning Streak</h3>
            </div>
            <p className="text-3xl font-bold text-orange-400">{streak} days</p>
            <p className="text-gray-400 text-sm mt-1">Keep learning daily 🔥</p>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              <h3 className="font-semibold">Roadmap Progress</h3>
            </div>
            <p className="text-3xl font-bold text-emerald-400">
              {stepPercent}%
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {completedLevels.length}/{totalSteps} steps completed
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-blue-400" />
              <h3 className="font-semibold">Completed Tasks</h3>
            </div>
            <p className="text-3xl font-bold text-blue-400">{totalTasks}</p>
            <p className="text-gray-400 text-sm mt-1">
              Topic tasks completed
            </p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-8">
          <div className="flex justify-between mb-2">
            <h2 className="font-semibold">Overall Learning Progress</h2>
            <span className="text-violet-400">{stepPercent}%</span>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-violet-500 h-2 rounded-full transition-all"
              style={{ width: `${stepPercent}%` }}
            ></div>
          </div>

          <button
            onClick={() => navigate('/roadmap')}
            className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-xl text-sm"
          >
            Continue Learning
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, i) => (
            <div
              key={i}
              onClick={() => navigate(tool.path)}
              className={`${tool.bg} border ${tool.border} rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform duration-200`}
            >
              <div className="mb-4">{tool.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
              <p className="text-gray-400 text-sm">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard