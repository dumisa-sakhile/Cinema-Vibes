
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [
    EnvironmentPlugin(["TMDB_API_KEY"]),
  ],
  build: {
    sourcemap: false,
  },
});
