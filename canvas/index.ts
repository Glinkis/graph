import { Graph } from "../src/index.js";
import { COLOR_PALETTE } from "./constants.js";
import { editMode, editModeToggle } from "./edit-mode-toggle.js";
import { resetPositionButton } from "./reset-position-button.js";

const NODE_INNER_RADIUS = 16;
const NODE_BORDER_WIDTH = 8;
const NODE_OUTER_RADIUS = NODE_INNER_RADIUS + NODE_BORDER_WIDTH;

const EDGE_WIDTH = 8;

const canvas = document.createElement("canvas");
document.body.append(canvas, resetPositionButton, editModeToggle);

const ctx = canvas.getContext("2d");
if (ctx == null) {
  throw new Error("2d context not supported");
}

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

const pointer: {
  moveEvent: PointerEvent | null;
} = {
  moveEvent: null,
};

const nodePositions = new Map<string, Position>([
  [node1.id, { x: 100, y: 100 }],
  [node2.id, { x: 200, y: 200 }],
  [node3.id, { x: 300, y: 100 }],
  [node4.id, { x: 400, y: 200 }],
]);

const dragPositions: {
  source: Position | null;
  target: Position | null;
} = {
  source: null,
  target: null,
};

function getPointerPosition(event: PointerEvent) {
  return {
    x: event.clientX - canvasPosition.x,
    y: event.clientY - canvasPosition.y,
  };
}

function getDistanceFromPointer(event: PointerEvent, position: Position) {
  const pointerPosition = getPointerPosition(event);

  return Math.hypot(
    pointerPosition.x - position.x,
    pointerPosition.y - position.y,
  );
}

resetPositionButton.addEventListener("click", () => {
  canvasPosition.x = 0;
  canvasPosition.y = 0;
});

// Disable right-click context menu.
canvas.oncontextmenu = () => {
  return false;
};

canvas.addEventListener("pointermove", (event: PointerEvent) => {
  pointer.moveEvent = event;
});

canvas.addEventListener("pointerdown", (event: PointerEvent) => {
  if (editMode === "move") {
    for (const node of nodePositions.values()) {
      const distance = getDistanceFromPointer(event, node);

      if (distance < NODE_OUTER_RADIUS) {
        const initialPosition: Position = {
          x: event.clientX - node.x,
          y: event.clientY - node.y,
        };

        const move = (event: PointerEvent) => {
          node.x = event.clientX - initialPosition.x;
          node.y = event.clientY - initialPosition.y;
        };

        const cleanup = () => {
          removeEventListener("pointermove", move);
          removeEventListener("pointerup", cleanup);
        };

        addEventListener("pointermove", move);
        addEventListener("pointerup", cleanup);
        return;
      }
    }

    const initialPosition = getPointerPosition(event);

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
  }

  if (editMode === "add-edge") {
    for (const [node1Id, node1] of nodePositions) {
      const distance = getDistanceFromPointer(event, node1);

      if (distance < NODE_OUTER_RADIUS) {
        const move = (event: PointerEvent) => {
          dragPositions.source = node1;
          dragPositions.target = getPointerPosition(event);
        };

        const cleanup = (event: PointerEvent) => {
          for (const [node2Id, node2] of nodePositions) {
            const distance = getDistanceFromPointer(event, node2);

            if (distance < NODE_OUTER_RADIUS) {
              graph.addEdge(node1Id, node2Id);
            }
          }

          removeEventListener("pointermove", move);
          removeEventListener("pointerup", cleanup);

          dragPositions.source = null;
          dragPositions.target = null;
        };

        addEventListener("pointermove", move);
        addEventListener("pointerup", cleanup);
        return;
      }
    }
  }
});

const drawNode = (position: Position) => {
  const x = position.x + canvasPosition.x;
  const y = position.y + canvasPosition.y;

  ctx.beginPath();
  ctx.arc(x, y, NODE_INNER_RADIUS, 0, Math.PI * 2);

  if (pointer.moveEvent) {
    const distance = getDistanceFromPointer(pointer.moveEvent, position);

    if (distance < NODE_OUTER_RADIUS) {
      ctx.lineWidth = NODE_BORDER_WIDTH;
      ctx.strokeStyle = COLOR_PALETTE.QUATERNARY;
      ctx.stroke();
    }
  }

  ctx.fillStyle = COLOR_PALETTE.PRIMARY;
  ctx.fill();
};

const drawEdge = (source: Position, target: Position) => {
  ctx.strokeStyle = COLOR_PALETTE.PRIMARY;
  ctx.lineWidth = EDGE_WIDTH;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(source.x + canvasPosition.x, source.y + canvasPosition.y);
  ctx.lineTo(target.x + canvasPosition.x, target.y + canvasPosition.y);
  ctx.stroke();
};

const render = () => {
  canvas.width = devicePixelRatio * innerWidth;
  canvas.height = devicePixelRatio * innerHeight;

  canvas.style.width = "100vw";
  canvas.style.height = "100vh";

  ctx.fillStyle = COLOR_PALETTE.BACKGROUND;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.translate(
    devicePixelRatio / canvasPosition.x,
    devicePixelRatio / canvasPosition.y,
  );
  ctx.scale(devicePixelRatio, devicePixelRatio);

  for (const edge of graph.edges) {
    const sourcePosition = nodePositions.get(edge.source);
    const targetPosition = nodePositions.get(edge.target);

    if (sourcePosition && targetPosition) {
      drawEdge(sourcePosition, targetPosition);
    }
  }

  for (const node of graph.nodes) {
    const position = nodePositions.get(node.id);

    if (position) {
      drawNode(position);
    }
  }

  if (dragPositions.source && dragPositions.target) {
    drawEdge(dragPositions.source, dragPositions.target);
  }

  requestAnimationFrame(render);
};

requestAnimationFrame(render);
