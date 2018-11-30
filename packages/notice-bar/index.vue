<template>
  <div
    v-show="showNoticeBar"
    :class="createClass({ hasmode: mode })"
    :style="barStyle"
    @click="$emit('click')"
  >
    <div v-if="leftIcon" :class="createClass('left-icon')">
      <img :src="leftIcon">
    </div>
    <div :class="createClass('wrap')" ref="wrap">
      <div
        ref="content"
        :class="[createClass('content'), animationClass]"
        :style="contentStyle"
        @animationend="onAnimationEnd"
        @webkitAnimationEnd="onAnimationEnd"
      >
        <slot>{{ text }}</slot>
      </div>
    </div>
    <lnzi-icon
      v-if="iconName"
      :class="createClass('right-icon')"
      :name="iconName"
      @click="onClickIcon"
    >
    </lnzi-icon>
  </div>
</template>

<script>
import create from '../utils/create'
import lnziIcon from '../icon/index'

export default create({
  name: 'notice-bar',
  components: {
    lnziIcon
  },
  props: {
    text: String,
    mode: String,
    color: String,
    leftIcon: String,
    background: String,
    delay: {
      type: [String, Number],
      default: 1
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    speed: {
      type: Number,
      default: 50
    }
  },
  computed: {
    iconName () {
      return this.mode === 'closeable' ? 'off' : this.mode === 'link' ? 'right' : ''
    },
    barStyle () {
      return {
        color: this.color,
        background: this.background
      }
    },
    contentStyle () {
      return {
        paddingLeft: this.firstRound ? 0 : this.wrapWidth + 'px',
        animationDelay: (this.firstRound ? this.delay : 0) + 's',
        animationDuration: this.duration + 's'
      }
    }
  },
  data () {
    return {
      wrapWidth: '',
      contentWidth: '',
      duration: 0,
      showNoticeBar: true,
      firstRound: true,
      animationClass: ''
    }
  },
  watch: {
    text: {
      handler: function () {
        this.$nextTick(() => {
          const { wrap, content } = this.$refs
          if (!wrap || !content) return false
          const wrapWidth = wrap.getBoundingClientRect().width
          const contentWidth = content.getBoundingClientRect().width
          console.log(this.scrollable, contentWidth > wrapWidth)
          if (this.scrollable && contentWidth > wrapWidth) {
            this.wrapWidth = wrapWidth
            this.contentWidth = contentWidth
            this.duration = contentWidth / this.speed
            this.animationClass = this.createClass('play')
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    onClickIcon () {
      this.showNoticeBar = this.mode !== 'closeable'
    },
    onAnimationEnd () {
      this.firstRound = false
      this.$nextTick(() => {
        this.duration = (this.contentWidth + this.wrapWidth) / this.speed
        this.animationClass = this.createClass('play-infinite')
      })
    }
  }
})
</script>
