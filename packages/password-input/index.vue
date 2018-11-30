<template>
  <div :class="createClass([type])">
    <ul :class="createClass('number')" @click.stop="$emit('focus')">
      <li v-for="(item,index) in passwordArr" :key="index">
        <i v-if="item === 'visible'" :style="{visibility: item}"></i>
        <span v-else-if="item === 'hidden' && type === 'line'"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import create from '../utils/create'

export default create({
  name: 'password-input',
  props: {
    type: {
      type: String,
      default: 'square'
    },
    value: {
      type: Array,
      default () { return [] }
    },
    length: {
      type: Number,
      default: 6
    }
  },
  computed: {
    passwordArr () {
      let arr = []
      for (let i = 0; i < this.length; i++) {
        arr[i] = this.value[i] ? 'visible' : 'hidden'
      }
      return arr
    }
  }
})
</script>
