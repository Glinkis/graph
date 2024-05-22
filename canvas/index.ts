const COLOR_PALETTE = {
  BACKGROUND: "#2a3d66",
  PRIMARY: "#3eb489",
  SECONDARY: "#ff6f61",
  TERTIARY: "#778899",
  QUATERNARY: "#f7f9fb",
};

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

if (ctx == null) {
  throw new Error("2d context not supported");
}

(function render() {
  requestAnimationFrame(render);
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  ctx.fillStyle = COLOR_PALETTE.BACKGROUND;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
})();
