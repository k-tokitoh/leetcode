/*
 * @lc app=leetcode id=153 lang=typescript
 *
 * [153] Find Minimum in Rotated Sorted Array
 */

// カテゴリは二分探索

// 唯一減るところをみつければいい
// それを二分探索でみつける

// 二分探索って条件次第でけっこうややこしいんだな
// 特に、最後とどめをさせるように注意する
// - midを求めるのは切り捨てでいい
// - 最後膠着しないように、left/rightの更新はどちらかをmid+-1とする
// - それで離脱条件はleft == right

// @lc code=start
function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left != right) {
    let mid = Math.floor((left + right) / 2);
    // 真ん中が最初の要素より小さいなら、減少するところは左側にあるはず
    if (nums[mid] < nums[right]) {
      right = mid;
    } else {
      // 真ん中が最初の要素と同じかそれより大きいなら、減少するところは右側にあるはず
      // （要素はuniqなので、leftと真ん中が一致するケースは考慮不要）
      left = mid + 1;
    }
  }

  return nums[left];
}
// @lc code=end
