<template>
  <lnzi-cell
    :icon="icon"
    :title="title"
    :label="label"
    :border="border"
    :is-link="isLink"
    :clickable="false"
    v-bind="$attrs"
    :class="[
      createClass([titleAlign]),
      {
        'lnzi-field--textarea': type === 'textarea'
      }
    ]"
  >
    <div :class="[
      createClass('body'),
      {
        'lnzi-field--clearable': clearable
      }
    ]">
      <textarea
        v-if="type === 'textarea'"
        v-bind="$attrs"
        v-on="listeners"
        ref="input"
        :class="createClass('control', inputAlign)"
        :value="value"
        :readonly="readonly"
      >
      </textarea>
      <input
        v-else
        v-bind="$attrs"
        v-on="listeners"
        ref="input"
        :class="createClass('control', inputAlign)"
        :value="value"
        :type="type"
        :readonly="readonly"
      >
      <lnzi-icon
        v-if="showClear"
        name="off"
        :class="createClass('clear')"
        @touchstart.prevent="$emit('input', '')"
      >
      </lnzi-icon>
    </div>
    <slot name="right-icon" slot="right-icon"></slot>
  </lnzi-cell>
</template>

<script>
import create from '../utils/create'
import lnziCell from '../cell/index'
import lnziIcon from '../icon/index'

export default create({
  name: 'field',
  components: {
    lnziCell,
    lnziIcon
  },
  props: {
    value: [String, Number],
    icon: String,
    title: String,
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    titleAlign: {
      type: String,
      default () {
        return this.type === 'textarea' ? 'top' : 'center'
      }
    },
    inputAlign: {
      type: String,
      default: 'left'
    },
    readonly: Boolean,
    clearable: Boolean,
    clickable: {
      type: Boolean,
      default: false
    },
    isLink: Boolean,
    border: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      focused: false
    }
  },
  computed: {
    showClear () {
      return this.clearable && this.focused && this.value && !this.readonly
    },
    listeners () {
      return {
        ...this.$listeners,
        input: this.onInput,
        keypress: this.onKeypress,
        focus: this.onFocus,
        blur: this.onBlur
      }
    }
  },
  methods: {
    blur () {
      this.$refs.input && this.$refs.input.blur()
    },

    onInput (event) {
      this.$emit('input', event.target.value)
    },

    onFocus (event) {
      this.focused = true
      this.$emit('focus', event)
      if (this.readonly) {
        this.blur()
      }
    },

    onBlur (event) {
      this.focused = false
      this.$emit('blur', event)
    },

    onKeypress (event) {
      if (this.type === 'number') {
        const { keyCode } = event
        const allowPoint = String(this.value).indexOf('.') === -1
        const isValidKey = (keyCode >= 48 && keyCode <= 57) || (keyCode === 46 && allowPoint) || keyCode === 45
        if (!isValidKey) {}
        event.preventDefault()
      }

      if (this.type === 'search' && event.keyCode === 13) {
        this.blur()
      }

      this.$emit('keypress', event)
    }
  }
})
</script>
