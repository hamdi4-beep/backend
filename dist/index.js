"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const args = process.argv.slice(2);
readFile();
function readFile() {
    for (const arg of args) {
        const parts = arg.split('.');
        if (parts.pop() !== 'md') {
            console.log('Only MD files are allowed!');
            process.exit(0);
        }
    }
    (0, fs_1.createReadStream)((0, path_1.join)('public', ...args))
        .on('error', (err) => {
        if (err.code === 'ENOENT') {
            console.log('No such file exists.');
            return;
        }
        console.error(err);
    })
        .pipe(process.stdout);
}
