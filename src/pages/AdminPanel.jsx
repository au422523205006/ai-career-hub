import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const topicData = {
  HTML: {
    explain:
      "HTML is used to create the structure of a webpage. It defines headings, paragraphs, images, links, forms, tables, and semantic sections.",
    tasks: ["Create a simple webpage", "Add image and link", "Create a contact form"],
    links: [
      { title: "MDN HTML", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content" },
      { title: "W3Schools HTML", url: "https://www.w3schools.com/html/" },
    ],
  },

  CSS: {
    explain:
      "CSS is used to style webpages. It controls colors, spacing, fonts, layouts, responsiveness, and animations.",
    tasks: ["Style a simple page", "Create a card layout", "Build responsive landing page"],
    links: [
      { title: "MDN CSS", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics" },
      { title: "W3Schools CSS", url: "https://www.w3schools.com/css/" },
    ],
  },

  JavaScript: {
    explain:
      "JavaScript adds logic and interactivity to websites. It handles events, DOM updates, functions, arrays, objects, and API calls.",
    tasks: ["Create button click event", "Build calculator", "Fetch data from API"],
    links: [
      { title: "MDN JavaScript", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting" },
      { title: "JavaScript.info", url: "https://javascript.info/" },
    ],
  },

  React: {
    explain:
      "React is a frontend library used to build reusable UI components and single-page applications using props, state, hooks, and routing.",
    tasks: ["Create components", "Practice useState and props", "Build portfolio UI"],
    links: [
      { title: "React Official Learn", url: "https://react.dev/learn" },
      { title: "W3Schools React", url: "https://www.w3schools.com/react/" },
    ],
  },

  Projects: {
    explain:
      "Projects prove your practical skills. Build real-world apps, deploy them, and add GitHub links to your resume.",
    tasks: ["Build 2 projects", "Deploy on Vercel/Render", "Add project details to resume"],
    links: [
      { title: "Vercel Docs", url: "https://vercel.com/docs" },
      { title: "Render Docs", url: "https://render.com/docs" },
    ],
  },

  "Node.js": {
    explain:
      "Node.js allows JavaScript to run on the server. It is used to build backend APIs, handle requests, and connect applications with databases.",
    tasks: ["Create simple Node server", "Read request data", "Send JSON response"],
    links: [
      { title: "Node.js Docs", url: "https://nodejs.org/en/learn" },
      { title: "W3Schools Node.js", url: "https://www.w3schools.com/nodejs/" },
    ],
  },

  "Express.js": {
    explain:
      "Express.js is a Node.js framework used to build APIs easily with routes, middleware, controllers, and request handling.",
    tasks: ["Create GET route", "Create POST route", "Use middleware"],
    links: [
      { title: "Express Official Guide", url: "https://expressjs.com/en/starter/installing.html" },
      { title: "Express Routing", url: "https://expressjs.com/en/guide/routing.html" },
    ],
  },

  MongoDB: {
    explain:
      "MongoDB is a NoSQL database that stores data as documents. In MERN apps, it is commonly used with Mongoose for CRUD operations.",
    tasks: ["Create database", "Create schema", "Perform CRUD operations"],
    links: [
      { title: "MongoDB Node.js Guide", url: "https://www.mongodb.com/docs/drivers/node/current/get-started/" },
      { title: "Mongoose Docs", url: "https://mongoosejs.com/docs/" },
    ],
  },

  Authentication: {
    explain:
      "Authentication verifies users. In full-stack apps, JWT, bcrypt, login forms, and protected routes are commonly used.",
    tasks: ["Create login API", "Hash password with bcrypt", "Protect private routes"],
    links: [
      { title: "JWT Introduction", url: "https://jwt.io/introduction" },
      { title: "bcrypt npm", url: "https://www.npmjs.com/package/bcrypt" },
    ],
  },

  "Backend Projects": {
    explain:
      "Backend projects show your ability to build APIs, connect databases, handle authentication, and deploy server applications.",
    tasks: ["Build REST API", "Add authentication", "Deploy backend"],
    links: [
      { title: "Render Deployment Docs", url: "https://render.com/docs/deploy-node-express-app" },
      { title: "Postman Learning Center", url: "https://learning.postman.com/" },
    ],
  },

  "Frontend Basics": {
    explain:
      "Frontend basics include HTML, CSS, JavaScript, and React. These skills help you build user interfaces.",
    tasks: ["Revise HTML/CSS", "Practice JavaScript", "Build React components"],
    links: [
      { title: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development" },
      { title: "React Learn", url: "https://react.dev/learn" },
    ],
  },

  "Backend Basics": {
    explain:
      "Backend basics include Node.js, Express.js, REST APIs, controllers, routes, and middleware.",
    tasks: ["Create Express server", "Build CRUD API", "Test with Postman"],
    links: [
      { title: "Node.js Learn", url: "https://nodejs.org/en/learn" },
      { title: "Express Guide", url: "https://expressjs.com/en/guide/routing.html" },
    ],
  },

  Database: {
    explain:
      "Database skills help you store, read, update, and delete application data. For MERN, MongoDB and Mongoose are important.",
    tasks: ["Design schema", "Connect MongoDB", "Perform CRUD"],
    links: [
      { title: "MongoDB University", url: "https://learn.mongodb.com/" },
      { title: "Mongoose Guide", url: "https://mongoosejs.com/docs/guide.html" },
    ],
  },

  "MERN Projects": {
    explain:
      "MERN projects combine React, Node.js, Express, and MongoDB to build full-stack applications.",
    tasks: ["Build full-stack CRUD app", "Add auth", "Deploy frontend and backend"],
    links: [
      { title: "MongoDB MERN Tutorial", url: "https://www.mongodb.com/resources/languages/mern-stack-tutorial" },
      { title: "Vercel Docs", url: "https://vercel.com/docs" },
    ],
  },

  Python: {
    explain:
      "Python is widely used for AI, data science, automation, and backend scripting. It has simple syntax and strong libraries.",
    tasks: ["Practice variables and functions", "Use lists and dictionaries", "Read/write files"],
    links: [
      { title: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/" },
      { title: "W3Schools Python", url: "https://www.w3schools.com/python/" },
    ],
  },

  "Math Basics": {
    explain:
      "Math basics for AI include linear algebra, probability, statistics, and calculus fundamentals.",
    tasks: ["Learn mean/median/mode", "Study probability basics", "Learn vectors and matrices"],
    links: [
      { title: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability" },
      { title: "Khan Academy Linear Algebra", url: "https://www.khanacademy.org/math/linear-algebra" },
    ],
  },

  "Machine Learning": {
    explain:
      "Machine Learning teaches computers to learn patterns from data. Common topics include regression, classification, clustering, and model evaluation.",
    tasks: ["Train simple regression model", "Try classification dataset", "Evaluate accuracy"],
    links: [
      { title: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
      { title: "Scikit-learn Tutorials", url: "https://scikit-learn.org/stable/tutorial/index.html" },
    ],
  },

  "Deep Learning": {
    explain:
      "Deep Learning uses neural networks to solve complex tasks like image recognition, speech, NLP, and generative AI.",
    tasks: ["Understand neural networks", "Build simple model", "Learn TensorFlow/PyTorch basics"],
    links: [
      { title: "TensorFlow Tutorials", url: "https://www.tensorflow.org/tutorials" },
      { title: "PyTorch Tutorials", url: "https://pytorch.org/tutorials/" },
    ],
  },

  "AI Projects": {
    explain:
      "AI projects show practical AI skills. Build chatbots, prediction systems, recommenders, and classification apps.",
    tasks: ["Build chatbot", "Build prediction model", "Deploy AI demo"],
    links: [
      { title: "Hugging Face Tasks", url: "https://huggingface.co/tasks" },
      { title: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
    ],
  },

  SQL: {
    explain:
      "SQL is used to query relational databases. It helps filter, join, group, and analyze structured data.",
    tasks: ["Write SELECT queries", "Practice JOIN", "Use GROUP BY"],
    links: [
      { title: "SQLBolt", url: "https://sqlbolt.com/" },
      { title: "W3Schools SQL", url: "https://www.w3schools.com/sql/" },
    ],
  },

  "Data Analysis": {
    explain:
      "Data Analysis involves cleaning, exploring, and understanding data using tools like Python, Pandas, NumPy, and SQL.",
    tasks: ["Clean dataset", "Analyze with Pandas", "Find insights"],
    links: [
      { title: "Kaggle Pandas Course", url: "https://www.kaggle.com/learn/pandas" },
      { title: "Pandas Docs", url: "https://pandas.pydata.org/docs/getting_started/index.html" },
    ],
  },

  Visualization: {
    explain:
      "Data Visualization converts data into charts and dashboards to communicate insights clearly.",
    tasks: ["Create bar chart", "Create dashboard", "Explain insights"],
    links: [
      { title: "Kaggle Data Visualization", url: "https://www.kaggle.com/learn/data-visualization" },
      { title: "Tableau Learning", url: "https://www.tableau.com/learn/training" },
    ],
  },

  "Data Projects": {
    explain:
      "Data projects prove your ability to collect, clean, analyze, visualize, and explain data insights.",
    tasks: ["Analyze dataset", "Create dashboard", "Write case study"],
    links: [
      { title: "Kaggle Datasets", url: "https://www.kaggle.com/datasets" },
      { title: "Google Data Analytics Resources", url: "https://grow.google/certificates/data-analytics/" },
    ],
  },

  Basics: {
    explain:
      "Basics are the starting foundation for any career path. Learn the core concepts first before jumping into advanced tools.",
    tasks: ["Learn key terms", "Watch beginner tutorial", "Make short notes"],
    links: [
      { title: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/" },
      { title: "MDN Learning Area", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development" },
    ],
  },

  "Core Skills": {
    explain:
      "Core skills are the main tools and concepts required for your chosen career goal.",
    tasks: ["Identify required skills", "Practice daily", "Build mini exercises"],
    links: [
      { title: "Coursera Career Academy", url: "https://www.coursera.org/career-academy" },
      { title: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/" },
    ],
  },

  Practice: {
    explain:
      "Practice converts theory into real skill. Small daily exercises help you improve faster.",
    tasks: ["Solve mini problems", "Build small tasks", "Review mistakes"],
    links: [
      { title: "LeetCode", url: "https://leetcode.com/" },
      { title: "HackerRank", url: "https://www.hackerrank.com/" },
    ],
  },

  "Mechanical Engineering": {
  explain:
    "Mechanical Engineering deals with machines, manufacturing, thermodynamics, design and production systems.",

  tasks: [
    "Learn Engineering Drawing",
    "Practice AutoCAD",
    "Learn SolidWorks",
    "Study Manufacturing Basics"
  ],

  links: [
    {
      title: "NPTEL Mechanical Engineering",
      url: "https://nptel.ac.in"
    },
    {
      title: "AutoCAD Tutorials",
      url: "https://www.autodesk.com/learn"
    }
  ]
},

"Civil Engineering": {
  explain:
    "Civil Engineering focuses on construction, structures, roads, bridges, surveying and infrastructure development.",

  tasks: [
    "Learn Surveying",
    "Practice Estimation",
    "Study Structural Design",
    "Learn AutoCAD Civil"
  ],

  links: [
    {
      title: "NPTEL Civil Engineering",
      url: "https://nptel.ac.in"
    }
  ]
},

"Digital Marketing": {
  explain:
    "Digital Marketing involves SEO, social media marketing, Google Ads, email marketing and analytics.",

  tasks: [
    "Learn SEO Basics",
    "Create Social Media Campaign",
    "Learn Google Ads",
    "Study Analytics"
  ],

  links: [
    {
      title: "Google Digital Garage",
      url: "https://learndigital.withgoogle.com"
    }
  ]
},

"TNPSC": {
  explain:
    "TNPSC preparation includes History, Polity, Economy, Geography and Current Affairs.",

  tasks: [
    "Study History",
    "Study Polity",
    "Read Current Affairs",
    "Solve Mock Tests"
  ],

  links: [
    {
      title: "TNPSC Official Website",
      url: "https://www.tnpsc.gov.in"
    }
  ]
},

"Teacher": {
  explain:
    "Teaching requires subject knowledge, communication skills and classroom management.",

  tasks: [
    "Improve Communication",
    "Create Lesson Plans",
    "Practice Teaching",
    "Prepare Notes"
  ],

  links: [
    {
      title: "SWAYAM Courses",
      url: "https://swayam.gov.in"
    }
  ]
},

  "Interview Prep": {
    explain:
      "Interview preparation includes technical basics, project explanation, resume preparation, communication, and mock interviews.",
    tasks: ["Prepare self introduction", "Explain projects", "Practice common questions"],
    links: [
      { title: "Pramp Mock Interviews", url: "https://www.pramp.com/" },
      { title: "InterviewBit", url: "https://www.interviewbit.com/" },
    ],
  },
}

function LearnTopic() {
  const { topic } = useParams()
  const navigate = useNavigate()

  const decodedTopic = decodeURIComponent(topic || "")
  const data = topicData[decodedTopic]

  const userId = "1"
  const goal = "frontend"

  const [completedTasks, setCompletedTasks] = useState([])

  useEffect(() => {
    axios
      .get(`http://ai-career-hub-backend.onrender.com/api/progress?userId=${userId}&goal=${goal}`)
      .then((res) => {
        const saved = res.data.topicTasks?.[decodedTopic] || []
        setCompletedTasks(saved)
      })
      .catch((err) => {
        console.log("Task progress load error:", err)
      })
  }, [decodedTopic])

  const toggleTask = async (taskIndex) => {
    let updated

    if (completedTasks.includes(taskIndex)) {
      updated = completedTasks.filter((i) => i !== taskIndex)
    } else {
      updated = [...completedTasks, taskIndex]
    }

    setCompletedTasks(updated)

    try {
      await axios.post("http://ai-career-hub-backend.onrender.com/api/progress", {
        userId,
        goal,
        topic: decodedTopic,
        completedTasks: updated,
      })
    } catch (err) {
      console.log("Task progress save error:", err)
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 text-white px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="text-emerald-400 hover:underline"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mt-6">
          Topic not found: {decodedTopic}
        </h1>
      </div>
    )
  }

  const taskPercent = data.tasks.length
    ? Math.round((completedTasks.length / data.tasks.length) * 100)
    : 0

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="text-emerald-400 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mt-6 mb-2">{decodedTopic}</h1>

      <p className="text-slate-400 mb-8">
        Learn this topic with explanation, mini tasks, and useful tutorial links.
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-3">Explanation</h2>
        <p className="text-slate-300 leading-7">{data.explain}</p>

        <div className="mt-8 mb-4">
          <div className="flex justify-between mb-2">
            <h2 className="text-xl font-semibold">Mini Tasks</h2>
            <span className="text-emerald-400 text-sm">
              {completedTasks.length}/{data.tasks.length} done ({taskPercent}%)
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all"
              style={{ width: `${taskPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-3">
          {data.tasks.map((task, index) => (
            <label
              key={index}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 cursor-pointer ${
                completedTasks.includes(index)
                  ? "bg-emerald-500/10 border border-emerald-500/30"
                  : "bg-slate-800 border border-slate-700"
              }`}
            >
              <input
                type="checkbox"
                checked={completedTasks.includes(index)}
                onChange={() => toggleTask(index)}
                className="w-4 h-4 accent-emerald-500"
              />
              <span
                className={
                  completedTasks.includes(index)
                    ? "line-through text-slate-500"
                    : ""
                }
              >
                {task}
              </span>
            </label>
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-3">Tutorial Links</h2>

        <div className="space-y-3">
          {data.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="block bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl px-4 py-3 text-emerald-400"
            >
              🔗 {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LearnTopic