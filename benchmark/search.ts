import { range } from "/data/array.ts";
import { bench, randInts } from "/util/mod.ts";

import { binarySearchIterative, linearSearch } from "/ch02/code.ts";

for (const size of range(14, 24 + 1).map((x) => 2 ** x)) {
  const A = randInts(size, 0, 100);
  A.sort((x, y) => x - y);
  const v = A[A.length / 2];

  const linear = () => linearSearch(A, v);
  const binary = () => binarySearchIterative(A, v);
  const builtin = () => A.indexOf(v);

  const times = {
    linear: bench(linear),
    binary: bench(binary),
    builtin: bench(builtin), // ソート済みの前提が無いので恐らく線形時間
  };

  console.log({ size, times });
}
