import * as path from 'path'
import { CLASS_KEY } from './provider'
import { PROPS_KEY } from './inject'
import { getJsonFiles } from './utils'

const resolve = (file: string) => path.resolve(__dirname, file)

export class Container {
  bindMap = new Map()

  constructor() {
    this.autoload()
  }

  bind(key: string, clazz: any, constructorArgs?: Array<any>) {
    const props = {
      clazz,
      constructorArgs: constructorArgs || []
    }

    this.bindMap.set(key, props)
  }

  get<T>(key: string): T {
    const target = this.bindMap.get(key)

    if (!target) {
      // @ts-ignore
      return null
    }

    const { clazz, constructorArgs } = target

    const props = Reflect.getMetadata(PROPS_KEY, clazz)
    const instance = Reflect.construct(clazz, constructorArgs)

    for (const prop in props) {
      const identifier = props[prop].value
      // 递归获取注入的对象？？？
      instance[prop] = this.get(identifier)
    }

    return instance
  }

  autoload() {
    const list = getJsonFiles(__dirname, '.js')

    for (const file of list) {
      const exports = require(file)
      for (const m in exports) {
        const module = exports[m]
        if (typeof module === 'function') {
          const metadata = Reflect.getMetadata(CLASS_KEY, module)
          // 注册实例
          if (metadata) {
            this.bind(metadata.id, module, metadata.args)
          }
        }
      }
    }
  }
}
