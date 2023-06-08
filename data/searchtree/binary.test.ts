import { assertEquals, describe, it } from "/deps.ts";

import { BinarySearchTree, Node } from "./binary.ts";

const bfNodeValues = [10, 4, 17, 1, 5, 16, 21];

const [ten, four, seventeen, one, five, sixteen, twentyone]: Node<number, number>[] = bfNodeValues
  .map((value) => ({
    key: value,
    value,
    p: null,
    left: null,
    right: null,
  }));

one.p = four;
five.p = four;
four.left = one;
four.right = five;
four.p = ten;
ten.left = four;
sixteen.p = seventeen;
twentyone.p = seventeen;
seventeen.left = sixteen;
seventeen.right = twentyone;
seventeen.p = ten;
ten.right = seventeen;

describe("search", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { root: ten, key: 100 }, output: undefined },
    { input: { root: ten, key: 10 }, output: ten },
    { input: { root: ten, key: 1 }, output: one },
    { input: { root: ten, key: 17 }, output: seventeen },
    { input: { root: sixteen, key: 17 }, output: undefined },
  ];

  patterns.forEach(({ input: { root, key }, output }, i) =>
    it(`${i}`, () => {
      const bst = new BinarySearchTree<number, number>(root);
      assertEquals(bst.search(key), output);
    })
  );
});

describe("minimum", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { root: ten }, output: one },
    { input: { root: four }, output: one },
    { input: { root: seventeen }, output: sixteen },
    { input: { root: five }, output: five },
    { input: { root: null }, output: undefined },
  ];

  patterns.forEach(({ input: { root }, output }, i) =>
    it(`${i}`, () => {
      const bst = new BinarySearchTree<number, number>(ten);
      assertEquals(bst.minimum(root), output);
    })
  );
});

describe("maximum", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { root: ten }, output: twentyone },
    { input: { root: four }, output: five },
    { input: { root: seventeen }, output: twentyone },
    { input: { root: five }, output: five },
    { input: { root: null }, output: undefined },
  ];

  patterns.forEach(({ input: { root }, output }, i) =>
    it(`${i}`, () => {
      const bst = new BinarySearchTree<number, number>(ten);
      assertEquals(bst.maximum(root), output);
    })
  );
});

describe("successor", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { root: ten }, output: sixteen },
    { input: { root: four }, output: five },
    { input: { root: seventeen }, output: twentyone },
    { input: { root: five }, output: ten },
    { input: { root: twentyone }, output: undefined },
  ];

  patterns.forEach(({ input: { root }, output }, i) =>
    it(`${i}`, () => {
      const bst = new BinarySearchTree<number, number>(ten);
      assertEquals(bst.successor(root), output);
    })
  );
});

describe("predecessor", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { root: ten }, output: five },
    { input: { root: seventeen }, output: sixteen },
    { input: { root: sixteen }, output: ten },
    { input: { root: five }, output: four },
    { input: { root: one }, output: undefined },
  ];

  patterns.forEach(({ input: { root }, output }, i) =>
    it(`${i}`, () => {
      const bst = new BinarySearchTree<number, number>(ten);
      assertEquals(bst.predecessor(root), output);
    })
  );
});
