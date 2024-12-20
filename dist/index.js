"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
const filename = (0, path_1.basename)((_a = process.argv[2]) !== null && _a !== void 0 ? _a : '');
if (!filename) {
    console.error('Expected a filename.');
    process.exit(1);
}
if (((_b = filename.split('.').pop()) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== 'md') {
    console.error('Only MD files are allowed.');
    process.exit(1);
}
const filterByRegex = (regex) => new stream_1.Transform({
    transform(chunk, encoding = 'utf8', callback) {
        const lines = (chunk + '').split('\n');
        callback(null, lines.filter(line => regex.test(line)).join('\n'));
    },
});
(0, stream_1.pipeline)((0, fs_1.createReadStream)((0, path_1.join)('files', filename)), filterByRegex(/-\s(?:[\S\s]+):/), (0, fs_1.createWriteStream)('results.txt'), (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('The operation was a success.');
});
