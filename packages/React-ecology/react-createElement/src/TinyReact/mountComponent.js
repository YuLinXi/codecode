import { isFunctionComponent, isComponent } from './utils'
import mountNativeElement from './mountNativeElement'

export default function mountComponent(virtualDOM, container, oldDOM) {
  let nextVirtualDOM = null;
  let component = null;
  if (isFunctionComponent(virtualDOM)) {
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    nextVirtualDOM = buildClassComponent(virtualDOM)
    component = nextVirtualDOM.component;
  }
  if (isComponent(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container)
  } else {
    mountNativeElement(nextVirtualDOM, container, oldDOM)
  }
  if (component) {
    if (component.props && component.props.ref) {
      component.props.ref(component)
    }
    component.componentDidMount()
  }
}

function buildFunctionComponent(virtualDOM) {
  return virtualDOM.type && virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent(virtualDOM) {
  let component = new virtualDOM.type(virtualDOM.props || {});
  const nextVirtualDOM = component.render();
  nextVirtualDOM.component = component;
  return nextVirtualDOM;
}