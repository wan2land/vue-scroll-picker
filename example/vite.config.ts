import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue-scroll-picker': resolve(__dirname, '..'),
    },
  },
  build: {
    outDir: resolve(__dirname, '../example-dist'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }
          return id
            .toString()
            .split('node_modules/')[1]
            .split('/')[0]
            .toString()
        },
      },
    },
  },
})
