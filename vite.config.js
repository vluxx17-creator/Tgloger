import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Разрешаем Render показывать твой сайт
    allowedHosts: ['tgloger.onrender.com'],
    // Настройки для корректного запуска на портах Render
    port: 10000,
    host: true
  },
  preview: {
    // Дублируем разрешение для режима предпросмотра
    allowedHosts: ['tgloger.onrender.com'],
    port: 10000,
    host: true
  }
})
