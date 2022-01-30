/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let i = 0;
  let j = 1;
  while (i < nums.length) {
    if (nums[i] + nums[j] === target) {
      return [i, j];
    } else {
      if (j === nums.length - 1) {
        i++;
        j = i + 1
      } else {
        j++;
      }
    }
  }
};
// @lc code=end

