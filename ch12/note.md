# 12 章 ２分探索木

探索木データ構造は多くの動的集合操作が提供され、辞書や優先度付きキューとして利用できる。

$2$ 分探索木上での基本操作の実行時間は木の高さに比例する。  
完全 $2$ 分探索木上での最悪実行時間は $\Theta(\lg n)$ だが、枝分かれのない道グラフだと $\Theta(n)$ 。

基本操作が良い最悪性能を持つように改良できる。  
第 $13$ 章では $2$ 分探索木を改良した $2$ 色木、第 $18$ 章では $B$ 木を紹介する。

## 12.1 ２分探索木

$2$ 分探索木は $2$ 分木の一種。  
各節点はキーと付属データ以外に、左の子 $left$ 、右の子 $right$ 、親 $p$ を持つ。  
子や親が欠けている場合は $\text{NIL}$ 。

キーは以下の **$2$ 分探索木条件**(binary-search-tree property)を満足するように格納する。

<i>$x$ を $2$ 分探索木の節点とする。 $y$ が $x$ の左部分木の節点ならば $y.key \le x.key$ 、右部分木の節点ならば $y.key \ge x.key$ を満たす。</i>

キー集合が $2$ 分探索木条件を満たすように格納されているとき、 **中間順木巡回**(inorder tree walk)と呼ぶ簡単な再帰的アルゴリズムを用いて全てのキーをソートされた順序で印刷できる。

```pseudo
INORDER-TREE-WALK(x):
  if x ≠ NIL
    INORDER-TREE-WALK(x.left)
    x.key を印刷する
    INORDER-TREE-WALK(x.right)
```

同様に、**先行順木巡回**(preorder tree walk)と**後行順木巡回**(postorder tree walk)も存在する。

## 12.2 ２分探索木に対する質問

$2$ 分探索木からのキーの探索がしばしば必要になる。  
$\text{SEARCH}$, $\text{MINIMUM}$, $\text{MAXIMUM}$, $\text{SUCCESSOR}$, $\text{PREDECESSOR}$ を $O(h)$ 時間で実行できることを示す。

### 探　索

```pseudo
TREE-SEARCH(x, k):
  if x == NIL または k == x.key
    return x
  if k < x.key
    return TREE-SEARCH(x.left, k)
  else
    return TREE-SEARCH(x.right, k)
```

再帰を通じて出会う節点の列は根から木を下る単純道を形成するので、 $\text{TREE-SEARCH}$ の実行時間は $O(h)$ となる。

反復形に書き換えることもできる。

```pseudo
ITERATIVE-TREE-SEARCH(x, k):
  while x ≠ NIL かつ k ≠ x.key
    if k < x.key
      x = x.left
    else
      x = x.right
  return x
```

多くの計算機では反復形手続きのほうが高速。

### 最小値と最大値

```pseudo
TREE-MINIMUM(x):
  while x.left ≠ NIL
    x = x.left
  return x
```

```pseudo
TREE-MAXIMUM(x):
  while x.right ≠ NIL
    x = x.right
  return x
```

$\text{TREE-SEARCH}$ と同様、根から木を下る単純道を形成するので、実行時間は $O(h)$ となる。

### 次節点と先行節点

$2$ 分探索木の構造から、キーを比較せずに決定できる。

```pseudo
TREE-SUCCESSOR(x):
  if x.right ≠ NIL
    return TREE-MINIMUM(x.right)
  y = x.p
  while y ≠ NIL かつ x == y.right
    x = y
    y = y.p
  return y
```

次節点が存在するときには次節点を、存在しない場合には $\text{NIL}$ を返す。  
右部分木があればその最左節点が次節点。  
右部分木がなければ、 $x$ の祖先で、その左の子もまた $x$ の祖先であるものの中で最も木の下にある節点が次節点。

$\text{TREE-PREDECESSOR}$ は $\text{TREE-SUCCESSOR}$ と対称。  
木を上あるいは下に向かう単純道のいずれかを辿るので、実行時間は $O(h)$ となる。

以上、 $\text{SEARCH}$, $\text{MINIMUM}$, $\text{MAXIMUM}$, $\text{SUCCESSOR}$, $\text{PREDECESSOR}$ を $O(h)$ 時間で実行できると示した。

## 12.3 挿入と削除

### 挿　入

$z$ を子のない節点とする。  
木の根から開始し、 $z$ と置き換える $\text{NIL}$ を探してある単純道に沿って木を下る。 $O(h)$ 。

```pseudo
TREE-INSERT(T, z):
  y = NIL
  x = T.root
  while x ≠ NIL
    y = x
    if z.key < x.key
      x = x.left
    else
      x = x.right
  z.p = y
  if y == NIL
    T.root = z  // 木 T は空であった
  elseif z.key < y.key
    y.left = z
  else
    y.right = z
```

$x$ の親を保持するため、 $y$ を**トレーラポインタ**(trailing pointer)として使っている。

### 削　除

削除は $3$ つの基本的な場合に対応する方針から構成される。

- $z$ が子を持たない場合は、 $z$ の親の子を $\text{NIL}$ に置き換える
- $z$ が子を $1$ つ持つ場合は、 $z$ の親の子を $z$ の子へ変更する
- $z$ が子を $2$ つ持つ場合は、 $z$ の右部分木の中から $z$ の次節点 $y$ を発見し、 $z$ の場所に置く。残された $z$ の元右部分木は $y$ の新しい右部分木、元左部分木は $y$ の新しい左部分木とする

ある節点の子である部分木を別の部分木に置き換えるサブルーチン $\text{TRANSPLANT}$ を定義する。

```pseudo
TRANSPLANT(T, u, v):
  if u.p == NIL
    T.root = v
  elseif u == u.p.left
    u.p.left = v
  else
    u.p.right = v
  if v ≠ NIL
    v.p = u.p
```

手続き $\text{TREE-DELETE}$ は 上記方針を修正した $4$ つの場合を実行する。

```pseudo
TREE-DELETE(T, z):
  if z.left == NIL
    TRANSPLANT(T, z, z.right)
  elseif z.right == NIL
    TRANSPLANT(T, z, z.left)
  else
    y = TREE-MINIMUM(z.right)
    if y.p ≠ z
      TRANSPLANT(T, y, y.right)
      y.right = z.right
      y.right.p = y
    TRANSPLANT(T, z, y)
    y.left = z.left
    y.left.p = y
```

$\text{TREE-MINIMUM}$ の呼出しを除くと、 $\text{TREE-DELETE}$ の実行時間は定数である。  
したがって、 $\text{TREE-DELETE}$ は $O(h)$ 時間で走る。

以上、 $\text{INSERT}$, $\text{DELETE}$ を $O(h)$ 時間で実行できると示した。

[← 前へ](../ch11/note.md)
