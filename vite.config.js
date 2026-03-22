import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
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
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 60000000,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif}"],
        runtimeCaching: [
          {
            urlPattern: new RegExp(`${process.env.VITE_API_URL}/api/.*`),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
            },
          },
          {
            urlPattern: new RegExp(`${process.env.VITE_API_URL}/images/.*`),
            handler: "NetworkFirst",
            options: {
              cacheName: "backend-images",
              expiration: { maxEntries: 50, maxAgeSeconds: 60*60*24*30 },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "frontend-images",
              expiration: { maxEntries: 100, maxAgeSeconds: 60*60*24*30 },
            },
          },
        ],
      },
    }),
  ],
  base: "/",
});