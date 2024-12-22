"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
const monitor = new stream_1.PassThrough({
    transform(chunk, encoding, callback) {
        this.push(chunk + '\n');
        callback();
    }
});
const joinFiles = (files) => new Promise((resolve, reject) => stream_1.Readable
    .from(files)
    .on('data', filename => (0, fs_1.createReadStream)((0, path_1.join)('files', filename))
    .on('error', reject)
    .pipe(monitor)
    .on('finish', resolve)));
joinFiles(['style-guide.md', 'results.txt'])
    .then(() => monitor.pipe(process.stdout))
    .catch(console.error);
