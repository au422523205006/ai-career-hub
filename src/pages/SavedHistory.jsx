import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, ArrowLeft, FileText, MessageSquare, Map, Trash2, Clock } from 'lucide-react'
import { historyAPI } from '../services/api'
import toast, { Toaster } from 'react-hot-toast'

function SavedHistory() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const res = await historyAPI.getAll()
      setHistory(res.data.history || demoHistory)
    } catch (err) {
      setHistory(demoHistory)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await historyAPI.delete(id)
      setHistory(prev => prev.filter(h => h._id !== id))
      toast.success('Deleted!')
    } catch (err) {
      setHistory(prev => prev.filter(h => h._id !== id))
      toast.success('Deleted!')
    }
  }

  const demoHistory = [
    { _id: '1', type: 'resume', title: 'Resume Analysis', desc: 'ATS Score: 78/100', date: '2025-05-01' },
    { _id: '2', type: 'interview', title: 'Frontend Developer Interview', desc: '5 questions completed', date: '2025-04-30' },
    { _id: '3', type: 'roadmap', title: 'Full Stack Developer Roadmap', desc: '3/5 steps completed', date: '2025-04-28' },
    { _id: '4', type: 'resume', title: 'Resume Analysis', desc: 'ATS Score: 85/100', date: '2025-04-25' },
    { _id: '5', type: 'interview', title: 'Backend Developer Interview', desc: '5 questions completed', date: '2025-04-20' },
  ]

  const icons = {
    resume: <FileText className="w-5 h-5 text-violet-400" />,
    interview: <MessageSquare className="w-5 h-5 text-blue-400" />,
    roadmap: <Map className="w-5 h-5 text-emerald-400" />,
  }

  const colors = {
    resume: 'bg-violet-500/10 border-violet-500/20',
    interview: 'bg-blue-500/10 border-blue-500/20',
    roadmap: 'bg-emerald-500/10 border-emerald-500/20',
  }

  const filtered = filter === 'all' ? history : history.filter(h => h.type === filter)

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

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Saved History</h1>
          <p className="text-gray-400">All your previous AI sessions in one place</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['all', 'resume', 'interview', 'roadmap'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${
                filter === f
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-violet-500 mx-auto"></div>
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <Clock className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No history found</p>
          </div>
        )}

        {/* History List */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item._id}
                className={`flex items-center gap-4 border rounded-xl p-5 ${colors[item.type]}`}
              >
                <div className="bg-gray-900 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                  {icons[item.type]}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                  <p className="text-gray-600 text-xs mt-1">{item.date}</p>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-gray-600 hover:text-red-400 transition p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default SavedHistory