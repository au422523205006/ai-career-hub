import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, User, Mic } from 'lucide-react'


function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am your AI Career Assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://ai-career-hub-backend.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ message: userMessage })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, something went wrong. Please try again!' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl w-80 h-96 flex flex-col mb-4 shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-violet-600 rounded-t-2xl">
export default Chatbot 
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-sm">AI Career Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-violet-600' : 'bg-gray-700'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                <div className={`px-3 py-2 rounded-xl text-sm max-w-48 ${msg.role === 'user' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-800 px-3 py-2 rounded-xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 py-3 border-t border-gray-700 flex gap-2">
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={handleKeyPress}
    placeholder="Type a message..."
    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500"
  />

        {/* Voice Button */}
        <button
          className="bg-gray-700 hover:bg-gray-600 p-2 rounded-xl transition"
          title="Voice Input"
        >
          <Mic className="w-4 h-4 text-white" />
        </button>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 p-2 rounded-xl transition"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
            

      {/* Float Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-violet-600 hover:bg-violet-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
      </button>

    </div>
  )
}

export default Chatbot 