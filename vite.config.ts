import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    drop: process.env.BUILD_TARGET === 'npm' ? ['console', 'debugger'] : [],
  },
  plugins: [
    vue({
      exclude: ['src/**/*.spec.ts'],
    }),
    dts({
      outDir: 'dist',
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.spec.ts'],
    }),
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      name: 'VueScrollPicker',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    sourcemap: true,
  },
})
