/**
 * @author: yulinxi
 *
 * @date: 2021/1/18 10:30 下午
 *
 * 实现发布订阅模式EventEmitter类，实现on、emit、off、once
 *
 * class EventEmitter {
 *     on() {}
 *     off() {}
 *     once() {}
 *     emit() {}
 * }
 */


class EventEmitter {
    constructor(props) {

    }
    on(event, handler) {

    }
    off(event, handler) {

    }
    once(event, handler) {

    }
    emit(event) {

    }
}

const emitter = new EventEmitter();

function handler() {
    console.log('执行了')
}


function handler2() {
    console.log('执行了2')
}

emitter.on('click', handler);
emitter.once('click2', handler);
emitter.emit('click');
emitter.emit('click2');
setTimeout(() => {
    emitter.off('click', handler);
}, 1000)
setTimeout(() => {
    emitter.emit('click');
    emitter.emit('click2');
}, 2000)

