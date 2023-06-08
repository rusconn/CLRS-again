import { assertEquals, describe, it } from "/deps.ts";

import { range } from "/data/array.ts";
import * as SMat from "/data/matrix/square.ts";
import { randInt, randInts } from "/util/mod.ts";
import {
  complexMul,
  complexMulModify,
  maxDiffBruteForce,
  maxDiffKadane,
  maxDiffSubarrayBruteForce,
  maxDiffSubarrayDaC,
  maxSubarrayBruteForce,
  maxSubarrayDaC,
  maxSubarrayKadane,
  sMatMulDaC,
  sMatMulIjk,
  sMatMulIkj,
  strassen,
} from "./code.ts";

describe("maxSubarrayBruteForce", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [-1, -1, 0] },
    { input: [1], output: [0, 0, 1] },
    { input: [2, 1], output: [0, 1, 3] },
    { input: [1, -3], output: [0, 0, 1] },
    {
      input: [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7],
      output: [7, 10, 43],
    },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      assertEquals(maxSubarrayBruteForce(input), output);
    })
  );
});

describe("maxSubarrayDaC", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5).map((_) => ({
    input: randInts(10, -10, 10),
  }));

  patterns.forEach(({ input }) =>
    it(JSON.stringify({ input }), () => {
      // 分割統治法の結果が総当たり法の結果と一致することを確認する。
      // 最大部分配列は複数存在するかもしれないので部分和だけ確認する。
      const sumByDivide = maxSubarrayDaC(input)[2];
      const sumByBrute = maxSubarrayBruteForce(input)[2];
      assertEquals(sumByDivide, sumByBrute);
    })
  );
});

describe("maxSubarrayKadane", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5).map((_) => ({
    input: randInts(10, -10, 10),
  }));

  patterns.forEach(({ input }) =>
    it(JSON.stringify({ input }), () => {
      // kadaneのアルゴリズムの結果が総当たり法の結果と一致することを確認する。
      // 最大部分配列は複数存在するかもしれないが、どちらも最も左に存在するものの情報を
      // 返すので、結果が全て一致するか確認できる。
      const kadane = maxSubarrayKadane(input);
      const brute = maxSubarrayBruteForce(input);
      assertEquals(kadane, brute);
    })
  );
});

describe("maxDiffBruteForce", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: [], output: [-1, -1, 0] },
    { input: [1], output: [-1, -1, 0] },
    { input: [0, 1], output: [0, 1, 1] },
    { input: [10, 11, 7, 10, 6], output: [2, 3, 3] },
    {
      input: [100, 113, 110, 85, 105, 102, 86, 63, 81, 101, 94, 106, 101, 79, 94, 90, 97],
      output: [7, 11, 43],
    },
  ];

  patterns.forEach(({ input, output }, i) =>
    it(`${i}`, () => {
      assertEquals(maxDiffBruteForce(input), output);
    })
  );
});

describe("maxDiffSubarrayBruteForce", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5).map((_) => ({
    input: randInts(10, -10, 10),
  }));

  patterns.forEach(({ input }) =>
    it(JSON.stringify({ input }), () => {
      const diff1 = maxDiffSubarrayBruteForce(input);
      const diff2 = maxDiffBruteForce(input);
      assertEquals(diff1, diff2);
    })
  );
});

describe("maxDiffSubarrayDaC", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5).map((_) => ({
    input: randInts(10, -10, 10),
  }));

  patterns.forEach(({ input }) =>
    it(JSON.stringify({ input }), () => {
      const diff1 = maxDiffSubarrayDaC(input)[2];
      const diff2 = maxDiffBruteForce(input)[2];
      assertEquals(diff1, diff2);
    })
  );
});

describe("maxDiffKadane", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5).map((_) => ({
    input: randInts(10, -10, 10),
  }));

  patterns.forEach(({ input }) =>
    it(JSON.stringify({ input }), () => {
      const kadane = maxDiffKadane(input);
      const brute = maxDiffBruteForce(input);
      assertEquals(kadane, brute);
    })
  );
});

describe("sMatMulIjk", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { A: [[0]], B: [[1]] }, output: [[0]] },
    { input: { A: [[1]], B: [[0]] }, output: [[0]] },
    { input: { A: [[1]], B: [[2]] }, output: [[2]] },
    {
      input: {
        A: [
          [1, 3],
          [7, 5],
        ],
        B: [
          [6, 8],
          [4, 2],
        ],
      },
      output: [
        [18, 14],
        [62, 66],
      ],
    },
    {
      input: {
        A: [
          [1, 3],
          [7, 5],
        ],
        B: [
          [6, 8],
          [4, 2],
        ],
      },
      output: [
        [18, 14],
        [62, 66],
      ],
    },
  ];

  patterns.forEach(({ input: { A, B }, output }, i) =>
    it(`${i}`, () => {
      assertEquals(sMatMulIjk(A, B), output);
    })
  );
});

describe("sMatMulIkj", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5).map((n) => ({
    input: {
      A: SMat.createRand(2 ** n, 0, 10), // 0 と -0 は一致しないようなので 0以上としている
      B: SMat.createRand(2 ** n, 0, 10),
    },
  }));

  patterns.forEach(({ input: { A, B } }) =>
    it(JSON.stringify({ input: [A, B] }), () => {
      assertEquals(sMatMulIkj(A, B), sMatMulIjk(A, B));
    })
  );
});

describe("sMatMulDaC", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5).map((n) => ({
    input: {
      A: SMat.createRand(2 ** n, 0, 10),
      B: SMat.createRand(2 ** n, 0, 10),
    },
  }));

  patterns.forEach(({ input: { A, B } }) =>
    it(JSON.stringify({ input: [A, B] }), () => {
      assertEquals(sMatMulDaC(A, B), sMatMulIjk(A, B));
    })
  );
});

describe("strassen", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5).map((n) => ({
    input: {
      A: SMat.createRand(2 ** n, 0, 10),
      B: SMat.createRand(2 ** n, 0, 10),
    },
  }));

  patterns.forEach(({ input: { A, B } }) =>
    it(JSON.stringify({ input: [A, B] }), () => {
      // 素朴なアルゴリズムと結果を比較する
      assertEquals(strassen(A, B), sMatMulIjk(A, B));
    })
  );
});

describe("complexMul", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = [
    { input: { a: 1, b: 0, c: 2, d: 0 }, output: [2, 0] },
    { input: { a: 0, b: 1, c: 0, d: 2 }, output: [-2, 0] },
    { input: { a: 1, b: 1, c: 0, d: 2 }, output: [-2, 2] },
    { input: { a: 1, b: 1, c: 2, d: 2 }, output: [0, 4] },
    { input: { a: 2, b: 3, c: 1, d: -1 }, output: [5, 1] },
  ];

  patterns.forEach(({ input: { a, b, c, d }, output }, i) =>
    it(`${i}`, () => {
      assertEquals(complexMul(a, b, c, d), output);
    })
  );
});

describe("complexMulModify", {
  sanitizeOps: false,
  sanitizeResources: false,
  sanitizeExit: false,
}, () => {
  const patterns = range(5).map((_) => ({
    input: {
      a: randInt(0, 10), // 0 と -0 は一致しないようなので 0以上としている
      b: randInt(0, 10),
      c: randInt(0, 10),
      d: randInt(0, 10),
    },
  }));

  patterns.forEach(({ input: { a, b, c, d } }) =>
    it(JSON.stringify({ input: { a, b, c, d } }), () => {
      // 素朴なアルゴリズムと結果を比較する
      assertEquals(complexMulModify(a, b, c, d), complexMul(a, b, c, d));
    })
  );
});
