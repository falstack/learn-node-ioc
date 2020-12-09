import * as fs from 'fs'
import * as path from 'path'
import { CLASS_KEY } from './provider'

const resolve = (file: string) => path.resolve(__dirname, file)

export function load(container: any) {
  const list = fs.readdirSync(resolve('class'))
  for (const file of list) {
    if (/\.js$/.test(file)) {
      // 扫描 ts 文件
      const exports = require(resolve(`class/${file}`))
      for (const m in exports) {
        const module = exports[m]
        if (typeof module === 'function') {
          const metadata = Reflect.getMetadata(CLASS_KEY, module)
          // 注册实例
          if (metadata) {
            container.bind(metadata.id, module, metadata.args)
          }
        }
      }
    }
  }
}
