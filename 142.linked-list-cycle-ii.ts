/*
 * @lc app=leetcode id=142 lang=typescript
 *
 * [142] Linked List Cycle II
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

// 既存の要素を記憶していき、既存の要素につながる or 終端につくまで順番に辿る
// runtime: beats 59%
// memory: beats 61%
function detectCycle(head: ListNode | null): ListNode | null {
  if (head == undefined) return null;

  // 既出のnodeを記録しておく。
  const nodes = new Set<ListNode>([head]);

  let node = head;

  while (true) {
    if (node.next == undefined) return null;

    if (nodes.has(node.next)) return node.next;

    nodes.add(node);
    node = node.next;
  }
}
// @lc code=end
