import { ArrayStack } from "@/data/stack/array";

export type Node<K, V> = {
  key: K;
  value: V;
  p: Node<K, V> | null;
  left: Node<K, V> | null;
  right: Node<K, V> | null;
};

export class BinarySearchTree<K, V> {
  constructor(private root: Node<K, V> | null) {}

  /** O(?) */
  walkInorderIter() {
    const nodes = new ArrayStack<Node<K, V> | null>(128);
    const visited: Node<K, V>[] = [];

    nodes.push(this.root);

    while (!nodes.empty()) {
      const x = nodes.pop();

      if (x == null) {
        continue;
      }

      // Θ(n)
      if (visited.includes(x)) {
        console.log(x.value);
        continue;
      }

      visited.push(x);

      nodes.push(x.right);
      nodes.push(x);
      nodes.push(x.left);
    }
  }

  /** Θ(n) */
  walkInorder() {
    this.walkInorderRecur(this.root);
  }

  /** Θ(n) */
  walkPreorder() {
    this.walkPreorderRecur(this.root);
  }

  /** Θ(n) */
  walkPostorder() {
    this.walkPostorderRecur(this.root);
  }

  /** Θ(n) */
  private walkInorderRecur(node: Node<K, V> | null) {
    if (node != null) {
      this.walkInorderRecur(node.left);
      console.log(node.value);
      this.walkInorderRecur(node.right);
    }
  }

  /** Θ(n) */
  private walkPreorderRecur(node: Node<K, V> | null) {
    if (node != null) {
      console.log(node.value);
      this.walkPreorderRecur(node.left);
      this.walkPreorderRecur(node.right);
    }
  }

  /** Θ(n) */
  private walkPostorderRecur(node: Node<K, V> | null) {
    if (node != null) {
      this.walkPostorderRecur(node.left);
      this.walkPostorderRecur(node.right);
      console.log(node.value);
    }
  }
}
