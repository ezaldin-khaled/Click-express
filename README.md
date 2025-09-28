# CLICK EXPRESS - Transport & Storage LLC

A modern, responsive website for CLICK EXPRESS transport and storage company, built with React, TypeScript, and Vite.

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript, Vite
- **Responsive Design**: Fully responsive layout that works on all devices
- **Developer-Friendly**: Clean architecture with proper separation of concerns
- **Type Safety**: Full TypeScript support with proper type definitions
- **Performance**: Optimized with Vite for fast development and production builds
- **Styling**: Vanilla CSS with utility classes for clean, maintainable styles
- **Accessibility**: WCAG compliant with proper focus states and semantic HTML

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── layout/          # Layout components (Header, Footer, Layout)
│   ├── sections/        # Page sections (Hero, Services, About, Gallery)
│   └── ui/              # Basic UI components
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and constants
├── assets/              # Static assets (images, icons)
├── styles/              # Global styles and CSS
└── contexts/             # React contexts (if needed)
```

## 🛠️ Technologies Used

- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Vanilla CSS**: Custom utility classes for styling
- **React Router**: Client-side routing
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Development

### Component Structure

Each component follows this structure:
- Component file (`.tsx`)
- Types defined in `types/index.ts`
- Styled with Tailwind CSS classes
- Proper TypeScript interfaces

### Adding New Components

1. Create component in appropriate folder
2. Define types in `types/index.ts`
3. Export from component file
4. Import and use in parent components

### Styling Guidelines

- Use custom utility classes defined in `src/styles/index.css`
- Create custom components with semantic class names
- Use CSS custom properties for consistent theming
- Follow mobile-first responsive design

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Optimized images for different screen sizes

## ♿ Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- Focus states for keyboard navigation
- High contrast ratios
- ARIA labels where needed

## 🚀 Performance Optimizations

- Vite for fast builds and HMR
- Image optimization
- Code splitting with React Router
- Lazy loading for components
- Tree shaking for smaller bundles

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deployment

The built files can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3
- GitHub Pages

## 🔧 Configuration

### Vite Configuration

Located in `vite.config.ts`:
- React plugin
- Path aliases (@/ for src/)
- Development server settings
- Build optimizations

### CSS Configuration

Located in `src/styles/index.css`:
- Custom utility classes
- Color palette and typography
- Responsive breakpoints
- Component styles

### TypeScript Configuration

Located in `tsconfig.json`:
- Strict type checking
- Path mapping
- React JSX support

## 📄 License

This project is created for CLICK EXPRESS transport and storage company.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Support

For support, email info@clickexpress.com or call 1000 123 4567.# Click-express
