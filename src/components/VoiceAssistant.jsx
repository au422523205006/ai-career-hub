import { useState, useRef } from 'react'
import { Mic, MicOff, Volume2, X } from 'lucide-react'

function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const streamRef = useRef(null)

  const speak = (text) => {
    if (!text) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    utterance.pitch = 1

    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
  }

  const sendAudioToBackend = async (audioBlob) => {
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('audio', audioBlob, 'voice.webm')

      const res = await fetch('http://localhost:5000/api/voice', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      const userText = data.transcript || 'No speech detected'
      const reply =
        data.reply ||
        data.message ||
        'Sorry, I did not get a proper response from server.'

      setTranscript(userText)
      setResponse(reply)
      speak(reply)
    } catch (err) {
      console.error('Voice upload error:', err)

      const errorReply =
        'Voice processing failed. Please check backend server and OpenAI API key.'

      setResponse(errorReply)
      speak(errorReply)
    } finally {
      setLoading(false)
    }
  }

  const startListening = async () => {
    try {
      stopSpeaking()
      setTranscript('')
      setResponse('')

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const msg = 'Microphone is not supported in this browser. Please use Chrome.'
        setResponse(msg)
        speak(msg)
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/webm',
        })

        streamRef.current?.getTracks().forEach((track) => track.stop())
        streamRef.current = null

        await sendAudioToBackend(audioBlob)
      }

      mediaRecorder.start()
      setIsListening(true)

      // record 10 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.stop()
          setIsListening(false)
        }
      }, 10000)
    } catch (err) {
      console.error('Mic error:', err)

      const msg = 'Microphone access denied. Please allow microphone permission.'
      setResponse(msg)
      speak(msg)
      setIsListening(false)
    }
  }

  const stopListening = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
    }

    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setIsListening(false)
  }

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {isOpen && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl w-72 mb-4 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-emerald-600">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-sm">
                Voice Assistant
              </span>
            </div>

            <button
              onClick={() => {
                setIsOpen(false)
                stopSpeaking()
                stopListening()
              }}
              className="text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 text-center">
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={loading}
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition ${
                isListening
                  ? 'bg-red-500 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </button>

            <p className="text-gray-400 text-sm mb-4">
              {isListening
                ? '🎤 Recording... tap again to stop'
                : loading
                ? '🤔 Processing voice...'
                : 'Tap mic to record'}
            </p>

            {transcript && (
              <div className="bg-gray-800 rounded-xl p-3 mb-3 text-left">
                <p className="text-xs text-gray-500 mb-1">You said:</p>
                <p className="text-white text-sm">{transcript}</p>
              </div>
            )}

            {response && (
              <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-xl p-3 text-left">
                <p className="text-xs text-emerald-400 mb-1">Assistant:</p>
                <p className="text-gray-200 text-sm">{response}</p>

                <button
                  onClick={() => speak(response)}
                  className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <Volume2 className="w-3 h-3" /> Replay
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-600 hover:bg-emerald-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition"
      >
        <Mic className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}

export default VoiceAssistant