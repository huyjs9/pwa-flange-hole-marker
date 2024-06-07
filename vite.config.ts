import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// if in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const manifestPWA: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Flange Hole Marker',
    short_name: 'Flange Hole Marker',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), VitePWA(manifestPWA)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
