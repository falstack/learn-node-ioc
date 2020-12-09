'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Container = void 0
const inject_1 = require('./inject')
class Container {
  constructor() {
    this.bindMap = new Map()
  }
  bind(key, clazz, constructorArgs) {
    console.log('bind', key, clazz, constructorArgs)
    const props = {
      clazz,
      constructorArgs: constructorArgs || []
    }
    this.bindMap.set(key, props)
  }
  get(key) {
    console.log('get', key)
    const target = this.bindMap.get(key)
    if (!target) {
      // @ts-ignore
      return null
    }
    const { clazz, constructorArgs } = target
    const props = Reflect.getMetadata(inject_1.PROPS_KEY, clazz)
    const instance = Reflect.construct(clazz, constructorArgs)
    for (const prop in props) {
      const identifier = props[prop].value
      // 递归获取注入的对象？？？
      instance[prop] = this.get(identifier)
    }
    return instance
  }
}
exports.Container = Container
