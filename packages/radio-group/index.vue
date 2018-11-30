<template>
  <div :class="createClass()">
    <slot></slot>
  </div>
</template>

<script>
import create from '../utils/create'

export default create({
  name: 'radio-group',
  props: {
    value: null,
    disabled: Boolean
  },
  watch: {
    value (val) {
      this.$emit('change', val)
    }
  }
})
</script>
