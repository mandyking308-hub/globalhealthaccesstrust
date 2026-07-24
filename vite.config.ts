import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: [
      {
        find: "@/assets/family-medical-care.jpg",
        replacement: path.resolve(__dirname, "./src/assets/ghat-maternal-care.jpg"),
      },
      {
        find: "@/assets/conflict-ukraine-humanitarian.jpg",
        replacement: path.resolve(__dirname, "./src/assets/ghat-infrastructure-delivery.jpg"),
      },
      {
        find: "@/assets/education-training-hero.jpg",
        replacement: path.resolve(__dirname, "./src/assets/ghat-capacity-training.jpg"),
      },
      {
        find: "@/assets/policy-research-hero.jpg",
        replacement: path.resolve(__dirname, "./src/assets/ghat-hero-community-health.jpg"),
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
}));
