import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/graphql': 'http://localhost:4000',
    },
    port: 3000,
  },
  preview: {
    proxy: {
      '/graphql': 'http://localhost:4000',
    },
    port: 3000,
  },
  plugins: [react()],
});