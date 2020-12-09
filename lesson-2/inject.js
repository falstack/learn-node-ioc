"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = exports.PROPS_KEY = void 0;
require("reflect-metadata");
exports.PROPS_KEY = 'ioc:inject_props';
function Inject() {
    return function (target, targetKey) {
        const annotationTarget = target.constructor;
        let props = {};
        if (Reflect.hasOwnMetadata(exports.PROPS_KEY, annotationTarget)) {
            props = Reflect.getMetadata(exports.PROPS_KEY, annotationTarget);
        }
        // @ts-ignore
        props[targetKey] = {
            value: targetKey
        };
        Reflect.defineMetadata(exports.PROPS_KEY, props, annotationTarget);
    };
}
exports.Inject = Inject;
