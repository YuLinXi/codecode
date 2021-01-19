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
        this._events = new Map();
    }
    on(event, handler) {
        const handlers = this._events.get(event) || [];
        handlers.push(handler);
        this._events.set(event, handlers);
    }
    off(event, handler) {
        const handlers = this._events.get(event);
        const findIndex = handlers.findIndex(item => item === handler);
        if (findIndex > -1) {
            handlers.splice(findIndex, 1)
            this._events.set(handlers);
        }
    }
    once(event, handler) {
        handler.__EVENT_ONCE = true;
        this.on(event, handler);
    }
    emit(event) {
        const handlers = this._events.get(event);
        for (const handler of handlers) {
            handler.bind(this)();
            if (handler.__EVENT_ONCE) {
                this.off(event, handler);
            }
        }
    }
}

const emitter = new EventEmitter();

function handler() {
    console.log('执行了', this)
}

function handler2() {
    console.log('执行了2', this)
}

emitter.once('click', handler);
emitter.on('click', handler2);
emitter.off('click', handler);
emitter.once('click2', handler);
emitter.emit('click2');
setTimeout(() => {
    emitter.off('click', handler);
}, 1000)
setTimeout(() => {
    emitter.emit('click');
    emitter.emit('click2');
}, 2000)

