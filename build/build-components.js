/**
 * Compile components
 */
const fs = require('fs-extra')
const path = require('path')
const babel = require('babel-core') // 7.0以上babel/core 升级为 @babel/core
const compiler = require('vue-sfc-compiler') // 编译vue文件

const esDir = path.join(__dirname, '../es') // 添加一个es文件夹，并且返回一个绝对路径
const libDir = path.join(__dirname, '../lib') // 添加一个lib文件夹，并且返回一个绝对路径
const pkgDir = path.join(__dirname, '../packages') // 存在路径返回一个绝对路径
const compilerOption = {
  babel: {
    configFile: path.join(__dirname, '../babel.config.js')
  }
}

const whiteList = /(demo|test|lnzi-style|\.md)$/

// clear dir
fs.emptyDirSync(esDir) // 每次清空es文件
fs.emptyDirSync(libDir) // 每次清空lib文件

// copy packages
fs.copySync(pkgDir, esDir) // 复制pkg文件到es文件下

compile(esDir) // 编译文件

process.env.BABEL_MODULE = 'commonjs'

fs.copySync(pkgDir, libDir)
compile(libDir)

function compile (dir, jsOnly = false) {
  const files = fs.readdirSync(dir) // 获取传入路径下面的一级文件名
  files.forEach(file => {
    const absolutePath = path.join(dir, file) // 添加文件名，并返回文件名绝对路径

    // reomve unnecessary files
    if (whiteList.test(file)) { // 删除不需要的文件名
      fs.removeSync(absolutePath)
      // scan dir
    } else if (isDir(absolutePath)) { // 是文件夹目录，递归调用
      return compile(absolutePath)
      // compile sfc
    } else if (/\.vue$/.test(file) && !jsOnly) { // 是.vue文件
      const source = fs.readFileSync(absolutePath, 'utf-8') // 读取文件下内容
      fs.removeSync(absolutePath) // 删除该路径

      const outputVuePath = absolutePath + '.js'
      const outputJsPath = absolutePath.replace('.vue', '.js')
      const output = fs.existsSync(outputJsPath) ? outputVuePath : outputJsPath // 判断outputJsPath路径是否存在

      fs.outputFileSync(output, compiler(source, compilerOption).js) // 编译改文件内容到指定目录下
    } else if (/\.js$/.test(file)) {
      const { code } = babel.transformFileSync(absolutePath, compilerOption.babel)
      fs.outputFileSync(absolutePath, code)
    }
  })
}

function isDir (dir) {
  // fs.lstatSync(dir) 表示相关文件信息  isDirectory() fs.lstatSync(dir)是一个文件夹目录 => true  是一个
  return fs.lstatSync(dir).isDirectory()
}
