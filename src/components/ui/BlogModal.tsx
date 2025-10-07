import React from 'react'

interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
  hasBackgroundImage?: boolean
  backgroundImage?: string
  createdAt?: string
  updatedAt?: string
}

const BlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  hasBackgroundImage = false,
  backgroundImage,
  createdAt,
  updatedAt
}) => {
  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="blog-modal-overlay" onClick={handleBackdropClick}>
      <div className="blog-modal">
        <button className="blog-modal__close" onClick={onClose}>
          ×
        </button>
        
        {hasBackgroundImage && backgroundImage && (
          <div 
            className="blog-modal__background"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        
        <div className="blog-modal__content">
          <header className="blog-modal__header">
            <h2 className="blog-modal__title">{title}</h2>
            {(createdAt || updatedAt) && (
              <div className="blog-modal__meta">
                {createdAt && (
                  <span className="blog-modal__date">
                    Published: {new Date(createdAt).toLocaleDateString()}
                  </span>
                )}
                {updatedAt && updatedAt !== createdAt && (
                  <span className="blog-modal__date">
                    Updated: {new Date(updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            )}
          </header>
          
          <div className="blog-modal__body">
            {content.split('\n').map((paragraph, index) => (
              <p key={index} className="blog-modal__paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogModal
