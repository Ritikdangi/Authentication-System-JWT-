import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use a relative base so built assets work when the backend serves the `dist` folder
export default defineConfig({
  base: './',
  plugins: [react()],
})
