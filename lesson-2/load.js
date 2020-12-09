'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.load = void 0
const fs = require('fs')
const path = require('path')
const provider_1 = require('./provider')
const resolve = (file) => path.resolve(__dirname, file)
function load(container) {
  // container 为全局的 IoC 容器
  const list = fs.readdirSync(resolve('class'))
  console.log('list', list)
  for (const file of list) {
    if (/\.js$/.test(file)) {
      // 扫描 ts 文件
      const exports = require(resolve(`class/${file}`))
      for (const m in exports) {
        const module = exports[m]
        console.log('module', module)
        if (typeof module === 'function') {
          const metadata = Reflect.getMetadata(provider_1.CLASS_KEY, module)
          // 注册实例
          if (metadata) {
            container.bind(metadata.id, module, metadata.args)
          }
        }
      }
    }
  }
}
exports.load = load
