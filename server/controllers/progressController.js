import Progress from "../models/Progress.js"

export const saveProgress = async (req, res) => {
  try {
    const {
      userId,
      goal,
      completedLevels,
      topic,
      completedTasks,
    } = req.body

    let progress = await Progress.findOne({ userId, goal })

    // Today's date
    const today = new Date().toISOString().split("T")[0]

    if (progress) {
      // Save roadmap progress
      if (completedLevels) {
        progress.completedLevels = completedLevels
      }

      // Save topic task progress
      if (topic && completedTasks) {
        progress.topicTasks[topic] = completedTasks
      }

      // Streak logic
      if (progress.lastActiveDate !== today) {
        progress.streak += 1
        progress.lastActiveDate = today
      }

    } else {
      progress = new Progress({
        userId,
        goal,
        completedLevels: completedLevels || [],
        topicTasks: topic
          ? { [topic]: completedTasks || [] }
          : {},
        streak: 1,
        lastActiveDate: today,
      })
    }

    await progress.save()

    res.json({
      message: "Progress saved",
      progress,
    })

  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}

export const getProgress = async (req, res) => {
  try {
    const { userId, goal } = req.query

    const progress = await Progress.findOne({
      userId,
      goal,
    })

    res.json(
      progress || {
        completedLevels: [],
        topicTasks: {},
        streak: 0,
      }
    )

  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}