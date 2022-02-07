/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 */

// @lc code=start
function maxSlidingWindow(nums, k) {
  if (k <= 1) {
    return nums;
  }
  const result = [];
  const deque = [];
  deque.push(nums[0]);
  let i = 1;
  for (; i < k; i++) {
    while (deque.length && nums[i] > deque[deque.length - 1]) {
      deque.pop();
    }
    deque.push(nums[i]);
  }
  result.push(deque[0]);
  for (; i < nums.length; i++) {
    while (deque.length && nums[i] > deque[deque.length - 1]) {
      deque.pop();
    }
    deque.push(nums[i]);
    if (deque[0] === nums[i - k]) {
      deque.shift()
    }
    result.push(deque[0]);
  }

  return result;
};
// @lc code=end


