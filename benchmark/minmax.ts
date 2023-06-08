import { range } from "/data/array.ts";
import { bench, randInts } from "/util/mod.ts";

import { minmax, minmaxByPairing } from "/ch09/code.ts";

for (const size of range(24 + 1).map((x) => 2 ** x)) {
  const A = randInts(size, 0, size);

  const naive = () => minmax(A);
  const pairing = () => minmaxByPairing(A);

  const times = {
    naive: bench(naive),
    pairing: bench(pairing),
  };

  console.log({ size, times });
}
