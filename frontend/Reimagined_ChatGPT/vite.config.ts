import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/user/register': { target: 'http://localhost:8080' },
      '/user/login': { target: 'http://localhost:8080' },
      '/chat/ai': { target: 'http://localhost:8080' },
      '/add/tozenlist/': { target: 'http://localhost:8080' },
      '/save/prompt': { target: 'http://localhost:8080' },
      '/chat/search': { target: 'http://localhost:8080' },
    }
  }
})
