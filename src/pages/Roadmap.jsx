import { useEffect, useState } from "react"
import axios from "axios"
import RoadmapCard from "../components/RoadmapCard"

function Roadmap() {
  const [data, setData] = useState([])
  const [completed, setCompleted] = useState([])

  const userId = "1"
  const goal = "frontend"

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/roadmap?goal=${goal}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/progress?userId=${userId}&goal=${goal}`)
      .then((res) => setCompleted(res.data.completedLevels || []))
      .catch((err) => console.log(err))
  }, [])

  const toggleComplete = async (index) => {
    let updated

    if (completed.includes(index)) {
      updated = completed.filter((i) => i !== index)
    } else {
      updated = [...completed, index]
    }

    setCompleted(updated)

    await axios.post("http://localhost:5000/api/progress", {
      userId,
      goal,
      completedLevels: updated,
    })
  }

  const percent = data.length ? Math.round((completed.length / data.length) * 100) : 0

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Roadmap Generator</h1>
      <p className="text-slate-400 mb-8">
        Personalized learning roadmap with explanation and progress tracking.
      </p>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-8">
        <div className="flex justify-between mb-3">
          <h2 className="text-xl font-semibold">Frontend Developer Roadmap</h2>
          <span className="text-emerald-400">{completed.length}/{data.length} done</span>
        </div>

        <div className="w-full bg-slate-700 h-2 rounded-full">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-5">
        {data.map((item, index) => (
          <RoadmapCard
            key={index}
            item={item}
            index={index}
            completed={completed.includes(index)}
            onToggle={() => toggleComplete(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Roadmap