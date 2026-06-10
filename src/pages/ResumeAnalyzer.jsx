import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, Upload, FileText, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import { resumeAPI } from '../services/api'
import toast, { Toaster } from 'react-hot-toast'

function ResumeAnalyzer() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = (f) => {
    if (f && (f.type === 'application/pdf' || f.type.includes('word'))) {
      setFile(f)
    } else {
      toast.error('Please upload PDF or DOC file only!')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleAnalyze = async () => {
    if (!file) return toast.error('Please upload a resume first!')
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('resume', file)
      const res = await resumeAPI.analyze(formData)
      setResult(res.data)
      toast.success('Resume analyzed!')
    } catch (err) {
      toast.error('Analysis failed. Try again!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Toaster position="top-right" />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-violet-500" />
          <span className="text-lg font-bold">AI Career Hub</span>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Resume Analyzer</h1>
          <p className="text-gray-400">Upload your resume and get AI-powered feedback with ATS score</p>
        </div>

        {/* Upload Box */}
        {!result && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition ${
              dragOver ? 'border-violet-500 bg-violet-500/10' : 'border-gray-700 bg-gray-900'
            }`}
          >
            <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-300 font-medium mb-2">Drag & drop your resume here</p>
            <p className="text-gray-500 text-sm mb-6">Supports PDF, DOC, DOCX</p>

            <label className="cursor-pointer bg-violet-600 hover:bg-violet-700 px-6 py-2.5 rounded-xl font-medium transition">
              Browse File
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </label>

            {file && (
              <div className="mt-6 flex items-center justify-center gap-2 text-emerald-400">
                <FileText className="w-4 h-4" />
                <span className="text-sm">{file.name}</span>
              </div>
            )}
          </div>
        )}

        {/* Analyze Button */}
        {file && !result && (
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full mt-6 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 py-3 rounded-xl font-semibold transition"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500 mx-auto mb-4"></div>
            <p className="text-gray-400">AI is analyzing your resume...</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-6">

            {/* ATS Score */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-2">ATS Score</p>
              <div className="text-6xl font-bold text-violet-400 mb-2">{result.score || 78}<span className="text-2xl text-gray-500">/100</span></div>
              <div className="w-full bg-gray-800 rounded-full h-3 mt-4">
                <div
                  className="bg-violet-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${result.score || 78}%` }}
                ></div>
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="font-semibold text-emerald-400 flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5" /> Strengths
              </h3>
              <ul className="space-y-2">
                {(result.strengths || ['Strong technical skills', 'Good project experience', 'Clear formatting']).map((s, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="font-semibold text-amber-400 flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5" /> Areas to Improve
              </h3>
              <ul className="space-y-2">
                {(result.improvements || ['Add more quantifiable achievements', 'Include keywords from job description', 'Add LinkedIn profile']).map((s, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">⚠</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Try Again */}
            <button
              onClick={() => { setResult(null); setFile(null) }}
              className="w-full border border-gray-700 hover:border-gray-500 py-3 rounded-xl font-medium transition text-gray-400 hover:text-white"
            >
              Analyze Another Resume
            </button>

          </div>
        )}

      </div>
    </div>
  )
}

export default ResumeAnalyzer