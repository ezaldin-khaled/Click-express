import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.DEV ? '' : 'https://clickexpress.ae',  // Use proxy in development, direct URL in production
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add cache-busting to prevent browser caching issues
api.defaults.params = {
  _t: Date.now()
}

// Helper function to get fresh cache-busting params
const getCacheBustingParams = () => ({
  _t: Date.now()
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


// Gallery API functions
export const galleryAPI = {
  // Get all gallery images (public)
  getImages: async () => {
    const response = await api.get('/api/galleries', { params: getCacheBustingParams() })
    // Check if response has error
    if (response.data && response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data
  },
  
  // Get all gallery images (admin)
  getAdminImages: async () => {
    const response = await api.get('/api/galleries/admin', { params: getCacheBustingParams() })
    if (response.data && response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data
  },
  
  // Get single gallery image (admin)
  getImage: async (id: string) => {
    const response = await api.get(`/api/galleries/admin/${id}`)
    if (response.data && response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data
  },
  
  // Create new gallery image
  uploadImage: async (imageData: { image_name: string; image_file: string }) => {
    const response = await api.post('/api/galleries', imageData)
    if (response.data && response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data
  },
  
  // Update gallery image
  updateImage: async (id: string, data: { image_name?: string; image_file?: string }) => {
    const response = await api.put(`/api/galleries/${id}`, data)
    if (response.data && response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data
  },
  
  // Delete gallery image
  deleteImage: async (id: string) => {
    const response = await api.delete(`/api/galleries/${id}`)
    if (response.data && response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data
  }
}

// Blog API functions - matches Go backend endpoints
export const blogAPI = {
  // Admin: Get all blogs (including unpublished)
  getPosts: async () => {
    const response = await api.get('/api/blogs')
    return response.data
  },
  
  // Public: Get only published blogs
  getPublicPosts: async () => {
    const response = await api.get('/api/blogs/public')
    return response.data
  },
  
  // Get single blog by ID
  getPost: async (id: string) => {
    const response = await api.get(`/api/blogs/${id}`)
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
    const response = await api.post('/api/blogs', postData)
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
    const response = await api.put(`/api/blogs/${id}`, postData)
    return response.data
  },
  
  // Delete blog post
  deletePost: async (id: string) => {
    const response = await api.delete(`/api/blogs/${id}`)
    return response.data
  }
}

// Contact API functions - matches Go backend endpoints
export const contactAPI = {
  // Submit contact form (public)
  submitContact: async (contactData: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) => {
    const response = await api.post('/api/contacts', contactData)
    return response.data
  },
  
  // Admin: Get all contact submissions
  getSubmissions: async () => {
    const response = await api.get('/api/contacts')
    return response.data
  },
  
  // Get single contact by ID
  getSubmission: async (id: string) => {
    const response = await api.get(`/api/contacts/${id}`)
    return response.data
  },
  
  // Update contact status
  updateSubmissionStatus: async (id: string, status: 'pending' | 'read' | 'replied') => {
    const response = await api.put(`/api/contacts/${id}`, { status })
    return response.data
  },
  
  // Delete contact submission
  deleteSubmission: async (id: string) => {
    const response = await api.delete(`/api/contacts/${id}`)
    return response.data
  }
}

// Health check function
export const healthAPI = {
  check: async () => {
    try {
      const response = await api.get('/health')
      return response.data
    } catch (error) {
      console.warn('Health check failed:', error)
      return { status: 'ERROR', error: (error as any).message }
    }
  }
}

// Diagnostic function to test API endpoints
export const diagnosticAPI = {
  testGalleryEndpoints: async () => {
    const results: {
      public: { success: boolean; data?: any; error?: any; status?: any } | null;
      admin: { success: boolean; data?: any; error?: any; status?: any } | null;
      health: { success: boolean; data?: any; error?: any; status?: any } | null;
    } = {
      public: null,
      admin: null,
      health: null
    }
    
    try {
      console.log('Testing public gallery endpoint...')
      const publicResponse = await api.get('/api/galleries', { params: getCacheBustingParams() })
      results.public = { success: true, data: publicResponse.data }
    } catch (error) {
      results.public = { success: false, error: (error as any).message, status: (error as any).response?.status }
    }
    
    try {
      console.log('Testing admin gallery endpoint...')
      const adminResponse = await api.get('/api/galleries/admin', { params: getCacheBustingParams() })
      results.admin = { success: true, data: adminResponse.data }
    } catch (error) {
      results.admin = { success: false, error: (error as any).message, status: (error as any).response?.status }
    }
    
    try {
      console.log('Testing health endpoint...')
      const healthResponse = await api.get('/health')
      results.health = { success: true, data: healthResponse.data }
    } catch (error) {
      results.health = { success: false, error: (error as any).message, status: (error as any).response?.status }
    }
    
    console.log('API Diagnostic Results:', results)
    return results
  }
}

export default api
