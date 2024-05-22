import { expect, it, mock } from "bun:test";
import { Graph } from "./index.js";

it("can create a graph with several nodes and edges", () => {
  const graph = new Graph();

  const node1 = graph.addNode();
  const node2 = graph.addNode();
  const node3 = graph.addNode();

  const edge1 = graph.addEdge(node1.id, node2.id);
  const edge2 = graph.addEdge(node2.id, node3.id);

  expect(graph).toMatchObject({
    nodes: [node1, node2, node3],
    edges: [edge1, edge2],
  });
});

it("emits events when nodes and edges are added", () => {
  const graph = new Graph();

  const onNodeAdded = mock();
  const onEdgeAdded = mock();

  graph.events.on("nodeAdded", onNodeAdded);
  graph.events.on("edgeAdded", onEdgeAdded);

  const node = graph.addNode();
  const edge = graph.addEdge(node.id, node.id);

  expect(onNodeAdded).toHaveBeenCalledTimes(1);
  expect(onEdgeAdded).toHaveBeenCalledTimes(1);

  expect(onNodeAdded).toHaveBeenCalledWith(node);
  expect(onEdgeAdded).toHaveBeenCalledWith(edge);
});
