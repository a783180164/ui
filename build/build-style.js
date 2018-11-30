const fs = require('fs-extra')
const less = require('less')
const path = require('path')
const components = require('./get-components')() // 获取组件名称
const esDir = path.join(__dirname, '../es/lnzi-style')
const libDir = path.join(__dirname, '../lib/lnzi-style')
const stylePath = path.resolve(__dirname, '../packages/lnzi-style')
const fontPath = path.resolve(__dirname, '../packages/lnzi-style/iconfont')
const esComponentDir = path.join(__dirname, '../es')
const libComponentDir = path.join(__dirname, '../lib')
joinStyle(esDir)
joinStyle(libDir)
joinComponentStyle(esComponentDir)
joinComponentStyle(libComponentDir)

function joinStyle (dir) {
  const currentDir = path.join(dir)
  const currentFontDir = path.join(currentDir, 'iconfont')
  fs.emptyDirSync(currentDir) // 每次清空lnzi-style文件
  fs.emptyDirSync(currentFontDir) // 每次清空iconfont文件
  const styleDirs = fs.readdirSync(stylePath).filter(item => item.indexOf('index') === -1)
  const filterFont = /\.?(iconfont\.css|eot|svg|ttf|woff)/
  const fontDirs = fs.readdirSync(fontPath).filter(item => filterFont.test(item))
  const content = []
  styleDirs.filter(item => item !== 'iconfont').forEach(dir => {
    let file = fs.readFileSync(path.resolve(stylePath, dir), 'utf8')
    if (dir.includes('base')) {
      file = `@import './iconfont/iconfont.css';\n${file}`
    }
    content.push(`@import '${dir.replace('.less', '.css')}';`)
    less.render(file, (er, css) => {
      fs.writeFileSync(path.join(currentDir, dir.replace('.less', '.css')), css.css)
    })
  })
  fontDirs.forEach(dir => {
    const file = fs.readFileSync(path.resolve(fontPath, dir), 'utf8')
    fs.writeFileSync(path.join(currentFontDir, dir), file)
  })
  fs.writeFileSync(path.resolve(currentDir, 'index.css'), content.join('\n'))
}

function joinComponentStyle (dir) {
  components.forEach(component => {
    const checkList = ['base']
    if (checkHasStyle(component)) {
      checkList.push(component)
    }
    const currentDir = path.join(dir, component, 'style')
    fs.emptyDirSync(currentDir)
    const content = dir.indexOf('es') > -1
      ? checkList.map(item => `import '../../lnzi-style/${item}.css'`).join('\n')
      : checkList.map(item => `require('../../lnzi-style/${item}.css')`).join('\n')
    fs.writeFileSync(path.resolve(currentDir, 'index.js'), content)
  })
}

function checkHasStyle (component) {
  return fs.existsSync(
    path.join(__dirname, '../es/lnzi-style/', `${component}.css`)
  )
}
