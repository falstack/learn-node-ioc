import { INJECT_KEY, PROVIDER_KEY, getFiles } from './utils'

export class Container {
  bindMap = new Map()
  instanceMap = new Map()

  constructor() {
    this.autoload()
  }

  register(key: string, clazz: any, constructorArgs?: Array<any>) {
    const props = {
      clazz,
      constructorArgs: constructorArgs || []
    }

    this.bindMap.set(key, props)
  }

  singleton(key: string, clazz: any, constructorArgs?: Array<any>) {
    const props = {
      clazz,
      constructorArgs: constructorArgs || []
    }

    this.instanceMap.set(key, props)
  }

  get<T>(key: string) {
    if (this.instanceMap.has(key)) {
      return this.instanceMap.get(key)
    }

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

  autoload() {
    const list = getFiles(`${process.cwd()}/dist/lesson-2`, '.js')

    for (const file of list) {
      const exports = require(file)
      for (const m in exports) {
        const clazz = exports[m]
        if (typeof clazz === 'function') {
          const metadata = Reflect.getMetadata(PROVIDER_KEY, clazz)
          if (metadata) {
            this.register(metadata.id, clazz, metadata.args)
          }
        }
      }
    }
  }
}
