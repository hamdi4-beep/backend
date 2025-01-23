"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
const createSplitTransform = () => new stream_1.Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        for (const line of (chunk + '').split('\n'))
            this.push(line + '\n');
        callback();
    }
});
const createFilterTransform = (searchStr) => new stream_1.Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        if ((chunk = chunk + '').includes('https:')) {
            const result = chunk;
            this.push(result);
        }
        callback();
    }
});
(0, stream_1.pipeline)((0, fs_1.createReadStream)((0, path_1.join)('files', 'style-guide.md')), createSplitTransform(), createFilterTransform('-'), process.stdout, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('The pipeline operation was successful');
});
