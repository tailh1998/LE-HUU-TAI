import { fileURLToPath, URL } from "url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src/", import.meta.url))
      },
      {
        find: "@components",
        replacement: fileURLToPath(new URL("./src/components/", import.meta.url))
      },
      {
        find: "@hooks",
        replacement: fileURLToPath(new URL("./src/hooks/", import.meta.url))
      },
      {
        find: "@public",
        replacement: fileURLToPath(new URL("./public/", import.meta.url))
      },
      {
        find: "types",
        replacement: fileURLToPath(new URL("./src/@types/", import.meta.url))
      }
    ]
  }
})
