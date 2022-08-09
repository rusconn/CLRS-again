# 10 章 基本データ構造

## 10.1 スタックとキュー

スタックとキューは $\text{DELETE}$ 操作が決まった要素を削除する動的集合。

**スタック**(stack)は**後入れ先出し**(last-in,first-out, **LIFO**)を実現する。  
**キュー**(queue)は**先入れ先出し**(first-in,first-out, **FIFO**)を実現する。

スタックとキューを計算機上で効率よく実現する方法はいくつかあるが、本節では単純な配列を用いてそれぞれを実現する方法を説明する。

### スタック

スタックでは $\text{INSERT}$ 操作を $\text{PUSH}$ 、 $\text{DELETE}$ 操作を $\text{POP}$ と呼ぶ。

```pseudo
STACK-EMPTY(S):
  if S.top == 0
    return TRUE
  else
    return FALSE
```

```pseudo
PUSH(S):
  S.top = S.top + 1
  S[S.top] = x
```

```pseudo
POP(S):
  if STACK-EMPTY(S)
    error "アンダーフロー"
  else
    S.top = S.top - 1
    return S[S.top + 1]
```

３つのスタック操作はそれぞれ $O(1)$ 時間で実行できる。

### キュー

キューでは $\text{INSERT}$ 操作を $\text{ENQUEUE}$ 、 $\text{DELETE}$ 操作を $\text{DEQUEUE}$ と呼ぶ。

```pseudo
ENQUEUE(Q, x):
  Q[Q.tail] = x
  if Q.tail == Q.length
    Q.tail = 1
  else
    Q.tail = Q.tail + 1
```

```pseudo
DEQUEUE(Q):
  x = Q[Q.head]
  if Q.head == Q.length
    Q.head = 1
  else
    Q.head = Q.head + 1
  return x
```

操作の実行にはそれぞれ $O(1)$ 時間かかる。

## 10.2 連結リスト

オブジェクトがある順序で一列に並ぶデータ構造を**連結リスト**(linked list)と言う。  
配列は添字によってオブジェクの線形順序が決まるのに対し、連結リストでは各オブジェクトが持つポインタによって決まる。  
連結リストには**一方向**(singly linked)と**双方向**(doubly linked)、ソート済みと未ソート、循環と非循環がある。

以降未ソート双方向リストを仮定して議論を進める。

### 連結リストの探索

手続き $\text{LIST-SEARCH}(L,k)$ は簡単な線形探索によってリスト $L$ からキー $k$ を持つ要素を発見し、そのポインタを返す。  
最悪実行時間 $\Theta(n)$ 。

```pseudo
LIST-SEARCH(L, k):
  x = L.head
  while x ≠ NIL かつ x.key ≠ k
    x = x.next
  return x
```

### 連結リストへの挿入

手続き $\text{LIST-INSERT}(L,x)$ はリストの先頭へ $x$ を"継ぎ足す"。 $O(1)$ 。

```pseudo
LIST-INSERT(L, x):
  x.next = L.head
  if L.head ≠ NIL
    L.head.prev = x
  L.head = x
  x.prev = NIL
```

### 連結リストからの削除

手続き $\text{LIST-DELETE}(L,x)$ は要素 $x$ を連結リスト $L$ から"解き放つ"。 $O(1)$ 。

```pseudo
LIST-DELETE(L, x):
  if x.prev ≠ NIL
    x.prev.next = x.next
  else
    L.head = x.next
  if x.next ≠ NIL
    x.next.prev = x.prev
```

### 番　兵

これまでに挙げた擬似コードは連結リストの先頭と末尾の境界条件を考慮したものになっている。  
**番兵**(sentinel)を配置することで、境界の検出をいくらか簡単化出来る。

```pseudo
LIST-SEARCH'(L, k):
  x = L.nil.next
  while x ≠ L.nil かつ x.key ≠ k
    x = x.next
  return x
```

```pseudo
LIST-INSERT'(L, x):
  x.next = L.nil.next
  L.nil.next.prev = x
  L.nil.next = x
  x.prev = L.nil
```

```pseudo
LIST-DELETE'(L, x):
  x.prev.next = x.next
  x.next.prev = x.prev
```

番兵はリストの要素と同じ属性を持つ。ここでは $nil$ という名前の番兵を置いた。  
番兵を置いたことで**双方向循環リスト**を形成するようになった。  
$L.nil.next$ はリストの先頭であり、 $L.nil.prev$ はリストの末尾である。  
換言すれば、番兵はリストの先頭と末尾の間に存在する。  
空リストの場合、 $L.nil.next = L.nil$ かつ $L.nil.prev = L.nil$ となる。

番兵はコードの簡単化といくらかの計算量削減に寄与するが、記憶は余分に必要となる。

## 10.3 ポインタとオブジェクトの実現

ポインタやオブジェクトが提供されていない言語で、配列と添字を用いることで双方向リストを実現する方法がある。

### オブジェクトの多重配列表現

配列 $prev$ , $key$ , $next$ を用意し、連結リストの１要素の内容を３配列の同じ添字に格納する。

### オブジェクトの単一配列表現

１つの配列の連続した３要素に、 $prev$ , $key$ , $next$ を割り当てる。

上記２方法とも、 $prev$ や $next$ には別の要素へのポインタとして、その要素が格納されている場所の添字を格納する。

その他詳細は省略する。

[← 前へ](../ch09/note.md)
