<template>
  <div :class="createClass()">
    <div :class="createClass('wrap', { scrollable })" ref="wrap">
      <div :class="createClass('nav')" ref="nav">
        <div :class="createClass('line')" :style="lineStyle"></div>
        <div
          v-for="(tab, index) in tabs"
          ref="tabs"
          class="lnzi-tab lnzi-hairline--top-bottom"
          :class="{
            'lnzi-common--cr': index === curActive,
            'lnzi-tab--disabled': tab.disabled
          }"
          :style="tabStyle"
          :key="index"
          @click="onClick(index)"
        >
          <span class="lnzi-ellipsis" ref="title">{{tab.title}}</span>
        </div>
      </div>
    </div>
    <div :class="createClass('content')">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import create from '../utils/create'
import { on, off } from '../utils/event'
import touch from '../mixins/touch'
import { isDef } from '../utils/index'

export default create({
  name: 'tabs',
  mixins: [touch],
  props: {
    value: null,
    color: {
      type: String,
      default: '#698ef8'
    },
    duration: {
      type: Number,
      default: 0.2
    },
    swipeThreshold: {
      type: Number,
      default: 4
    },
    lineWidth: String
  },
  data () {
    return {
      tabs: [],
      curActive: null,
      lineStyle: {},
      tabStyle: {},
      events: {
        resize: false
      }
    }
  },
  watch: {
    value (val) {
      val = +val
      const active = this.tabs.some((tab, index) => index === val)
      this.setCurActive(active ? val : 0)
    },
    curActive () {
      this.scrollIntoView()
      this.setLineType()
    },
    tabs () {
      this.scrollIntoView()
      this.setLineType()
    }
  },
  computed: {
    scrollable () {
      return this.tabs.length > this.swipeThreshold
    }
  },
  mounted () {
    this.curActive = this.value || 0
    this.setLineType()
    this.$nextTick(() => {
      this.handler(true)
      this.scrollIntoView(true)
    })
  },
  activated () {
    this.$nextTick(() => {
      this.handler(true)
      this.scrollIntoView(true)
    })
  },
  deactivated () {
    this.handler(false)
  },
  beforeDestory () {
    this.handler(false)
  },
  methods: {
    handler (bind) {
      const { events } = this

      if (events.resize !== bind) {
        events.resize = bind;
        (bind ? on : off)(window, 'resize', () => {
          this.setLineType()
        }, true)
      }
    },
    setLineType () {
      this.$nextTick(() => {
        const tab = this.$refs.tabs[this.curActive]
        const width = this.lineWidth || tab.offsetWidth
        const left = tab.offsetLeft + (tab.offsetWidth - width) / 2
        this.lineStyle = {
          width: `${width}px`,
          backgroundColor: this.color,
          transform: `translateX(${left}px)`,
          transition: `${this.duration}s`
        }
      })
    },
    setCurActive (active) {
      if (isDef(active) && this.curActive !== active) {
        this.$emit('input', active)
        this.curActive = active
        this.setLineType()
      }
    },
    scrollIntoView (immediate) {
      if (!this.scrollable || !this.$refs.tabs) return false
      const { nav } = this.$refs
      const tab = this.$refs.tabs[this.curActive]
      const { scrollLeft, offsetWidth: navWidth } = nav
      const { offsetLeft, offsetWidth: tabWidth } = tab
      const moveWidth = offsetLeft - navWidth / 2 + tabWidth / 2
      this.scrollTo(nav, scrollLeft, moveWidth, immediate)
    },
    scrollTo (el, from, to, immediate) {
      if (immediate) {
        el.scrollLeft += to - from
        return false
      }
      let count = 0
      const times = Math.round(this.duration * 1000 / 16)
      const animationFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame
      const animate = () => {
        el.scrollLeft += (to - from) / times
        if (++count < times) {
          animationFn(animate)
        }
      }
      animate()
    },
    onClick (index) {
      const { title, disabled } = this.tabs[index]
      if (disabled) {
        this.$emit('disabled', index, title)
      } else {
        this.setCurActive(index)
        this.$emit('click', index, title)
      }
    },
    renderTitle (el, index) {
      this.$nextTick(() => {
        const title = this.$refs.title[index]
        console.log(title.parentNode, el, title)
        title.parentNode.replaceChild(el, title)
      })
    }
  }
})
</script>
