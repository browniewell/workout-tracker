import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The React app lives in src/web. During development, Vite forwards
// any request to /api on to the Express server.
export default defineConfig({
  root: "src/web",
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  build: {
    outDir: "../../dist/web",
    emptyOutDir: true,
  },
});
