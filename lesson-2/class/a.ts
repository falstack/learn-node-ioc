import { Provider } from '../provider'
import { Inject } from '../inject'

@Provider('a')
export class A {
  @Inject()
  b: any

  @Inject()
  d: any

  constructor() {
    console.log('create A class')
  }
}
