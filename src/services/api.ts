import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',  // Use proxy in development, relative path in production
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('authToken')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

// Auth API functions
export const authAPI = {
  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout')
    return response.data
  },
  
  verifyToken: async () => {
    const response = await api.get('/auth/verify')
    return response.data
  }
}

// Gallery API functions
export const galleryAPI = {
  getImages: async () => {
    const response = await api.get('/gallery')
    return response.data
  },
  
  uploadImage: async (formData: FormData) => {
    const response = await api.post('/gallery/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
  
  deleteImage: async (id: string) => {
    const response = await api.delete(`/gallery/${id}`)
    return response.data
  },
  
  updateImage: async (id: string, data: any) => {
    const response = await api.put(`/gallery/${id}`, data)
    return response.data
  }
}

// Blog API functions
export const blogAPI = {
  getPosts: async () => {
    const response = await api.get('/blogs')
    return response.data
  },
  
  createPost: async (postData: any) => {
    const response = await api.post('/blogs', postData)
    return response.data
  },
  
  updatePost: async (id: string, postData: any) => {
    const response = await api.put(`/blogs/${id}`, postData)
    return response.data
  },
  
  deletePost: async (id: string) => {
    const response = await api.delete(`/blogs/${id}`)
    return response.data
  }
}

// Email subscribers API functions
export const emailAPI = {
  getSubscribers: async () => {
    const response = await api.get('/emails')
    return response.data
  },
  
  updateSubscriberStatus: async (id: string, status: string) => {
    const response = await api.put(`/emails/${id}/status`, { status })
    return response.data
  },
  
  deleteSubscriber: async (id: string) => {
    const response = await api.delete(`/emails/${id}`)
    return response.data
  }
}

// Contact forms API functions
export const contactAPI = {
  getSubmissions: async () => {
    const response = await api.get('/contacts')
    return response.data
  },
  
  updateSubmissionStatus: async (id: string, status: string) => {
    const response = await api.put(`/contacts/${id}/status`, { status })
    return response.data
  },
  
  deleteSubmission: async (id: string) => {
    const response = await api.delete(`/contacts/${id}`)
    return response.data
  }
}

export default api
