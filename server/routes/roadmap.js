import express from "express"

const router = express.Router()

const roadmapData = {
  frontend: [
    {
      level: "HTML",
      description: "Learn structure of web pages",
      duration: "1 week",
      tasks: ["Learn basic tags", "Create a simple webpage"],
    },
    {
      level: "CSS",
      description: "Learn styling and layout",
      duration: "2 weeks",
      tasks: ["Practice Flexbox", "Design a landing page"],
    },
    {
      level: "JavaScript",
      description: "Learn programming and DOM",
      duration: "3 weeks",
      tasks: ["Learn functions", "Build calculator app"],
    },
    {
      level: "React",
      description: "Build frontend apps using components",
      duration: "1 month",
      tasks: ["Learn props and state", "Build portfolio UI"],
    },
    {
      level: "Projects",
      description: "Build real projects for portfolio",
      duration: "Ongoing",
      tasks: ["Build 2 projects", "Deploy on Vercel"],
    },
  ],
}

router.get("/", (req, res) => {
  const { goal } = req.query
  const data = roadmapData[goal] || roadmapData.frontend
  res.json(data)
})

export default router