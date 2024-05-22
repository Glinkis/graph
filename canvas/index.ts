import { Graph } from "../src/index.js";

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

const graph = new Graph();

const node1 = graph.addNode();
const node2 = graph.addNode();
const node3 = graph.addNode();
const node4 = graph.addNode();

graph.addEdge(node1.id, node2.id);
graph.addEdge(node2.id, node3.id);

type Position = {
  x: number;
  y: number;
};

const canvasPosition: Position = {
  x: 0,
  y: 0,
};

canvas.addEventListener("pointerdown", (event: PointerEvent) => {
  const initialPosition: Position = {
    x: event.clientX - canvasPosition.x,
    y: event.clientY - canvasPosition.y,
  };

  const move = (event: PointerEvent) => {
    canvasPosition.x = event.clientX - initialPosition.x;
    canvasPosition.y = event.clientY - initialPosition.y;
  };

  const cleanup = () => {
    removeEventListener("pointermove", move);
    removeEventListener("pointerup", cleanup);
  };

  addEventListener("pointermove", move);
  addEventListener("pointerup", cleanup);
});

const nodePositions = new Map<string, Position>([
  [node1.id, { x: 100, y: 100 }],
  [node2.id, { x: 200, y: 200 }],
  [node3.id, { x: 300, y: 100 }],
  [node4.id, { x: 400, y: 200 }],
]);

function render() {
  if (ctx == null) {
    throw new Error("2d context not supported");
  }

  canvas.width = devicePixelRatio * innerWidth;
  canvas.height = devicePixelRatio * innerHeight;

  canvas.style.width = "100vw";
  canvas.style.height = "100vh";

  ctx.fillStyle = COLOR_PALETTE.BACKGROUND;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.scale(devicePixelRatio, devicePixelRatio);

  ctx.translate(
    devicePixelRatio / canvasPosition.x,
    devicePixelRatio / canvasPosition.y,
  );

  for (const node of graph.nodes) {
    const position = nodePositions.get(node.id);

    if (position) {
      ctx.lineWidth = 4;
      ctx.strokeStyle = COLOR_PALETTE.QUATERNARY;
      ctx.fillStyle = COLOR_PALETTE.PRIMARY;
      ctx.beginPath();
      ctx.arc(
        position.x + canvasPosition.x,
        position.y + canvasPosition.y,
        10,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.stroke();
    }
  }

  for (const edge of graph.edges) {
    const sourcePosition = nodePositions.get(edge.source);
    const targetPosition = nodePositions.get(edge.target);

    if (sourcePosition && targetPosition) {
      ctx.strokeStyle = COLOR_PALETTE.PRIMARY;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(
        sourcePosition.x + canvasPosition.x,
        sourcePosition.y + canvasPosition.y,
      );
      ctx.lineTo(
        targetPosition.x + canvasPosition.x,
        targetPosition.y + canvasPosition.y,
      );
      ctx.stroke();
    }
  }

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
