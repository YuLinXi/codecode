/**
 * @author: yulinxi
 *
 * @date: 2021/1/18 1:45 下午
 *
 * 实现一个因式分解函数Factoring，返回数组
 */


function factoring(value) {
    if (value <= 2) return [];
    const rest = [];
    let i = 2;
    do {
        if (value % i === 0) {
            rest.push(i);
            value = value / i;
            i = 2;
        } else {
            i++
        }
    } while (i < value)
    if (rest.length) {
        rest.push(value);
    }
    return rest;
}

console.log(factoring(100));