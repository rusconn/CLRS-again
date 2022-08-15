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

[← 前へ](../ch11/note.md)
