/** Execute the f() and return the elapsed time in ms */
export const bench = (f: () => unknown, fractionDigits = 3) => {
  const before = performance.now();
  f();
  const after = performance.now();
  return (after - before).toFixed(fractionDigits);
};
