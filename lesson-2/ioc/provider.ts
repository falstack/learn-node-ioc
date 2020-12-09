import 'reflect-metadata'
import { PROVIDER_KEY } from './utils'

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
