import { range } from "@/data/array";
import { bench, randInt, randInts } from "@/util";

import { stringHash, hornerHash } from "@/ch11/code";

for (const size of range(15 + 1).map(x => 2 ** x)) {
  const a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);

  const s = randInts(size, a, z)
    .map(c => String.fromCharCode(c))
    .join("");

  const m = randInt(10, size);

  const naive = () => stringHash(s, m);
  const horner = () => hornerHash(s, m);

  const times = {
    naive: bench(naive),
    horner: bench(horner),
  };

  console.log({ size, times });
}
