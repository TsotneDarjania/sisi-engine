import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    open: true,
  },
  build: {
    rollupOptions: {
      input: "./index.html",
      output: {
        chunkFileNames: "assets/[name].js",
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
    assetsDir: "assets",
    sourcemap: false,
    manifest: false,
    assetsInlineLimit: 0,
  },
});
