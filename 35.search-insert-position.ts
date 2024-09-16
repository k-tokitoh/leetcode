/*
 * @lc app=leetcode id=35 lang=typescript
 *
 * [35] Search Insert Position
 */

// カテゴリはbinary search

// descから明らかではないが、[1,3,5], 2の場合は1が期待される

// @lc code=start

//////////////////////////////// 再帰

// で書いたらruntimeが下位5%になってしまった
// 関数呼び出しのオーバーヘッドのせいかな

// function searchInsert(nums: ReadonlyArray<number>, target: number): number {
//   return binarySearch(nums, 0, nums.length, target);
// }

// ある配列と、始点/終点のindexと、targetを受け取り、そのtargetが存在する/すべきindexを返す
// const binarySearch = (
//   nums: ReadonlyArray<number>,
//   start: number,
//   end: number,
//   target: number
// ): number => {
//   // startとendが一致したケースを書く
//   if (start === end) {
//     return start;
//   }

//   // startとendが一致しないケースを書く
//   const midIndex = Math.floor((start + end) / 2);
//   const mid = nums[midIndex];
//   if (mid === target) {
//     return midIndex;
//   } else if (mid < target) {
//     return binarySearch(nums, midIndex + 1, end, target);
//   } else {
//     return binarySearch(nums, start, midIndex, target);
//   }
// };

//////////////////////////////// ループ

// で書いたらbeats 68%になった
function searchInsert(nums: ReadonlyArray<number>, target: number): number {
  let start = 0;
  let end = nums.length;

  while (true) {
    if (start === end) {
      return start;
    }

    const midIndex = Math.floor((start + end) / 2);
    const mid = nums[midIndex];
    if (mid === target) {
      return midIndex;
    } else if (mid < target) {
      start = midIndex + 1;
    } else {
      end = midIndex;
    }
  }
}

// @lc code=end
