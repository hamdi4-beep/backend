"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
const handleFiles = (files) => new Promise((resolve, reject) => (0, stream_1.pipeline)(stream_1.Readable.from(files), new stream_1.Transform({
    objectMode: true,
    transform(filename, encoding, callback) {
        (0, fs_1.createReadStream)((0, path_1.join)('files', filename + ''))
            .on('error', reject)
            .on('data', chunk => this.push(chunk + '\n'))
            .on('end', callback);
    }
}), process.stdout, (err) => {
    if (err) {
        reject(err);
        process.exit(1);
    }
    resolve(null);
}));
handleFiles(['style-guide.md', 'results.txt'])
    .then(() => console.log('The pipeline operation was successful.'))
    .catch(err => {
    if (err.code === 'ENOENT') {
        console.log('No such file was found.');
        process.exit(1);
    }
    console.error(err);
});
