import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.DEV 
    ? 'http://localhost:8080'  // Development: local Go backend
    : 'https://clickexpress.ae',  // Production: Go backend (without www)
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
    const response = await api.post('/api/auth/login', credentials)
    return response.data
  },
  
  logout: async () => {
    const response = await api.post('/api/auth/logout')
    return response.data
  },
  
  verifyToken: async () => {
    const response = await api.get('/api/auth/verify')
    return response.data
  }
}

// Gallery API functions (Note: Gallery endpoints not in Go backend docs)
// These may need to be implemented in your Go backend or removed
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

// Blog API functions - matches Go backend endpoints
export const blogAPI = {
  // Admin: Get all blogs (including unpublished)
  getPosts: async () => {
    const response = await api.get('/blogs')
    return response.data
  },
  
  // Public: Get only published blogs
  getPublicPosts: async () => {
    const response = await api.get('/blogs/public')
    return response.data
  },
  
  // Get single blog by ID
  getPost: async (id: string) => {
    const response = await api.get(`/blogs/${id}`)
    return response.data
  },
  
  // Create new blog post
  createPost: async (postData: {
    title: string;
    content: string;
    image_name?: string;
    image_file?: string;
    published?: boolean;
  }) => {
    const response = await api.post('/blogs', postData)
    return response.data
  },
  
  // Update blog post
  updatePost: async (id: string, postData: {
    title?: string;
    content?: string;
    image_name?: string;
    image_file?: string;
    published?: boolean;
  }) => {
    const response = await api.put(`/blogs/${id}`, postData)
    return response.data
  },
  
  // Delete blog post
  deletePost: async (id: string) => {
    const response = await api.delete(`/blogs/${id}`)
    return response.data
  }
}

// Contact API functions - matches Go backend endpoints
export const contactAPI = {
  // Submit contact form (public)
  submitContact: async (contactData: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) => {
    const response = await api.post('/contacts', contactData)
    return response.data
  },
  
  // Admin: Get all contact submissions
  getSubmissions: async () => {
    const response = await api.get('/contacts')
    return response.data
  },
  
  // Get single contact by ID
  getSubmission: async (id: string) => {
    const response = await api.get(`/contacts/${id}`)
    return response.data
  },
  
  // Update contact status
  updateSubmissionStatus: async (id: string, status: 'pending' | 'read' | 'replied') => {
    const response = await api.put(`/contacts/${id}`, { status })
    return response.data
  },
  
  // Delete contact submission
  deleteSubmission: async (id: string) => {
    const response = await api.delete(`/contacts/${id}`)
    return response.data
  }
}

// Health check function
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health')
    return response.data
  }
}

export default api
