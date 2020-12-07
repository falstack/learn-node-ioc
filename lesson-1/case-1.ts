// b.ts
class B {
  constructor() {}
}

// a.ts
class A {
  b: B
  constructor() {
    this.b = new B()
  }
}

// main.ts
const a = new A()
console.log(a) // A { b: B {} }
