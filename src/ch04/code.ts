import * as SMat from "/data/matrix/square.ts";

/** Θ(n^2) */
export const maxSubarrayBruteForce = (A: readonly number[]): [number, number, number] => {
  let [low, high, max] = [-1, -1, 0];

  for (let i = 0; i < A.length; i++) {
    let sum = 0;
    for (let j = i; j < A.length; j++) {
      sum += A[j];
      if (sum > max) {
        [low, high, max] = [i, j, sum];
      }
    }
  }

  return [low, high, max];
};

/** Θ(nlgn) (n=high-low+1) */
export const maxSubarrayDaC = (
  A: readonly number[],
  low = 0,
  high = A.length - 1,
): [number, number, number] => {
  if (high < low) {
    return [-1, -1, 0];
  }

  if (high === low) {
    // 空の部分配列を許容する
    return A[low] < 0 ? [-1, -1, 0] : [low, high, A[low]];
  }

  const mid = Math.floor((low + high) / 2);

  const [leftLow, leftHigh, leftSum] = maxSubarrayDaC(A, low, mid);
  const [rightLow, rightHigh, rightSum] = maxSubarrayDaC(A, mid + 1, high);
  const [crossLow, crossHigh, crossSum] = maxCrossingSubarray(A, low, mid, high);

  const max = Math.max(leftSum, rightSum, crossSum);

  switch (max) {
    case leftSum:
      return [leftLow, leftHigh, leftSum];
    case rightSum:
      return [rightLow, rightHigh, rightSum];
    default:
      return [crossLow, crossHigh, crossSum];
  }
};

/** Θ(n) (n=high-low+1) */
const maxCrossingSubarray = (
  A: readonly number[],
  low: number,
  mid: number,
  high: number,
): [number, number, number] => {
  let sum = 0;

  let [leftSum, maxLeft] = [-Infinity, -1];
  let [rightSum, maxRight] = [-Infinity, -1];

  for (let i = mid; i >= low; i--) {
    sum += A[i];
    if (sum > leftSum) {
      [leftSum, maxLeft] = [sum, i];
    }
  }

  sum = 0;

  for (let i = mid + 1; i <= high; i++) {
    sum += A[i];
    if (sum > rightSum) {
      [rightSum, maxRight] = [sum, i];
    }
  }

  return [maxLeft, maxRight, leftSum + rightSum];
};

/** Θ(n) */
export const maxSubarrayKadane = (A: readonly number[]): [number, number, number] => {
  let [low, high, max] = [-1, -1, 0];

  for (let i = 0, j = 0, max2 = 0; j < A.length; j++) {
    max2 += A[j];

    if (A[j] > max2) {
      [i, max2] = [j, A[j]];
    }

    if (max2 > max) {
      [low, high, max] = [i, j, max2];
    }
  }

  return [low, high, max];
};

/** Θ(n^2) */
export const maxDiffBruteForce = (A: readonly number[]): [number, number, number] => {
  let [low, high, max] = [-1, -1, 0];

  for (let i = 0; i < A.length - 1; i++) {
    for (let j = i + 1; j < A.length; j++) {
      if (A[j] - A[i] > max) {
        [low, high, max] = [i, j, A[j] - A[i]];
      }
    }
  }

  return [low, high, max];
};

const maxDiff =
  (maxSubarray: (D: number[]) => [number, number, number]) =>
  (A: readonly number[]): [number, number, number] => {
    const D = A.slice(1).map((next, i) => next - A[i]);
    const [low, high, max] = maxSubarray(D);
    return [low, high + 1, max];
  };

/** Θ(n^2) */
export const maxDiffSubarrayBruteForce = maxDiff(maxSubarrayBruteForce);

/** Θ(nlgn) (n=high-low+1) */
export const maxDiffSubarrayDaC = maxDiff(maxSubarrayDaC);

/** Θ(n) */
export const maxDiffKadane = maxDiff(maxSubarrayKadane);

/** Θ(n^3) */
export const sMatMulIjk = (
  A: SMat.Imu<number>,
  B: SMat.Imu<number>,
  ai = 0,
  aj = 0,
  bi = 0,
  bj = 0,
  s = A.length,
): SMat.Mut<number> => {
  const C = SMat.create(s, 0);

  for (let i = 0; i < s; i++) {
    for (let j = 0; j < s; j++) {
      for (let k = 0; k < s; k++) {
        C[i][j] += A[ai + i][aj + k] * B[bi + k][bj + j];
      }
    }
  }

  return C;
};

/** Θ(n^3) */
export const sMatMulIkj = (
  A: SMat.Imu<number>,
  B: SMat.Imu<number>,
  ai = 0,
  aj = 0,
  bi = 0,
  bj = 0,
  s = A.length,
): SMat.Mut<number> => {
  const C = SMat.create(s, 0);

  // アクセスするメモリ領域の連続性を高めるため ikj としている
  for (let i = 0; i < s; i++) {
    for (let k = 0; k < s; k++) {
      for (let j = 0; j < s; j++) {
        C[i][j] += A[ai + i][aj + k] * B[bi + k][bj + j];
      }
    }
  }

  return C;
};

/** Θ(n^3) */
export const sMatMulDaC = (
  A: SMat.Imu<number>,
  B: SMat.Imu<number>,
  ai = 0,
  aj = 0,
  bi = 0,
  bj = 0,
  s = A.length,
): SMat.Mut<number> => {
  if (s === 1) {
    return SMat.create(1, A[ai][aj] * B[bi][bj]);
  }

  if (s <= 256) {
    return sMatMulIkj(A, B, ai, aj, bi, bj, s);
  }

  const hs = s / 2;

  const aih = ai + hs;
  const ajh = aj + hs;
  const bih = bi + hs;
  const bjh = bj + hs;

  const C11 = SMat.add(
    sMatMulDaC(A, B, ai, aj, bi, bj, hs),
    sMatMulDaC(A, B, ai, ajh, bih, bj, hs),
  );
  const C12 = SMat.add(
    sMatMulDaC(A, B, ai, aj, bi, bjh, hs),
    sMatMulDaC(A, B, ai, ajh, bih, bjh, hs),
  );
  const C21 = SMat.add(
    sMatMulDaC(A, B, aih, aj, bi, bj, hs),
    sMatMulDaC(A, B, aih, ajh, bih, bj, hs),
  );
  const C22 = SMat.add(
    sMatMulDaC(A, B, aih, aj, bi, bjh, hs),
    sMatMulDaC(A, B, aih, ajh, bih, bjh, hs),
  );

  return SMat.merge(C11, C12, C21, C22);
};

/** Θ(n^lg7) */
export const strassen = (
  A: SMat.Imu<number>,
  B: SMat.Imu<number>,
  ai = 0,
  aj = 0,
  bi = 0,
  bj = 0,
  s = A.length,
): SMat.Mut<number> => {
  if (s === 1) {
    return SMat.create(1, A[ai][aj] * B[bi][bj]);
  }

  if (s <= 256) {
    return sMatMulIkj(A, B, ai, aj, bi, bj, s);
  }

  const hs = s / 2;

  const aih = ai + hs;
  const ajh = aj + hs;
  const bih = bi + hs;
  const bjh = bj + hs;

  const S1 = SMat.sub(B, B, bi, bjh, bih, bjh, hs);
  const S2 = SMat.add(A, A, ai, aj, ai, ajh, hs);
  const S3 = SMat.add(A, A, aih, aj, aih, ajh, hs);
  const S4 = SMat.sub(B, B, bih, bj, bi, bj, hs);
  const S5 = SMat.add(A, A, ai, aj, aih, ajh, hs);
  const S6 = SMat.add(B, B, bi, bj, bih, bjh, hs);
  const S7 = SMat.sub(A, A, ai, ajh, aih, ajh, hs);
  const S8 = SMat.add(B, B, bih, bj, bih, bjh, hs);
  const S9 = SMat.sub(A, A, ai, aj, aih, aj, hs);
  const S10 = SMat.add(B, B, bi, bj, bi, bjh, hs);

  const P1 = strassen(A, S1, ai, aj, 0, 0, hs);
  const P2 = strassen(S2, B, 0, 0, bih, bjh, hs);
  const P3 = strassen(S3, B, 0, 0, bi, bj, hs);
  const P4 = strassen(A, S4, aih, ajh, 0, 0, hs);
  const P5 = strassen(S5, S6, 0, 0, 0, 0, hs);
  const P6 = strassen(S7, S8, 0, 0, 0, 0, hs);
  const P7 = strassen(S9, S10, 0, 0, 0, 0, hs);

  const C11 = SMat.add(SMat.sub(SMat.add(P5, P4), P2), P6);
  const C12 = SMat.add(P1, P2);
  const C21 = SMat.add(P3, P4);
  const C22 = SMat.sub(SMat.sub(SMat.add(P5, P1), P3), P7);

  return SMat.merge(C11, C12, C21, C22);
};

export const complexMul = (a: number, b: number, c: number, d: number) => {
  const ac = a * c;
  const ad = a * d;
  const bc = b * c;
  const bd = b * d;
  return [ac - bd, ad + bc];
};

export const complexMulModify = (a: number, b: number, c: number, d: number) => {
  const ac = a * c;
  const bd = b * d;
  const acPadPbcPbd = (a + b) * (c + d);
  return [ac - bd, acPadPbcPbd - ac - bd];
};
