import 'reflect-metadata'

export const INJECT_KEY = 'ioc:inject_meta'

export function Inject() {
  return function (targetClass: any, injectKey: string) {
    const { constructor } = targetClass

    let injection = {}

    if (Reflect.hasOwnMetadata(INJECT_KEY, constructor)) {
      injection = Reflect.getMetadata(INJECT_KEY, constructor)
    }

    // @ts-ignore
    injection[injectKey] = {
      injectKey
    }

    Reflect.defineMetadata(INJECT_KEY, injection, constructor)
  }
}
