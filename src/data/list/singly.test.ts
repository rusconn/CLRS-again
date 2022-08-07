import { SinglyLinkedList } from "./singly";

describe("fromArray consumes the array", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [] },
    { input: [1, 2], output: [] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    SinglyLinkedList.fromArray(input);
    expect(input).toEqual(output);
  });
});

describe("intoArray consumes the list", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [] },
    { input: [1, 2], output: [] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    const L = SinglyLinkedList.fromArray(input);
    L.intoArray();
    const array = L.intoArray();
    expect(array).toEqual(output);
  });
});

describe("intoArray . fromArray is identity", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    const L = SinglyLinkedList.fromArray(input);
    expect(L.intoArray()).toEqual(output);
  });
});

describe("search", () => {
  const existPatterns = [
    { input: { A: [1], val: 1 }, output: { val: 1 } },
    { input: { A: [3, 1, 2], val: 3 }, output: { val: 3 } },
    { input: { A: [3, 1, 2], val: 1 }, output: { val: 1 } },
    { input: { A: [3, 1, 2], val: 2 }, output: { val: 2 } },
  ];

  const notExistPatterns = [
    { input: { A: [], val: 1 }, output: undefined },
    { input: { A: [1], val: 2 }, output: undefined },
    { input: { A: [2, 1], val: 3 }, output: undefined },
    { input: { A: [3, 1, 2], val: 4 }, output: undefined },
  ];

  test.each(existPatterns)("%j", ({ input: { A, val }, output }) => {
    const L = SinglyLinkedList.fromArray(A);
    expect(L.search(val)?.val).toEqual(output.val);
  });

  test.each(notExistPatterns)("%j", ({ input: { A, val }, output }) => {
    const L = SinglyLinkedList.fromArray(A);
    expect(L.search(val)).toBe(output);
  });
});

describe("searchBy", () => {
  type User = { id: number; name: string };
  const foo: User = { id: 1, name: "foo" };
  const bar: User = { id: 2, name: "bar" };
  const toId = (x: User) => x.id;
  const toName = (x: User) => x.name;

  const eqByIdPatterns = [
    { input: { A: [foo], key: 0, toKey: toId }, output: undefined },
    { input: { A: [foo], key: foo.id, toKey: toId }, output: foo },
    { input: { A: [foo, bar], key: bar.id, toKey: toId }, output: bar },
  ];

  const eqByNameEqPatterns = [
    { input: { A: [foo], key: "baz", toKey: toName }, output: undefined },
    { input: { A: [foo, bar], key: foo.name, toKey: toName }, output: foo },
  ];

  test.each(eqByIdPatterns)("%j", ({ input: { A, key, toKey }, output }) => {
    const L = SinglyLinkedList.fromArray(A);
    expect(L.searchBy(key, toKey)?.val).toEqual(output);
  });

  test.each(eqByNameEqPatterns)("%j", ({ input: { A, key, toKey }, output }) => {
    const L = SinglyLinkedList.fromArray(A);
    expect(L.searchBy(key, toKey)?.val).toEqual(output);
  });
});

describe("reverse", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [2, 1] },
    { input: [3, 1, 2], output: [2, 1, 3] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    const L = SinglyLinkedList.fromArray(input);
    L.reverse();
    expect(L.intoArray()).toEqual(output);
  });
});

describe("reverse . reverse is identity", () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    const L = SinglyLinkedList.fromArray(input);
    L.reverse();
    L.reverse();
    expect(L.intoArray()).toEqual(output);
  });
});

describe("merge", () => {
  const patterns = [
    { input: { A: [], B: [] }, output: { A: [], B: [] } },
    { input: { A: [], B: [1] }, output: { A: [1], B: [] } },
    { input: { A: [1], B: [] }, output: { A: [1], B: [] } },
    { input: { A: [1], B: [2] }, output: { A: [1, 2], B: [] } },
    { input: { A: [4, 5, 6], B: [1, 2, 3] }, output: { A: [4, 5, 6, 1, 2, 3], B: [] } },
  ];

  test.each(patterns)("%j", ({ input, output }) => {
    const A = SinglyLinkedList.fromArray(input.A);
    const B = SinglyLinkedList.fromArray(input.B);
    A.merge(B);
    expect(A.intoArray()).toEqual(output.A);
    expect(B.intoArray()).toEqual(output.B);
  });
});

describe("stack operations at head", () => {
  const L = new SinglyLinkedList<number>();

  expect(L.empty()).toBe(true);

  expect(() => {
    L.popHead();
  }).toThrowError("underflow.");

  L.pushHead(1);

  expect(L.empty()).toBe(false);
  expect(L.popHead()).toBe(1);
  expect(L.empty()).toBe(true);

  L.pushHead(1);
  L.pushHead(2);

  expect(L.empty()).toBe(false);
  expect(L.popHead()).toBe(2);
  expect(L.popHead()).toBe(1);
  expect(L.empty()).toBe(true);

  expect(() => {
    L.popHead();
  }).toThrowError("underflow.");
});

describe("stack operations at tail", () => {
  const L = new SinglyLinkedList<number>();

  expect(L.empty()).toBe(true);

  expect(() => {
    L.popTail();
  }).toThrowError("underflow.");

  L.pushTail(1);

  expect(L.empty()).toBe(false);
  expect(L.popTail()).toBe(1);
  expect(L.empty()).toBe(true);

  L.pushTail(1);
  L.pushTail(2);

  expect(L.empty()).toBe(false);
  expect(L.popTail()).toBe(2);
  expect(L.popTail()).toBe(1);
  expect(L.empty()).toBe(true);

  expect(() => {
    L.popTail();
  }).toThrowError("underflow.");
});

describe("queue operations from head to tail", () => {
  const L = new SinglyLinkedList<number>();

  expect(L.empty()).toBe(true);

  expect(() => {
    L.popTail();
  }).toThrowError("underflow.");

  L.pushHead(1);

  expect(L.empty()).toBe(false);
  expect(L.popTail()).toBe(1);
  expect(L.empty()).toBe(true);

  L.pushHead(1);
  L.pushHead(2);

  expect(L.empty()).toBe(false);
  expect(L.popTail()).toBe(1);
  expect(L.popTail()).toBe(2);
  expect(L.empty()).toBe(true);

  expect(() => {
    L.popTail();
  }).toThrowError("underflow.");
});

describe("queue operations from tail to head", () => {
  const L = new SinglyLinkedList<number>();

  expect(L.empty()).toBe(true);

  expect(() => {
    L.popHead();
  }).toThrowError("underflow.");

  L.pushTail(1);

  expect(L.empty()).toBe(false);
  expect(L.popHead()).toBe(1);
  expect(L.empty()).toBe(true);

  L.pushTail(1);
  L.pushTail(2);

  expect(L.empty()).toBe(false);
  expect(L.popHead()).toBe(1);
  expect(L.popHead()).toBe(2);
  expect(L.empty()).toBe(true);

  expect(() => {
    L.popHead();
  }).toThrowError("underflow.");
});
