import TinyReact from "./TinyReact"

const root = document.getElementById("root")

const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h3>这个将会被删除</h3>
    <h3>这个将会被替换成新节点</h3>
    2, 3
    <input type="text" value="13" />
  </div>
)

const modifyDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test123">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段被修改过的内容</span>
    <button onClick={() => alert("你好！！！！")}>点击我</button>
    <h6>这个将会被替换成新节点</h6>
    2, 3
    <input type="text" />
  </div>
)

// TinyReact.render(virtualDOM, root)

// setTimeout(() => {
//   TinyReact.render(modifyDOM, root)
// }, 2000)

function Demo() {
  return <div>Demo</div>
}


function Header(props) {
  return <div>
    <div>header</div>
    {props.title}
    <Demo />
  </div>
}


TinyReact.render(<Header title="title" />, root)


// class Alert extends TinyReact.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "title"
//     }
//   }

//   handleClick = () => {
//     this.setState({ title: 'title2' })
//   }


//   render() {
//     return <div onClick={this.handleClick}>
//       {this.props.name}
//       {this.props.age}
//       Alert Component
//     </div>
//   }
// }

// let AlertVdom = <Alert />

// console.log(AlertVdom, 'Alert')

// class Good extends TinyReact.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "title"
//     }
//   }

//   handleClick = () => {
//     this.setState({ title: 'title2' })
//   }

//   componentDidMount() {
//     console.log('componentDidMount')
//     console.log(this.input)
//   }

//   render() {
//     return <div onClick={this.handleClick}>
//       {this.props.name}
//       {this.props.age}
//       Good Component
//       <input type="text" ref={input => this.input = input} />
//     </div>
//   }
// }

// TinyReact.render(<Alert name="张3" age="18" />, root);

// setTimeout(() => {
//   // TinyReact.render(<Alert name="张32" age="188" />, root);
//   TinyReact.render(<Good name="张4" age="20" />, root);
// }, 2000)