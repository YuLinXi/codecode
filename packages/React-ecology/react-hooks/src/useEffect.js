import shares from "./utils/share";

let prevDepsArr = [];

const useEffect = (callback, depsArr) => {
  if (Object.prototype.toString.call(callback) !== "[object Function]") {
    throw new Error("useEffect第一个参数必须是函数");
  }
  if (typeof depsArr === "undefined") {
    callback();
  } else if (Array.isArray(depsArr)) {
    let prevDeps = prevDepsArr[shares.effectIndex];
    if (!prevDeps) {
      callback();
    } else if (!depsArr.every((dep, index) => dep === prevDeps[index])) {
      callback();
    }
    prevDepsArr[shares.effectIndex] = depsArr;
    shares.effectIndex++;
  } else {
    throw new Error("useEffect第二个参数必须是数组");
  }
};

export default useEffect;
