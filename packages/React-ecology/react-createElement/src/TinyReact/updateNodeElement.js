export default function updateNodeElement(newElement, virtualDOM = {}, oldVirtualDOM = {}) {
  const newProps = virtualDOM.props || {};
  const oldProps = oldVirtualDOM.props || {}

  Object.keys(newProps).forEach(propName => {
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];
    if (oldPropsValue !== newPropsValue) {
      if (propName !== 'children') {
        if (propName.startsWith('on')) {
          const eventName = propName.toLowerCase().slice(2);
          newElement.addEventListener(eventName, newPropsValue);
          if (oldPropsValue) {
            newElement.removeEventListener(eventName, oldPropsValue);
          }
        } else if (propName === 'value' || propName === 'checked') {
          newElement[propName] = newPropsValue;
        } else {
          newElement.setAttribute(propName === 'className' ? 'class' : propName, newPropsValue)
        }
      }
    }
  })

  Object.keys(oldProps).forEach(propName => {
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];
    if (propName !== 'children') {
      if (!newPropsValue) {
        if (propName.startsWith('on')) {
          const eventName = propName.toLowerCase().slice(2);
          newElement.removeEventListener(eventName, oldPropsValue);
        } else if (propName === 'value' || propName === 'checked') {
          newElement[propName] = null;
        } else {
          newElement.removeAttribute(propName === 'className' ? 'class' : propName);
        }
      }
    }
  })
}