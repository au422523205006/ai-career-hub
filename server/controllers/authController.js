import jwt from "jsonwebtoken"
import User from "../models/User.js"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: "Email already exists" })
    }
    const user = await User.create({ name, email, password })
    const userData = { _id: user._id, name: user.name, email: user.email, role: user.role }
    res.status(201).json({ user: userData, token: generateToken(user._id) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      const userData = { _id: user._id, name: user.name, email: user.email, role: user.role }
      res.json({ user: userData, token: generateToken(user._id) })
    } else {
      res.status(401).json({ message: "Invalid email or password" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
