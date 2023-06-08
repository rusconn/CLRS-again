export const stringHash = (s: string, m: number) => {
  let sum = 0n; // 非常に大きくなる

  for (let i = 0; i < s.length; i++) {
    sum += BigInt(s.charCodeAt(i)) * 128n ** BigInt(s.length - 1 - i);
  }

  return Number(sum % BigInt(m));
};

export const hornerHash = (s: string, m: number) => {
  let sum = 0; // m 未満に抑えられる

  for (let i = 0; i < s.length; i++) {
    sum = (s.charCodeAt(i) + 128 * sum) % m;
  }

  return sum;
};
