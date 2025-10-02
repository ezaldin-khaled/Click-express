export interface Service {
  id: string
  title: string
  description: string
  category: string
  image: string
  author: string
  date: string
  readTime: string
  features?: string[]
  pricing?: string
  benefits?: string[]
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface NavigationItem {
  label: string
  href: string
  hasDropdown?: boolean
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  isMain?: boolean
}

export interface BlogPost {
  id: string
  title: string
  content: string
  hasBackgroundImage: boolean
  backgroundImage?: string
  published?: boolean
  createdAt: string
  updatedAt: string
}

export interface EmailSubscriber {
  id: string
  email: string
  firstName?: string
  lastName?: string
  subscribedAt: string
  isActive: boolean
}

export interface ContactSubmission {
  id: string
  email: string
  phone: string
  firstName: string
  lastName: string
  message: string
  submittedAt: string
  status: 'pending' | 'read' | 'replied'
}
