import React, { useState } from 'react'
import { GalleryImage } from '../../types'

const GalleryManagement: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([
    {
      id: '1',
      src: '/assets/gallery 1.jpg',
      alt: 'Truck fleet',
      isMain: true
    },
    {
      id: '2',
      src: '/assets/gallery2.png',
      alt: 'Container yard'
    },
    {
      id: '3',
      src: '/assets/gallery3.jpg',
      alt: 'Port operations'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newImage, setNewImage] = useState({
    src: '',
    alt: '',
    isMain: false
  })

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault()
    const image: GalleryImage = {
      id: Date.now().toString(),
      ...newImage
    }
    setGalleryImages([...galleryImages, image])
    setNewImage({ src: '', alt: '', isMain: false })
    setShowAddForm(false)
  }

  const handleDeleteImage = (id: string) => {
    setGalleryImages(galleryImages.filter(img => img.id !== id))
  }

  const handleSetMain = (id: string) => {
    setGalleryImages(galleryImages.map(img => ({
      ...img,
      isMain: img.id === id
    })))
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

      <div className="gallery-grid-admin">
        {galleryImages.map((image) => (
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
    </div>
  )
}

export default GalleryManagement
