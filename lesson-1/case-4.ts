// container.ts
export class Container {
  bindMap = new Map()

  // 实例的注册
  bind(identifier: string, clazz: any, constructorArgs: Array<any> = []) {
    this.bindMap.set(identifier, {
      clazz,
      constructorArgs
    })
  }

  // 实例的获取
  get<T>(identifier: string): T {
    const target = this.bindMap.get(identifier)
    const { clazz, constructorArgs } = target
    return Reflect.construct(clazz, constructorArgs)
  }
}

// b.ts
class B {
  p: any
  constructor(p: number) {
    this.p = p
  }
}

// a.ts
class A {
  b: B
  constructor() {
    this.b = container.get('b')
  }
}

// main.ts
const container = new Container()
container.bind('a', A)
container.bind('b', B, [10])

// 从容器中取出a
const a = container.get('a')
console.log(a) // A => { b: B { p: 10 } }
