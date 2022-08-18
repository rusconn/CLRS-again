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

  /** O(h) */
  search(key: K) {
    let node = this.root;

    while (node != null && key !== node.key) {
      node = key < node.key ? node.left : node.right;
    }

    return node ?? undefined;
  }

  /** O(h) */
  minimum(node = this.root) {
    if (node == null) {
      return undefined;
    }

    while (node.left != null) {
      node = node.left;
    }

    return node;
  }

  /** O(h) */
  maximum(node = this.root) {
    if (node == null) {
      return undefined;
    }

    while (node.right != null) {
      node = node.right;
    }

    return node;
  }

  /** O(h) */
  successor(node: Node<K, V>) {
    if (node.right != null) {
      return this.minimum(node.right);
    }

    let succ = node.p;

    while (succ != null && node === succ.right) {
      node = succ;
      succ = succ.p;
    }

    return succ ?? undefined;
  }

  /** O(h) */
  predecessor(node: Node<K, V>) {
    if (node.left != null) {
      return this.maximum(node.left);
    }

    let pred = node.p;

    while (pred != null && node === pred.left) {
      node = pred;
      pred = pred.p;
    }

    return pred ?? undefined;
  }

  /** O(h) */
  insert(z: Node<K, V>) {
    let y = null;
    let x = this.root;

    // 置き換え先の null を探す
    while (x != null) {
      y = x;
      x = z.key < x.key ? x.left : x.right;
    }

    z.p = y;

    if (y == null) {
      this.root = z;
      return;
    }

    if (z.key < y.key) {
      y.left = z;
    } else {
      y.right = z;
    }
  }

  insertRecur(z: Node<K, V>) {
    this.insertRecurer(z, null, this.root);
  }

  /** O(h) */
  delete(z: Node<K, V>) {
    if (z.left == null) {
      this.transplant(z, z.right);
      return;
    }

    if (z.right == null) {
      this.transplant(z, z.left);
      return;
    }

    const y = this.minimum(z.right) as Node<K, V>;

    if (y.p !== z) {
      this.transplant(y, y.right);
      y.right = z.right;
      y.right.p = y;
    }

    this.transplant(z, y);
    y.left = z.left;
    y.left.p = y;
  }

  /** Θ(?) */
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

  /** O(h) */
  private insertRecurer(z: Node<K, V>, y: Node<K, V> | null, x: Node<K, V> | null) {
    if (x == null) {
      z.p = y;

      if (y == null) {
        this.root = z;
        return;
      }

      if (z.key < y.key) {
        y.left = z;
      } else {
        y.right = z;
      }

      return;
    }

    this.insertRecurer(z, x, z.key < x.key ? x.left : x.right);
  }

  /** O(1) */
  private transplant(u: Node<K, V>, v: Node<K, V> | null) {
    if (u.p == null) {
      this.root = v;
    } else if (u === u.p.left) {
      u.p.left = v;
    } else {
      u.p.right = v;
    }

    if (v != null) {
      v.p = u.p;
    }
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
