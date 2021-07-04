import { createStore } from './redux.js';
  
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
}
const store = createStore(reducer, 1);

document.getElementById("btn").addEventListener('click', () => {
  store.dispatch({ type: 'increment' });
  console.log(store.getState())
})