import { useNavigate } from "react-router-dom"

function RoadmapCard({ item, index, completed, onToggle }) {
  const navigate = useNavigate()

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
      <h2 className="text-lg font-semibold">
        Step {index + 1}: {item.level}
      </h2>

      <p className="text-slate-400 mt-2">{item.description}</p>

      <button onClick={onToggle}>
        {completed ? "✅ Completed" : "Mark Complete"}
      </button>

      <button
        onClick={() => navigate(`/learn/${item.level}`)}
        className="ml-3 px-4 py-2 rounded-lg bg-emerald-600 text-white"
      >
        Learn 📘
      </button>
    </div>
  )
}

export default RoadmapCard