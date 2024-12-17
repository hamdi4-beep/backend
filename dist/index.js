"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
if (!process.argv[2]) {
    console.log('The script does not work without a provided filename.');
    process.exit(0);
}
const cwd = (0, path_1.dirname)(__dirname);
let path = '';
const ls = (0, fs_1.readdirSync)(cwd, {
    encoding: 'utf-8'
}).filter(path => {
    const stats = (0, fs_1.statSync)((0, path_1.join)(cwd, path));
    if (path.startsWith('.'))
        return;
    return stats.isDirectory();
});
for (let i = 0; i < ls.length; i++) {
    if ((0, fs_1.existsSync)(path = (0, path_1.join)(cwd, ls[i], process.argv[2]))) {
        (0, fs_1.createReadStream)(path)
            .on('error', console.error)
            .pipe(process.stdout);
        break;
    }
}
