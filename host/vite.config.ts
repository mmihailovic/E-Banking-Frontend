import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import federation from "@originjs/vite-plugin-federation"

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        banking: "http://localhost:5001/assets/remoteEntry.js",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "@ui5/webcomponents-react",
        "react-redux",
        "redux",
      ],
    }),
  ],
  server: {
    port: 5002,
  },
  build: {
    target: "esnext",
  },
})
