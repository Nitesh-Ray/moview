import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Movie Search App",
        short_name: "MovieSearch",
        description: "Search and save your favourite movies",
        theme_color: "#1e40af",
        background_color: "#111827",
        display: "standalone",
        icons: [
          {src: "pwa-192x192.png", sizes: "192x192", type: "image/png"},
          {src: "pwa-512x512.png", sizes: "512x512", type: "image/png"},
        ],
      },
      workbox: {
        navigateFallback: "/offline.html",
      },
    }),
  ],
});
