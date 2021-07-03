const jsx = (
  <div id="a1">
    <div id="b1">
      <div id="c1"></div>
      <div id="c2"></div>
    </div>
    <div id="b2"></div>
  </div>
);

const container = document.getElementById("root");

// RootFiber 根元素的Fiber对象
// 根元素提前定义
const workInProgressRoot = {
  // 根节点DOM对象
  stateNode: container,
  props: {
    children: [jsx],
  },
};

// 下一个要执行的任务单元
// 默认为根RootFiber
let nextUnitOfWork = workInProgressRoot;

const workLoop = (deadline) => {
  // 执行第一阶段，构建Fiber
  // 空余时间 && 有要执行的任务
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    // 返回第一个子级Fiber 等待下一次执行
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 所有任务执行完成
  if (!nextUnitOfWork) {
    // 进入第二阶段 执行DOM
    commitRoot();
  }
};

const performUnitOfWork = (workInProgressFiber) => {
  // 从上向下走，a1 -> b1 -> c1，同时构建了c2，b2的Fiber（没有构建b2，c2的子集）
  beginWork(workInProgressFiber);

  if (workInProgressFiber.child) {
    return workInProgressFiber.child;
  }
  // 从下往上走，构建同级节点的子级Fiber（如果有）
  // 正在构建的是C1节点的Fiber
  while (workInProgressFiber) {
    // 构建Fiber链表
    completeUnitOfWork(workInProgressFiber);
    // 有同级返回构建同级的子级Fiber
    if (workInProgressFiber.sibling) {
      return workInProgressFiber.sibling;
    }
    workInProgressFiber = workInProgressFiber.return;
  }
};

const completeUnitOfWork = (workInProgressFiber) => {
  // 构建Fiber链表，即需要进行DOM构建的节点顺序
  // nextEffect：链表的下一项
  // lastEffect：指向链的尾部
  const reuturnFiber = workInProgressFiber.return;
  if (reuturnFiber) {
    // 跳过不需要DOM操作的Fiber
    if (workInProgressFiber.effectTag) {
      if (!reuturnFiber.lastEffect) {
        reuturnFiber.lastEffect = workInProgressFiber.lastEffect;
      }

      if (!reuturnFiber.firstEffect) {
        // 向上传递存储链表，直至RootFiber
        reuturnFiber.firstEffect = workInProgressFiber.firstEffect;
      }

      if (reuturnFiber.lastEffect) {
        // 添加 nextEffect
        reuturnFiber.lastEffect.nextEffect = workInProgressFiber;
      } else {
        // 存储链表
        reuturnFiber.firstEffect = workInProgressFiber;
      }
      reuturnFiber.lastEffect = workInProgressFiber;
    }
  }
};

const beginWork = (workInProgressFiber) => {
  // 创建DOM对象 并储存为 stateNode 属性
  if (!workInProgressFiber.stateNode) {
    workInProgressFiber.stateNode = document.createElement(workInProgressFiber.type);
  }
  for (let attr in workInProgressFiber.props) {
    if (attr !== "children") {
      workInProgressFiber.stateNode[attr] = workInProgressFiber.props[attr];
    }
  }
  // 构建当前 Fiber 的子级 Fiber
  if (Array.isArray(workInProgressFiber.props.children)) {
    let previousFiber = null;
    workInProgressFiber.props.children.forEach((child, index) => {
      // child 为 子级的VDOM
      let childFiber = {
        type: child.type,
        props: child.props,
        // Fiber要进行的DOM操作
        // PLACEMENT 代表新增
        effectTag: "PLACEMENT",
        // 指向自己的父级 Fiber 对象
        return: workInProgressFiber,
        // 指向自己的第一个子级 Fiber 对象
        child: null,
        // 指向自己的下一个兄弟 Fiber 对象
        sibling: null,
      };

      // 代表第一个子级
      if (index === 0) {
        // 为父级添加子级child Fiber
        workInProgressFiber.child = childFiber;
      } else {
        previousFiber.sibling = childFiber;
      }
      previousFiber = childFiber;
    });
  }
};

const commitRoot = () => {
  let currentFiber = workInProgressRoot.firstEffect;
  while (currentFiber) {
    currentFiber.return.stateNode.appendChild(currentFiber.stateNode);
    currentFiber = currentFiber.nextEffect;
  }
};

// 在浏览器空闲的时候执行任务
requestIdleCallback(workLoop);

console.log(workInProgressRoot);
