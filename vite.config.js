// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // // Опционально: укажите папку с исходниками, если она не корень (по умолчанию - корень)
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // Ваш основной файл
        settings: path.resolve(__dirname, 'SettingsPage.html'),
        auth: path.resolve(__dirname, 'AuthPage.html'),
        confirm: path.resolve(__dirname, 'ConfirmPage.html'),
      },
    },
  },
  // root: path.resolve(__dirname, 'htmls'),
  // build: {
  //   outDir: '.../dist',
  // },
  // Опционально: настройки сервера (например, чтобы открывать браузер автоматически)
  server: {
    proxy: {
      '/api': {
        target: 'https://mighty-cove-31255.herokuapp.com',
        changeOrigin: true,
        secure: false,
      },
    },
    open: true,
  },

  // Подключаем плагин для поддержки старых браузеров
  plugins: [],
});
