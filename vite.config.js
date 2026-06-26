import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite' // ← add this

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(), // ← add this
  ],
  test: {
    globals: true,             // so we don't need to import `describe`, `it`, `expect`
    environment: 'jsdom',      // simulates a browser
    setupFiles: './src/test/setup.js',  // runs before each test file
    css: true,                 // optional: handle CSS imports
  },
})
