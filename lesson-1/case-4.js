'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Container = void 0
// container.ts
class Container {
  constructor() {
    this.bindMap = new Map()
  }
  // 实例的注册
  bind(identifier, clazz, constructorArgs = []) {
    this.bindMap.set(identifier, {
      clazz,
      constructorArgs
    })
  }
  // 实例的获取
  get(identifier) {
    const target = this.bindMap.get(identifier)
    const { clazz, constructorArgs } = target
    return Reflect.construct(clazz, constructorArgs)
  }
}
exports.Container = Container
// b.ts
class B4 {
  constructor(p) {
    this.p = p
  }
}
// a.ts
class A4 {
  constructor() {
    this.b = container.get('b')
  }
}
// main.ts
const container = new Container()
container.bind('a', A4)
container.bind('b', B4, [10])
// 从容器中取出a
const a4 = container.get('a')
console.log(a4) // A4 => { b: B4 { p: 10 } }
