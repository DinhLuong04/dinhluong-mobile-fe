import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      react(),
      // Chỉ dùng SSL khi đang chạy 'npm run dev' (command === 'serve')
      // Khi deploy (command === 'build') nó sẽ tự biến mất
      command === 'serve' ? basicSsl() : null, 
    ],
    server: {
      port: 5173,
    }
  }
})