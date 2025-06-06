import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    base: '/',                    //  relative path for Netlify if deploying from `dist/`
  plugins: [react()],
   test: {
    globals: true,
    environment: "jsdom",
  setupFiles:'./src/_tests_/setup.js',
  },
})
