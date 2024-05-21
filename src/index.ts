import { generateId } from "./utils.js";

/**
 * An edge is a connection between two nodes.
 * @see https://en.wikipedia.org/wiki/Glossary_of_graph_theory#edge
 */
export class Edge {
  source: string;
  target: string;

  constructor(source: Node, target: Node) {
    this.source = source.id;
    this.target = target.id;
  }
}

/**
 * A node is a point in a graph.
 * @see https://en.wikipedia.org/wiki/Vertex_(graph_theory)
 */
export class Node {
  id: string;

  constructor() {
    this.id = generateId();
  }
}

/**
 * A graph is a collection of nodes and edges.
 * @see https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)
 */
export class Graph {
  private nodes: Node[] = [];
  private edges: Edge[] = [];

  public addNode(node: Node) {
    this.nodes.push(node);
  }

  public addEdge(edge: Edge) {
    this.edges.push(edge);
  }
}
