/*
 * @lc app=leetcode id=112 lang=typescript
 *
 * [112] Path Sum
 */

// class TreeNode {
//   val: number;
//   left: TreeNode | null;
//   right: TreeNode | null;
//   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//     this.val = val === undefined ? 0 : val;
//     this.left = left === undefined ? null : left;
//     this.right = right === undefined ? null : right;
//   }
// }

// @lc code=start

// カテゴリはTree, BT, BST

// ふつうに深さ優先探索すればよさそう
// runtime: beats 63%
// memory: beats 67%

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  let sum = 0;
  // 見つかったらtrueを返す
  const dfs = (node: TreeNode | null): boolean => {
    if (node === null) return false;

    // sumを更新
    sum += node.val;

    // ここがleafで条件に合致するか
    if (node.left === null && node.right === null && sum === targetSum)
      return true;

    // 左をみる
    if (node.left !== null && dfs(node.left)) return true;
    // 右をみる
    if (node.right !== null && dfs(node.right)) return true;

    // sumを更新
    sum -= node.val;

    return false;
  };

  return dfs(root);
}
// @lc code=end
