/*
 * @lc app=leetcode id=141 lang=typescript
 *
 * [141] Linked List Cycle
 */

// @lc code=start
/**
 * Definition for singly-linked list.
  class ListNode {
      val: number
      next: ListNode | null
      constructor(val?: number, next?: ListNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.next = (next===undefined ? null : next)
      }
  }
 */

// カテゴリはlinked list
// linked listの中に循環があるか

// 解法1
// nextを辿っていって、既出の要素がでてくる or nullになるのいずれかまで辿り続ける
// function hasCycle(head: ListNode | null): boolean {
//   // headがnullならただちに循環なしと言える
//   if (head === null) return false;

//   // 既出の要素はsetで保持する
//   const set = new Set();

//   let result: boolean | undefined;

//   let curr = head;
//   while (true) {
//     // いま着目している要素が既出だったらループしている
//     // 同一のオブジェクトである場合にtrueを返す
//     // （循環させる場合は同一のオブジェクトを使っているらしい）
//     if (set.has(curr)) {
//       result = true;
//       break;
//     }

//     // 既出リストに追加
//     set.add(curr);

//     // 次の要素がなければ循環なし
//     if (curr.next === null) {
//       result = false;
//       break;
//     }

//     curr = curr.next;
//   }

//   return result;
// }

// 解法2
// https://www.youtube.com/watch?v=kOhQ5bfpq2I
// 1つずつ遡るボインタと2つずつ遡るポインタを用意する
// 循環するなら同じアドレスを指すはず、とのこと
// たしかに手元で考えたら、追い抜いてしまうことはないので、追い抜いてそれぞれでぐるぐる周り続けることはないな。
// 解法1よりもポインタの数が増えるがsetの取り回しがないので計算量は時間/空間ともに優れる（大差はない）
function hasCycle(head: ListNode | null): boolean {
  // headがnullならただちに循環なしと言える
  if (head === null) return false;

  let result: boolean | undefined;

  let fast = head;
  let slow = head;

  while (true) {
    fast = fast.next?.next;
    slow = slow.next;

    // nextがnullになったら循環なし
    if (fast == null) {
      result = false;
      break;
    }

    // fast/slowが一致したら循環あり
    if (fast === slow) {
      result = true;
      break;
    }
  }

  return result;
}

// @lc code=end
