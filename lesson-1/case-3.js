// b.ts
var B = /** @class */ (function () {
    function B(p) {
        this.p = p;
    }
    return B;
}());
// a.ts
var A = /** @class */ (function () {
    function A(b) {
        this.b = b;
    }
    return A;
}());
// main.ts
var b = new B(10);
var a = new A(b);
console.log(a); // A => { b: B { p: 10 } }
