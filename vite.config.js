import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: false,
  },
  envDir: './',
  envPrefix: 'TMDB_API_KEY',
});
