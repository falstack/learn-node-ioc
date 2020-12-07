"use strict";
exports.__esModule = true;
exports.Container = void 0;
// container.ts
var Container = /** @class */ (function () {
    function Container() {
        this.bindMap = new Map();
    }
    // 实例的注册
    Container.prototype.bind = function (identifier, clazz, constructorArgs) {
        if (constructorArgs === void 0) { constructorArgs = []; }
        this.bindMap.set(identifier, {
            clazz: clazz,
            constructorArgs: constructorArgs
        });
    };
    // 实例的获取
    Container.prototype.get = function (identifier) {
        var target = this.bindMap.get(identifier);
        var clazz = target.clazz, constructorArgs = target.constructorArgs;
        return Reflect.construct(clazz, constructorArgs);
    };
    return Container;
}());
exports.Container = Container;
// b.ts
var B = /** @class */ (function () {
    function B(p) {
        this.p = p;
    }
    return B;
}());
// a.ts
var A = /** @class */ (function () {
    function A() {
        this.b = container.get('b');
    }
    return A;
}());
// main.ts
var container = new Container();
container.bind('a', A);
container.bind('b', B, [10]);
// 从容器中取出a
var a = container.get('a');
console.log(a); // A => { b: B { p: 10 } }
