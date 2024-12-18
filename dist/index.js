"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const filename = (0, path_1.basename)((_a = process.argv[2]) !== null && _a !== void 0 ? _a : '');
const readFileStream = (path) => (0, fs_1.createReadStream)(path)
    .on('error', console.error)
    .pipe(process.stdout);
if (!filename) {
    console.log('Expected a filename.');
    process.exit(1);
}
const path = getFilePath(filename);
if (!path) {
    console.log('No such file was found');
    process.exit(1);
}
readFileStream(path);
function getFilePath(filename) {
    const cwd = (0, path_1.dirname)(__dirname);
    let path = (0, path_1.join)(cwd, filename);
    if ((0, fs_1.existsSync)(path))
        return (0, path_1.basename)(path);
    const ls = (0, fs_1.readdirSync)(cwd, 'utf-8').filter(item => {
        if (item.startsWith('.'))
            return;
        try {
            const stats = (0, fs_1.statSync)(item);
            return stats.isDirectory();
        }
        catch (e) {
            console.error(e);
        }
    });
    for (const dir of ls) {
        path = (0, path_1.join)(dir, filename);
        if ((0, fs_1.existsSync)(path))
            return path;
    }
}
