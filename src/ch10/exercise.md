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
