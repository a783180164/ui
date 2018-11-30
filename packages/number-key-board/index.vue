<template>
  <div :class="createClass([theme])">
    <ul :class="createClass('body')">
      <li
        v-for="(key, index) in keys"
        :key="index"
        :class="key.type ? createClass(key.type) : ''"
        @click="onClick(key)"
      >
        <lnzi-icon
          :name="key.type === 'delete' ? 'delete' : ''"
        >
          {{key.text}}
        </lnzi-icon>
      </li>
    </ul>
    <div v-if="theme === 'custom'" :class="createClass('sidebar')">
      <lnzi-icon
        name="delete"
        :class="createClass('delete')"
        @click="onClick({type: 'delete'})"
      >
      </lnzi-icon>
      <lnzi-icon
        :class="[createClass('complete'), 'lnzi-common--bg']"
        @click="onClick({type: 'complete'})"
      >
        完成
      </lnzi-icon>
    </div>
  </div>
</template>

<script>
import create from '../utils/create'
import LnziIcon from '../icon'

export default create({
  name: 'number-keyboard',
  components: {
    LnziIcon
  },
  props: {
    show: Boolean,
    theme: {
      type: String,
      default: 'default'
    },
    extraKey: {
      type: String,
      default: ''
    }
  },
  computed: {
    keys () {
      let keys = []
      for (let i = 1; i <= 9; i++) {
        keys.push({ text: i })
      }

      switch (this.theme) {
        case 'default':
          keys.push(
            { text: this.extraKey, type: 'extra' },
            { text: '0' },
            { text: '', type: 'delete' }
          )
          break
        case 'custom':
          keys.push(
            { text: '0', type: 'middle' },
            { text: this.extraKey, type: 'extra' }
          )
          break
      }

      return keys
    }
  },
  methods: {
    onClick (key) {
      if (key.type === 'delete') {
        this.$emit('delete')
        return false
      }
      if (key.type === 'complete') {
        this.$emit('close')
        return false
      }
      key.text && this.$emit('click', key.text)
    }
  }

})
</script>
