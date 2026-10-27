import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, strictPort: true },
  build: {
    // scripts/prerender.mjs reads the manifest to preload each page's own chunk.
    manifest: true,
    rollupOptions: {
      output: {
        // React and the router change rarely, so they get their own long-cached file.
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|react-router|scheduler)\//.test(id)) return "vendor";
        },
      },
    },
  },
});
