import { BinaryHeapStack } from "./binheap";
import { ArrayDequeStack } from "./adeque";
import { ArrayQueueStack } from "./aqueue";
import { ArrayStack } from "./array";
import { BuiltInArrayStack } from "./biarray";

describe("push and pop", () => {
  const stacks = [
    { stack: new BinaryHeapStack<number>() },
    { stack: new ArrayDequeStack<number>(2) },
    { stack: new ArrayQueueStack<number>(2) },
    { stack: new ArrayStack<number>(2) },
    { stack: new BuiltInArrayStack<number>() },
  ];

  test.each(stacks)("stack No.%#", ({ stack }) => {
    stack.push(1);

    expect(stack.pop()).toBe(1);

    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);

    stack.push(4);
    stack.push(5);

    expect(stack.pop()).toBe(5);
    expect(stack.pop()).toBe(4);

    expect(stack.empty()).toBe(true);
  });
});
