import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock data storage (in production, this would be a database)
let mockData = {
  blogs: [
    {
      id: '1',
      title: "Blog title heading will go here",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      image_name: null,
      image_file: null,
      published: true,
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      title: "Another Blog Post",
      content: "This is another blog post with different content. It demonstrates the blog management functionality.",
      image_name: null,
      image_file: null,
      published: false,
      created_at: '2024-01-16T14:20:00Z',
      updated_at: '2024-01-16T14:20:00Z'
    }
  ],
  contacts: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-0123',
      subject: 'Shipping Quote',
      message: 'I need a quote for shipping my products from New York to Los Angeles.',
      status: 'pending',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1-555-0456',
      subject: 'Logistics Services',
      message: 'Looking for logistics services for our e-commerce business.',
      status: 'read',
      created_at: '2024-01-16T14:20:00Z',
      updated_at: '2024-01-16T14:20:00Z'
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
      phone: '+1-555-0789',
      subject: 'Urgent Delivery',
      message: 'Need urgent delivery services for medical supplies.',
      status: 'replied',
      created_at: '2024-01-17T09:15:00Z',
      updated_at: '2024-01-17T09:15:00Z'
    }
  ],
  gallery: [
    {
      id: '1',
      src: '/assets/gallery 1.jpg',
      alt: 'Truck fleet',
      isMain: true,
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      src: '/assets/gallery2.png',
      alt: 'Container yard',
      isMain: false,
      created_at: '2024-01-16T14:20:00Z'
    },
    {
      id: '3',
      src: '/assets/gallery3.jpg',
      alt: 'Port operations',
      isMain: false,
      created_at: '2024-01-17T09:15:00Z'
    }
  ]
};

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple mock authentication (in production, use proper authentication)
  if (username === 'admin' && password === 'admin123') {
    res.json({
      success: true,
      message: 'Login successful',
      token: 'mock-jwt-token-' + Date.now()
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

app.get('/api/auth/verify', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token && token.startsWith('mock-jwt-token-')) {
    res.json({
      success: true,
      message: 'Token is valid'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Blog endpoints
app.get('/api/blogs', (req, res) => {
  res.json(mockData.blogs);
});

app.get('/api/blogs/public', (req, res) => {
  const publishedBlogs = mockData.blogs.filter(blog => blog.published);
  res.json(publishedBlogs);
});

app.get('/api/blogs/:id', (req, res) => {
  const blog = mockData.blogs.find(b => b.id === req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
});

app.post('/api/blogs', (req, res) => {
  const newBlog = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockData.blogs.push(newBlog);
  res.status(201).json(newBlog);
});

app.put('/api/blogs/:id', (req, res) => {
  const index = mockData.blogs.findIndex(b => b.id === req.params.id);
  if (index !== -1) {
    mockData.blogs[index] = {
      ...mockData.blogs[index],
      ...req.body,
      updated_at: new Date().toISOString()
    };
    res.json(mockData.blogs[index]);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
});

app.delete('/api/blogs/:id', (req, res) => {
  const index = mockData.blogs.findIndex(b => b.id === req.params.id);
  if (index !== -1) {
    mockData.blogs.splice(index, 1);
    res.json({ message: 'Blog deleted successfully' });
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
});

// Contact endpoints
app.get('/api/contacts', (req, res) => {
  res.json(mockData.contacts);
});

app.get('/api/contacts/:id', (req, res) => {
  const contact = mockData.contacts.find(c => c.id === req.params.id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

app.post('/api/contacts', (req, res) => {
  const newContact = {
    id: Date.now().toString(),
    ...req.body,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockData.contacts.push(newContact);
  res.status(201).json(newContact);
});

app.put('/api/contacts/:id', (req, res) => {
  const index = mockData.contacts.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    mockData.contacts[index] = {
      ...mockData.contacts[index],
      ...req.body,
      updated_at: new Date().toISOString()
    };
    res.json(mockData.contacts[index]);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

app.delete('/api/contacts/:id', (req, res) => {
  const index = mockData.contacts.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    mockData.contacts.splice(index, 1);
    res.json({ message: 'Contact deleted successfully' });
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

// Gallery endpoints
app.get('/api/gallery', (req, res) => {
  res.json(mockData.gallery);
});

app.post('/api/gallery/upload', (req, res) => {
  const newImage = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString()
  };
  mockData.gallery.push(newImage);
  res.status(201).json(newImage);
});

app.put('/api/gallery/:id', (req, res) => {
  const index = mockData.gallery.findIndex(g => g.id === req.params.id);
  if (index !== -1) {
    mockData.gallery[index] = {
      ...mockData.gallery[index],
      ...req.body
    };
    res.json(mockData.gallery[index]);
  } else {
    res.status(404).json({ message: 'Gallery image not found' });
  }
});

app.delete('/api/gallery/:id', (req, res) => {
  const index = mockData.gallery.findIndex(g => g.id === req.params.id);
  if (index !== -1) {
    mockData.gallery.splice(index, 1);
    res.json({ message: 'Gallery image deleted successfully' });
  } else {
    res.status(404).json({ message: 'Gallery image not found' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React Router (return index.html for all routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/`);
});
