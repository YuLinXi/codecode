/**
 * 给定不同面额的硬币 coins 和一个总金额 amount。
 * 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。
 * 如果没有任何一种硬币组合能组成总金额，返回-1。
 * @param coins
 * @param amount
 * @returns {number|*}
 */

/**
 * dp 数组的迭代解法
 * @param coins
 * @param amount
 * @returns {number|*}
 */

function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let i = 0; i < dp.length; i++) {
    for (let coin of coins) {
      if (i - coin < 0) continue;
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }
  return dp[amount] === amount + 1 ? -1 : dp[amount];
}

console.log(coinChange([1, 2, 5], 11));
