/*
 * @lc app=leetcode id=127 lang=typescript
 *
 * [127] Word Ladder
 */

// @lc code=start
// カテゴリはgraph

// 1文字入れ替えた単語をノードとしてつなげていって、end wordが出現するまでグラフ全体を探索する
// 最小距離を求めたいのでDFSではなくBFS

// 単語Aが1文字入れ替えたら単語Bになるかを知りたい
// いくつかやり方がありそう
// - a. 単語Aに対して、単語B, C, Dを都度総当たりで確かめていく
//   - 5000*10通り
// - b. 単語Aに対して、1文字ずつa,b,cを入れ替えて行って、B/C/Dになるかを確かめる
//   - 26^10通り
// - c. あらかじめ全ての単語間が1文字で遷移できるかを確かめておく
//   - 今回は何度も同じ組み合わせについて調べる必要はないので、これのうまみはない

// aの方がbよりよさそうだな

// 再帰を使わないDFS/BFSは、stack/queueを定義してwhile(true)ループするのが基本形

// aでやってみる
// runtime: beats 43%
// memory: beats 89%
function ladderLength(
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  const wordSet = new Set(wordList);
  // begin wordはあっても後戻りしてしまうだけなので削除しておく
  wordSet.delete(beginWord);

  // 調査対象の単語を、begin wordからの距離とともに格納する
  const queue: Array<[string, number]> = [[beginWord, 1]];

  while (true) {
    // 調査対象 = 比較の基準になる単語を取り出す
    const item = queue.shift();
    // もう探索対象がないなら到達不可能、という結論を返す
    if (item == undefined) return 0;

    const [base, distance] = item;
    // 調査対象の単語を1文字変えたらこの単語になる、というのを全部見つけたい
    // 単語リストに含まれる単語をひとつひとつみていく
    for (const word of wordSet) {
      let diff = 0;
      // 文字ごとに走査する
      for (let i = 0; i < base.length; i++) {
        // i文字目について比較する
        if (word[i] != base[i]) diff++;
        // 2文字以上異なっていたら、その時点で文字ごとの走査は終了
        if (1 < diff) break;
      }

      // 文字ごとの走査を終えた時点でdiffが1文字だけな場合、その単語に遷移することができる
      if (diff === 1) {
        // end wordだったら、begin wordからの距離をreturnする
        if (word === endWord) return distance + 1;

        // end wordでない場合
        // - その文字を調査対象に追加する
        queue.push([word, distance + 1]);
        // - いま見出したのがその単語への最短経路なので、今後はその単語への遷移を考える必要はない。よって単語リストから削除する
        wordSet.delete(word);
      }
    }
  }
}

// 思ったこと
// - ループの奥から関数全体のreturnをしたい場合は、forEachとかよりもforループの方がいい
//   - 今回はグラフの探索の途中で、end wordがでてきたら直ちに関数全体として「距離はnでした」とreturnしたいので、forループがやりやすい

// bでやってみる
// ...と思ったけど、c++とかでは文字列の1文字差し替えが低コストでできそうだけど、jsだとコスト安い方法が見つからない
// なので諦める
// @lc code=end
