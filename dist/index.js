"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
const files = ['style-guide.md', 'results.txt'];
stream_1.Readable
    .from(files)
    .on('data', filename => {
    const passThrough = new stream_1.PassThrough({
        objectMode: true,
        transform(chunk, enc, callback) {
            this.push(chunk + '\n');
        }
    });
    (0, stream_1.pipeline)((0, fs_1.createReadStream)((0, path_1.join)('files', filename)), passThrough, process.stdout, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('The pipeline operation was a success.');
    });
});
