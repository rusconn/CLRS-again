import { ArrayStack } from "@/data/stack/array";

export type BinTree<T> = {
  root: BinTreeNode<T> | null;
};

export type BinTreeNode<T> = {
  val: T;
  parent: BinTreeNode<T> | null;
  left: BinTreeNode<T> | null;
  right: BinTreeNode<T> | null;
};

export type LCRSBinTree<T> = {
  root: LCRSBinTreeNode<T> | null;
};

export type LCRSBinTreeNode<T> = {
  val: T;
  parent: LCRSBinTreeNode<T> | null;
  leftChild: LCRSBinTreeNode<T> | null;
  rightSibling: LCRSBinTreeNode<T> | null;
};

/** O(n) */
export const printValsRecursive = <T>(tree: BinTree<T>) => {
  const printValsRecur = (root: BinTreeNode<T> | null) => {
    if (root != null) {
      console.log(root.val);
      printValsRecur(root.left);
      printValsRecur(root.right);
    }
  };

  printValsRecur(tree.root);
};

/** O(n) */
export const printValsIterative = <T>(tree: BinTree<T>) => {
  const stack = new ArrayStack<BinTreeNode<T> | null>(100);

  stack.push(tree.root);

  while (!stack.empty()) {
    const root = stack.pop();

    if (root != null) {
      console.log(root.val);
      stack.push(root.right);
      stack.push(root.left);
    }
  }
};

/** O(n) (almost identical to printValsRecursive) */
export const printLCRSValsRecursive = <T>(tree: LCRSBinTree<T>) => {
  const printValsRecur = (root: LCRSBinTreeNode<T> | null) => {
    if (root != null) {
      console.log(root.val);
      printValsRecur(root.leftChild); // left -> leftChild
      printValsRecur(root.rightSibling); // right -> rightSibling
    }
  };

  printValsRecur(tree.root);
};

/** O(n) (almost identical to printValsIterative) */
export const printLCRSValsIterative = <T>(tree: LCRSBinTree<T>) => {
  const stack = new ArrayStack<LCRSBinTreeNode<T> | null>(100);

  stack.push(tree.root);

  while (!stack.empty()) {
    const root = stack.pop();

    if (root != null) {
      console.log(root.val);
      stack.push(root.rightSibling); // right -> rightSibling
      stack.push(root.leftChild); // left -> leftChild
    }
  }
};
