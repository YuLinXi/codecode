import mountElement from "./mountElement";
import updateTextNode from './updateTextNode'
import updateNodeElement from './updateNodeElement'
import createDOMElement from './createDOMElement'
import diffComponent from './diffComponent'
import { unmountNode } from './utils'

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
  if (!oldVirtualDOM) {
    mountElement(virtualDOM, container)
  } else if (oldVirtualDOM.type !== virtualDOM.type && typeof virtualDOM.type !== 'function') {
    const newElement = createDOMElement(virtualDOM);
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  } else if (typeof virtualDOM.type === 'function') {
    const oldComponent = oldVirtualDOM && oldVirtualDOM.component;
    diffComponent(virtualDOM, container, oldDOM, oldComponent)
  } else if (oldVirtualDOM.type === virtualDOM.type) {
    if (virtualDOM.type === 'text') {
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }
    virtualDOM.children.forEach((child, index) => {
      diff(child, oldDOM, oldDOM.childNodes[index])
    })

    let oldChildNodes = oldDOM.childNodes;
    if (oldChildNodes.length > virtualDOM.children.length) {
      for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        unmountNode(oldChildNodes[i])
      }
    }
  }
}
