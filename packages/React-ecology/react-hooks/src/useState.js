import render from "./utils/render";
import shares from "./utils/share";

let state = [];
let setters = [];

function createSetter(index) {
  return function (newState) {
    state[index] = newState;
    shares.stateIndex = 0;
    render();
  };
}

function useState(initialState) {
  state[shares.stateIndex] = state[shares.stateIndex] ? state[shares.stateIndex] : initialState;
  setters.push(createSetter(shares.stateIndex));
  let value = state[shares.stateIndex];
  let setter = setters[shares.stateIndex];
  shares.stateIndex++;
  return [value, setter];
}

export default useState;
