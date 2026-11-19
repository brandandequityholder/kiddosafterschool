import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Preview-only build: classic (non-module) IIFE bundle, relative asset paths, hash routing.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-preview',
    modulePreload: false,
    cssCodeSplit: false,
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'assets/app.js', assetFileNames: 'assets/[name][extname]' } },
  },
})
