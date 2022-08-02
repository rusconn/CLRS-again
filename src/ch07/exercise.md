# 7 章 練習問題

## 7.1-1

> 配列 $A = \langle 13,19,9,5,12,8,7,4,21,2,6,11 \rangle$ 上の $\text{PARTITION}$ の動作を示せ。

$\langle 13,19,9,5,12,8,7,4,21,2,6,11 \rangle$  
$\langle \textbf{9},19,\textbf{13},5,12,8,7,4,21,2,6,11 \rangle$  
$\langle 9,\textbf{5},13,\textbf{19},12,8,7,4,21,2,6,11 \rangle$  
$\langle 9,5,\textbf{8},19,12,\textbf{13},7,4,21,2,6,11 \rangle$  
$\langle 9,5,8,\textbf{7},12,13,\textbf{19},4,21,2,6,11 \rangle$  
$\langle 9,5,8,7,\textbf{4},13,19,\textbf{12},21,2,6,11 \rangle$  
$\langle 9,5,8,7,4,\textbf{2},19,12,21,\textbf{13},6,11 \rangle$  
$\langle 9,5,8,7,4,2,\textbf{6},12,21,13,\textbf{19},11 \rangle$  
$\langle 9,5,8,7,4,2,6,\textbf{11},21,13,19,\textbf{12} \rangle$

## 7.1-2

> 配列 $A[p..r]$ の要素がすべて同じ値のとき、 $\text{PARTITION}$ が返す $q$ の値を示せ。配列 $A[p..r]$ の要素がすべて同じ値のとき、 $q = \lfloor (p+r)/2 \rfloor$ を返すように $\text{PARTITION}$ を書き換えよ。

すべて同じ値のときは $r$ を返す。

書き換えた $\text{PARTITION}$ :

```pseudo
PARTITION(A, p, r):
  x = A[r]
  i = p - 1
  same = p - 1
  for j = p to r - 1
    if A[j] == x
      same = same + 1
    if A[j] <= x
      i = i + 1
      A[i] を A[j] と交換する
  A[i + 1] を A[r] と交換する
  if same == r - 1
    return ⌊(p + r) / 2⌋
  else
    return i + 1
```

## 7.1-3

> サイズ $n$ の部分配列上での $\text{PARTITION}$ の実行時間が $\Theta(n)$ となることを簡単に説明せよ。

**for 文**の実行回数は $\Theta(n)$ 回 、中身の計算の実行時間は $\Theta(1)$ なのでループ全体で $\Theta(n)$ 。  
その他の部分は $\Theta(1)$ 。

## 7.1-4

> 配列を降順でソートするように $\text{QUICKSORT}$ を書き換えよ。

$\text{PARTITION}$ 手続きの $A[j] \le x$ を $A[j] \ge x$ とする。

## 7.2-1

> 第 $7.2$ 節の冒頭で主張したように漸化式 $T(n) = T(n - 1) + \Theta(n)$ の解が $T(n) = \Theta(n^2)$ となることを、置換え法を用いて証明せよ。

？

## 7.2-2

> 配列 $A$ 要素がすべて同じ値のとき、 $\text{QUICKSORT}$ の実行時間を評価せよ。

$n$ 要素の分割が $n - 1$ と $0$ になるので [練習問題 7.2-1](#72-1) より $\Theta(n^2)$ となる。  
[練習問題 7.1-2](#71-2) の対応をしていれば $\Theta(n\lg n)$ 。

## 7.2-3

> 配列 $A$ の要素がすべて異なり、既に降順でソートされているとき、 $\text{QUICKSORT}$ の実行時間が $\Theta(n^2)$ であることを示せ。

$n$ 要素の分割が $0$ と $n - 1$ になるので [練習問題 7.2-1](#72-1) より $\Theta(n^2)$ となる。

## 7.2-4

スキップ

## 7.2-5

スキップ

## 7.2-6

スキップ

## 7.3-1

> 乱択アルゴリズムについては、最悪実行時間ではなく期待実行時間を解析するのはなぜか？

非乱択のアルゴリズムでは最悪実行時間を生じる入力がしばしば発生する。更に意図して生成することも可能かもしれない。  
しかし、乱択アルゴリズムであればそれらの可能性が低くなるから？

## 7.3-2

> 手続き $\text{RANDOMIZED-QUICKSORT}$ が実行中に乱数発生器 $\text{RANDOM}$ を呼び出す回数の最大値と最小値を示せ。 $\Theta$ 記法を用いて答えよ。

最大値: $Count(n) = Count(n - 1) + Count(0) + 1 = \Theta(n)$  
最小値: $Count(n) = 2Count(n/2) + 1 = \Theta(n)$

## 7.4-1

スキップ

## 7.4-2

スキップ

## 7.4-3

スキップ

## 7.4-4

スキップ

## 7.4-5

スキップ

## 7.4-6

スキップ
