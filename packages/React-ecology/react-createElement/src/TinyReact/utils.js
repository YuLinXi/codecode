export function isComponent(virtualDOM) {
  return virtualDOM && typeof virtualDOM.type === 'function';
}

export function isFunctionComponent(virtualDOM) {
  const type = virtualDOM.type;
  return type && isComponent(virtualDOM) && !(type.prototype && type.prototype.render)
}

export function unmountNode(node) {
  const virtualDOM = node._virtualDOM;
  if (virtualDOM.component) {
    virtualDOM.component.componentWillUnmount();
  }
  node.remove();
}

export function isSameComponent(virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor;
}