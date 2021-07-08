import useState from "./useState";
import useEffect from "./useEffect";
import useReducer from "./useReducer";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + action.payload };
    default:
  }
  return state;
};

const initialState = {
  count: 0,
};

const App = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [state2, dispatch2] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log("执行1111");
  }, [count]);
  useEffect(() => {
    console.log("执行2222");
  }, [count2]);
  return (
    <>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>添加</button>
      </div>
      <div>
        {count2}
        <button onClick={() => setCount2(count2 + 1)}>添加2</button>
      </div>
      <div>
        {state.count}
        <button onClick={() => dispatch({ type: "increment", payload: 1 })}>添加3</button>
      </div>
      <div>
        {state2.count}
        <button onClick={() => dispatch2({ type: "increment", payload: 1 })}>添加4</button>
      </div>
    </>
  );
};

export default App;
