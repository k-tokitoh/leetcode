/*
 * @lc app=leetcode id=46 lang=typescript
 *
 * [46] Permutations
 */

// カテゴリはgreedy+backtracking

// runtime: beats 56%
// memory: beats 77%

// @lc code=start
function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const cur: number[] = [];
  const candidateAvailable = Object.fromEntries(nums.map((n) => [n, true]));

  // いま時点の配列と、残っている要素を与えると、結果に全部列挙してくれる
  // 最終的な答え/現在の順列/残り利用可能な値、は引数/戻り値で取り回すのが書きにくい/メモリ効率もわるそうなので、再帰関数外の値を操作する形にする
  const dfs = (): void => {
    // もし並べ切っていたら結果を追加してreturn
    if (cur.length === nums.length) {
      result.push([...cur]);
      return;
    }

    for (const c of nums) {
      if (!candidateAvailable[c]) continue;

      // この文字はつかえないよ、としつつ
      candidateAvailable[c] = false;
      // 現在の順列に追加したうえで
      cur.push(c);
      // 続きを探索する
      dfs();

      // 続きを探索し終えたら、この文字を利用可能に復活させつつ
      candidateAvailable[c] = true;
      // 現在の順列から取り除く
      cur.pop();
    }
  };

  dfs();
  return result;
}
// @lc code=end
