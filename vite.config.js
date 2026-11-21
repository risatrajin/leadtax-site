import fs from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The client's enquiry form (eTaskMe) is served through the site's own domain so it can load in
// the quick question modal; every host config has the same proxy (see README).
// Only LeadTax's own form (its slug, the send step and the thank-you page) goes through.
const leadFormPath = JSON.parse(fs.readFileSync("src/content/site.json", "utf8")).leadFormPath;
const leadFormProxy = {
  "/PublicLead": {
    target: "https://erp.etaskme.com",
    changeOrigin: true,
    cookieDomainRewrite: "",
    bypass: (req) => (req.url === leadFormPath || /^\/PublicLead\/(Submit|Thanks)$/.test(req.url) ? undefined : "/404.html"),
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, strictPort: true, proxy: leadFormProxy },
  preview: { proxy: leadFormProxy },
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
