"use strict";
// b.ts
class B2 {
    constructor(p) {
        this.p = p;
    }
}
// a.ts
class A2 {
    constructor(p) {
        this.b = new B2(p);
    }
}
// main.ts
const a2 = new A2(10);
console.log(a2); // => A2 { b: B2 { p: 10 } }
