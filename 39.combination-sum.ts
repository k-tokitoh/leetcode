/*
 * @lc app=leetcode id=39 lang=typescript
 *
 * [39] Combination Sum
 */

// カテゴリはgreedy+backtracking

// 全ての組み合わせを探索する、なのでbacktracking
// ちなみにbacktrackingは行きつ戻りつしながら探索するからその名前がついている

// runtime: beats 74%
// memory: beats 60%

// @lc code=start
function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  // その時点での組み合わせも再帰関数の外で管理する
  const cur: number[] = [];

  // 答えになる候補やその時点での組み合わせは、引数/戻り値で管理してもいいが、少し書きにくい&メモリを節約したいので、
  // それぞれの関数呼び出しから再帰関数の外の変数を操作する形にする。
  const dfs = (left: number, minCandidateIndex: number): void => {
    // 候補の数字それぞれについて
    for (let i = minCandidateIndex; i < candidates.length; i++) {
      const c = candidates[i];

      // 現在の組み合わせに試しに追加してみる
      cur.push(c);

      if (left - c === 0) {
        // 足すとぴったりなら、答えに追加する
        result.push([...cur]);
      } else if (0 < left - c) {
        // 足して足りないなら、続きで成り立つかを調べる
        // より小さい数字を候補としてしまうと、[2,3]と[3,2]を重複して数えてしまうので、組み合わせに登場する値は広義の単調増加とする
        // 候補範囲を配列で管理するといちいちオブジェクトが必要になってしまうので、indexで管理する
        dfs(left - c, i);
      }
      cur.pop();
    }
  };

  candidates.sort();
  dfs(target, 0);
  return result;
}
// @lc code=end
