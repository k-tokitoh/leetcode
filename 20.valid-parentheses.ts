/*
 * @lc app=leetcode id=20 lang=typescript
 *
 * [20] Valid Parentheses
 */

// カテゴリはstack

// @lc code=start
function isValid(s: string): boolean {
  // stackには開きかっこを入れる。閉じかっこがみつかったら対応する開きかっこをpopすうｒ
  const stack: string[] = [];

  const pairs = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  for (const char of s) {
    if (pairs[char] != undefined) {
      // 開くかっこならstackに追加
      stack.push(char);
    } else {
      // そうでなければ正しく閉じるかっこであるはず
      // 閉じるべき開きかっこがstackの末尾にあるはずなのでpopして...
      const last = stack.pop();
      // ちゃんと対応してなかったらNG
      if (pairs[last!] !== char) {
        return false;
      }
    }
  }

  // 開きっぱなしのかっこが残っている場合はNG
  return stack.length === 0;
}
// @lc code=end
