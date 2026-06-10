import mongoose from 'mongoose'

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["resume", "interview", "roadmap"], required: true },
  title: { type: String, required: true },
  desc: { type: String },
  data: { type: Object },
}, { timestamps: true })

export default mongoose.model("History", historySchema)
