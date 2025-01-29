"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
console.log(createDirectory('logs'));
function createDirectory(name) {
    if (!(0, fs_1.existsSync)(name))
        return (0, fs_1.mkdirSync)(name, {
            recursive: true
        });
    console.log(`A directory called ${name} already exists.`);
}
