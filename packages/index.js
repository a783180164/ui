// This file is auto gererated by build/build-entry.js
import Button from './button/index'
import Switch from './switch/index'
import Radio from './radio/index'
import RadioGroup from './radio-group/index'
import Icon from './icon/index'
import Toast from './toast/index'
import Loading from './loading'
import Dialog from './dialog'
import Cell from './cell'
import CellGroup from './cell-group'
import Field from './field'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'
import Popup from './popup'
import PasswordInput from './password-input'
import NumberKeyBoard from './number-key-board'
import Tab from './tab'
import Tabs from './tabs'
import PullRefresh from './pull-refresh'
import NoticeBar from './notice-bar'
import List from './list'

const version = '1.0.0'
const components = [
  Button,
  Switch,
  Radio,
  RadioGroup,
  Icon,
  Toast,
  Loading,
  Dialog,
  Cell,
  CellGroup,
  Field,
  Collapse,
  CollapseItem,
  Checkbox,
  CheckboxGroup,
  Popup,
  PasswordInput,
  NumberKeyBoard,
  Tab,
  Tabs,
  PullRefresh,
  NoticeBar,
  List
]

const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  version,
  Button,
  Switch,
  Radio,
  RadioGroup,
  Icon,
  Toast,
  Loading,
  Dialog,
  Cell,
  CellGroup,
  Field,
  Collapse,
  CollapseItem,
  Checkbox,
  CheckboxGroup,
  Popup,
  PasswordInput,
  NumberKeyBoard,
  Tab,
  Tabs,
  PullRefresh,
  NoticeBar,
  List
}

export default {
  install,
  version
}
