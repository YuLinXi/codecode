import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// let state = [];
// let setters = [];
// let stateIndex = 0;

// const createSetter = (index) => {
//   console.log(index, "缓存");
//   return (newState) => {
//     console.log(index, "执行拿到");
//     state[index] = newState;
//     render();
//   };
// };

// const useState = (initialState) => {
//   state[stateIndex] = typeof state[stateIndex] !== "undefined" ? state[stateIndex] : initialState;
//   setters[stateIndex] =
//     typeof setters[stateIndex] !== "undefined" ? setters[stateIndex] : createSetter(stateIndex);
//   let value = state[stateIndex];
//   let setter = setters[stateIndex];
//   stateIndex++;
//   return [value, setter];
// };

// const render = () => {
//   stateIndex = 0;
//   ReactDOM.render(<App />, document.getElementById("root"));
// };

let state = [];
let setters = [];
let stateIndex = 0;

function createSetter(index) {
  return function (newState) {
    state[index] = newState;
    render();
  };
}

function useState(initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState;
  setters.push(createSetter(stateIndex));
  let value = state[stateIndex];
  let setter = setters[stateIndex];
  stateIndex++;
  return [value, setter];
}

function render() {
  stateIndex = 0;
  ReactDOM.render(<App />, document.getElementById("root"));
}

export default useState;
