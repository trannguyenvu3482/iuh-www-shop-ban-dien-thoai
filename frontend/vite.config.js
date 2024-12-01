import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    server: { https: true },
    port: 3000,
  },
  optimizeDeps: {
    include: ['swiper/react', 'swiper'],
  },
})
