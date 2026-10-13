import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
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
