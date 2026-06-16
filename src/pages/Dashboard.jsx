import { useEffect, useState } from 'react'
import {
  FaReact,
  FaJs,
  FaDatabase,
} from 'react-icons/fa'
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
  const userId = user?._id

  const goal = 'frontend'

  useEffect(() => {
    axios
      .get(`http://ai-career-hub-backend.onrender.com/api/progress?userId=${userId}&goal=${goal}`)
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

  
  const totalSteps = progress?.roadmap?.length || 5
  
  const stepPercent = completedLevels.length * 20


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
      {/* Navbar */}
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

      {/* Welcome */}
<div className="mb-10">
  <h1 className="text-4xl font-bold mb-2 animate-pulse">
    Welcome back,{' '}
    <span className="text-violet-400">
      {user?.name || 'User'}
    </span>{' '}
    👋
  </h1>

  <p className="text-gray-400">
    What would you like to work on today?
  </p>
</div>

    

        {/* Hero Banner */}
        <div className="mb-12 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-3xl p-8 shadow-xl hover:scale-[1.02]
         hover:shadow-2xl
         hover:shadow-violet-500/30
         transition-all duration-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-3">
                🚀 Build Your Dream Career
              </h2>

              <p className="text-lg text-gray-100 max-w-2xl">
                Learn in-demand skills, analyze your resume, prepare for
                interviews, and follow personalized AI-powered roadmaps.
              </p>

              <div className="flex gap-3 mt-6 flex-wrap">
                <button
                  onClick={() => navigate('/roadmap')}
                  className="bg-white text-black px-5 py-3 rounded-xl font-semibold"
                >
                  Start Learning
                </button>

                <button
                  onClick={() => navigate('/resume')}
                  className="border border-white px-5 py-3 rounded-xl"
                >
                  Analyze Resume
                </button>
              </div>
            </div>

            <div className="text-center">
              <div className="text-7xl">🎯</div>
              <p className="text-gray-100 mt-2">
                Success = Consistency + Learning
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5 hover:-translate-y-2
hover:border-orange-400
hover:shadow-xl
hover:shadow-orange-500/20
transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-6 h-6 text-orange-400" />
              <h3 className="font-semibold">Learning Streak</h3>
            </div>

            <p className="text-3xl font-bold text-orange-400">
              {streak} days
            </p>

            <p className="text-gray-400 text-sm mt-1">
              Keep learning daily 🔥
            </p>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 hover:border-emerald-400
hover:shadow-xl
hover:shadow-emerald-500/20
transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              <h3 className="font-semibold">Roadmap Progress</h3>
            </div>

            <p className="text-3xl font-bold text-emerald-400">
              {stepPercent}%
            </p>

            <p className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5
           hover:-translate-y-2
hover:border-blue-400
hover:shadow-xl
hover:shadow-blue-500/20
transition-all duration-300">
              {completedLevels.length}/{totalSteps} steps completed
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 hover:-translate-y-2
hover:border-blue-400
hover:shadow-xl
hover:shadow-blue-500/20
transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-blue-400" />
              <h3 className="font-semibold">Completed Tasks</h3>
            </div>

            <p className="text-3xl font-bold text-blue-400">
              {totalTasks}
            </p>

            <p className="text-gray-400 text-sm mt-1">
              Topic tasks completed
            </p>
          </div>
        </div>

        {/* Progress */}
        
<div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-12
hover:border-violet-500
hover:shadow-xl
hover:shadow-violet-500/20
hover:-translate-y-1
transition-all duration-300">
          <div className="flex justify-between mb-2">
            <h2 className="font-semibold">
              Overall Learning Progress
            </h2>

            <span className="text-violet-400">
              {stepPercent}%
            </span>
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

        {/* Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, i) => (
            <div
              key={i}
              onClick={() => navigate(tool.path)}
              className={`${tool.bg} border ${tool.border} rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform duration-200`}
            >
              <div className="mb-4">{tool.icon}</div>

              <h3 className="text-lg font-semibold mb-2">
                {tool.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {tool.desc}
              </p>
            </div>
          ))}
        </div>

   {/* Recommended Topics */}
<div className="mt-12">
  <h2 className="text-3xl font-bold mb-6">
    Recommended Topics 📘
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    {/* React */}
    <div className="group bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-cyan-400 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg">
      <div className="flex justify-center mb-4">
        <FaReact className="text-7xl text-cyan-400 group-hover:rotate-180 transition-all duration-700" />
      </div>

      <h3 className="text-xl font-bold text-center mb-3">
        React Basics
      </h3>

      <p className="text-gray-400 text-center">
        Learn components, hooks, routing and state management.
      </p>
    </div>

    {/* JavaScript */}
    <div className="group bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-yellow-400 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg">
      <div className="flex justify-center mb-4">
        <FaJs className="text-7xl text-yellow-400 group-hover:animate-bounce" />
      </div>

      <h3 className="text-xl font-bold text-center mb-3">
        JavaScript ES6
      </h3>

      <p className="text-gray-400 text-center">
        Master modern JavaScript, async programming and APIs.
      </p>
    </div>

    {/* MongoDB */}
    <div className="group bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-green-400 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg">
      <div className="flex justify-center mb-4">
        <FaDatabase className="text-7xl text-green-400 group-hover:scale-125 transition-all duration-500" />
      </div>

      <h3 className="text-xl font-bold text-center mb-3">
        MongoDB
      </h3>

      <p className="text-gray-400 text-center">
        Learn NoSQL databases, collections and aggregation.
      </p>
    </div>

  </div>
</div>
    <div
  className="
    mt-16
    bg-gradient-to-r
    from-violet-600
    via-purple-600
    to-blue-600
    rounded-3xl
    p-10
    text-center
    shadow-xl
    hover:shadow-violet-500/30
    hover:scale-[1.02]
    transition-all
    duration-500
    group
    cursor-pointer
  "
>
  
  <div className="text-7xl mb-4 animate-pulse hover:scale-125 transition duration-500">
  🚀
</div>

  <h2
    className="
      text-4xl
      font-bold
      mb-3
      group-hover:tracking-wider
      transition-all
      duration-500
    "
  >
    Keep Learning!
  </h2>

  <p className="text-gray-100 text-lg max-w-2xl mx-auto">
    Every small step you complete today brings you closer to your dream career.
    Stay consistent, stay curious, and keep growing.
  </p>

  <button
    onClick={() => navigate('/roadmap')}
    className="
      mt-10
      px-6
      py-3
      bg-white
      text-black
      font-semibold
      rounded-xl
      hover:scale-110
      transition-all
      duration-300
    "
  >
    Continue Journey →
  </button>
</div>
      
        {/* Resources */}
        <div className="mt-10 ">
          <h2 className="text-2xl font-bold mb-4 transition-all
">
            Useful Resources 🔗
          </h2>

          <div className="grid md:grid-cols-2 gap-4 uration-300
hover:-translate-y-2
hover:border-violet-500
hover:shadow-xl
hover:shadow-violet-500/20
hover:bg-gray-800">
            <a
              href="https://roadmap.sh"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 "
            >
              🗺️ Roadmap.sh
            </a>

            <a
              href="https://www.freecodecamp.org"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-900 border border-gray-800 rounded-xl p-5"
            >
              💻 FreeCodeCamp
            </a>

            <a
              href="https://developer.mozilla.org"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-900 border border-gray-800 rounded-xl p-5"
            >
              📚 MDN Web Docs
            </a>

            <a
              href="https://www.geeksforgeeks.org"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-900 border border-gray-800 rounded-xl p-5"
            >
              🎯 GeeksforGeeks
            </a>
          </div>
        </div>


       <footer className="mt-20 border-t border-gray-800 pt-10 pb-8 text-center px-4">
  <h3 className="text-xl sm:text-2xl font-bold text-violet-400 mb-2">
    AI Career Hub
  </h3>

  <p className="text-gray-400 text-sm sm:text-base">
    Your AI-Powered Career Growth Platform
  </p>

  <p className="text-gray-500 text-xs sm:text-sm mt-3 px-2 max-w-xl mx-auto">
    Built with React, Node.js, MongoDB & Gemini AI
  </p>

  <p className="text-gray-600 text-sm mt-4">
    Made with ❤️ by{" "}
    <span className="text-violet-400 font-medium">
      Rajalakshmi
    </span>
  </p>

  <p className="text-gray-700 text-xs mt-3">
    © 2026 AI Career Hub. All Rights Reserved.
  </p>
</footer>

       
      </div>
  
  )
}

export default Dashboard