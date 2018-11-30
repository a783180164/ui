<template>
  <transition name="lnzi-fade">
    <div
      v-show="value"
      :class="createClass([
        cType,
        position
      ])"
    >
      <div v-if="cType === 'text'">{{ message }}</div>
      <div v-if="cType === 'html'" v-html="message"></div>

      <template v-if="cType === 'default'">
        <lnzi-loading v-if="type === 'loading'" color="white" :type="loadingType"></lnzi-loading>
        <div :class="createClass('message')">{{ message }}</div>
      </template>
    </div>
  </transition>
</template>

<script>
import create from '../utils/create'
import modal from '../modal/index'
import lnziLoading from '../loading/index'

const DEFAULT_TYPE = ['success', 'fail', 'loading']

export default create({
  name: 'toast',
  mixins: [modal],
  components: {
    lnziLoading
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    mask: {
      type: Boolean,
      default: false
    },
    loadingType: {
      type: String,
      default: 'circular'
    },
    message: String,
    position: {
      type: String,
      default: 'middle'
    },
    isShow: Boolean
  },
  computed: {
    cType () {
      return DEFAULT_TYPE.includes(this.type) ? 'default' : this.type
    }
  }
})
</script>
