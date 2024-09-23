/*
 * @lc app=leetcode id=1011 lang=typescript
 *
 * [1011] Capacity To Ship Packages Within D Days
 */

// カテゴリは二分探索

// 動的計画法とかかな？と思ったけど、二分探索として出題されているということはそっちじゃできないのかな

// どういう二分探索だろう？？と思ったけど、ありうる値の範囲から探索していくために、ってことか
// そのヒントを得たら、残りの実装は自力でできた

// @lc code=start
function shipWithinDays(weights: number[], days: number): number {
  // 一番小さい場合は、最大の要素
  let left = Math.max(...weights);
  // 一番大きい場合は、すべての合計
  let right = weights.reduce((cur, acc) => cur + acc, 0);

  while (left != right) {
    let mid = Math.floor((left + right) / 2);
    if (canShipAll(weights, mid, days)) {
      // 運び切れた場合、より小さいキャパを試す
      right = mid;
    } else {
      // 運び切れない場合、より大きいキャパを試す（midは解ではないので、範囲から外す）
      left = mid + 1;
    }
  }

  return left;
}

const canShipAll = (
  weights: ReadonlyArray<number>,
  capacity: number,
  days: number
): boolean => {
  let i = 0;
  let d = 0;

  // 日数を使い切るまで
  while (d !== days) {
    let leftCapacity = capacity;

    // 船がいっぱいになるまで積む
    while (true) {
      // もう積み込めなかったらループを抜ける
      if (leftCapacity < weights[i]) break;
      // 積み込めるなら残りキャパを減らしてカーソルを進める
      leftCapacity -= weights[i];
      i += 1;
      // カーソルが進み切って荷物を積み終えたら、trueを返す
      if (weights.length <= i) return true;
    }
    d += 1;
  }
  return false;
};
// @lc code=end
