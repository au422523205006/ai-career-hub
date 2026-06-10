import mongoose from "mongoose"

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    goal: {
      type: String,
      required: true,
    },

    completedLevels: {
      type: [Number],
      default: [],
    },

    topicTasks: {
      type: Object,
      default: {},
    },

    streak: {
      type: Number,
      default: 0,
    },

    lastActiveDate: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Progress", progressSchema)