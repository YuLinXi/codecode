/**
 * @author: yulinxi
 * 实现一个QuickSort函数
 * @date: 2021/1/19 8:01 下午
 */

function quickSort(arr) {
    if(arr.length <= 1) { return arr;}
    const left = [];
    const right = [];
    const mid = arr[0];
    for(let i = 1; i < arr.length; i+=1) {
        if(arr[i] < mid) {
            left.push(arr[i]);
        }else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), mid, ...quickSort(right)];
}

const arr = [12, 2, 56, 2,1 ,9,22,11,3,99];

console.log(quickSort(arr));