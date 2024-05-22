import { EventEmitter } from "./EventEmitter.js";
import { generateId } from "./utils.js";

/**
 * An edge is a connection between two nodes.
 * @see https://en.wikipedia.org/wiki/Glossary_of_graph_theory#edge
 */
class Edge {
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
class Node {
  readonly id = generateId();
}

/**
 * A graph is a collection of nodes and edges.
 * @see https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)
 */
export class Graph {
  public readonly nodes: Node[] = [];
  public readonly edges: Edge[] = [];

  readonly events = new EventEmitter<{
    nodeAdded: (node: Node) => void;
    edgeAdded: (edge: Edge) => void;
  }>();

  addNode() {
    const node = new Node();

    this.nodes.push(node);
    this.events.emit("nodeAdded", node);

    return node;
  }

  addEdge(source: string, target: string) {
    const edge = new Edge(source, target);

    this.edges.push(edge);
    this.events.emit("edgeAdded", edge);

    return edge;
  }
}
