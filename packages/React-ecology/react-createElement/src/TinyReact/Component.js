import diff from "./diff";

export default class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }
  setState(state) {
    this.state = Object.assign({}, this.state, state);
    let newVirtualDOM = this.render();
    let oldDOM = this.getDOM();
    diff(newVirtualDOM, oldDOM.parentNode, oldDOM);
  }
  componentWillMount() { }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }
  componentWillUpdate(nextProps, nextState) { }
  componentDidUpdate(preProps, preState) { }
  componentWillUnmount() { }
  setDOM(dom) {
    this._dom = dom;
  }
  getDOM() {
    return this._dom;
  }
  updateProps(props) {
    this.props = props;
  }
}