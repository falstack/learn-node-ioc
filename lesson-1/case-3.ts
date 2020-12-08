// b.ts
class B3 {
  p: number
  constructor(p: number) {
    this.p = p
  }
}

// a.ts
class A3 {
  private b: B3
  constructor(b: B3) {
    this.b = b
  }
}

// main.ts
const b3 = new B3(10)
const a3 = new A3(b3)
console.log(a3) // A3 => { b3: B3 { p: 10 } }
