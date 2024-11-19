import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'build', // Output directory for production build
  },
  base: "/contacts-app-react-router",
  plugins: [react()],
})
