<template>
  <div :class="createClass('pane')">
    <div v-if="$slots.title" ref="title">
      <slot name="title"></slot>
    </div>
  </div>
</template>

<script>
import create from '../utils/create'
import findParent from '../mixins/find-parent'

export default create({
  name: 'tab',
  mixins: [findParent],
  props: {
    title: String,
    disabled: Boolean
  },
  created () {
    this.findParent('lnzi-tabs')
  },
  mounted () {
    const { tabs } = this.parent
    const index = this.parent.$slots.default.indexOf(this.$vnode)
    tabs.splice(index === -1 ? tabs.length : index, 0, this)
    if (this.$slots.title) {
      this.parent.renderTitle(this.$refs.title, index)
    }
  }
})
</script>
