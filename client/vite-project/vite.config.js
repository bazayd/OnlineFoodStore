import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  server: {
    proxy: {
      '/notes': 'http://localhost:8080',
      '/users': 'http://localhost:8080'
    }
  },
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        login: resolve(root, 'login', 'index.html'),
        register: resolve(root, 'register', 'index.html')
      }
    }

  }
})
