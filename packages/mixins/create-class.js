const ELEMENT = '--'

const join = (name, type) => type ? name + ELEMENT + type : name

const prefix = (name, extra) => {
  if (typeof extra === 'string') {
    return join(name, extra)
  }

  if (Array.isArray(extra)) {
    return extra.map(item => prefix(name, item))
  }

  const obj = {}
  Object.keys(extra).map(item => {
    if (item.includes('lnzi-common')) {
      obj[item] = extra[item]
      return
    }
    obj[name + ELEMENT + item] = extra[item]
  })
  return obj
}

export default {
  methods: {
    createClass (type, extra) {
      const { name } = this.$options

      if (type && typeof type !== 'string') {
        extra = type
        type = ''
      }
      type = join(name, type)
      return extra ? [type, prefix(type, extra)] : type
    }
  }
}
