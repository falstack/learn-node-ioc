## 耦合

- 在`case-1`中，有`A`、`B`两个类，`A`依赖`B`
- 我们可以在`A`的构造函数里面`new B`，来实现依赖关系
- 但当有`C`、`D`... 类都要依赖`B`的时候，`B`如果改动，就会导致依赖`B`的类都要做改动
- 如`case-2`所示



## 解耦

- 在`case-3`中，我们不在`A`的构造函数里`new B`，而是把`new`好的`B`作为`A`的参数
- 如果我们的`B`是可共享的，那么在程序中也只需要`new B`一处改动即可
- 如果`B`不是可共享的，那么要改动的地方仍然很多



## 容器

- 在`case-3`中，我们把`A`和`B`都放在入口文件来创建，这样看似已经很工整了
- 但是当`A`依赖`B`，`B`又依赖`C`的时候，我们还是得一层一层的传递实例化的对象，很麻烦
- 所以我们在`case-4`中，创建了一个`对象树`，我们把所有的类在入口文件注册到这棵树上，然后从这棵树上去获取
- 只需要在入口文件，把`container`作为单例绑定在`context`上即可实现真正的解耦
- 在这个 case 中，我们需要学习[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)


## Reflect Metadata

- 在`case-5`中，我们引入 [reflect-metadata](https://jkchao.github.io/typescript-book-chinese/tips/metadata.html#%E5%9F%BA%E7%A1%80) 来为类定义元数据
- `defineMetadata`和`getMetadata`是两个需要去重点关注的方法
