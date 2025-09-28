import React, { useState } from 'react'
import { BlogPost } from '../../types'

const BlogManagement: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
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

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    hasBackgroundImage: false,
    backgroundImage: ''
  })

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault()
    const post: BlogPost = {
      id: Date.now().toString(),
      ...newPost,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    setBlogPosts([...blogPosts, post])
    setNewPost({ title: '', content: '', hasBackgroundImage: false, backgroundImage: '' })
    setShowAddForm(false)
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setNewPost({
      title: post.title,
      content: post.content,
      hasBackgroundImage: post.hasBackgroundImage,
      backgroundImage: post.backgroundImage || ''
    })
    setShowAddForm(true)
  }

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPost) return

    const updatedPost: BlogPost = {
      ...editingPost,
      ...newPost,
      updatedAt: new Date().toISOString().split('T')[0]
    }
    setBlogPosts(blogPosts.map(post => post.id === editingPost.id ? updatedPost : post))
    setEditingPost(null)
    setNewPost({ title: '', content: '', hasBackgroundImage: false, backgroundImage: '' })
    setShowAddForm(false)
  }

  const handleDeletePost = (id: string) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id))
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingPost(null)
    setNewPost({ title: '', content: '', hasBackgroundImage: false, backgroundImage: '' })
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
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingPost ? 'Update Post' : 'Add Post'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="blog-posts-admin">
        {blogPosts.map((post) => (
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
    </div>
  )
}

export default BlogManagement
