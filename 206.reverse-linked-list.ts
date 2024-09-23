/*
 * @lc app=leetcode id=206 lang=typescript
 *
 * [206] Reverse Linked List
 */

// @lc code=start
// class ListNode {
//   val: number;
//   next: ListNode | null;
//   constructor(val?: number, next?: ListNode | null) {
//     this.val = val === undefined ? 0 : val;
//     this.next = next === undefined ? null : next;
//   }
// }

// カテゴリはstack

//////////////// 1
// 全部stackに突っ込むのはメモリ効率わるそうなので、順番に付け替えていく
// runtime beats 48%, memory beats 80%
// function reverseList(head: ListNode | null): ListNode | null {
//   // 3つの要素をみる
//   let prev = null;
//   let curr = head;
//   let post = head?.next;

//   while (curr != null) {
//     // 以下のようにひっくり返す
//     //       curr->next
//     // prev<-curr
//     curr.next = prev;

//     prev = curr;
//     curr = post;
//     post = post?.next;
//   }

//   return prev;
// }

//////////////// 2
// ナイーブにstackに突っ込む方法も書いてみる
// runtime beats 37%, memory beats 49%
// やっぱ1の方がパフォーマンスはよさそう

// 普段の業務でforとかwhileとか使わないけど、
// 繰り上げる処理や離脱判定がシンプルならforは特別な位置にそれをかけるから見通しがよい、ってくらいの違いか
function reverseList(head: ListNode | null): ListNode | null {
  const stack: ListNode[] = [];
  for (let curr = head; curr != null; curr = curr.next) {
    stack.push(curr);
  }

  let right = stack.pop();
  let left = stack.pop();

  const ret = right;

  while (right != undefined) {
    //       right->?
    // left<-right

    // ListNodeはundefinedとnullを区別するらしいので、leftがundefinedならnullを代入する
    right.next = left ?? null;

    right = left;
    left = stack.pop();
  }

  // リストが空の場合はnullを返す
  return ret ?? null;
}

// @lc code=end
