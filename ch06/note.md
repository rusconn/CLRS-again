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

## 6.3 ヒープの構築

ボトムアップ的に手続き`MAX-HEAPIFY`を利用することで配列 $A[1..n]$ を max ヒープに変換できる。

```pseudo
BUILD-MAX-HEAP(A):
  A.heap-size = A.length
  for i = ⌊A.length / 2⌋ downto 1
    MAX-HEAPIFY(A, i)
```

$⌊A.length / 2⌋$ は子を持つ節点の最大の添字。

ループ不変式:

<i>**for 文**の各ループ実行開始時、各節点 $i+1,i+2,...,n$ はある max ヒープの根である。</i>

- **初期条件:** 最初のループ実行開始時、 $i=\lfloor n/2 \rfloor$ である。  
  各節点 $\lfloor n/2 \rfloor+1,\lfloor n/2 \rfloor+2,...,n$ は葉であり、自明な max ヒープの根である。

- **ループ内条件:** 省略

- **終了条件:** 手続きは $i=0$ で終了する。ループ不変式から、 $1,2,...,n$ はある max ヒープの根である。  
  節点１が max ヒープの根なので、全体が max ヒープになっている。

`BUILD-MAX-HEAP`の実行時間を考える。  
直観的には実行時間が $O(\lg n)$ である`MAX-HEAPIFY`を $O(n)$ 回呼び出すので、 $O(n\lg n)$ と言える。  
この上界は誤りではないが、漸近的にタイトではない。  
`MAX-HEAPIFY`の実行時間はその節点の高さに依存するので、 $n$ が固定ではない。  
計算は省略するが、`BUILD-MAX-HEAP`の実行時間は $O(n)$ となる。

## 6.4 ヒープソートアルゴリズム

これまでの手続きを使ってソートアルゴリズムを作れる。

```pseudo
HEAPSORT(A):
  BUILD-MAX-HEAP(A)
  for i = A.length downto 2
    A[1] を A[i] と交換する
    A.heap-size = A.heap-size - 1
    MAX-HEAPIFY(A, 1)
```

max ヒープの根は全体の最大要素なので、ソート後に位置すべき場所である配列の末尾へ移動する。  
移動した後、ヒープを縮小して max ヒープを維持しながら残りの内の最大要素を同様に移動していく。

$O(n)$ かかる`BUILD-MAX-HEAP`を１回、 $O(\lg n)$ かかる`MAX-HEAPIFY`を $n-1$ 回呼び出すので、  
`HEAPSORT`の実行時間は $O(n\lg n)$ となる。

## 6.5 優先度付きキュー

ヒープデータ構造を使うと効率的な優先度付きキューを実現できる。  
本節では max ヒープに基づく max 優先度付きキューの実現に焦点を合わせる。

**優先度付きキュー**(priority queue)は**キー**(key)と呼ぶ値を持つ要素の集合 $S$ を管理するためのデータ構造。  
**max 優先度付きキュー**(max-priority queue)では次の操作が利用できる。

$\text{INSERT}(S,x)$ : 集合 $S$ に要素 $x$ を挿入する。  
$\text{MAXIMUM}(S)$ : 最大のキーを持つ要素を返す。  
$\text{EXTRACT-MAX}(S)$ : $S$ から最大のキーを持つ要素を削除して返す。  
$\text{INCREASE-KEY}(S,x,k)$ : 要素 $x$ のキーの値を新しいキーの値 $k(\ge x)$ に変更する

まず $\text{MAXIMUM}$ を $O(1)$ で実現する。

```pseudo
HEAP-MAXIMUM(A):
  return A[1]
```

次に $\text{EXTRACT-MAX}$ を $O(\lg n)$ を実現する。  
この手続きは`HEAPSORT`の**for 文**の中身に似ている。

```pseudo
HEAP-EXTRACT-MAX(A):
  if A.heap-size < 1
    error "ヒープアンダーフロー"
  max = A[1]
  A[1] = A[A.heap-size]
  A.heap-size = A.heap-size - 1
  MAX-HEAPIFY(A, 1)
  return max
```

$\text{INCREASE-KEY}$ の実現はこう。  
挿入ソートを想起させる方法で要素を適切な位置へ移動する。  
高々ヒープの高さ分しか移動しないから、 $O(\lg n)$ 。

```pseudo
HEAP-INCREASE-KEY(A, i, key):
  if key < A[i]
    error "新しいキーは現在のキーより小さい"
  A[i] = key
  while i > 1 かつ A[PARENT(i)] < A[i]
    A[i] を A[PARENT(i)] と交換する
    i = PARENT(i)
```

$\text{INSERT}$ の実現。  
ヒープを拡張して新しい要素を入れ、適切な位置へ移動する。  
ヒープの拡張が定数時間でできるなら、 $O(\lg n)$ 。

```pseudo
MAX-HEAP-INSERT(A, key):
  A.heap-size = A.heap-size + 1
  A[A.heap-size] = -∞
  HEAP-INCREASE-KEY(A, A.heap-size, key)
```

以上をまとめると、ヒープを用いればサイズ $n$ の集合上の優先度付きキューの任意の操作を $O(\lg n)$ で実行できる。

[← 前へ](../ch04/note.md)

[次へ →](../ch07/note.md)
