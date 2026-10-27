import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { Plugin } from "vite";

// In production the admin panel is its own Firebase site (target "admin") that rewrites every URL
// to admin.html. The dev server only has the public site's fallback, so /dashboard would 404 —
// send the admin's routes to admin.html here too. Dev login: http://localhost:8080/admin
const adminDevRoutes = (): Plugin => ({
  name: "admin-dev-routes",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const pathname = (req.url ?? "").split("?")[0];
      if (pathname === "/dashboard" || pathname === "/admin" || pathname.startsWith("/admin/")) req.url = "/admin.html";
      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), adminDevRoutes()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        user: path.resolve(__dirname, "index.html"),
        admin: path.resolve(__dirname, "admin.html"),
      },
      output: {
        // Large libraries change rarely, so keep them in their own long-cached chunks.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("/firebase/auth") || id.includes("/@firebase/auth")) return "firebase-auth";
          // Full Firestore SDK: admin panel only. Left to Rollup (not forced into the "firebase" chunk
          // the public site loads, which only needs Firestore Lite ".../firestore/lite/...").
          if (id.includes("webchannel-wrapper") || (/\/firestore\//.test(id) && !id.includes("/lite/"))) return;
          if (id.includes("firebase")) return "firebase";
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return "react";
        },
      },
    },
  },
}));
