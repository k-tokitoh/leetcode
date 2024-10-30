/*
 * @lc app=leetcode id=283 lang=typescript
 *
 * [283] Move Zeroes
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */

// カテゴリはその他/総合問題

// forでなめていく途中で要素を削除すると、i自体がずれたりしてややこしい
// 「0以外の要素を先へ先へと探索するカーソル」と「ここまでは非ゼロ、というカーソル」を用意してswapするのが効率よさそう

// runtime: beats 61%
// memory: beats 89%

function moveZeroes(nums: number[]): void {
  // 一番左の0をみつける
  let left = nums.findIndex((n) => n === 0);
  if (left === -1) return;
  let right = left + 1;

  while (true) {
    // 0でない要素をみつけまでrightを移動
    while (true) {
      // rightが配列を走査しおえたら終了
      if (right === nums.length) return;
      if (nums[right] !== 0) break;
      right++;
    }
    // swapして
    nums[left] = nums[right];
    nums[right] = 0;
    // leftを1すすめる
    left++;
  }
}
// @lc code=end
