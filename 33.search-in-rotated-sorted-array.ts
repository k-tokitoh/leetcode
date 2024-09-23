/*
 * @lc app=leetcode id=33 lang=typescript
 *
 * [33] Search in Rotated Sorted Array
 */

// カテゴリは二分探索

// だいぶむずいな。
// じっくりノートに書き出して場合わけしたら理解できた。

// 実装上のポイントは以下か
// 範囲を狭めるときはmid+-1で更新する（そうでないとleft/rightの差が1のときに動かなくなってしまう）
// しかしそれで範囲を飛び出てしまうことがあるので、ループの制約をleft<=rightにしておく

// @lc code=start
function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    // ビンゴなら直ちにreturn
    if (nums[mid] == target) return mid;

    // ビンゴでなければ範囲を絞る
    if (nums[left] <= nums[mid]) {
      // left-midで下降していたとしたら、leftを超えるところまでmidが上がり直すわけはない
      // よってこの分岐ではleft-midで下降はしていない = left-midはsortedである
      // （leftとmidが一致する場合は、sortedな1要素と考えられる）
      if (nums[left] <= target && target < nums[mid]) {
        // sortedな範囲にtargetが含まれるならば、左側を探せばよい
        // （右側にこのsortedな範囲が含まれることはない）
        right = mid - 1;
      } else {
        // sortedな範囲にtargetが含まれないならば、右側を探せばよい
        left = mid + 1;
      }
    } else {
      // left-midで下降している
      // よってmid-rightでは下降していない = mid-rightはsorted
      if (nums[mid] < target && target <= nums[right]) {
        // sortedな範囲にtargetが含まれるならば、右側を探せばよい
        // （左側にこのsortedな範囲が含まれることはない）
        left = mid + 1;
      } else {
        // sortedな範囲にtargetが含まれないならば、右側を探せばよい
        right = mid - 1;
      }
    }
  }
  return -1;
}
// @lc code=end
