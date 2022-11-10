const path = require('path');
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/static/',
  server: {
    port: 3000
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve('./src/app/') }
    ]
  },
  build: {
    manifest: true,
    rollupOptions: {
      input : {
        'app': path.resolve('src/app/app.entry.js'),
        'style': path.resolve('src/app/style.js')
      }
    }
  }
})
