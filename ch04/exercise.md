# 4 章 練習問題

## 4.1-1

> $A$ のすべての要素が負のとき`FIND-MAXIMUM-SUBARRAY`は何を返すか？

$A$ の最大要素のうち最も左にあるものを $a$ として

( $a$ の位置, $a$ の位置, $a$ の値 )

## 4.1-2

> 総当り法を用いて最大部分配列問題を解く擬似コードを書け。この擬似コードの実行時間は $\Theta(n^2)$ でなければならない。

```pseudo
FIND-MAXIMUM-SUBARRAY-BRUTE-FORCE(A):
  max = -∞
  for i = 1 to A.length
    sum = 0
    for j = i to A.length
      sum = sum + A[j]
      if sum > max
        low = i
        high = j
        max = sum
  return (low, high, max)
```

## 4.1-3

> 最大部分配列問題を解く総当りアルゴリズムと再帰アルゴリズムを計算機上で実現せよ。再帰アルゴリズムと総当りアルゴリズムの性能が逆転（交差）する最小の問題サイズ $n_0$ を調べよ。次に、再帰アルゴリズムの基底をサイズが $n_0$ 以下ならば総当りアルゴリズムを用いるように変更せよ。この変更によって交点の位置は変化するか？

[code.ts](./code.ts) に書いた。

自分の環境ではサイズ毎の計測結果がバラついていたのでよくわからなかった。  
大体 $n_0 = 100$ 程度に見えた。

## 4.1-4

> 最大部分配列問題の定義を変更して空の部分配列も解として許すようにする。ここで、空の部分配列の要素の和は 0 と定義する。今まで紹介してきた空の部分配列を解として認めないアルゴリズムを、空の部分配列も解として認めるように変更する方法を示せ。

部分配列の和が負のとき、空の部分配列を返すようにする。

（株価の話なら、たとえ損をすることになっても必ず売買しないといけない前提だったが、売買しなくてもよくなったということ？）

## 4.1-5

> 以下のアイデアに基づいて、最大部分配列問題を解く非再帰的な線形時間アルゴリズムを設計せよ。配列の左端から開始し、発見した最大部分配列を保持しながら右方向に処理を進める。 $A[i..j]$ の最大部分配列がわかっているとする。 $A[1..j+1]$ の最大部分配列は、（ $A[j+1]$ を含まず）$A[1..j]$ の最大部分配列と等しいか、（ $A[j+1]$ を含み）ある $1 \le i \le j+1$ に対して $A[i..j+1]$ と書けるかどちらかである。後者の形の部分配列の中で和が最大のものは、添字 $j$ で終了する部分配列の中で和が最大のものを保持していれば、定数時間で決定できる。

```pseudo
FIND-MAXIMUM-SUBARRAY-ITERATIVE(A):
  max = 0
  max_2 = 0
  i = 1
  for j = 1 to A.length
    max_2 = max_2 + A[j]
    if (A[j] > max_2)
      i = j
      max_2 = A[j]
    if (max_2 > max)
      low = i
      high = j
      max = max_2
  return (low, high, max)
```

Kadane's algorithm というらしい。

## 4.2-1

> 行列積
>
> $$
>   \begin{pmatrix}
>     1 & 3 \\
>     7 & 5
>   \end{pmatrix}
>   \begin{pmatrix}
>     6 & 8 \\
>     4 & 2
>   \end{pmatrix}
> $$
>
> を Strassen のアルゴリズムを用いて計算せよ。計算過程を説明せよ。

$$
  A_{11} = \begin{pmatrix}1\end{pmatrix}, A_{12} = \begin{pmatrix}3\end{pmatrix}, A_{21} = \begin{pmatrix}7\end{pmatrix}, A_{22} = \begin{pmatrix}5\end{pmatrix} \\
  B_{11} = \begin{pmatrix}6\end{pmatrix}, B_{12} = \begin{pmatrix}8\end{pmatrix}, B_{21} = \begin{pmatrix}4\end{pmatrix}, B_{22} = \begin{pmatrix}2\end{pmatrix}
$$

$$
  \begin{align}
    S_1 = B_{12} - B_{22} = \begin{pmatrix}6\end{pmatrix} \\
    S_2 = A_{11} + A_{12} = \begin{pmatrix}4\end{pmatrix} \\
    S_3 = A_{21} + A_{22} = \begin{pmatrix}12\end{pmatrix} \\
    S_4 = B_{21} - B_{11} = \begin{pmatrix}-2\end{pmatrix} \\
    S_5 = A_{11} + A_{22} = \begin{pmatrix}6\end{pmatrix} \\
    S_6 = B_{11} + B_{22} = \begin{pmatrix}8\end{pmatrix} \\
    S_7 = A_{12} - A_{22} = \begin{pmatrix}-2\end{pmatrix} \\
    S_8 = B_{21} + B_{22} = \begin{pmatrix}6\end{pmatrix} \\
    S_9 = A_{11} - A_{21} = \begin{pmatrix}-6\end{pmatrix} \\
    S_{10} = B_{11} + B_{12} = \begin{pmatrix}14\end{pmatrix}
  \end{align}
$$

$$
  \begin{align}
    P_1 = A_{11} \cdot S_1 = \begin{pmatrix}6\end{pmatrix} \\
    P_2 = S_2 \cdot B_{22} = \begin{pmatrix}8\end{pmatrix} \\
    P_3 = S_3 \cdot B_{11} = \begin{pmatrix}72\end{pmatrix} \\
    P_4 = A_{22} \cdot S_4 = \begin{pmatrix}-10\end{pmatrix} \\
    P_5 = S_5 \cdot S_6 = \begin{pmatrix}48\end{pmatrix} \\
    P_6 = S_7 \cdot S_8 = \begin{pmatrix}-12\end{pmatrix} \\
    P_7 = S_9 \cdot S_{10} = \begin{pmatrix}-84\end{pmatrix}
  \end{align}
$$

$$
  \begin{align}
    C_{11} = P_5 + P_4 - P_2 + P_6 = \begin{pmatrix}18\end{pmatrix} \\
    C_{12} = P_1 + P_2 = \begin{pmatrix}14\end{pmatrix} \\
    C_{21} = P_3 + P_4 = \begin{pmatrix}62\end{pmatrix} \\
    C_{22} = P_5 + P_1 - P_3 - P_7 = \begin{pmatrix}66\end{pmatrix}
  \end{align}
$$

$$
  \begin{pmatrix}
    18 & 14 \\
    62 & 66
  \end{pmatrix}
$$

## 4.2-2

> Strassen のアルゴリズムの擬似コードを書け。

```pseudo
STRASSEN(A, B):
  n = A.rows
  C を新しい n × n 型行列とする
  if n == 1
    c₁₁ = a₁₁・b₁₁
  else
    A, B, C を分割する
    S₁ = B₁₂ - B₂₂
    S₂ = A₁₁ + A₁₂
    S₃ = A₂₁ + A₂₂
    S₄ = B₂₁ - B₁₁
    S₅ = A₁₁ + A₂₂
    S₆ = B₁₁ + B₂₂
    S₇ = A₁₂ - A₂₂
    S₈ = B₂₁ + B₂₂
    S₉ = A₁₁ - A₂₁
    S₁₀ = B₁₁ + B₁₂
    P₁ = STRASSEN(A₁₁, S₁)
    P₂ = STRASSEN(S₂, B₁₁)
    P₃ = STRASSEN(S₃, B₁₁)
    P₄ = STRASSEN(A₁₁, S₄)
    P₅ = STRASSEN(S₅, S₆)
    P₆ = STRASSEN(S₇, S₈)
    P₇ = STRASSEN(S₉, S₁₀)
    C₁₁ = P₅ + P₄ - P₂ + P₆
    C₁₂ = P₁ + P₂
    C₂₁ = P₃ + P₄
    C₂₂ = P₅ + P₁ - P₃ - P₇
  return C
```

## 4.2-3 (第 4.5 節の後で解くことを推奨)

> $n$ が２のベキでないときにも正しく働くように $n \times n$ 型行列の積を計算する Strassen のアルゴリズムを変更せよ。変更を加えたアルゴリズムが $\Theta(n^{\lg 7})$ 時間で実行できることを示せ。

## 4.2-4 (第 4.5 節の後で解くことを推奨)

> $3 \times 3$ 型行列の乗算が $k$ 回の乗算（乗算の可換性は仮定しない）によって実現できることから、 $n \times n$ 型行列の乗算が $n^{\lg 7}$ 時間で計算できることが帰結できる最大の $k$ を求めよ。このアルゴリズムの実行時間を求めよ。

## 4.2-5 (第 4.5 節の後で解くことを推奨)

> V.Pan（パン）は $68 \times 68$ 型行列を $123,464$ 回の乗算を用いて行う方法、 $70 \times 70$ 型行列を $143,640$ 回の乗算を用いて行う方法、 $72 \times 72$ 型行列を $155,424$ 回の乗算を用いて行う方法を発見した。それぞれを分割統治行列積アルゴリズムの中で用いるとき、どの方法が最良の漸近的実行時間を実現するか。最良のものを Strassen のアルゴリズムと比較せよ。

## 4.2-6

> Strassen のアルゴリズムをサブルーチンに用いて $kn \times n$ 型行列と $n \times kn$ 型行列の積を計算するアルゴリズムの実行時間を解析せよ。入力行列の順序を逆にするとき、同じ質問に答えよ。

？

## 4.2-7

> ３回の実数乗算を用いて複素数 $a + bi$ と $c + di$ の積が計算できることを示せ。アルゴリズムは入力として $a,b,c,d$ を取り、実数部 $ac - bd$ と虚数部 $ad + bc$ を別々に出力しなければならない。

$$
  \begin{align}
    A = a \times c = ac \\
    B = b \times d = bd \\
    C = (a + b)\times(c + d) = ac + ad + bc + bd \\
    (A - B) + (C - A - B)i
  \end{align}
$$

## 4.5-1

> マスター法を用いて以下の漸化式に対するタイトな漸近的限界を求めよ
>
> a. $T(n) = 2T(n/4) + 1$  
> b. $T(n) = 2T(n/4) + \sqrt n$  
> c. $T(n) = 2T(n/4) + n$  
> d. $T(n) = 2T(n/4) + n^2$

a. $\Theta(\sqrt n)$  
b. $\Theta(\sqrt n \lg n)$  
c. $\Theta(n)$  
d. $\Theta(n^2)$

## 4.5-2

> 張儀教授は Strassen のアルゴリズムよりも漸近的に高速な行列積を計算するアルゴリズムを設計したいと考えている。彼のアルゴリズムは分割統治法に基づいており、各行列を $n/4 \times n/4$ 型に分割し、分割段階と結合段階に $\Theta(n^2)$ 時間かかる。Strassen のアルゴリズムを凌ぐために彼のアルゴリズムが生成しなければならない部分問題数を決定する必要がある。アルゴリズムが $a$ 個の部分問題を生成するとき、実行時間 $T(n)$ を特徴づける漸化式は $T(n) = aT(n/4) + \Theta(n^2)$ である。張儀教授のアルゴリズムが Strassen のアルゴリズムよりも漸近的に高速であるような最大の整数 $a$ の値を求めよ。

Strassen のアルゴリズムの実行時間は $\Theta(n^{\lg 7})$ 。  
張儀教授のアルゴリズムの分割および結合コストはこれを超えないので無視する。

$$
  \begin{eqnarray*}
    n^{\log_{4}{a}} & < & n^{\lg 7} \\
    \iff \log_{4}{a} & < & \lg 7 \\
    \iff \log_{4}{a} & < & \log_{4}{7} / \log_{4}{2} \\
    \iff \log_{4}{a} & < & \log_{4}{7} / (1/2) \\
    \iff \log_{4}{a} & < & 2\log_{4}{7} \\
    \iff \log_{4}{a} & < & \log_{4}{7^2} \\
    \iff \log_{4}{a} & < & \log_{4}{49} \\
  \end{eqnarray*}
$$

$a = 48$

## 4.5-3

> マスター法を用いて２分探索の漸化式 $T(n) = T(n/2) + \Theta(1)$ の解が $T(n) = \Theta(\lg n)$ であることを示せ。（２分探索の記述は練習問題 2.3-5 を参照せよ。）

$\Theta(n^{\log_{b}{a}}) = \Theta(n^{\log_{2}{1}}) = \Theta(n^0) = \Theta(1) = f(n)$

なので、 $\Theta(n^{\log_{b}{a}}\lg n) = \Theta(\lg n)$

## 4.5-4

> 漸化式 $T(n) = 4T(n/2) + n^2\lg n$ に対してマスター法を適用できるか？可否を理由と共に答えよ。この漸化式に対する漸近的上界を与えよ。

適用できない。 $f(n)$ の方が漸近的に大きいので場合３を適用できそうだが、  
$n^2 \lg n / n^{\log_{2}{4}} = \lg n$ は任意の正定数 $\epsilon$ に対して $n^\epsilon$ より漸近的に小さい。  
つまり多項式的に小さく、場合２と場合３の間に落込んでいる。

## 4.5-5 ★

> ある定数 $c < 1$ に対する正則性 $af(n/b) \le cf(n)$ を考えよう。正則性はマスター定理の場合３の一部である。マスター定理の場合３の条件のうち、正則性以外をすべて満たす定数 $a \ge 1, b > 1$ と関数 $f(n)$ の例を与えよ。

？
