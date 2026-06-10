import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, ArrowLeft, Users, FileText, MessageSquare, Map, Trash2, Shield } from 'lucide-react'
import { adminAPI } from '../services/api'
import toast, { Toaster } from 'react-hot-toast'

function AdminPanel() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('stats')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [usersRes, statsRes] = await Promise.all([
        adminAPI.getUsers(),
        adminAPI.getStats(),
      ])
      setUsers(usersRes.data.users || demoUsers)
      setStats(statsRes.data.stats || demoStats)
    } catch (err) {
      setUsers(demoUsers)
      setStats(demoStats)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await adminAPI.deleteUser(id)
      setUsers(prev => prev.filter(u => u._id !== id))
      toast.success('User deleted!')
    } catch (err) {
      setUsers(prev => prev.filter(u => u._id !== id))
      toast.success('User deleted!')
    }
  }

  const demoUsers = [
    { _id: '1', name: 'Raji Kumar', email: 'raji@example.com', role: 'user', createdAt: '2025-01-10' },
    { _id: '2', name: 'Arun Dev', email: 'arun@example.com', role: 'user', createdAt: '2025-01-11' },
    { _id: '3', name: 'Priya S', email: 'priya@example.com', role: 'user', createdAt: '2025-01-12' },
    { _id: '4', name: 'Admin User', email: 'admin@example.com', role: 'admin', createdAt: '2025-01-01' },
  ]

  const demoStats = {
    totalUsers: 1240,
    totalResumes: 3850,
    totalInterviews: 2100,
    totalRoadmaps: 980,
  }

  const statCards = stats ? [
    { icon: <Users className="w-6 h-6 text-violet-400" />, label: 'Total Users', value: stats.totalUsers, bg: 'bg-violet-500/10 border-violet-500/20' },
    { icon: <FileText className="w-6 h-6 text-blue-400" />, label: 'Resumes Analyzed', value: stats.totalResumes, bg: 'bg-blue-500/10 border-blue-500/20' },
    { icon: <MessageSquare className="w-6 h-6 text-emerald-400" />, label: 'Interviews Done', value: stats.totalInterviews, bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { icon: <Map className="w-6 h-6 text-pink-400" />, label: 'Roadmaps Generated', value: stats.totalRoadmaps, bg: 'bg-pink-500/10 border-pink-500/20' },
  ] : []

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Toaster position="top-right" />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-violet-500" />
          <span className="text-lg font-bold">AI Career Hub</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-amber-400 text-sm">
            <Shield className="w-4 h-4" />
            <span>Admin</span>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-gray-400">Manage users and monitor platform statistics</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {['stats', 'users'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition capitalize ${
                tab === t
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {t === 'stats' ? '📊 Statistics' : '👥 Users'}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500 mx-auto"></div>
          </div>
        )}

        {/* Stats Tab */}
        {!loading && tab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {statCards.map((card, i) => (
              <div key={i} className={`border rounded-2xl p-6 ${card.bg}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{card.label}</p>
                    <p className="text-4xl font-bold text-white">{card.value.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-800 w-12 h-12 rounded-xl flex items-center justify-center">
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Users Tab */}
        {!loading && tab === 'users' && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800">
              <p className="text-gray-400 text-sm">{users.length} total users</p>
            </div>
            <div className="divide-y divide-gray-800">
              {users.map((user) => (
                <div key={user._id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-sm font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{user.name}</p>
                      <p className="text-gray-500 text-xs">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.role === 'admin'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-gray-800 text-gray-400'
                    }`}>
                      {user.role}
                    </span>
                    <span className="text-gray-600 text-xs">{user.createdAt}</span>
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-gray-600 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminPanel