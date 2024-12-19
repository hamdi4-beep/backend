"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
const filename = (0, path_1.basename)((_a = process.argv[2]) !== null && _a !== void 0 ? _a : '');
if (!filename) {
    console.error('Expected a filename.');
    process.exit(1);
}
const filterByRegex = (regex) => {
    const results = [];
    return new stream_1.Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            const lines = (chunk + '').split('\n');
            results.push(...lines.filter(line => regex.test(line)));
            callback();
        },
        flush(callback) {
            this.push(JSON.stringify(results, null, '\t'));
            callback();
        }
    });
};
(0, stream_1.pipeline)((0, fs_1.createReadStream)((0, path_1.join)('files', filename)), filterByRegex(/-\s(?:[\S\s]+):/), process.stdout, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('The operation was a success.');
});
