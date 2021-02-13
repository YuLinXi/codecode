/**
 * 实现一个函数组合函数
 * @author: yulinxi
 * @date: 2021/1/29 10:41 下午
 */

function Compose(...args) {
    return function ComposeFn(value) {
        return args.reverse().reduce((rest, fn) => {
            return fn(rest);
        }, value)
    }
}

function add(value) {
    return value + 1;
}

function times(value) {
    return value * 2;
}

function divider(value) {
    return value / 5;
}

const fn = Compose(divider, times, add);

console.log(fn(9));