/**
 * 斐波那契数，通常用 F(n) 表示，形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
 * F(0) = 0，F(1) = 1
 * F(n) = F(n - 1) + F(n - 2)，其中 n > 1
 * 给你 n ，请计算 F(n) 。
 *
 * @author: yulinxi
 * @date: 2021/2/13 3:30 下午
 */

/**
 * 暴力递归解法
 */

function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fib(n - 1) + fib(n - 2);
}
console.time("fib");
console.log(fib(20));
console.timeEnd("fib");

/**
 * 带备忘录的递归解法
 */

function fib2(n) {
  const mem = {};
  return helper(mem, n);
}

function helper(mem, n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (typeof mem[n] !== "undefined") return mem[n];
  mem[n] = helper(mem, n - 1) + helper(mem, n - 2);
  return mem[n];
}
console.time("fib2");
console.log(fib2(20));
console.timeEnd("fib2");

/**
 * DP table 数组的迭代解法，
 */

function fib3(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  const dp = {};
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

console.time("fib3");
console.log(fib3(20));
console.timeEnd("fib3");

/**
 * DP table 数组的迭代解法，
 * 空间复杂度优化，降为 O(1)
 */

function fib4(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  let pre = 0;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    const sum = pre + curr;
    pre = curr;
    curr = sum;
  }
  return curr;
}

console.time("fib4");
console.log(fib4(20));
console.timeEnd("fib4");
