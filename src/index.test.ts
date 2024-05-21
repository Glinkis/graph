import { expect, it } from "bun:test";
import { Edge, Graph, Node } from "./index.js";

it("can create a graph with several nodes and edges", () => {
  const graph = new Graph();

  const node1 = new Node();
  graph.addNode(node1);

  const node2 = new Node();
  graph.addNode(node2);

  const node3 = new Node();
  graph.addNode(node3);

  const edge1 = new Edge(node1, node2);
  graph.addEdge(edge1);

  const edge2 = new Edge(node2, node3);
  graph.addEdge(edge2);

  expect(graph).toMatchObject({
    nodes: [node1, node2, node3],
    edges: [edge1, edge2],
  });
});
