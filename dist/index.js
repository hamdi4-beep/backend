"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const path = buildPath((0, path_1.dirname)('/parent-folder/sub-folder/sub-sub-folder/file.txt'));
console.log(path);
function buildPath(path) {
    const dirs = path.split('/');
    let currPath = '';
    if (path.startsWith('/'))
        dirs.shift();
    for (let i = 0; i < dirs.length; i++) {
        const currDir = dirs[i];
        currPath = (0, path_1.join)(...dirs.slice(0, -(dirs.length - i)), currDir);
        if ((0, fs_1.existsSync)(currPath)) {
            console.log('The path already exists!');
            break;
        }
        console.log(currPath);
    }
    return currPath;
}
