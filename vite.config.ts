import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': `${new URL('./src', import.meta.url).pathname}`,
    },
  },
  optimizeDeps: {
    include: ['react-responsive-carousel', 'react-icons'],
  },
})
