import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import ResumeAnalyzer from './pages/ResumeAnalyzer'
import InterviewPrep from './pages/InterviewPrep'
import SavedHistory from './pages/SavedHistory'
import AdminPanel from './pages/AdminPanel'
import RoadmapGenerator from './pages/RoadmapGenerator'
import LearnTopic from './pages/LearnTopic'

import ProtectedRoute from './components/ProtectedRoute'
import Chatbot from './components/Chatbot'
import VoiceAssistant from './components/VoiceAssistant'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <ResumeAnalyzer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <InterviewPrep />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <RoadmapGenerator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/:topic"
          element={
            <ProtectedRoute>
              <LearnTopic />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <SavedHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* Global Components */}
      <Chatbot />
      <VoiceAssistant />
    </BrowserRouter>
  )
}

export default App