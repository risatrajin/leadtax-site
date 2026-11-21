import fs from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The client's enquiry form (eTaskMe) is served through the site's own domain so it can load in
// the quick question modal; every host config has the same proxy (see README).
// Only LeadTax's own forms go through: the enquiry form (its slug, the send step and the thank-you
// page) and the document drop-off page with the steps its script posts to.
const site = JSON.parse(fs.readFileSync("src/content/site.json", "utf8"));
const { leadFormPath } = site;
const dropoffPath = site.apps.dropoff.path;
const etaskme = { target: "https://erp.etaskme.com", changeOrigin: true, cookieDomainRewrite: "" };
const etaskmeProxy = {
  "/PublicLead": {
    ...etaskme,
    bypass: (req) => (req.url === leadFormPath || /^\/PublicLead\/(Submit|Thanks)$/.test(req.url) ? undefined : "/404.html"),
  },
  // The document drop-off form, the same way.
  "/dropoff/": { ...etaskme, bypass: (req) => (req.url === dropoffPath ? undefined : "/404.html") },
  "/PublicDropoff/": {
    ...etaskme,
    bypass: (req) => (/^\/PublicDropoff\/(ValidateIntake|SendVerification|ConfirmVerification|SubmitPublic)$/.test(req.url) ? undefined : "/404.html"),
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, strictPort: true, proxy: etaskmeProxy },
  preview: { proxy: etaskmeProxy },
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
