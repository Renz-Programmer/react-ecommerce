import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      // ✅ Let Vite handle CSS/JS asset selection automatically
      includeAssets: ["favicon.ico", "icon-192.png", "icon-512.png"],

      manifest: {
        name: "League Merch Store",
        short_name: "Merch Store",
        description: "League of Legends Inspired Merchandise Shop",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      },

      // ✅ FIXED — no globPatterns that break CSS
      workbox: {
        maximumFileSizeToCacheInBytes: 60 * 1024 * 1024,

        // ✅ Only cache API calls — NO CSS/JS interception
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.href.startsWith(`${import.meta.env.VITE_API_URL}/api`),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 }
            }
          },

          // ✅ Cache backend images safely
          {
            urlPattern: ({ url }) =>
              url.href.startsWith(`${import.meta.env.VITE_API_URL}/images`),
            handler: "CacheFirst",
            options: {
              cacheName: "backend-images",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },

          // ✅ Cache frontend images (safe + optional)
          {
            urlPattern: /\.(png|jpg|jpeg|svg|gif)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "frontend-images",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          }
        ]
      }
    })
  ],

  // ✅ Vercel needs this exact setting
  base: "/"
});
