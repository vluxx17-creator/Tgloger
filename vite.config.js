import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    // Разрешаем абсолютно любые хосты для разработки
    allowedHosts: true, 
    port: 10000,
    host: true
  },
  preview: {
    // Разрешаем абсолютно любые хосты для режима предпросмотра (Render)
    allowedHosts: true,
    port: 10000,
    host: true
  }
})
