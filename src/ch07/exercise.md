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
