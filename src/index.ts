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
    for (const edge of this.edges) {
      if (edge.source === source && edge.target === target) {
        return edge;
      }
    }

    const edge = new Edge(source, target);

    this.edges.push(edge);
    this.events.emit("edgeAdded", edge);

    return edge;
  }

  removeNode(nodeId: string) {
    for (let index = 0; index < this.edges.length; index++) {
      const edge = this.edges[index];
      if (edge.source === nodeId || edge.target === nodeId) {
        this.edges.splice(index, 1);
        break;
      }
    }

    for (let index = 0; index < this.nodes.length; index++) {
      const node = this.nodes[index];
      if (node.id === nodeId) {
        this.nodes.splice(index, 1);
        break;
      }
    }
  }
}
