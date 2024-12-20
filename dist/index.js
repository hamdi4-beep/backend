"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
const splitTransform = (regex) => new stream_1.Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        const lines = (chunk + '').split('\n');
        lines.forEach((line, i) => {
            if (regex.test(line)) {
                line = line.substring(2);
                this.push(i <= (lines.length - 1) ? line + '\n' : line);
            }
        });
        callback();
    }
});
(0, stream_1.pipeline)((0, fs_1.createReadStream)((0, path_1.join)('files', (_a = process.argv[2]) !== null && _a !== void 0 ? _a : 'style-guide.md')), splitTransform(/-\s(?:[\S\s]+):/), (0, fs_1.createWriteStream)('results.txt'), (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('The operation was a success!');
});
