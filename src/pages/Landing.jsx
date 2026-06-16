import { useNavigate } from 'react-router-dom'
import { Brain, FileText, Map, MessageSquare, ChevronRight, Star } from 'lucide-react'

function Landing() {
  const navigate = useNavigate()

  const features = [
    {
      icon: <FileText className="w-6 h-6 text-violet-400" />,
      title: 'Resume Analyzer',
      desc: 'AI-powered resume analysis with ATS score and suggestions',
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
      title: 'AI Interview Prep',
      desc: 'Practice with AI-generated questions and get instant feedback',
    },
    {
      icon: <Map className="w-6 h-6 text-emerald-400" />,
      title: 'Roadmap Generator',
      desc: 'Personalized learning roadmap based on your career goals',
    },
    {
      icon: <Brain className="w-6 h-6 text-pink-400" />,
      title: 'Smart Dashboard',
      desc: 'Track your progress and manage all your career tools',
    },
  ]

  const stats = [
    { value: '10K+', label: 'Users' },
    { value: '95%', label: 'Success Rate' },
    { value: '50K+', label: 'Resumes Analyzed' },
    { value: '4.9', label: 'Rating' },
  ]

  return (
    
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Brain className="w-7 h-7 text-violet-500" />
          <span className="text-xl font-bold">AI Career Hub</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/auth')}
            className="text-gray-400 hover:text-white transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg font-medium transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-24 max-w-4xl mx-auto">
        <div className="bg-violet-500/10 text-violet-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-violet-500/20">
          🚀 AI-Powered Career Platform
        </div>
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Build Your Dream Career
          <span className="text-violet-500"> with AI</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl">
          Analyze your resume, prepare for interviews, and get a personalized
          roadmap — all powered by cutting-edge AI.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/auth')}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-semibold text-lg transition"
          >
            Get Started Free <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="px-6 py-3 rounded-xl font-semibold text-lg border border-gray-700 hover:border-gray-500 transition"
          >
            Login
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-6 mb-20">
        {stats.map((s, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-violet-400">{s.value}</div>
            <div className="text-gray-400 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to
          <span className="text-violet-500"> Succeed</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 hover:border-violet-500/50 rounded-xl p-6 transition cursor-pointer"
              onClick={() => navigate('/auth')}
            >
              <div className="bg-gray-800 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 mb-24 text-center">
        <div className="bg-violet-600/10 border border-violet-500/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="text-gray-400 mb-8">
            Join thousands of professionals who landed their dream jobs with AI Career Hub.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-xl font-semibold text-lg transition"
          >
            Start for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-8 py-6 text-center text-gray-500 text-sm">
        © 2025 AI Career Hub. Built with ❤️ using React + AI
      </footer>

    </div>
  )
}

export default Landing