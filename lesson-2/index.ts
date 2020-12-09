import { Container } from './container'
import { load } from './load'

const bootstrap = async () => {
  // 初始化 IOC 容器，扫描文件
  const container = new Container()
  await load(container)

  console.log(container.get('a')) // A => { b: B { p: 10 } }
}

bootstrap()
