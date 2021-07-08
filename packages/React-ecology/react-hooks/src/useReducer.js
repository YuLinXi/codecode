import useState from "./useState";

const useReducer = (reducer, initialState) => {
  const [state, setState] = useState(initialState);
  const dispatch = (action) => {
    setState(reducer(state, action));
  };
  return [state, dispatch];
};

export default useReducer;
