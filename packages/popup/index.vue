<template>
  <transition :name="currentTransition">
    <div :class="createClass({[position]: position})" v-show="value">
      <slot name="title">
        <div v-if="title" :class="createClass('title')">
          <lnzi-icon :name="icon" @click="onClickCancel"></lnzi-icon>
          <h2 v-text="title"></h2>
          <span v-if="rightTitleText" class="lnzi-common--cr" v-text="rightTitleText" @click="onRightClick"></span>
        </div>
      </slot>
      <div v-if="$slots.default" :class="createClass('content')">
        <slot></slot>
      </div>
      <ul v-if="actions && actions.length>0" :class="createClass('actions')">
        <li
          v-for="(action, index) in actions"
          @click="onSelectAction(action, index)"
          :class="{active: currentAction === action.name}"
          :key="index"
        >
          {{action.name}}
        </li>
      </ul>
      <div v-if="cancelButtonText" :class="createClass('cancel')">
        <div :class="createClass('cancel-bg')"></div>
        <span :class="createClass('cancel-content')" v-text="cancelButtonText" @click="onClickCancel"></span>
      </div>
    </div>
  </transition>
</template>

<script>
import create from '../utils/create'
import modal from '../modal/index'
import LnziIcon from '../icon/index'

export default create({
  name: 'popup',
  mixins: [modal],
  components: {
    LnziIcon
  },
  props: {
    value: null,
    transition: String,
    mask: {
      type: Boolean,
      default: true
    },
    currentAction: String,
    actions: {
      type: Array,
      default () { return [] }
    },
    position: {
      type: String,
      default: ''
    },
    closeOnClickMask: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: 'left'
    },
    title: String,
    rightTitleText: String,
    cancelButtonText: String
  },
  computed: {
    currentTransition () {
      return this.transition || (this.position === '' ? 'lnzi-fade' : `lnzi-popup-slide-${this.position}`)
    }
  },
  methods: {
    onRightClick (event) {
      this.$emit('rightTextClick', event)
    },
    onSelectAction (action, index) {
      this.$emit('input', false, index)
      this.$emit('select', action, index)
    },
    onClickCancel (event) {
      this.$emit('input', false)
      this.$emit('cancel', event)
    }
  }
})

</script>
