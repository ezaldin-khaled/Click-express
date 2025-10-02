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
    src: '',
    alt: '',
    isMain: false
  })

  // Load gallery images on component mount
  useEffect(() => {
    loadGalleryImages()
  }, [])

  const loadGalleryImages = async () => {
    setIsLoading(true)
    try {
      const images = await galleryAPI.getImages()
      setGalleryImages(Array.isArray(images) ? images : [])
    } catch (error) {
      console.error('Error loading gallery images:', error)
      onNotification?.('error', 'Failed to load gallery images')
      setGalleryImages([]) // Set empty array on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const imageData = {
        src: newImage.src,
        alt: newImage.alt,
        isMain: newImage.isMain
      }
      
      const createdImage = await galleryAPI.uploadImage(imageData)
      setGalleryImages(prev => Array.isArray(prev) ? [...prev, createdImage] : [createdImage])
      setNewImage({ src: '', alt: '', isMain: false })
      setShowAddForm(false)
      onNotification?.('success', 'Image added successfully')
    } catch (error) {
      console.error('Error adding image:', error)
      onNotification?.('error', 'Failed to add image')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteImage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return
    
    setIsLoading(true)
    try {
      await galleryAPI.deleteImage(id)
      setGalleryImages(prev => Array.isArray(prev) ? prev.filter(img => img.id !== id) : [])
      onNotification?.('success', 'Image deleted successfully')
    } catch (error) {
      console.error('Error deleting image:', error)
      onNotification?.('error', 'Failed to delete image')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetMain = async (id: string) => {
    setIsLoading(true)
    try {
      await galleryAPI.setMainImage(id)
      setGalleryImages(prev => Array.isArray(prev) ? prev.map(img => ({ ...img, isMain: img.id === id })) : [])
      onNotification?.('success', 'Main image updated successfully')
    } catch (error) {
      console.error('Error updating main image:', error)
      onNotification?.('error', 'Failed to update main image')
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
              <label>Image URL</label>
              <input
                type="url"
                value={newImage.src}
                onChange={(e) => setNewImage({...newImage, src: e.target.value})}
                placeholder="Enter image URL"
                required
              />
            </div>
            <div className="form-group">
              <label>Alt Text</label>
              <input
                type="text"
                value={newImage.alt}
                onChange={(e) => setNewImage({...newImage, alt: e.target.value})}
                placeholder="Enter alt text"
                required
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={newImage.isMain}
                  onChange={(e) => setNewImage({...newImage, isMain: e.target.checked})}
                />
                Set as main image
              </label>
            </div>
            <button type="submit" className="btn btn-primary">Add Image</button>
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
          {Array.isArray(galleryImages) && galleryImages.map((image) => (
          <div key={image.id} className={`gallery-item-admin ${image.isMain ? 'main-image' : ''}`}>
            <img src={image.src} alt={image.alt} />
            <div className="gallery-item-actions">
              <span className="image-alt">{image.alt}</span>
              {!image.isMain && (
                <button 
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleSetMain(image.id)}
                >
                  Set as Main
                </button>
              )}
              {image.isMain && (
                <span className="main-badge">Main Image</span>
              )}
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteImage(image.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  )
}

export default GalleryManagement
