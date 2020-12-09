import { Container } from './container'

const bootstrap = async () => {
  const container = new Container()

  console.log(container.get('a')) // A => { b: B { p: 10 } }
}

bootstrap()
