import React from 'react'

interface BlogCardProps {
  title: string
  content: string
  hasBackgroundImage?: boolean
  backgroundImage?: string
  createdAt?: string
  updatedAt?: string
  onReadMore?: () => void
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  title, 
  content, 
  hasBackgroundImage = false, 
  backgroundImage,
  onReadMore
}) => {
  return (
    <div className={`blog-card ${hasBackgroundImage ? 'blog-card--with-bg' : ''}`}>
      {hasBackgroundImage && backgroundImage && (
        <div 
          className="blog-card__background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="blog-card__content">
        <h3 className="blog-card__title">{title}</h3>
        <div className="blog-card__text">
          {content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <button 
          className="blog-card__read-more" 
          onClick={onReadMore}
        >
          Read more &gt;
        </button>
      </div>
    </div>
  )
}

export default BlogCard
