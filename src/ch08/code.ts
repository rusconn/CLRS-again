/** Θ(n+k) */
export const countingSort = (A: readonly number[], k: number) => {
  const B = Array<number>(A.length);

  // C[i] は i の順位（i 以下の要素の数）
  const C = rank(A, k);

  // A[i] の順位こそが A[i] を B へ書き込む場所である
  for (let i = A.length - 1; i >= 0; i--) {
    B[C[A[i]] - 1] = A[i];
    C[A[i]] -= 1; // 同順位があった場合には左へ書いていく
  }

  return B;
};

/** Θ(n+k) */
export const rank = (A: readonly number[], k: number) => {
  const C = Array<number>(k + 1).fill(0);

  for (let i = 0; i < A.length; i++) {
    C[A[i]] += 1;
  }

  // C[i] は i の個数を示す

  for (let i = 1; i <= k; i++) {
    C[i] += C[i - 1];
  }

  // C[i] は i 以下の要素の数を示す
  return C;
};

/** Θ(n) */
export const countIntervalNaive = (A: readonly number[], a: number, b: number) => {
  let count = 0;

  for (let i = 0; i < A.length; i++) {
    if (a <= A[i] && A[i] <= b) {
      count++;
    }
  }

  return count;
};

/** Θ(n+k) */
export const countIntervalByRanking = (A: readonly number[], k: number, a: number, b: number) => {
  // 空の区間ってなんだよ
  if (a > b) {
    return 0;
  }

  // [0..k] とオーバーラップしないぞ
  if (b < 0 || k < a) {
    return 0;
  }

  // 以下 a ≤ b かつ [a..b] は [0..k] とオーバーラップする

  const C = rank(A, k);

  return countIntervalRanked(C, k, a, b);
};

/** O(1) */
export const countIntervalRanked = (C: readonly number[], k: number, a: number, b: number) => {
  const left = Math.max(0, a);
  const right = Math.min(k, b);
  return C[right] - (C[left - 1] ?? 0);
};
