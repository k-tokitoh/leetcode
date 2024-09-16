/*
 * @lc app=leetcode id=929 lang=typescript
 *
 * [929] Unique Email Addresses
 */

// カテゴリはhash map
// setで管理すればOK

// @lc code=start
function numUniqueEmails(emails: string[]): number {
  const uniqueEmails = new Set<string>();
  emails.forEach((email, index) => {
    const [local, domain] = email.split("@");
    const localFiltered = local.replace(/\./g, "").split("+")[0];
    const fullEmail = `${localFiltered}@${domain}`;
    uniqueEmails.add(fullEmail);
  });

  return uniqueEmails.size;
}
// @lc code=end
