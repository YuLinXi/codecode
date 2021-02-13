/**
 * 实现一个柯里化函数
 * @author: yulinxi
 * @date: 2021/1/29 10:24 下午
 */

function Curry(fn) {
    return function CurryFn(...args) {
        if (fn.length === args.length) return fn(...args);
        return function () {
            return CurryFn(...args.concat(Array.from(arguments)));
        }
    }
}

function test(a, b, c) {
    console.log(a + b + c);
}

const curTest = Curry(test);

const fn1 = curTest(1);
const fn2 = fn1(2);
fn2(3);