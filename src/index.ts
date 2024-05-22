import { EventEmitter } from "./EventEmitter.js";
import { generateId } from "./utils.js";

/**
 * An edge is a connection between two nodes.
 * @see https://en.wikipedia.org/wiki/Glossary_of_graph_theory#edge
 */
export class Edge {
  readonly source: string;
  readonly target: string;

  constructor(source: string, target: string) {
    this.source = source;
    this.target = target;
  }
}

/**
 * A node is a point in a graph.
 * @see https://en.wikipedia.org/wiki/Vertex_(graph_theory)
 */
export class Node {
  readonly id = generateId();
}

/**
 * A graph is a collection of nodes and edges.
 * @see https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)
 */
export class Graph {
  private readonly nodes: Node[] = [];
  private readonly edges: Edge[] = [];

  readonly events = new EventEmitter<{
    nodeAdded: (node: Node) => void;
    edgeAdded: (edge: Edge) => void;
  }>();

  addNode(node: Node) {
    this.nodes.push(node);
    this.events.emit("nodeAdded", node);
  }

  addEdge(edge: Edge) {
    this.edges.push(edge);
    this.events.emit("edgeAdded", edge);
  }
}
