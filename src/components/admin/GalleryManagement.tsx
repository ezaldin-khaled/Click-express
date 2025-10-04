import React, { useState, useEffect } from 'react'
import { GalleryImage } from '../../types'
import { galleryAPI } from '../../services/api'

interface GalleryManagementProps {
  onNotification?: (type: 'success' | 'error', message: string) => void
}

const GalleryManagement: React.FC<GalleryManagementProps> = ({ onNotification }) => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newImage, setNewImage] = useState({
    image_name: '',
    image_file: ''
  })
  const [uploadPreview, setUploadPreview] = useState<string>('')

  // Load gallery images on component mount
  useEffect(() => {
    loadGalleryImages()
  }, [])

  const loadGalleryImages = async () => {
    setIsLoading(true)
    try {
      const images = await galleryAPI.getAdminImages()
      setGalleryImages(Array.isArray(images) ? images : [])
      
      // Check if we're using fallback images
      if (images && images.length > 0 && images[0].image_file?.includes('/assets/')) {
        onNotification?.('success', 'Gallery loaded (using fallback images - backend may be unavailable)')
      }
    } catch (error) {
      console.error('Error loading gallery images:', error)
      onNotification?.('error', 'Failed to load gallery images')
      setGalleryImages([]) // Set empty array on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadPreview(e.target?.result as string)
        setNewImage(prev => ({ 
          ...prev, 
          image_name: file.name,
          image_file: e.target?.result as string 
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const imageData = {
        image_name: newImage.image_name,
        image_file: newImage.image_file
      }
      
      const createdImage = await galleryAPI.uploadImage(imageData)
      setGalleryImages(prev => Array.isArray(prev) ? [...prev, createdImage] : [createdImage])
      setNewImage({ image_name: '', image_file: '' })
      setUploadPreview('')
      setShowAddForm(false)
      
      // Check if image was stored locally (fallback)
      if (createdImage.id > 1000000000000) { // Timestamp-based ID indicates localStorage
        onNotification?.('success', 'Image added successfully (stored locally - backend unavailable)')
      } else {
        onNotification?.('success', 'Image added successfully')
      }
    } catch (error) {
      console.error('Error adding image:', error)
      onNotification?.('error', 'Failed to add image')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteImage = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return
    
    setIsLoading(true)
    try {
      await galleryAPI.deleteImage(id.toString())
      setGalleryImages(prev => Array.isArray(prev) ? prev.filter(img => img.id !== id) : [])
      onNotification?.('success', 'Image deleted successfully')
    } catch (error) {
      console.error('Error deleting image:', error)
      onNotification?.('error', 'Failed to delete image')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Gallery Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add Image'}
        </button>
      </div>

      {showAddForm && (
        <div className="admin-form">
          <form onSubmit={handleAddImage}>
            <div className="form-group">
              <label>Upload Image File</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="file-input"
              />
              {uploadPreview && (
                <div className="image-preview">
                  <img src={uploadPreview} alt="Preview" style={{maxWidth: '200px', maxHeight: '200px'}} />
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label>Image Name</label>
              <input
                type="text"
                value={newImage.image_name}
                onChange={(e) => setNewImage({...newImage, image_name: e.target.value})}
                placeholder="Enter image name"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Or Enter Image URL</label>
              <input
                type="url"
                value={newImage.image_file}
                onChange={(e) => setNewImage({...newImage, image_file: e.target.value})}
                placeholder="Enter image URL"
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={!newImage.image_name || !newImage.image_file}>
                {isLoading ? 'Adding...' : 'Add Image'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setShowAddForm(false)
                  setNewImage({ image_name: '', image_file: '' })
                  setUploadPreview('')
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading gallery images...</p>
        </div>
      ) : (
        <div className="gallery-grid-admin">
          {Array.isArray(galleryImages) && galleryImages.length > 0 ? (
            galleryImages.map((image) => (
              <div key={image.id} className="gallery-item-admin">
                <div className="gallery-item-image">
                  <img src={image.image_file} alt={image.image_name} />
                </div>
                <div className="gallery-item-info">
                  <h4>{image.image_name}</h4>
                  <p className="image-src">{image.image_file}</p>
                  <p className="image-date">Added: {new Date(image.created_at).toLocaleDateString()}</p>
                </div>
                <div className="gallery-item-actions">
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteImage(image.id)}
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🖼️</div>
              <h3>No Gallery Images</h3>
              <p>Add your first image to get started with the gallery.</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddForm(true)}
              >
                Add First Image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GalleryManagement
