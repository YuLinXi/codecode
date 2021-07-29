// 节点
class Node {
  constructor(element, next) {
    this.next = next;
    this.element = element;
  }
}

// 单向链表
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  _getNode(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("越界了");
    }
    let curNode = this.head;
    while (index > 0) {
      curNode = curNode.next;
      index--;
    }
    return curNode;
  }

  add(index, element) {
    if (arguments.length === 1) {
      element = index;
      index = this.size;
    }
    if (index < 0 || index > this.size) {
      throw new Error("越界了");
    }
    if (index === 0) {
      this.head = new Node(element, this.head);
    } else {
      let preNode = this._getNode(index - 1);
      preNode.next = new Node(element, preNode.next);
    }
    this.size++;
  }

  remove(index) {
    let rmNode = this._getNode(index);
    if (index === 0) {
      this.head = rmNode.next;
    } else {
      let preNode = this._getNode(index - 1);
      preNode.next = rmNode.next;
    }
    this.size--;
    return rmNode;
  }

  set(index, element) {
    const curNode = this._getNode(index);
    curNode.element = element;
    return curNode;
  }

  get(index) {
    return _getNode(index);
  }

  clear() {
    this.head = null;
    this.size = 0;
  }
}

// 队列
class Queue {
  constructor() {
    this.LinkedList = new LinkedList();
  }
  enQueue(element) {
    this.LinkedList.add(element);
  }
  deQueue() {
    return this.LinkedList.remove(0);
  }
}

module.exports = Queue;
