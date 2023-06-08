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

## 6.4-1

> 配列 $A = \langle 5,13,2,25,7,17,20,8,4 \rangle$ 上での`HEAPSORT`の動作を示せ。

$\langle 5,13,2,25,7,17,20,8,4 \rangle$
$\langle 25,13,20,8,7,17,2,5,4 \rangle$
$\langle 20,13,17,8,7,4,2,5,25 \rangle$
$\langle 17,13,5,8,7,4,2,20,25 \rangle$
$\langle 13,8,5,2,7,4,17,20,25 \rangle$
$\langle 8,7,5,2,4,13,17,20,25 \rangle$
$\langle 7,4,5,2,8,13,17,20,25 \rangle$
$\langle 5,4,2,7,8,13,17,20,25 \rangle$
$\langle 4,2,5,7,8,13,17,20,25 \rangle$
$\langle 2,4,5,7,8,13,17,20,25 \rangle$

## 6.4-2

> 次のループ不変式を用いて`HEAPSORT`の正当性を論ぜよ。
> **for 文**の各繰返しの直前では、部分配列 $A[1..i]$ は $A[1..n]$ の小さい方から $i$ 個の要素を含む max ヒープであり、部分配列 $A[i+1..n]$ は $A[1..n]$ の大きい方から $n-1$ 個の要素をソートされた順序で含む。

省略

## 6.4-3

> 昇順にソートされた長さ $n$ の配列に対する`HEAPSORT`の実行時間を示せ。降順にソートされている場合はどうか？

昇順: $\Theta(n\lg n)$  
降順: $\Theta(n\lg n)$

## 6.4-4

> `HEAPSORT`の最悪実行時間が $\Omega(n\lg n)$ であることを示せ。

？

## 6.4-5 ★

> すべての要素が異なるとき、`HEAPSORT`の最良実行時間が $\Omega(n\lg n)$ であることを示せ。

？

## 6.5-1

> ヒープ $A = \langle 15,13,9,5,12,8,7,4,0,6,2,1 \rangle$ 上での $\text{HEAP-EXTRACT-MAX}$ の動作を示せ。

$\langle 15,13,9,5,12,8,7,4,0,6,2,1 \rangle$
$\langle \textbf{1},13,9,5,12,8,7,4,0,6,2 \rangle$
$\langle \textbf{13},\textbf{1},9,5,12,8,7,4,0,6,2 \rangle$
$\langle 13,\textbf{12},9,5,\textbf{1},8,7,4,0,6,2 \rangle$
$\langle 13,12,9,5,\textbf{6},8,7,4,0,\textbf{1},2 \rangle$

## 6.5-2

> ヒープ $A = \langle 15,13,9,5,12,8,7,4,0,6,2,1 \rangle$ 上での $\text{MAX-HEAP-INSERT(A, 10)}$ の動作を示せ。

$\langle 15,13,9,5,12,8,7,4,0,6,2,1 \rangle$
$\langle 15,13,9,5,12,8,7,4,0,6,2,1,-\infty \rangle$
$\langle 15,13,9,5,12,8,7,4,0,6,2,1,\textbf{10} \rangle$
$\langle 15,13,9,5,12,\textbf{10},7,4,0,6,2,1,\textbf{8} \rangle$
$\langle 15,13,\textbf{10},5,12,\textbf{9},7,4,0,6,2,1,8 \rangle$

## 6.5-3

> min ヒープを用いて min 優先度付きキューを実現する手続き $\text{HEAP-MINIMUM}$ 、 $\text{HEAP-EXTRACT-MIN}$ 、 $\text{HEAP-DECREASE-KEY}$ 、 $\text{MIN-HEAP-INSERT}$ の擬似コードを書け。

```pseudo
HEAP-MINIMUM(A):
  return A[1]
```

```pseudo
HEAP-EXTRACT-MIN(A):
  if A.heap-size < 1
    error "ヒープアンダーフロー"
  min = A[1]
  A[1] = A[A.heap-size]
  A.heap-size = A.heap-size - 1
  MIN-HEAPIFY(A, 1)
  return min
```

```pseudo
HEAP-DECREASE-KEY(A, i, key):
  if key > A[i]
    error "新しいキーは現在のキーより大きい"
  A[i] = key
  while i > 1 かつ A[PARENT(i)] > A[i]
    A[i] を A[PARENT(i)] と交換する
    i = PARENT(i)
```

```pseudo
MIN-HEAP-INSERT(A, key):
  A.heap-size = A.heap-size + 1
  A[A.heap-size] = ∞
  HEAP-DECREASE-KEY(A, A.heap-size, key)
```

## 6.5-4

> $\text{MAX-HEAP-INSERT}$ において、キー値を正しく設定する前にわざわざ第２行でその値を一度 $-\infty$ に設定するのはなぜか？

$\text{HEAP-INCREASE-KEY}$ のキー値チェックに違反しないようにするため。

## 6.5-5

> 次のループ不変式を用いて $\text{HEAP-INCREASE-KEY}$ の正当性を論ぜよ。
>
> 第４〜６行の**while**文の各繰返しの直前において、不等式 $A[\text{PARENT}(i)] \ge A[\text{LEFT(i)}]$ および $A[\text{PARENT(i)}] \ge A[\text{RIGHT(i)}]$ が（これらの節点が存在すれば）成立し、配列 $A[1..A.\text{heap-size}]$ は、 $A[i]$ が $A[\text{PARENT(i)}]$ より大きい可能性があることを除けば max ヒープ条件を満足する。
>
> $\text{HEAP-INCREASE-KEY}$ を呼び出したとき、部分配列 $A[1..A.\text{heap-size}]$ が max ヒープ条件を満たしていると仮定してもよい。

省略

## 6.5-6

> $\text{HEAP-INCREASE-KEY}$ の第５行の交換操作には通常３回の代入が必要である。 $\text{INSERTION-SORT}$ の内側のループのアイデアを用いると、３回の代入を１回の代入で済ますことができることを示せ。

３回

```pseudo
HEAP-INCREASE-KEY(A, i, key):
  if key < A[i]
    error "新しいキーは現在のキーより小さい"
  A[i] = key
  while i > 1 かつ A[PARENT(i)] < A[i]
    tmp = A[i]
    A[i] = A[PARENT(i)]
    A[PARENT(i)] = tmp
    i = PARENT(i)
```

１回

```pseudo
HEAP-INCREASE-KEY(A, i, key):
  if key < A[i]
    error "新しいキーは現在のキーより小さい"
  while i > 1 かつ A[PARENT(i)] < key
    A[i] = A[PARENT(i)]
    i = PARENT(i)
  A[i] = key
```

## 6.5-7

> 優先度付きキューを用いて先入れ先出しキューを実現する方法を示せ。また、スタックを優先度付きキューで実現する方法を示せ。（キューとスタックは第 $10.1$ 節で定義する。）

キュー: 要素を挿入するたびに要素の優先度を下げていく  
スタック: 要素を挿入するたびに要素の優先度を上げていく

## 6.5-8

> $\text{HEAP-DELETE}(A, i)$ 操作はヒープ $A$ から節点 $i$ のアイテムを削除する。要素数 $n$ の max ヒープ上で $O(\lg n)$ 時間で動作するように $\text{HEAP-DELETE}$ を実現せよ。

ヒープの最終要素と交換してサイズを減らす方針で出来る。  
元最終要素くんを新天地にて"滑り落とす"か"浮上させる"必要がある。

```pseudo
HEAP-DELETE(A, i):
  if A[i] > A[A.heap-size]
    A[i] = A[A.heap-size]
    A.heap-size = A.heap-size - 1
    MAX-HEAPIFY(A, i)
  else
    HEAP-INCREASE-KEY(A, i, A[A.heap-size])
    A.heap-size = A.heap-size - 1
```

## 6.5-9

> $k$ 個のソートされたリストを１つのソートされたリストにマージするための $O(n\lg k)$ 時間アルゴリズムを与えよ。ただし、 $n$ は入力リストに含まれる総要素数である。（**ヒント:** $k$ 列のマージに min ヒープを用いよ。）

？
