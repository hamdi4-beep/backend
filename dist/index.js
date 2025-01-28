"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const folders = 'parent_folder/sub_folder/sub_sub_folder'.split('/');
for (let i = 0; i < folders.length; i++) {
    const currFolder = folders[i];
    if (!(0, fs_1.existsSync)(currFolder)) {
        const currPath = folders.slice(0, -(folders.length - i));
        (0, fs_1.mkdirSync)((0, path_1.join)(...currPath, currFolder));
    }
}
