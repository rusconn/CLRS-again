# 1 章 計算におけるアルゴリズムの役割

## 1.1 アルゴリズム

**アルゴリズム**(algorithm)は、ある値または値の集合を**入力**(input)として取り、  
ある値または値の集合を**出力**(output)として生成する、明確に定義された計算手続きのこと。

### データ構造

**データ構造**(data structure)は、アクセスと更新を容易にする目的のためにデータを蓄積し組織化する方法。  
どのデータ構造もすべての目的に対して満足に働くことはない。  
なので、いくつかのデータ構造についてその長所と限界を理解することが重要。

### 計算困難な問題

NP 完全問題という、効率の良い解が知られていないような問題がある。

NP 完全問題の興味深い点:

- NP 完全問題は効率の良いアルゴリズムが見つかっていないが、  
  効率の良いアルゴリズムが存在しないことが証明されているわけでもない

- NP 完全問題の族はもしある１つの NP 完全問題に対して効率の良いアルゴリズムが見つかれば、  
  すべての NP 完全問題に対して効率の良いアルゴリズムが存在するという驚くべき性質を持っている

- NP 完全問題の中には効率の良いアルゴリズムが知られている問題とよく似たものがある。  
  問題を少し変更しただけで、知られている最良のアルゴリズムの効率が大きく変化してしまうことがある

具体例として中央配送センターを持つトラック運送会社を考える。

毎日、中央配送センターでトラックに荷物を積み込み、いくつかの場所に荷物を送り届ける。  
１日の終わりには、次の日の集荷に備えるためにトラックは中央配送センターに戻って来なければならない。  
会社はコスト削減のために、トラックの総走行距離が最小になるように配送順序を決めたい。

この問題はよく知られた「巡回セールスマン問題」であり、NP 完全問題である。  
この問題を解く効率の良いアルゴリズムは知られていない。  
しかし、ある仮定の下では、最短の場合とあまり違わない距離を持つルートを与える効率の良いアルゴリズムが存在する。

[次へ →](../ch02/note.md)
