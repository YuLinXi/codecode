/**
 * @author: yulinxi
 * 实现一个二分查找函数BinarySearch，数组中是有序的
 * @date: 2021/1/19 8:06 下午
 */

function BinarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let mid;
  let midValue;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    midValue = arr[mid];
    if (midValue > target) {
      right = mid - 1;
    } else if (midValue < target) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
}

const arr = [12, 2, 56, 2, 1, 9, 22, 11, 3];

console.log(BinarySearch(arr, 9));
