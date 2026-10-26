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
        blogCommon: resolve(root, "blog-common-problems.html"),
        blogRepairVs: resolve(root, "blog-repair-vs-replacement.html"),
        contact: resolve(root, "contact.html"),
        computerRepair: resolve(root, "computer-repair.html"),
        computerTechnician: resolve(root, "computer-technician-near-me.html"),
        computerTech: resolve(root, "computer-tech-near-me.html"),
        computerService: resolve(root, "computer-service-near-me.html"),
        pcTechnician: resolve(root, "pc-technician-near-me.html"),
        laptopForRepair: resolve(root, "laptop-for-repair.html"),
        laptopComputerRepairNear: resolve(root, "laptop-computer-repair-near-me.html"),
        laptopComputerRepair: resolve(root, "laptop-computer-repair.html"),
        computerMechanic: resolve(root, "computer-mechanic-near-me.html"),
        cpuRepair: resolve(root, "cpu-repair.html"),
        serviceLaptop: resolve(root, "service-laptop-near-me.html"),
        laptopAndComputerNear: resolve(root, "laptop-and-computer-repair-near-me.html"),
        laptopPcRepair: resolve(root, "laptop-pc-repair-near-me.html"),
        laptopAndComputer: resolve(root, "laptop-and-computer-repair.html"),
      },
    },
  },
}));
