/**
 * 给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成
 * @author: yulinxi
 * @date: 2021/1/22 10:25 上午
 */

// 获取去重后数组的长度，
// 不对数据进行处理
function withoutRepeatLength(nums) {
  let i = 0;
  // 慢指针
  let len = nums.length;
  // 快指针
  for (let j = 0; j < len; j++) {
    // 如果不相等则慢指针向后移一位
    // 并且交换两个指针所在位的数据
    if (nums[i] !== nums[j]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}

const array1 = [1, 2, 3, 3, 4, 4, 5, 6, 7, 9, 9, 10];

console.log(withoutRepeatLength(array1));

// 在原数组引用上进行去重操作
function withoutRepeatArray(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1]) {
      nums.splice(i, 1);
      i--;
    }
  }
}

const array2 = [1, 2, 3, 3, 4, 4, 5, 6, 7, 9, 9, 10];
withoutRepeatArray(array2);

console.log(array2);
