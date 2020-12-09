import { PROVIDER_KEY } from './provider'
import { INJECT_KEY } from './inject'
import { getFiles } from './utils'

export class Container {
  bindMap = new Map()
  instanceMap = new Map()

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

  get<T>(key: string) {
    const target = this.bindMap.get(key)

    if (!target) {
      return null
    }

    const { clazz, constructorArgs } = target

    const injection = Reflect.getMetadata(INJECT_KEY, clazz)
    const newInstance = Reflect.construct(clazz, constructorArgs)

    for (const key in injection) {
      if (injection.hasOwnProperty(key)) {
        const { injectKey } = injection[key]
        newInstance[key] = this.get(injectKey)
      }
    }

    return newInstance
  }

  singleton<T>(key: string) {
    if (this.instanceMap.has(key)) {
      return this.instanceMap.get(key)
    }

    const instance = this.get(key)
    this.instanceMap.set(key, instance)

    return instance
  }

  autoload() {
    const list = getFiles(__dirname, '.js')

    for (const file of list) {
      const exports = require(file)
      for (const m in exports) {
        const clazz = exports[m]
        if (typeof clazz === 'function') {
          const metadata = Reflect.getMetadata(PROVIDER_KEY, clazz)
          if (metadata) {
            this.bind(metadata.id, clazz, metadata.args)
          }
        }
      }
    }
  }
}
