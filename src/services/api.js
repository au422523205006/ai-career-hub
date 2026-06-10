import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
}

export const resumeAPI = {
  analyze: (formData) => API.post('/resume/analyze', formData),
  getAll: () => API.get('/resume/all'),
}

export const interviewAPI = {
  generate: (data) => API.post('/interview/generate', data),
  feedback: (data) => API.post('/interview/feedback', data),
}

export const roadmapAPI = {
  generate: (data) => API.post('/roadmap/generate', data),
}

export const historyAPI = {
  getAll: () => API.get('/history'),
  delete: (id) => API.delete(`/history/${id}`),
}

export const adminAPI = {
  getUsers: () => API.get('/admin/users'),
  getStats: () => API.get('/admin/stats'),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),
}

export default API