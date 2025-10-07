import React, { useState, useEffect } from 'react'
import BlogCard from '../components/ui/BlogCard'
import BlogModal from '../components/ui/BlogModal'
import { BlogPost } from '../types'
import { blogAPI } from '../services/api'

const Blogs: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Load blog posts from API
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await blogAPI.getPublicPosts()
        setBlogPosts(Array.isArray(posts) ? posts : [])
      } catch (error) {
        console.error('Error loading blog posts:', error)
        // Fallback to hardcoded posts if API fails
        setBlogPosts([
          {
            id: '1',
            title: "Blog title heading will go here",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            hasBackgroundImage: false,
            createdAt: '2024-01-15',
            updatedAt: '2024-01-15'
          },
          {
            id: '2',
            title: "Another Blog Post",
            content: "This is another blog post with different content. It demonstrates the blog management functionality.",
            hasBackgroundImage: false,
            createdAt: '2024-01-16',
            updatedAt: '2024-01-16'
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogPosts()
  }, [])

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
  }

  if (isLoading) {
    return (
      <div className="blogs-page">
        <div className="container">
          <div className="section-header">
            <h2>Blogs</h2>
            <p>Loading blog posts...</p>
          </div>
        </div>
      </div>
    )
  }

  if (blogPosts.length === 0) {
    return (
      <div className="blogs-page">
        <div className="container">
          <div className="section-header">
            <h2>Blogs</h2>
            <p>No blog posts available.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="blogs-page">
      <div className="container">
        <div className="blogs-grid">
          {Array.isArray(blogPosts) && blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              content={post.content}
              hasBackgroundImage={post.hasBackgroundImage}
              backgroundImage={post.backgroundImage}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              onReadMore={() => handleReadMore(post)}
            />
          ))}
        </div>
      </div>
      
      {selectedPost && (
        <BlogModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedPost.title}
          content={selectedPost.content}
          hasBackgroundImage={selectedPost.hasBackgroundImage}
          backgroundImage={selectedPost.backgroundImage}
          createdAt={selectedPost.createdAt}
          updatedAt={selectedPost.updatedAt}
        />
      )}
    </div>
  )
}

export default Blogs
