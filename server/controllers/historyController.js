import History from '../models/History.js'

export const getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json({ history })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteHistory = async (req, res) => {
  try {
    const item = await History.findById(req.params.id)
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    await item.deleteOne()
    res.json({ message: "Deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
