import { Provider } from '../ioc/provider'
import { Inject } from '../ioc/inject'

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
