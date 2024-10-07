/*
 * @lc app=leetcode id=22 lang=typescript
 *
 * [22] Generate Parentheses
 */

// @lc code=start

// カテゴリはgreedy+backtracking

// 開けたカッコは必ず閉じれるし、閉じれるなら閉じてその後困ることはないので、
// 各時点で開いたり閉じたり好きなことをすればいい
// 調べる手順をイメージすると、DFSでできそう

// backtrackingって聞いたことなかったけど、
// 全ての可能性をDFSで探索するみたいな話かな。まさにこの問題
// https://qiita.com/mk668a/items/7ad2a0ad3c3b3d856fff

// カッコを開いたり閉じたりするのはstack操作と対応づけられる
// けど今回は「既にどれくらいのカッコをつかったか」も知りたいので、stackの状態だけでは不十分

// runtime: 89%
// memory: 95%
function generateParenthesis(n: number): string[] {
  // const result: string[] = [];

  // 残っている`(`と`)`の数と、いま時点の文字列と、最終的な答えとなる文字列の集合を与えると、
  // 最終的な答えとなる文字列の集合に、新たな答えとする文字列を追加してくれる
  const dfs = (
    str: string,
    left: number,
    right: number,
    ans: string[]
  ): string[] => {
    // もしカッコをつかいきってたら、それが最終的な文字列なのでreturnする
    if (left === 0 && right === 0) {
      ans.push(str);
      return ans;
    }

    // もし開くカッコが追記できたら、開くカッコを追記する方を探索する
    if (0 < left) {
      ans = dfs(str + "(", left - 1, right, ans);
    }
    // もし閉じるカッコが追記できたら、閉じるカッコを追記する方を探索する
    if (left < right) {
      ans = dfs(str + ")", left, right - 1, ans);
    }
    return ans;
  };

  return dfs("", n, n, []);
}
// @lc code=end
