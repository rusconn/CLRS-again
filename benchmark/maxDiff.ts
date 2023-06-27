import { range } from "/data/array.ts";
import { bench, randInts } from "/util/mod.ts";

import {
  maxDiffBruteForce,
  maxDiffKadane,
  maxDiffSubarrayBruteForce,
  maxDiffSubarrayDaC,
} from "/ch04/code.ts";

for (const size of range(10, 16 + 1).map((x) => 2 ** x)) {
  const A = randInts(size, 80, 120);

  const brute = () => maxDiffBruteForce(A);
  const subBrute = () => maxDiffSubarrayBruteForce(A);
  const subDac = () => maxDiffSubarrayDaC(A);
  const kadane = () => maxDiffKadane(A);

  const times = {
    brute: bench(brute),
    subBrute: bench(subBrute),
    subDac: bench(subDac),
    kadane: bench(kadane),
  };

  console.log({ size, times });
}
