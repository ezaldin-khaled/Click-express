import React, { useState, useEffect } from 'react'
import { BlogPost } from '../../types'
import { blogAPI } from '../../services/api'

interface BlogManagementProps {
  onNotification?: (type: 'success' | 'error', message: string) => void
}

const BlogManagement: React.FC<BlogManagementProps> = ({ onNotification }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    hasBackgroundImage: false,
    backgroundImage: '',
    published: false
  })

  // Load blog posts on component mount
  useEffect(() => {
    loadBlogPosts()
  }, [])

  const loadBlogPosts = async () => {
    setIsLoading(true)
    try {
      const posts = await blogAPI.getPosts()
      setBlogPosts(Array.isArray(posts) ? posts : [])
    } catch (error) {
      console.error('Error loading blog posts:', error)
      onNotification?.('error', 'Failed to load blog posts')
      setBlogPosts([]) // Set empty array on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const postData = {
        title: newPost.title,
        content: newPost.content,
        image_name: newPost.hasBackgroundImage ? newPost.backgroundImage || undefined : undefined,
        image_file: newPost.hasBackgroundImage ? newPost.backgroundImage || undefined : undefined,
        published: newPost.published
      }
      
      const createdPost = await blogAPI.createPost(postData)
      setBlogPosts(prev => Array.isArray(prev) ? [...prev, createdPost] : [createdPost])
      setNewPost({ title: '', content: '', hasBackgroundImage: false, backgroundImage: '', published: false })
      setShowAddForm(false)
      onNotification?.('success', 'Blog post created successfully')
    } catch (error) {
      console.error('Error creating blog post:', error)
      
      // Handle specific error types
      if ((error as any).response?.status === 413) {
        onNotification?.('error', 'Blog post data is too large. Please reduce content size.')
      } else if ((error as any).response?.status === 400) {
        onNotification?.('error', 'Invalid blog post data. Please check your input.')
      } else if ((error as any).response?.status >= 500) {
        onNotification?.('error', 'Server error. Please try again later.')
      } else {
        onNotification?.('error', `Failed to create blog post: ${(error as any).message || 'Unknown error'}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setNewPost({
      title: post.title,
      content: post.content,
      hasBackgroundImage: post.hasBackgroundImage,
      backgroundImage: post.backgroundImage || '',
      published: post.published || false
    })
    setShowAddForm(true)
  }

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPost) return

    setIsLoading(true)
    try {
      const postData = {
        title: newPost.title,
        content: newPost.content,
        image_name: newPost.hasBackgroundImage ? newPost.backgroundImage || undefined : undefined,
        image_file: newPost.hasBackgroundImage ? newPost.backgroundImage || undefined : undefined,
        published: newPost.published
      }
      
      const updatedPost = await blogAPI.updatePost(editingPost.id, postData)
      setBlogPosts(prev => Array.isArray(prev) ? prev.map(post => post.id === editingPost.id ? updatedPost : post) : [updatedPost])
      setEditingPost(null)
      setNewPost({ title: '', content: '', hasBackgroundImage: false, backgroundImage: '', published: false })
      setShowAddForm(false)
      onNotification?.('success', 'Blog post updated successfully')
    } catch (error) {
      console.error('Error updating blog post:', error)
      
      // Handle specific error types
      if ((error as any).response?.status === 413) {
        onNotification?.('error', 'Blog post data is too large. Please reduce content size.')
      } else if ((error as any).response?.status === 400) {
        onNotification?.('error', 'Invalid blog post data. Please check your input.')
      } else if ((error as any).response?.status >= 500) {
        onNotification?.('error', 'Server error. Please try again later.')
      } else {
        onNotification?.('error', `Failed to update blog post: ${(error as any).message || 'Unknown error'}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return
    
    setIsLoading(true)
    try {
      await blogAPI.deletePost(id)
      setBlogPosts(prev => Array.isArray(prev) ? prev.filter(post => post.id !== id) : [])
      onNotification?.('success', 'Blog post deleted successfully')
    } catch (error) {
      console.error('Error deleting blog post:', error)
      onNotification?.('error', 'Failed to delete blog post')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingPost(null)
    setNewPost({ title: '', content: '', hasBackgroundImage: false, backgroundImage: '', published: false })
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Blog Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add Blog Post'}
        </button>
      </div>

      {showAddForm && (
        <div className="admin-form">
          <form onSubmit={editingPost ? handleUpdatePost : handleAddPost}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                placeholder="Enter blog title"
                required
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                placeholder="Enter blog content"
                rows={8}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={newPost.hasBackgroundImage}
                  onChange={(e) => setNewPost({...newPost, hasBackgroundImage: e.target.checked})}
                />
                Has background image
              </label>
            </div>
            {newPost.hasBackgroundImage && (
              <div className="form-group">
                <label>Background Image URL</label>
                <input
                  type="url"
                  value={newPost.backgroundImage}
                  onChange={(e) => setNewPost({...newPost, backgroundImage: e.target.value})}
                  placeholder="Enter background image URL"
                />
              </div>
            )}
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={newPost.published}
                  onChange={(e) => setNewPost({...newPost, published: e.target.checked})}
                />
                Publish immediately
              </label>
            </div>
            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    {editingPost ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  editingPost ? 'Update Post' : 'Add Post'
                )}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading && !showAddForm ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading blog posts...</p>
        </div>
      ) : (
        <div className="blog-posts-admin">
          {Array.isArray(blogPosts) && blogPosts.map((post) => (
          <div key={post.id} className="blog-post-admin">
            <div className="blog-post-content">
              <h3>{post.title}</h3>
              <p className="blog-post-meta">
                Created: {post.createdAt} | Updated: {post.updatedAt}
              </p>
              <p className="blog-post-preview">
                {post.content.substring(0, 200)}...
              </p>
            </div>
            <div className="blog-post-actions">
              <button 
                className="btn btn-sm btn-secondary"
                onClick={() => handleEditPost(post)}
              >
                Edit
              </button>
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => handleDeletePost(post.id)}
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

export default BlogManagement
