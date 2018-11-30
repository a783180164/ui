<template>
  <div :class="createClass()">
    <slot></slot>
    <div v-show="loading" :class="createClass('loading')">
      <slot name="loading">
        <lnzi-loading></lnzi-loading>
        <span :class="createClass('loading-text')">{{ loadingText }}</span>
      </slot>
    </div>
  </div>
</template>

<script>
import create from '../utils/create'
import lnziLoading from '../loading/index'
import { on, off } from '../utils/event'
import utils from '../utils/scroll'

export default create({
  name: 'list',
  components: {
    lnziLoading
  },
  model: {
    prop: 'loading'
  },
  props: {
    loading: Boolean,
    finished: Boolean,
    immediateCheck: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 300
    },
    loadingText: {
      type: String,
      default: '加载中...'
    }
  },
  mounted () {
    this.scroller = utils.getScrollEventTarget(this.$el)
    this.handler(true)
    if (this.immediateCheck) {
      this.$nextTick(this.check)
    }
  },
  destroyed () {
    this.handler(false)
  },
  activated () {
    this.handler(true)
  },
  deactivated () {
    this.handler(false)
  },
  watch: {
    loading () {
      this.$nextTick(this.check)
    },
    finished () {
      this.$nextTick(this.check)
    }
  },
  methods: {
    check () {
      if (this.loading || this.finished) return false
      const el = this.$el
      const { scroller } = this
      const scrollerHeight = utils.getVisibleHeight(scroller)

      if (!scrollerHeight || utils.getComputedStyle(el).display === 'none' || el.offsetParent === null) {
        return false
      }

      const scrollTop = utils.getScrollTop(scroller)
      const targetBottom = scrollTop + scrollerHeight

      let reachBottom = false

      if (el === scroller) {
        reachBottom = scroller.scrollHeight - targetBottom < this.offset
      } else {
        const elBottom =
          utils.getElementTop(el) -
          utils.getElementTop(scroller) +
          utils.getVisibleHeight(el)
        reachBottom = elBottom - scrollerHeight < this.offset
      }
      if (reachBottom) {
        this.$emit('input', true)
        this.$emit('load')
      }
    },
    handler (bind) {
      if (this.binded !== bind) {
        this.binded = bind;
        (bind ? on : off)(this.scroller, 'scroll', this.check)
      }
    }
  }
})
</script>
