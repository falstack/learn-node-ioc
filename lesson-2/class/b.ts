import { Provider } from '../ioc/provider'
import { Inject } from '../ioc/inject'

@Provider('b', [10])
export class B {
  @Inject()
  c: any

  constructor(p: number) {
    // @ts-ignore
    this.p = p
  }
}
