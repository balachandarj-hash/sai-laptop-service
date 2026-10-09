import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ command }) => ({
  // Relative asset paths so GitHub project pages work at /<repo>/.
  base: command === "build" ? "./" : "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        services: resolve(root, "services.html"),
        about: resolve(root, "about.html"),
        why: resolve(root, "why.html"),
        gallery: resolve(root, "gallery.html"),
        contact: resolve(root, "contact.html"),
      },
    },
  },
}));
