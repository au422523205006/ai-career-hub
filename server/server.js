import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import mongoose from 'mongoose'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import resumeRoutes from './routes/resume.js'
import interviewRoutes from './routes/interview.js'
import roadmapRoutes from './routes/roadmap.js'
import historyRoutes from './routes/history.js'
import adminRoutes from './routes/admin.js'
import chatRoutes from './routes/chat.js'
//import voiceRoutes from "./routes/voice.js"
import progressRoutes from "./routes/progress.js"
import aiRoutes from "./routes/ai.js"

console.log("OPENAI KEY LOADED:", process.env.OPENAI_API_KEY ? "YES" : "NO")

const app = express()

app.use(cors({ origin: "http://localhost:5174","https://ai-career-hub-ten.vercel.app", credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"))

app.use("/api/progress", progressRoutes)
app.use("/api/ai", aiRoutes)
//app.use("/api/voice", voiceRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/resume", resumeRoutes)
app.use("/api/interview", interviewRoutes)
app.use("/api/roadmap", roadmapRoutes)
app.use("/api/history", historyRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/chat", chatRoutes)

app.get("/", (req, res) => {
  res.send("AI Career Hub Backend Running 🚀")
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port " + (process.env.PORT || 5000))
    })
  })
  .catch((err) => {
    console.error("MongoDB Error:", err.message)
  })