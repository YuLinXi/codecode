/**
 * @author: yulinxi
 *
 * 题目：
 * JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多n个。
 * 完善下面代码中的Scheduler类，使得以下程序能正确输出。
 *
 * class Scheduler {
 *     add(promiseCreator) { ... }
 * }
 *
 * const timeout = (time) => new Promise(resolve => {
 *     setTimeout(resolve, time);
 * })
 *
 * const scheduler = new Scheduler(n);
 * const addTask = (time, order) => {
 *     scheduler.add(() => timeout(time)).then(() => console.log(order);
 * }
 *
 * addTask(1000, '1')
 * addTask(500, '2')
 * addTask(300, '3')
 * addTask(400, '4')
 *
 * // output：2 3 1 4
 * // 一开始，1、2两个任务进入队列
 * // 500ms时，2完成，输出2，任务队列3进入
 * // 800ms时，3完成, 输出3，任务队列4进入
 * // 1000ms时，1完成，输出1
 *
 * @date: 2021/1/18 1:45 下午
 */

/**
 * 代码实现：
 */

class Scheduler {
  constructor(count) {
    this.count = count;
    this.inProgressCount = 0;
    this.watingQueue = [];
  }

  add(promiseCreator) {
    return new Promise(async (resolve) => {
      this.execute(promiseCreator, resolve);
    });
  }

  async execute(promiseCreator, resolve) {
    if (this.inProgressCount >= this.count) {
      promiseCreator._resolve = resolve;
      this.watingQueue.push(promiseCreator);
    } else {
      this.inProgressCount++;
      await promiseCreator();
      resolve();
      this.inProgressCount--;
      if (this.watingQueue.length) {
        const nextTask = this.watingQueue.shift();
        this.execute(nextTask, nextTask._resolve);
      }
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler(2);

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
