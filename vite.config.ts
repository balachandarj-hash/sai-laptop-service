import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ command }) => ({
  // Relative asset paths so GitHub project pages work at /<repo>/.
  base: command === "build" ? "./" : "/",
  build: {
    cssMinify: false,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        services: resolve(root, "services.html"),
        about: resolve(root, "about.html"),
        why: resolve(root, "why.html"),
        gallery: resolve(root, "gallery.html"),
        blog: resolve(root, "blog.html"),
        blogScreen: resolve(root, "blog-screen-keyboard-battery.html"),
        blogWhy: resolve(root, "blog-why-choose.html"),
        blogSsd: resolve(root, "blog-ssd-hard-disk.html"),
        contact: resolve(root, "contact.html"),
      },
    },
  },
}));
