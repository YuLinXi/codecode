import { isSameComponent } from './utils'
import mountElement from './mountElement'
import updateComponent from './updateComponent'

export default function diffComponent(virtualDOM, container, oldDOM, oldComponent) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    updateComponent(virtualDOM, container, oldDOM, oldComponent)
  } else {
    mountElement(virtualDOM, container, oldDOM)
  }
}