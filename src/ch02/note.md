# 2 章 さあ、始めよう

## 2.1 挿入ソート

挿入ソートは少数の要素を効率よくソートするアルゴリズム。  
トランプで手札をソートするときに多くの人が使う方法。

まず左手を空にし、テーブルの上にカードを裏向きに置く。  
次に、テーブルから１枚ずつカードを取って、左手の正しい位置に挿入してゆく。  
カードの正しい位置は、右から左へと順に既に手の中にあるカードと比較すれば発見できる。

```pseudo
INSERTION-SORT(A):
  for j = 2 to A.length
    key = A[j]
    A[j]をソート済みの列A[1..j-1]に挿入する
    i = j - 1
    while i > 0 かつ A[i] > key
      A[i + 1] = A[i]
      i = i - 1
    A[i + 1] = key
```

### ループ不変式と挿入ソートの正当性

アルゴリズムの正当性を示すために**ループ不変式**(loop invariant)を導入する。

`INSERTION-SORT` のループ不変式:

<i>**for 文**の各ループ実行開始時、 $\textit{A[1..j-1]}$ には開始時点で $\textit{A[1..j-1]}$ に格納されていた要素がソートされた状態で格納されている。</i>

ループ不変式に対して３つの性質を示す必要がある。

- **初期条件**: 初回実行開始時にループ不変式は真である

- **ループ内条件**: 何回目かの実行開始時にループ不変式が真ならば、次の実行開始時でも真である

- **終了条件**: ループが停止したとき、アルゴリズムの正当性の証明に繋がる有力な性質が不変式から得られる

最初の２つの性質が成立すれば、すべてのループの実行開始時にループ不変式は真となる。  
ループを抜けた際にもループ不変式が成立するので、そこからアルゴリズムの正当性を示す。

挿入ソートについて、これらの性質が成立していることを確かめる。

- **初期条件**: $j=2$ の時、 $A[1..j-1]$ は唯一の要素 $A[1]$ から構成され、  
  これは元々 $A[1]$ に格納されていた要素である。ソート済みであるとみなせる。

- **ループ内条件**: **for 文** の本体が行なっているのは、 $A[j]$ を入れるべき場所が見つかるまで  
  $A[j-1],A[j-2],A[j-3],...$ をそれぞれ 1 つ右に移し空いた場所に $A[j]$ の値を挿入することである。  
  $A[1..j]$ は元々 $A[1..j]$ に格納されていた要素から構成されているが、既にソートされている。  
  **for**文の次の繰返しのために $j$ に $1$ を加えるとループ不変式が維持される

- **終了条件**: **for 文** 停止時に $j = n + 1$ が成立する。ループ不変式の $j$ に $n + 1$ を代入すると、  
  「 $A[1..n]$ には開始時点で $A[1..n]$ に格納されていた要素がソートされた状態で格納されている。」となる。  
  $A[1..n]$ が配列全体であることに注意すると、配列全体がソート済みであると結論できる

ループ不変式を用いてアルゴリズムの正当性を示すこの方法を他の章でも用いる。

## 2.2 アルゴリズムの解析

アルゴリズムの実行に必要な資源量を予測することを、アルゴリズムを解析する（analyzing）と言う。  
多くの場合、予測したいのは計算時間。

### 最悪時と平均時の解析

実行時間は入力によって変わり得る。  
**サイズ** $n$ の**任意の**入力に対する最長の実行時間である、**最悪実行時間**(worst-case running time)を考えることが多い。

アルゴリズムの**平均**(average-case)実行時間を検討することもある。  
本書を通して、**確率的解析**(probabilistic analysis)を様々なアルゴリズムに対して適用する。

### 増加のオーダ

実行時間の**増加率**(rate of growth)または**増加のオーダ**(order of growth)を解析する際、式の主要項(高次項)だけを考える。  
主要項の係数や低次の項は $n$ が大きいとき相対的に重要度が低いから省略する。

挿入ソートの最悪実行時間は大雑把に $an^2 + bn + c$ と記述できるが、上記ルールを適用すると $n^2$ と抽象化される。  
これを、挿入ソートは $\Theta(n^2)$ の最悪実行時間を持つと書く。 $\Theta$ 記法は第３章で定義する。

あるアルゴリズムが他のアルゴリズムよりその最悪実行時間の増加率が低い場合、効率が良いと考える。

[← 前へ](../ch01/note.md)