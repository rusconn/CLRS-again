# 2 章 章末問題

## 2-1 マージソートに現れる小配列上の挿入ソート

> マージソートの最悪実行時間は $\Theta(n\lg n)$ 、挿入ソートの最悪実行時間は $\Theta(n^2)$ であるが、挿入ソートのほうが定数因子が小さいので、問題サイズが小さいときには挿入ソートのほうが多くの計算機上で高速に実行できる。そこで、部分問題が十分小さくなったときに、マージソートの中で挿入ソートを用いて再帰の**底を上げる**(coarsen the leaves)意義がある。 $n/k$ 個のそれぞれ長さ $k$ の部分リストを挿入ソートを用いてソートし、その後は標準的な方法でマージを行うようにマージソートを改良する。

### 2-1.a

> $n/k$ 個のそれぞれ長さ $k$ の部分リストは、挿入ソートにより最悪時に $\Theta(nk)$ 時間でソートできることを示せ。

挿入ソートの最悪実行時間は $an^2 + bn + c$ であるので

$$
  \frac{n}{k} \times (ak^2 + bk + c) = ank + bn + \frac{c}{k}n = \Theta(nk)
$$

### 2-1.b

> ソート済みの $n/k$ 個の部分リストは最悪時に $\Theta(n\lg (n/k))$ 時間でマージできることを示せ。

マージの最悪実行時間は $n + c$ であるので

$$
  \begin{split}
    \frac{n}{k} \times (k + c) + \frac{n}{2k} \times (2k + c) + \cdots + 2 \times (\frac{n}{2} + c)
      &= \lg \frac{n}{k} \times n + (\frac{cn}{k} + \frac{cn}{2k} + \cdots + 2c) \\
      &= \Theta(n\lg\frac{n}{k})
  \end{split}
$$

### 2-1.c

> 改良アルゴリズムの最悪実行時間を $\Theta(nk+n\lg (n/k))$ とする。改良アルゴリズムが標準的なマージソートと同じ漸近的実行時間を持つという条件の下で、 $k$ が取りうる最大値を $n$ の関数として $\Theta$ 記法で示せ。

？

### 2-1.d

> 実際的には $k$ の値をどのように選ぶべきか？

マージソートよりも挿入ソートの方が速い最大のサイズ。

## 2-2 バブルソートの正当性

> バブルソートは人気があるが、非効率なソーティングアルゴリズムである。バブルソートは隣接要素が逆順になっていれば、それらの位置を交換する操作を繰り返すことでソートを実現する。
>
> ```pseudo
> BUBBLESORT(A):
>   for i = 1 to A.length - 1
>     for j = A.length downto i + 1
>       if A[j] < A[j - 1]
>         A[j] と A[j - 1] を交換する
> ```

### 2-2.a

> $A'$ を`BUBBLESORT(A)`の出力とする。`BUBBLESORT`の正当性を証明するには、`BUBBLESORT`が停止し、停止時に
>
> $$
>   A'[1] \le A'[2] \le \cdots \le A'[n] \tag{2.3}
> $$
>
> が成立することを証明しなければならない。ただし、 $n = A.length$ である。`BUBBLESORT`が実際にソートすることを証明するには他に何を証明する必要があるか？
>
> 次の２つの問いでは不等式 $(2.3)$ を証明する。

$A'$ の要素が元々 $A$ に存在した要素であること。

### 2-2.b

> 第 2~4 行の**for**文に対するループ不変式を正確に記述し、このループ不変式が成立することを証明せよ。ただし、本章で示したループ不変式の証明の構造に従って証明すること。

ループ不変式:

<i>**for 文**の各ループ実行開始時、 $\textit{A[j..n]}$ には開始時点で $\textit{A[j..n]}$ に格納されていた要素が格納されている。また、 $\textit{A[j]}$ には $\textit{A[j..n]}$ の中の最小要素が格納されている。</i>

- **初期条件**: $j = A.length$ の時、 $A[j..n]$ は唯一の要素 $A[n]$ から構成され、  
  これは元々 $A[n]$ に格納されていた要素である。 $A[n]$ は $A[n..n]$ の最小要素である

- **ループ内条件**: ある $j$ についてループ実行開始時にループ不変式が成立すると仮定する。  
  ループ内処理の結果、 $A[j-1..n]$ は元々 $A[j-1..n]$ に格納されていた要素から構成されるようになる。  
  また、 $A[j-1]$ が元々 $A[j-1..n]$ にあった最小要素となる。  
  **for**文の次の繰返しのために $j$ から $1$ を引くとループ不変式が維持される

- **終了条件**: **for**文が停止する際、 $j = i$ が成立する。  
  ループ不変式の $j$ に $i$ を代入すると、「 $A[i..n]$ には開始時点で $A[i..n]$ に格納されていた要素が格納されている。  
  また、 $A[i]$ には $A[i..n]$ の中の最小要素が格納されている。」と結論できる

### 2-2.c

> $(b)$ で証明したループ不変式の停止条件を用いて、不等式 $(2.3)$ の証明に繋がる、第 1~4 行の**for**文に対するループ不変式を記述せよ。ただし、本章で示したループ不変式の証明の構造に従って証明すること。

ループ不変式:

<i>**for 文**の各ループ実行開始時、 $\textit{A[1..i-1]}$ には開始時点で $\textit{A[1..n]}$ に格納されていた、小さい方から $i-1$ 個の要素がソートされた状態で格納されている。また、 $\textit{A[i..n]}$ には残りの要素が格納されている。</i>

- **初期条件**: $i = 1$ の時、 $A[1..i-1]$ は空であり、小さい方から $0$ 個の要素がソートされた状態で格納されていると考えることができる。  
  $A[i..n]$ には残り(=すべて)の要素が格納されている

- **ループ内条件**: ある $i$ についてループ開始時にループ不変式が成立すると仮定する。  
  ループ内処理の結果、 $(b)$ の終了条件より、 $A[i]$ には $A[i..n]$ の中の最小要素が格納され、  
   結果的に $A[1..i]$ に開始時点で $A[1..n]$ に格納されていた、小さい方から $i$ 個の要素がソートされた状態で格納される。  
   **for**文の次の繰返しのために $i$ に $1$ を加えるとループ不変式が維持される

- **終了条件**: **for**文が停止する際、 $i = A.length = n$ が成立する。  
  ループ不変式の $i$ に $n$ を代入すると、 $A[1..n-1]$ には開始時点で  
  $A[1..n]$ に格納されていた、小さい方から $n-1$ 個の要素がソートされた状態で格納されている。  
  また、 $A[n..n]$ には残りの要素(=最大要素)が格納されている。  
  つまり、 $A[1..n]$ は昇順にソートされており、開始時点で $A$ に存在していた要素で構成されていると結論できる

### 2-2.d

> バブルソートの最悪実行時間を求めよ。挿入ソートの実効時間と比較せよ。

内側のループの１回あたりの実行時間を $c$ とすると

$$
  c\sum_{i=1}^{n-1}(n-i) = c\sum_{i=1}^{n-1}n - c\sum_{i=1}^{n-1}i = cn(n - 1) - \frac{cn(n-1)}{2} = \frac{cn(n-1)}{2} = \Theta(n^2)
$$

| 種別         | 挿入ソート    | バブルソート  |
| :----------- | :------------ | :------------ |
| 最悪実行時間 | $\Theta(n^2)$ | $\Theta(n^2)$ |
| 最良実行時間 | $\Theta(n)$   | $\Theta(n^2)$ |

## 2-3 Horner の公式の正当性

> 次の擬似コード（の断片）は、係数 $a_0,a_1,\ldots,a_n$ と $x$ の値が与えられたとき多項式
>
> $$
>  \begin{split}
>    P(x) &= \sum_{k=0}^{n}a_kx^k \\
>         &= a_0 + x(a_1 + x(a_2 + \cdots + x(a_{n-1} + xa_n) \cdots))
>  \end{split}
> $$
>
> の値を求めるための **Horner**（ホーナー）の公式を実現したものである。
>
> ```pseudo
> y = 0
> for i = n downto 0
>   y = aᵢ + x・y
> ```

### 2-3.a

> Honer の公式に対するこの擬似コードの実行時間を $\Theta$ 記法を用いて示せ。

乗算の実行時間を $c$ とすると

$$
  \sum_{i=0}^{n}c = c(n+1) = \Theta(n)
$$

### 2-3.b

> 多項式の各項を最初から計算する素朴な多項式評価のアルゴリズムの擬似コードを書け。そのアルゴリズムの実行時間を求めよ。Horner の公式と比較せよ。

```pseudo
y = 0
for i = 0 to n
  z = 1
  for j = 1 to i
    z = z・x
  y = y + aᵢ・z
```

乗算の実行時間を $c$ とすると

$$
  \begin{split}
    \sum_{i=0}^{n}c(\sum_{j=1}^{i}c+1)
      &= \sum_{i=0}^{n}c(ci+1) \\
      &= c\sum_{i=0}^{n}(ci+1) \\
      &= c(c\sum_{i=0}^{n}i + \sum_{i=0}^{n}1) \\
      &= c(c\frac{n(n+1)}{2} + n+1) \\
      &= \frac{c^2}{2}n^2 + \frac{c^2+1}{2}n + c \\
      &= \Theta(n^2)
  \end{split}
$$

### 2-3.c

> 次のループ不変式を考える。第 2~3 行の**for**文の各繰返しの開始時点において
>
> $$
>   y = \sum_{k=0}^{n-(i+1)}a_{k+i+1}x^k
> $$
>
> が成立する。
>
> $0$ 個の項の和は $0$ と解釈せよ。本章で示したループ不変式の証明の構造に従って停止時に
>
> $$
>   y = \sum_{k=0}^{n}a_kx^k
> $$
>
> が成立することをループ不変式を用いて証明せよ。

- **初期条件**: $i = n$ の時、擬似コードは $y = 0$ である。ループ不変式は $0$ 項の和となるので $0$ であり、一致する

- **ループ内条件**: ある $i$ についてループ開始時にループ不変式が成立すると仮定する。ループ内処理を実行すると $$y = a_i + x\sum_{k=0}^{n-(i+1)}a_{k+i+1}x^k = ？ = \sum_{k=0}^{n-i}a_{k+i}x^k$$ となる。**for**文の次の繰返しのために $i$ から $1$ を引くとループ不変式が維持される

- **終了条件**: **for**文が停止する際、 $i = -1$ が成立する。ループ不変式の $i$ に $-1$ を代入すると $$y = \sum_{k=0}^{n-(-1+1)}a_{k-1+1}x^k = \sum_{k=0}^{n}a_{k}x^k$$ であると結論できる。

### 2-3.d

> 与えた擬似コードが係数 $a_0,a_1,\ldots,a_n$ から定まる多項式の値を正しく計算することを結論せよ。

$(c)$ より

$$
  y = \sum_{k=0}^{n}a_kx^k = a_0x^0 + a_1x^1+\ldots+a_nx^n
$$

と結論できる。

## 2-4 反転

> $A[1..n]$ を $n$ 個の相異なる数の配列とする。 $i < j$ かつ $A[i] > A[j]$ のとき、対 $(i,j)$ を $A$ の**反転**(inversion)と呼ぶ。

### 2-4.a

> 配列 $\langle 2,3,8,6,1 \rangle$ が含む $5$ 個の反転を列挙せよ。

$(1,5),(2,5),(3,4),(3,5),(4,5)$

### 2-4.b

> 集合 $\lbrace 1,2,\ldots,n \rbrace$ から選択された要素を持つ配列の中で最も多くの反転を含むものを示せ。この配列が持つ反転数を求めよ。

配列: $\langle n,n-1,\ldots,1 \rangle$

反転数: $(n-1)+(n-2)+\ldots+1 = \frac{n(n-1)}{2}$

### 2-4.c

> 挿入ソートの実行時間と入力配列の反転数の関係を述べよ。答が正しいことを証明せよ。

挿入ソートの内側のループは１回実行されると反転数が１つ減る。  
ソート後の反転数が $0$ であることを考慮すると、内側のループの実行回数は反転数と一致する。  
つまり、挿入ソートの実行時間は必ず反転数以上となる。

### 2-4.d

> $n$ 個の要素からなる任意の順列が含む反転数を最悪時に $\Theta(n\lg n)$ 時間で決定するアルゴリズムを与えよ。（**ヒント：** マージソートを変形せよ。）

```pseudo
COUNT-INVERSIONS(A):
  if p < r
    q = ⌊(p + r) / 2⌋
    a = COUNT-INVERSIONS(A, p, q)
    b = COUNT-INVERSIONS(A, q + 1, r)
    return a + b + MERGE-INVERSIONS(A, p, q, r)
```

```pseudo
MERGE-INVERSIONS(A, p, q, r):
  n₁ = q - p + 1
  n₂ = r - q
  L[1..n₁+1] と R[1..n₂+1] を2つの新しい配列とする
  for i = 1 to n₁
    L[i] = A[p + i - 1]
  for j = 1 to n₂
    R[j] = A[q + j]
  L[n₁ + 1] = ∞
  R[n₂ + 1] = ∞
  i = 1
  j = 1
  inversions = 0
  for k = p to r
    if L[i] <= R[j]
      A[k] = L[i]
      i = i + 1
    else
      A[k] = R[j]
      j = j + 1
      inversions = inversions + n1 - i + 1
  return inversions
```
