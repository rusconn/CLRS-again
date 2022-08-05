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

[← 前へ](../ch09/note.md)
