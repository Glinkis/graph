import { watch } from "node:fs";
import html from "bun-plugin-html";

async function build() {
  await Bun.build({
    entrypoints: ["./canvas/index.html"],
    outdir: "./dist",
    plugins: [html()],
  });
}

if ("BUILD_ONCE" in process.env) {
  console.log("Building canvas once...");
  await build();
} else {
  console.log("Building canvas in watch mode...");
  watch(import.meta.dir, async () => {
    console.log("Rebuilding canvas...");
    await build();
  });
}
