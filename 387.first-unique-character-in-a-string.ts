/*
 * @lc app=leetcode id=387 lang=typescript
 *
 * [387] First Unique Character in a String
 */

// @lc code=start
// カテゴリはhash map
function firstUniqChar(s: string): number {
  // hash mapで文字の出現回数をカウント O(n)
  // 文字のuniquenessなので文字をkeyにする必要があるが、最終的にindexがほしいので、indexの配列をvalueにする
  // mapはobjectと異なり順序が保証されているので使える
  const map = new Map<string, number>();
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) ?? 0) + 1);
  }

  let result: number | undefined;

  // mapをiterateする方が回数が少ないのでいいかと思ったが、entries()で配列を生成するのが重いのか、パフォーマンスが悪かった

  // 文字列をiterateして、出現回数が1の文字のindexを得てbreak O(n)
  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) {
      result = i;
      break;
    }
  }

  return result ?? -1;
}
// @lc code=end
