// b.ts
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
// a.ts
var A = /** @class */ (function () {
    function A() {
        this.b = new B();
    }
    return A;
}());
// main.ts
var a = new A();
console.log(a); // A { b: B {} }
