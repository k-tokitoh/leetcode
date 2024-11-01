/*
 * @lc app=leetcode id=560 lang=typescript
 *
 * [560] Subarray Sum Equals K
 */

// カテゴリはhashmap

// subarrayの個数はO(n^2)なので、ナイーブにやるとO(n^2)になる
// 尺取法だっけ？そしたらO(n)になる気がする
// と思ったら要素が負数もあるので尺取法はだめだった

// https://www.youtube.com/watch?v=fFVZt-6sgyo
// 順番にi番目をみていく。いまn番目をみているとする
// 「最初からi番目までの和」はメモしておく
// n番目までの和がsだったら、「最初からi番目までの和がs-kであるようなi番目の個数」が、発見したsubarrayの数
// （i+1番目からn番目までのsubarrayの発見に対応する）
// 「最初からi番目までの和」のメモを、和をkeyとして「そういうi番目の登場回数」をvalueとすれば、
// subarrayのカウントの加算はhashmapによりO(1)でできる
// 全体としては配列を1回走査するだけなのでO(n)で済む
// うーむ賢い...。

// objectをつかった場合
// runtime: beats 36%
// memory: beats 15%
// function subarraySum(nums: number[], k: number): number {
//   const indexCountBySum: Record<number, number> = { 0: 1 };
//   let sum = 0;
//   let subarrayCount = 0;
//   for (let i = 0; i < nums.length; i++) {
//     // ここまでの和を更新
//     sum += nums[i];

//     // 条件を満たすsubarrayの数を加算
//     subarrayCount += indexCountBySum[sum - k] || 0;

//     // hashmapを更新 = そのindexまでの和がsumであるようなindexのカウントをincrement
//     indexCountBySum[sum] = (indexCountBySum[sum] || 0) + 1;
//   }
//   return subarrayCount;
// }

// mapをつかった場合
// runtime: beats 100%
// memory: beats 75%

// ObjectよりMapの方がhashmapとしては効率的らしい。

// ||じゃなくて??をつかったらメモリのパフォーマンスが上がった。
// 理由はよくわからない

// @lc code=start
function subarraySum(nums: number[], k: number): number {
  const indexCountBySum = new Map<number, number>();
  let sum = 0;
  let subarrayCount = 0;
  for (let i = 0; i < nums.length; i++) {
    // ここまでの和を更新
    sum += nums[i];

    // 条件を満たすsubarrayの数を加算
    if (sum === k) subarrayCount += 1;

    subarrayCount += indexCountBySum.get(sum - k) ?? 0;

    // hashmapを更新 = そのindexまでの和がsumであるようなindexのカウントをincrement
    indexCountBySum.set(sum, (indexCountBySum.get(sum) ?? 0) + 1);
  }
  return subarrayCount;
}

// @lc code=end
