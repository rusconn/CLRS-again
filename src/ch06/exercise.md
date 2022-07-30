# 6 章 練習問題

## 6.1-1

> 高さ $h$ のヒープが持つ要素数の最大値と最小値を求めよ。

最大値: $2^{h+1}-1$  
最小値: $2^h$

## 6.1-2

> 要素数が $n$ のヒープの高さが $\lfloor \lg n \rfloor$ となることを示せ。

$$
  \begin{eqnarray*}
         & 2^h \le n \le 2^{h+1} & \\
    \iff & \lg 2^h \le \lg n \le \lg 2^{h+1} & \\
    \iff & h \le \lg n \le h+1 &
  \end{eqnarray*}
$$

$h$ は整数なので $h = \lfloor \lg n \rfloor$ 。

## 6.1-3

> max ヒープの部分木が含む最大要素はその部分木の根にあることを示せ。

あるヒープが max ヒープならば、max ヒープ条件を満たす。  
そのヒープの部分木も max ヒープ条件を満たすはずだから、max ヒープである。
max ヒープは根に最大要素を持つ。

## 6.1-4

> すべての要素が異なるとき、max ヒープ内の最小要素が置かれる可能性のある場所はどこか？

葉のいずれか。

## 6.1-5

> 既ソート配列は min ヒープか？

そうだよ。

## 6.1-6

> 数列 $\langle 23,17,14,6,13,10,1,5,7,12 \rangle$ は max ヒープか？

<pre>
             23
       17          14
    6     13    10     1
  5   7 12
</pre>

違う。 $A[PARENT(9)] \ge A[9]$ が $6 \ge 7$ となり成立しない。

## 6.1-7

> 要素数が $n$ のヒープが格納されている配列において、葉は添字が $\lfloor n/2 \rfloor + 1, \lfloor n/2 \rfloor + 2, \ldots,n$ の節点であることを示せ。

？

## 6.2-1

> 配列 $A = \langle 27,17,3,16,13,10,1,5,7,12,4,8,9,0 \rangle$ 上での`MAX-HEAPIFY(A,3)`の動作を示せ。

$\langle 27,17,\textbf{3},16,13,\textbf{10},1,5,7,12,4,8,9,0 \rangle$  
$\langle 27,17,\textbf{10},16,13,\textbf{3},1,5,7,12,4,8,9,0 \rangle$  
$\langle 27,17,10,16,13,\textbf{3},1,5,7,12,4,8,\textbf{9},0 \rangle$  
$\langle 27,17,10,16,13,\textbf{9},1,5,7,12,4,8,\textbf{3},0 \rangle$

## 6.2-2

> 手続き`MAX-HEAPIFY`を利用して、min ヒープ上で`MAX-HEAPIFY`に対応する操作を実現する手続き`MIN-HEAPIFY(A,i)`の擬似コードを書け。`MIN-HEAPIFY`の実行時間を`MAX-HEAPIFY`と比較せよ。

```pseudo
MIN-HEAPIFY(A, i)
  l = LEFT(i)
  r = RIGHT(i)
  if l <= A.heap-size かつ A[l] < A[i]
    smallest = l
  else
    smallest = i
  if r <= A.heap-size かつ A[r] < A[smallest]
    smallest = r
  if smallest != i
    A[i] を A[smallest] と交換する
    MIN-HEAPIFY(A, smallest)
```

実行時間は`MAX-HEAPIFY`と同じ。

## 6.2-3

> 要素 $A[i]$ が左右両方の子より大きいとき、呼出し`MAX-HEAPIFY(A,i)`が与える影響を述べよ。

何も影響が無い。
（子への滑り落としが発生しない。）

## 6.2-4

> $i > A.\textit{heap-size}/2$ のとき、呼出し`MAX-HEAPIFY(A,i)`が与える影響を述べよ。

何も影響が無い。  
（滑り落とし先である子が無い。）

## 6.2-5

> `MAX-HEAPIFY`のコードは再帰呼出しを除けば極めて小さい定数係数を持つ。しかし、あるコンパイラは再帰呼出しを効率の悪いコードに変換するかもしれない。再帰呼出しの代わりに繰返し構造子（ループ）を用いる効率の良い`MAX-HEAPIFY`のコードを書け。

```pseudo
MAX-HEAPIFY-ITERATIVE(A, i):
  while true
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
      i = largest
    else
      return
```

## 6.2-6

> サイズ $n$ のヒープ上の`MAX-HEAPIFY`の最悪実行時間が $\Omega(\lg n)$ であることを示せ。(**ヒント:** $n$ 節点からなるヒープに対して、根から葉に下る道上のすべての節点で`MAX-HEAPIFY`が再帰的に呼び出されるように節点の値を定めよ。)

根に最小要素があり、すべての節点で右の子より左の子が大きいようなサイズ $n$ のヒープ $A$ を想定する。  
$A$ に対して`MAX-HEAPIFY(A, 1)`を呼び出すと、ヒープの高さである $\Theta(\lg n)$ 回だけ  
`MAX-HEAPIFY`が再帰的に呼び出されることになるので、最悪実行時間は $\Omega(\lg n)$ となる。

## 6.3-1

> 配列 $A = \langle 5,3,17,10,84,19,6,22,9 \rangle$ 上の`BUILD-MAX-HEAP`の動作を示せ。

$\langle 5,3,17,\textbf{10},84,19,6,22,9 \rangle$  
$\langle 5,3,17,\textbf{22},84,19,6,\textbf{10},9 \rangle$  
$\langle 5,3,\textbf{17},22,84,19,6,10,9 \rangle$  
$\langle 5,3,\textbf{19},22,84,\textbf{17},6,10,9 \rangle$  
$\langle 5,\textbf{3},19,22,84,17,6,10,9 \rangle$  
$\langle 5,\textbf{84},19,22,\textbf{3},17,6,10,9 \rangle$  
$\langle \textbf{5},84,19,22,3,17,6,10,9 \rangle$
$\langle \textbf{84},\textbf{22},19,\textbf{10},3,17,6,\textbf{5},9 \rangle$

## 6.3-2

> `BUILD-MAX-HEAP`のループ制御変数 $i$ の値を $1$ から $\lfloor A.length/2 \rfloor$ まで増やすのではなく、 $\lfloor A.length/2 \rfloor$ から $1$ まで減らしている。その理由を考えよ。

`MAX-HEAPIFY`が、左右の子に max ヒープであることを要請するため。  
もし $i$ を増やす方法をとると、結果が max ヒープにならない可能性がある。

## 6.3-3

> $n$ 個の要素を持つ任意のヒープには、高さ $h$ の節点は高々 $\lceil n/2^{h+1} \rceil$ 個しかないことを示せ。

？
