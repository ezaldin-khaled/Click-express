import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://clickexpress.ae',  // Production API base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add cache-busting to prevent browser caching issues
api.defaults.params = {
  _t: Date.now()
}

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

// Gallery API functions - with fallback system
export const galleryAPI = {
  // Get all gallery images (public)
  getImages: async () => {
    try {
      const response = await api.get('/api/galleries')
      // Check if response has error
      if (response.data && response.data.error) {
        throw new Error(response.data.error)
      }
      return response.data
    } catch (error) {
      console.warn('Gallery API failed, using fallback images:', error)
      
      // Get default fallback images
      const defaultImages = [
        {
          id: 1,
          image_name: 'Truck Fleet',
          image_file: '/assets/gallery 1.jpg',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          image_name: 'Container Yard',
          image_file: '/assets/gallery2.png',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          image_name: 'Port Operations',
          image_file: '/assets/gallery3.jpg',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
      
      // Get custom images from localStorage
      const customImages = JSON.parse(localStorage.getItem('galleryImages') || '[]')
      
      // Combine default and custom images
      return [...defaultImages, ...customImages]
    }
  },
  
  // Get all gallery images (admin)
  getAdminImages: async () => {
    try {
      const response = await api.get('/api/galleries/admin')
      if (response.data && response.data.error) {
        throw new Error(response.data.error)
      }
      return response.data
    } catch (error) {
      console.warn('Admin Gallery API failed, using fallback images:', error)
      
      // Get default fallback images
      const defaultImages = [
        {
          id: 1,
          image_name: 'Truck Fleet',
          image_file: '/assets/gallery 1.jpg',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          image_name: 'Container Yard',
          image_file: '/assets/gallery2.png',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          image_name: 'Port Operations',
          image_file: '/assets/gallery3.jpg',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
      
      // Get custom images from localStorage
      const customImages = JSON.parse(localStorage.getItem('galleryImages') || '[]')
      
      // Combine default and custom images
      return [...defaultImages, ...customImages]
    }
  },
  
  // Get single gallery image (admin)
  getImage: async (id: string) => {
    try {
      const response = await api.get(`/api/galleries/admin/${id}`)
      if (response.data && response.data.error) {
        throw new Error(response.data.error)
      }
      return response.data
    } catch (error) {
      console.warn('Get single gallery image failed:', error)
      throw error
    }
  },
  
  // Create new gallery image
  uploadImage: async (imageData: { image_name: string; image_file: string }) => {
    try {
      const response = await api.post('/api/galleries', imageData)
      if (response.data && response.data.error) {
        throw new Error(response.data.error)
      }
      return response.data
    } catch (error) {
      console.warn('Upload image failed, using local storage fallback:', error)
      // Fallback to localStorage for now
      const newImage = {
        id: Date.now(),
        ...imageData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      // Store in localStorage as fallback
      const existingImages = JSON.parse(localStorage.getItem('galleryImages') || '[]')
      const updatedImages = [...existingImages, newImage]
      localStorage.setItem('galleryImages', JSON.stringify(updatedImages))
      
      return newImage
    }
  },
  
  // Update gallery image
  updateImage: async (id: string, data: { image_name?: string; image_file?: string }) => {
    try {
      const response = await api.put(`/api/galleries/${id}`, data)
      if (response.data && response.data.error) {
        throw new Error(response.data.error)
      }
      return response.data
    } catch (error) {
      console.warn('Update image failed, using local storage fallback:', error)
      // Fallback to localStorage
      const existingImages = JSON.parse(localStorage.getItem('galleryImages') || '[]')
      const updatedImages = existingImages.map((img: any) => 
        img.id === parseInt(id) ? { ...img, ...data, updated_at: new Date().toISOString() } : img
      )
      localStorage.setItem('galleryImages', JSON.stringify(updatedImages))
      
      return { message: 'Image updated successfully (local storage)' }
    }
  },
  
  // Delete gallery image
  deleteImage: async (id: string) => {
    try {
      const response = await api.delete(`/api/galleries/${id}`)
      if (response.data && response.data.error) {
        throw new Error(response.data.error)
      }
      return response.data
    } catch (error) {
      console.warn('Delete image failed, using local storage fallback:', error)
      // Fallback to localStorage
      const existingImages = JSON.parse(localStorage.getItem('galleryImages') || '[]')
      const updatedImages = existingImages.filter((img: any) => img.id !== parseInt(id))
      localStorage.setItem('galleryImages', JSON.stringify(updatedImages))
      
      return { message: 'Image deleted successfully (local storage)' }
    }
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
    const response = await api.get('/health')
    return response.data
  }
}

export default api
