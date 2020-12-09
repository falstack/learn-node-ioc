import 'reflect-metadata'

const KEY_NAME = 'ioc:key'

function decorator() {
  return function (target: any) {
    const metas = {
      key: 'value'
    }

    Reflect.defineMetadata(KEY_NAME, metas, target)

    return target
  }
}

@decorator()
class D {
  constructor() {}
}

console.log(Reflect.getMetadata(KEY_NAME, D)) // => { key: 'value' }
