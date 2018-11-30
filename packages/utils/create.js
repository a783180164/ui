/**
 * Create a component with common options
 */
import createClass from '../mixins/create-class'

const install = function (Vue) {
  Vue.component(this.name, this)
}

export default function (component) {
  component.name = 'lnzi-' + component.name
  component.install = component.install || install
  component.mixins = component.mixins || []
  component.mixins.push(createClass)

  return component
}
