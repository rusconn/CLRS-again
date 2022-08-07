# 8 章 線形時間ソート

これまでに紹介してきたソートは、**ソート順は入力要素の比較にのみ基づいて決定される**と言う性質を共有している。  
この性質を持つアルゴリズムを**比較ソート**(comparison sorts)と呼ぶ。  
比較ソートは最悪 $\Omega(n\lg n)$ 回の比較が必要であるため、これより速くはならない。

本章では比較以外の演算を用いてソート順を決定するアルゴリズムを検討する。  
比較ソートの下界 $\Omega(n\lg n)$ は適用されない。

## 8.1 ソートの下界

決定木モデルを用いれば、任意の比較ソートアルゴリズムは最悪時に $\Omega(n\lg n)$ 回の比較が必要となることがわかる。  
詳細は省略。

## 8.2 計数ソート

**計数ソート**(counting sort)では、 $n$ 個の入力要素はある整数 $k$ に対して $0$ から $k$ の範囲の整数から選ばれると仮定する。  
$k = O(n)$ ならば計数ソートは $O(n)$ 時間で走る。

```pseudo
COUNTING-SORT(A, B, k):
  C[0..k] を新しい配列とする
  for i = 0 to k
    C[i] = 0
  for j = 1 to A.length
    C[A[j]] = C[A[j]] + 1
  // C[i] は i と等しい要素の数を示す
  for i = 1 to k
    C[i] = C[i] + C[i - 1]
  // C[i] は i 以下の要素の数を示す
  for j = A.length downto 1
    B[C[A[j]]] = A[j]
    C[A[j]] = C[A[j]] - 1
```

計数ソートの実行時間は $\Theta(k + n)$ だが、通常 $k = O(n)$ のときに用いるから実際には $\Theta(n)$ 。

計数ソートには**安定性**(stability)がある。  
安定性とは、同じ値の要素は入力に出現する順序で出力に出現するという性質のこと。

## 8.3 基数ソート

**基数ソート**(radix sort)は紙パンチカードのためのソート機械が用いていたアルゴリズム。

```pseudo
RADIX-SORT(A, d):
  for i = 1 to d
    安定ソートを用いて、第 i 桁に関して配列 A をソートする
```

サブルーチンとして用いる安定ソートの実行時間が $\Theta(n+k)$ のとき、基数ソートの実行時間は $\Theta(d(n + k))$ 。

## 8.4 バケツソート

**バケツソート**(bucket sort)は入力が一様分布に従うとき、平均実行時間 $O(n)$ を達成する。

各要素 $A[i]$ が $0 \le A[i] < 1$ であるとする際の擬似コードを示す。

```pseudo
BUCKET-SORT(A):
  n = A.length
  B[0..n-1] を新しい配列とする
  for i = 0 to n - 1
    B[i] を空リストに初期化する
  for i = 1 to n
    A[i] をリスト B[⌊nA[i]⌋] に挿入する
  for i = 0 to n - 1
    リスト B[i] を挿入ソートでソートする
  リスト B[0],B[1],...,B[n - 1] をこの順序で連結する
```

$n$ 個の**バケツ**(bucket)を用意し、各要素を対応するバケツへ挿入する。  
入力が一様分布に従うならば、各バケツのサイズは $1$ であり、各挿入ソートの実行時間も $\Theta(1)$ となる。

[← 前へ](../ch07/note.md)

[次へ →](../ch09/note.md)