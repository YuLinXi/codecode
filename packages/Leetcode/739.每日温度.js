/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 */

// @lc code=start
// 数据结构 - 单调栈
function dailyTemperatures(T) {
  let stack = [0];
  let i = 1;
  const rest = new Array(T.length).fill(0)
  while (i < T.length) {
    let tem = T[i];
    while (stack.length && tem > T[stack[stack.length - 1]]) {
      let index = stack.pop();
      rest[index] = i - index;
    }
    stack.push(i);
    i++;
  }
  return rest;
};
// @lc code=end

