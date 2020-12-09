import { PROPS_KEY } from './inject'

export class Container {
  bindMap = new Map()

  bind(key: string, clazz: any, constructorArgs?: Array<any>) {
    console.log('bind', key, clazz, constructorArgs)
    const props = {
      clazz,
      constructorArgs: constructorArgs || []
    }

    this.bindMap.set(key, props)
  }

  get<T>(key: string): T {
    console.log('get', key)
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
}
