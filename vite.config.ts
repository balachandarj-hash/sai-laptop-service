import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  // Relative asset paths so GitHub project pages work at /<repo>/.
  base: command === "build" ? "./" : "/",
}));
