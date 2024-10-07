/*
 * @lc app=leetcode id=779 lang=typescript
 *
 * [779] K-th Symbol in Grammar
 */

// カテゴリは再帰

// 0/1なので配列でよさそう
// 再帰していく向き、nから小さくなっていくでいいか

// 都度配列を返していくとheap out of memory
// 2^30は乗り切らないか

// 全体じゃなくて、興味があるところだけ追いかければいいかも？ -> できた

// runtime: beats 71%
// memory: beats 85%

// @lc code=start
function kthGrammar(n: number, k: number): number {
  // n行k列を返す関数
  const f = (n: number, k: number): number => {
    // 1行目ならどうしたって0が返る
    if (n === 1) return 0;

    // 1行前の、n行k列を決定づける位置の値を取得する
    const prev = f(n - 1, Math.ceil(k / 2));
    // その値に応じてn行k列の値を求める
    if (prev === 0) {
      return k % 2 === 0 ? 1 : 0;
    } else {
      return k % 2 === 0 ? 0 : 1;
    }
  };

  return f(n, k);
}
// @lc code=end
