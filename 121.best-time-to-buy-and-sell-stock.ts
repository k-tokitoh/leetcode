/*
 * @lc app=leetcode id=121 lang=typescript
 *
 * [121] Best Time to Buy and Sell Stock
 */

// カテゴリは動的計画法
// 「n日後の最大利益は？」という問題を、「k(<=n)日後の最大利益（と最小取得価格）は？」という問いに分解する
// この問いの分解は1次元。（2次元以上の場合もある）
// そして部分解が他のいくつの部分解に影響するか = 部分解が他のいくつの部分解から導けるか、でいうと、1つ
// ex. 「k日後の最大利益と最小取得価格」がわかれば、「k+1日後の最大利益と最小取得価格」もわかる
// そして上記のとおり極めてシンプルであるため、上記の部分解は2つとも、
// データ構造を用意して保持する必要がなく、変数に都度代入して更新していけばよい
// ポイントとしては、最小価格は「その日までで一番やすいのだからそこで買うことが決まる」けれど、
// 売る方については、最大値の日で売るのがベストとは限らないので、最大値やその日をメモしておくのではなく、
// 利益の方をメモしておく

// @lc code=start
function maxProfit(prices: number[]): number {
  let maxProfit = 0;
  let minPrice = prices[0];

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    const profit = price - minPrice;
    maxProfit = Math.max(maxProfit, profit);
    minPrice = Math.min(minPrice, price);
  }

  return maxProfit;
}
// @lc code=end
