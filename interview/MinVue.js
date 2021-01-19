
class Compiler {
    constructor(vm) {
        this.vm = vm;
        this.el = vm.$el;
        // 执行编译模函数
        this._compile(this.el);
    }

    _compile (el) {
        // 获取子节点
        let childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            if (this.isTextNode(node)) {
                // 如果是文件节点，执行compileText函数
                this.compileText(node);
            } else if (this.isElementNode(node)) {
                // 如果是元素节点，执行isElementNode函数
                this.compileElement(node)
            }
            if (node.childNodes && node.childNodes.length) {
                // 如果还有嵌套多层次的子节点，递归调用compile
                this._compile(node);
            }
        })
    }

    compileElement (node) {
        // 遍历元素节点的属性，找出v-text和v-model
        Array.from(node.attributes).forEach(attr => {
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
                // 如果包含指令，调用update方法
                attrName = attrName.substr(2);
                const key = attr.value;
                this.update(node, key, attrName);
            }
        })
    }

    compileText (node) {
        // 匹配差值{{ name }}，获取name
        const reg = /\{\{(.+?)\}\}/;
        const value = node.textContent;
        if (reg.test(value)) {
            const key = RegExp.$1.trim();
            node.textContent = value.replace(reg, this.vm[key], key);
            // 创建Watcher对象，订阅name值的变化
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue;
            })
        }
    }

    update (node, key, attrName) {
        // 获取指令对应的更新函数Updater
        const fn = this[`${attrName}Updater`];
        if (fn) {
            // 调用Updater函数，将Updater的this绑定为当前Watcher实例
            fn.call(this, node, this.vm[key], key);
            // 创建Watcher对象，订阅key值的变化，再次调用Updater更新函数
            new Watcher(this.vm, key, (newValue) => fn.call(this, node, newValue, key))
        }
    }

    textUpdater(node, value) {
        // 更新文本节点
        node.textContent = value;
    }

    modelUpdater(node, value, key) {
        // v-model对表单进行双向绑定
        node.value = value;
        node.addEventListener('input', () => {
            this.vm[key] = node.value
        })
    }

    isDirective (attrName) {
        return attrName.startsWith('v-')
    }

    isTextNode (node) {
        return node.nodeType === 3;
    }

    isElementNode (node) {
        return node.nodeType === 1;
    }
}

class Observer {
    // 接收$options.$data 对象
    constructor(data) {
        this.walk(data);
    }

    // 遍历data属性，分别调用defineReactive进行响应式绑定
    walk (data) {
        if (!data || typeof data !== 'object') return
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        })
    }

    // 接收第三个参数value，是为了避免使用obj[key]时触发getter/setter，导致死循环
    defineReactive (obj, key, value) {
        const self = this;
        // 初始化Dep
        let dep = new Dep();
        if (typeof value === 'object') {
            // 如果为深层次对象，则递归调用walk进行绑定
            this.walk(value);
            return
        }
        // 对属性进行getter/setter绑定
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get () {
                // from.1 依赖收集，当obj[key]值触发getter时，将Watcher添加到dep的subs队列中
                Dep.target && dep.addSub(Dep.target);
                return value
            },
            set (newValue) {
                if (newValue === value) return
                // 设置新值
                value = newValue;
                // 如果对值重新设置为对象，则需要重新进行walk进行响应式绑定
                self.walk(newValue);
                // 发送通知
                dep.notify();
            }
        })
    }
}

class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        // 将Dep.target设置成当前Watcher实例
        Dep.target = this;
        // 调用vm[key]，触发对应key值的getter，执行to.1，依赖收集
        this.oldValue = vm[key];
        // 清空target，避免重复使用
        Dep.target = null;
    }

    update () {
        const newValue = this.vm[this.key];
        if (this.oldValue === newValue) return ;
        // 触发更新回调
        this.cb(newValue);
    }
}

class Dep {
    constructor() {
        this.subs = [];
    }

    addSub (watcher) {
        if (watcher && watcher.update) {
            // 存储Watcher对象
            this.subs.push(watcher);
        }
    }

    notify () {
        this.subs.forEach(wather => wather.update());
    }
}

export default class Vue {
    constructor(options) {
        this.$options = options || {};
        this.$data = options.data || {};
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
        // 把data中的属性注入到Vue实例，转换成getter/setter，使得能通过this.xxx获得值
        this._proxyData(this.$data);
        // 调用observer监听data中所有属性的变化
        new Observer(this.$data);
        // 调用compiler解析指令/差值表达式，初始化渲染
        new Compiler(this);
    }

    _proxyData (data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                set (newValue) {
                    // 新旧值对比，相同则无需触发数据getter
                    if (newValue === data[key]) return
                    // 同步值到$options.$data[key]
                    data[key] = newValue;
                },
                get () {
                    return data[key]
                }
            })
        })
    }
}

window.vm = new Vue({
    el: '#app',
    data: {
        msg: 'Hello'
    }
})