import React, { useState, useEffect, useRef } from 'react'
import { GalleryImage } from '../../types'
import { galleryAPI } from '../../services/api'

const Gallery: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load gallery images from API
  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        const images = await galleryAPI.getImages()
        setGalleryImages(images)
      } catch (error) {
        console.error('Error loading gallery images:', error)
        // Fallback to hardcoded images if API fails
        setGalleryImages([
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
      } finally {
        setIsLoading(false)
      }
    }

    loadGalleryImages()
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
      }, 5000) // Change slide every 5 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [galleryImages.length, isPaused])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }


  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  if (isLoading) {
    return (
      <section className="gallery" id="gallery">
        <div className="container">
          <div className="section-header">
            <h2>Gallery</h2>
            <p>Loading gallery images...</p>
          </div>
        </div>
      </section>
    )
  }

  if (galleryImages.length === 0) {
    return (
      <section className="gallery" id="gallery">
        <div className="container">
          <div className="section-header">
            <h2>Gallery</h2>
            <p>No gallery images available.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="section-header">
          <h2>Gallery</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        
        <div className="gallery-slider">
          <div 
            className="slider-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="slider-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {galleryImages.map((image) => (
                <div key={image.id} className="slide">
                  <img src={image.src} alt={image.alt} />
                </div>
              ))}
            </div>
            
          </div>
          
          {/* Arrow indicators */}
          <div className="slider-arrow-indicators">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`arrow-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className="arrow-triangle"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery
