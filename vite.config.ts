import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import { seoPlugin } from './vite/seo-plugin.ts'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [vue(), seoPlugin()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: isSsrBuild
    ? // Server bundle used only by scripts/prerender.mjs at build time.
      { copyPublicDir: false, emptyOutDir: true }
    : { rolldownOptions: { input: { main: 'index.html', notFound: '404.html' } } },
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
}))
