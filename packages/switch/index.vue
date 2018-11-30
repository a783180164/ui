<template>
  <div
    :class="createClass({
      on: value,
      disabled,
      'lnzi-common--bg': !!value
    })"
    :style="style"
    @click="onToggle"
  >
    <div :class="createClass('node')"></div>
  </div>
</template>

<script>
import create from '../utils/create'

export default create({
  name: 'switch',
  props: {
    value: Boolean,
    disabled: Boolean,
    size: {
      type: String,
      default: '30px'
    }
  },
  computed: {
    style () {
      return {
        fontSize: this.size
      }
    }
  },
  methods: {
    onToggle () {
      if (!this.disabled) {
        this.$emit('input', !this.value)
        this.$emit('change', !this.value)
      }
    }
  }
})
</script>
