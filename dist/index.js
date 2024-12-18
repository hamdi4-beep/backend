"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const filename = (0, path_1.basename)(process.argv[2]);
if (!filename) {
    console.log('The filename was not provided.');
    process.exit(1);
}
const cwd = (0, path_1.dirname)(__dirname);
let path = '', filefound = false;
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
const readFileStream = (path) => (0, fs_1.createReadStream)(path)
    .on('error', console.error)
    .pipe(process.stdout);
for (const dir of ls) {
    path = (0, path_1.join)(dir, filename);
    if (filefound = (0, fs_1.existsSync)(path)) {
        readFileStream(path);
        break;
    }
}
if (!filefound)
    console.log('No such file was found within the subdirectories.');
