/*
 * @lc app=leetcode id=392 lang=typescript
 *
 * [392] Is Subsequence
 */

// @lc code=start
// カテゴリは「その他/総合問題」
// sがtの部分列かどうかを判定する
function isSubsequence(s: string, t: string): boolean {
  // sが空文字な場合は直ちにtrueを返す
  if (s.length === 0) {
    return true;
  }

  // sに関してカーソルを保持する
  let cursor = 0;
  let result: boolean | undefined;
  for (let i = 0; i < t.length; i++) {
    // sのカーソルが当たった文字とtの文字が一致した場合、カーソルを進める
    if (s[cursor] === t[i]) {
      cursor++;
      // カーソルが進み切ったら部分列だと言えるのでtrueを返す
      if (cursor === s.length) {
        result = true;
        break;
      }
    }
  }

  return result ?? false;
}
// @lc code=end
