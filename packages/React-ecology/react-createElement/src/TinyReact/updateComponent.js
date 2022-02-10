import diff from "./diff";

export default function updateComponent(virtualDOM, container, oldDOM, oldComponent) {
  const nextProps = virtualDOM.props;
  let preProps = oldComponent.props;
  oldComponent.componentWillReceiveProps(nextProps);
  if (oldComponent.componentShouldUpdate(nextProps)) {
    oldComponent.componentWillUpdate(nextProps);
    oldComponent.updateProps(nextProps);
    const nextVirtualDOM = oldComponent.render();
    nextVirtualDOM.component = oldComponent;
    diff(nextVirtualDOM, container, oldDOM);
    oldComponent.componentDidUpdate(preProps);
  }
}