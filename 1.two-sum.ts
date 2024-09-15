/*
 * @lc app=leetcode id=1 lang=typescript
 *
 * [1] Two Sum
 */

//
//

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
  // 値->indexのmapを作成
  // mapの作成がO(n)で、その後の探索もO(n)なので、計算量はO(n)
  const map = new Map<number, number>();
  nums.forEach((num, index) => map.set(num, index));
  let result: [number, number] | undefined;
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff) && map.get(diff) !== i) {
      result = [i, map.get(diff)!];
      break;
    }
  }
  return result!;
}
// @lc code=end
