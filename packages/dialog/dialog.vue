<template>
  <transition name="lnzi-dialog-bounce">
    <div v-show="value" :class="[createClass([type]), className]">
      <div
        v-if="title"
        :class="createClass(
          'header',
          {
            'lnzi-common--bg': type === 'spacial'
          }
        )"
        v-text="title"
      >
      </div>
      <div v-if="message || $slots.default" :class="createClass('content')">
        <slot>
          <div v-if="message" v-html="message" :class="createClass('message', {'has-title': title})"></div>
        </slot>
      </div>
      <div
        class="lnzi-hairline--top"
        :class="createClass(
          'footer',
          {
            'buttons': showComfirmButton && showCancelButton
          }
        )"
      >
        <lnzi-button
          v-show="showComfirmButton"
          size="large"
          type="plain"
          :class="createClass('confirm')"
          @click="onClick('confirm')"
        >
          {{confirmButtonText}}
        </lnzi-button>
        <lnzi-button
          v-show="showCancelButton"
          size="large"
          type="plain"
          :class="createClass('cancel')"
          @click="onClick('cancel')"
        >
          {{cancelButtonText}}
        </lnzi-button>
      </div>
    </div>
  </transition>
</template>

<script>
import create from '../utils/create'
import LnziButton from '../button/index'
import Modal from '../modal/index.js'

export default create({
  name: 'dialog',
  mixins: [Modal],
  components: {
    LnziButton
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    title: String,
    message: String,
    className: [String, Object, Array],
    showComfirmButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: false
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    beforeClose: Function,
    mask: {
      type: Boolean,
      default: true
    },
    closeOnClickMask: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick (type) {
      if (this.beforeClose) {
        this.beforeClose(type, state => {
          if (state !== false) {
            this.onClose(type)
          }
        })
      } else {
        this.onClose(type)
      }
    },
    onClose (type) {
      this.$emit('input', false)
      this.$emit(type)
      this.callback && this.callback(type)
    }
  }
})
</script>
