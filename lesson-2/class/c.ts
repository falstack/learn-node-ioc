import { Provider } from '../provider'

@Provider('c', [5])
export class C {
  constructor(p: number) {
    // @ts-ignore
    this.p = p
  }
}
