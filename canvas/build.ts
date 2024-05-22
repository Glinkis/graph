import { watch } from "node:fs";
import html from "bun-plugin-html";

console.log("Building canvas...");

watch(import.meta.dir, async () => {
  console.log("Rebuilding canvas...");
  await Bun.build({
    entrypoints: ["./canvas/index.html"],
    outdir: "./dist",
    plugins: [html()],
  });
});
