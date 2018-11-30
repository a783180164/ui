<template>
  <div :class="createClass({ disabled: isDisabled })" @click="$emit('click')">
    <span
      :class="[
        createClass('control'),
        {'lnzi-radio--noborder': currentValue === value}
      ]"
      :style="[style, {fontSize: currentSize}]"
    >
      <input
        type="radio"
        :name="name"
        :value="value"
        v-model="currentValue"
        :disabled="isDisabled"
        :class="createClass('input')"
      >
      <lnzi-icon
        v-if="currentValue === value"
        name="choose"
        :style="{
          fontSize: fontSize,
          color
        }"
      >
      </lnzi-icon>
    </span>
    <span v-if="$slots.default" :class="createClass('label', labelPosition)" @click="onClickLabel">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import create from '../utils/create'
import Icon from '../icon'
import findParent from '../mixins/find-parent'

export default create({
  name: 'radio',
  components: {
    Icon
  },
  mixins: [findParent],
  props: {
    name: {
      type: String,
      default: 'radio-same'
    },
    value: String,
    size: String,
    color: String,
    background: String,
    disabled: Boolean,
    labelDisabled: Boolean,
    labelPosition: String
  },
  computed: {
    style () {
      return {
        color: this.color,
        backgroundColor: this.background
      }
    },
    currentValue: {
      get () {
        return this.parent ? this.parent.value : this.value
      },
      set (val) {
        (this.parent || this).$emit('input', val)
      }
    },
    currentSize () {
      if (this.size) {
        let size = +this.size
        return (this.currentValue === this.value ? size + 2 : size) + 'px'
      }
    },
    isDisabled () {
      return this.parent
        ? this.parent.disabled || this.disabled
        : this.disabled
    }
  },
  created () {
    this.findParent('lnzi-radio-group')
    this.fontSize = +this.size + 2 + 'px'
  },
  methods: {
    onClickLabel () {
      if (!this.isDisabled && !this.labelDisabled) {
        this.currentValue = this.value
      }
    }
  }
})
</script>
