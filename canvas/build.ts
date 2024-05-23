import { watch } from "node:fs";
import html from "bun-plugin-html";

async function build() {
  await Bun.build({
    entrypoints: ["./canvas/index.html"],
    outdir: "./dist",
    plugins: [html()],
  });
}

if (process.argv.includes("--watch")) {
  console.log("Building canvas in watch mode...");
  watch(import.meta.dir, async () => {
    console.log("Rebuilding canvas...");
    await build();
  });
} else {
  console.log("Building canvas once...");
  await build();
}
