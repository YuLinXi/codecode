

export const createStore = (reducer, preloadedState, enhancer) => {
  if (enhancer) {
    return enhancer(createStore)(reducer, preloadedState);
  }
  let currentState = preloadedState;
  let currentListeners = [];
  const getState = () => { return currentState };
  const dispatch = (action) => {
    currentState = reducer(currentState, action);
    currentListeners.forEach((listener) => {
      listener(currentState);
    })
  }
  const subscribe = (listener) => {
    currentListeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}

export const applyMiddleware = (...middlewares) => (createStore) => (reducer, preloadedState) => {
  const store = createStore(reducer, preloadedState);
  const middlewareAPI = {
    getState: store.getState,
    dispatch: store.dispatch,
  }
  const chain = middlewares.map(middleware => middleware(middlewareAPI));
  const dispatch = compose(...chain)(middlewareAPI.dispatch);
  return {
    ...store,
    dispatch
  }
}

export const compose = (...funs) => (dispatch) => {
  for (let i = funs.length - 1; i >= 0; i--) {
    dispatch = funs[i](dispatch);
  }
  return dispatch;
}