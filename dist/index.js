"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
readFiles(['style-guide.md', 'results.txt'])
    .then(() => console.log('Finished processing the files successfully.'));
function readFiles(files) {
    const passThrough = new stream_1.PassThrough();
    return new Promise((resolve, reject) => stream_1.Readable
        .from(files)
        .on('data', filename => {
        (0, fs_1.createReadStream)((0, path_1.join)('files', filename))
            .on('error', reject)
            .pipe(passThrough)
            .pipe(process.stdout);
    })
        .on('end', () => passThrough.on('finish', resolve)));
}
