import { assert, assertEquals, assertFalse, assertThrows, describe, it } from "/deps.ts";

import { SinglyLinkedList } from "./singly.ts";

describe("fromArray consumes the array", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [] },
    { input: [1, 2], output: [] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      SinglyLinkedList.fromArray(input);
      assertEquals(input, output);
    })
  );
});

describe("intoArray consumes the list", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [] },
    { input: [1, 2], output: [] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      const L = SinglyLinkedList.fromArray(input);
      L.intoArray();
      const array = L.intoArray();
      assertEquals(array, output);
    })
  );
});

describe("intoArray . fromArray is identity", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      const L = SinglyLinkedList.fromArray(input);
      assertEquals(L.intoArray(), output);
    })
  );
});

describe("search", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
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

  existPatterns.forEach(({ input: { A, val }, output }, i) =>
    it(`exist ${i}`, () => {
      const L = SinglyLinkedList.fromArray(A);
      assertEquals(L.search(val)?.val, output.val);
    })
  );

  notExistPatterns.forEach(({ input: { A, val }, output }, i) =>
    it(`not exist ${i}`, () => {
      const L = SinglyLinkedList.fromArray(A);
      assertEquals(L.search(val), output);
    })
  );
});

describe("searchBy", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
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

  eqByIdPatterns.forEach(({ input: { A, key, toKey }, output }, i) =>
    it(`id ${i}`, () => {
      const L = SinglyLinkedList.fromArray(A);
      assertEquals(L.searchBy(key, toKey)?.val, output);
    })
  );

  eqByNameEqPatterns.forEach(({ input: { A, key, toKey }, output }, i) =>
    it(`name ${i}`, () => {
      const L = SinglyLinkedList.fromArray(A);
      assertEquals(L.searchBy(key, toKey)?.val, output);
    })
  );
});

describe("reverse", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [2, 1] },
    { input: [3, 1, 2], output: [2, 1, 3] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      const L = SinglyLinkedList.fromArray(input);
      L.reverse();
      assertEquals(L.intoArray(), output);
    })
  );
});

describe("reverse . reverse is identity", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [] },
    { input: [1], output: [1] },
    { input: [1, 2], output: [1, 2] },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      const L = SinglyLinkedList.fromArray(input);
      L.reverse();
      L.reverse();
      assertEquals(L.intoArray(), output);
    })
  );
});

describe("merge", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { A: [], B: [] }, output: { A: [], B: [] } },
    { input: { A: [], B: [1] }, output: { A: [1], B: [] } },
    { input: { A: [1], B: [] }, output: { A: [1], B: [] } },
    { input: { A: [1], B: [2] }, output: { A: [1, 2], B: [] } },
    { input: { A: [4, 5, 6], B: [1, 2, 3] }, output: { A: [4, 5, 6, 1, 2, 3], B: [] } },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      const A = SinglyLinkedList.fromArray(input.A);
      const B = SinglyLinkedList.fromArray(input.B);
      A.merge(B);
      assertEquals(A.intoArray(), output.A);
      assertEquals(B.intoArray(), output.B);
    })
  );
});

describe("stack operations at head", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const L = new SinglyLinkedList<number>();

  assert(L.empty());

  assertThrows(() => L.popHead(), Error, "underflow.");

  L.pushHead(1);

  assertFalse(L.empty());
  assertEquals(L.popHead(), 1);
  assert(L.empty());

  L.pushHead(1);
  L.pushHead(2);

  assertFalse(L.empty());
  assertEquals(L.popHead(), 2);
  assertEquals(L.popHead(), 1);
  assert(L.empty());

  assertThrows(() => L.popHead(), Error, "underflow.");
});

describe("stack operations at tail", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const L = new SinglyLinkedList<number>();

  assert(L.empty());

  assertThrows(() => L.popTail(), Error, "underflow.");

  L.pushTail(1);

  assertFalse(L.empty());
  assertEquals(L.popTail(), 1);
  assert(L.empty());

  L.pushTail(1);
  L.pushTail(2);

  assertFalse(L.empty());
  assertEquals(L.popTail(), 2);
  assertEquals(L.popTail(), 1);
  assert(L.empty());

  assertThrows(() => L.popTail(), Error, "underflow.");
});

describe("queue operations from head to tail", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const L = new SinglyLinkedList<number>();

  assert(L.empty());

  assertThrows(() => L.popTail(), Error, "underflow.");

  L.pushHead(1);

  assertFalse(L.empty());
  assertEquals(L.popTail(), 1);
  assert(L.empty());

  L.pushHead(1);
  L.pushHead(2);

  assertFalse(L.empty());
  assertEquals(L.popTail(), 1);
  assertEquals(L.popTail(), 2);
  assert(L.empty());

  assertThrows(() => L.popTail(), Error, "underflow.");
});

describe("queue operations from tail to head", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const L = new SinglyLinkedList<number>();

  assert(L.empty());

  assertThrows(() => L.popHead(), Error, "underflow.");

  L.pushTail(1);

  assertFalse(L.empty());
  assertEquals(L.popHead(), 1);
  assert(L.empty());

  L.pushTail(1);
  L.pushTail(2);

  assertFalse(L.empty());
  assertEquals(L.popHead(), 1);
  assertEquals(L.popHead(), 2);
  assert(L.empty());

  assertThrows(() => L.popHead(), Error, "underflow.");
});
