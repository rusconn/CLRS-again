import { BinarySearchTree, Node } from "./binary";

const bfNodeValues = [10, 4, 17, 1, 5, 16, 21];
const inorder = [1, 4, 5, 10, 16, 17, 21];
const preorder = [10, 4, 1, 5, 17, 16, 21];
const postorder = [1, 5, 4, 16, 21, 17, 10];

const [ten, four, seventeen, one, five, sixteen, twentyone]: Node<number, number>[] =
  bfNodeValues.map(value => ({
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

describe("console test", () => {
  const bst = new BinarySearchTree<number, number>(ten);
  const spyLog = jest.spyOn(console, "log");

  afterEach(() => {
    spyLog.mockReset();
  });

  afterAll(() => {
    spyLog.mockRestore();
  });

  test("walkInorderIter", () => {
    bst.walkInorderIter();
    expect(spyLog.mock.calls.flat()).toEqual(inorder);
  });

  test("walkInorder", () => {
    bst.walkInorder();
    expect(spyLog.mock.calls.flat()).toEqual(inorder);
  });

  test("walkPreorder", () => {
    bst.walkPreorder();
    expect(spyLog.mock.calls.flat()).toEqual(preorder);
  });

  test("walkPostorder", () => {
    bst.walkPostorder();
    expect(spyLog.mock.calls.flat()).toEqual(postorder);
  });
});

describe("search", () => {
  const patterns = [
    { input: { root: ten, key: 100 }, output: undefined },
    { input: { root: ten, key: 10 }, output: ten },
    { input: { root: ten, key: 1 }, output: one },
    { input: { root: ten, key: 17 }, output: seventeen },
    { input: { root: sixteen, key: 17 }, output: undefined },
  ];

  test.each(patterns)("%j", ({ input: { root, key }, output }) => {
    const bst = new BinarySearchTree<number, number>(root);
    expect(bst.search(key)).toEqual(output);
  });
});

describe("minimum", () => {
  const patterns = [
    { input: { root: ten }, output: one },
    { input: { root: four }, output: one },
    { input: { root: seventeen }, output: sixteen },
    { input: { root: five }, output: five },
    { input: { root: null }, output: undefined },
  ];

  test.each(patterns)("%j", ({ input: { root }, output }) => {
    const bst = new BinarySearchTree<number, number>(ten);
    expect(bst.minimum(root)).toEqual(output);
  });
});

describe("maximum", () => {
  const patterns = [
    { input: { root: ten }, output: twentyone },
    { input: { root: four }, output: five },
    { input: { root: seventeen }, output: twentyone },
    { input: { root: five }, output: five },
    { input: { root: null }, output: undefined },
  ];

  test.each(patterns)("%j", ({ input: { root }, output }) => {
    const bst = new BinarySearchTree<number, number>(ten);
    expect(bst.maximum(root)).toEqual(output);
  });
});

describe("successor", () => {
  const patterns = [
    { input: { root: ten }, output: sixteen },
    { input: { root: four }, output: five },
    { input: { root: seventeen }, output: twentyone },
    { input: { root: five }, output: ten },
    { input: { root: twentyone }, output: undefined },
  ];

  test.each(patterns)("%j", ({ input: { root }, output }) => {
    const bst = new BinarySearchTree<number, number>(ten);
    expect(bst.successor(root)).toEqual(output);
  });
});

describe("predecessor", () => {
  const patterns = [
    { input: { root: ten }, output: five },
    { input: { root: seventeen }, output: sixteen },
    { input: { root: sixteen }, output: ten },
    { input: { root: five }, output: four },
    { input: { root: one }, output: undefined },
  ];

  test.each(patterns)("%j", ({ input: { root }, output }) => {
    const bst = new BinarySearchTree<number, number>(ten);
    expect(bst.predecessor(root)).toEqual(output);
  });
});
