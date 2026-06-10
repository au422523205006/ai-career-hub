import express from "express"
import { explainTopic } from "../controllers/aiController.js"

const router = express.Router()

router.post("/explain", explainTopic)

export default router