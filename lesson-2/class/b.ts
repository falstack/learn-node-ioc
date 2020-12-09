import { Provider } from '../provider'
import { Inject } from '../inject'

@Provider('b', [10])
export class B {
  @Inject()
  c: any

  constructor(p: number) {
    // @ts-ignore
    this.p = p
  }
}
