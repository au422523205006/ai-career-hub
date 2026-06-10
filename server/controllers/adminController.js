import User from '../models/User.js'
import History from '../models/History.js'

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json({ users })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalResumes = await History.countDocuments({ type: 'resume' })
    const totalInterviews = await History.countDocuments({ type: 'interview' })
    const totalRoadmaps = await History.countDocuments({ type: 'roadmap' })
    res.json({ stats: { totalUsers, totalResumes, totalInterviews, totalRoadmaps } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot delete admin' })
    }
    await user.deleteOne()
    await History.deleteMany({ user: req.params.id })
    res.json({ message: 'User deleted!' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}