// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "./",

//   build: {
//     outDir: "../assets/build",
//     emptyOutDir: true,
//     manifest: true,
//   },
// });

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "./",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: "../assets/build",
    emptyOutDir: true,
    manifest: true,

    rollupOptions: {
      input: "src/main.tsx",
    },
  },
});
