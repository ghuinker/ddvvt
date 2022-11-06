import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/static/',
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve('./src/app/') }
    ]
  },
  build: {
    manifest: true,
    rollupOptions: {
      'app': path.resolve('src/app/app.entry.js'),
    }
  }
})
