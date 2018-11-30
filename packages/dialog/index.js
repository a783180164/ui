import Vue from 'vue'
import VueDialog from './dialog'

let dialog

const defaultOptions = {
  value: true,
  title: '',
  type: 'default',
  message: '',
  className: '',
  beforeClose: null,
  showComfirmButton: true,
  showCancelButton: false,
  confirmButtonText: '完成',
  cancleButtonText: '取消',
  mask: true,
  closeOnClickMask: false,
  callback: action => {
    dialog[action === 'cancel' ? 'reject' : 'resolve'](action)
  }
}

let currentOptions = {...defaultOptions}

const createDialog = () => {
  dialog = new (Vue.extend(VueDialog))({
    el: document.createElement('div')
  })

  dialog.$on('input', value => {
    dialog.value = value
  })

  document.body.appendChild(dialog.$el)
}

function Dialog (options = {}) {
  return new Promise((resolve, reject) => {
    !dialog && (createDialog())
    Object.assign(dialog, {
      resolve,
      reject,
      ...options
    })
  })
}

Dialog.alert = options => Dialog({
  ...currentOptions,
  ...options
})

Dialog.confirm = options => Dialog({
  ...currentOptions,
  ...options,
  showCancelButton: true
})

Dialog.setDefaultOptions = options => {
  Object.assign(currentOptions, options)
}

Dialog.resetDefaultOptions = options => {
  currentOptions = {...defaultOptions}
}

Dialog.close = () => {
  dialog && (dialog.value = false)
}

Dialog.install = () => {
  Vue.use(VueDialog)
}

Vue.prototype.$dialog = Dialog

export default Dialog
