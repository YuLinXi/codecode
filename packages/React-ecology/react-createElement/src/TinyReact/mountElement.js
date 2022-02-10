import mountNativeElement from './mountNativeElement';
import mountComponent from './mountComponent';
import { isComponent } from './utils';

export default function mountElement(virtualDOM, container, oldDOM) {
  if (isComponent(virtualDOM)) {
    mountComponent(virtualDOM, container, oldDOM)
  } else {
    mountNativeElement(virtualDOM, container, oldDOM)
  }
}