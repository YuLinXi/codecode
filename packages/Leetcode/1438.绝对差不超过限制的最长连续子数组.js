/*
 * @lc app=leetcode.cn id=1438 lang=javascript
 *
 * [1438] 绝对差不超过限制的最长连续子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function (nums, limit) {
  const n = nums.length;
  let left = 0, right = 0;
  let ret = 0;
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  while (right < n) {
    min = Math.min(min, nums[right]);
    max = Math.max(max, nums[right]);

    if (Math.abs(max - min) > limit) {
      left++;
      min = Number.MAX_VALUE;
      max = Number.MIN_VALUE;
      for (let i = left; i <= right; i++) {
        max = Math.max(max, nums[i])
        min = Math.min(min, nums[i])
      }
    }

    ret = Math.max(ret, right - left + 1);
    right++;
  }
  return ret;
};
// @lc code=end


longestSubarray([4, 2, 2, 2, 4, 4, 2, 2], 0);
