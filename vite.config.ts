import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Allow external connections
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '75f7081b1281.ngrok-free.app', // Allow ngrok host
      '.ngrok-free.app', // Allow any ngrok-free.app subdomain
      '.ngrok.io' // Allow any ngrok.io subdomain (in case of different ngrok plans)
    ]
  }
})