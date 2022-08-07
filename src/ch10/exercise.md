# 10 章 練習問題

## 10.1-1

> 配列 $S[1..6]$ に格納されている空のスタック $S$ に対して操作列 $\text{PUSH}(S,4)$ , $\text{PUSH}(S,1)$ , $\text{PUSH}(S,3)$ , $\text{POP}(S)$ , $\text{PUSH}(S,8)$ , $\text{POP}(S)$ を実行したときの結果を示せ

S = [X X X X X X]  
S = [t4 X X X X X]  
S = [4 t1 X X X X]  
S = [4 1 t3 X X X]  
S = [4 t1 3 X X X]  
S = [4 1 t8 X X X]  
S = [4 t1 8 X X X]

## 10.1-2

> １つの配列 $A[1..n]$ の中に２つのスタックを実現せよ。ただし、これらのスタックに格納されている要素数の合計が $n$ を超えない限りどちらのスタックもオーバーフローしてはならず、 $\text{PUSH}$ および $\text{POP}$ 操作は $O(1)$ 時間で走らなくてはならない。

添字 $0$ から添字を大きくしていく $top1$ 、添字 $n+1$ から添字を小さくしていく $top2$ を用意する。  
それぞれに対する $\text{PUSH}$ と $\text{POP}$ は添字を反対方向に１増減させる。  
$top1 + 1 = top2$ なら要素の追加はできない。

## 10.1-3

> 配列 $Q[1..6]$ に格納されている空のキュー $Q$ に対して操作列 $\text{ENQUEUE}(Q,4)$ , $\text{ENQUEUE}(Q,1)$ , $\text{ENQUEUE}(Q,3)$ , $\text{DEQUEUE}(Q)$ , $\text{ENQUEUE}(Q,8)$ , $\text{DEQUEUE}(Q)$ を実行したときの結果を示せ。

Q = [htX X X X X X]  
Q = [h4 tX X X X X]  
Q = [h4 1 tX X X X]  
Q = [h4 1 3 tX X X]  
Q = [4 h1 3 8 tX X]  
Q = [4 1 h3 8 tX X]

## 10.1-4

> $\text{ENQUEUE}$ と $\text{DEQUEUE}$ を書き直し、アンダーフローとオーバーフローを検知するようにせよ。

```pseudo
QUEUE-FULL(Q):
  return Q.head == Q.tail + 1 or (Q.head == 1 and Q.tail == Q.length)
```

```pseudo
QUEUE-EMPTY(Q):
  return Q.head == Q.tail
```

```pseudo
ENQUEUE(Q, x):
  if QUEUE-FULL(Q)
    error "オーバーフロー"
  else
    Q[Q.tail] = x
    if Q.tail == Q.length
      Q.tail = 1
    else
      Q.tail = Q.tail + 1
```

```pseudo
DEQUEUE(Q):
  if QUEUE-EMPTY(Q)
    error "アンダーフロー"
  else
    x = Q[Q.head]
    if Q.head == Q.length
      Q.head = 1
    else
      Q.head = Q.head + 1
    return x
```

## 10.1-5

> スタックでは要素の挿入削除を一端だけで行い、キューでは要素を一端から挿入し、多端から削除した。これに対して、**両頭キュー**(deque: double-ended queue)では要素の挿入削除を両端で行う。配列によって実現されている両頭キューの両端で要素を挿入および削除するための、４つの $O(1)$ 時間手続きを記述せよ。

```pseudo
PUSH-HEAD(Q, x):
  if QUEUE-FULL(Q)
    error "オーバーフロー"
  else
    if Q.head == 1
      Q.head = Q.length
    else
      Q.head = Q.head - 1
    Q[Q.head] = x
```

```pseudo
PUSH-TAIL(Q, x):
  if QUEUE-FULL(Q)
    error "オーバーフロー"
  else
    Q[Q.tail] = x
    if Q.tail == Q.length
      Q.tail = 1
    else
      Q.tail = Q.tail + 1
```

```pseudo
POP-HEAD(Q):
  if QUEUE-EMPTY(Q)
    error "アンダーフロー"
  else
    x = Q[Q.head]
    if Q.head == Q.length
      Q.head = 1
    else
      Q.head = Q.head + 1
    return x
```

```pseudo
POP-TAIL(Q):
  if QUEUE-EMPTY(Q)
    error "アンダーフロー"
  else
    if Q.tail == 1
      Q.tail = Q.length
    else
      Q.tail = Q.tail - 1
    return Q[Q.tail]
```

## 10.1-6

> ２つのスタックを用いてキューを実現する方法を示せ。キュー操作の実行時間を解析せよ。

$\text{ENQUEUE}$ : $\Theta(n)$

```pseudo
ENQUEUE(S₁, S₂, x):
  while not STACK-EMPTY(S₁)
    PUSH(S₂, POP(S₁))
  PUSH(S₁, x)
  while not STACK-EMPTY(S₂)
    PUSH(S₁, POP(S₂))
```

$\text{DEQUEUE}$ : $O(1)$

```pseudo
DEQUEUE(S₁):
  return POP(S₁)
```

## 10.1-7

> ２つのキューを用いてスタックを実現する方法を示せ。スタック操作の実行時間を解析せよ。

$\text{PUSH}$ : $\Theta(n)$

```pseudo
PUSH(Q₁, Q₂, x):
  while not QUEUE-EMPTY(Q₁)
    ENQUEUE(Q₂, DEQUEUE(Q₁))
  ENQUEUE(Q₁, x)
  while not QUEUE-EMPTY(Q₂)
    ENQUEUE(Q₁, DEQUEUE(Q₂))
```

$\text{POP}$ : $O(1)$

```pseudo
POP(Q₁):
  return DEQUEUE(Q₁)
```

## 10.2-1

> 動的集合操作 $\text{INSERT}$ を一方向連結リスト上で $O(1)$ 時間で実行できるように実現できるか？操作 $\text{DELETE}$ はどうか？

$\text{INSERT}$ は $O(1)$ 時間で実現できる。リストの先頭に追加すればよい。  
$\text{DELETE}$ は $O(1)$ で実現できない。  
削除する要素の前の要素を、削除する要素の後の要素へ繋ぐ必要があるが、前者を定数時間で取得できない。

## 10.2-2

> 一方向連結リスト $L$ を用いてスタックを実現せよ。操作 $\text{PUSH}$ と $\text{POP}$ は共に $O(1)$ 時間で実行できるようにすること。

```pseudo
EMPTY(L):
  return L.head == NIL
```

```pseudo
PUSH(L, x):
  x.next = L.head
  L.head = x
```

```pseudo
POP(L):
  if EMPTY(L)
    error "アンダーフロー"
  else
    x = L.head
    L.head = L.head.next
    return x
```

## 10.2-3

> 一方向連結リスト $L$ を用いてキューを実現せよ。操作 $\text{ENQUEUE}$ と $\text{DEQUEUE}$ は共に $O(1)$ 時間で実行できるようにすること。

リストの先頭へのポインタだけでは $O(1)$ を達成できないので、リストの末尾へのポインタ $tail$ を用意する。

```pseudo
ENQUEUE(L, x):
  if EMPTY(L)
    L.head = x
  else
    L.tail.next = x
  L.tail = x
  x.next = NIL
```

```pseudo
DEQUEUE(L):
  if EMPTY(L)
    error "アンダーフロー"
  else
    x = L.head
    L.head = x.next
    if EMPTY(L)
      L.tail = NIL
    return x
```

## 10.2-4

> 本文で述べたように、手続き $\text{LIST-SEARCH'}$ のループの各繰返しでは２つの条件、 $x \ne L.nil$ と $x.key \ne k$ を判定する。各繰返しから条件 $x \ne L.nil$ の判定を除去する方法を述べよ。

```pseudo
LIST-SEARCH'(L, k):
  L.nil.key = k
  x = L.nil.next
  while x.key ≠ k
    x = x.next
  return x
```

## 10.2-5

> 辞書操作 $\text{INSERT}$ , $\text{DELETE}$ , $\text{SEARCH}$ を一方向循環リストを用いて実現せよ。実現した操作の実行時間を評価せよ。

$\text{INSERT}$ : $O(1)$

```pseudo
INSERT(L, x):
  x.next = L.nil.next
  L.nil.next = x
```

$\text{DELETE}$ : $O(n)$

```pseudo
DELETE(L, x):
  prev = L.nil
  while prev.next ≠ x
    prev = prev.next
    if prev == L.nil
      error "見つからない"
  prev.next = x.next
```

$\text{SEARCH}$ : $O(n)$

```pseudo
SEARCH(L, k):
  L.nil.key = k
  x = L.nil.next
  while x.key ≠ k
    x = x.next
  return x
```

## 10.2-6

> 動的集合操作 $\text{UNION}$ は、共通部分を持たない２つの集合 $S_1$ と $S_2$ を入力として取り、 $S_1$ と $S_2$ に属するすべての要素からなる集合 $S = S_1 \cup S_2$ を返す。通常、操作は集合 $S_1$ と $S_2$ を破壊する。適切なリストデータ構造を用いて、 $\text{UNION}$ を $O(1)$ 時間で実行できるように実現する方法を示せ。

$S_1$ と $S_2$ を先頭要素へのポインタ $head$ 、末尾要素へのポインタ $tail$ を持つ一方向リストとする。

```pseudo
UNION(S₁, S₂):
  S₁.tail.next = S₂.head
  S₁.tail = S₂.tail
  S₂.head = NIL
  S₂.tail = NIL
```

これで $S_1$ が $S = S_1 \cup S_2$ となり、 $S_2$ が空になる。

## 10.2-7

> $n$ 個の要素を持つ一方向連結リストを $\Theta(n)$ 時間で反転する再帰を用いない手続きを与えよ。ただし、リスト領域を除くと定数の記憶容量しか用いてはならない。

```pseudo
REVERSE(L):
  x = NIL
  y = L.head
  while y ≠ NIL
    next = y.next
    y.next = x
    x = y
    y = next
  L.head = x
```

## 10.2-8 ★

> 各アイテムごとに１つのポインタ値 $x.np$ しか使用しないで双方向リストを実現する方法を説明せよ。（普通は２つのポインタ値 $prev$ と $next$ を用いる。）すべてのポインタ値 $x$ は $k$ ビットの整数で表現できると仮定し、 $x.np$ を $x.next$ と $x.prev$ の間の $k$ ビット「排他的論理和」、すなわち、 $x.np = x.next \text{ XOR } x.prev$ と定義せよ。（値 $\text{NIL}$ は $0$ によって表現される。）リストの先頭に到達するために必要な情報を必ず記述すること。このようなリスト上で $\text{SEARCH}$ , $\text{INSERT}$ , $\text{DELETE}$ 操作を実現する方法を示せ。さらに、リストを $O(1)$ 時間で反転する方法を示せ。

スキップ
