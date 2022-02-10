import createDOMElement from './createDOMElement'
import { unmountNode } from './utils'

export default function mountNativeElement(virtualDOM, container, oldDOM) {
  if (oldDOM) {
    unmountNode(oldDOM)
  }
  let newElement = createDOMElement(virtualDOM)
  container.appendChild(newElement);

  let component = virtualDOM.component;
  if (component) {
    component.setDOM(newElement)
  }
}