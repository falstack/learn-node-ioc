"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const fs = require("fs");
const path = require("path");
const provider_1 = require("./provider");
const inject_1 = require("./inject");
const resolve = (file) => path.resolve(__dirname, file);
class Container {
    constructor() {
        this.bindMap = new Map();
        this.autoload();
    }
    bind(key, clazz, constructorArgs) {
        const props = {
            clazz,
            constructorArgs: constructorArgs || []
        };
        this.bindMap.set(key, props);
    }
    get(key) {
        const target = this.bindMap.get(key);
        if (!target) {
            // @ts-ignore
            return null;
        }
        const { clazz, constructorArgs } = target;
        const props = Reflect.getMetadata(inject_1.PROPS_KEY, clazz);
        const instance = Reflect.construct(clazz, constructorArgs);
        for (const prop in props) {
            const identifier = props[prop].value;
            // 递归获取注入的对象？？？
            instance[prop] = this.get(identifier);
        }
        return instance;
    }
    autoload() {
        const list = fs.readdirSync(resolve('class'));
        for (const file of list) {
            if (/\.js$/.test(file)) {
                // 扫描 ts 文件
                const exports = require(resolve(`class/${file}`));
                for (const m in exports) {
                    const module = exports[m];
                    if (typeof module === 'function') {
                        const metadata = Reflect.getMetadata(provider_1.CLASS_KEY, module);
                        // 注册实例
                        if (metadata) {
                            this.bind(metadata.id, module, metadata.args);
                        }
                    }
                }
            }
        }
    }
}
exports.Container = Container;
