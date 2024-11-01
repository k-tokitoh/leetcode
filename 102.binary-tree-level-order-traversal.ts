/*
 * @lc app=leetcode id=102 lang=typescript
 *
 * [102] Binary Tree Level Order Traversal
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// カテゴリはTree, BT, BST
// ふつうに幅優先探索すればいいと思う

// levelをqueueするitemに含める
// runtime: beats 85 %
// memory: beats 32 %

// function levelOrder(root: TreeNode | null): number[][] {
//   const ret: number[][] = [];
//   if (root === null) return ret;
//   const queue: [TreeNode, number][] = [[root, 0]];
//   while (true) {
//     // queueから取り出す
//     const item = queue.shift();

//     // queueが空だったらreturn
//     if (item === undefined) break;
//     const [node, level] = item;

//     // 結果を追記
//     if (ret[level] === undefined) ret.push([]);
//     ret[level].push(node.val);

//     // enqueue
//     if (node.left) queue.push([node.left, level + 1]);
//     if (node.right) queue.push([node.right, level + 1]);
//   }

//   return ret;
// }

// メモリ効率を改善するには、levelをqueueで管理するのをやめられたらよさそう
// 再帰でやっている他の回答をみた
// なるほど、BFSな印象を受けてBFSに囚われていたけど、traverseはDFSでやってもいい
// そしたら再帰がつかえて、再帰でlevelを関数呼び出しの引数として管理すれば、メモリ効率も改善される

// runtime: beats 85 %
// memory: beats 82 %

// @lc code=start

function levelOrder(root: TreeNode | null): number[][] {
  const ret: number[][] = [];

  // 指定したnode以下をtraverseしてretを更新する
  const traverse = (node: TreeNode | null, level: number): void => {
    // nullならreturn
    if (node === null) return;

    // いまいるnodeについてretを更新する
    if (ret[level] === undefined) {
      ret[level] = [node.val];
    } else {
      ret[level].push(node.val);
    }

    // 子をみる
    traverse(node.left, level + 1);
    traverse(node.right, level + 1);
    return;
  };

  traverse(root, 0);
  return ret;
}
// @lc code=end
