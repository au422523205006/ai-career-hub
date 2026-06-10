import express from 'express'
import { getUsers, getStats, deleteUser } from '../controllers/adminController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get("/users", protect, adminOnly, getUsers)
router.get("/stats", protect, adminOnly, getStats)
router.delete("/users/:id", protect, adminOnly, deleteUser)

export default router
