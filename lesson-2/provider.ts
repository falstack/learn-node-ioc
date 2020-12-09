import 'reflect-metadata'

export const PROVIDER_KEY = 'ioc:provider_meta'

export function Provider(name: string, args?: Array<any>) {
  return function (targetClass: any) {
    const metas = {
      id: name,
      args: args || []
    }

    Reflect.defineMetadata(PROVIDER_KEY, metas, targetClass)

    return targetClass
  }
}
