import useState from "./useState";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>添加</button>
    </div>
  );
};

export default App;
