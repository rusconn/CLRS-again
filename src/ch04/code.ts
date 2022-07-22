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
  high = A.length - 1
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
  high: number
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
