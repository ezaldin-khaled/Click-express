import React from 'react'

interface BlogCardProps {
  title: string
  content: string
  hasBackgroundImage?: boolean
  backgroundImage?: string
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  title, 
  content, 
  hasBackgroundImage = false, 
  backgroundImage 
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
        <a href="#" className="blog-card__read-more">Read more &gt;</a>
      </div>
    </div>
  )
}

export default BlogCard
