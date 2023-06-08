# 9 章 練習問題

## 9.1-1

> $n$ 個の要素の中から２番目に小さい要素を最悪 $n + \lceil \lg n \rceil - 2$ 回の比較で発見できることを示せ。（**ヒント:** 最小の要素も求めよ。）

？

## 9.1-2 ★

> $n$ 個の要素の中から最小値と最大値を同時に求めるためには最悪 $\lceil 3n/2 \rceil - 2$ 回の比較が必要となることを示せ。（**ヒント:** 最大または最小の候補となり得る要素数と、比較がその個数に与える影響を考えよ。）

スキップ

## 9.2-1

> $\text{RANDOMIZED-SELECT}$ は長さ $0$ の配列に対する再帰呼出しを起こさないことを示せ。

スキップ

## 9.2-2

> 指標確率変数 $X_k$ と値 $T(max(k-1,n-k))$ が独立であることを示せ。

スキップ

## 9.2-3

> $\text{RANDOMIZED-SELECT}$ の繰返し版（再帰の代わりにループを用いる版）の擬似コードを書け。

```pseudo
RANDOMIZED-SELECT-ITERATIVE(A, p, r, i):
  while true
    if p == r
      return A[p]
    q = RANDOMIZED-PARTITION(A, p, r)
    k = q - p + 1
    if i == k // ピボット値が答
      return A[q]
    else if i < k
      r = q - 1
    else
      p = q + 1
      i = i - k
```

## 9.2-4

> $\text{RANDOMIZED-SELECT}$ を配列 $A = \langle 3,2,9,0,7,5,4,8,6,1 \rangle$ から最小値を選択するために用いるとする。 $\text{RANDOMIZED-SELECT}$ の性能が最悪になる分割列を求めよ。

最大要素がピボットに選ばれるやつ。  
$\langle 0,1,2,3,4,5,6,7,8 \rangle$ $\langle 9 \rangle$
