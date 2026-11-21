import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['icon.svg'],
    manifest: { name: 'Minhas Compras', short_name: 'Compras', description: 'Lista de supermercado offline', theme_color: '#f7f8f6', background_color: '#f7f8f6', display: 'standalone', start_url: '/', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }] },
    workbox: { globPatterns: ['**/*.{js,css,html,svg,woff2}'] },
  })],
});
