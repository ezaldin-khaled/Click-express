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

// Helper function to manage localStorage quota
const manageLocalStorageQuota = (data: any[]) => {
  try {
    localStorage.setItem('galleryImages', JSON.stringify(data))
    // Trigger storage event for cross-tab synchronization
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'galleryImages',
      newValue: JSON.stringify(data),
      oldValue: localStorage.getItem('galleryImages')
    }))
    return true
  } catch (quotaError) {
    console.warn('localStorage quota exceeded, clearing old images:', quotaError)
    // Clear old images and keep only recent ones
    const recentImages = data.slice(-10) // Keep only last 10 images
    try {
      localStorage.setItem('galleryImages', JSON.stringify(recentImages))
      // Trigger storage event for cross-tab synchronization
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'galleryImages',
        newValue: JSON.stringify(recentImages),
        oldValue: localStorage.getItem('galleryImages')
      }))
      return true
    } catch (secondError) {
      console.error('Failed to save even reduced data:', secondError)
      // Clear all gallery data as last resort
      localStorage.removeItem('galleryImages')
      return false
    }
  }
}

// Gallery API functions - with fallback system
export const galleryAPI = {
  // Get all gallery images (public)
  getImages: async () => {
    try {
      const response = await api.get('/api/galleries', { params: getCacheBustingParams() })
      // Check if response has error
      if (response.data && response.data.error) {
        throw new Error(response.data.error)
      }
      return response.data
    } catch (error) {
      console.warn('Gallery API failed, using fallback images:', error)
      console.log('Error details:', {
        status: (error as any).response?.status,
        statusText: (error as any).response?.statusText,
        data: (error as any).response?.data,
        url: (error as any).config?.url
      })
      
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
      const response = await api.get('/api/galleries/admin', { params: getCacheBustingParams() })
      if (response.data && response.data.error) {
        throw new Error(response.data.error)
      }
      return response.data
    } catch (error) {
      console.warn('Admin Gallery API failed, using fallback images:', error)
      console.log('Error details:', {
        status: (error as any).response?.status,
        statusText: (error as any).response?.statusText,
        data: (error as any).response?.data,
        url: (error as any).config?.url
      })
      
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
      
      try {
        // Fallback to localStorage
        const newImage = {
          id: Date.now(),
          ...imageData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        
        // Get existing images and add new one
        const existingImages = JSON.parse(localStorage.getItem('galleryImages') || '[]')
        const updatedImages = [...existingImages, newImage]
        
        // Try to save to localStorage with quota handling
        manageLocalStorageQuota(updatedImages)
        
        return newImage
      } catch (fallbackError) {
        console.error('Fallback storage failed:', fallbackError)
        // Return image without persistence if all storage fails
        return {
          id: Date.now(),
          ...imageData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      }
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
      manageLocalStorageQuota(updatedImages)
      
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
      manageLocalStorageQuota(updatedImages)
      
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
