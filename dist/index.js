"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
const readStream = (0, fs_1.createReadStream)((0, path_1.join)('files', 'style-guide.md'));
readStream
    .on('error', console.error)
    .pipe(createSplitTransform())
    .pipe(createFilterTransform('##'))
    .pipe(process.stdout);
function createSplitTransform() {
    return new stream_1.Transform({
        transform(chunk, encoding, callback) {
            for (const line of (chunk + '').split('\n'))
                this.push(line + '\n');
            callback();
        }
    });
}
function createFilterTransform(searchString) {
    return new stream_1.Transform({
        transform(chunk, encoding, callback) {
            if ((chunk = chunk + '').startsWith(searchString)) {
                const result = chunk.substring(2);
                this.push(result);
            }
            callback();
        }
    });
}
