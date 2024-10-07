/*
 * @lc app=leetcode id=2 lang=typescript
 *
 * [2] Add Two Numbers
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

// カテゴリはlinked list

// 普通に繰り上げを含めた足し算の筆算みたいなことをしていけばいいのでは。
// 別のlinked listを用意していってもいいけど、与えられたlinked listを更新するのが楽そう。
// と思ったけど、長さが揃っていることが保証されているないので、足りなくなった時にnodeを追加するのややこしいから、別のlist listを用意することにする
// runtime: beats 47%
// memory: beats 86%
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let node1 = l1;
  let node2 = l2;
  let carryOver = 0;

  const result = new ListNode();
  let resultNode = result;

  // 両方とも終端を迎えてない限りつづける
  while (!(node1 == undefined && node2 == undefined && carryOver === 0)) {
    // 両方とも終端でなかったら、結果のnodeもひとつ追加する
    resultNode.next = new ListNode();
    resultNode = resultNode.next;

    const sum = (node1?.val ?? 0) + (node2?.val ?? 0) + carryOver;
    resultNode.val = sum % 10;
    carryOver = Math.floor(sum / 10);

    node1 = node1?.next;
    node2 = node2?.next;
  }

  // 最初のひとつはループの前に便宜的につくっているだけなので飛ばす
  return result.next;
}
// @lc code=end
