import { range } from "/data/array.ts";
import { bench, randInt, randInts } from "/util/mod.ts";

import {
  countIntervalByRanking,
  countIntervalNaive,
  countIntervalRanked,
  rank,
} from "/ch08/code.ts";

for (const size of range(10, 24 + 1).map((x) => 2 ** x)) {
  const A = randInts(size, 0, 10_000);
  const k = 10_000;
  const a = randInt(0, 5_000);
  const b = randInt(5_000, 10_000);

  const C = rank(A, k);

  const naive = () => countIntervalNaive(A, a, b);
  const withPreprocess = () => countIntervalByRanking(A, k, a, b);
  const preprocessed = () => countIntervalRanked(C, k, a, b);

  const times = {
    naive: bench(naive),
    withPreprocess: bench(withPreprocess),
    preprocessed: bench(preprocessed),
  };

  console.log({ size, times });
}
