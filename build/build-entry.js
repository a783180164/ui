const fs = require('fs')
const path = require('path')
const uppercamelize = require('uppercamelcase') // 将短下划线,点,下划线,空格的字符串转换为驼峰：foo-bar => FooBar
const Components = require('./get-components')() // 获取组件名
const version = process.env.VERSION || require('../package.json').version
const tips = '// This file is auto gererated by build/build-entry.js'

function buildVantEntry () {
  const uninstallComponents = [
    'Lazyload',
    'Waterfall'
  ]

  const importList = Components.map(name => `import ${uppercamelize(name)} from './${name}'`)
  const exportList = Components.map(name => `${uppercamelize(name)}`)
  const intallList = exportList.filter(name => !~uninstallComponents.indexOf(uppercamelize(name)))
  const content = `${tips}
${importList.join('\n')}

const version = '${version}'
const components = [
  ${intallList.join(',\n  ')}
]

const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  version,
  ${exportList.join(',\n  ')}
}

export default {
  install,
  version
}
`
  fs.writeFileSync(path.join(__dirname, '../packages/index.js'), content) // 把内容写入目标文件内
}

buildVantEntry()
