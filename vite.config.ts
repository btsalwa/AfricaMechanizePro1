import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - split large libraries
          "vendor-react": ["react", "react-dom"],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-accordion",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-tooltip",
          ],
          "vendor-form": [
            "react-hook-form",
            "@hookform/resolvers",
            "zod",
            "zod-validation-error",
          ],
          "vendor-animation": ["framer-motion", "swiper"],
          "vendor-charts": ["recharts"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-icons": ["lucide-react", "react-icons"],
          "vendor-utils": [
            "date-fns",
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600, // Increase limit slightly but still enforce reasonable sizes
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
