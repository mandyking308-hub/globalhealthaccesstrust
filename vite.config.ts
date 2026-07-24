import { execSync } from "node:child_process";
import path from "path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";

const resolveSourceCommit = () => {
  const environmentCommit =
    process.env.GITHUB_SHA ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.COMMIT_REF ||
    process.env.SOURCE_VERSION;

  if (environmentCommit) return environmentCommit.trim();

  try {
    return execSync("git rev-parse HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
};

const releaseManifest = (): Plugin => {
  const sourceCommit = resolveSourceCommit();

  return {
    name: "ghat-release-manifest",
    apply: "build",
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "release.json",
        source: JSON.stringify(
          {
            application: "Global Health Access Trust",
            source_commit: sourceCommit,
            source_commit_short: sourceCommit === "unknown" ? "unknown" : sourceCommit.slice(0, 7),
            built_at: new Date().toISOString(),
          },
          null,
          2,
        ),
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), releaseManifest(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
