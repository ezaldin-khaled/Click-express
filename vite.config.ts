import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: [
      'seahorse-app-8uwo9.ondigitalocean.app',
      'localhost',
      '127.0.0.1'
    ],
    cors: true,
    strictPort: true
  },
})
