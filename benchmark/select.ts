import { range } from "/data/array.ts";
import { bench, randInts } from "/util/mod.ts";

import { randomizedSelect, select } from "/ch09/code.ts";

for (const size of range(8, 22 + 1).map((x) => 2 ** x)) {
  const A = randInts(size, 0, size);
  const i = Math.floor(size / 2);

  const B = [...A];
  const C = [...A];

  const sort = () => select(B, i);
  const partition = () => randomizedSelect(C, i);

  const times = {
    sort: bench(sort),
    partition: bench(partition),
  };

  console.log({ size, times });
}
