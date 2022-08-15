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
