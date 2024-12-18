"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
if (!process.argv[2]) {
    console.log('Provide the filename argument.');
    process.exit(1);
}
const filename = (0, path_1.basename)(process.argv[2]);
const filterByRegEx = (regex) => new stream_1.Transform({
    transform(chunk, encoding, callback) {
        const splitted = (chunk + '').split('\n');
        this.push(JSON.stringify(splitted.filter(it => regex.test(it)), null, '\t'));
    }
});
(0, fs_1.createReadStream)(findFilePath(filename))
    .on('error', handleError)
    .pipe(filterByRegEx(/-\s(?:[\S\s]+)/))
    .pipe(process.stdout);
function handleError(err) {
    if (err.code === 'ENOTENT') {
        console.log('No such file was found.');
        process.exit(1);
    }
    console.error(err);
}
function findFilePath(filename) {
    const ls = (0, fs_1.readdirSync)((0, path_1.dirname)(__dirname), 'utf8');
    let path = '';
    for (const dir of ls) {
        if (!(0, fs_1.existsSync)((0, path_1.join)(dir, filename)))
            continue;
        return (0, path_1.resolve)(dir, filename);
    }
    if (!path) {
        console.log('No such file exists within the subdirectories.');
        return;
    }
}
