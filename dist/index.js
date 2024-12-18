"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const readFileStream = (path) => (0, fs_1.createReadStream)(path)
    .on('error', console.error)
    .pipe(process.stdout);
const path = getFilePath((0, path_1.basename)(process.argv[2]));
if (!path) {
    console.log('No such file was found');
    process.exit(1);
}
readFileStream(path);
function getFilePath(filename) {
    const cwd = (0, path_1.dirname)(__dirname);
    let path = (0, path_1.join)(cwd, filename);
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
    if ((0, fs_1.existsSync)(path))
        return (0, path_1.basename)(path);
    for (const dir of ls) {
        path = (0, path_1.join)(dir, filename);
        if ((0, fs_1.existsSync)(path))
            return path;
    }
}
