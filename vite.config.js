import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [
    EnvironmentPlugin({
      prefix: ['TMDB_API_KEY'],
      safe: true, 
    }),
  ],
  build: {
    sourcemap: false,
  },
});
