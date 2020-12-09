"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
const bootstrap = async () => {
    // 初始化 IOC 容器，扫描文件
    const container = new container_1.Container();
    console.log(container.get('a')); // A => { b: B { p: 10 } }
};
bootstrap();
