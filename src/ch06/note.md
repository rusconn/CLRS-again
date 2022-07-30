# 6 章 ヒープソート

## 6.1 ヒープ

**（２分木）ヒープ((binary)heap)** は、おおよそ完全２分木とみなすことができるデータ構造。

配列でヒープを表現する場合、添字で親子（木の上下）を辿る。例えば２分木ヒープの場合はこうなる。

$\text{PARENT}(i)$: $\lfloor i/2 \rfloor$  
$\text{LEFT}(i)$: $2i$  
$\text{RIGHT}(i)$: $2i+1$

２分木ヒープには **max ヒープ** と **min ヒープ** がある。

max ヒープの条件: $A[\text{PARENT}(i)] \ge A[i]$  
min ヒープの条件: $A[\text{PARENT}(i)] \le A[i]$

葉からある節点までの単純路の辺数をその節点の **高さ** と表現する。  
ヒープの高さは根の高さとする。  
$n$ 要素のヒープの高さ $h$ は $\Theta(\lg n)$ となる。  
ヒープの基本演算は $O(h) = O(\lg n)$ で実現できる。

## 6.2 ヒープ条件の維持

max ヒープ条件を維持するために手続き`MAX-HEAPIFY`を呼び出す。  
`MAX-HEAPIFY`を呼び出すとき、 $\text{LEFT}(i)$ と $\text{RIGHT}(i)$ を根とする部分木は max ヒープであると仮定する。  
$A[i]$ はその子より小さく、max ヒープ条件に違反しているかもしれない。

```pseudo
MAX-HEAPIFY(A, i):
  l = LEFT(i)
  r = RIGHT(i)
  if l <= A.heap-size かつ A[l] > A[i]
    largest = l
  else
    largest = i
  if r <= A.heap-size かつ A[r] > A[largest]
    largest = r
  if largest != i
    A[i] を A[largest] と交換する
    MAX-HEAPIFY(A, largest)
```

`MAX-HEAPIFY`は $A[i]$ の値を max ヒープの中に"滑り落とし"、節点 $i$ を根とする部分木が max ヒープ条件を満たすようにしている。

与えられた節点 $i$ を根とするサイズ $n$ の部分木に対する`MAX-HEAPIFY`の実行時間は漸化式

$$
  T(n) \le T(2n/3) + \Theta(1)
$$

で表現できる（左右どちらの子部分木の最大サイズも $2n/3$ 以下）。  
マスター定理の場合２より、この漸化式の解は $T(n) = O(\lg n)$ となる。  
$h = \Theta(\lg n)$ なので、 $T(n) = O(h)$ とも言える。

[← 前へ](../ch04/note.md)
