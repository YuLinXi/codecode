import render from "./utils/render";
import shares from "./utils/share";

let preState = [];

const createDispatch = (index, reducer) => (action) => {
  const state = preState[index];
  const newState = reducer(state, action);
  console.log(newState);
  preState[index] = newState;
  render();
};

const useReducer = (reducer, initialState) => {
  const state = preState[shares.reducerIndex] ? preState[shares.reducerIndex] : initialState;
  preState[shares.reducerIndex] = state;
  const dispatch = createDispatch(shares.reducerIndex, reducer);
  shares.reducerIndex++;
  return [state, dispatch];
};

export default useReducer;
