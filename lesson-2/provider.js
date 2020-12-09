"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.CLASS_KEY = void 0;
require("reflect-metadata");
exports.CLASS_KEY = 'ioc:tagged_class';
function Provider(key, args) {
    return function (target) {
        const metas = {
            id: key,
            args: args || []
        };
        Reflect.defineMetadata(exports.CLASS_KEY, metas, target);
        return target;
    };
}
exports.Provider = Provider;
