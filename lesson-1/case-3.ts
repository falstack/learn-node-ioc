// b.ts
class B {
  p: number
  constructor(p: number) {
    this.p = p
  }
}

// a.ts
class A {
  private b: B
  constructor(b: B) {
    this.b = b
  }
}

// main.ts
const b = new B(10)
const a = new A(b)
console.log(a) // A => { b: B { p: 10 } }
