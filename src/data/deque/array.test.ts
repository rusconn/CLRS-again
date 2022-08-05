import { ArrayDeque } from "./array";

describe("ArrayDeque", () => {
  test("operations", () => {
    const Q = new ArrayDeque<number>(3);

    expect(Q.empty()).toBe(true);

    expect(() => {
      Q.popHead();
    }).toThrowError("underflow.");

    expect(() => {
      Q.popTail();
    }).toThrowError("underflow.");

    Q.pushTail(1);
    Q.pushTail(2);
    Q.pushTail(3);

    expect(() => {
      Q.pushHead(4);
    }).toThrowError("overflow.");

    expect(() => {
      Q.pushTail(4);
    }).toThrowError("overflow.");

    expect(Q.empty()).toBe(false);

    expect(Q.popHead()).toBe(1);
    expect(Q.popTail()).toBe(3);
    expect(Q.popTail()).toBe(2);

    expect(Q.empty()).toBe(true);

    expect(() => {
      Q.popHead();
    }).toThrowError("underflow.");

    expect(() => {
      Q.popTail();
    }).toThrowError("underflow.");

    Q.pushHead(1);
    Q.pushHead(2);
    Q.pushHead(3);

    expect(() => {
      Q.pushHead(4);
    }).toThrowError("overflow.");

    expect(() => {
      Q.pushHead(4);
    }).toThrowError("overflow.");

    expect(Q.empty()).toBe(false);

    expect(Q.popTail()).toBe(1);
    expect(Q.popHead()).toBe(3);
    expect(Q.popHead()).toBe(2);

    expect(Q.empty()).toBe(true);

    expect(() => {
      Q.popHead();
    }).toThrowError("underflow.");

    expect(() => {
      Q.popTail();
    }).toThrowError("underflow.");
  });
});
