# 4 章 分割統治

## 漸化式

漸化式は分割統治アルゴリズムの実行時間を特徴づける自然な方法なので、漸化式と分割統治パラダイムは協力関係にある。  
**漸化式** (recurrence) はある入力に対する関数値をそれより小さい入力に対する関数値を用いて記述する等式または不等式である。

本章では漸化式を解く方法、正確には「 $\Theta$ 」「 $O$ 」を用いて表現される解の漸近的限界を得る方法を３つ提案する。

- **置換え法** (substitution method) では、まず限界を推測し、次のその推測が正しいことを数学的帰納法を用いて証明する

- **再帰木法** (recursion-tree method) では、接点が再帰の各レベルで必要なコストを表現する木の形に漸化式を変形し、和を上または下から抑える技法を用いて漸化式を解く

- **マスター法** (master method) では、定数 $a \ge 1, b > 1$ と与えられた関数 $f(n)$ によって $$T(n) = aT(n/b)+f(n)$$ と表現できる漸化式に対する限界を与える。

## 4.1 最大部分配列問題

連続した $n$ 日分の株価の終値が与えられる。  
この情報から、いつ株を購入し、いつ売却すれば利益を最大化できるかを求めたい。  
買うのも売るのも１度だけ。

### 総当り戦略

購入日とその後の売却日の可能なすべての対を検討すればよい。  
しかし、 $n$ 日の期間には $\binom{n}{2}$ 個の対が存在する。  
$\binom{n}{2}$ は $\Theta(n^2)$ であり、各対を評価するのに少なくとも定数時間かかるから、 $\Omega(n^2)$ かかる。

### 変　換

実行時間が $o(n^2)$ のアルゴリズムを設計するために入力を違った方向から眺める。  
株価の前日からの変動に注目する。終値から変動の列を生成し、この列における要素の和が最大である連続する部分配列を発見すればよい。  
この連続する部分配列を**最大部分配列** (maximum subarray) と呼ぶ。

$n$ 日からなる期間では $\binom{n}{2} = \Theta(n^2)$ 個の部分配列を調べる必要があるから、一見、この変換は助けにならない。  
さらに効率的な解法を探す。

### 分割統治解

分割統治を用いて最大部分配列問題を解く。  
部分配列 $A[low..high]$ の最大部分配列を発見する問題を考える。  
部分配列の中央点 $mid$ を計算し、部分配列 $A[low..mid]$ と $A[mid+1..high]$ を考察する。  
任意の部分配列 $A[i..j]$ が置かれているのは以下の３つの場所の１つである。

- 完全に部分配列 $A[low..mid]$ の中にあり、したがって、 $low \le i \le j \le mid$ である
- 完全に部分配列 $A[mid+1..high]$ の中にあり、したがって、 $mid+1 \le i \le j \le high$ である
- 中央点を跨いでおり、したがって、 $low \le i \le mid \le j \le high$ である

したがって、 $A[low..high]$ の最大部分配列もこれら３つの場所の１つに置かれている。

前２つは元の問題よりもサイズが小さい部分問題になっているから、再帰的に解ける。  
したがって３つめの、中央点跨ぐ場合の最大部分配列を求め、求めた３つの部分配列のうち最大であるものが解である。

中央点を跨ぐ最大部分配列の境界を定める２つの添字と最大部分配列に属する要素の和の３項組を出力する手続きを示す。

```pseudo
FIND-MAX-CROSSING-SUBARRAY(A, low, mid, high):
  left-sum = -∞
  sum = 0
  for i = mid downto low
    sum = sum + A[i]
    if sum > left-sum
      left-sum = sum
      max-left = i
  right-sum = -∞
  sum = 0
  for j = mid + 1 to high
    sum = sum + A[j]
    if sum > right-sum
      right-sum = sum
      max-right = j
  return (max-left, max-right, left-sum + right-sum)
```

中央点を跨ぐという条件があるので、 $mid$ から左右へ広げるように調べ、最後に結合している。

２つの**for 文**の実行回数は合計 $high - low + 1 = n$ 回なので、実行には $\Theta(n)$ 時間かかる。

上記手続きを用いて、最大部分配列問題を解く分割統治アルゴリズムを実現する。

```pseudo
FIND-MAXIMUM-SUBARRAY(A, low, high):
  if high == low
    return (low, high, A[low]) // 基底。要素数1
  else
    mid = ⌊(low + high) / 2⌋
    (left-low, left-high, left-sum) = FIND-MAXIMUM-SUBARRAY(A, low, mid)
    (right-low, right-high, right-sum) = FIND-MAXIMUM-SUBARRAY(A, mid + 1, high)
    (cross-low, cross-high, cross-sum) = FIND-MAX-CROSSING-SUBARRAY(A, low, mid, high)
    if left-sum >= right-sum and left-sum >= cross-sum
      return (left-low, left-high, left-sum)
    elseif right-sum >= left-sum and right-sum >= cross-sum
      return (right-low, right-high, right-sum)
    else
      return (cross-low, cross-high, cross-sum)
```

### 分割統治アルゴリズムの解析

再帰的手続き`FIND-MAXIMUM-SUBARRAY`の実行時間を記述する漸化式を導入する。  
単純化のために元の問題のサイズが２のベキであると仮定する。

基底部分の実行には $\Theta(1)$ かかる。  
再帰段階ではサイズ $n/2$ の部分問題２つと、`FIND-MAX-CROSSING-SUBARRAY`を解く必要がある。  
つまり $2T(n/2) + \Theta(n)$ 。これらをまとめて漸化式

$$
  T(n) = \begin{cases}
    \Theta(1) & n = 1 \\
    2T(n/2) + \Theta(n) & n > 1
  \end{cases}
$$

を得る。

マージソートに対する漸化式と同じ漸化式が現れた。  
第 4.5 節で紹介するマスター法を用いると、この漸化式の解は $T(n) = \Theta(n\lg n)$ である。

分割統治法を用いることで総当り法に基づくよりも漸近的に高速なアルゴリズムを設計できた。

## 4.2 行列積のための Strassen のアルゴリズム

$A = \begin{pmatrix} a_{ij} \end{pmatrix}$ と $B = \begin{pmatrix}b_{ij}\end{pmatrix}$ が共に $n \times n$ 型の正方行列のとき、積を $C = A \cdot B$ とすると、すべての $i,j = 1,2,\ldots,n$ に対してその要素 $c_{ij}$ は

$$
  c_{ij} = \sum_{k=1}^{n}a_{ik}\cdot b_{kj}
$$

と定義される。

以下に示す手続きは２つの $n \times n$ 型行列 $A$ と $B$ を入力として取り、これらの積である $n \times n$ 型行列 $C$ を返す。

```pseudo
SQUARE-MATRIX-MULTIPLY(A, B):
  n = A.rows
  C を新しい n × n 型行列とする
  for i = 1 to n
    for j = 1 to n
      cᵢⱼ = 0
      for k = 1 to n
        cᵢⱼ = cᵢⱼ + aᵢₖ・bₖⱼ
  return C
```

この手続きの実行時間は $\Theta(n^3)$ である。

行列積の自然な定義が $\Omega(n^3)$ 回の（スカラー）積を含んでいるので、  
行列積を計算する任意のアルゴリズムの実行時間も $\Omega(n^3)$ であると考えるかもしれない。  
しかし、この直観は間違っている。

### 単純な分割統治アルゴリズム

$n$ を２の完全なベキであると仮定する。 $A, B, C$ をぞれぞれ４つの $n/2 \times n/2$ 型行列

$$
  A = \begin{pmatrix}
    A_{11} & A_{12} \\
    A_{21} & A_{22}
  \end{pmatrix}
  \quad
  B = \begin{pmatrix}
    B_{11} & B_{12} \\
    B_{21} & B_{22}
  \end{pmatrix}
  \quad
  C = \begin{pmatrix}
    C_{11} & C_{12} \\
    C_{21} & C_{22}
  \end{pmatrix}
$$

に分割し、式 $C = A \cdot B$ を

$$
  \begin{pmatrix}
    C_{11} & C_{12} \\
    C_{21} & C_{22}
  \end{pmatrix} = \begin{pmatrix}
    A_{11} & A_{12} \\
    A_{21} & A_{22}
  \end{pmatrix} \cdot \begin{pmatrix}
    B_{11} & B_{12} \\
    B_{21} & B_{22}
  \end{pmatrix}
$$

と書き直す。ここで、

$$
  \begin{align}
    C_{11} = A_{11} \cdot B_{11} + A_{12} \cdot B_{21} \\
    C_{12} = A_{11} \cdot B_{12} + A_{12} \cdot B_{22} \\
    C_{21} = A_{21} \cdot B_{11} + A_{22} \cdot B_{21} \\
    C_{22} = A_{21} \cdot B_{12} + A_{22} \cdot B_{22}
  \end{align}
$$

が成り立つ。これらの４つの式はそれぞれ２つの $n/2 \times n/2$ 型行列の乗算とその結果の加算を含む。  
これらの式を用いて単純で再帰的な分割統治アルゴリズムを設計できる。

```pseudo
SQUARE-MATRIX-MULTIPLY-RECURSIVE(A, B):
  n = A.rows
  C を新しい n × n 型行列とする
  if n == 1
    c₁₁ = a₁₁・b₁₁
  else
    A, B, C を分割する
    C₁₁ = SQUARE-MATRIX-MULTIPLY-RECURSIVE(A₁₁, B₁₁) + SQUARE-MATRIX-MULTIPLY-RECURSIVE(A₁₂, B₂₁)
    C₁₂ = SQUARE-MATRIX-MULTIPLY-RECURSIVE(A₁₁, B₁₂) + SQUARE-MATRIX-MULTIPLY-RECURSIVE(A₁₂, B₂₂)
    C₂₁ = SQUARE-MATRIX-MULTIPLY-RECURSIVE(A₂₁, B₁₁) + SQUARE-MATRIX-MULTIPLY-RECURSIVE(A₂₂, B₂₁)
    C₂₂ = SQUARE-MATRIX-MULTIPLY-RECURSIVE(A₂₁, B₁₂) + SQUARE-MATRIX-MULTIPLY-RECURSIVE(A₂₂, B₂₂)
  return C
```

問題の分割には添字計算を用いる場合は $\Theta(1)$ 、コピーする場合には $\Theta(n^2)$ かかる。  
サイズ $n/2$ の部分問題が８つ、結合には $\Theta(n^2)$ かかるので、 この手続きの実行時間 $T(n)$ を記述する漸化式

$$
  T(n) = \begin{cases}
    \Theta(1) & n = 1 \\
    8T(n/2) + \Theta(n^2) & n > 1
  \end{cases}
$$

を得る。第 4.5 節で紹介するマスター法を用いると、この漸化式の解は $T(n) = \Theta(n^3)$ である。  
したがって、この単純な分割統治手続きでは素朴な`SQUARE-MATRIX-MULTIPLY`を凌げない。

### Strassen の方法

Strassen の方法を用いると、再帰木の辺数を７に減らすことができる。  
Strassen の方法は４ステップから構成されている。

1. 入力行列 $A, B$ と出力行列 $C$ を $n/2 \times n/2$ 型部分行列に分解する。

1. 10 個の $n/2 \times n/2$ 型行列 $S_1,S_2,\ldots,S_{10}$ を生成する。

1. 第１ステップで生成された行列と第２ステップで生成された 10 個の行列を用いて、７個の行列積 $P_1,P_2,\ldots,P_7$ 再帰的に計算する。

1. 様々な $P_i$ 行列の加減演算を用いて結果となる行列 $C$ の部分行列 $C_{11},C_{12},C_{21},C_{22}$ を計算する。

$$
  \begin{align}
    S_1 = B_{12} - B_{22} \\
    S_2 = A_{11} + A_{12} \\
    S_3 = A_{21} + A_{22} \\
    S_4 = B_{21} - B_{11} \\
    S_5 = A_{11} + A_{22} \\
    S_6 = B_{11} + B_{22} \\
    S_7 = A_{12} - A_{22} \\
    S_8 = B_{21} + B_{22} \\
    S_9 = A_{11} - A_{21} \\
    S_{10} = B_{11} + B_{12}
  \end{align}
$$

$$
  \begin{align}
    P_1 = A_{11} \cdot S_1 \\
    P_2 = S_2 \cdot B_{22} \\
    P_3 = S_3 \cdot B_{11} \\
    P_4 = A_{22} \cdot S_4 \\
    P_5 = S_5 \cdot S_6 \\
    P_6 = S_7 \cdot S_8 \\
    P_7 = S_9 \cdot S_{10}
  \end{align}
$$

$$
  \begin{align}
    C_{11} = P_5 + P_4 - P_2 + P_6 \\
    C_{12} = P_1 + P_2 \\
    C_{21} = P_3 + P_4 \\
    C_{22} = P_5 + P_1 - P_3 - P_7
  \end{align}
$$

Strassen の方法の実行時間 $T(n)$ を記述する漸化式は

$$
  T(n) = \begin{cases}
    \Theta(1) & n = 1 \\
    7T(n/2) + \Theta(n^2) & n > 1
  \end{cases}
$$

となる。第 4.5 節で説明するマスター法を用いると、この漸化式の解は  
$T(n) = \Theta(n^{\lg 7})$ であり、単純な分割統治アルゴリズムよりも漸近的に高速である。

## 4.3 漸化式を解くための置換え法

分割統治アルゴリズムの実行時間が漸化式によって特徴づけられる様子を観察してきたので、次に漸化式の解法を学ぶ。

**置換え法** では２段階で漸化式を解く。

1. 解の形を推定する
1. 数学的帰納法を用いて定数を求め、推定した解がうまく働くことを示す

置換え法は漸化式の上界と下界のどちらを証明するのにも使えるが、解の形が推定できる場合にしか適用できない。

漸化式

$$
  T(n) = 2T(\lfloor n/2 \rfloor) + n
$$

の上界を求めてみる。

まず解を $T(n) = O(n\lg n)$ であると推定する。  
適切に選択した定数 $c > 0$ に対して $T(n) \le cn\lg n$ を証明することが求められる。  
この上界がすべての正整数 $m < n$ 、中でも $\lfloor n/2 \rfloor$ に対して成立すると仮定すると、  
$T(\lfloor n/2 \rfloor) \le c\lfloor n/2 \rfloor \lg(\lfloor n/2 \rfloor)$ が成立する。これを漸化式に代入すると

$$
  \begin{split}
    T(n) &\le 2(c \lfloor n/2 \rfloor \lg(\lfloor n/2 \rfloor)) + n \\
         &< cn \lg(n/2) + n \\
         &= cn \lg n - cn \lg 2 + n \\
         &= cn \lg n - cn + n \\
         &\le cn \lg n
  \end{split}
$$

である。最後の不等式は $c \ge 1$ のとき成立する。  
この解が証明の基底部分を満たす必要がある。（よくわからなかったので省略）

### 上手に推定する方法

漸化式の解を正しく推定する一般的な方法は存在しない。  
漸化式が以前に扱ったものに似ているなら、似た解を推定するのが合理的。  
また、第 4.4 節 で説明する再帰木も利用できる。漸化式の弱い上界と下界をまず証明し、範囲を狭めていくのも方法の１つ。

## 4.4 漸化式を解くための再帰木法

再帰木では、各節点は部分問題のコストを表す。  
再帰木に対して、各レベル（深さ）で節点のコストの総和をとり、各レベルの総和をとれば全体のコストがわかる。詳細は省略する。

[← 前へ](../ch03/note.md)
