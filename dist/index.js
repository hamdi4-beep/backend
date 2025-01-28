"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const folders = 'parent_folder/sub_folder/sub_sub_folder'.split('/');
for (let i = 0; i < folders.length; i++) {
    const currFolder = folders[i];
    const currPath = (0, path_1.join)(...folders.slice(0, -(folders.length - i)), currFolder);
    if ((0, fs_1.existsSync)(currPath)) {
        console.log('The path already exists!');
        break;
    }
    (0, fs_1.mkdirSync)(currPath);
}
