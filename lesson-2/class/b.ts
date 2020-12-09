import { Provider } from '../provider'

@Provider('b', [10])
export class B {
  constructor(p: number) {
    // @ts-ignore
    this.p = p
  }
}
