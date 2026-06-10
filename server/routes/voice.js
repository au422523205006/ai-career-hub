import express from "express"
import multer from "multer"
import fs from "fs"
import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const router = express.Router()
const upload = multer({ dest: "uploads/audio/" })

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const getSmartReply = (message = "") => {
  const msg = message.toLowerCase()

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello! I am your AI Career Coach. How can I help you today?"
  }

  if (msg.includes("resume")) {
    return "I can help you with resume analysis and ATS improvement."
  }

  if (msg.includes("interview")) {
    return "I can help you practice interview questions."
  }

  if (msg.includes("roadmap")) {
    return "I can create a career roadmap for your goal."
  }

  return "I heard you. Ask me about resume, interview, roadmap, skills, or projects."
}

router.post("/", upload.single("audio"), async (req, res) => {
  try {
    console.log("Voice API hit")

    if (!req.file) {
      return res.status(400).json({ reply: "Audio file is required" })
    }

    console.log("Audio file:", req.file.path)

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "whisper-1",
    })

    fs.unlinkSync(req.file.path)

    const text = transcription.text || ""
    console.log("Transcript:", text)

    const reply = getSmartReply(text)

    return res.json({
      transcript: text,
      reply,
    })
  } catch (err) {
    console.error("Voice route error:", err)

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    return res.status(500).json({
      transcript: "",
      reply: "Voice processing failed. Check backend terminal error.",
    })
  }
})

export default router