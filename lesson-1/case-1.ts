// b.ts
class B1 {
  constructor() {}
}

// a.ts
class A1 {
  b: B1
  constructor() {
    this.b = new B1()
  }
}

// main.ts
const a1 = new A1()
console.log(a1) // A1 { b: B1 {} }
