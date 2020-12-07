// b.ts
var B = /** @class */ (function () {
    function B(p) {
        this.p = p;
    }
    return B;
}());
// a.ts
var A = /** @class */ (function () {
    function A(p) {
        this.b = new B(p);
    }
    return A;
}());
// main.ts
var a = new A(10);
console.log(a); // => A { b: B { p: 10 } }
