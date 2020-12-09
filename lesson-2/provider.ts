import 'reflect-metadata'

export const CLASS_KEY = 'ioc:tagged_class'

export function Provider(key: string, args?: Array<any>) {
  return function (target: any) {
    const metas = {
      id: key,
      args: args || []
    }

    Reflect.defineMetadata(CLASS_KEY, metas, target)

    return target
  }
}
